/* KeySuite V4.28.63 — stabilize CHC and CR selector viewports before first display. */
(()=>{
  'use strict';
  if(window.__KEYSUITE_V42863_SELECTOR_FIRST_OPEN__)return;
  window.__KEYSUITE_V42863_SELECTOR_FIRST_OPEN__=true;

  const targets={
    selector:{frameId:'selectorFrame',readyEvent:'KEYSUITE_CHC_VIEWPORT_READY'},
    selectorCr:{frameId:'selectorCrFrame',readyEvent:'KEYSUITE_CR_VIEWPORT_READY'}
  };
  const sequences={selector:0,selectorCr:0};
  const section=page=>document.getElementById(page);
  const frame=page=>document.getElementById(targets[page]?.frameId||'');
  const isActive=page=>section(page)?.classList.contains('active');

  function notifyResize(target){
    try{target?.contentWindow?.dispatchEvent(new Event('resize'))}catch(_){}
    try{target?.contentWindow?.postMessage({type:'KEYSUITE_PARENT_VIEWPORT_READY',width:Math.round(target.getBoundingClientRect().width||0)},'*')}catch(_){}
  }
  function prime(page){
    const target=frame(page);if(!target)return false;
    target.dataset.ksSelectorViewportReady='0';
    target.style.visibility='hidden';
    return true;
  }
  function reloadOnceVisible(page,target,host){
    if(target.dataset.ksSelectorVisibleReloaded==='1')return false;
    const width=Math.floor(host.getBoundingClientRect().width||section(page)?.getBoundingClientRect().width||0);
    if(width<320)return false;
    target.dataset.ksSelectorVisibleReloaded='1';
    target.dataset.ksSelectorVisibleReloadLoading='1';
    prime(page);
    const current=target.getAttribute('src')||target.dataset.src;
    if(!current){target.dataset.ksSelectorVisibleReloadLoading='0';return false}
    const url=new URL(current,location.href);
    url.searchParams.set('ks-visible','1');
    target.setAttribute('src',url.href);
    return true;
  }
  function stabilize(page,attempt=0,token=++sequences[page]){
    if(token!==sequences[page])return false;
    const target=frame(page),host=target?.parentElement;
    if(!target||!host||!isActive(page))return false;
    if(target.dataset.ksSelectorVisibleReloadLoading==='1')return false;
    if(reloadOnceVisible(page,target,host))return true;
    const width=Math.floor(host.getBoundingClientRect().width||section(page)?.getBoundingClientRect().width||0);
    if(width<320){if(attempt<5)setTimeout(()=>stabilize(page,attempt+1,token),[0,40,90,180,320][attempt]||320);return false}
    prime(page);
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
        notifyResize(target);
        target.dataset.ksSelectorViewportReady='1';
        target.style.visibility='visible';
        try{window.dispatchEvent(new CustomEvent(targets[page].readyEvent,{detail:{frameId:target.id,src:target.getAttribute('src')||''}}))}catch(_){}
      });
    });
    return true;
  }
  function schedule(page){
    if(!targets[page])return false;
    const token=++sequences[page];
    prime(page);
    [0,40,120,280].forEach((delay,index)=>setTimeout(()=>stabilize(page,index,token),delay));
    return true;
  }
  function bindTarget(page){
    const target=frame(page);if(!target)return false;
    if(target.dataset.ksSelectorFirstOpenBound!=='1'){
      target.dataset.ksSelectorFirstOpenBound='1';
      target.addEventListener('load',()=>{target.dataset.ksSelectorVisibleReloadLoading='0';target.dataset.ksSelectorViewportReady='0';if(isActive(page))schedule(page)});
    }
    if(isActive(page))schedule(page);
    return true;
  }
  function bind(){
    Object.keys(targets).forEach(bindTarget);
    window.addEventListener('KEYSUITE_PAGE_CHANGED',event=>{
      const page=event.detail?.page,previous=event.detail?.previousPage;
      if(targets[page])schedule(page);
      if(targets[previous]&&previous!==page)sequences[previous]++;
    });
    window.addEventListener('resize',()=>Object.keys(targets).forEach(page=>{if(isActive(page))schedule(page)}),{passive:true});
    window.addEventListener('pageshow',()=>Object.keys(targets).forEach(page=>{if(isActive(page))schedule(page)}));
    document.addEventListener('click',event=>{
      const button=event.target?.closest?.('button[data-page]'),page=button?.dataset?.page;
      if(targets[page]){prime(page);setTimeout(()=>{if(isActive(page))schedule(page)},0)}
    },true);
  }
  window.KeySuiteSelectorFirstOpen={version:'4.28.63',stabilize:schedule};
  window.KeySuiteChcFirstOpen={version:'4.28.63',stabilize:()=>schedule('selector')};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
