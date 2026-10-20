(()=>{
  'use strict';
  if(window.__KEYSUITE_KEYHQ_LAUNCHER__)return;
  window.__KEYSUITE_KEYHQ_LAUNCHER__=true;

  function installStyles(){
    if(document.getElementById('keyhqLauncherStyle'))return;
    const style=document.createElement('style');
    style.id='keyhqLauncherStyle';
    style.textContent=`
      #keyhqNavButton.keyhq-nav{margin-top:4px!important;border:1px solid rgba(72,220,188,.55)!important;background:linear-gradient(135deg,rgba(8,73,82,.72),rgba(30,72,124,.62))!important;color:#ecfeff!important;position:relative;overflow:hidden;display:flex!important;align-items:center;justify-content:space-between;gap:12px}
      #keyhqNavButton.keyhq-nav:hover,#keyhqNavButton.keyhq-nav.active{background:linear-gradient(135deg,rgba(8,92,96,.88),rgba(32,86,142,.78))!important;box-shadow:0 0 0 1px rgba(94,234,212,.35),0 0 22px rgba(45,212,191,.22)!important}
      #keyhqNavButton .keyhq-nav-icon{width:21px;height:21px;flex:0 0 21px;fill:none;stroke:#8fffe7;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 5px rgba(94,234,212,.38))}
      #ksu-nav{margin-top:4px!important}
      #keyhqOverlay{position:fixed;z-index:4999;inset:0;display:none;background:#070b13}
      #keyhqOverlay.keyhq-open{display:block}
      #keyhqOverlay iframe{display:block;width:100%;height:100%;border:0;background:#070b13}
      body.keyhq-active{overflow:hidden!important}
    `;
    document.head.appendChild(style);
  }

  function overlay(){
    let node=document.getElementById('keyhqOverlay');
    if(node)return node;
    node=document.createElement('div');
    node.id='keyhqOverlay';
    node.setAttribute('role','region');
    node.setAttribute('aria-label','KeyHQ virtual headquarters');
    node.innerHTML='<iframe id="keyhqFrame" title="KeyHQ virtual headquarters" loading="eager"></iframe>';
    document.body.appendChild(node);
    return node;
  }

  function open(){
    const node=overlay(),frame=node.querySelector('#keyhqFrame');
    if(!frame.getAttribute('src'))frame.src='keyhq/index.html?embedded=1';
    node.classList.add('keyhq-open');
    document.body.classList.add('keyhq-active');
    document.getElementById('keyhqNavButton')?.classList.add('active');
  }

  function close(){
    document.getElementById('keyhqOverlay')?.classList.remove('keyhq-open');
    document.body.classList.remove('keyhq-active');
    document.getElementById('keyhqNavButton')?.classList.remove('active');
  }

  function boot(){
    installStyles();
    document.getElementById('keyhqNavButton')?.addEventListener('click',open);
    window.addEventListener('message',event=>{
      const frame=document.getElementById('keyhqFrame');
      if(event.source===frame?.contentWindow&&event.data?.type==='KEYHQ_CLOSE')close();
    });
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.getElementById('keyhqOverlay')?.classList.contains('keyhq-open'))close()});
  }

  window.KeySuiteKeyHQ={open,close};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
