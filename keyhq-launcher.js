(()=>{
  'use strict';
  if(window.__KEYSUITE_KEYHQ_LAUNCHER__)return;
  window.__KEYSUITE_KEYHQ_LAUNCHER__=true;

  const REFRESH_MS=20000;
  let refreshTimer=0,contextRequest=0;
  const demoEvents=[
    {id:'demo-1',sender:'Demo · Acme Engineering',message:'Need 2 duty + 1 standby booster pumps, 180 m³/hr at 48 m head.',status:'demo',createdAt:'',isDemo:true},
    {id:'demo-2',sender:'Demo · KL Contractor',message:'Please recommend a transfer pump for a 12-storey building.',status:'demo',createdAt:'',isDemo:true},
    {id:'demo-3',sender:'Demo · Service Team',message:'Customer asks for CHC SS316 availability and quotation.',status:'demo',createdAt:'',isDemo:true}
  ];

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
    node=document.createElement('div');node.id='keyhqOverlay';node.setAttribute('role','region');node.setAttribute('aria-label','KeyHQ virtual headquarters');
    node.innerHTML='<iframe id="keyhqFrame" title="KeyHQ virtual headquarters" loading="lazy"></iframe>';document.body.appendChild(node);return node;
  }

  function role(){return String(window.KEYSUITE_ACCESS?.role||'').toLowerCase()}
  function canProjector(){return role()==='owner'||role()==='admin'||Boolean(window.KeySuitePermissions?.can?.('keyai_access',role()))}
  function canConfigure(){return role()==='owner'||role()==='admin'}
  function metric(id){return String(document.getElementById(id)?.textContent||'').trim()}
  function customersCount(){try{return Number(window.KeySuiteApp?.getCustomers?.().length||metric('mCustomers')||0)}catch(_){return Number(metric('mCustomers')||0)}}
  function signal(state,label,detail,source,updatedAt=''){return {state,label,detail,source,updatedAt}}

  function agentSignals(context){
    const customerCount=customersCount(),quoteCount=Number(metric('mQuotes')||0),quoteMode=String(window.KeySuiteQuotationStore?.getMode?.()||'unknown');
    const enquiryCount=context.events.length,latest=context.events[0],keybot=context.eventMode==='live'
      ?signal('live','LIVE',`${enquiryCount} company Telegram enquir${enquiryCount===1?'y':'ies'} available`,'KeyBot Telegram inbox',latest?.createdAt||'')
      :context.eventMode==='empty'
        ?signal('connected','CONNECTED','Telegram is connected; no company enquiries are available.','KeyBot Telegram inbox')
        :context.eventMode==='demo'
          ?signal('demo','DEMO','Demonstration messages only; no live enquiry is being shown.','KeyHQ demonstration data')
          :context.eventMode==='locked'
            ?signal('locked','LOCKED','This role is not authorized to receive enquiry content.','KeySuite role permissions')
            :signal('error','UNAVAILABLE','KeyBot feed could not be verified.','KeyBot Telegram inbox');
    return {
      sage:signal('connected','CONNECTED','Signed-in KeySuite session and role permissions synchronized.','KeySuite identity and authority'),keybot,
      atlas:signal('connected','AVAILABLE','Engineering and product-selection modules are available. No active engineering task is reported.','KeySuite engineering modules'),
      scout:signal(customerCount?'connected':'standby',customerCount?'CONNECTED':'STANDBY',customerCount?`${customerCount} customer record${customerCount===1?'':'s'} in the permitted scope.`:'No customer workload signal is available.','KeySuite customer store'),
      pixel:signal('standby','STANDBY','No content-production workflow is connected.','No live source connected'),
      ledger:signal(quoteMode==='supabase'?'connected':'standby',quoteMode==='supabase'?'CONNECTED':'STANDBY',quoteMode==='supabase'?`${quoteCount} quotation record${quoteCount===1?'':'s'} visible in secure history.`:'Secure quotation history is not currently reporting live state.','KeySuite quotation store'),
      nova:signal('standby','STANDBY','No strategy or planning workflow is connected.','No live source connected'),
      echo:signal(context.eventMode==='live'?'connected':'standby',context.eventMode==='live'?'CONNECTED':'STANDBY',context.eventMode==='live'?`${enquiryCount} customer enquiry signal${enquiryCount===1?'':'s'} available.`:'No live customer-success workload is connected.','KeyBot company enquiry feed')
    };
  }

  async function loadFloorConfig(client,companyId){
    if(!client||!companyId)return [];
    try{const result=await client.rpc('keysuite_get_keyhq_config_v42921',{p_company_id:companyId});if(result.error)return [];const value=Array.isArray(result.data)?result.data[0]?.floors:result.data?.floors;return Array.isArray(value)?value:[]}catch(_){return []}
  }

  async function keyhqContext(){
    const access=window.KEYSUITE_ACCESS||{},profile=window.KEYSUITE_PROFILE||{},companyId=String(access.company_id||profile.company_id||'');
    const context={name:profile.display_name||access.display_name||profile.email||access.email||'Keylargo User',email:profile.email||access.email||'',role:access.role||'user',companyId,canProjector:canProjector(),canConfigure:canConfigure(),eventMode:canProjector()?'demo':'locked',events:canProjector()?demoEvents:[],floorConfig:[],refreshedAt:new Date().toISOString(),agents:{}};
    const client=window.KeySuiteAuth?.getClient?.();context.floorConfig=await loadFloorConfig(client,companyId);
    if(!client||!context.canProjector){context.agents=agentSignals(context);return context}
    try{
      const inbox=await client.functions.invoke('keysuite-keyai',{body:{action:'list_inbox',limit:100}});if(inbox.error)throw inbox.error;
      if(inbox.data?.error||inbox.data?.ok===false)throw new Error(String(inbox.data?.error||'The KeySuite enquiry feed did not verify.'));
      const items=Array.isArray(inbox.data?.items)?inbox.data.items:[];
      context.events=items.map(item=>({id:String(item.id||''),sender:item.sender_name||item.sender_username||item.sender_id||'Telegram enquiry',message:item.raw_message||item.ai_summary||'New KeyBot enquiry',status:String(item.status||'received'),createdAt:String(item.created_at||''),isDemo:false})).filter(item=>item.id&&item.message);
      context.eventMode=context.events.length?'live':'empty';
    }catch(error){console.warn('KeyHQ could not verify the company KeyBot feed.',error);context.eventMode='error';context.events=[]}
    context.agents=agentSignals(context);return context;
  }

  async function sendContext(){const request=++contextRequest,frame=document.getElementById('keyhqFrame');if(!frame?.contentWindow)return;const context=await keyhqContext();if(request!==contextRequest)return;frame.contentWindow.postMessage({type:'KEYHQ_CONTEXT',context},location.origin)}
  async function saveFloorConfig(floors){
    const frame=document.getElementById('keyhqFrame'),companyId=String(window.KEYSUITE_ACCESS?.company_id||'');
    if(!canConfigure())return frame?.contentWindow?.postMessage({type:'KEYHQ_CONFIG_RESULT',ok:false,error:'Only an Owner or Admin can configure KeyHQ floors.'},location.origin);
    const client=window.KeySuiteAuth?.getClient?.();if(!client||!companyId)return frame?.contentWindow?.postMessage({type:'KEYHQ_CONFIG_RESULT',ok:false,error:'The secure KeySuite connection is unavailable.'},location.origin);
    try{const result=await client.rpc('keysuite_save_keyhq_config_v42921',{p_company_id:companyId,p_floors:Array.isArray(floors)?floors:[]});if(result.error)throw result.error;frame?.contentWindow?.postMessage({type:'KEYHQ_CONFIG_RESULT',ok:true,floors:Array.isArray(floors)?floors:[]},location.origin)}catch(error){frame?.contentWindow?.postMessage({type:'KEYHQ_CONFIG_RESULT',ok:false,error:String(error?.message||error)},location.origin)}
  }

  function startRefresh(){clearInterval(refreshTimer);refreshTimer=window.setInterval(()=>{if(document.getElementById('keyhqOverlay')?.classList.contains('keyhq-open'))sendContext()},REFRESH_MS)}
  function stopRefresh(){clearInterval(refreshTimer);refreshTimer=0}
  function open(){const node=overlay(),frame=node.querySelector('#keyhqFrame');if(!frame.getAttribute('src'))frame.src='keyhq/index.html?embedded=1&v=42921r3';node.classList.add('keyhq-open');document.body.classList.add('keyhq-active');document.getElementById('keyhqNavButton')?.classList.add('active');if(frame.contentDocument?.readyState==='complete')sendContext();startRefresh()}
  function close(){document.getElementById('keyhqOverlay')?.classList.remove('keyhq-open');document.body.classList.remove('keyhq-active');document.getElementById('keyhqNavButton')?.classList.remove('active');stopRefresh()}
  function boot(){installStyles();document.getElementById('keyhqNavButton')?.addEventListener('click',open);window.addEventListener('message',event=>{const frame=document.getElementById('keyhqFrame');if(event.origin!==location.origin||event.source!==frame?.contentWindow)return;if(event.data?.type==='KEYHQ_CLOSE')close();if(event.data?.type==='KEYHQ_READY'||event.data?.type==='KEYHQ_REFRESH')sendContext();if(event.data?.type==='KEYHQ_SAVE_CONFIG')saveFloorConfig(event.data.floors)});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.getElementById('keyhqOverlay')?.classList.contains('keyhq-open'))close()})}

  window.KeySuiteKeyHQ={open,close,refresh:sendContext};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
