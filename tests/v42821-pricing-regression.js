/* Run with: node tests/v42821-pricing-regression.js */
const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const element=()=>({style:{},classList:{toggle(){},add(){},remove(){}},addEventListener(){},querySelector(){return element()},querySelectorAll(){return []},appendChild(){},closest(){return element()},removeAttribute(){},setAttribute(){},value:'',textContent:'',innerHTML:'',disabled:false});
const context={console,setTimeout,clearTimeout,window:{addEventListener(){},KEYSUITE_ACCESS:{role:'owner'},KeySuiteApp:{getCustomers:()=>[customer],getPricingCustomer:()=>customer,getSelectedCustomer:()=>customer}},document:{readyState:'loading',addEventListener(){},getElementById(){return element()},querySelectorAll(){return []}},CustomEvent:function(){}};
const customer={id:'customer-1',pricingCategoryId:'cat-1',distanceKm:0};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require('path').join(__dirname,'..','pricing.js'),'utf8'),context);
const category={id:'cat-1',productRules:{CHC_G1:{margin:.2,currencies:['USD','RMB']},CHC_G2:{margin:.2,currencies:['USD','RMB']},MOTOR:{margin:.2,currencies:['USD']}}};
const pump={id:'pump-1',model:'CHC 32-2-2',motor_hp:4,motor_kw:3,pricesByCurrency:{USD:{CHC:100},RMB:{CHC:null},MYR:{CHC:null}},rarityByCurrency:{USD:{CHC:'many'}}};
const motors=['IE1','IE2','IE3','IE4','IE5'].map((efficiencyClass,index)=>({id:`motor-${efficiencyClass}`,model:`${efficiencyClass}-4HP-2P`,hp:4,kw:3,pole:2,efficiencyClass,pricesByCurrency:{USD:{MOTOR:10+index},RMB:{MOTOR:null},MYR:{MOTOR:null}}}));
const api=context.window.KeySuitePricing;
api.init({categories:[category],products:[pump],chcG1Products:[pump],motorProducts:motors,productMultipliers:{CHC_G1:{USD:5.8,RMB:.867,MYR:1},CHC_G2:{USD:5.8,RMB:.8,MYR:1},MOTOR:{USD:5.8,RMB:.8,MYR:1}}},{role:'owner'});
for(const motor of motors){const found=api.findPrice('CHC 32-2-2',{customer,category,generation_code:'G2',motor_hp:4,motor_kw:3,pole:2,motor_efficiency_class:motor.efficiencyClass});assert(found,`${motor.efficiencyClass} must resolve`);assert.strictEqual(found.calc.sourcePrice,100+motor.pricesByCurrency.USD.MOTOR);}
assert.match(api.chcPriceProblem('CHC 32-2-2',{customer,category,generation_code:'G2',motor_hp:5,motor_kw:3.7,pole:2,motor_efficiency_class:'IE3'}),/^Motor price not found:/);
assert.notStrictEqual(api.calculatePrice({RMB:{X:1}},'X',category,'CHC_G1',{customer}).multiplier,api.calculatePrice({RMB:{X:1}},'X',category,'CHC_G2',{customer}).multiplier,'G1/G2 keep independent stored rates');
const rates=fs.readFileSync(require('path').join(__dirname,'..','v40001-multibrand.js'),'utf8');
assert(rates.includes("return num(base)*(actual/based);"),'effective rate keeps calculation precision');
assert(!rates.includes("effectiveRate(r.USD,'USD').toFixed(1)"),'effective USD display is not rounded to 1 decimal');
const categories=fs.readFileSync(require('path').join(__dirname,'..','categories.js'),'utf8');
assert(categories.includes("const rateFamily=product=>String(product||'CHC').toUpperCase();"),'category badges preserve the G1/G2 rate key');
console.log('V4.28.21 pricing regressions passed.');
