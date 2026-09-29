(() => {
  'use strict';
  const d=document, w=window;
  const q=(s,r=d)=>r.querySelector(s), qa=(s,r=d)=>[...r.querySelectorAll(s)];
  const reduced=w.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const sleep=ms=>new Promise(res=>setTimeout(res,ms));
  const store={get(k){try{return sessionStorage.getItem(k)}catch{return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch{}},remove(k){try{sessionStorage.removeItem(k)}catch{}}};

  const pageName=(url=location.href)=>{
    let p=''; try{p=new URL(url,location.href).pathname.split('/').pop()||'index.html'}catch{p='index.html'}
    const map={
      'index.html':'PAROGLU / 01','hakkimda.html':'PAROGLU / 02','hizmetler.html':'PAROGLU / 03','isler.html':'PAROGLU / 04','iletisim.html':'PAROGLU / 05','teklif-al.html':'PAROGLU / BRIEF',
      'konser.html':'PAROGLU / KONSER','fotograf.html':'PAROGLU / FOTOĞRAF','tasarim.html':'PAROGLU / TASARIM','drone.html':'PAROGLU / DRONE',
      'karabuk-idman-yurdu.html':'PROJECT / KİY','kepezspor.html':'PROJECT / KEPEZSPOR','corluspor.html':'PROJECT / ÇORLUSPOR','karabuk-otobus-tasarimi.html':'PROJECT / OTOBÜS',
      'konser-sefo.html':'PROJECT / SEFO','konser-hakan-peker.html':'PROJECT / HAKAN PEKER','konser-dedubluman.html':'PROJECT / DEDUBLÜMAN','konser-poizi.html':'PROJECT / POİZİ','konser-gokhan-turkmen.html':'PROJECT / GÖKHAN TÜRKMEN'
    };
    return map[p]||'PAROGLU MEDIA';
  };

  /* First entry: only on homepage and only once per tab. */
  async function runIntro(){
    const intro=q('.v12-intro');
    if(!intro) return heroIn(80);
    if(reduced || store.get('pmV12IntroSeen')){
      document.documentElement.classList.add('v12-intro-seen'); intro.remove(); heroIn(70); return;
    }
    intro.classList.add('v12-run');
    const logo=q('.v12-intro-logo',intro), line=q('.v12-intro-line',intro), meta=q('.v12-intro-meta',intro);
    logo?.animate([{opacity:0,transform:'translateY(12px) scale(.985)',filter:'blur(6px)'},{opacity:1,transform:'translateY(0) scale(1)',filter:'blur(0)'}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
    line?.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:620,delay:180,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
    meta?.animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay:280,easing:'ease-out',fill:'forwards'});
    await sleep(840);
    intro.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.015)'}],{duration:360,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
    store.set('pmV12IntroSeen','1');
    heroIn(30);
    await sleep(380); intro.remove();
  }
  function heroIn(delay=0){setTimeout(()=>d.body.classList.add('v12-hero-ready'),delay)}

  /* Arrival transition from previous internal page. */
  async function arrive(){
    const trans=q('.page-transition');
    if(!trans) return;
    const incoming=store.get('pmV12Transition');
    if(!incoming){document.documentElement.classList.remove('v12-arriving');return}
    trans.dataset.v12Label=pageName(location.href);
    trans.classList.add('v12-active');
    await sleep(55);
    trans.style.transformOrigin='top center';
    trans.classList.remove('v12-active');
    document.documentElement.classList.remove('v12-arriving');
    d.body.style.overflow='';
    await sleep(500); trans.style.transformOrigin='bottom center'; store.remove('pmV12Transition');
  }

  /* Text masks and section reveals. */
  function setupReveals(){
    const maskSelectors=['.section-title','.work-intro-line h2','.artist-gallery-head h2','.category-hero h1','.case-hero h1','.cvc-title','.bus-title','.contact-hero-v2 h1'];
    qa(maskSelectors.join(',')).forEach(el=>{
      if(el.classList.contains('v12-mask')||el.closest('.hero-title')) return;
      const inner=d.createElement('span'); inner.className='v12-mask-inner';
      while(el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner); el.classList.add('v12-mask');
    });
    const revealEls=qa('.v12-mask,.section-head,.home-service-card,.home-why-card,.brand-marquee-grid,.about-copy,.portrait,.stats,.about-manifesto,.case-gallery,.artist-gallery-section,.talk-scope-card');
    revealEls.forEach((el,i)=>{if(!el.classList.contains('v12-mask'))el.classList.add('v12-reveal');el.style.setProperty('--v12-order',String(i%5))});
    if(reduced){revealEls.forEach(el=>el.classList.add('v12-in'));return}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v12-in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    revealEls.forEach(el=>io.observe(el));
  }

  /* Calm portfolio image changes. app.js owns the actual 6.5s swap; this observes each change. */
  function photoTransitions(){
    qa('.home-work-media img').forEach(img=>{
      const parent=img.closest('.home-work-media');
      let last=img.currentSrc||img.src;
      new MutationObserver(()=>{
        const now=img.currentSrc||img.src; if(now===last)return; last=now;
        parent?.classList.remove('v12-photo-change'); void parent?.offsetWidth; parent?.classList.add('v12-photo-change');
        setTimeout(()=>parent?.classList.remove('v12-photo-change'),950);
      }).observe(img,{attributes:true,attributeFilter:['src']});
    });
  }

  /* Subtle cursor-light, no heavy 3D. */
  function hoverLight(){
    const selector='.project-card,.home-work-card,.home-category-card,.photo-category-card,.artist-cover';
    qa(selector).forEach(card=>card.addEventListener('pointermove',e=>{
      if(reduced)return; const r=card.getBoundingClientRect();
      card.style.setProperty('--v12-x',`${((e.clientX-r.left)/r.width)*100}%`);
      card.style.setProperty('--v12-y',`${((e.clientY-r.top)/r.height)*100}%`);
    },{passive:true}));
  }

  /* Signature image breathes only as it enters. */
  function signatureMotion(){
    const shells=qa('.paroglu-signature .signature-shell'); if(!shells.length)return;
    if(reduced){shells.forEach(s=>s.style.setProperty('--v12-signature-scale','1'));return}
    const update=()=>shells.forEach(s=>{
      const r=s.getBoundingClientRect(); const vh=innerHeight||800;
      const p=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height)));
      s.style.setProperty('--v12-signature-scale',String(1.03-(p*.03)));
      s.style.setProperty('--v12-signature-glow',String(.12+(p*.34)));
    });
    update(); addEventListener('scroll',update,{passive:true}); addEventListener('resize',update,{passive:true});
  }

  /* Assistant polish + aria state. */
  function assistantMotion(){
    const launch=q('.assistant-launch'), panel=q('.assistant-panel'), close=q('.assistant-close'), msgs=q('.messages');
    if(!launch||!panel)return;
    const sync=()=>launch.setAttribute('aria-expanded',panel.classList.contains('open')?'true':'false');
    launch.addEventListener('click',()=>setTimeout(sync,0)); close?.addEventListener('click',()=>setTimeout(sync,0));
    if(msgs)new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)n.animate?.([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:360,easing:'cubic-bezier(.16,1,.3,1)'})}))).observe(msgs,{childList:true});
  }

  /* Project-card shared exit, then destination hero settles. */
  const sharedSelector='.project-card,.home-work-card,.home-category-card,.photo-category-card,.artist-cover,.sport-cover-row a,.next-project';
  function isInternal(a){
    if(!a||a.target==='_blank'||a.hasAttribute('download'))return false;
    const raw=a.getAttribute('href')||''; if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:')||raw.startsWith('javascript:'))return false;
    try{const u=new URL(raw,location.href);return u.origin===location.origin&&!(u.pathname===location.pathname&&u.hash)}catch{return false}
  }
  async function sharedExit(a,url){
    const img=q('img',a)||q('video',a); if(!img||reduced)return standardExit(url);
    const r=img.getBoundingClientRect(); if(!r.width||!r.height)return standardExit(url);
    const src=img.currentSrc||img.src||img.poster; if(!src)return standardExit(url);
    const clone=d.createElement('div'); clone.className='v12-shared-clone'; clone.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;background-image:url("${src.replace(/"/g,'%22')}");`;
    d.body.appendChild(clone); d.body.classList.add('v12-shared-leaving');
    store.set('pmV12Shared','1'); store.set('pmV12Transition','1');
    const anim=clone.animate([
      {left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`,borderRadius:'20px',backgroundPosition:'center'},
      {left:'0px',top:'0px',width:'100vw',height:'100vh',borderRadius:'0px',backgroundPosition:'center'}
    ],{duration:540,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
    await anim.finished.catch(()=>{}); location.href=url.href;
  }
  async function standardExit(url){
    const trans=q('.page-transition'); store.set('pmV12Transition','1');
    if(!trans||reduced){location.href=url.href;return}
    trans.dataset.v12Label=pageName(url.href); trans.style.transformOrigin='bottom center'; trans.classList.add('v12-active');
    await sleep(465); location.href=url.href;
  }
  function navigation(){
    d.addEventListener('click',e=>{
      const a=e.target.closest('a[href]');
      if(!a||e.defaultPrevented||e.button>0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||!isInternal(a))return;
      const url=new URL(a.getAttribute('href'),location.href); e.preventDefault(); e.stopImmediatePropagation();
      if(a.matches(sharedSelector)||a.closest(sharedSelector)) sharedExit(a.closest(sharedSelector)||a,url); else standardExit(url);
    },true);
  }
  function destinationHero(){
    if(!store.get('pmV12Shared'))return; store.remove('pmV12Shared');
    const target=q('.case-hero img,.cvc-hero-media img,.bus-hero img,.concert-photo-hero img,.category-hero img,.project-visual img,main figure img,main img');
    if(target)target.classList.add('v12-destination-hero');
  }

  function init(){
    navigation(); setupReveals(); photoTransitions(); hoverLight(); signatureMotion(); assistantMotion(); destinationHero();
    arrive(); runIntro();
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
