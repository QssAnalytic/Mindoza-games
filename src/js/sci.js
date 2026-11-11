/* ==== Cell Lab: Grade 7 Science, Unit 1 Cells (topics 1.1 to 1.3 of the Cambridge Lower Secondary Science Workbook 7) ==== */

/* ---- facts ---- */
const PARTS={wall:{n:'cell wall',job:'is a strong layer outside the membrane that supports the cell and keeps its shape'},
 membrane:{n:'cell membrane',job:'controls what goes into and out of the cell'},
 cytoplasm:{n:'cytoplasm',job:'is the jelly where most of the cell’s chemical reactions happen'},
 nucleus:{n:'nucleus',job:'controls the cell’s activities and holds its genetic information'},
 vacuole:{n:'sap vacuole',job:'stores cell sap and helps keep the cell firm'},
 chloroplast:{n:'chloroplast',job:'absorbs light energy to make food by photosynthesis'},
 mito:{n:'mitochondrion',job:'releases energy from food by respiration'}};
const PKEYS=Object.keys(PARTS);
const PLANT_ONLY=['wall','chloroplast','vacuole'];
const SCOPE={eyepiece:{n:'eyepiece',job:'the lens you look through'},stage:{n:'stage',job:'the flat platform where you put the slide'},
 mirror:{n:'mirror',job:'reflects light up through the slide'},coarse:{n:'coarse focusing knob',job:'the big knob that moves the lens a lot, to get the cells roughly into focus'},
 fine:{n:'fine focusing knob',job:'the small knob that moves the lens a tiny amount, to make the image sharp'},
 low:{n:'low-power objective lens',job:'the shortest objective lens; always start with this one to find the cells'},
 medium:{n:'medium-power objective lens',job:'the middle objective lens, used after the low-power lens'},
 high:{n:'high-power objective lens',job:'the longest objective lens; it gives the biggest magnification'}};
const SKEYS=Object.keys(SCOPE);
const CELLS={rbc:{n:'red blood cell',job:'carries oxygen around the body',where:'in the blood',animal:true,
  adapt:['contains haemoglobin, which carries oxygen','has no nucleus, so there is more room for haemoglobin','is small and flexible, so it can squeeze through capillaries']},
 roothair:{n:'root hair cell',job:'absorbs water and mineral salts from the soil',where:'in plant roots',animal:false,
  adapt:['has a long, thin extension that gives a large surface area for absorbing water','has no chloroplasts, because it is underground where there is no light']},
 ciliated:{n:'ciliated cell',job:'sweeps mucus, with trapped dust and germs, out of the airways',where:'lining the airways to the lungs',animal:true,
  adapt:['has tiny hairs called cilia that wave back and forth to move mucus']},
 palisade:{n:'palisade cell',job:'makes food for the plant by photosynthesis',where:'near the top surface of a leaf',animal:false,
  adapt:['is packed with chloroplasts to absorb as much light as possible','is long and thin, so many cells fit side by side near the top of the leaf']},
 neurone:{n:'neurone (nerve cell)',job:'carries electrical messages, called impulses, around the body',where:'in the brain, spinal cord and nerves',animal:true,
  adapt:['has a very long fibre so it can carry messages a long way','has branched ends that connect with many other cells']},
 sperm:{n:'sperm cell',job:'swims to an egg cell and fertilises it',where:'made in the testes',animal:true,
  adapt:['has a tail so it can swim','has many mitochondria to release energy for swimming']}};
const CKEYS=Object.keys(CELLS);
/* ---- drawings (original, simple line diagrams) ---- */
const PC={wall:'#3D8B37',mem:'#8BC34A',cyto:'#F1F8E4',vac:'#D2EBF8',vacS:'#7FB3D5',nuc:'#6A4C93',chl:'#43A047',mito:'#F28C28'};
const LBL={wall:[60,100],membrane:[292,140],cytoplasm:[112,80],vacuole:[185,115],nucleus:[92,165],chloroplast:[270,120],mito:[268,90]};
function chloroSVG(x,y,rx,ry){return`<g data-part="chloroplast"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${PC.chl}" stroke="#2E7D32" stroke-width="1.5"/>${rx<ry?`<path d="M${x-rx/2} ${y-ry/3}h${rx}M${x-rx/2} ${y}h${rx}M${x-rx/2} ${y+ry/3}h${rx}"`:`<path d="M${x-rx/3} ${y-ry/2}v${ry}M${x} ${y-ry/2}v${ry}M${x+rx/3} ${y-ry/2}v${ry}"`} stroke="#A5D6A7" stroke-width="1.4"/></g>`}
function mitoSVG(x,y,rx,ry){return`<g data-part="mito"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${PC.mito}" stroke="#B85E0E" stroke-width="1.4"/><path d="${rx<ry?`M${x} ${y-ry+3}q4 3 0 6t0 6t0 6`:`M${x-rx+3} ${y}q3 -4 6 0t6 0t6 0`}" fill="none" stroke="#FFE0B2" stroke-width="1.4"/></g>`}
/* the big plant cell used for labelling (like Exercise 1.1A) */
function plantCellSVG(o={}){const arrow=o.arrow,tap=o.tap;
 const body=`<rect x="70" y="30" width="220" height="170" rx="12" fill="${PC.cyto}" data-part="cytoplasm"/>
 <path d="M125 52c30-14 95-14 118 2c10 30 8 90-4 120c-30 14-90 14-110-2c-12-34-14-90-4-120z" fill="${PC.vac}" stroke="${PC.vacS}" stroke-width="2" data-part="vacuole"/>
 <ellipse cx="92" cy="165" rx="16" ry="22" fill="${PC.nuc}" data-part="nucleus"/><circle cx="96" cy="160" r="5" fill="#9C7BC4" pointer-events="none"/>
 ${chloroSVG(92,56,8,15)}${chloroSVG(92,108,8,15)}${chloroSVG(270,58,8,15)}${chloroSVG(270,122,8,15)}${chloroSVG(180,40,16,7)}${chloroSVG(214,190,16,7)}${chloroSVG(270,176,8,13)}
 ${mitoSVG(96,136,6,10)}${mitoSVG(268,90,6,10)}${mitoSVG(142,190,10,6)}
 <rect x="68" y="28" width="224" height="174" rx="13" fill="none" stroke="${PC.mem}" stroke-width="4" data-part="membrane"/>
 <rect x="60" y="20" width="240" height="190" rx="18" fill="none" stroke="${PC.wall}" stroke-width="10" data-part="wall"/>`;
 let ar='';if(arrow){const [x,y]=LBL[arrow];const left=x<180;const lx=left?12:348;
  ar=`<g class="sc-arrow" pointer-events="none"><line x1="${lx}" y1="${y}" x2="${x}" y2="${y}" stroke="#1F2328" stroke-width="2"/><circle cx="${x}" cy="${y}" r="4" fill="#1F2328"/><circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#E9A800" stroke-width="3" class="sc-pulse"/>
  <rect x="${left?0:326}" y="${y-13}" width="34" height="26" rx="7" fill="#E9A800"/><text x="${left?17:343}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="800" fill="#3A2A00">?</text></g>`}
 return`<svg viewBox="0 0 360 230" class="sc-svg${tap?' sc-tap':''}" role="img" aria-label="Diagram of a plant cell">${body}${ar}</svg>`}
