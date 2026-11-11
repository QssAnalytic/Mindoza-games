/* ==== KS3 game pack: every level mixes mini-games (balloon pop, whack-a-mole, catch, conveyor, memory cards),
   hands-on science toys (rub a balloon on hair, close a circuit, heat ice) and a third flashback ==== */
const K3X={};
K3W.pop='Pop the right balloon';K3W.whack='Whack the right mole';K3W.catch='Catch every right answer';K3W.conveyor='Send each item to its bin';K3W.memory='Find the matching pairs';K3W.rub='Rub, then answer';K3W.switchc='Close the circuit, then answer';K3W.heat='Heat it, then answer';
const k3calm=()=>!!(S.settings&&S.settings.calm);
/* turn any single-answer question into options + answer */
function k3Choice(q,L){const lvq=(L&&L.q)||[];const uniq=a=>[...new Set(a.filter(x=>x!=null&&x!==''))];
 if(q.fb||q.w==='pick'||q.w==='odd'){if(Array.isArray(q.o)&&typeof q.a==='string'&&q.o.includes(q.a))return{o:q.o.slice(0,6),a:q.a};return null}
 if(q.w==='tf')return{o:['True','False'],a:q.a?'True':'False'};
 if((q.w==='slider'||q.w==='stepper')&&typeof q.a==='number'){const st=q.step||1,mn=q.min!=null?q.min:0,mx=q.max!=null?q.max:q.a*2+st*4;const c=new Set([q.a]);const tries=[q.a+st,q.a-st,q.a+2*st,q.a-2*st,q.a*2,Math.round(q.a/2/st)*st,q.a+5*st,q.a-5*st];
  for(const v of tries){if(c.size>=4)break;const r=Math.round(v/st)*st;if(r>=mn&&r<=mx)c.add(+r.toFixed(4))}if(c.size<3)return null;return{o:[...c].map(v=>k3Fmt(q,v)),a:k3Fmt(q,q.a)}}
 if(q.w==='type'){const a=Array.isArray(q.a)?q.a[0]:q.a;const others=uniq(lvq.filter(x=>!x.fb&&x!==q).map(x=>Array.isArray(x.a)?x.a[0]:x.a).filter(x=>typeof x==='string'&&x!==a));if(others.length<2)return null;return{o:[a,...R.shuffle(others).slice(0,3)],a}}
 if(q.w==='hotspot'&&typeof q.a==='string'){const nm=x=>x.al||(x.a.charAt(0).toUpperCase()+x.a.slice(1).replace(/[-_]/g,' '));const a=nm(q);const others=uniq(lvq.filter(x=>!x.fb&&x!==q&&typeof x.a==='string').map(nm).filter(x=>x!==a));if(others.length<2)return null;return{o:[a,...R.shuffle(others).slice(0,3)],a}}
 return null}
/* a choice question in the shape the new widgets want */
function k3AsChoice(q,L,w){const c=k3Choice(q,L);if(!c)return null;return{...q,w,base:'pick',o:c.o,a:c.a,p:q.w==='tf'?'True or false? '+q.p:q.p}}
/* order questions become "which comes first / next" so levels are not all ordering */
function k3OrderChoice(q,w,kind){if(!Array.isArray(q.o)||q.o.length<3)return null;const o=q.o;
 if(kind==='first')return{...q,w,base:'pick',o:R.shuffle(o).slice(0,6),a:o[0],p:`${q.p} Which one comes <b>first</b>?`};
 const k=R.int(0,o.length-2);return{...q,w,base:'pick',o:R.shuffle(o).slice(0,6),a:o[k+1],p:`${q.p} Which one comes straight <b>after</b> “${esc(o[k])}”?`,h:[`Start from the first one and count along.`,`It is the one right after ${o[k]}.`],e:`The order is ${o.join(' → ')}, so ${o[k+1]} comes after ${o[k]}.`}}
/* convert to a mini-game, picking a game that fits the question */
function k3Game(q,L,pref){if(q.w==='multi')return{...q,w:'catch',base:'multi'};if(q.w==='sort'&&(q.bins||[]).length<=4)return{...q,w:'conveyor',base:'sort'};if(q.w==='match'&&q.o.length<=6)return{...q,w:'memory',base:'match'};
 if(q.w==='order')return k3OrderChoice(q,pref,'after');return k3AsChoice(q,L,pref)}
/* the plan for each level: original game on most questions, mini-games on others, three flashbacks */
k3Q=(o=>function(g,lv,i){const q=o(g,lv,i),L=K3[g].lv[lv];let r=null;
 const special=(K3X[g]||{})[lv]&&K3X[g][lv][i];if(special)return{...special,lvl:lv,i};
 if(q.fb){r=k3AsChoice(q,L,i===3?'pop':'whack');return r?{...r,fb:q.fb}:q}
 if(i===5&&lv>0){const j=R.int(0,lv-1),FL=K3[g].lv[j];const pool=R.shuffle(FL.q.filter(x=>!x.fb).map(x=>({...x,w:x.w||FL.w,states:x.states||FL.states,bins:x.bins||FL.bins,lvl:j,i})));
  for(const x of pool){const c=k3Game(x,FL,'pop');if(c){c.fb=[j+1,FL.n];return c}}}
 const ord=L.w==='order';
 if(i===1)r=k3Game(q,L,'pop');else if(i===8)r=k3Game(q,L,'whack');else if(ord&&i===2)r=k3OrderChoice(q,'pop','first');else if(ord&&i===6)r=k3OrderChoice(q,'whack','after');else if(ord&&i===4)r=k3OrderChoice(q,'pop','after');
 return r||q})(k3Q);
