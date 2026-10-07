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
const firstOpen=read('v42871-selector-first-open.js');

function extract(source,name){const start=source.indexOf(`function ${name}(`);assert(start>=0,`${name} exists`);let depth=0,end=-1;for(let i=source.indexOf('{',start);i<source.length;i++){if(source[i]==='{')depth++;else if(source[i]==='}'&&--depth===0){end=i+1;break}}return source.slice(start,end)}

// CR Page 3 retains the complete CR/CRS/CRN drawing map and no CHC fallback.
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

// Retain the verified CR geometry while repairing its parent iframe lifecycle.
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

// Safari keeps the iframe in a real visible layout while concealed with opacity,
// performs a visible-host navigation and always has a bounded final reveal.
assert(firstOpen.includes("const isMacSafari=/Macintosh/i.test(ua)&&/Safari\\//i.test(ua)"));
assert(firstOpen.includes("target.style.visibility='visible'"));
assert(firstOpen.includes("target.style.visibility='hidden'"));
assert(firstOpen.includes("target.style.opacity='0'"));
assert(firstOpen.includes("target.style.width=width+'px'"));
assert(firstOpen.includes("target.style.width='100%'"));
assert(firstOpen.includes("url.searchParams.set('ks-visible','1')"));
assert(firstOpen.includes("url.searchParams.set('ks-layout','42871')"));
assert(firstOpen.includes('[0,40,120,280,650]'));
assert(firstOpen.includes('fallback:attempt>=4'));
assert(firstOpen.includes('prepareWindowsChc:prepareChc'));
assert(firstOpen.includes('const value=outer/inner'));
assert(firstOpen.includes("doc.body.style.setProperty('zoom',String(value),'important')"));
assert(firstOpen.includes("doc.body.style.setProperty('width',String(value*100)+'%','important')"));

// Exercise the Safari route race. The iframe remains layout-active while
// concealed, then reveals the requested C4 document after its load event.
{
  const raf=[],timers=[],listeners={};
  const childStyles={};
  const childDocument={readyState:'complete',documentElement:{dataset:{}},body:{style:{setProperty:(name,value)=>{childStyles[name]=value}}}};
  const sections={selector:{classList:{contains:name=>name==='active'}},selectorCr:{classList:{contains:()=>false}}};
  const attrs={src:'selector/index.html?v=42871'};
  const frame={
    id:'selectorFrame',dataset:{g1Src:'selector-g1/index.html?v=42871',g2Src:'selector/index.html?v=42871'},style:{visibility:'visible',opacity:'1'},title:'',
    parentElement:{getBoundingClientRect:()=>({width:1200})},contentWindow:{location:{pathname:'/selector/index.html'},dispatchEvent(){},postMessage(){}},contentDocument:childDocument,
    getBoundingClientRect:()=>({width:1200}),getAttribute:name=>attrs[name]||'',setAttribute:(name,value)=>{attrs[name]=value},addEventListener:(name,fn)=>{listeners[name]=fn},dispatchEvent(){},offsetWidth:1200
  };
  const document={readyState:'complete',getElementById:id=>id==='selectorFrame'?frame:(id==='selectorCrFrame'?null:sections[id]),addEventListener(){}};
  const navigator={userAgent:'Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15'};
  const window={document,navigator,devicePixelRatio:1.5,innerWidth:1600,outerWidth:1200,KeySuiteCHCSelection:{setGeneration(){}},addEventListener(){},dispatchEvent(){}};
  window.window=window;
  const context={window,document,navigator,location:{href:'https://suite.keylargo.com.my/'},URL,setTimeout:fn=>{timers.push(fn)},requestAnimationFrame:fn=>{raf.push(fn)},Event:class{},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail}}};
  vm.runInNewContext(firstOpen,context);
  const flush=()=>{while(timers.length||raf.length){while(timers.length)timers.shift()();while(raf.length)raf.shift()()}};
  window.KeySuiteSelectorFirstOpen.prepareChc('G1');
  assert(attrs.src.includes('/selector-g1/index.html?v=42871'));
  assert(attrs.src.includes('ks-visible=1'));
  assert(attrs.src.includes('ks-layout=42871'));
  assert.strictEqual(frame.style.visibility,'visible');
  assert.strictEqual(frame.style.opacity,'0');
  assert.strictEqual(frame.dataset.ksSelectorViewportReady,'0');
  frame.contentWindow.location.pathname='/selector-g1/index.html';
  listeners.load();
  flush();
  assert.strictEqual(frame.style.visibility,'visible');
  assert.strictEqual(frame.style.opacity,'1');
  assert.strictEqual(frame.dataset.ksSelectorViewportReady,'1');
  assert.strictEqual(frame.style.width,'100%');
  assert.strictEqual(childDocument.documentElement.dataset.ksParentSafariZoom,'0.75');
  assert.strictEqual(childStyles.zoom,'0.75');
  assert.strictEqual(childStyles.width,'75%');
}

