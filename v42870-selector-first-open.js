/* KeySuite V4.28.70 — stable CHC/CR selector sizing before first paint. */
(()=>{
  'use strict';
  if(window.__KEYSUITE_V42870_SELECTOR_FIRST_OPEN__)return;
  window.__KEYSUITE_V42870_SELECTOR_FIRST_OPEN__=true;

  const targets={
    selector:{frameId:'selectorFrame',readyEvent:'KEYSUITE_CHC_VIEWPORT_READY'},
    selectorCr:{frameId:'selectorCrFrame',readyEvent:'KEYSUITE_CR_VIEWPORT_READY'}
  };
  const sequences={selector:0,selectorCr:0};
  const section=page=>document.getElementById(page);
  const frame=page=>document.getElementById(targets[page]?.frameId||'');
  const isActive=page=>section(page)?.classList.contains('active');
  const generation=value=>String(value||'').toUpperCase()==='G1'?'G1':'G2';
  const expectedChcPath=value=>generation(value)==='G1'?'selector-g1/index.html':'selector/index.html';

  function notifyResize(target){
    try{target?.contentWindow?.dispatchEvent(new Event('resize'))}catch(_){}
    try{target?.contentWindow?.postMessage({type:'KEYSUITE_PARENT_VIEWPORT_READY',width:Math.round(target.getBoundingClientRect().width||0),devicePixelRatio:Number(window.devicePixelRatio)||1},'*')}catch(_){}
  }
  function hide(target){
    if(!target)return;
    target.dataset.ksSelectorViewportReady='0';
    target.style.visibility='hidden';
    target.style.opacity='0';
  }
  function reveal(target){
    if(!target)return;
    target.style.visibility='visible';
    target.style.opacity='1';
    delete target.dataset.ksPendingGeneration;
  }
  function loadedPath(target){
    try{return String(target?.contentWindow?.location?.pathname||'')}catch(_){return ''}
  }
  function canRevealChc(target){
    const next=target?.dataset?.ksPendingGeneration;
    if(!next)return true;
    try{return loadedPath(target).includes(expectedChcPath(next))&&target.contentDocument?.readyState==='complete'}catch(_){return false}
  }
  function prepareChc(nextGeneration){
    const target=frame('selector');if(!target)return;
    const next=generation(nextGeneration);
    const wanted=next==='G1'?(target.dataset.g1Src||'selector-g1/index.html?v=42870'):(target.dataset.g2Src||target.dataset.src||'selector/index.html?v=42870');
    const expected=expectedChcPath(next);
    const current=String(target.getAttribute('src')||'');
    const changing=!current.includes(expected)||!loadedPath(target).includes(expected);
    target.dataset.ksPendingGeneration=next;
    target.title=`KeySelector CHC ${next==='G1'?'C4':'C6'} Series`;
    hide(target);
    if(changing){
      window.KeySuiteCHCSelection?.setGeneration?.(next);
      if(String(target.getAttribute('src')||'')!==wanted)target.setAttribute('src',wanted);
    }else stabilize('selector');
  }
  function stabilize(page){
    if(!targets[page])return false;
    const token=++sequences[page];
    requestAnimationFrame(()=>{
      if(token!==sequences[page])return;
      const target=frame(page),host=target?.parentElement;
      if(!target||!host||!isActive(page))return;
      const width=Math.floor(host.getBoundingClientRect().width||section(page)?.getBoundingClientRect().width||0);
      if(width<320)return;
      target.style.display='block';
      target.style.maxWidth='100%';
      target.style.minWidth='0';
      target.style.width=width+'px';
      void target.offsetWidth;
      notifyResize(target);
      requestAnimationFrame(()=>{
        if(token!==sequences[page]||!isActive(page))return;
        target.style.width='100%';
        void target.offsetWidth;
        notifyResize(target);
        requestAnimationFrame(()=>{
          if(token!==sequences[page]||!isActive(page))return;
          if(page==='selector'&&!canRevealChc(target))return;
          target.dataset.ksSelectorViewportReady='1';
          reveal(target);
          try{window.dispatchEvent(new CustomEvent(targets[page].readyEvent,{detail:{frameId:target.id,src:target.getAttribute('src')||''}}))}catch(_){}
        });
      });
    });
    return true;
  }
  function bindTarget(page){
    const target=frame(page);if(!target)return false;
    if(target.dataset.ksSelectorFirstOpenBound!=='1'){
      target.dataset.ksSelectorFirstOpenBound='1';
      target.addEventListener('load',()=>{target.dataset.ksSelectorViewportReady='0';if(isActive(page))stabilize(page)});
    }
    if(isActive(page))stabilize(page);
    return true;
  }
  function bind(){
    Object.keys(targets).forEach(bindTarget);
    window.addEventListener('KEYSUITE_PAGE_CHANGED',event=>{const page=event.detail?.page;if(targets[page])stabilize(page)});
    window.addEventListener('resize',()=>Object.keys(targets).forEach(page=>{if(isActive(page))stabilize(page)}),{passive:true});
    window.addEventListener('pageshow',()=>Object.keys(targets).forEach(page=>{if(isActive(page))stabilize(page)}));
    document.addEventListener('pointerdown',event=>{const button=event.target?.closest?.('button[data-page="selector"][data-generation]');if(button)prepareChc(button.dataset.generation)},true);
    document.addEventListener('click',event=>{const button=event.target?.closest?.('button[data-page]'),page=button?.dataset?.page;if(page==='selector')prepareChc(button.dataset.generation);if(targets[page])stabilize(page)},true);
  }
  window.KeySuiteSelectorFirstOpen={version:'4.28.70',stabilize,prepareChc,prepareWindowsChc:prepareChc};
  window.KeySuiteChcFirstOpen={version:'4.28.70',stabilize:()=>stabilize('selector')};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