k3AnsText=(o=>q=>o({...q,w:q.base||q.w}))(k3AnsText);

/* ---- shared bits ---- */
const k3Lab=o=>k3Tile(o);
function k3Opts(q,W,note){/* a pick panel that can stay locked until the toy is finished */const ui=K3UI.pick(q,W);W.insertAdjacentHTML('afterbegin',`<p class="k3note" id="k3Lock">${note}</p>`);const B=$$('.k3opt',W);B.forEach(b=>b.disabled=true);
 ui.unlock=()=>{B.forEach(b=>b.disabled=false);const n=$('#k3Lock',W);if(n){n.innerHTML='<b>Great!</b> Now choose your answer.';n.classList.add('k3ok')}};return ui}
function k3Picked(W){let p=$('#k3Pk',W);if(!p){W.insertAdjacentHTML('beforeend','<p class="k3picked" id="k3Pk"></p>');p=$('#k3Pk',W)}return p}

/* ---- POP: balloons float in the sky; tap the right one ---- */
K3UI.pop=function(q,W){const sc=$('#k3Scene'),opts=R.shuffle(q.o),long=opts.some(o=>String(o).length>16),cols=['#FF5D73','#4FC3F7','#FFC531','#3DDC97','#B388FF','#FF8A5B'];let sel=null;
 sc.innerHTML=`<div class="k3sky${q.fb?' k3sepia':''}">${q.fb?`<div class="k3reel2">⟲ FLASHBACK · Level ${q.fb[0]}</div>`:''}<div class="k3cloud c1"></div><div class="k3cloud c2"></div><div class="k3balloons${long?' long':''}">${opts.map((o,i)=>`<button class="k3bal" data-i="${i}" style="--bc:${cols[i%6]};--d:${(i*.37)%1.4}s"><span class="k3bal-b">${k3Lab(o)}</span><i class="k3str"></i></button>`).join('')}</div></div>`;
 W.innerHTML=`<p class="k3note">Tap the balloon with the right answer, then press <b>Check</b>.</p>`;const pk=k3Picked(W);const B=$$('.k3bal',sc);
 const choose=b=>{if(!b||b.disabled||KRUN.cur.done)return;B.forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=opts[+b.dataset.i];pk.innerHTML=`Your answer: <b>${k3Lab(sel)}</b>`;sfx('click')};B.forEach(b=>b.onclick=()=>choose(b));
 return{get:()=>sel,ready:()=>sel!=null,clear(){sel=null;B.forEach(x=>x.classList.remove('sel'));pk.innerHTML=''},check:v=>v===q.a,key:i=>choose(B[i]),
  show(ok){B.forEach(b=>{b.disabled=true;const o=opts[+b.dataset.i];if(o===q.a)b.classList.add(ok?'popped':'ok');else if(o===sel)b.classList.add('bad');else b.classList.add('away')});if(ok){const b=B.find(b=>opts[+b.dataset.i]===q.a);b&&burstEl(b,24,['#fff','#FFC531',b.style.getPropertyValue('--bc')])}},
  hint3(){R.shuffle(B.filter(b=>opts[+b.dataset.i]!==q.a&&!b.disabled)).slice(0,2).forEach(b=>{b.disabled=true;b.classList.add('away');if(opts[+b.dataset.i]===sel){sel=null;pk.innerHTML=''}});return'Two wrong balloons floated away.'},
  _auto(){choose(B.find(b=>opts[+b.dataset.i]===q.a))}}};