/* small cells for comparisons (like Exercise 1.1C and 1.3 Q3) */
function miniPlant(kind,label){const leaf=kind==='leaf';const W=leaf?180:120,H=leaf?92:92;
 const chl=leaf?[[30,22],[60,18],[95,20],[130,18],[155,26],[30,70],[62,74],[96,72],[128,74],[156,66]].map(([x,y])=>chloroSVG(x,y,10,6)).join(''):'';
 const shape=leaf?`<rect x="8" y="6" width="${W-16}" height="${H-12}" rx="12" fill="${PC.cyto}" stroke="${PC.wall}" stroke-width="6"/>`
  :`<path d="M30 8h60l24 38-24 38H30L6 46z" fill="${PC.cyto}" stroke="${PC.wall}" stroke-width="6" stroke-linejoin="round"/>`;
 const vac=leaf?`<path d="M30 36c40-8 90-8 124 0c4 8 4 14 0 22c-34 8-84 8-124 0c-4-8-4-14 0-22z" fill="${PC.vac}" stroke="${PC.vacS}" stroke-width="1.5"/>`
  :`<circle cx="66" cy="48" r="24" fill="${PC.vac}" stroke="${PC.vacS}" stroke-width="1.5"/>`;
 const nuc=leaf?`<ellipse cx="22" cy="46" rx="8" ry="11" fill="${PC.nuc}"/>`:`<ellipse cx="32" cy="28" rx="9" ry="7" fill="${PC.nuc}"/>`;
 const mito=leaf?mitoSVG(112,48,7,4):mitoSVG(30,58,4,7)+mitoSVG(96,72,7,4);
 return`<figure class="sc-mini"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">${shape}${vac}${nuc}${chl}${mito}</svg><figcaption>Cell ${label}</figcaption></figure>`}
function animalCellSVG(){return`<svg viewBox="0 0 200 140" class="sc-svg sc-small" role="img" aria-label="Diagram of a cell"><path d="M30 70c-6-40 40-58 80-54c44 4 70 30 62 62c-8 34-50 50-92 44C46 118 34 100 30 70z" fill="#FDECEC" stroke="#D88A8A" stroke-width="3"/>
 <ellipse cx="96" cy="70" rx="20" ry="16" fill="${PC.nuc}"/>${mitoSVG(58,56,8,5)}${mitoSVG(140,90,8,5)}${mitoSVG(132,46,5,8)}<circle cx="70" cy="96" r="3" fill="#D88A8A"/><circle cx="150" cy="64" r="2.5" fill="#D88A8A"/></svg>`}
/* microscope (like Exercise 1.2) */
const SCOPE_AT={eyepiece:[140,26],coarse:[200,128],fine:[204,170],low:[112,150],medium:[140,158],high:[168,166],stage:[86,192],mirror:[140,234]};
function scopeSVG(o={}){const arrow=o.arrow;
 const d=`<path d="M100 270h110l14 14H86z" fill="#5A606E"/><path d="M150 270c10-30 40-40 44-90c3-34-10-62-30-84" fill="none" stroke="#7A8090" stroke-width="22" stroke-linecap="round"/>
 <rect x="128" y="8" width="24" height="40" rx="4" fill="#3B3F4A" data-part="eyepiece"/><rect x="124" y="46" width="32" height="70" rx="4" fill="#9AA0AE"/>
 <path d="M106 116h68l-6 12h-56z" fill="#5A606E"/>
 <rect x="105" y="128" width="14" height="20" rx="3" fill="#C9CED8" stroke="#5A606E" stroke-width="2" data-part="low"/>
 <rect x="133" y="128" width="14" height="28" rx="3" fill="#C9CED8" stroke="#5A606E" stroke-width="2" data-part="medium"/>
 <rect x="161" y="128" width="14" height="36" rx="3" fill="#C9CED8" stroke="#5A606E" stroke-width="2" data-part="high"/>
 <rect x="64" y="186" width="172" height="12" rx="3" fill="#2A2D36" data-part="stage"/><rect x="118" y="182" width="44" height="6" rx="2" fill="#E3F0FF" opacity=".9"/>
 <circle cx="200" cy="128" r="15" fill="#3B3F4A" data-part="coarse"/><circle cx="200" cy="128" r="6" fill="#7A8090" pointer-events="none"/>
 <circle cx="204" cy="170" r="9" fill="#3B3F4A" data-part="fine"/>
 <g data-part="mirror"><rect x="136" y="240" width="8" height="30" fill="#5A606E"/><ellipse cx="140" cy="234" rx="26" ry="9" fill="#BFE3FF" stroke="#5A606E" stroke-width="3" transform="rotate(-14 140 234)"/></g>`;
 let ar='';if(arrow){const [x,y]=SCOPE_AT[arrow];const left=['low','stage','mirror','eyepiece'].includes(arrow);const lx=left?12:288;
  ar=`<g pointer-events="none"><line x1="${lx}" y1="${y}" x2="${x}" y2="${y}" stroke="#1F2328" stroke-width="2"/><circle cx="${x}" cy="${y}" r="4" fill="#1F2328"/><circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#E9A800" stroke-width="3" class="sc-pulse"/>
  <rect x="${left?0:266}" y="${y-13}" width="34" height="26" rx="7" fill="#E9A800"/><text x="${left?17:283}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="800" fill="#3A2A00">?</text></g>`}
 return`<svg viewBox="0 0 300 290" class="sc-svg sc-scope" role="img" aria-label="Diagram of a light microscope">${d}${ar}</svg>`}
/* the view down the microscope: blurry until you make progress */
function scopeView(pts,dark){const blur=Math.max(0,(80-pts)/14).toFixed(1);
 return`<div class="sc-view" aria-hidden="true"><svg viewBox="0 0 120 120" style="filter:blur(${blur}px)${dark?' brightness(.25)':''}"><circle cx="60" cy="60" r="58" fill="#FFF8E6"/>
 ${[[34,40],[70,30],[88,62],[50,74],[28,82],[74,94]].map(([x,y],i)=>`<path d="M${x-14} ${y}c0-10 8-14 15-13c9 1 14 6 13 13c-1 9-8 13-15 12c-8-1-13-5-13-12z" fill="#F7D2DD" stroke="#C26A86" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="3.6" fill="#7B4FA0"/>`).join('')}</svg>
 <span>${pts>=80?'In focus!':'Focusing…'}</span></div>`}
