/* Shared display curve for CHC and ES. Does not modify hydraulic data or motor sizing. */
(function(root){
  'use strict';
  function fit(input){
    const groups=new Map();
    for(const p of input||[]){const x=Number(p.x),y=Number(p.y);if(!Number.isFinite(x)||x<0||!Number.isFinite(y)||y<0)continue;const g=groups.get(x)||[];g.push(y);groups.set(x,g)}
    const all=[...groups].map(([x,ys])=>({x,y:ys.reduce((a,b)=>a+b,0)/ys.length})).sort((a,b)=>a.x-b.x);
    const positive=all.filter(p=>p.x>1e-9);if(positive.length<2||!(positive[0].y>0))return null;
    const [a,b,c]=positive,slope=(b.y-a.y)/(b.x-a.x);
    let y0=a.y-slope*a.x;
    // Extend the local curvature of the first three valid points back to shut-off.
    // The old two-point extension forced the first two spans onto a straight line.
    if(c){const curvature=((c.y-b.y)/(c.x-b.x)-slope)/(c.x-a.x);y0+=curvature*a.x*b.x}
    const measured=all.find(p=>p.x===0&&p.y>0);
    y0=measured?measured.y:Math.max(a.y*.15,Math.min(a.y*1.75,Number.isFinite(y0)?y0:a.y));
    const pts=[{x:0,y:y0},...positive],n=pts.length,h=[],s=[],d=new Array(n).fill(0);
    for(let i=0;i<n-1;i++){h[i]=pts[i+1].x-pts[i].x;s[i]=(pts[i+1].y-pts[i].y)/h[i]}
    for(let i=1;i<n-1;i++){if(s[i-1]*s[i]>0){const w1=2*h[i]+h[i-1],w2=h[i]+2*h[i-1];d[i]=(w1+w2)/(w1/s[i-1]+w2/s[i])}}
    function edge(h0,h1,s0,s1){let m=((2*h0+h1)*s0-h0*s1)/(h0+h1);if(Math.sign(m)!==Math.sign(s0))m=0;else if(Math.sign(s0)!==Math.sign(s1)&&Math.abs(m)>3*Math.abs(s0))m=3*s0;return m}
    d[0]=edge(h[0],h[1],s[0],s[1]);d[n-1]=edge(h[n-2],h[n-3],s[n-2],s[n-3]);
    return {pts,d,min:0,max:pts[n-1].x,y0,estimatedShutoff:!measured};
  }
  function value(curve,x){
    x=Number(x);if(!curve||!Number.isFinite(x)||x<0||x>curve.max+1e-9)return NaN;
    const {pts,d}=curve;if(x<=0)return pts[0].y;if(x>=curve.max)return pts[pts.length-1].y;
    let lo=0,hi=pts.length-1;while(hi-lo>1){const mid=(lo+hi)>>1;if(pts[mid].x<=x)lo=mid;else hi=mid}
    const a=pts[lo],b=pts[hi],h=b.x-a.x,t=(x-a.x)/h,t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*a.y+(t3-2*t2+t)*h*d[lo]+(-2*t3+3*t2)*b.y+(t3-t2)*h*d[hi];
  }
  const api={fit,value};if(typeof module==='object'&&module.exports)module.exports=api;else root.KeySuitePowerCurve=api;
})(typeof globalThis!=='undefined'?globalThis:this);