/* ---- WHACK: moles pop out of holes holding answer signs ---- */
K3UI.whack=function(q,W){const sc=$('#k3Scene'),opts=R.shuffle(q.o),n=opts.length,long=opts.some(o=>String(o).length>14);let sel=null,alive=true,tm=0;const gone=new Set();
 sc.innerHTML=`<div class="k3field${q.fb?' k3sepia':''}${long?' long':''}">${q.fb?`<div class="k3reel2">⟲ FLASHBACK · Level ${q.fb[0]}</div>`:''}${Array.from({length:6},(_,h)=>`<div class="k3hole" data-h="${h}"><button class="k3mole" tabindex="-1"><span class="k3sign"></span><span class="k3face"><i></i><i></i><b></b></span></button><span class="k3dirt"></span></div>`).join('')}</div>`;
 W.innerHTML=`<p class="k3note">Moles pop up holding answers. <b>Whack</b> the one with the right answer, then press <b>Check</b>. Missed it? It will pop up again.</p><div class="k3list" id="k3Ml">${opts.map((o,i)=>`<button class="k3chip" data-i="${i}"><span class="k3k">${i+1}</span>${k3Lab(o)}</button>`).join('')}</div>`;const pk=k3Picked(W);
 const H=$$('.k3hole',sc),C=$$('.k3chip',W);let k=0;const up=new Map();
 const choose=i=>{if(i==null||KRUN.cur.done||gone.has(i))return;sel=opts[i];C.forEach(c=>c.classList.toggle('sel',+c.dataset.i===i));pk.innerHTML=`Your answer: <b>${k3Lab(sel)}</b>`;sfx('hit')};
 H.forEach(h=>{const m=$('.k3mole',h);m.onclick=()=>{const i=up.get(h);if(i==null)return;m.classList.add('bonk');setTimeout(()=>m.classList.remove('bonk'),250);choose(i)}});C.forEach(c=>c.onclick=()=>choose(+c.dataset.i));
 const step=()=>{if(!alive||!sc.isConnected||!KRUN||KRUN.cur.q!==q){alive=false;return}const free=H.filter(h=>!up.has(h));const cand=[...Array(n).keys()].filter(i=>![...up.values()].includes(i)&&!gone.has(i));
  if(free.length&&cand.length){const h=R.pick(free),i=cand[k++%cand.length];up.set(h,i);$('.k3sign',h).innerHTML=k3Lab(opts[i]);h.classList.add('up');const life=k3calm()?3200:2200;
   setTimeout(()=>{h.classList.remove('up');setTimeout(()=>up.delete(h),300)},life)}tm=setTimeout(step,k3calm()?1100:750)};step();
 return{get:()=>sel,ready:()=>sel!=null,clear(){sel=null;C.forEach(c=>c.classList.remove('sel'));pk.innerHTML=''},check:v=>v===q.a,key:i=>choose(i),
  show(ok){alive=false;clearTimeout(tm);C.forEach(c=>{c.disabled=true;const o=opts[+c.dataset.i];if(o===q.a)c.classList.add('ok');else if(o===sel)c.classList.add('bad')});H.forEach(h=>{const i=up.get(h);h.classList.toggle('up',i!=null&&opts[i]===q.a)})},
  hint3(){const w=[...Array(n).keys()].filter(i=>opts[i]!==q.a&&!gone.has(i));R.shuffle(w).slice(0,2).forEach(i=>{gone.add(i);const c=C[i];c.disabled=true;c.classList.add('gone');if(opts[i]===sel){sel=null;pk.innerHTML=''}});return'Two wrong moles went to sleep.'},
  _auto(){choose(opts.indexOf(q.a))}}};

/* ---- CATCH: answers fall from the sky; tap all the right ones ---- */
K3UI.catch=function(q,W){const sc=$('#k3Scene'),opts=R.shuffle(q.o),got=new Set(),lock=new Set(),gone=new Set();let alive=true,tm=0,k=0;
 sc.innerHTML=`<div class="k3rain"><div class="k3basket">🧺</div></div>`;const box=$('.k3rain',sc);
 W.innerHTML=`<p class="k3note">Tap the falling answers that are <b>right</b> to catch them. Tap a caught one below to drop it. Press <b>Check</b> when you have them all.</p><div class="k3list k3caught" id="k3Cg"><span class="muted">Nothing caught yet</span></div>`;const cg=$('#k3Cg',W);
 const draw=()=>{cg.innerHTML=got.size?[...got].map(o=>`<button class="k3chip sel${lock.has(o)?' locked':''}" data-o="${esc(o)}">${k3Lab(o)}${lock.has(o)?'':' ✕'}</button>`).join(''):'<span class="muted">Nothing caught yet</span>';$$('.k3chip',cg).forEach(c=>c.onclick=()=>{if(KRUN.cur.done||lock.has(c.dataset.o))return;got.delete(c.dataset.o);draw();sfx('click')})};
 const drop=()=>{if(!alive||!sc.isConnected||!KRUN||KRUN.cur.q!==q){alive=false;return}const cand=opts.filter(o=>!got.has(o)&&!gone.has(o));if(cand.length){const o=cand[k++%cand.length];
  const it=H(`<button class="k3fall" style="left:${8+Math.random()*64}%;--t:${k3calm()?7:5}s">${k3Lab(o)}</button>`);box.append(it);it.onclick=()=>{if(KRUN.cur.done)return;got.add(o);it.classList.add('caught');sfx('coin');draw();setTimeout(()=>it.remove(),300)};it.addEventListener('animationend',()=>it.remove())}
  tm=setTimeout(drop,k3calm()?1600:1100)};drop();
 return{get:()=>[...got],ready:()=>got.size>0,clear(){got.clear();lock.forEach(o=>got.add(o));draw()},check:v=>v.length===q.a.length&&q.a.every(x=>v.includes(x)),
  show(){alive=false;clearTimeout(tm);$$('.k3fall',box).forEach(x=>x.remove());cg.innerHTML=opts.map(o=>{const r=q.a.includes(o),c=got.has(o);return(r||c)?`<span class="k3chip ${r?(c?'ok':'miss'):'bad'}">${k3Lab(o)}${r&&!c?' (missed)':''}</span>`:''}).join('')},
  hint3(){const c=q.a.find(o=>!got.has(o));if(c){got.add(c);lock.add(c)}R.shuffle(opts.filter(o=>!q.a.includes(o))).slice(0,1).forEach(o=>{gone.add(o);got.delete(o)});draw();return'One right answer is caught for you and one wrong one stops falling.'},
  _auto(){got.clear();q.a.forEach(o=>got.add(o));draw()}}};

