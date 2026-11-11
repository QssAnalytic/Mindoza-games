/* ==== COIN RUSH levels: in these levels every right answer opens a treasure chest that drops 2-5 coins to tap ==== */
/* level index (0-based) per game: Maths World 6, Excel Lab 4, Cell Lab 3, Volt Voyage 7, Atom Forge 4, Bio Odyssey 5, ¡Vamos! 3 */
const CRL={algebra:5,ict:3,sci:2,phy:6,chem:3,bio:4,spa:2};
const CR={pend:null};
function crRun(){if(RUN)return{r:RUN,g:'algebra',lv:RUN.s};if(XRUN)return{r:XRUN,g:'ict',lv:XRUN.lv};if(SRUN)return{r:SRUN,g:'sci',lv:SRUN.lv};if(KRUN)return{r:KRUN,g:KRUN.g,lv:KRUN.lv};return null}
function crIs(g,lv){return CRL[g]===lv}
const CHESTSVG=`<svg viewBox="0 0 120 100" aria-hidden="true"><defs><linearGradient id="crW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C47A3A"/><stop offset="1" stop-color="#8A4B1E"/></linearGradient><linearGradient id="crL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D98C45"/><stop offset="1" stop-color="#A65E28"/></linearGradient></defs>
<rect x="12" y="46" width="96" height="48" rx="8" fill="url(#crW)" stroke="#5E3010" stroke-width="3"/><rect x="12" y="62" width="96" height="7" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/><rect x="26" y="46" width="8" height="48" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/><rect x="86" y="46" width="8" height="48" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/>
<g class="cr-lid"><path d="M12 48 Q12 18 60 18 Q108 18 108 48 Z" fill="url(#crL)" stroke="#5E3010" stroke-width="3"/><rect x="26" y="22" width="8" height="26" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/><rect x="86" y="22" width="8" height="26" fill="#FFC531" stroke="#8A5F00" stroke-width="2"/><rect x="52" y="40" width="16" height="16" rx="3" fill="#FFE066" stroke="#8A5F00" stroke-width="2.4"/></g></svg>`;
/* the chest pops up over the game, opens, and spills the coins */
function crDrop(){const n=coinRoll();crFlush();
 const ov=H(`<div class="cr-ov" aria-live="polite"><div class="cr-box" id="crBox"><div class="cr-tag">${n===5?'JACKPOT! ':''}+${n} coins</div><div class="cr-chest">${CHESTSVG}<span class="cr-mouth" id="crMouth"></span></div></div></div>`);document.body.append(ov);
 const p={ov,n,left:n,collect:null,after:null,t:null};CR.pend=p;S.stats.rushCoins=(S.stats.rushCoins||0)+n;
 setTimeout(()=>{if(CR.pend!==p)return;ov.classList.add('cr-open');sfx(n>=4?'crystal':'coin');
  p.collect=coinSpill($('#crBox',ov),$('#crMouth',ov),Array(n).fill(1),()=>crDone(p));
  /* track the taps, so the game can move on as soon as all are collected */
 },380);
 p.t=setTimeout(()=>crFlush(),9000);return p}
function crDone(p){if(p.doneFired)return;p.doneFired=true;clearTimeout(p.t);if(CR.pend===p)CR.pend=null;p.ov.classList.add('cr-bye');setTimeout(()=>p.ov.remove(),450);save();const a=p.after;p.after=null;a&&setTimeout(a,250)}
/* collect anything left (coins are never lost) */
function crFlush(){const p=CR.pend;if(!p)return;if(p.collect)p.collect();else{addCoins(p.n);updTop()}
 setTimeout(()=>crDone(p),p.collect?750:0)}
/* run start banner */
function crIntro(r){if(r._crIntro)return;r._crIntro=true;const b=H(`<div class="cr-intro" role="status"><b>💰 COIN RUSH LEVEL!</b><span>Every right answer drops 2 to 5 coins. Tap them to collect!</span></div>`);document.body.append(b);sfx('crystal');setTimeout(()=>b.classList.add('cr-bye'),3600);setTimeout(()=>b.remove(),4200)}
/* wrap answer checks: when the correct count goes up in a coin level, drop the chest */
function crWrapSubmit(name,getRun){const o=window[name];if(typeof o!=='function')return;window[name]=function(){const x=getRun();const before=x?x.r.correct:0;const res=o.apply(this,arguments);const y=getRun();
 if(x&&y&&y.r===x.r&&crIs(x.g,x.lv)&&y.r.correct>before)crDrop();return res}}
/* wrap "next question": wait until the coins are tapped (or 4 s), then go on */
function crWrapNext(name){const o=window[name];if(typeof o!=='function')return;window[name]=function(){const self=this,args=arguments;const x=crRun();if(x&&crIs(x.g,x.lv))crIntro(x.r);
 const p=CR.pend;if(p&&!p.doneFired&&!p.after){p.after=()=>o.apply(self,args);clearTimeout(p.t);p.t=setTimeout(()=>crFlush(),4000);return}return o.apply(self,args)}}
crWrapSubmit('finishQ',()=>RUN?{r:RUN,g:'algebra',lv:RUN.s}:null);
crWrapSubmit('xlSubmit',()=>XRUN?{r:XRUN,g:'ict',lv:XRUN.lv}:null);
crWrapSubmit('scSubmit',()=>SRUN?{r:SRUN,g:'sci',lv:SRUN.lv}:null);
crWrapSubmit('k3Submit',()=>KRUN?{r:KRUN,g:KRUN.g,lv:KRUN.lv}:null);
['nextQ','xlNext','scNext','k3Next'].forEach(crWrapNext);
/* leaving a level or finishing it collects whatever is still on screen */
['stageClear','trainingRoom','xlEnd','xlTraining','scEnd','scTraining','k3End','go'].forEach(n=>{const o=window[n];if(typeof o!=='function')return;window[n]=function(){if(CR.pend)crFlush();return o.apply(this,arguments)}});
/* a coin badge on the coin levels in every map */
function crBadge(node){if(!node||node.querySelector('.cr-badge'))return;const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','cr-badge');g.setAttribute('transform','translate(26 -30)');
 g.innerHTML=`<circle r="15" fill="#FFD23F" stroke="#B57F00" stroke-width="3"/><text y="6" text-anchor="middle" font-family="Bungee,sans-serif" font-size="16" fill="#8A5F00">$</text><title>Coin Rush level: every right answer drops coins</title>`;node.append(g);
 const lbl=node.getAttribute('aria-label');if(lbl&&!/Coin Rush/.test(lbl))node.setAttribute('aria-label',lbl+', Coin Rush level')}
function crMaps(){try{let g=null;if(VIEW==='map')g='algebra';else if(VIEW==='ict')g='ict';else if(VIEW==='sci')g='sci';else if(/^k3/.test(VIEW))g=VIEW.slice(2)||K3G;if(!g||CRL[g]===undefined)return;
 if(g==='algebra'){const k=NODES.findIndex(n=>n.t==='s'&&n.i===CRL.algebra);crBadge(document.querySelector(`.mapsvg .node[data-k="${k}"]`))}
 else crBadge(document.querySelector(`.mapsvg .rnode[data-i="${CRL[g]}"]`))}catch(e){}}
new MutationObserver(()=>{if(document.querySelector('.mapsvg .node:not(.crseen)')){document.querySelectorAll('.mapsvg .node').forEach(n=>n.classList.add('crseen'));crMaps()}}).observe(document.body,{childList:true,subtree:true});
