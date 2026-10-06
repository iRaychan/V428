const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const crFiles=['selector-cr/index.html','selector-cr/product.html'];
const cr=crFiles.map(read);
const series=read('v40001-product-series-overhaul.js');
const multi=read('v40001-multibrand.js');

function extract(source,name){const start=source.indexOf(`function ${name}(`);assert(start>=0,`${name} exists`);let depth=0,end=-1;for(let i=source.indexOf('{',start);i<source.length;i++){if(source[i]==='{')depth++;else if(source[i]==='}'&&--depth===0){end=i+1;break}}return source.slice(start,end)}

// Point 1: CR Page 3 has a complete CR/CRS/CRN drawing map and no CHC fallback.
const assets=['cr-1-5.png','cr-8-10.png','cr-12-20.png','cr-32.png','cr-45.png','cr-64.png','cr-90.png','cr-95.png','cr-120-150.png','cr-125-155.png','cr-200-320.png','crs-crn-1-5.png','crs-crn-8-10.png','crs-crn-12-20.png','crs-crn-32.png','crs-crn-45.png','crs-crn-64.png','crs-crn-90.png','crs-crn-120-150.png','crs-crn-200.png'];
for(const [i,source] of cr.entries()){
  const mapping=extract(source,'keycrG1DimensionImage');
  assert(mapping.includes('../assets/cr-dimensions/${asset}'),crFiles[i]);
  assert(!mapping.includes('chc-g1-dimensions'),crFiles[i]);
  assert(mapping.includes("if(!asset)return ''"),crFiles[i]);
  assert(source.includes('.dimension-drawing{height:152mm'),crFiles[i]);
  assert(source.includes('.dimension-info{margin:3mm auto 0'),crFiles[i]);
}
for(const asset of assets)assert(fs.statSync(path.join(root,'assets/cr-dimensions',asset)).size>1000,asset);

// Point 2: restore the previously verified macOS CR Selector geometry.
assert(cr[0].includes('V4.28.68: restore the verified CHC-matched macOS CR geometry'));
assert(cr[0].includes('html.macos-safari body{zoom:1;width:100%;min-width:0}'));
assert(cr[0].includes('html.macos-safari main{grid-template-columns:340px minmax(0,1fr);gap:17px}'));
assert(cr[0].includes('header h1{margin:0 0 5px;font-size:27px}'));
assert(cr[0].includes('body{width:100%;max-width:100%;min-width:0;overflow-x:hidden}'));
assert(cr[0].includes('-webkit-text-size-adjust:100%;text-size-adjust:100%'));

// Point 3: BFI and ES inline Selectors own their outer labels during brand decoration.
assert(series.includes("title.textContent='Selector · BFI';title.dataset.v393MasterText='Selector · BFI'"));
assert(series.includes("title.textContent='Selector · ES';title.dataset.v393MasterText='Selector · ES'"));
assert(multi.includes("ksSelectionBfiInline==='1'?'Selector · BFI'"));
assert(multi.includes("ksSelectionEsInline==='1'?'Selector · ES'"));

// Product CR PDF: preserve click activation in macOS Safari and remove the observed 8s stall.
assert(cr[1].includes('const isMacSafariPrint=/Macintosh/i.test(navigator.userAgent)'));
assert(cr[1].includes('if(isMobilePrint||isMacSafariPrint)'));
assert(cr[1].includes('const reportPrintWindow=window.open("","_blank")'));
assert(cr[1].includes('const frame=document.createElement("iframe")'));
assert(!series.includes('setTimeout(resolve,8000)'));
assert(series.includes('setTimeout(resolve,2500)'));
assert(series.includes('if(img.complete)return Promise.resolve()'));
assert(series.includes('img=>img.complete?Promise.resolve()'));

console.log('V4.28.68 functional regression: PASS');