/* ---- CONVEYOR: items ride a belt; send each one to the right bin ---- */
K3UI.conveyor=function(q,W){const sc=$('#k3Scene'),bins=q.bins,items=R.shuffle(q.o.map(x=>x[0])),want=Object.fromEntries(q.o.map(x=>[x[0],x[1]])),put={},lock=new Set();let alive=true,raf=0,t0=performance.now();
 sc.innerHTML=`<div class="k3belt"><div class="k3rollers"></div><div class="k3track" id="k3Tr"></div><div class="k3arrow">➜</div></div>`;const tr=$('#k3Tr',sc);
 W.innerHTML=`<p class="k3note">Tap an item on the belt (or let the first one come), then tap the bin it belongs in.</p><div class="k3bins">${bins.map((b,i)=>`<button class="k3bin2" data-b="${i}"><b>${esc(b)}</b><span class="k3in" id="k3B${i}"></span></button>`).join('')}</div>`;
 let cur=null;const left=()=>items.filter(o=>put[o]==null);
 const draw=()=>{const L=left();tr.innerHTML=L.map((o,i)=>`<button class="k3box${o===cur?' sel':''}" data-o="${esc(o)}">${k3Lab(o)}</button>`).join('');$$('.k3box',tr).forEach(b=>b.onclick=()=>{if(KRUN.cur.done)return;cur=b.dataset.o;draw();sfx('click')});
  bins.forEach((_,i)=>{$('#k3B'+i,W).innerHTML=items.filter(o=>put[o]===i).map(o=>`<span class="k3chip${lock.has(o)?' locked':''}" data-o="${esc(o)}">${k3Lab(o)}</span>`).join('')});
  $$('.k3in .k3chip',W).forEach(c=>c.onclick=e=>{e.stopPropagation();if(KRUN.cur.done||lock.has(c.dataset.o))return;delete put[c.dataset.o];draw()})};
 $$('.k3bin2',W).forEach(b=>b.onclick=()=>{if(KRUN.cur.done)return;const L=left();if(!L.length)return;const o=cur&&L.includes(cur)?cur:L[0];put[o]=+b.dataset.b;cur=null;sfx('coin');draw()});
 const move=now=>{if(!alive||!sc.isConnected){alive=false;return}tr.style.transform=`translateX(${-((now-t0)/(k3calm()?60:40))%60}px)`;raf=requestAnimationFrame(move)};raf=requestAnimationFrame(move);draw();
 return{get:()=>({...put}),ready:()=>left().length===0,clear(){items.forEach(o=>{if(!lock.has(o))delete put[o]});draw()},check:v=>items.every(o=>v[o]===want[o]),
  show(){alive=false;cancelAnimationFrame(raf);bins.forEach((_,i)=>{$('#k3B'+i,W).innerHTML=items.filter(o=>put[o]===i).map(o=>`<span class="k3chip ${want[o]===i?'ok':'bad'}">${k3Lab(o)}${want[o]===i?'':' → '+esc(bins[want[o]])}</span>`).join('')})},
  hint3(){R.shuffle(items.filter(o=>!lock.has(o))).slice(0,2).forEach(o=>{put[o]=want[o];lock.add(o)});draw();return'Two items were sent to the right bin for you.'},
  _auto(){items.forEach(o=>put[o]=want[o]);draw()}}};

/* ---- MEMORY: flip cards to find the pairs ---- */
K3UI.memory=function(q,W){const sc=$('#k3Scene'),P=q.o.map((x,i)=>({i,l:x[0],r:x[1]}));const cards=R.shuffle(P.flatMap(p=>[{p:p.i,t:p.l},{p:p.i,t:p.r}]));const done=new Set();let open=[],miss=0,busy=false;
 sc.innerHTML=`<div class="k3mem" style="--c:${cards.length>8?4:cards.length>6?4:3}">${cards.map((c,k)=>`<button class="k3card" data-k="${k}"><span class="k3card-in"><span class="k3card-f">?</span><span class="k3card-b">${k3Lab(c.t)}</span></span></button>`).join('')}</div>`;
 W.innerHTML=`<p class="k3note">Flip two cards at a time. Find every pair that goes together (${P.length} pairs). Try to make as few misses as you can!</p><p class="k3memstat" id="k3Ms">Pairs found: 0 of ${P.length} · Misses: 0</p>`;const B=$$('.k3card',sc),st=$('#k3Ms',W);
 const stat=()=>st.textContent=`Pairs found: ${done.size} of ${P.length} · Misses: ${miss}`;
 const flip=b=>{if(busy||KRUN.cur.done)return;const k=+b.dataset.k;if(done.has(cards[k].p)||open.includes(k))return;b.classList.add('up');open.push(k);sfx('click');
  if(open.length===2){const[a,c]=open;if(cards[a].p===cards[c].p){done.add(cards[a].p);B[a].classList.add('got');B[c].classList.add('got');open=[];sfx('coin');stat();if(done.size===P.length){st.innerHTML=`<b>All pairs found!</b> Misses: ${miss}. Press <b>Check</b>.`}}
   else{busy=true;miss++;stat();setTimeout(()=>{B[a].classList.remove('up');B[c].classList.remove('up');open=[];busy=false},850)}}};
 B.forEach(b=>b.onclick=()=>flip(b));
 return{get:()=>miss,ready:()=>done.size===P.length,clear(){},check:v=>v<=P.length*2,
  show(ok){B.forEach(b=>{b.disabled=true;b.classList.add('up')});if(!ok)st.innerHTML=`All found, but with ${miss} misses. Try to remember where cards are!`},
  hint3(){const p=P.find(p=>!done.has(p.i));if(p){done.add(p.i);cards.forEach((c,k)=>{if(c.p===p.i)B[k].classList.add('up','got')});stat()}return'One pair is turned over for you.'},
  _auto(){P.forEach(p=>done.add(p.i));B.forEach(b=>b.classList.add('up','got'))}}};

