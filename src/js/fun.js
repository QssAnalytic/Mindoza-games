/* ==== Mindoza fun pack: fruit-matched hats, live trails, draggable hero, Vault Game, coin gifts, friends ==== */
/* hats: one colour per fruit so accessories match the character */
const ACC=['#FF7EB6','#4CCB86','#FF8A5B','#3FB863','#FFC531','#25BFB0','#86CF4A'];
/* where a hat sits on each fruit: [x, y of the head top, head width, tilt] */
const HATFIT=[[50,26,54,0],[50,27,56,0],[60,21,34,12],[50,31,70,0],[50,31,54,0],[50,38,54,0],[50,30,58,0]];
function shade(c,p){const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.round(p<0?v*(1+p):v+(255-v)*p);return'#'+[f(r),f(g),f(b)].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('')}
function avMix(c){return shade(c,.5)}
function hatBig(h){return[1,2,3,5,6,9,10,11,12,13].includes(h|0)}
function trailShape(s,c,r){switch(s){
 case'star':return`<path d="M0 ${-r}L${r*.29} ${-r*.4}L${r*.95} ${-r*.31}L${r*.47} ${r*.15}L${r*.59} ${r*.81}L0 ${r*.5}L${-r*.59} ${r*.81}L${-r*.47} ${r*.15}L${-r*.95} ${-r*.31}L${-r*.29} ${-r*.4}Z" fill="${c}"/>`;
 case'spark':return`<path d="M0 ${-r}Q${r*.18} ${-r*.18} ${r} 0Q${r*.18} ${r*.18} 0 ${r}Q${-r*.18} ${r*.18} ${-r} 0Q${-r*.18} ${-r*.18} 0 ${-r}Z" fill="${c}"/>`;
 case'heart':return`<path d="M0 ${r*.75}C${-r*1.3} ${-r*.1} ${-r*.6} ${-r*1.1} 0 ${-r*.35}C${r*.6} ${-r*1.1} ${r*1.3} ${-r*.1} 0 ${r*.75}Z" fill="${c}"/>`;
 case'bubble':return`<circle r="${r*.85}" fill="${c}" fill-opacity=".35" stroke="${c}" stroke-width="${r*.22}"/><circle cx="${-r*.3}" cy="${-r*.3}" r="${r*.2}" fill="#fff"/>`;
 case'drop':return`<path d="M0 ${-r}Q${r*.8} 0 0 ${r*.8}Q${-r*.8} 0 0 ${-r}Z" fill="${c}"/>`;
 case'snow':return`<g stroke="${c}" stroke-width="${r*.22}" stroke-linecap="round"><path d="M0 ${-r}V${r}M${-r*.87} ${-r*.5}L${r*.87} ${r*.5}M${-r*.87} ${r*.5}L${r*.87} ${-r*.5}"/></g>`;
 case'leaf':return`<path d="M${-r} 0Q0 ${-r} ${r} 0Q0 ${r} ${-r} 0Z" fill="${c}"/><path d="M${-r*.8} 0H${r*.7}" stroke="#2E7D32" stroke-width="${r*.12}"/>`;
 case'petal':return`<ellipse rx="${r*.55}" ry="${r}" fill="${c}"/>`;
 default:return`<circle r="${r*.8}" fill="${c}"/>`}}
