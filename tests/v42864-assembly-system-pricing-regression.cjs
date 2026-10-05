const assert=require('assert');
const fs=require('fs');
const path=require('path');
const vm=require('vm');

const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const element=()=>({style:{},classList:{toggle(){},add(){},remove(){}},addEventListener(){},setAttribute(){},removeAttribute(){},querySelector(){return null},querySelectorAll(){return []},appendChild(){},value:'',textContent:'',innerHTML:'',disabled:false});
const customer={id:'customer-1',pricingCategoryId:'category-1',distanceKm:100};
const sandbox={
  window:{addEventListener(){},KEYSUITE_ACCESS:{role:'owner'},KeySuiteApp:{getCustomers:()=>[customer],getPricingCustomer:()=>customer,getSelectedCustomer:()=>customer}},
  document:{getElementById(){return element()},querySelectorAll(){return []}},
  localStorage:{getItem(){return null},setItem(){}},
  console,
  alert(){},
  setTimeout,
  clearTimeout,
};
sandbox.window.window=sandbox.window;
vm.runInNewContext(read('pricing.js'),sandbox,{filename:'pricing.js'});
const api=sandbox.window.KeySuitePricing;
assert(api,'pricing API loads');

const category={id:'category-1',productRules:{GWS:{margin:.2,normal:0,rare:0,transport:50,useCommission:false,useSetDiscount:true,useFinalDiscount:true,useFuelCharge:true,currencies:['MYR']}}};
const products=[1000,700,300,500].map((cost,index)=>({id:`gws-${index+1}`,model:`Component ${index+1}`,pricesByCurrency:{USD:{SKU:null},RMB:{SKU:null},MYR:{SKU:cost}},rarityByCurrency:{MYR:{SKU:'many'}}}));
api.init({categories:[category],gwsProducts:products,customerPricingRows:[{customerId:customer.id,setDiscount:.10,finalDiscount:.15}],fuel_price:3,fuel_base_price:2},{role:'owner'});
const assemblyItems=products.map(product=>{
  const found=api.findGwsPrice(product.id,null,{customer,category,pricingMode:'assembly'});
  return {id:product.id,model:product.model,qty:1,unitPrice:found.calc.finalPrice,pricingSource:api.sourceSnapshot(found)};
});
const assemblyDisplay=api.priceAssemblyForDisplay(assemblyItems,{customer,category});
const assemblyCalcs=products.map(product=>api.findGwsPrice(product.id,null,{customer,category,pricingMode:'assembly'}).calc);
const expectedDisplayBeforeFuel=assemblyCalcs.reduce((sum,calc)=>sum+calc.beforeFuel,0);
assert.strictEqual(assemblyDisplay.source.pricing_mode,'assembly','displayed Assembly total remains before Set Discount');
assert.strictEqual(assemblyDisplay.source.before_fuel_total,expectedDisplayBeforeFuel,'displayed Assembly total sums pre-fuel Assembly component values');
assert.strictEqual(assemblyDisplay.fuelCharge,100,'displayed Assembly total adds MAX Fuel once');
assert.strictEqual(assemblyDisplay.total,Math.ceil((expectedDisplayBeforeFuel+100-1e-9)/10)*10,'displayed Assembly total rounds once without Set Discount');
const fourBomRows=api.priceAssemblyRowsForDisplay(assemblyItems,{customer,category});
assert.strictEqual(fourBomRows.bomCount,4,'four visible BOM lines use a divisor of four');
assert.strictEqual(fourBomRows.fuelSharePerBom,25,'one RM100 Fuel Charge is shared equally across four BOM lines');
assert.strictEqual(fourBomRows.total,Object.values(fourBomRows.rows).reduce((sum,row)=>sum+row.lineTotal,0),'visible BOM prices add exactly to the displayed consolidated total');
const threeBomRows=api.priceAssemblyRowsForDisplay(assemblyItems.slice(0,3),{customer,category});
assert.strictEqual(threeBomRows.bomCount,3,'three visible BOM lines use a divisor of three');
assert(Math.abs(threeBomRows.fuelSharePerBom-(100/3))<1e-9,'Fuel is divided by three for three BOM lines');
const twoBomRows=api.priceAssemblyRowsForDisplay(assemblyItems.slice(0,2),{customer,category});
assert.strictEqual(twoBomRows.bomCount,2,'two visible BOM lines use a divisor of two');
assert.strictEqual(twoBomRows.fuelSharePerBom,50,'Fuel is divided by two for two BOM lines');
const multiQtyRows=api.priceAssemblyRowsForDisplay([{...assemblyItems[0],qty:2},assemblyItems[1]],{customer,category});
assert.strictEqual(multiQtyRows.bomCount,2,'BOM divisor counts visible lines rather than total units');
assert.strictEqual(multiQtyRows.rows[assemblyItems[0].id].fuelShare,50,'a quantity-two line receives one of two BOM Fuel shares');
assert.strictEqual(multiQtyRows.rows[assemblyItems[0].id].fuelSharePerUnit,25,'the line Fuel share is divided across its two units');
const assemblyPrice=api.priceAssemblyForQuotation(assemblyItems,{customer,category});
const quotationCalcs=products.map(product=>api.findGwsPrice(product.id,null,{customer,category,pricingMode:'quotation'}).calc);
const expectedBeforeFuel=quotationCalcs.reduce((sum,calc)=>sum+calc.beforeFuel,0);
assert.strictEqual(assemblyPrice.source.pricing_rule,'COMPONENT_SET_DISCOUNT_SUM_TRANSPORT_MAX_FUEL','Assembly snapshot records the consolidated rule');
assert.strictEqual(assemblyPrice.source.before_fuel_total,expectedBeforeFuel,'each Assembly leaf retains its own quotation Set and Final Discount logic');
assert.strictEqual(assemblyPrice.transportTotal,200,'Assembly sums Transport from all four leaves');
assert.strictEqual(assemblyPrice.fuelCharge,100,'Assembly applies one highest Fuel Charge, not four');
assert.strictEqual(assemblyPrice.total,Math.ceil((expectedBeforeFuel+100-1e-9)/10)*10,'Assembly total is SUM before Fuel plus MAX Fuel, rounded once');
const unavailableCatalogueItems=assemblyItems.map((item,index)=>index?item:{...item,pricingSource:{...item.pricingSource,product_id:'removed-catalogue-record'}});
const snapshotFallbackPrice=api.priceAssemblyForQuotation(unavailableCatalogueItems,{customer,category});
assert.strictEqual(snapshotFallbackPrice.total,assemblyPrice.total,'a saved component pricing snapshot prevents fallback to the old displayed-price sum when catalogue resolution fails');
assert.strictEqual(snapshotFallbackPrice.source.assembly_items[0].pricingSource.snapshot_fallback,true,'quotation audit identifies the saved-snapshot fallback');

