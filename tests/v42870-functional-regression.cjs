const assert=require('assert');
const fs=require('fs');
const path=require('path');
const vm=require('vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const crFiles=['selector-cr/index.html','selector-cr/product.html'];
const cr=crFiles.map(read);
const series=read('v40001-product-series-overhaul.js');
const multi=read('v40001-multibrand.js');
const firstOpen=read('v42870-selector-first-open.js');

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

// V4.28.70: restore the verified V4.28.63 embedded CR geometry on Safari.
assert(cr[0].includes('restore the verified V4.28.63 embedded CR geometry on Safari'));
assert(cr[0].includes('-webkit-text-size-adjust:100%;text-size-adjust:100%'));
assert(cr[0].includes('html.macos-safari body{zoom:1;width:100%;min-width:0}'));
assert(cr[0].includes('html.macos-safari main{grid-template-columns:340px minmax(0,1fr);gap:17px}'));
assert(cr[0].includes('html.macos-safari .curve-grid{grid-template-columns:minmax(0,1.55fr) minmax(0,1fr)}'));
assert(cr[0].includes('@media(max-width:1050px){html.macos-safari main{grid-template-columns:320px minmax(0,1fr)}html.macos-safari .curve-grid{grid-template-columns:1fr}}'));
assert(cr[0].includes('@media(max-width:850px){html.macos-safari main{grid-template-columns:1fr}}'));
assert(!cr[0].includes('transform:scale(.75)'));
assert(cr[0].includes('main{max-width:1480px;grid-template-columns:340px minmax(0,1fr);align-items:start}'));
assert(cr[0].includes('header h1{margin:0 0 5px;font-size:27px}'));
assert(cr[0].includes('body{width:100%;max-width:100%;min-width:0;overflow-x:hidden}'));

// CHC C4/C6: hide the stale/unscaled document on every desktop platform and
// reveal only after the loaded document matches the requested generation.
assert(!firstOpen.includes('if(!isWindows)return'));
assert(firstOpen.includes("target.style.visibility='hidden'"));
assert(firstOpen.includes("target.style.opacity='0'"));
assert(firstOpen.includes("target.style.width=width+'px'"));
assert(firstOpen.includes("target.style.width='100%'"));
assert(firstOpen.includes("loadedPath(target).includes(expectedChcPath(next))&&target.contentDocument?.readyState==='complete'"));
assert(!firstOpen.includes("current.includes(expectedChcPath(next)))requestAnimationFrame(()=>reveal"));
assert(firstOpen.includes('prepareWindowsChc:prepareChc'));

// Exercise the route race: changing the src attribute must not reveal the old
// document, and the requested document may reveal only after it reports loaded.
{
  const raf=[];
  const listeners={};
  const sections={selector:{classList:{contains:name=>name==='active'}},selectorCr:{classList:{contains:()=>false}}};
  const attrs={src:'selector/index.html?v=42870'};
  const frame={
    id:'selectorFrame',dataset:{g1Src:'selector-g1/index.html?v=42870',g2Src:'selector/index.html?v=42870'},style:{visibility:'visible',opacity:'1'},title:'',
    parentElement:{getBoundingClientRect:()=>({width:1200})},contentWindow:{location:{pathname:'/selector/index.html'},dispatchEvent(){},postMessage(){}},contentDocument:{readyState:'complete'},
    getBoundingClientRect:()=>({width:1200}),getAttribute:name=>attrs[name]||'',setAttribute:(name,value)=>{attrs[name]=value},addEventListener:(name,fn)=>{listeners[name]=fn},dispatchEvent(){},offsetWidth:1200
  };
  const document={readyState:'loading',getElementById:id=>id==='selectorFrame'?frame:(id==='selectorCrFrame'?null:sections[id]),addEventListener(){}};
  const window={document,devicePixelRatio:2,KeySuiteCHCSelection:{setGeneration(){}},addEventListener(){},dispatchEvent(){}};
  window.window=window;
  const context={window,document,requestAnimationFrame:fn=>{raf.push(fn)},Event:class{},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail}}};
  vm.runInNewContext(firstOpen,context);
  const flush=()=>{while(raf.length)raf.shift()()};
  window.KeySuiteSelectorFirstOpen.prepareChc('G1');
  window.KeySuiteSelectorFirstOpen.stabilize('selector');
  flush();
  assert.strictEqual(attrs.src,'selector-g1/index.html?v=42870');
  assert.strictEqual(frame.style.visibility,'hidden');
  assert.strictEqual(frame.dataset.ksSelectorViewportReady,'0');
  frame.contentWindow.location.pathname='/selector-g1/index.html';
  window.KeySuiteSelectorFirstOpen.stabilize('selector');
  flush();
  assert.strictEqual(frame.style.visibility,'visible');
  assert.strictEqual(frame.dataset.ksSelectorViewportReady,'1');
  assert.strictEqual(frame.style.width,'100%');
}

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

console.log('V4.28.70 functional regression: PASS');