/* ---- live trail + draggable character on every map ---- */
function heroWire(g){if(g.dataset.wired)return;g.dataset.wired=1;const svg=g.ownerSVGElement;if(!svg)return;
 const tr=TRAILS[S.av.trail]||TRAILS[0];const fx=document.createElementNS('http://www.w3.org/2000/svg','g');fx.setAttribute('class','trail-fx');fx.setAttribute('pointer-events','none');g.before(fx);
 const m=/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(g.getAttribute('transform')||'')||[0,0,0];let x=+m[1],y=+m[2],px=x,py=y,drag=null,last=0,parts=[],raf=0,ci=0,t0=performance.now();
 const vb=svg.viewBox.baseVal,W=vb&&vb.width||400,Hh=vb&&vb.height||400;
 const put=()=>g.setAttribute('transform',`translate(${x} ${y})`);
 const spawn=(sx,sy,dx,dy)=>{if(!tr.c.length||parts.length>70)return;const e=document.createElementNS('http://www.w3.org/2000/svg','g');const c=tr.c[ci++%tr.c.length];e.innerHTML=trailShape(tr.s||'dot',c,4+Math.random()*3.5);fx.append(e);
  parts.push({e,x:sx+(Math.random()-.5)*10,y:sy+(Math.random()-.5)*8,vx:-dx*.04+(Math.random()-.5)*.5,vy:-dy*.04+(Math.random()-.5)*.5+.15,r:Math.random()*360,vr:(Math.random()-.5)*6,t:0,L:650+Math.random()*450})};
 const loop=now=>{if(!svg.isConnected){cancelAnimationFrame(raf);return}const dt=Math.min(50,now-(last||now));last=now;
  const bob=drag?0:Math.sin((now-t0)/420)*2.5;g.setAttribute('transform',`translate(${x} ${y+bob})`);
  const cx=x+29,cy=y+bob+46,dx=cx-px,dy=cy-py,sp=Math.hypot(dx,dy);
  if(sp>1.2){const n=Math.min(4,Math.ceil(sp/7));for(let k=0;k<n;k++)spawn(px+dx*k/n,py+dy*k/n,dx,dy)}else if(Math.random()<dt/140)spawn(cx-14-Math.random()*8,cy,6,0);px=cx;py=cy;
  parts=parts.filter(p=>{p.t+=dt;const k=p.t/p.L;if(k>=1){p.e.remove();return false}p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.r+=p.vr;const sc=1-k*.85;p.e.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.r.toFixed(0)}) scale(${sc.toFixed(2)})`);p.e.setAttribute('opacity',(1-k*k).toFixed(2));return true});
  raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
 const pt=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())};
 g.style.cursor='grab';g.style.touchAction='none';g.setAttribute('aria-label','Your character: drag me around');
 g.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();const p=pt(e);drag={dx:p.x-x,dy:p.y-y};g.setPointerCapture(e.pointerId);g.style.cursor='grabbing';g.classList.add('held')});
 g.addEventListener('pointermove',e=>{if(!drag)return;const p=pt(e);x=Math.max(-20,Math.min(W-38,p.x-drag.dx));y=Math.max(-20,Math.min(Hh-50,p.y-drag.dy))});
 const up=()=>{if(!drag)return;drag=null;g.style.cursor='grab';g.classList.remove('held');sfx('click')};g.addEventListener('pointerup',up);g.addEventListener('pointercancel',up);
 g.addEventListener('click',e=>e.stopPropagation())}
HATS.length=0;
HATS.push({n:'No hat',p:0},{n:'Cap',p:30},{n:'Crown',p:90},{n:'Wizard hat',p:70},{n:'Headphones',p:50},{n:'Miner helmet',p:60},{n:'Party hat',p:40},
 {n:'Cute bow',p:35,t:'Matches your fruit'},{n:'Flower',p:40,t:'A little bloom'},{n:'Flower crown',p:80,t:'Fresh from the garden'},{n:'Bunny ears',p:60},{n:'Cat ears',p:55},{n:'Pompom beanie',p:50},{n:'Tiara',p:85},{n:'Halo',p:95});
/* trails: each has a shape and colours; the live trail on the map uses both */
TRAILS.length=0;
TRAILS.push({n:'No trail',p:0,c:[]},{n:'Sparkle',p:50,c:['#FFFFFF','#FFE066'],s:'spark'},{n:'Rainbow',p:110,c:['#FF4D6D','#FFC531','#3DDC97','#4FC3F7','#9B5CFF'],s:'dot'},
 {n:'Flame',p:90,c:['#FF6B35','#FFD23F','#FF3D3D'],s:'drop'},{n:'Bubbles',p:70,c:['#8EE3FF','#D6F6FF'],s:'bubble'},{n:'Comet',p:140,c:['#B388FF','#FFFFFF','#7C6CFF'],s:'star'},
 {n:'Hearts',p:60,c:['#FF6FA8','#FF9EC4','#FFD1E3'],s:'heart'},{n:'Gold stars',p:80,c:['#FFD23F','#FFE88A','#FFB300'],s:'star'},{n:'Ocean',p:70,c:['#2EC4FF','#1E88E5','#9BE7FF'],s:'bubble'},
 {n:'Mint',p:55,c:['#3DDC97','#B9F6CA','#00BFA5'],s:'dot'},{n:'Candy',p:75,c:['#FF8FB1','#FFFFFF','#B388FF'],s:'heart'},{n:'Galaxy',p:120,c:['#7C4DFF','#448AFF','#E1BEE7','#FFFFFF'],s:'spark'},
 {n:'Sunset',p:85,c:['#FF7043','#FFB74D','#F06292'],s:'dot'},{n:'Snowflakes',p:65,c:['#FFFFFF','#BBDEFB','#E3F2FD'],s:'snow'},{n:'Leaves',p:60,c:['#66BB6A','#AED581','#43A047'],s:'leaf'},
 {n:'Petals',p:70,c:['#F8BBD0','#F48FB1','#FCE4EC'],s:'petal'});
new MutationObserver(()=>document.querySelectorAll('.hero-drag:not([data-wired])').forEach(heroWire)).observe(document.documentElement,{childList:true,subtree:true});
/* ---- coins: big shiny coins that spill out, get tapped and fly into your coin counter ---- */
const COINSVG=`<svg viewBox="0 0 48 48" aria-hidden="true"><defs><radialGradient id="cg" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#FFF6B0"/><stop offset=".45" stop-color="#FFD23F"/><stop offset="1" stop-color="#E09A00"/></radialGradient></defs><circle cx="24" cy="24" r="21" fill="url(#cg)" stroke="#B57F00" stroke-width="2.4"/><circle cx="24" cy="24" r="14.5" fill="none" stroke="#B57F00" stroke-width="1.6" opacity=".55"/><path d="M20.5 16.5h6.5v15h-4" fill="none" stroke="#8A5F00" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15Q16 9 23 8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75"/></svg>`;
function coinRoll(){const r=Math.random();return r<.5?2:r<.85?3:r<.95?4:5}
function coinTarget(){const t=$('#tCoins');const c=t&&t.closest('.chip');return c&&c.getBoundingClientRect().width?c:null}
function coinFly(from,value,done){const r=from.getBoundingClientRect(),tg=coinTarget(),tr=tg?tg.getBoundingClientRect():{left:innerWidth-60,top:10,width:40,height:30};
 const tx=tr.left+tr.width/2,ty=tr.top+tr.height/2,sx=r.left+r.width/2,sy=r.top+r.height/2;const N=5;let landed=0;
 for(let i=0;i<N;i++){const f=H(`<span class="coin-fly" style="left:${sx}px;top:${sy}px;width:${i?22:40}px;height:${i?22:40}px">${COINSVG}</span>`);document.body.append(f);
  const mx=(sx+tx)/2+(Math.random()-.5)*160,my=Math.min(sy,ty)-60-Math.random()*90;
  f.animate([{transform:'translate(-50%,-50%) scale(1)',offset:0},{transform:`translate(calc(-50% + ${mx-sx}px),calc(-50% + ${my-sy}px)) scale(1.1)`,offset:.45},{transform:`translate(calc(-50% + ${tx-sx}px),calc(-50% + ${ty-sy}px)) scale(.45)`,offset:1}],{duration:620+i*70,delay:i*45,easing:'cubic-bezier(.45,0,.25,1)',fill:'forwards'})
   .onfinish=()=>{f.remove();if(++landed===N){addCoins(value);updTop();if(tg){tg.classList.remove('coin-pop');void tg.offsetWidth;tg.classList.add('coin-pop')}done&&done()}}}}
/* spill n coins out of an opening (el = the mouth) onto a floor inside box; values lets one coin carry more than 1 */
function coinSpill(box,mouth,values,onAll){const br=box.getBoundingClientRect(),mr=mouth.getBoundingClientRect();const ox=mr.left+mr.width/2-br.left,oy=mr.top+mr.height/2-br.top;let left=values.length;
 const glit=H(`<div class="coin-glitter" aria-hidden="true">${Array.from({length:26},(_,i)=>`<i style="--x:${(Math.random()-.5)*br.width*.9}px;--y:${-40-Math.random()*120}px;--d:${Math.random()*.5}s;left:${ox}px;top:${oy}px;background:${['#FFD23F','#FFF6B0','#fff','#FFB300'][i%4]}"></i>`).join('')}</div>`);box.append(glit);setTimeout(()=>glit.remove(),2200);
 values.forEach((v,i)=>{const spread=br.width*.78,fx=br.width/2+(i-(values.length-1)/2)*Math.min(70,spread/values.length)+(Math.random()-.5)*14,fy=br.height-46-Math.random()*16;
  const c=H(`<button class="coin-big" aria-label="Collect ${v} coin${v>1?'s':''}" style="left:${ox}px;top:${oy}px">${COINSVG}<span class="coin-plus">+${v}</span></button>`);box.append(c);
  const hop=-90-Math.random()*70;c.animate([{transform:'translate(-50%,-50%) scale(.3) rotate(0)'},{transform:`translate(calc(-50% + ${(fx-ox)*.5}px),calc(-50% + ${hop}px)) scale(1.05) rotate(200deg)`,offset:.45},{transform:`translate(calc(-50% + ${fx-ox}px),calc(-50% + ${fy-oy}px)) scale(1) rotate(360deg)`,offset:.82},{transform:`translate(calc(-50% + ${fx-ox}px),calc(-50% + ${fy-oy-14}px)) scale(1) rotate(360deg)`,offset:.91},{transform:`translate(calc(-50% + ${fx-ox}px),calc(-50% + ${fy-oy}px)) scale(1) rotate(360deg)`}],{duration:900,delay:i*170,easing:'cubic-bezier(.3,.6,.4,1)',fill:'forwards'});
  setTimeout(()=>sfx('coin'),i*170+500);
  let got=false;const take=()=>{if(got)return;got=true;c.disabled=true;c.classList.add('taken');sfx('coin');burstEl(c,14,['#FFD23F','#FFF6B0','#fff']);coinFly(c,v,()=>{});c.style.visibility='hidden';if(--left===0)setTimeout(()=>onAll&&onAll(),700)};
  c.onclick=take;c.onpointerenter=e=>{if(e.pointerType==='mouse'&&e.buttons)take()};c._take=take});
 return()=>$$('.coin-big:not(.taken)',box).forEach(c=>c._take&&c._take())}
function coinCount(el,to){let n=0;const t=setInterval(()=>{n++;el.textContent='+'+n;if(n>=to)clearInterval(t)},Math.max(30,500/to))}
/* ---- VAULT GAME: a rare round with a harder question; only a right answer opens the vault ---- */
const VAULTSVG=`<svg viewBox="0 0 160 160" aria-hidden="true"><defs><radialGradient id="vdg" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#E9EEF7"/><stop offset=".55" stop-color="#A9B3C6"/><stop offset="1" stop-color="#5C667A"/></radialGradient></defs>
 <circle cx="80" cy="80" r="74" fill="url(#vdg)" stroke="#3E4658" stroke-width="5"/><circle cx="80" cy="80" r="60" fill="none" stroke="#6E788C" stroke-width="3"/>
 ${[0,1,2,3,4,5,6,7].map(k=>`<circle cx="${80+Math.cos(k*Math.PI/4)*66}" cy="${80+Math.sin(k*Math.PI/4)*66}" r="4.2" fill="#4A5366" stroke="#C9D0DD" stroke-width="1"/>`).join('')}
 <g class="v-dial"><circle cx="80" cy="80" r="27" fill="#3E4658"/><circle cx="80" cy="80" r="21" fill="#C9D0DD" stroke="#6E788C" stroke-width="2"/>${Array.from({length:12},(_,k)=>`<path d="M${80+Math.cos(k*Math.PI/6)*21} ${80+Math.sin(k*Math.PI/6)*21}L${80+Math.cos(k*Math.PI/6)*16} ${80+Math.sin(k*Math.PI/6)*16}" stroke="#4A5366" stroke-width="2"/>`).join('')}<rect x="77" y="52" width="6" height="16" rx="2" fill="#FFC531"/></g>
 <g class="v-wheel" stroke="#4A5366" stroke-width="5" stroke-linecap="round"><path d="M80 28V46M80 114V132M28 80H46M114 80H132"/></g><path d="M38 46Q52 30 74 26" stroke="#fff" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/></svg>`;
function vaultHTML(){return`<div class="vault" id="vault"><div class="vault-frame"><div class="vault-in"><div class="vault-glow"></div><div class="vault-pile">${Array.from({length:14},(_,i)=>`<i style="left:${8+((i*37)%84)}%;bottom:${(i%4)*9}px;transform:rotate(${(i*47)%60-30}deg)">${COINSVG}</i>`).join('')}</div><div class="vault-mouth" id="vMouth"></div></div>
 <div class="vault-door" id="vDoor">${VAULTSVG}</div></div><div class="vault-lock" id="vLock">🔒</div></div>`}
/* a harder question for each kind of game, with four answer buttons */
function vaultQ(game,stage){if(['algebra','ict','sci'].includes(game)){const d=doorQ(game,stage,3);d.html=d.html||'';return d}
 const G=K3[game];if(!G)return null;const fit=q=>(Array.isArray(q.o)&&typeof q.a==='string'&&q.o.length>=3&&q.o.every(o=>typeof o==='string')&&q.o.includes(q.a))||typeof q.a==='boolean'||(typeof q.a==='number'&&q.a>0);
 const take=(a,b)=>{const p=[];for(let l=a;l<b;l++)G.lv[l].q.forEach(q=>{if(fit(q))p.push(q)});return p};
 let pool=take(stage,Math.min(G.lv.length,stage+2));if(pool.length<3)pool=pool.concat(take(0,stage));if(!pool.length)pool=take(0,G.lv.length);
 if(!pool.length)return null;const q=R.pick(pool);
 if(typeof q.a==='number'){const u=q.u?' '+q.u:'',a=String(q.a);const near=[...new Set(doorNear(a).filter(x=>x!==a))].slice(0,3);while(near.length<3)near.push(String(q.a+near.length+1));return{ask:'Crack the code',html:`<p class="door-txt">${q.p}</p>`,a:a+u,opts:R.shuffle([a,...near].map(x=>x+u))}}
 if(typeof q.a==='boolean')return{ask:'True or false?',html:`<p class="door-txt">${q.p}</p>`,a:q.a?'True':'False',opts:['True','False']};
 return{ask:'Crack the code',html:`<p class="door-txt">${q.p}</p>`,a:q.a,opts:R.shuffle(q.o.slice(0,4).includes(q.a)?q.o.slice(0,4):[q.a,...R.shuffle(q.o.filter(o=>o!==q.a)).slice(0,3)])}}
function vaultDue(run,force){if(!run)return false;run._vc=(run._vc||0)+1;if(run._vAt===undefined)run._vAt=(force||Math.random()<.25)?R.int(3,7):-1;if(run._vDone||run._vc!==run._vAt)return false;run._vDone=true;return true}
function vaultAsk(game,stage,done){let dq=null;try{dq=vaultQ(game,stage)}catch(e){dq=null}if(!dq)return done();if(/127\.0\.0\.1/.test(API))window.__vq=dq;let over=false,collectAll=null;
 const m=modal(`<div class="vaultbox"><p class="eyebrow">Rare event</p><h2 class="vault-title">VAULT GAME!</h2><p class="muted" style="margin:0 0 6px">This one is <b>harder</b>. Answer it right and the vault opens. Tap the coins inside to keep them. <b>One try only!</b></p>
 <div class="vault-stage" id="vStage">${vaultHTML()}</div><div id="vQ"><p class="super-ask">${dq.ask}</p><div class="door-body">${dq.html}</div>
 <div class="super-opts">${dq.opts.map((o,k)=>`<button class="super-opt${POW('reveal')&&o===dq.a?' rev':''}" data-i="${k}"><kbd>${k+1}</kbd><span>${esc(o)}</span></button>`).join('')}</div></div><p class="super-note" id="vNote"></p><div id="vGo"></div></div>`,'vault-modal');
 sfx('level');
 const fin=(ok,n)=>{NET.track('vault',{game:['algebra','ict','sci'].includes(game)?game:game,stage,ok,data:{coins:n}});save();const g=$('#vGo',m);g.innerHTML='<button class="btn w" id="vNext">Continue</button>';const b=$('#vNext',m);b.focus();b.onclick=()=>{collectAll&&collectAll();closeModal();done(ok)}};
 const kd=e=>{const n=+e.key;if(!over&&n>=1&&n<=dq.opts.length){e.preventDefault();end(n-1)}};document.addEventListener('keydown',kd);
 const end=i=>{if(over)return;over=true;document.removeEventListener('keydown',kd);const ok=dq.opts[i]===dq.a;S.stats.vaultTried=(S.stats.vaultTried||0)+1;
  $$('#vQ .super-opt',m).forEach((b,k)=>{b.disabled=true;if(dq.opts[k]===dq.a)b.classList.add('y');else if(k===i)b.classList.add('n')});
  const v=$('#vault',m);
  if(!ok){sfx('bad');v.classList.add('v-no');$('#vNote',m).innerHTML=`<b class="no">The vault stays locked.</b> The right answer is highlighted. A vault might appear again in another level!`;return fin(false,0)}
  S.stats.vaultOk=(S.stats.vaultOk||0)+1;addXP(20);sfx('crystal');v.classList.add('v-open');$('#vLock',m).textContent='🔓';
  const n=coinRoll();const vals=Array(n).fill(1);
  $('#vNote',m).innerHTML=`<b class="ok">Code cracked!</b> The vault is opening…`;
  setTimeout(()=>{$('#vQ',m).classList.add('vq-done');sfx('good');
   $('#vNote',m).innerHTML=`<span class="vault-win"><b id="vCount">+0</b> coins inside!</span><br><span class="muted">Tap the coins to collect them.</span>`;coinCount($('#vCount',m),n);
   collectAll=coinSpill($('#vStage',m),$('#vMouth',m),vals,()=>{$('#vNote',m).innerHTML=`<span class="vault-win">You collected <b>${n} coins</b>!</span>`;burstEl($('#vStage',m),40,['#FFD23F','#FFF6B0','#fff',ACC[S.av.skin]||'#FF7EB6']);sfx('crystal')});
   fin(true,n)},1500)};
 $$('#vQ .super-opt',m).forEach(b=>b.onclick=()=>end(+b.dataset.i))}
/* hook the vault into every game's "next question" step */
nextQ=(o=>function(){if(RUN&&!RUN.clearedShown&&RUN.cur&&vaultDue(RUN,RUN.s===5)){SCENE&&SCENE.pause&&SCENE.pause(true);hideFB();return vaultAsk('algebra',RUN.s,()=>{if(!RUN)return;if(algCleared())return stageClear();o()})}return o()})(nextQ);
xlNext=(o=>function(){if(XRUN&&XRUN.qn>0&&XRUN.qn<XRUN.total&&vaultDue(XRUN)){hideFB();return vaultAsk('ict',XRUN.lv,()=>{if(XRUN)o()})}return o()})(xlNext);
scNext=(o=>function(){if(SRUN&&SRUN.qn>0&&SRUN.qn<SRUN.total&&vaultDue(SRUN)){hideFB();return vaultAsk('sci',SRUN.lv,()=>{if(SRUN)o()})}return o()})(scNext);
k3Next=(o=>function(){if(KRUN&&KRUN.qn>0&&KRUN.qn<10&&vaultDue(KRUN)){hideFB();return vaultAsk(KRUN.g,KRUN.lv,()=>{if(KRUN)o()})}return o()})(k3Next);
/* ---- gifts from the admin: coins arrive in a present you open ---- */
let GIFTBUSY=false;
async function checkGifts(){if(GIFTBUSY||!NET.token||!NET.user||NET.user.admin||$('#ov')||RUN||XRUN||SRUN||KRUN)return;GIFTBUSY=true;
 try{const d=await NET.call('/api/gifts');const all=(d.gifts||[]).filter(g=>g.amount||g.look);if(!all.length)return;
  const r=await NET.call('/api/gifts/claim',{method:'POST',body:{ids:all.map(g=>g.id)}});if(!r.ok)return;
  const looks=all.filter(g=>g.look);if(looks.length){const L=looks[looks.length-1].look,ln=looks.map(g=>g.note).filter(Boolean).pop();const k=v=>Math.max(0,v|0);
   S.av={skin:Math.min(SKINS.length-1,k(L.skin)),hat:Math.min(HATS.length-1,k(L.hat)),trail:Math.min(TRAILS.length-1,k(L.trail))};['skin'+S.av.skin,'hat'+S.av.hat,'trail'+S.av.trail].forEach(x=>S.owned.includes(x)||S.owned.push(x));
   S.pic='';save();NET.pushSave();renderTop();
   if(!all.some(g=>g.amount)){const m=modal(`<div class="vaultbox"><p class="eyebrow">A surprise from the Mindoza team</p><h2 style="margin:4px 0">You have a new look!</h2><div style="margin:6px auto">${avatarSVG(S.av,'av',150)}</div><p class="muted">${ln?`“${esc(ln)}”`:`You are now ${SKINS[S.av.skin].n}${S.av.hat?' with a '+HATS[S.av.hat].n.toLowerCase():''}. You can change it any time in the shop.`}</p><button class="btn w" id="lkOk">Yay!</button></div>`,'vault-modal');sfx('crystal');$('#lkOk',m).onclick=closeModal;return}}
  const takes=all.filter(g=>g.amount<0),gs=all.filter(g=>g.amount>0),lost=-takes.reduce((a,g)=>a+g.amount,0),got=gs.reduce((a,g)=>a+g.amount,0);
  if(lost){const before=S.coins;S.coins=Math.max(0,S.coins-lost);updTop();save();NET.pushSave();const tn=takes.map(g=>g.note).filter(Boolean)[0];
   if(!got){modal(`<div class="vaultbox"><p class="eyebrow">A message from the Mindoza team</p><h2 style="margin:4px 0">${before-S.coins} coin${before-S.coins===1?' was':'s were'} taken away</h2><p class="muted">${tn?`“${esc(tn)}”`:'The Mindoza team adjusted your coins.'}</p><p>You now have <b>${S.coins}</b> coins.</p><button class="btn w" id="tkOk">OK</button></div>`,'vault-modal');$('#tkOk').onclick=closeModal;return}}
  if(!got)return;
  const k=Math.min(8,got),base=Math.floor(got/k),vals=Array.from({length:k},(_,i)=>base+(i<got-base*k?1:0));const note=gs.map(g=>g.note).filter(Boolean)[0],lostTxt=lost?`<p class="muted" style="margin:0 0 6px">The team also took away ${lost} coin${lost===1?'':'s'}${takes.map(g=>g.note).filter(Boolean)[0]?`: “${esc(takes.map(g=>g.note).filter(Boolean)[0])}”`:''}.</p>`:'';
  const m=modal(`<div class="vaultbox"><p class="eyebrow">A gift for you</p><h2 class="vault-title">${got} coins!</h2><p class="muted" style="margin:0 0 6px">The Mindoza team sent you a present${note?`: “${esc(note)}”`:''}. Tap it to open!</p>${lostTxt}
   <div class="vault-stage gift-stage" id="gStage"><button class="giftbox" id="gBox" aria-label="Open the present"><span class="gift-lid"></span><span class="gift-body"></span><span class="gift-mouth" id="gMouth"></span></button></div><p class="super-note" id="gNote"></p><div id="gGo"></div></div>`,'vault-modal');
  let collect=null;const finish=()=>{collect&&collect();save();NET.pushSave()};
  $('#gBox',m).onclick=()=>{const b=$('#gBox',m);if(b.classList.contains('open'))return;b.classList.add('open');sfx('crystal');
   setTimeout(()=>{$('#gNote',m).innerHTML=`<span class="vault-win"><b id="gCount">+0</b> coins!</span><br><span class="muted">Tap the coins to collect them.</span>`;coinCount($('#gCount',m),got);
    collect=coinSpill($('#gStage',m),$('#gMouth',m),vals,()=>{$('#gNote',m).innerHTML=`<span class="vault-win">You collected <b>${got} coins</b>!</span>`;save();NET.pushSave()});
    $('#gGo',m).innerHTML='<button class="btn w" id="gNext">Continue</button>';$('#gNext',m).onclick=()=>{finish();closeModal()}},450)};
  const ov=$('#ov');const obs=new MutationObserver(()=>{if(!ov.isConnected){obs.disconnect();if(!$('#gBox',m).classList.contains('open')){addCoins(got);save();NET.pushSave()}else finish()}});obs.observe(document.body,{childList:true})}
 catch(e){}finally{GIFTBUSY=false}}
/* ---- friends ---- */
const FR={friends:[],incoming:[],outgoing:[],at:0};
async function frLoad(){if(!NET.token||!NET.user||NET.user.admin)return FR;try{const d=await NET.call('/api/friends');Object.assign(FR,d,{at:Date.now()});frBadge()}catch(e){}return FR}
function frBadge(){const b=$('#frBadge');if(b){b.textContent=FR.incoming.length||'';b.hidden=!FR.incoming.length}}
const frCard=(p,btns)=>`<div class="fr-card">${pfp({pic:p.pic,skin:p.fruit||0},46)}<div class="fr-txt"><b>${esc(p.name)}</b><span class="muted">@${esc(p.username)} · Lv ${p.level} · ${p.stars}★ · ${p.score} pts${p.online?' · <span class="online">Online</span>':''}</span></div><div class="fr-btns">${btns}</div></div>`;
async function viewFriends(m){m.innerHTML=`<section class="friends"><p class="eyebrow">Mindoza games</p><h2 style="margin:4px 0 6px">Friends</h2><p class="muted" style="margin:0 0 14px">Find your classmates by their username or nickname and send a friend request. When they say yes, you can see each other's progress.</p>
 <div class="panel fr-find"><label for="frQ"><b>Find a player</b></label><div class="row"><input id="frQ" class="inp" placeholder="Username or nickname" autocomplete="off" maxlength="24"><button class="btn" id="frGo">Search</button></div><div id="frRes"></div></div>
 <div id="frBody"><p class="muted">Loading your friends…</p></div></section>`;
 const draw=()=>{const b=$('#frBody',m);if(!b)return;b.innerHTML=`${FR.incoming.length?`<h3 class="pcat">Friend requests for you</h3>${FR.incoming.map(p=>frCard(p,`<button class="btn" data-acc="${p.id}">Accept</button><button class="btn ghost" data-dec="${p.id}">No thanks</button>`)).join('')}`:''}
  <h3 class="pcat">Your friends (${FR.friends.length})</h3>${FR.friends.length?FR.friends.map(p=>frCard(p,`<button class="btn ghost" data-rm="${p.id}">Remove</button>`)).join(''):'<p class="muted">No friends yet. Search for a classmate above.</p>'}
  ${FR.outgoing.length?`<h3 class="pcat">Waiting for an answer</h3>${FR.outgoing.map(p=>frCard(p,`<button class="btn ghost" data-rm="${p.id}">Cancel</button>`)).join('')}`:''}`;
  const act=async(path,body,msg)=>{try{await NET.call(path,{method:'POST',body});if(msg)gtoast(msg);await frLoad();draw()}catch(e){gtoast(e.message)}};
  $$('[data-acc]',b).forEach(x=>x.onclick=()=>{sfx('good');act('/api/friends/respond',{id:+x.dataset.acc,accept:true},'You are now friends!')});
  $$('[data-dec]',b).forEach(x=>x.onclick=()=>act('/api/friends/respond',{id:+x.dataset.dec,accept:false}));
  $$('[data-rm]',b).forEach(x=>x.onclick=()=>act('/api/friends/remove',{id:+x.dataset.rm}))};
 const search=async()=>{const q=$('#frQ',m).value.trim(),out=$('#frRes',m);if(q.length<2){out.innerHTML='<p class="muted">Type at least 2 letters.</p>';return}out.innerHTML='<p class="muted">Searching…</p>';
  try{const d=await NET.call('/api/players/search?q='+encodeURIComponent(q));const known=new Set([...FR.friends,...FR.outgoing,...FR.incoming].map(p=>p.id));
   out.innerHTML=d.players.length?d.players.map(p=>frCard(p,known.has(p.id)?`<span class="chip">${FR.friends.some(f=>f.id===p.id)?'Friends':'Request sent'}</span>`:`<button class="btn" data-add="${p.id}">Add friend</button>`)).join(''):'<p class="muted">Nobody found with that name.</p>';
   $$('[data-add]',out).forEach(x=>x.onclick=async()=>{x.disabled=true;try{const r=await NET.call('/api/friends/request',{method:'POST',body:{id:+x.dataset.add}});sfx('good');x.outerHTML=`<span class="chip">${r.status==='accepted'?'Friends':'Request sent'}</span>`;gtoast(r.status==='accepted'?'You are now friends!':'Friend request sent!');await frLoad();draw()}catch(e){x.disabled=false;gtoast(e.message)}})}
  catch(e){out.innerHTML=`<p class="muted">${esc(e.message)}</p>`}};
 $('#frGo',m).onclick=search;$('#frQ',m).onkeydown=e=>{if(e.key==='Enter')search()};
 if(NET.user&&NET.user.admin){$('#frBody',m).innerHTML='<p class="muted">The admin account does not have friends. Sign in as a player to try this page.</p>';return}
 await frLoad();draw()}
/* ---- admin: give coins to a player, or take coins away, from their detail card ---- */
playerDetail=(o=>async function(id){await o(id);const m=$('#ov .modal');if(!m||$('#admGift',m))return;const row=m.querySelector('.row');if(!row)return;
 row.insertAdjacentHTML('afterend',`<div class="panel adm-gift" id="admGift"><b>Give or take coins</b><div class="row"><input class="inp" id="agN" type="number" min="1" max="5000" value="10" aria-label="How many coins"><input class="inp" id="agNote" maxlength="80" placeholder="Message (optional), e.g. Great work!"><button class="btn gold" id="agGo">${IC.coin}Give coins</button><button class="btn ghost" id="agTake">Take coins</button></div><p class="muted" id="agMsg" style="margin:4px 0 0">Given coins arrive as a present to open. Taken coins are removed (never below 0) and the player sees a short message. Both happen next time they are on the home page or the map.</p></div>`);
 const send=async sign=>{const n=Math.round(+$('#agN',m).value);if(!(n>=1&&n<=5000))return $('#agMsg',m).textContent='Choose between 1 and 5000 coins.';
  if(sign<0&&!confirmTake(n))return;$('#agGo',m).disabled=$('#agTake',m).disabled=true;
  try{await NET.call('/api/admin/gift',{method:'POST',body:{id,amount:sign*n,note:$('#agNote',m).value}});sfx(sign>0?'coin':'click');$('#agMsg',m).innerHTML=sign>0?`<b class="ok">Sent ${n} coins!</b> They will see a present to open.`:`<b class="no">Taking ${n} coins.</b> They are removed next time the player opens the home page or the map.`}catch(e){$('#agMsg',m).textContent=e.message}
  $('#agGo',m).disabled=$('#agTake',m).disabled=false};
 const confirmTake=n=>{const b=$('#agTake',m);if(b.dataset.sure==='1'){b.dataset.sure='';b.textContent='Take coins';return true}b.dataset.sure='1';b.textContent=`Tap again to take ${n}`;setTimeout(()=>{if(b.isConnected){b.dataset.sure='';b.textContent='Take coins'}},4000);return false};
 $('#agGo',m).onclick=()=>send(1);$('#agTake',m).onclick=()=>send(-1);
 let av={skin:0,hat:0,trail:0};try{const d=await NET.call('/api/admin/player/'+id);av=Object.assign(av,((d.player||{}).save||{}).av||{})}catch(e){}
 const opt=(L,v)=>L.map((x,i)=>`<option value="${i}"${i===(v|0)?' selected':''}>${esc(x.n)}</option>`).join('');
 $('#admGift',m).insertAdjacentHTML('afterend',`<div class="panel adm-gift" id="admLook"><b>Change their look</b><div class="row" style="align-items:center"><span id="alPrev">${avatarSVG(av,'av',72)}</span>
  <label>Character <select class="inp" id="alSkin">${opt(SKINS,av.skin)}</select></label><label>Hat <select class="inp" id="alHat">${opt(HATS,av.hat)}</select></label><label>Trail <select class="inp" id="alTrail">${opt(TRAILS,av.trail)}</select></label>
  <input class="inp" id="alNote" maxlength="80" placeholder="Message (optional)"><button class="btn" id="alGo">Change look</button></div><p class="muted" id="alMsg" style="margin:4px 0 0">The new character, hat and trail are added to their shop for free and switched on next time they open the home page or the map.</p></div>`);
 const cur=()=>({skin:+$('#alSkin',m).value,hat:+$('#alHat',m).value,trail:+$('#alTrail',m).value});
 ['#alSkin','#alHat','#alTrail'].forEach(q=>$(q,m).onchange=()=>{$('#alPrev',m).innerHTML=avatarSVG(cur(),'av',72)});
 $('#alGo',m).onclick=async()=>{$('#alGo',m).disabled=true;try{await NET.call('/api/admin/look',{method:'POST',body:{id,...cur(),note:$('#alNote',m).value}});sfx('good');$('#alMsg',m).innerHTML='<b class="ok">Look changed!</b> They will see it next time they open the home page or the map.'}catch(e){$('#alMsg',m).textContent=e.message}$('#alGo',m).disabled=false}})(playerDetail);
/* check for gifts and friend requests now and then */
setInterval(()=>{if(NET.token&&NET.user&&!NET.user.admin){if(VIEW==='home'||VIEW==='map'||VIEW==='friends')checkGifts();frLoad()}},60000);
go=(o=>function(v,arg){if(v==='friends'){if(!NET.token)return o('auth');if(RUN)leaveStage();if(XRUN)xlLeave();if(SRUN)scLeave();if(KRUN)k3Leave();closeModal();hideFB();VIEW='friends';renderTop();scrollTo(0,0);viewFriends($('#main'));AU.music(-1);return}
 o(v,arg);if(v==='home'){setTimeout(checkGifts,600);if(Date.now()-FR.at>60000)frLoad()}})(go);
renderTop=(o=>function(){o();if(VIEW==='auth'||!NET.user)return;const sp=$('#top [data-v="shop"]');if(!sp||$('#frBtn'))return;
 sp.insertAdjacentHTML('beforebegin',`<button class="navb" id="frBtn" aria-pressed="${VIEW==='friends'}" aria-label="Friends"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.6c2.6.1 4.5 1.8 5 4.6"/></svg><span>Friends</span><i class="fr-badge" id="frBadge" hidden></i></button>`);
 $('#frBtn').onclick=()=>go('friends');frBadge()})(renderTop);
