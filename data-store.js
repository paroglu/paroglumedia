(function(){
  'use strict';
  const cfg=window.PM_BACKEND||{};
  const base=String(cfg.url||'').replace(/\/$/,'');
  const key=cfg.publishableKey||cfg.anonKey||'';
  if(!base||!key){console.warn('Paroglu Media backend config missing');return;}

  async function request(path, options={}){
    const headers={apikey:key,Accept:'application/json',...(options.headers||{})};
    const res=await fetch(base+path,{...options,headers});
    if(!res.ok){
      let msg=`${res.status} ${res.statusText}`;
      try{const j=await res.json();msg=j.message||j.msg||j.error_description||j.error||msg}catch{}
      const err=new Error(msg);err.status=res.status;throw err;
    }
    if(res.status===204)return null;
    const text=await res.text();
    return text?JSON.parse(text):null;
  }

  const select=(table,query='')=>request(`/rest/v1/${table}?${query}`,{method:'GET'});

  window.PMData={
    content(){return select('site_content','select=*&order=section.asc,label.asc');},
    projects(){return select('projects','select=*&published=eq.true&order=sort_order.asc,created_at.desc');},
    brands(){return select('brands','select=*&visible=eq.true&order=row_no.asc,sort_order.asc,created_at.asc');},
    async assistant(){
      try{return await select('assistant_knowledge','select=*&active=eq.true&order=sort_order.asc,created_at.asc')}
      catch(err){if(err.status===404||err.status===400)return [];throw err}
    },
    submitBrief(payload){
      return request('/rest/v1/briefs',{method:'POST',headers:{'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(payload)});
    }
  };
})();