/* specialised cells (like Exercise 1.3) */
function cellArt(k,size=150){const w=size,h=Math.round(size*0.62);const s={
 rbc:`<circle cx="75" cy="47" r="38" fill="#E25B5B"/><circle cx="75" cy="47" r="18" fill="#F6A9A9"/>`,
 roothair:`<path d="M10 20h44v54H10z" fill="${PC.cyto}" stroke="${PC.wall}" stroke-width="4"/><path d="M54 40h80c6 0 8 8 0 10H54z" fill="${PC.cyto}" stroke="${PC.wall}" stroke-width="4"/><ellipse cx="22" cy="32" rx="6" ry="5" fill="${PC.nuc}"/><path d="M20 46h28v22H20z" fill="${PC.vac}"/>`,
 ciliated:`<rect x="52" y="34" width="46" height="56" rx="6" fill="#FDECEC" stroke="#D88A8A" stroke-width="3"/><ellipse cx="80" cy="66" rx="6" ry="11" fill="${PC.nuc}"/>${[56,62,68,74,80,86,92].map((x,i)=>`<path d="M${x} 34q${i%2?4:-4} -14 ${i%2?-2:2} -28" fill="none" stroke="#C26A86" stroke-width="2" class="sc-cil"/>`).join('')}`,
 palisade:`<rect x="50" y="4" width="50" height="86" rx="8" fill="${PC.cyto}" stroke="${PC.wall}" stroke-width="4"/>${[14,28,42,56,70].map(y=>chloroSVG(62,y,6,5)+chloroSVG(88,y+6,6,5)).join('')}<ellipse cx="75" cy="80" rx="6" ry="5" fill="${PC.nuc}"/>`,
 neurone:`<circle cx="30" cy="47" r="14" fill="#FBE3C4" stroke="#C88A3A" stroke-width="3"/><circle cx="30" cy="47" r="5" fill="${PC.nuc}"/><path d="M44 47h86M130 47l12 -10M130 47l12 10M130 47l14 0M18 40l-12 -10M18 54l-12 10M24 34l-4 -14" stroke="#C88A3A" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 sperm:`<ellipse cx="40" cy="47" rx="16" ry="11" fill="#E9E3FF" stroke="#7B5FC0" stroke-width="3"/><rect x="54" y="43" width="14" height="8" rx="3" fill="${PC.mito}"/><path d="M68 47c12-10 20 10 32 0s20 10 32 0" fill="none" stroke="#7B5FC0" stroke-width="3" class="sc-tail"/>`}[k];
 return`<svg viewBox="0 0 150 94" width="${w}" height="${h}" class="sc-cellart" aria-hidden="true">${s}</svg>`}
/* ---- levels ---- */
const SCV=[
 {name:'Plant Cell Builder',topic:'1.1 Plant cells',style:'Label the cell',icon:'plant',c1:'#2E7D32',c2:'#9CCC65',
  story:'A new plant cell is being built in the Cell Lab, but every label has fallen off. Point, tap and name each part, then help Marcus fix his drawing.',
  rule:'A plant cell has a <b>cell wall</b>, <b>cell membrane</b>, <b>cytoplasm</b>, <b>nucleus</b>, <b>mitochondria</b>, a large <b>sap vacuole</b> and, in green parts, <b>chloroplasts</b>.',
  tags:{label:1,tap:1,job:2,drawing:2,compare:3,leafwhy:3}},
 {name:'Microscope Mission',topic:'1.2 Animal cells',style:'Focus the microscope',icon:'scope',c1:'#1565C0',c2:'#4FC3F7',
  story:'Zara has animal cells on her slide but can’t see them. Name the microscope parts, fix her mistakes and bring the cells into focus. Every right answer sharpens the view.',
  rule:'Light comes up from the <b>mirror</b>, through the slide on the <b>stage</b>, through an <b>objective lens</b> and the <b>eyepiece</b>. Start on <b>low power</b>, focus with the <b>coarse</b> knob, then sharpen with the <b>fine</b> knob.',
  tags:{'scope-label':1,'scope-job':1,'fix-view':2,order:2,'plant-only':3,magnify:3}},
 {name:'Specialist Squad',topic:'1.3 Specialised cells',style:'Match cells to jobs',icon:'squad',c1:'#AD1457',c2:'#FF8A65',
  story:'Meet the Specialist Squad: cells built for one special job. Name each agent, match it to its mission and explain how its shape helps.',
  rule:'A <b>specialised cell</b> has a special shape or special parts that help it do one job well. For example, a red blood cell has haemoglobin to carry oxygen.',
  tags:{'name-cell':1,'fill-rbc':1,'cell-job':2,adapt:2,'root-hair':3,'compare-cp':3}}];
const SCNAMES={label:'Naming cell parts',tap:'Finding cell parts',job:'What each part does',drawing:'Good scientific drawings',compare:'Comparing plant cells',leafwhy:'Leaf cells and chloroplasts',
 'scope-label':'Naming microscope parts','scope-job':'What microscope parts do','fix-view':'Fixing a microscope view',order:'Steps for using a microscope','plant-only':'Plant vs animal cells',magnify:'Magnification',
 'name-cell':'Naming specialised cells','fill-rbc':'Red blood cells','cell-job':'Jobs of specialised cells',adapt:'How cells are adapted','root-hair':'Root hair cells','compare-cp':'Ciliated vs palisade cells'};
function SCS(){if(!S.sci)S.sci={cleared:Array(3).fill(false),stars:Array(3).fill(0),best:Array(3).fill(0),learned:Array(3).fill(false),skills:{}};return S.sci}
const scOpen=i=>POW('unlock')||i===0||SCS().cleared[i-1];
function scMastery(lv){const sk=SCS().skills;const tags=Object.keys(SCV[lv].tags);let s=0;tags.forEach(t=>{const k=sk[t];if(!k||!k.length)return;s+=k.reduce((a,b)=>a+b,0)/k.length*Math.min(1,k.length/3)});return Math.round(100*s/tags.length)}
function scRecord(tag,ok){const sk=SCS().skills;(sk[tag]=sk[tag]||[]).push(ok?1:0);if(sk[tag].length>10)sk[tag].shift()}
const cap=s=>s[0].toUpperCase()+s.slice(1);
const opts4=(a,pool)=>R.shuffle([a,...R.shuffle(pool.filter(x=>x!==a)).slice(0,3)]);
/* ---- question generator ---- */
const DRAW_RULES=[['Draw label lines with a ruler',1],['Make each label line touch the part it labels',1],['Write the labels outside the drawing',1],['Write the labels so they read across the page',1],
 ['Draw with a sharp pencil',1],['Draw clear, single outlines',1],['Make the drawing big enough to show the details',1],['Keep the shapes and proportions correct',1],
 ['Shade or colour in the drawing',0],['Let label lines cross over each other',0],['Put arrowheads on the label lines',0],['Use sketchy, broken outlines',0],['Write labels inside the cell',0],['Draw it tiny in the corner of the page',0]];
const FIXES=[{s:'Zara sees only darkness when she looks down the eyepiece.',a:'Tilt the mirror so that light shines up through the slide',why:'No light is reaching the slide. The mirror has to reflect light up through it.'},
 {s:'Zara sees a blurry, fuzzy picture.',a:'Turn the focusing knobs until the image is sharp',why:'The image is out of focus. Use the coarse knob first, then the fine knob.'},
 {s:'Zara sees bright light but no cells at all.',a:'Move the slide so the cells are right over the hole in the stage',why:'The cells are not under the objective lens, so they are outside the view.'},
 {s:'Zara started with the high-power lens and can’t find anything.',a:'Switch to the low-power objective lens and find the cells first',why:'High power shows a tiny area. Low power shows more of the slide, so cells are easier to find.'},
 {s:'The cells are there, but they are see-through and very hard to make out.',a:'Add a stain, such as methylene blue, to the cells',why:'Animal cells are almost transparent. A stain colours the parts so you can see them.'},
 {s:'The cells look tiny, and Zara wants to see their nucleus more clearly.',a:'Change to a higher-power objective lens',why:'A higher-power objective lens gives a bigger magnification.'}];
const STEPS=['Put the slide on the stage, over the hole','Tilt the mirror until light shines up through the slide','Click the low-power objective lens into place','Turn the coarse focusing knob until cells appear','Turn the fine focusing knob to make the image sharp','Change to a higher-power lens to see more detail'];
function scGen(lv,tag){const Q=o=>Object.assign({lvl:lv,tag,sol:[],first:''},o);
 switch(tag){
 case'label':{const p=R.pick(PKEYS);return Q({kind:'choice',scene:plantCellSVG({arrow:p}),prompt:'Which part of the plant cell is the arrow pointing to?',options:R.shuffle(PKEYS.map(k=>PARTS[k].n)),answer:PARTS[p].n,answerText:PARTS[p].n,
  sol:[`The arrow points to the ${PARTS[p].n}.`,`The ${PARTS[p].n} ${PARTS[p].job}.`],first:'Follow the label line to the dot, then look at the shape and colour of that part.'})}
 case'tap':{const p=R.pick(['wall','cytoplasm','vacuole','nucleus','chloroplast','mito']);return Q({kind:'tap',scene:plantCellSVG({tap:true}),prompt:`Tap the <b>${PARTS[p].n}</b> on the diagram.`,answer:p,answerText:PARTS[p].n,
  sol:[`The ${PARTS[p].n} ${PARTS[p].job}.`,{wall:'It is the thick outer layer around the whole cell.',cytoplasm:'It is the jelly that fills the cell around the other parts.',vacuole:'It is the large, pale space in the middle of the cell.',nucleus:'It is the dark purple oval.',chloroplast:'They are the green ovals with stripes.',mito:'They are the small orange shapes with a wiggly line inside.'}[p]],first:'Think about where this part sits in the cell, and what it looks like.'})}
 case'job':{const p=R.pick(PKEYS);const rev=Math.random()<.5;
  if(rev)return Q({kind:'choice',scene:plantCellSVG({arrow:p}),prompt:`What does the part labelled <b>?</b> do?`,options:R.shuffle([PARTS[p].job,...R.shuffle(PKEYS.filter(k=>k!==p)).slice(0,3).map(k=>PARTS[k].job)]).map(cap),answer:cap(PARTS[p].job),answerText:cap(PARTS[p].job),
   sol:[`The arrow points to the ${PARTS[p].n}.`,`The ${PARTS[p].n} ${PARTS[p].job}.`]});
  return Q({kind:'choice',scene:plantCellSVG({}),prompt:`Which part of a plant cell ${PARTS[p].job}?`,options:opts4(PARTS[p].n,PKEYS.map(k=>PARTS[k].n)),answer:PARTS[p].n,answerText:PARTS[p].n,sol:[`The ${PARTS[p].n} ${PARTS[p].job}.`]})}
 case'drawing':{const [t,good]=R.pick(DRAW_RULES);return Q({kind:'swipe',scene:`<div class="sc-note"><b>Marcus’s drawing checklist</b><p>Is this a good way to draw and label a plant cell?</p></div>`,card:t,prompt:`Is this good practice for a scientific drawing?<br><b>“${t}”</b>`,bins:['Fix it','Good drawing'],answer:good?'Good drawing':'Fix it',answerText:good?'Good drawing':'Fix it',
  sol:[good?`Yes: “${t}” is part of a clear, simple diagram.`:`No: “${t}” makes a scientific drawing less clear.`,'Scientific drawings use clear pencil lines, no shading, and ruled label lines that touch the part and do not cross.']})}
 case'compare':{const leafA=Math.random()<.5;const L=leafA?'A':'B',O=leafA?'B':'A';const st=R.pick([
   {q:'Which statement is a correct difference between the two cells?',a:`Cell ${L} has many chloroplasts but Cell ${O} has none`,w:[`Cell ${O} has a cell wall but Cell ${L} does not`,`Cell ${L} has no nucleus but Cell ${O} has one`,`Cell ${O} has chloroplasts but Cell ${L} has none`]},
   {q:'Which statement is a correct difference between the two cells?',a:`Cell ${L} is long and box-shaped but Cell ${O} is shorter and has six sides`,w:[`Cell ${L} has no cell membrane but Cell ${O} has one`,`Cell ${O} has no vacuole but Cell ${L} has one`,`Cell ${O} is an animal cell but Cell ${L} is a plant cell`]},
   {q:'Which part do BOTH cells have?',a:'a cell wall',w:['chloroplasts in Cell '+O,'a cell wall in Cell '+L+' only','no nucleus']}]);
  return Q({kind:'choice',scene:`<div class="sc-pair">${leafA?miniPlant('leaf','A')+miniPlant('root','B'):miniPlant('root','A')+miniPlant('leaf','B')}</div>`,prompt:st.q,options:R.shuffle([st.a,...st.w]).map(cap),answer:cap(st.a),answerText:cap(st.a),
  sol:[`Cell ${L} is packed with green chloroplasts; Cell ${O} has none.`,'Both are plant cells, so both have a cell wall, a cell membrane, cytoplasm, a nucleus and a vacuole.'],first:'Look carefully at what is inside each cell, and at their shapes.'})}
 case'leafwhy':{const leafA=Math.random()<.5;const L=leafA?'A':'B',O=leafA?'B':'A';
  return Q({kind:'choice',scene:`<div class="sc-pair">${leafA?miniPlant('leaf','A')+miniPlant('root','B'):miniPlant('root','A')+miniPlant('leaf','B')}</div>`,prompt:'Which cell comes from a leaf, and why?',
  options:R.shuffle([`Cell ${L}: it has chloroplasts to absorb light for photosynthesis`,`Cell ${O}: it has no chloroplasts, so it can take in more light`,`Cell ${L}: it is the only one with a cell wall`,`Cell ${O}: it is smaller, so it fits in a leaf`]),answer:`Cell ${L}: it has chloroplasts to absorb light for photosynthesis`,answerText:`Cell ${L}: it has chloroplasts to absorb light for photosynthesis`,
  sol:['Leaves make food by photosynthesis, which needs light.',`Cell ${L} has lots of chloroplasts to absorb that light. Cell ${O} has none, so it probably comes from a part with no light, such as a root.`],first:'Which cell part is needed for photosynthesis?'})}
 case'scope-label':{const p=R.pick(SKEYS);return Q({kind:'choice',scene:scopeSVG({arrow:p}),prompt:'Which part of the microscope is the arrow pointing to?',options:opts4(SCOPE[p].n,SKEYS.map(k=>SCOPE[k].n)),answer:SCOPE[p].n,answerText:SCOPE[p].n,
  sol:[`The arrow points to the ${SCOPE[p].n}.`,`It is ${SCOPE[p].job}.`],first:'Follow the label line to the dot.'})}
 case'scope-job':{const p=R.pick(SKEYS);return Q({kind:'choice',scene:scopeSVG({}),prompt:`Which part of the microscope is ${SCOPE[p].job}?`,options:opts4(SCOPE[p].n,SKEYS.map(k=>SCOPE[k].n)),answer:SCOPE[p].n,answerText:SCOPE[p].n,sol:[`The ${SCOPE[p].n} is ${SCOPE[p].job}.`]})}
 case'fix-view':{const f=R.pick(FIXES);return Q({kind:'choice',scene:scopeView(20,/darkness/.test(f.s)),prompt:`${f.s} What should she do?`,options:R.shuffle([f.a,...R.shuffle(FIXES.filter(x=>x!==f).map(x=>x.a)).slice(0,3)]),answer:f.a,answerText:f.a,sol:[f.why]})}
 case'order':{const st=R.int(0,2);const run=STEPS.slice(st,st+4);return Q({kind:'order',scene:scopeSVG({}),prompt:'Put these steps for using a microscope in the right order. Tap them from first to last.',items:R.shuffle(run.slice()),answer:run.join(' → '),answerText:run.join(' → '),
  sol:['The full method is:',...STEPS.map((s,i)=>`${i+1}. ${s}`)],first:'You need light and the slide in place before you can focus.'})}
 case'plant-only':{const p=R.pick(PKEYS);const po=PLANT_ONLY.includes(p);const nm=p==='vacuole'?'a large, permanent sap vacuole':p==='mito'?'mitochondria':PARTS[p].n;
  return Q({kind:'swipe',scene:`<div class="sc-pair">${animalCellSVG()}${plantCellSVG({})}</div>`,card:cap(nm),prompt:`Where would you find <b>${nm}</b>?`,bins:['Plant cells only','Plant AND animal cells'],answer:po?'Plant cells only':'Plant AND animal cells',answerText:po?'Plant cells only':'Plant AND animal cells',
  sol:['Both plant and animal cells have a cell membrane, cytoplasm, a nucleus and mitochondria.','Only plant cells have a cell wall, chloroplasts and a large, permanent sap vacuole.']})}
 case'magnify':{const e=R.pick([5,10,15]),ob=R.pick([4,10,40]),t=e*ob;const rev=Math.random()<.4;
  if(rev)return Q({kind:'num',scene:scopeSVG({arrow:'high'}),prompt:`The total magnification is <b>×${t}</b>. The eyepiece lens is <b>×${e}</b>. What is the magnification of the objective lens? Type the number.`,answer:String(ob),answerText:'×'+ob,
   sol:['Total magnification = eyepiece × objective.',`So objective = ${t} ÷ ${e} = ${ob}.`],first:'Total = eyepiece × objective, so divide.'});
  return Q({kind:'num',scene:scopeSVG({arrow:'eyepiece'}),prompt:`The eyepiece lens magnifies <b>×${e}</b> and the objective lens magnifies <b>×${ob}</b>. What is the total magnification? Type the number.`,answer:String(t),answerText:'×'+t,
  sol:['Total magnification = eyepiece × objective.',`${e} × ${ob} = ${t}, so the cells look ${t} times bigger.`],first:'Multiply the two lens numbers.'})}
 case'name-cell':{const c=R.pick(CKEYS);return Q({kind:'choice',scene:`<div class="sc-cellcard">${cellArt(c,220)}</div>`,prompt:'Name this specialised cell.',options:opts4(CELLS[c].n,CKEYS.map(k=>CELLS[k].n)).map(cap),answer:cap(CELLS[c].n),answerText:cap(CELLS[c].n),
  sol:[`This is a ${CELLS[c].n}. It ${CELLS[c].job}.`,`Clue: it ${CELLS[c].adapt[0]}.`],first:'Look for a special feature: hairs, a tail, a long extension, lots of chloroplasts?'})}
 case'fill-rbc':{const it=R.pick([{s:'Red blood cells contain a substance called ____.',a:'haemoglobin'},{s:'Haemoglobin helps red blood cells to carry ____ around the body.',a:'oxygen'},{s:'Red blood cells are smaller than most cells. This helps them to squeeze through tiny blood vessels called ____.',a:'capillaries'}]);
  return Q({kind:'choice',scene:`<div class="sc-cellcard">${cellArt('rbc',200)}</div>`,prompt:`Complete the sentence:<br><b>${it.s.replace('____','<span class="sc-blank">?</span>')}</b>`,options:R.shuffle(['capillaries','cytoplasm','food','haemoglobin','oxygen']),answer:it.a,answerText:it.a,
  sol:[it.s.replace('____',it.a),'Red blood cells contain haemoglobin, which carries oxygen. They are small, so they fit through capillaries.']})}
 case'cell-job':{const c=R.pick(CKEYS);const rev=Math.random()<.5;
  if(rev)return Q({kind:'choice',scene:`<div class="sc-cellcard">${cellArt(c,200)}<b>${cap(CELLS[c].n)}</b></div>`,prompt:`What is the job of a ${CELLS[c].n}?`,options:R.shuffle([CELLS[c].job,...R.shuffle(CKEYS.filter(k=>k!==c)).slice(0,3).map(k=>CELLS[k].job)]).map(cap),answer:cap(CELLS[c].job),answerText:cap(CELLS[c].job),sol:[`A ${CELLS[c].n} ${CELLS[c].job}.`,`It is found ${CELLS[c].where}.`]});
  return Q({kind:'choice',scene:`<div class="sc-note"><b>Mission</b><p>${cap(CELLS[c].job)}.</p></div>`,prompt:`Which cell has this job: <b>${CELLS[c].job}</b>?`,options:opts4(CELLS[c].n,CKEYS.map(k=>CELLS[k].n)).map(cap),answer:cap(CELLS[c].n),answerText:cap(CELLS[c].n),sol:[`A ${CELLS[c].n} ${CELLS[c].job}.`]})}
 case'adapt':{const c=R.pick(CKEYS);const f=R.pick(CELLS[c].adapt);return Q({kind:'choice',scene:`<div class="sc-note"><b>Special feature</b><p>This cell ${f}.</p></div>`,prompt:`Which cell is this? It <b>${f}</b>.`,options:opts4(CELLS[c].n,CKEYS.map(k=>CELLS[k].n)).map(cap),answer:cap(CELLS[c].n),answerText:cap(CELLS[c].n),
  sol:[`A ${CELLS[c].n} ${f}.`,`This helps it with its job: it ${CELLS[c].job}.`]})}
 case'root-hair':{const it=R.pick([
   {q:'How can you tell that a root hair cell is a plant cell and not an animal cell?',a:'It has a cell wall and a large sap vacuole',w:['It has a nucleus','It has a cell membrane','It has lots of chloroplasts']},
   {q:'Why does a root hair cell have no chloroplasts?',a:'It is underground, so there is no light for photosynthesis',w:['It is too small to hold chloroplasts','It is an animal cell','Its cell wall blocks them']},
   {q:'How is a root hair cell adapted to absorb water?',a:'Its long, thin extension gives a large surface area',w:['It has many chloroplasts','It has a tail to swim through soil','It has no nucleus, so there is more space for water']},
   {q:'What is the job of a root hair cell?',a:'To absorb water and mineral salts from the soil',w:['To make food by photosynthesis','To carry oxygen to the leaves','To hold the plant upright in the wind']}]);
  return Q({kind:'choice',scene:`<div class="sc-cellcard">${cellArt('roothair',230)}<b>Root hair cell</b></div>`,prompt:it.q,options:R.shuffle([it.a,...it.w]),answer:it.a,answerText:it.a,
  sol:['A root hair cell absorbs water and mineral salts from the soil.','Its long extension gives a large surface area. It has a cell wall and vacuole like other plant cells, but no chloroplasts because roots get no light.']})}
 case'compare-cp':{const it=R.pick([['has a cell wall','Palisade cell'],['has cilia (tiny hairs)','Ciliated cell'],['has chloroplasts','Palisade cell'],['has a large sap vacuole','Palisade cell'],['lines the airways to the lungs','Ciliated cell'],['is found near the top of a leaf','Palisade cell'],['is an animal cell','Ciliated cell'],['moves mucus along','Ciliated cell'],['makes food by photosynthesis','Palisade cell']]);
  return Q({kind:'swipe',scene:`<div class="sc-pair"><figure class="sc-mini">${cellArt('ciliated',150)}<figcaption>Ciliated cell</figcaption></figure><figure class="sc-mini">${cellArt('palisade',150)}<figcaption>Palisade cell</figcaption></figure></div>`,card:cap(it[0]),prompt:`Which cell <b>${it[0]}</b>?`,bins:['Ciliated cell','Palisade cell'],answer:it[1],answerText:it[1],
  sol:['A ciliated cell is an animal cell: no cell wall, no chloroplasts, and cilia to sweep mucus out of the airways.','A palisade cell is a plant cell: it has a cell wall, a sap vacuole and lots of chloroplasts for photosynthesis.']})}
 }}
function scTags(lv,tier){return Object.entries(SCV[lv].tags).filter(([k,t])=>t===tier).map(([k])=>k)}
function scQ(lv,tag,seen){if(!tag){tag=R.pick(scTags(lv,R.int(1,3)))}let q,g=0;do{q=scGen(lv,tag);g++}while(seen&&seen.has(q.prompt+q.answer)&&g<12);if(seen)seen.add(q.prompt+q.answer);return q}
function scCheck(q,v){if(q.kind==='num'){const t=String(v).replace(/[^\d.]/g,'');if(t==='')return{parse:true,why:'Type a number.'};return{ok:Number(t)===Number(q.answer)}}return{ok:String(v)===String(q.answer)}}
/* ---- banners ---- */
function scBanner(lv){const L=SCV[lv];const art={
 plant:`<g transform="translate(45 10) scale(.33)">${plantCellSVG({}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`,
 scope:`<g transform="translate(58 4) scale(.3)">${scopeSVG({}).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g><circle cx="128" cy="48" r="22" fill="#FFF8E6" stroke="#fff" stroke-width="3"/><circle cx="122" cy="44" r="6" fill="#F7D2DD"/><circle cx="134" cy="54" r="6" fill="#F7D2DD"/>`,
 squad:`<g transform="translate(8 26) scale(.45)">${cellArt('rbc').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g><g transform="translate(60 22) scale(.45)">${cellArt('ciliated').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g><g transform="translate(108 30) scale(.42)">${cellArt('sperm').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`}[L.icon];
 return`<svg viewBox="0 0 170 96" class="xlart" aria-hidden="true">${art}</svg>`}
/* restored from the live build */
function viewSci(e) {
  const t = SCS();
  ((CURGAME = "sci"),
    (e.innerHTML = `<div class="mapwrap"><div><p class="eyebrow">Grade 7 \xb7 Science \xb7 Unit 1 Cells</p><h2 style="font-size:28px;margin:4px 0 6px">Cell Lab</h2><p class="muted" style="margin:0 0 14px">Plant cells, the microscope and specialised cells, built from the Workbook 7 exercises. ${t.cleared.filter(Boolean).length} of 3 levels cleared. Follow the road: each level is a different game. Tap any open level to play or replay it.</p>\n ${roadMap(
      SCV.map((e, s) => ({
        name: e.name,
        sub: "Topic " + e.topic,
        c1: e.c1,
        c2: e.c2,
        ok: scOpen(s),
        cleared: !!t.cleared[s],
        stars: t.stars[s] || 0,
      })),
      { label: "Cell Expert", done: t.cleared.every(Boolean) },
      "Cell Lab level map",
    )}</div>\n <aside class="side"><div class="panel"><h3>How Cell Lab works</h3><p class="muted" style="margin:0">Each level is a 10-question mission. Every right answer adds 10% progress, and the super question that pops up once per level adds 15%. Reach 80% to clear it and open the next level; 100% earns 3 stars.</p></div>\n <div class="panel"><h3>Your skills</h3><div class="prog">${SCV.map((e, t) => `<div class="prow" style="padding:8px 10px"><div><b>${t + 1}. ${e.name}</b></div><div><b>${scMastery(t)}%</b></div><div class="pbar"><i style="width:${scMastery(t)}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`).join("")}</div></div></aside></div>`),
    roadWire(
      e,
      (e) => {
        if (!scOpen(e)) return gtoast("Clear Level " + e + " to open this one");
        scIntro(e);
      },
      () =>
        t.cleared.every(Boolean) ? "You cleared every Cell Lab level!" : "Clear all 3 levels to become a Cell Expert",
    ));
}
function scIntro(lv){const L=SCV[lv],ss=SCS();const ex=scQ(lv,Object.keys(L.tags)[0]);
 const m=modal(`<div style="--w1:${L.c1};--w2:${L.c2}"><div class="row" style="align-items:center">${scBanner(lv)}<div><p class="eyebrow">Level ${lv+1} · Topic ${L.topic}</p><h2>${L.name}</h2></div></div><p style="font-size:17px">${L.story}</p>
 <div class="lesson-rule">${L.rule}</div><div class="wexample" style="margin-top:10px"><p class="eyebrow">Worked example</p><div class="sc-ex">${ex.scene}</div><p>${ex.prompt}</p><ol class="steps">${ex.sol.map(s=>`<li>${s}</li>`).join('')}</ol><p style="margin:4px 0 0"><b>Answer:</b> ${esc(ex.answerText)}</p></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="scGo">Start the mission</button><button class="btn ghost" id="scX">Not now</button></div></div>`,'esc');
 $('#scGo').onclick=()=>{ss.learned[lv]=true;save();scStart(lv)};$('#scX').onclick=closeModal}
/* ---- mission ---- */
let SRUN=null;
/* restored from the live build */
function scLeave() {
  (SRUN && clockStop(SRUN), (SRUN = null), (document.onkeydown = null));
}
function scStart(lv){closeModal();hideFB();if(RUN)leaveStage();if(XRUN)xlLeave();scLeave();VIEW='sciplay';CURGAME='sci';renderTop();const L=SCV[lv];
 SRUN={lv,pts:0,sqOk:false,superAt:R.int(3,8),superDone:false,tStart:0,tick:0,qn:0,total:10,correct:0,hearts:3,streak:0,seen:new Set(),queue:[],miss:{},cur:null,hint:0,usedHint:false,res:[]};NET.track('start',{game:'sci',stage:lv});
 $('#main').innerHTML=`<section class="play xlplay scplay" style="--w1:${L.c1};--w2:${L.c2}"><div class="hud"><button class="iconbtn" id="scBack" aria-label="Back to Cell Lab">${IC.back}</button><div class="hud-title"><span class="eyebrow">Cell Lab · Level ${lv+1} · ${L.style}</span><b>${L.name}</b></div>
 <div class="hearts" id="scHearts"></div><div class="xldots" id="scDots"></div><span class="chip" id="scScore" title="Level progress (80% clears it)">0%</span><span class="chip tmr${S.settings.calm?' calm':''}" title="Level time">${IC.clock}<b id="stmr">0:00</b></span><span class="flame" id="scFlame"></span>${POW('autowin')?'<button class="btn gold" id="scWin" style="min-height:38px;padding:6px 12px;font-size:13px">Clear level</button>':''}</div>
 <div class="stagewrap"><div class="xlscene" id="scScene"></div><div class="toast" id="toast" role="status"></div></div>
 <div class="qcard"><div class="qhead"><span class="ask" id="scAsk"></span><span class="chip review" id="scRev" hidden>Quick review</span></div><div class="qtext xlprompt" id="scPrompt"></div>
 <div class="reveal" id="scReveal" hidden></div><div class="ctl" id="scCtl"></div>
 <div class="hints"><button data-h="1">${IC.bulb}Hint 1 · 5${IC.coin}</button><button data-h="2">Hint 2 · 10${IC.coin}</button><button data-h="3">Hint 3 · 15${IC.coin}</button></div><div class="hintbox" id="scHint" hidden></div></div></section>`;
 $('#scBack').onclick=()=>go('sci');$$('.hints button').forEach(b=>b.onclick=()=>scHint(+b.dataset.h));const wb=$('#scWin');if(wb)wb.onclick=()=>{SRUN.correct=10;SRUN.pts=100;SRUN.qn=10;scEnd()};
 AU.music(3+lv);clockStart(SRUN,'stmr');scNext()}
function scHud(){if(!SRUN)return;$('#scHearts').innerHTML=[0,1,2].map(i=>`<span class="${i<SRUN.hearts?'':'lost'}">${IC.heart}</span>`).join('');
 $('#scDots').innerHTML=Array.from({length:10},(_,i)=>`<i class="${SRUN.res[i]===undefined?'':SRUN.res[i]?'y':'n'}"></i>`).join('');$('#scScore').textContent=SRUN.pts+'%';
 $('#scFlame').innerHTML=SRUN.streak>1?`${IC.flame}<span>${SRUN.streak}</span>`:'';$$('.hints button').forEach(b=>b.disabled=+b.dataset.h!==SRUN.hint+1)}
/* restored from the live build */
function scNext() {
  if (!SRUN) return;
  if ((hideFB(), SRUN.qn >= SRUN.total)) return scEnd();
  if (!SRUN.superDone && SRUN.qn + 1 >= SRUN.superAt)
    return (
      (SRUN.superDone = !0),
      superAsk(
        "sci",
        SRUN.lv,
        () => {
          SRUN && scNext();
        },
        () =>
          SRUN
            ? ((SRUN.pts = Math.min(100, SRUN.pts + 15)), SRUN.streak++, (SRUN.sqOk = !0), scHud(), "+15% progress")
            : "",
      )
    );
  if (doorDue(SRUN, SRUN.pts))
    return doorAsk(
      "sci",
      SRUN.lv,
      () => {
        SRUN && scNext();
      },
      () => {
        if (!SRUN) return "";
        const e = Math.min(30, 100 - SRUN.pts);
        return ((SRUN.pts = Math.min(100, SRUN.pts + 30)), SRUN.streak++, scHud(), "+" + e + "% progress");
      },
    );
  (SRUN.qn++, (SRUN.hint = 0), ($("#scHint").hidden = !0));
  const e = SRUN.lv;
  let t,
    s = !1;
  const a = SRUN.queue.findIndex((e) => e.due <= SRUN.qn);
  if (a >= 0) t = scQ(e, SRUN.queue.splice(a, 1)[0].tag, SRUN.seen);
  else if (e >= 1 && Math.random() < 0.15) ((t = scQ(R.int(0, e - 1), null, SRUN.seen)), (s = !0));
  else {
    const s = SRUN.qn <= 3 ? 1 : SRUN.qn <= 7 ? 2 : 3;
    t = scQ(e, R.pick(scTags(e, s)), SRUN.seen);
  }
  ((SRUN.cur = { q: t, review: s, done: !1, t0: performance.now() }),
    ($("#scAsk").textContent = `Question ${SRUN.qn} of 10`),
    ($("#scRev").hidden = !s),
    s && ($("#scRev").textContent = "Quick review \xb7 " + SCV[t.lvl].name),
    ($("#scPrompt").innerHTML = t.prompt));
  const n = $("#scReveal");
  ((n.hidden = !POW("reveal")),
    POW("reveal") && (n.innerHTML = "Answer (admin reveal): <b>" + esc(t.answerText) + "</b>"),
    scScene(t),
    scControls(t),
    scHud());
}
/* restored from the live build */
function scScene(e) {
  const t = $("#scScene"),
    s = (SCV[SRUN.lv], 1 === SRUN.lv && /sc-scope/.test(e.scene) ? scopeView(SRUN.pts) : "");
  ((t.innerHTML = `<div class="xlbanner">${scBanner(e.lvl)}<div><b>${SCV[e.lvl].name}</b><span>Topic ${SCV[e.lvl].topic}</span></div></div><div class="sc-body">${e.scene}${s}</div>`),
    "tap" === e.kind &&
      $$("[data-part]", t).forEach((e) => {
        ((e.style.cursor = "pointer"),
          e.addEventListener("click", (s) => {
            if ((s.stopPropagation(), !SRUN || !SRUN.cur || SRUN.cur.done)) return;
            const a = e.dataset.part;
            ($$(".sc-hit", t).forEach((e) => e.classList.remove("sc-hit")),
              e.classList.add("sc-hit"),
              scSubmit(a, PARTS[a] ? PARTS[a].n : a));
          }));
      }));
}
/* restored from the live build */
function scControls(e) {
  const t = $("#scCtl");
  if (((t.innerHTML = ""), "choice" === e.kind)) {
    const s = e.options.some((e) => e.length > 24);
    return (
      (t.innerHTML = `<div class="choices sc-choices${s ? " sc-long" : ""}"></div>`),
      void e.options.forEach((e) => {
        const s = H(`<button class="btn choice">${esc(e)}</button>`);
        ((s.onclick = () => scSubmit(e)), $(".choices", t).append(s));
      })
    );
  }
  if ("tap" === e.kind)
    return void (t.innerHTML = '<div class="muted" style="font-weight:700">Tap the part on the diagram above.</div>');
  if ("swipe" === e.kind)
    return (
      (t.innerHTML = `<div class="xlcard sc-card" id="scCard"><b>${esc(e.card)}</b></div><div class="xlbins" style="margin-top:8px">${e.bins.map((e, t) => `<button class="btn xlbin ${t ? "r" : "l"}" data-b="${t}">${t ? "" : "\u2190 "}${esc(e)}${t ? " \u2192" : ""}</button>`).join("")}</div>`),
      $$(".xlbin", t).forEach(
        (t) =>
          (t.onclick = () => {
            const s = +t.dataset.b,
              a = $("#scCard");
            (a && a.classList.add(s ? "goR" : "goL"), setTimeout(() => scSubmit(e.bins[s]), 220));
          }),
      ),
      (SRUN.key = (s) => {
        SRUN &&
          SRUN.cur &&
          !SRUN.cur.done &&
          SRUN.cur.q === e &&
          (("ArrowLeft" !== s.key && "ArrowRight" !== s.key) ||
            (s.preventDefault(), $$(".xlbin", t)["ArrowLeft" === s.key ? 0 : 1].click()));
      }),
      void (document.onkeydown = SRUN.key)
    );
  if ("order" === e.kind) {
    const s = [];
    t.innerHTML = `<div class="xlbar sc-order" id="scBar" aria-live="polite"><span class="ph">Tap the steps in order</span></div><div class="sc-steps">${e.items.map((e, t) => `<button class="btn ghost sc-step" data-i="${t}">${esc(e)}</button>`).join("")}</div><div class="row"><button class="btn ghost" id="scClr">Clear</button><button class="btn w" id="scChk">Check order</button></div>`;
    const a = $("#scBar", t),
      n = () => {
        ((a.innerHTML = s.length
          ? s.map((t, s) => `<span class="sc-chip"><b>${s + 1}</b>${esc(e.items[t])}</span>`).join("")
          : '<span class="ph">Tap the steps in order</span>'),
          $$(".sc-step", t).forEach((e) => (e.disabled = s.includes(+e.dataset.i))));
      };
    return (
      $$(".sc-step", t).forEach(
        (e) =>
          (e.onclick = () => {
            (s.push(+e.dataset.i), sfx("click"), n());
          }),
      ),
      ($("#scClr", t).onclick = () => {
        ((s.length = 0), n());
      }),
      void ($("#scChk", t).onclick = () => {
        if (s.length < e.items.length) return toast("Put all " + e.items.length + " steps in order first");
        scSubmit(s.map((t) => e.items[t]).join(" \u2192 "));
      })
    );
  }
  const s = H(
      '<form class="ans-form" autocomplete="off"><label for="scIn">Answer</label><input class="ans-in" id="scIn" inputmode="decimal" spellcheck="false" placeholder="e.g. 40"><button class="btn w">Check</button></form>',
    ),
    a = H('<div class="msg" role="status"></div>');
  ((s.onsubmit = (t) => {
    t.preventDefault();
    const n = $("#scIn", s).value,
      i = scCheck(e, n);
    i.parse ? (a.textContent = i.why) : scSubmit(n);
  }),
    t.append(s, a),
    setTimeout(() => {
      matchMedia("(pointer:coarse)").matches || $("#scIn", s).focus();
    }, 30));
}
function scSubmit(v,shown){if(!SRUN)return;const c=SRUN.cur;if(!c||c.done)return;const q=c.q;const r=scCheck(q,v);if(r.parse)return;c.done=true;const ok=r.ok;document.onkeydown=null;
 scRecord(q.tag,ok);S.stats.answered++;if(ok)S.stats.correct++;NET.track('answer',{game:'sci',stage:q.lvl,tag:q.tag,ok,ms:Math.round(performance.now()-c.t0),review:!!c.review,hint:SRUN.hint});
 $$('.sc-choices .btn',$('#scCtl')).forEach(b=>{b.disabled=true;if(b.textContent===q.answer)b.classList.add('sc-right');else if(b.textContent===v)b.classList.add('sc-wrong')});
 SRUN.res.push(ok);if(ok){SRUN.correct++;SRUN.pts=Math.min(100,SRUN.pts+10);SRUN.streak++;S.coins+=3+(SRUN.streak>=3?1:0);addXP(10);sfx('good');sfx('coin');
  if(SRUN.streak>S.stats.bestStreak)S.stats.bestStreak=SRUN.streak;burstEl($('#scPrompt'),20,[SCV[SRUN.lv].c1,SCV[SRUN.lv].c2,'#fff']);toast(R.pick(['Correct!','Cell-ebrate!','Spot on!','Great science!','Exactly right!']));
  const sc=$('#scScene');sc.classList.add('xlwin');setTimeout(()=>sc.classList.remove('xlwin'),600);const vw=$('.sc-view',sc);if(vw)vw.outerHTML=scopeView(SRUN.pts);save();updTop();scHud();setTimeout(scNext,1300)}
 else{SRUN.streak=0;addXP(3);if(!POW('hearts'))SRUN.hearts=Math.max(0,SRUN.hearts-1);sfx('bad');const s=$('#scScene');s.classList.remove('shake');void s.offsetWidth;s.classList.add('shake');
  SRUN.miss[q.tag]=(SRUN.miss[q.tag]||0)+1;SRUN.queue.push({tag:q.tag,due:SRUN.qn+R.int(1,2)});save();scHud();scFeedback(q,shown||v,()=>{if(SRUN&&SRUN.hearts<=0)return scTraining();scNext()})}}
function scFeedback(q,given,cb){hideFB();const sh=H(`<div class="sheet" id="fbSheet"><div role="dialog" aria-label="Feedback"><h3>Not quite, here is why</h3>
 ${given!==undefined&&given!==''?`<p style="margin:4px 0" class="muted">You answered: <b>${esc(given)}</b></p>`:''}<p style="margin:4px 0;font-size:18px">Correct answer: <b>${esc(q.answerText)}</b></p><ol class="steps">${q.sol.map((s,i)=>`<li style="animation-delay:${i*.12}s">${s}</li>`).join('')}</ol>
 <p class="muted" style="margin:4px 0 10px">A similar question is coming up soon so you can try again.</p><button class="btn w" id="fbNext">Next question</button></div></div>`);
 const L=SCV[SRUN?SRUN.lv:0];sh.style.cssText=`--w1:${L.c1};--w2:${L.c2}`;document.body.append(sh);const b=$('#fbNext');b.focus();b.onclick=()=>{hideFB();cb()}}
function scHint(h){if(!SRUN||!SRUN.cur||SRUN.cur.done||h!==SRUN.hint+1)return;const cost=[0,5,10,15][h];if(!spend(cost))return toast('Not enough coins yet. Answer questions to earn more!');updTop();
 SRUN.hint=h;SRUN.usedHint=true;sfx('click');const q=SRUN.cur.q,hb=$('#scHint');hb.hidden=false;
 if(h===1)hb.innerHTML=`<b>Key idea:</b> ${SCV[q.lvl].rule}`;if(h===2)hb.innerHTML+=`<br><b>Tip:</b> ${q.first||q.sol[0]}`;
 if(h===3){const s=scQ(q.lvl,q.tag);hb.innerHTML+=`<br><b>A similar one, answered:</b> ${s.prompt}<br><b>Answer:</b> ${esc(s.answerText)}<ol>${s.sol.map(x=>`<li>${x}</li>`).join('')}</ol>`}scHud();save()}
function scTraining(){const lv=SRUN.lv,L=SCV[lv];NET.track('training',{game:'sci',stage:lv});const ex=scQ(lv);
 const m=modal(`<div style="--w1:${L.c1};--w2:${L.c2}"><p class="eyebrow">Out of hearts? No problem.</p><h2>Training Room</h2><p>Here is the key idea again with an example. Then you're straight back in with fresh hearts.</p>
 <div class="lesson-rule">${L.rule}</div><div class="wexample" style="margin-top:10px"><div class="sc-ex">${ex.scene}</div><p>${ex.prompt}</p><ol class="steps">${ex.sol.map(s=>`<li>${s}</li>`).join('')}</ol><p style="margin:4px 0 0"><b>Answer:</b> ${esc(ex.answerText)}</p></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="trGo">Back to the mission</button></div></div>`);$('#trGo').onclick=()=>{closeModal();SRUN.hearts=3;badge('bounce');scHud();scNext()}}
function scEnd(){const lv=SRUN.lv,L=SCV[lv],ss=SCS();const n=SRUN.correct,p=SRUN.pts,sqk=SRUN.sqOk,pass=p>=80;const ms=clockStop(SRUN);const tr=pass?bestTime('s'+lv,ms):{prev:(S.times||{})['s'+lv],nb:false};const st=p>=100?3:p>=90?2:pass?1:0;const first=pass&&!ss.cleared[lv];
 ss.best[lv]=Math.max(ss.best[lv],Math.min(10,Math.floor(p/10)));if(pass){ss.cleared[lv]=true;ss.stars[lv]=Math.max(ss.stars[lv],st);S.coins+=first?30:10;addXP(first?100:30);if(st===3)badge('perfect');NET.track('clear',{game:'sci',stage:lv,ms,data:{stars:st,acc:p}})}
 save();scLeave();sfx(pass?'crystal':'level');if(pass)setTimeout(()=>FX.burst(innerWidth/2,innerHeight/2.4,120,[L.c1,L.c2,'#FFC531','#fff']),200);
 modal(`<div style="--w1:${L.c1};--w2:${L.c2};text-align:center"><p class="eyebrow">Level ${lv+1} · ${L.name}</p><h2>${pass?'Level cleared!':'So close!'}</h2>${scBanner(lv)}
 <p style="font-size:20px;margin:6px 0"><b>${p}%</b> progress</p><p class="muted" style="margin:0 0 6px">${n} of 10 questions right${sqk?' + the super question':''}</p>${pass?timeLine(ms,tr):`<p class="timeline">${IC.clock}<span>Time <b>${fmtT(ms)}</b></span></p>`}<div class="stars">${[0,1,2].map(i=>IC.star.replace('<svg',`<svg class="${i<st?'':'off'}"`)).join('')}</div>
 <p>${pass?(first?'+30 coins · +100 XP. '+(lv<2?'Level '+(lv+2)+' is now open!':'You finished Cell Lab!'):'+10 coins · +30 XP for clearing it again.'):'You need 80% to clear this level. Each right answer is +10% and the super question is +15%. Have another go: the questions change every time.'}</p>
 <div class="row" style="justify-content:center"><button class="btn w" id="seMap">Back to Cell Lab</button>${pass&&lv<2?`<button class="btn" id="seNext">Next level</button>`:`<button class="btn ghost" id="seAgain">Play again</button>`}</div></div>`);
 $('#seMap').onclick=()=>go('sci');const nx=$('#seNext');if(nx)nx.onclick=()=>scIntro(lv+1);const ag=$('#seAgain');if(ag)ag.onclick=()=>scStart(lv)}
