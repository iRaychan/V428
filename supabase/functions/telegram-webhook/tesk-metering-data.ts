export type TeskServiceType='water'|'chemical_dosing'|'chemical_transfer'|'dosing'|'ambiguous'|'none';
export type TeskMeteringRequest={
  raw_text?:string;service_type?:TeskServiceType;medium?:string;medium_key?:string;
  concentration_pct?:number|null;temperature_c?:number|null;flow_lph?:number|null;pressure_bar?:number|null;
};

type ChemicalRule={
  key:string;name:string;aliases:string[];concentrations?:number[];maxTempC?:number;
  head:'PVDF'|'PVC'|'316SS';diaphragm:string;seal:string;avoid?:string[];note:string;
};

// V4.28.02: conservative digital rules derived from TESK's catalogue anticorrosion table.
// A rule is returned only when the catalogue condition represented here covers the request.
// Uncovered chemicals / concentrations / temperatures must be confirmed by engineering.
export const TESK_CHEMICAL_RULES:ChemicalRule[]=[
  {key:'sodium_hypochlorite',name:'Sodium hypochlorite',aliases:['sodium hypochlorite','naocl','bleach'],concentrations:[10],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'EPDM',avoid:['304SS','316SS'],note:'TESK table supports fluoroplastic and EPDM for the represented 10% sodium hypochlorite condition; stainless steel is not selected.'},
  {key:'hydrochloric_acid',name:'Hydrochloric acid',aliases:['hydrochloric acid','hcl','muriatic acid'],concentrations:[30,38],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'EPDM',avoid:['304SS','316SS'],note:'TESK table lists muriatic/hydrochloric acid rows at 30% and 38%; PVDF/fluoroplastic is used as the conservative liquid-end choice.'},
  {key:'sulfuric_acid',name:'Sulfuric acid',aliases:['sulfuric acid','sulphuric acid','h2so4'],concentrations:[50],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'FPM',note:'TESK table includes sulfuric acid at 50%; PVDF/fluoroplastic is used as the conservative liquid-end choice.'},
  {key:'sulfuric_acid_98',name:'Sulfuric acid',aliases:['sulfuric acid','sulphuric acid','h2so4'],concentrations:[98],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'FPM',avoid:['EPDM'],note:'TESK table includes 98% sulfuric acid. Fluoroplastic is the conservative liquid-end choice; elastomer compatibility must stay within the catalogue condition.'},
  {key:'sodium_hydroxide',name:'Sodium hydroxide',aliases:['sodium hydroxide','naoh','caustic soda','caustic'],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'EPDM',note:'TESK table includes sodium hydroxide; PVDF/fluoroplastic with EPDM is used as the conservative choice.'},
  {key:'ferric_chloride',name:'Ferric chloride',aliases:['ferric chloride','fecl3'],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'EPDM',avoid:['304SS','316SS'],note:'TESK table includes ferric chloride; PVDF/fluoroplastic is preferred over stainless steel.'},
  {key:'phosphoric_acid',name:'Phosphoric acid',aliases:['phosphoric acid','h3po4'],concentrations:[85],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'EPDM',note:'TESK table includes phosphoric acid at 85%; PVDF/fluoroplastic is used as the conservative choice.'},
  {key:'nitric_acid',name:'Nitric acid',aliases:['nitric acid','hno3'],concentrations:[50,95],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'FPM',note:'TESK table includes nitric acid at 50% and 95%; PVDF/fluoroplastic is used as the conservative liquid-end choice.'},
  {key:'hydrogen_peroxide',name:'Hydrogen peroxide',aliases:['hydrogen peroxide','h2o2'],concentrations:[90],maxTempC:50,head:'PVDF',diaphragm:'PTFE composite',seal:'EPDM',note:'TESK table includes 90% hydrogen peroxide. Confirm the exact operating condition before final supply.'},
  {key:'water',name:'Water',aliases:['water','clean water','city water','tap water'],head:'PVC',diaphragm:'PTFE composite',seal:'EPDM',note:'Water service does not require chemical compatibility screening.'}
];

