/* ParogluMedia Studio Cut — standalone, GitHub Pages compatible. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = '../';
  const remoteRoot = 'https://raw.githubusercontent.com/paroglu/paroglumedia/main/';
  const placeholders = { 'concert-gokhan-turkmen-02.jpg': './assets/stage.svg', 'concert-sefo-01.jpg': './assets/stage.svg', 'cover-karabuk.jpg': './assets/sport.svg', 'ack-bicak-poster.jpg': './assets/film.svg', 'cover-design.jpg': './assets/design.svg', 'cover-drone.jpg': './assets/drone.svg' };
  const imageUrl = file => root + file;
  const attachImage = (img, file) => {
    if (!img || !file) return;
    let fallbackStep = 0;
    img.onerror = () => {
      if (fallbackStep === 0) { fallbackStep = 1; img.src = remoteRoot + file; }
      else if (fallbackStep === 1) { fallbackStep = 2; img.src = placeholders[file] || './assets/stage.svg'; }
      else img.onerror = null;
    };
    img.src = imageUrl(file);
  };
  $$('img[data-asset]').forEach(img => attachImage(img, img.dataset.asset));
  const projects = [
    {title:'Sahnenin\nnabzı.',category:'LIVE / FOTOĞRAF',client:'GÖKHAN TÜRKMEN',asset:'concert-gokhan-turkmen-02.jpg',description:'Sahnenin en canlı anları. Işığın, ritmin ve kalabalığın enerjisi.',at:3},
    {title:'Tribünün\nruhu.',category:'SPORT / SOSYAL MEDYA',client:'KARABÜK İDMAN YURDU',asset:'cover-karabuk.jpg',description:'Kırmızı-mavi bir şehrin heyecanını görsel bir dile dönüştüren çalışmalar.',at:21},
    {title:'Anı\ndondur.',category:'LIVE / KONSER',client:'SEFO',asset:'concert-sefo-01.jpg',description:'Bir sahnenin duygusunu, tek karede yeniden hissettirmek.',at:34},
    {title:'Ateş. Çelik.\nZanaat.',category:'FILM / PRODÜKSİYON',client:'ACK BIÇAK',asset:'ack-bicak-poster.jpg',description:'Ürünün karakterini ritim, detay ve sinematik ışıkla anlatmak.',at:46},
    {title:'Fikirden\ngörsele.',category:'BRAND / DESIGN',client:'CREATIVE DESIGN',asset:'cover-design.jpg',description:'Markanın karakterine uygun yalın ve güçlü bir görsel kimlik.',at:9},
    {title:'78’in\nenerjisi.',category:'SPORT / CREATIVE',client:'KARABÜK İDMAN YURDU',asset:'cover-karabuk.jpg',description:'Maç günü ruhunu tasarım, içerik ve hikâye akışıyla büyütmek.',at:63},
    {title:'Sahne hiç\nsusmaz.',category:'LIVE / EVENT',client:'CONCERT STORIES',asset:'concert-gokhan-turkmen-02.jpg',description:'İnsanların unutmadığı konser anlarını yaratıcı karelere taşımak.',at:77},
    {title:'Başka bir\naçıdan.',category:'AERIAL / DRONE',client:'AERIAL CINEMA',asset:'cover-drone.jpg',description:'Yüksekten bakarak farklı bir ölçek, farklı bir atmosfer yakalamak.',at:89}
  ];
  let activeIndex = 0;
  let playing = false;
  let raf = 0;
  let lastTick = 0;
  let position = 3;
  let transitionTimer;
  const clips = $$('.timeline-clip');
  const playButton = $('#playTimeline');
  const playhead = $('#playhead');
  const clipPositions = projects.map(p => p.at);
  const setPlayhead = pct => { position = Math.max(0,Math.min(98,pct)); playhead.style.left = `${position}%`; const secs = (position/100)*16; const frame = Math.round((secs%1)*24); $('#monitorTime').textContent = `00:00:${String(Math.floor(secs)).padStart(2,'0')}:${String(frame).padStart(2,'0')}`; };
  function selectProject(i, opts={}) {
    activeIndex = (i + projects.length) % projects.length;
    const p = projects[activeIndex];
    const monitor = $('#monitorViewport');
    monitor.classList.add('changing');
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => { const im = $('#monitorImage'); attachImage(im, p.asset); im.alt = p.client + ' projesi'; monitor.classList.remove('changing'); }, 170);
    $('#monitorTitle').innerHTML = p.title.split('\n').map(x => x.replaceAll('&','&amp;').replaceAll('<','&lt;')).join('<br>');
    $('#monitorCategory').textContent = p.category;
    $('#monitorClient').textContent = p.client;
    $('#projectDescription').textContent = p.description;
    $('.editor-info small').textContent = `PROJECT / ${String(activeIndex+1).padStart(2,'0')} OF 08`;
    clips.forEach(c => { const isActive = Number(c.dataset.project) === activeIndex; c.classList.toggle('active',isActive); c.setAttribute('aria-pressed',String(isActive)); });
    if(!opts.keepHead) setPlayhead(p.at);
    if(opts.scroll) clips.find(c => Number(c.dataset.project)===activeIndex)?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'nearest',inline:'center'});
  }
  clips.forEach(c => c.addEventListener('click', () => { pause(); selectProject(Number(c.dataset.project)); }));
  $('#prevProject').addEventListener('click', () => {pause();selectProject(activeIndex-1,{scroll:true});});
  $('#nextProject').addEventListener('click', () => {pause();selectProject(activeIndex+1,{scroll:true});});
  function pause(){playing=false;cancelAnimationFrame(raf);playButton.innerHTML='▶ <span>OYNAT</span>';playButton.setAttribute('aria-label','Sekansı oynat');$('#timelineStatus').textContent='PAUSED';}
  function frame(t){if(!playing)return; if(!lastTick)lastTick=t;const elapsed=Math.min(t-lastTick,85);lastTick=t;const next=position+elapsed*.009; if(next>=98){pause();setPlayhead(3);selectProject(0);return;}setPlayhead(next);let closest=0; for(let i=1;i<projects.length;i++)if(Math.abs(projects[i].at-next)<Math.abs(projects[closest].at-next))closest=i;if(closest!==activeIndex)selectProject(closest,{keepHead:true});raf=requestAnimationFrame(frame);}
  playButton.addEventListener('click',()=>{if(playing){pause();return;}playing=true;lastTick=0;playButton.innerHTML='Ⅱ <span>DURAKLAT</span>';playButton.setAttribute('aria-label','Sekansı duraklat');$('#timelineStatus').textContent='PLAYING';raf=requestAnimationFrame(frame);});
  // Dragging the ruler and track background scrubs the video-editor playhead.
  const track = $('#trackArea');
  track.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pause();const rect=track.getBoundingClientRect();const pct=(e.clientX-rect.left)/rect.width*100;setPlayhead(pct);let nearest=0;projects.forEach((p,i)=>{if(Math.abs(p.at-pct)<Math.abs(projects[nearest].at-pct))nearest=i;});selectProject(nearest,{keepHead:true});});
  const methods=[
    {num:'NOT / 001',quote:'İlk üç saniyede<br><em>merak uyandır.</em>',desc:'Kamera açılmadan önce sorumuz aynı: İzleyici neden durup bu hikâyeye baksın?',tag:'DİKKAT / HOOK'},
    {num:'NOT / 002',quote:'Ritmi bul.<br><em>Boşluğu bırak.</em>',desc:'İyi kurgu çok kesmek değil; ne zaman hızlanıp ne zaman duracağını bilmektir.',tag:'KURGU / RİTİM'},
    {num:'NOT / 003',quote:'Görüntü değil.<br><em>His bırak.</em>',desc:'Bir konserin sesi, bir tribünün gururu veya markanın karakteri tek bir kareye sığabilir.',tag:'DUYGU / HİKÂYE'},
    {num:'NOT / 004',quote:'Son karede<br><em>iz bırak.</em>',desc:'Finalin gücü, izleyicinin video bittikten sonra aklında kalan düşüncedir.',tag:'ETKİ / FİNAL'}
  ];
  const methodTabs=$$('.notebook-tab');
  function setMethod(i){const m=methods[i];$('#methodNum').textContent=m.num;$('#methodQuote').innerHTML=m.quote;$('#methodDesc').textContent=m.desc;$('#methodTag').textContent=m.tag;methodTabs.forEach((t,j)=>{t.classList.toggle('active',i===j);t.setAttribute('aria-selected',String(i===j));t.tabIndex=i===j?0:-1;});$('#methodPanel').setAttribute('aria-labelledby',`methodTab${i}`);}
  methodTabs.forEach((t,i)=>{t.addEventListener('click',()=>setMethod(i));t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:-1)+methodTabs.length)%methodTabs.length;setMethod(next);methodTabs[next].focus();}})});
  const reelProjectIndices=[0,1,3,2,4];
  const projectDialog=$('#projectDialog');
  $$('.reel-item[data-reel-index]').forEach(el=>el.addEventListener('click',()=>{
    const p=projects[reelProjectIndices[Number(el.dataset.reelIndex)]];
    attachImage($('#projectDialogImage'),p.asset);
    $('#projectDialogImage').alt=p.client+' projesi';
    $('#projectDialogTag').textContent=p.category+' / '+p.client;
    $('#projectDialogTitle').textContent=p.title.replace('\n',' ');
    $('#projectDialogText').textContent=p.description;
    if(projectDialog.showModal)projectDialog.showModal();else projectDialog.setAttribute('open','');
  }));
  $('#projectClose').addEventListener('click',()=>projectDialog.close());
  projectDialog.addEventListener('click',e=>{if(e.target===projectDialog)projectDialog.close();});
  $('#reelPrev').addEventListener('click',()=>$('#reel').scrollBy({left:-Math.min(540,innerWidth*.85),behavior:reduce?'instant':'smooth'}));
  $('#reelNext').addEventListener('click',()=>$('#reel').scrollBy({left:Math.min(540,innerWidth*.85),behavior:reduce?'instant':'smooth'}));
  const toggle=$('#menuToggle');const menu=$('#menu');function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Menüyü aç');menu.classList.remove('open');menu.setAttribute('inert','');document.body.classList.remove('menu-open');}toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';if(open){toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Menüyü kapat');menu.classList.add('open');menu.removeAttribute('inert');document.body.classList.add('menu-open');}else closeMenu();});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  let scrolled=false;function onScroll(){if(scrolled)return;scrolled=true;requestAnimationFrame(()=>{let max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(max?scrollY/max*100:0)+'%';scrolled=false;});}window.addEventListener('scroll',onScroll,{passive:true});
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});$$('.reveal').forEach(e=>observer.observe(e));}else $$('.reveal').forEach(e=>e.classList.add('visible'));
  // Real sound control: toggles the owner's teaser video, never simulates audio.
  const video=$('#showreelVideo');video.src=root+video.dataset.video;const sound=$('#soundToggle');sound.addEventListener('click',async()=>{if(!video.muted){video.muted=true;$('#soundText').textContent='SES KAPALI';sound.setAttribute('aria-pressed','false');return;}try{video.muted=false;video.volume=.45;await video.play();$('#soundText').textContent='SES AÇIK';sound.setAttribute('aria-pressed','true');}catch{video.muted=true;$('#soundText').textContent='VİDEO SESİ YOK';sound.setAttribute('aria-pressed','false');}});video.addEventListener('error',()=>{sound.disabled=true;$('#soundText').textContent='SES MEVCUT DEĞİL';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();if(!video.muted){video.muted=true;$('#soundText').textContent='SES KAPALI';sound.setAttribute('aria-pressed','false');}}});
  const intro=$('#intro'), counter=$('#introCounter');
  if(reduce){intro.classList.add('hide');}else{const start=performance.now();const duration=680;const tick=now=>{const t=Math.min(1,(now-start)/duration);counter.textContent=String(Math.round(t*100)).padStart(2,'0')+'%';if(t<1)requestAnimationFrame(tick);else setTimeout(()=>intro.classList.add('hide'),110);};requestAnimationFrame(tick);}
})();