/* ---- RUB: rub a balloon on hair to move electrons, then answer ---- */
K3UI.rub=function(q,W){const sc=$('#k3Scene'),NEED=8;let n=0,lastX=null,dir=0,drag=false,ok=false,wall=false;
 sc.innerHTML=`<svg viewBox="0 0 400 260" class="k3rub"><rect width="400" height="260" fill="#E3F2FD"/><rect x="330" y="0" width="70" height="260" fill="#CFD8DC"/><text x="365" y="250" text-anchor="middle" font-size="11" fill="#607D8B">WALL</text>
  <g id="rbBoy"><ellipse cx="130" cy="190" rx="70" ry="60" fill="#FFCC99"/><circle cx="108" cy="185" r="7" fill="#3E2723"/><circle cx="152" cy="185" r="7" fill="#3E2723"/><path d="M110 215q20 15 40 0" stroke="#8D4E2A" stroke-width="4" fill="none" stroke-linecap="round"/>
   <g id="rbHair">${Array.from({length:11},(_,k)=>`<path class="rb-h" style="--r:${(k-5)*9}deg" d="M${75+k*11} 150q4 -24 ${(k-5)*2} -40" stroke="#5D4037" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('')}</g>
   <g id="rbHe">${Array.from({length:NEED},(_,k)=>`<g class="rb-e" data-k="${k}" transform="translate(${82+k*12} ${140-(k%2)*10})"><circle r="6" fill="#1E88E5"/><text y="4" text-anchor="middle" font-size="11" fill="#fff">−</text></g>`).join('')}</g><g id="rbHp"></g></g>
  <g id="rbBal" transform="translate(240 90)" style="cursor:grab"><path d="M0 52q-4 40 10 70" stroke="#90A4AE" stroke-width="2" fill="none"/><ellipse rx="42" ry="50" fill="#FF5D73"/><ellipse cx="-14" cy="-18" rx="10" ry="16" fill="#fff" opacity=".45"/><path d="M-6 50h12l-6 8z" fill="#E53950"/><g id="rbBe"></g></g>
  <rect x="20" y="16" width="150" height="14" rx="7" fill="#fff" stroke="#90A4AE"/><rect id="rbBar" x="20" y="16" width="0" height="14" rx="7" fill="#1E88E5"/><text x="20" y="46" font-size="12" fill="#37474F" id="rbTxt">Drag the balloon over the hair, back and forth!</text></svg>`;
 const svg=$('svg',sc),bal=$('#rbBal',sc);let bx=240,by=90;const put=()=>bal.setAttribute('transform',`translate(${bx} ${by})`);
 const ui=k3Opts(q,W,`<b>Step 1:</b> rub the balloon on the boy's hair ${NEED} times (drag it back and forth), or press the Rub button.${q.wall?' <b>Step 2:</b> then drag it to the wall.':''}`);
 W.insertAdjacentHTML('afterbegin',`<div class="row" style="margin-bottom:6px"><button class="btn ghost" id="rbBtn" type="button">🎈 Rub!</button>${q.wall?'<button class="btn ghost" id="rbWall" type="button">🧱 Hold it to the wall</button>':''}</div>`);
 const rub=()=>{if(n>=NEED)return;const e=$(`.rb-e[data-k="${n}"]`,sc);if(e){e.style.transition='transform .5s';e.setAttribute('transform',`translate(${bx-10+((n%4)-1.5)*16} ${by-20+Math.floor(n/4)*18})`);setTimeout(()=>{e.remove();$('#rbBe',sc).insertAdjacentHTML('beforeend',`<g transform="translate(${((n%4)-1.5)*16-0} ${Math.floor((n-1)/4)*18-14})"><circle r="6" fill="#1E88E5"/><text y="4" text-anchor="middle" font-size="11" fill="#fff">−</text></g>`)},450)}
  $('#rbHp',sc).insertAdjacentHTML('beforeend',`<g transform="translate(${82+n*12} ${128-(n%2)*10})"><circle r="6" fill="#E53935"/><text y="4" text-anchor="middle" font-size="11" fill="#fff">+</text></g>`);
  n++;sfx('click');$('#rbBar',sc).setAttribute('width',150*n/NEED);$$('.rb-h',sc).forEach(h=>h.style.transform=`rotate(${n/NEED*0.6*parseFloat(h.style.getPropertyValue('--r'))}deg)`);
  if(n>=NEED){$('#rbTxt',sc).textContent=q.wall?'Charged! Now hold the balloon to the wall.':'Charged! The balloon is full of extra electrons.';sfx('good');if(!q.wall){ok=true;ui.unlock()}}};
 const stick=()=>{if(n<NEED||wall)return;wall=true;bx=290;by=80;bal.style.transition='transform .6s';put();setTimeout(()=>{bal.style.transition='';$('#rbTxt',sc).textContent='It sticks to the wall! Why?';ok=true;ui.unlock();sfx('good')},650)};
 $('#rbBtn',W).onclick=()=>{bx=150;by=120;put();rub();setTimeout(()=>{if(!wall){bx=240;by=90;put()}},250)};const wb=$('#rbWall',W);if(wb)wb.onclick=stick;
 const pt=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())};
 bal.addEventListener('pointerdown',e=>{if(KRUN.cur.done||wall)return;drag=true;bal.setPointerCapture(e.pointerId);e.preventDefault()});
 bal.addEventListener('pointermove',e=>{if(!drag)return;const p=pt(e);bx=Math.max(40,Math.min(360,p.x));by=Math.max(50,Math.min(210,p.y));put();
  if(bx>60&&bx<210&&by<170){if(lastX!=null){const d=Math.sign(bx-lastX);if(d&&d!==dir&&Math.abs(bx-lastX)>2){if(dir)rub();dir=d}}lastX=bx}else lastX=null;
  if(q.wall&&n>=NEED&&bx>300)stick()});
 const up=()=>{drag=false};bal.addEventListener('pointerup',up);bal.addEventListener('pointercancel',up);
 const r0=ui.ready;ui.ready=()=>ok&&r0();const h3=ui.hint3;ui.hint3=()=>{while(n<NEED)rub();if(q.wall)stick();return h3()};const a0=ui._auto;ui._auto=()=>{while(n<NEED)rub();ok=true;ui.unlock();ui.key&&ui.key(0);$$('.k3opt',W).forEach(b=>{if(b.dataset.o===q.a)b.click()})};return ui};