type CksPoint={code:string;maxFlowLph:number;maxPressureBar:number};
export const TESK_CKS_POINTS:CksPoint[]=[
  {code:'03',maxFlowLph:2.3,maxPressureBar:10},{code:'04',maxFlowLph:4.4,maxPressureBar:7},
  {code:'06',maxFlowLph:6,maxPressureBar:4},{code:'12',maxFlowLph:12.2,maxPressureBar:2},
  {code:'05',maxFlowLph:4.9,maxPressureBar:10},{code:'08',maxFlowLph:7.8,maxPressureBar:7},
  {code:'16',maxFlowLph:16.4,maxPressureBar:4},{code:'24',maxFlowLph:24.2,maxPressureBar:2}
];

type SeriesEnvelope={series:string;maxFlowLph:number;maxPressureBar:number;materials:string[];plasticMaxBar?:number;note:string};
export const TESK_SERIES_ENVELOPES:SeriesEnvelope[]=[
  {series:'GS',maxFlowLph:59,maxPressureBar:10,materials:['PVC','PVDF','316SS'],note:'Mechanical diaphragm metering pump series.'},
  {series:'GLS',maxFlowLph:152,maxPressureBar:10,materials:['PVC','PVDF','316SS'],note:'Mechanical diaphragm metering pump series.'},
  {series:'GTS',maxFlowLph:500,maxPressureBar:7,materials:['PVC','PVDF','316SS'],note:'Mechanical diaphragm metering pump series.'},
  {series:'GM/GB',maxFlowLph:2040,maxPressureBar:12,materials:['PVC','PVDF','316SS'],note:'General mechanical diaphragm metering pump family.'},
  {series:'JMLS',maxFlowLph:190,maxPressureBar:59,materials:['304SS','316SS','PVDF'],plasticMaxBar:10,note:'Hydraulic diaphragm metering pump series; plastic liquid end is limited to the catalogue plastic pressure rating.'},
  {series:'JMBS',maxFlowLph:430,maxPressureBar:92,materials:['304SS','316SS','PVDF'],plasticMaxBar:10,note:'Hydraulic diaphragm metering pump series; plastic liquid end is limited to the catalogue plastic pressure rating.'},
  {series:'JMXS',maxFlowLph:1600,maxPressureBar:40,materials:['PVC','PVDF','304SS','316SS'],plasticMaxBar:8,note:'Hydraulic diaphragm metering pump series; plastic liquid end is limited to the catalogue plastic pressure rating.'}
];

const norm=(v:any)=>String(v??'').toLowerCase().replace(/[³]/g,'3').replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
const num=(v:any)=>{const n=Number(v);return Number.isFinite(n)?n:null};

export function identifyTeskMedium(text:any){
  const s=norm(text);
  const sorted=[...TESK_CHEMICAL_RULES].sort((a,b)=>Math.max(...b.aliases.map(x=>x.length))-Math.max(...a.aliases.map(x=>x.length)));
  for(const rule of sorted){for(const alias of rule.aliases){const a=norm(alias);if(a&&s.includes(a))return {key:rule.key.replace(/_98$/,''),name:rule.name}}}
  return {key:'',name:''};
}

function parseFlowLph(text:string){
  const s=norm(text);let m=s.match(/(\d+(?:\.\d+)?)\s*(?:l\s*\/\s*(?:h|hr|hour)|lph|lit(?:re|er)s?\s*\/\s*(?:h|hr|hour))/i);if(m)return num(m[1]);
  m=s.match(/(\d+(?:\.\d+)?)\s*(?:ml\s*\/\s*(?:min|minute)|mlpm)/i);if(m){const n=num(m[1]);return n==null?null:n*.06}
  return null;
}
function parsePressureBar(text:string){
  const s=norm(text);const patterns=[
    [/(?:@|pressure\s*[:=]?)\s*(\d+(?:\.\d+)?)\s*bar\b/i,1],
    [/(?:@|pressure\s*[:=]?)\s*(\d+(?:\.\d+)?)\s*mpa\b/i,10],
    [/(?:@|pressure\s*[:=]?)\s*(\d+(?:\.\d+)?)\s*kpa\b/i,.01],
    [/(?:@|pressure\s*[:=]?)\s*(\d+(?:\.\d+)?)\s*psi\b/i,.0689476]
  ] as const;
  for(const [re,factor] of patterns){const m=s.match(re);if(m){const n=num(m[1]);return n==null?null:n*factor}}
  const fallback=s.match(/\b(\d+(?:\.\d+)?)\s*bar\b/i);return fallback?num(fallback[1]):null;
}
function parseTemperatureC(text:string){const m=norm(text).match(/(?:temp(?:erature)?\s*[:=]?\s*)?(\d+(?:\.\d+)?)\s*°?\s*c\b/i);return m?num(m[1]):null}
function parseConcentration(text:string){const m=norm(text).match(/\b(\d+(?:\.\d+)?)\s*%/);return m?num(m[1]):null}