// CR receives the same visible-host Safari bootstrap and cannot remain concealed.
{
  const raf=[],timers=[],listeners={};
  const sections={selector:{classList:{contains:()=>false}},selectorCr:{classList:{contains:name=>name==='active'}}};
  const attrs={src:'selector-cr/index.html?v=42871&ks-visible=1'};
  const frame={
    id:'selectorCrFrame',dataset:{src:'selector-cr/index.html?v=42871&ks-visible=1'},style:{visibility:'visible',opacity:'1'},
    parentElement:{getBoundingClientRect:()=>({width:1180})},contentWindow:{location:{pathname:'/selector-cr/index.html'},dispatchEvent(){},postMessage(){}},contentDocument:{readyState:'complete'},
    getBoundingClientRect:()=>({width:1180}),getAttribute:name=>attrs[name]||'',setAttribute:(name,value)=>{attrs[name]=value},addEventListener:(name,fn)=>{listeners[name]=fn},offsetWidth:1180
  };
  const document={readyState:'complete',getElementById:id=>id==='selectorCrFrame'?frame:(id==='selectorFrame'?null:sections[id]),addEventListener(){}};
  const navigator={userAgent:'Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15'};
  const window={document,navigator,devicePixelRatio:2,addEventListener(){},dispatchEvent(){}};window.window=window;
  const context={window,document,navigator,location:{href:'https://suite.keylargo.com.my/'},URL,setTimeout:fn=>{timers.push(fn)},requestAnimationFrame:fn=>{raf.push(fn)},Event:class{},CustomEvent:class{}};
  vm.runInNewContext(firstOpen,context);
  const flush=()=>{while(timers.length||raf.length){while(timers.length)timers.shift()();while(raf.length)raf.shift()()}};
  flush();
  assert(attrs.src.includes('/selector-cr/index.html?v=42871'));
  assert(attrs.src.includes('ks-layout=42871'));
  assert.strictEqual(frame.style.visibility,'visible');
  assert.strictEqual(frame.style.opacity,'0');
  listeners.load();
  flush();
  assert.strictEqual(frame.style.opacity,'1');
  assert.strictEqual(frame.dataset.ksSelectorViewportReady,'1');
  assert.strictEqual(frame.style.width,'100%');
}

// Windows retains the V4.28.70 hide-until-matching-document behavior.
{
  const raf=[],listeners={};
  const sections={selector:{classList:{contains:name=>name==='active'}},selectorCr:{classList:{contains:()=>false}}};
  const attrs={src:'selector/index.html?v=42871'};
  const frame={
    id:'selectorFrame',dataset:{g1Src:'selector-g1/index.html?v=42871',g2Src:'selector/index.html?v=42871'},style:{visibility:'visible',opacity:'1'},title:'',
    parentElement:{getBoundingClientRect:()=>({width:1200})},contentWindow:{location:{pathname:'/selector/index.html'},dispatchEvent(){},postMessage(){}},contentDocument:{readyState:'complete'},
    getBoundingClientRect:()=>({width:1200}),getAttribute:name=>attrs[name]||'',setAttribute:(name,value)=>{attrs[name]=value},addEventListener:(name,fn)=>{listeners[name]=fn},offsetWidth:1200
  };
  const document={readyState:'complete',getElementById:id=>id==='selectorFrame'?frame:(id==='selectorCrFrame'?null:sections[id]),addEventListener(){}};
  const navigator={userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/141.0 Safari/537.36'};
  const window={document,navigator,devicePixelRatio:1,KeySuiteCHCSelection:{setGeneration(){}},addEventListener(){},dispatchEvent(){}};window.window=window;
  const context={window,document,navigator,location:{href:'https://suite.keylargo.com.my/'},URL,requestAnimationFrame:fn=>{raf.push(fn)},Event:class{},CustomEvent:class{}};
  vm.runInNewContext(firstOpen,context);
  const flush=()=>{while(raf.length)raf.shift()()};
  window.KeySuiteSelectorFirstOpen.prepareChc('G1');
  flush();
  assert.strictEqual(frame.style.visibility,'hidden');
  assert.strictEqual(frame.style.opacity,'0');
  frame.contentWindow.location.pathname='/selector-g1/index.html';
  listeners.load();
  flush();
  assert.strictEqual(frame.style.visibility,'visible');
  assert.strictEqual(frame.style.opacity,'1');
  assert.strictEqual(frame.style.width,'100%');
}

// BFI and ES keep their successful shared Product Curve host and fallback path.
assert(series.includes("title.textContent='Selector · BFI';title.dataset.v393MasterText='Selector · BFI'"));
assert(series.includes("title.textContent='Selector · ES';title.dataset.v393MasterText='Selector · ES'"));
assert(series.includes('openSelectionBfiPanel()||showSelectionBfiFallback()'));
assert(multi.includes("ksSelectionBfiInline==='1'?'Selector · BFI'"));
assert(multi.includes("ksSelectionEsInline==='1'?'Selector · ES'"));

// Product CR PDF behavior and shortened readiness fallback remain unchanged.
assert(cr[1].includes('const isMacSafariPrint=/Macintosh/i.test(navigator.userAgent)'));
assert(cr[1].includes('if(isMobilePrint||isMacSafariPrint)'));
assert(cr[1].includes('const reportPrintWindow=window.open("","_blank")'));
assert(cr[1].includes('const frame=document.createElement("iframe")'));
assert(!series.includes('setTimeout(resolve,8000)'));
assert(series.includes('setTimeout(resolve,2500)'));
assert(series.includes('if(img.complete)return Promise.resolve()'));
assert(series.includes('img=>img.complete?Promise.resolve()'));

console.log('V4.28.71 functional regression: PASS');