/* ---- SWITCH: close the switch, watch the current flow, then answer ---- */
K3UI.switchc=function(q,W){const sc=$('#k3Scene');let on=false,ok=false,raf=0;const two=q.lamps===2;
 sc.innerHTML=`<svg viewBox="0 0 400 260" class="k3sw"><rect width="400" height="260" fill="#FFF8E1"/><path id="swPath" d="M80 60H320V200H80Z" fill="none" stroke="#5D4037" stroke-width="6" stroke-linejoin="round"/>
  <g transform="translate(80 130)"><rect x="-20" y="-30" width="40" height="60" rx="6" fill="#455A64"/><rect x="-12" y="-38" width="24" height="10" fill="#90A4AE"/><text y="6" text-anchor="middle" fill="#fff" font-size="16">+ −</text></g>
  ${(two?[170,250]:[200]).map((x,k)=>`<g class="swLamp" transform="translate(${x} 60)"><circle r="20" fill="#fff" stroke="#5D4037" stroke-width="4"/><path d="M-14 -14L14 14M14 -14L-14 14" stroke="#5D4037" stroke-width="3"/><circle class="swGlow" r="30" fill="#FFE066" opacity="0"/></g>`).join('')}
  <g transform="translate(200 200)"><rect x="-40" y="-6" width="80" height="12" fill="#FFF8E1"/><circle cx="-34" r="6" fill="#5D4037"/><circle cx="34" r="6" fill="#5D4037"/><line id="swArm" x1="-34" y1="0" x2="30" y2="-34" stroke="#5D4037" stroke-width="6" stroke-linecap="round" style="transition:all .3s"/><rect x="-50" y="-50" width="100" height="70" fill="transparent" id="swHit" style="cursor:pointer"/></g>
  <g id="swDots"></g><text x="200" y="245" text-anchor="middle" font-size="13" fill="#5D4037" id="swTxt">Tap the switch to close the circuit</text></svg>`;
 const ui=k3Opts(q,W,'<b>Step 1:</b> tap the switch to close the circuit and watch what happens.');
 const P=$('#swPath',sc),len=P.getTotalLength(),dots=$('#swDots',sc);
 const flow=now=>{if(!on||!sc.isConnected)return;dots.innerHTML=Array.from({length:14},(_,k)=>{const p=P.getPointAtLength(((now/20)+k*len/14)%len);return`<circle cx="${p.x}" cy="${p.y}" r="4" fill="#1E88E5"/>`}).join('');raf=requestAnimationFrame(flow)};
 const tog=()=>{if(KRUN.cur.done)return;on=!on;$('#swArm',sc).setAttribute('x2',on?34:30);$('#swArm',sc).setAttribute('y2',on?0:-34);$$('.swGlow',sc).forEach(g=>g.setAttribute('opacity',on?two?.45:.85:0));sfx('click');
  if(on){$('#swTxt',sc).textContent='The circuit is complete: current flows and the lamp lights!';raf=requestAnimationFrame(flow);if(!ok){ok=true;ui.unlock()}}else{cancelAnimationFrame(raf);dots.innerHTML='';$('#swTxt',sc).textContent='The circuit is broken: no current, no light.'}};
 $('#swHit',sc).onclick=tog;W.insertAdjacentHTML('afterbegin','<div class="row" style="margin-bottom:6px"><button class="btn ghost" type="button" id="swBtn">🔌 Flip the switch</button></div>');$('#swBtn',W).onclick=tog;
 const r0=ui.ready;ui.ready=()=>ok&&r0();const h3=ui.hint3;ui.hint3=()=>{if(!ok)tog();return h3()};ui._auto=()=>{if(!ok)tog();$$('.k3opt',W).forEach(b=>{if(b.dataset.o===q.a)b.click()})};return ui};