export function parseTeskMeteringRequest(text:any):TeskMeteringRequest{
  const raw=String(text||''),s=norm(raw),medium=identifyTeskMedium(raw);
  const flowLph=parseFlowLph(raw),pressureBar=parsePressureBar(raw),temp=parseTemperatureC(raw),conc=parseConcentration(raw);
  const explicitDose=/\b(?:dosing|dose|metering|injection|inject)\b/i.test(s);
  const explicitChemicalPump=/\btesk\s+chemical\s+pump\b|\bchemical\s+(?:dosing|metering)\s+pump\b/i.test(s);
  const explicitTransfer=/\b(?:transfer|circulation|circulating|process\s+pump)\b/i.test(s);
  const m3=/\b\d+(?:\.\d+)?\s*(?:m3|m³)\s*\/\s*(?:h|hr|hour)\b/i.test(raw);
  const headM=/(?:@|head\s*[:=]?)\s*\d+(?:\.\d+)?\s*(?:m|mtr|metres?|meters?)\b/i.test(raw);
  let service_type:TeskServiceType='none';
  if(explicitTransfer||(medium.key&&m3&&headM))service_type='chemical_transfer';
  else if(explicitChemicalPump)service_type='chemical_dosing';
  else if(explicitDose||((flowLph!=null&&pressureBar!=null)&&(medium.key||/\b(?:chemical|acid|alkali|bleach|caustic)\b/i.test(s))))service_type=medium.key==='water'?'dosing':medium.key?'chemical_dosing':'dosing';
  else if(flowLph!=null&&pressureBar!=null)service_type=medium.key&&medium.key!=='water'?'chemical_dosing':'dosing';
  else if(medium.key&&flowLph!=null)service_type=medium.key==='water'?'dosing':'chemical_dosing';
  else if(medium.key)service_type=medium.key==='water'?'ambiguous':'ambiguous';
  return {raw_text:raw,service_type,medium:medium.name||undefined,medium_key:medium.key||undefined,concentration_pct:conc,temperature_c:temp,flow_lph:flowLph,pressure_bar:pressureBar};
}

export function mergeTeskMeteringRequest(a:any,b:any):TeskMeteringRequest{
  const out:any={...(a&&typeof a==='object'?a:{}),...(b&&typeof b==='object'?b:{})};
  for(const k of ['medium','medium_key','service_type','concentration_pct','temperature_c','flow_lph','pressure_bar'])if(b?.[k]==null||b?.[k]==='')out[k]=a?.[k]??b?.[k];
  out.raw_text=[a?.raw_text,b?.raw_text].filter(Boolean).join(' | ');return out;
}

export function teskMeteringLooksRelevant(req:any){return !!req&&String(req.service_type||'none')!=='none'}
export function teskMeteringIsChemical(req:any){return !!req?.medium_key&&req.medium_key!=='water'}

function concentrationCovered(rule:ChemicalRule,requested:any){
  const n=Number(requested);if(!rule.concentrations?.length)return true;if(!Number.isFinite(n))return false;
  return rule.concentrations.some(x=>Math.abs(x-n)<0.26);
}
export function teskMaterialRecommendation(req:any){
  const key=String(req?.medium_key||'');if(!key)return {status:'missing_medium'};
  const candidates=TESK_CHEMICAL_RULES.filter(r=>r.key.replace(/_98$/,'')===key);
  const rule=candidates.find(r=>concentrationCovered(r,req?.concentration_pct)&&(!r.maxTempC||Number(req?.temperature_c)<=r.maxTempC));
  if(!rule)return {status:'not_confirmed',medium:req?.medium||key,reason:'The requested chemical concentration / temperature is not covered by the conservative V4.28.02 catalogue rule. Engineering review is required.'};
  return {status:'confirmed',medium:rule.name,pump_head:rule.head,diaphragm:rule.diaphragm,seal:rule.seal,avoid:rule.avoid||[],note:rule.note};
}

