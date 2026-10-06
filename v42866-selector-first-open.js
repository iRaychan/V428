/* KeySuite V4.28.66 — single-pass CHC/CR selector viewport stabilization. */
(()=>{
  'use strict';
  if(window.__KEYSUITE_V42866_SELECTOR_FIRST_OPEN__)return;
  window.__KEYSUITE_V42866_SELECTOR_FIRST_OPEN__=true;

  const targets={
    selector:{frameId:'selectorFrame',readyEvent:'KEYSUITE_CHC_VIEWPORT_READY'},
    selectorCr:{frameId:'selectorCrFrame',readyEvent:'KEYSUITE_CR_VIEWPORT_READY'}
  };
  const pending=new Map();
  const section=page=>document.getElementById(page);
  const frame=page=>document.getElementById(targets[page]?.frameId||'');
  const isActive=page=>section(page)?.classList.contains('active');

  function notifyResize(target){
    try{target?.contentWindow?.dispatchEvent(new Event('resize'))}catch(_){}
    try{target?.contentWindow?.postMessage({type:'KEYSUITE_PARENT_VIEWPORT_READY',width:Math.round(target.getBoundingClientRect().width||0)},'*')}catch(_){}
  }
  function stabilize(page){
    if(!targets[page])return false;
    const previous=pending.get(page);if(previous)cancelAnimationFrame(previous);
    pending.set(page,requestAnimationFrame(()=>{
      pending.delete(page);
      const target=frame(page),host=target?.parentElement;
      if(!target||!host||!isActive(page))return;
      const width=Math.floor(host.getBoundingClientRect().width||section(page)?.getBoundingClientRect().width||0);
      if(width<320)return;
      // Never reload or repeatedly hide a live selector. C4/C6 use the same loaded frame;
      // a resize notification is sufficient after the page becomes visible.
      target.style.display='block';target.style.maxWidth='100%';target.style.minWidth='0';target.style.width='100%';
      notifyResize(target);
      target.dataset.ksSelectorViewportReady='1';target.style.visibility='visible';
      try{window.dispatchEvent(new CustomEvent(targets[page].readyEvent,{detail:{frameId:target.id,src:target.getAttribute('src')||''}}))}catch(_){}
    }));
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
    document.addEventListener('click',event=>{const page=event.target?.closest?.('button[data-page]')?.dataset?.page;if(targets[page])stabilize(page)},true);
  }
  window.KeySuiteSelectorFirstOpen={version:'4.28.66',stabilize};
  window.KeySuiteChcFirstOpen={version:'4.28.66',stabilize:()=>stabilize('selector')};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