const nestedSystem=[{model:'Pumpset',qty:2,unitPrice:assemblyPrice.total,pricingSource:{product_family:'ASSEMBLY',assembly_items:assemblyItems}},{...assemblyItems[0],model:'Panel'}];
const systemPrice=api.priceAssemblyForQuotation(nestedSystem,{customer,category});
const expectedSystemBeforeFuel=expectedBeforeFuel*2+quotationCalcs[0].beforeFuel;
assert.strictEqual(systemPrice.source.before_fuel_total,expectedSystemBeforeFuel,'nested Assembly leaves are expanded once into System pricing');
assert.strictEqual(systemPrice.transportTotal,450,'nested System Transport is summed by expanded leaf quantity');
assert.strictEqual(systemPrice.fuelCharge,100,'nested System still applies only one highest Fuel Charge');
assert.strictEqual(systemPrice.total,Math.ceil((expectedSystemBeforeFuel+100-1e-9)/10)*10,'nested System excludes the Pumpset wrapper selling price');

// Regression clue: these are the four displayed component selling prices seen by the user.
const observedDisplayed=[2770,1430,450,970];
assert.strictEqual(observedDisplayed.reduce((sum,value)=>sum+value,0),5620,'old UI simple sum reproduces RM5,620');
const observedFuel=156.96,observedConsolidated=api.consolidateAssemblyPricing([
  {qty:1,calc:{beforeFuel:2770-observedFuel,transport:100,fuelCharge:observedFuel,finalPrice:2770}},
  {qty:1,calc:{beforeFuel:1430-observedFuel,transport:80,fuelCharge:observedFuel,finalPrice:1430}},
  {qty:1,calc:{beforeFuel:450-observedFuel,transport:30,fuelCharge:observedFuel,finalPrice:450}},
  {qty:1,calc:{beforeFuel:970-observedFuel,transport:60,fuelCharge:observedFuel,finalPrice:970}},
]);
assert(Math.abs(observedConsolidated.beforeFuelTotal-4992.16)<1e-9,'component displayed prices excluding four Fuel Charges are summed');
assert.strictEqual(observedConsolidated.transportTotal,270,'all component Transport contributions remain summed');
assert.strictEqual(observedConsolidated.maxFuelCharge,156.96,'only one RM156.96 Fuel Charge is retained');
assert.strictEqual(observedConsolidated.total,5150,'RM5,620 simple sum minus three duplicate RM156.96 Fuel Charges rounds once to RM5,150');