/* ---- HEAT: hold the flame to heat ice; watch the particles change state ---- */
K3UI.heat=function(q,W){const sc=$('#k3Scene'),N=16;let T=-10,hold=false,ok=false,raf=0,last=performance.now();const goal=q.goal||'liquid';
 const pos=Array.from({length:N},(_,k)=>({x:150+(k%4)*26,y:150+Math.floor(k/4)*22,vx:(Math.random()-.5),vy:(Math.random()-.5)}));
 sc.innerHTML=`<svg viewBox="0 0 400 260" class="k3heat"><rect width="400" height="260" fill="#ECEFF1"/><path d="M110 60V230H310V60" fill="#E1F5FE" fill-opacity=".5" stroke="#78909C" stroke-width="5"/><g id="htP"></g>
  <g transform="translate(350 50)"><rect x="-8" y="0" width="16" height="170" rx="8" fill="#fff" stroke="#78909C" stroke-width="3"/><rect id="htM" x="-4" y="160" width="8" height="10" rx="4" fill="#E53935"/><circle cy="180" r="12" fill="#E53935"/></g>
  <text x="350" y="40" text-anchor="middle" font-size="14" fill="#37474F" id="htT">-10 °C</text><g id="htF" opacity="0"><path d="M190 255q20-40 20-20q10-30 20 0q0-20 20 20z" fill="#FF7043"/><path d="M205 255q10-24 15-10q8-16 12 10z" fill="#FFD54F"/></g>
  <text x="210" y="40" text-anchor="middle" font-size="16" font-weight="700" fill="#37474F" id="htS">SOLID (ice)</text></svg>`;
 const ui=k3Opts(q,W,`<b>Step 1:</b> press and hold <b>Heat</b> until the ice becomes a ${goal==='gas'?'gas (steam)':'liquid (water)'}. Watch the particles!`);
 W.insertAdjacentHTML('afterbegin','<div class="row" style="margin-bottom:6px"><button class="btn gold" type="button" id="htBtn">🔥 Hold to heat</button></div>');const hb=$('#htBtn',W);
 const st=()=>T<0?'solid':T<100?'liquid':'gas';
 const tick=now=>{if(!sc.isConnected)return;const dt=Math.min(50,now-last);last=now;if(hold)T=Math.min(130,T+dt*(k3calm()?.045:.07));
  const s=st(),sp=s==='solid'?.6:s==='liquid'?1.6:4;$('#htF',sc).setAttribute('opacity',hold?1:0);$('#htT',sc).textContent=Math.round(T)+' °C';$('#htM',sc).setAttribute('y',160-Math.max(0,(T+10)/140*150));$('#htM',sc).setAttribute('height',10+Math.max(0,(T+10)/140*150));
  $('#htS',sc).textContent=s==='solid'?'SOLID (ice): particles vibrate in place':s==='liquid'?'LIQUID (water): particles slide past each other':'GAS (steam): particles fly fast and far apart';
  pos.forEach((p,k)=>{if(s==='solid'){const hx=150+(k%4)*26,hy=150+Math.floor(k/4)*22;p.x=hx+(Math.random()-.5)*sp*3;p.y=hy+(Math.random()-.5)*sp*3}else{p.x+=p.vx*sp;p.y+=p.vy*sp+(s==='liquid'?.4:0);const top=s==='liquid'?160:70;if(p.x<120||p.x>300)p.vx*=-1;if(p.y<top||p.y>220)p.vy*=-1;p.x=Math.max(120,Math.min(300,p.x));p.y=Math.max(top,Math.min(220,p.y))}});
  $('#htP',sc).innerHTML=pos.map(p=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="#29B6F6" stroke="#0277BD" stroke-width="2"/>`).join('');
  if(!ok&&(goal==='gas'?T>=100:T>=5)){ok=true;ui.unlock();sfx('good')}raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
 const start=e=>{e.preventDefault();if(!KRUN.cur.done)hold=true},stop=()=>hold=false;hb.addEventListener('pointerdown',start);['pointerup','pointerleave','pointercancel'].forEach(t=>hb.addEventListener(t,stop));hb.onkeydown=e=>{if(e.key===' '||e.key==='Enter'){hold=true;setTimeout(stop,400)}};
 const r0=ui.ready;ui.ready=()=>ok&&r0();const h3=ui.hint3;ui.hint3=()=>{T=goal==='gas'?105:20;return h3()};ui._auto=()=>{T=goal==='gas'?105:20;ok=true;ui.unlock();$$('.k3opt',W).forEach(b=>{if(b.dataset.o===q.a)b.click()})};return ui};

/* ---- hand-made toy questions placed into particular levels ---- */
K3X.phy={0:{2:{w:'rub',base:'pick',p:'Rub the balloon on the hair. Electrons move from the hair to the balloon. What charge does the <b>balloon</b> have now?',o:['Negative','Positive','No charge','Both'],a:'Negative',h:['Electrons are negative.','The balloon gained extra electrons.'],e:'The balloon gained electrons, which are negative, so the balloon is now negatively charged.'},
  6:{w:'rub',base:'pick',p:'Rub the balloon on the hair again. The hair <b>lost</b> electrons. What charge does the <b>hair</b> have now?',o:['Positive','Negative','No charge','It becomes magnetic'],a:'Positive',h:['Losing negative charges leaves more positive charges.','Opposite to the balloon.'],e:'The hair lost electrons, so it has more positive charge than negative: it is positively charged. That is why the hairs stand up and are pulled towards the balloon.'}},
 2:{4:{w:'rub',base:'pick',wall:true,p:'Charge the balloon, then hold it to the wall. Why does it stick?',o:['The negative balloon attracts the wall’s positive charges','The balloon is magnetic','Air pushes it onto the wall','The wall is sticky'],a:'The negative balloon attracts the wall’s positive charges',h:['Opposite charges attract.','The balloon is negatively charged.'],e:'The charged balloon pushes the wall’s electrons away, leaving the wall surface slightly positive. Opposite charges attract, so the balloon sticks.'}},
 7:{6:{w:'switchc',base:'pick',p:'Close the switch. What has to happen for the lamp to light?',o:['There must be a complete loop with no gaps','The switch must be open','The cell must be removed','The wires must be cut'],a:'There must be a complete loop with no gaps',h:['Current can only flow round a full loop.','An open switch makes a gap.'],e:'Current only flows when the circuit is a complete loop. Closing the switch closes the gap, so current flows and the lamp lights.'}},
 5:{2:{w:'switchc',base:'pick',lamps:2,p:'This series circuit has two lamps. Close the switch. What happens if one lamp breaks?',o:['Both lamps go out','Only the broken one goes out','The other gets brighter','Nothing changes'],a:'Both lamps go out',h:['In series there is only one path.','A broken lamp makes a gap in the loop.'],e:'In a series circuit there is only one path. A broken lamp makes a gap, so no current flows and both lamps go out.'}}};
K3X.chem={1:{6:{w:'heat',base:'pick',goal:'liquid',p:'Hold the flame to heat the ice. What happens to the particles when ice <b>melts</b>?',o:['They gain energy and start sliding past each other','They stop moving','They get bigger','They turn into new particles'],a:'They gain energy and start sliding past each other',h:['Heating gives particles energy.','In a liquid, particles can move around each other.'],e:'Heating gives the particles more energy. They vibrate faster until they break out of their fixed places and slide past each other: the solid melts into a liquid.'}},
 2:{2:{w:'heat',base:'pick',goal:'gas',p:'Keep heating until the water <b>boils</b>. How are gas particles arranged?',o:['Far apart, moving fast in all directions','Packed tightly in rows','Touching but sliding','Not moving at all'],a:'Far apart, moving fast in all directions',h:['Steam spreads out to fill the room.','Gas particles have the most energy.'],e:'In a gas the particles have lots of energy. They are far apart and move quickly in all directions, which is why a gas fills its container.'}}};
/* Spanish: Calendar Conveyor becomes Calendar Carnival with a mix of games */
if(K3.spa&&K3.spa.lv[4]){const L=K3.spa.lv[4];L.t='Calendar Carnival';L.s='Calendar carnival games';L.tag='Days, months and dates in Spanish, played as carnival games: pop, whack, catch and race!';}
K3X.spa={4:{}};
k3Q=(o=>function(g,lv,i){const q=o(g,lv,i);if(g==='spa'&&lv===4&&q.w==='order'&&!q.fb){const kinds=[['pop','first'],['whack','after'],['pop','after'],['whack','first']];if(i!==0&&i!==9){const[k,w]=kinds[i%4];const r=k3OrderChoice(q,k,w);if(r)return r}}
 if(g==='spa'&&q.say&&(q.w==='pop'||q.w==='whack'))setTimeout(()=>{try{say(q.say)}catch(e){}},500);return q})(k3Q);
