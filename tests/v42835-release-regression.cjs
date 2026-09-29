const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),power=require('../power-curve.js');
let tested=0,points=0,endpoints=0;
function check(input,label){
 const c=power.fit(input);assert(c,label+' fit');assert(c.y0>0,label+' shutoff');
 for(const p of c.pts){assert(Math.abs(power.value(c,p.x)-p.y)<1e-8,label+' preserves points');points++}
 for(let j=0;j<c.pts.length-1;j++){
  const a=c.pts[j],b=c.pts[j+1];
  for(let k=0;k<=50;k++){const y=power.value(c,a.x+(b.x-a.x)*k/50);assert(Number.isFinite(y)&&y>=Math.min(a.y,b.y)-1e-8&&y<=Math.max(a.y,b.y)+1e-8,label+' no overshoot')}
 }
 for(let j=1;j<c.pts.length-1;j++){
  const x=c.pts[j].x,e=Math.min(x-c.pts[j-1].x,c.pts[j+1].x-x)*1e-6;
  const l=(power.value(c,x)-power.value(c,x-e))/e,r=(power.value(c,x+e)-power.value(c,x))/e;
  assert(Math.abs(l-r)<1e-3*(1+Math.abs(l)+Math.abs(r)),label+' smooth join');
 }
 tested++;
}
for(const folder of ['selector','selector-g1']){
 const s=fs.readFileSync(path.join(root,folder,'product.html'),'utf8');
 const db=JSON.parse(s.split('\n').find(l=>l.startsWith('const DB=')).slice(9).replace(/;\s*$/,''));
 const ctx=vm.createContext({});
 vm.runInContext(s.slice(s.indexOf('function solve('),s.indexOf('function nice('))+s.slice(s.indexOf('function fitMixedHeadCurve('),s.indexOf('function evaluateModel(')),ctx);
 for(const [name,curve] of Object.entries(db.curves))for(const ratio of [1,.8]){
  const mix={full:1,small:0,smallest:0,total:1};
  const h=ctx.fitMixedHeadCurve(curve,mix,ratio),e=ctx.fitMixedEfficiencyCurve(curve,mix,ratio);
  if(!h||!e)continue;
  check(h.pts.map(p=>({x:p.x,y:9.81*p.x*p.y/3600/(Math.max(1,Math.min(100,ctx.peval(e.c,p.x)))/100)})),folder+name);
 }
 for(const page of ['index.html','product.html']){const t=fs.readFileSync(path.join(root,folder,page),'utf8');assert(t.includes('powerSmooth=kind===\'power\'?keysuitePowerSmoothFit(fit):null'));assert(t.includes('../power-curve.js?v=42835'))}
}
const core=require('../selector-es/es-core.js'),db=require('../selector-es/es-data.js');
const source=fs.readFileSync(path.join(root,'selector-es/index.html'),'utf8');
const ctx=vm.createContext({ESCore:core});
vm.runInContext(source.match(/function headCurveSeries\([^\n]+/)[0],ctx);
for(const pump of db.pumps)for(const ratio of [1,.8]){
 let previous=-Infinity;
 for(const d of [...new Set(pump.impellers)].filter(d=>d>0).sort((a,b)=>a-b)){
  const curve=ctx.headCurveSeries({pump},d,ratio,{});
  assert(curve.max>previous,pump.id+' diameter endpoint ordering');previous=curve.max;
  assert(Number.isFinite(curve.fn(curve.max)),pump.id+' finite head endpoint');endpoints++;
  check(core.curvePoints(pump,d,ratio).map(p=>({x:p.flowLps*3.6,y:p.shaftKw})),pump.id+' '+d);
 }
}
const natural=power.fit([{x:0,y:0},{x:1,y:2},{x:2,y:2.7},{x:3,y:3.1}]);
assert(Math.abs(power.value(natural,.5)-(natural.y0+2)/2)>1e-4,'curved shutoff extension');
assert.strictEqual(power.fit([{x:1,y:1}]),null);
assert.strictEqual(power.fit([{x:0,y:4},{x:1,y:3},{x:2,y:2}]).y0,4,'measured shutoff retained');
console.log(JSON.stringify({powerCurves:tested,preservedPoints:points,orderedFiniteImpellerEndpoints:endpoints,status:'PASS'}));
