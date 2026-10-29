const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,G=window.gsap;
// split headings into words
document.querySelectorAll('.split').forEach(h=>{const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t))f.append(t);else{const w=document.createElement('span');w.className='w';w.innerHTML='<i>'+t.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</i>';f.append(w)}});c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})};walk(h)});
// project filters + show more
const grid=document.querySelector('.grid'),cards=[...grid.children],more=document.querySelector('.showmore');
const LIMIT=9;function layout(f){let n=0;cards.forEach(c=>{const ok=f==='all'||c.dataset.cat===f;c.classList.toggle('hide',!ok);c.classList.toggle('extra',ok&&++n>LIMIT)});more.style.display=n>LIMIT&&!grid.classList.contains('all')?'block':'none';window.ScrollTrigger&&ScrollTrigger.refresh()}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelector('.filters .on').classList.remove('on');b.classList.add('on');layout(b.dataset.f);if(G&&!reduce)G.fromTo('.card:not(.hide)',{opacity:0,y:20},{opacity:1,y:0,stagger:.04,duration:.5,ease:'power3.out'})});
more.onclick=()=>{grid.classList.add('all');more.style.display='none';window.ScrollTrigger&&ScrollTrigger.refresh()};layout('all');
// spotlight on cards
document.querySelectorAll('.card,.feat').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}));
const loader=document.getElementById('loader');
if(reduce||!G){loader&&loader.remove();document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))}else{
 document.documentElement.classList.add("gs");gsap.registerPlugin(ScrollTrigger);document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('in')});
 if(window.Lenis){const l=new Lenis({lerp:.1});l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0);document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();l.scrollTo(a.getAttribute('href'),{offset:-60})}))}
 const tl=gsap.timeline();
 tl.from('#loader span',{yPercent:100,opacity:0,duration:.7,ease:'power3.out'}).to('#loader',{yPercent:-100,duration:.9,ease:'expo.inOut',delay:.3}).set('#loader',{display:'none'})
   .from('nav',{y:-40,opacity:0,duration:.6},'-=.4').from('.hero h1 .w>i',{yPercent:110,duration:1,stagger:.04,ease:'expo.out'},'-=.5')
   .from('.hero .tag,.hero .sub,.hero .cta',{y:24,opacity:0,stagger:.1,duration:.8,ease:'power3.out'},'-=.7').from('.orb',{scale:.4,opacity:0,duration:1.4,ease:'expo.out'},'<');
 gsap.utils.toArray('section h2.split').forEach(h=>gsap.from(h.querySelectorAll('.w>i'),{yPercent:110,duration:1,stagger:.05,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 85%',once:true}}));
 gsap.utils.toArray('section .reveal, .feat, .row, .stats>div, .skills>div').forEach(el=>{if(el.closest('.hero'))return;gsap.from(el,{y:50,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}})});
 ScrollTrigger.batch('.card',{start:'top 92%',once:true,onEnter:b=>gsap.from(b,{y:40,opacity:0,stagger:.06,duration:.8,ease:'power3.out'})});
 gsap.to('.orb',{yPercent:60,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 gsap.to('.hero h1',{yPercent:-15,opacity:.3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  const cur=document.querySelector('.cursor'),x=gsap.quickTo(cur,'x',{duration:.25}),y=gsap.quickTo(cur,'y',{duration:.25});
  addEventListener('pointermove',e=>{x(e.clientX);y(e.clientY)});
  document.querySelectorAll('a,button,.card').forEach(el=>{el.addEventListener('pointerenter',()=>cur.classList.add('big'));el.addEventListener('pointerleave',()=>cur.classList.remove('big'))});
  document.querySelectorAll('.btn,.pill,.logo').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.4,duration:.4})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}))});
  document.querySelectorAll('.card,.feat').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;gsap.to(c,{rotateY:px*6,rotateX:-py*6,transformPerspective:900,duration:.4})});c.addEventListener('pointerleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.6}))});
 } else document.querySelector('.cursor').remove();
}