export function selectTeskMeteringPump(req:any,material:any){
  const q=Number(req?.flow_lph),p=Number(req?.pressure_bar);if(!(q>0)||!(p>0))return {status:'missing_duty'};
  const materialName=String(material?.pump_head||'').toUpperCase();
  const cks=TESK_CKS_POINTS.filter(x=>x.maxFlowLph>=q&&x.maxPressureBar>=p).sort((a,b)=>a.maxFlowLph-b.maxFlowLph||a.maxPressureBar-b.maxPressureBar)[0];
  if(cks&&(!materialName||['PVDF','316SS'].includes(materialName)))return {status:'exact',series:'CKS',model:`CKS ${cks.code}`,variants:[`CKSS${cks.code}`,`CKSP${cks.code}`,`CKSZ${cks.code}`],max_flow_lph:cks.maxFlowLph,max_pressure_bar:cks.maxPressureBar,note:'Exact CKS hydraulic point. Choose S/P/Z control version to suit the control signal.'};
  const families=TESK_SERIES_ENVELOPES.filter(x=>x.maxFlowLph>=q&&x.maxPressureBar>=p&&(!materialName||x.materials.includes(materialName))&&(!(x.plasticMaxBar&&['PVC','PVDF'].includes(materialName))||p<=x.plasticMaxBar)).sort((a,b)=>a.maxFlowLph-b.maxFlowLph||a.maxPressureBar-b.maxPressureBar);
  const best=families[0];if(!best)return {status:'not_confirmed',reason:'No catalogue-confirmed series/material envelope in V4.28.02 covers this duty. Engineering review is required.'};
  return {status:'series',series:best.series,max_flow_lph:best.maxFlowLph,max_pressure_bar:best.maxPressureBar,note:`${best.note} Exact model must be confirmed against the TESK flow/pressure table.`};
}

const fmt=(n:any)=>{const v=Number(n);return Number.isFinite(v)?(Math.round(v*10)/10).toString():'-'};
export function formatTeskMeteringRecommendation(customerName:string,req:any,material:any,pump:any,chemicalSelection=true){
  const lines=[`Customer: ${customerName||'-'}`,'','TESK Chemical Pump',`Service: ${req?.service_type==='chemical_dosing'?'Chemical Dosing / Metering':'Dosing / Metering'}`,`Medium: ${req?.medium||'Not specified'}`];
  if(req?.concentration_pct!=null)lines.push(`Concentration: ${fmt(req.concentration_pct)}%`);
  if(req?.temperature_c!=null)lines.push(`Temperature: ${fmt(req.temperature_c)}°C`);
  lines.push(`Duty: ${fmt(req?.flow_lph)} L/hr @ ${fmt(req?.pressure_bar)} bar`,'');
  if(chemicalSelection){
    lines.push('Material');
    if(material?.status==='confirmed'){
      lines.push(`Pump head: ${material.pump_head}`,`Diaphragm: ${material.diaphragm}`,`Seal / O-ring: ${material.seal}`);
      if(material?.avoid?.length)lines.push(`Avoid: ${material.avoid.join(', ')}`);
      lines.push(`Compatibility: Catalogue-backed conservative rule`,`Note: ${material.note}`);
    }else lines.push('Compatibility: Not confirmed',`Note: ${material?.reason||'Engineering review is required before final material selection.'}`);
    lines.push('');
  }
  lines.push('Pump');
  if(pump?.status==='exact')lines.push(`Recommended: ${pump.model}`,`Control variants: ${pump.variants.join(' / ')}`,`Catalogue capability: up to ${fmt(pump.max_flow_lph)} L/hr @ ${fmt(pump.max_pressure_bar)} bar`,`Note: ${pump.note}`);
  else if(pump?.status==='series')lines.push(`Recommended series: ${pump.series}`,`Series envelope: up to ${fmt(pump.max_flow_lph)} L/hr @ ${fmt(pump.max_pressure_bar)} bar`,`Note: ${pump.note}`);
  else lines.push('Recommendation: Not confirmed',`Note: ${pump?.reason||'Engineering review is required.'}`);
  lines.push('','Technical selection only. Confirm chemical concentration, temperature and final wetted-parts compatibility before supply.');
  return lines.join('\n');
}