const nested=[
  {model:'Pumpset',qty:2,pricingSource:{product_family:'MANUAL',assembly_items:[
    {model:'Pump',qty:1,unitPrice:2770,pricingSource:{product_family:'ES'}},
    {model:'Motor',qty:1,unitPrice:1430,pricingSource:{product_family:'MOTOR'}},
    {model:'Coupling',qty:1,unitPrice:450,pricingSource:{product_family:'COUPLING'}},
    {model:'Baseplate',qty:1,unitPrice:970,pricingSource:{product_family:'BASEPLATE'}},
  ]}},
  {model:'Panel',qty:1,unitPrice:1200,pricingSource:{product_family:'KEYPLC'}},
];
const leaves=api.flattenAssemblyItems(nested);
assert.deepStrictEqual(Array.from(leaves,item=>item.model),['Pump','Motor','Coupling','Baseplate','Panel'],'nested Pumpset wrapper is not priced as an extra System component');
assert.deepStrictEqual(Array.from(leaves,item=>item.qty),[2,2,2,2,1],'nested quantities are expanded exactly once');

const assembly=read('assembly.js');
assert(assembly.includes('function total(d=current){return Number(consolidatedPricing(d)?.total??componentDisplayedTotal(d))}'),'displayed Assembly/System total uses pre-Set-Discount consolidated pricing');
assert(assembly.includes("const repriced=consolidatedPricing(current,'quotation')||{error:'Quotation pricing is not available.'}"),'Assembly and System quotation handoff uses quotation-mode consolidated pricing');
assert(assembly.includes("const repriced=consolidatedPricing(d,'quotation');if(!repriced){alert('Quotation pricing is not available for this Pumpset.')"),'direct ES Pumpset quotation uses consolidated quotation pricing');
assert(assembly.includes("if(price&&!price.readOnly&&price.value!=='')item.unitPrice="),'read-only shared-Fuel display prices do not overwrite saved standalone component prices');
assert(!assembly.includes("pricingSource={product_family:'MANUAL',source_kind:'PUMPSET'"),'Pumpset quotation no longer stores a simple-sum manual pricing source');

const pricing=read('pricing.js');
assert(pricing.includes("repriceSource(source,'quotation'"),'each leaf is repriced with its own normal quotation logic');
assert(pricing.includes('snapshot.set_discount_retained=true'),'each component retains its own Set Discount');
assert(pricing.includes("pricing_rule:'COMPONENT_SET_DISCOUNT_SUM_TRANSPORT_MAX_FUEL'"),'quotation snapshot records the consolidation rule');
assert(read('index.html').includes('Consolidated Total: <span id="assemblyTotal">'),'BOM component displays remain separate while the main total is identified as consolidated');

console.log('V4.28.64 Assembly/System consolidated pricing regression: PASS');
