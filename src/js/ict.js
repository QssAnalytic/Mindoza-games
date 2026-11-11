/* restored from the live build */
const XL_COLS = "ABCDEFH";
const ITEMS=['Pens','Folders','Stickers','Notebooks','Pencils','Markers','Rulers','Erasers','Glue sticks','Scissors','Crayons','Sharpeners','Paint pots','Tape rolls','Highlighters','Compasses'];
const NAMES=['Alex','Maya','Sam','Leila','Iris','Noah','Kai','Zara','Aysel','Murad','Nigar','Elvin','Lana','Omar','Rufat','Sevda','Tural','Gunel'];
const m2=v=>(Math.round(v*100)/100).toFixed(2);
const rnd2=v=>Math.round(v*100)/100;
function makeShop(rate){rate=rate||R.pick([18,18,18,15,20]);const items=R.shuffle(ITEMS).slice(0,8);const rows=items.map((it,i)=>{const price=R.pick([R.int(1,9),R.int(1,9)+R.pick([.5,.25,.75,.2,.6,.85,.4])]);const qty=R.int(2,12);const total=rnd2(price*qty);const vat=rnd2(total*rate/100);return{r:i+5,item:it,price,qty,total,vat,inc:rnd2(total+vat)}});
 const c={A1:'SCHOOL SHOP',H1:'VAT rate',H2:rate+'%',A4:'Item',B4:'Unit Price',C4:'Quantity',D4:'Total',E4:'VAT',F4:'Total incl VAT'};rows.forEach(o=>{c['A'+o.r]=o.item;c['B'+o.r]=m2(o.price);c['C'+o.r]=String(o.qty)});return{kind:'shop',cells:c,rows,rate}}
function makeScores(T){T=T||R.pick([70,70,65,60,75]);const ns=R.shuffle(NAMES).slice(0,8);const rows=ns.map((n,i)=>{let s=R.int(30,99);if(i<2)s=T+R.pick([0,-1,1]);if(i===2)s=T+15+R.pick([0,-1]);return{r:i+5,name:n,score:Math.max(0,Math.min(100,s))}});
 const shuffled=R.shuffle(rows.map(o=>o.score));rows.forEach((o,i)=>o.score=shuffled[i]);
 const c={A1:'IF DECISION LAB',H1:'Pass mark',H2:String(T),A4:'Student',B4:'Subject',C4:'Score',D4:'Result',E4:'Stretch Task'};rows.forEach(o=>{c['A'+o.r]=o.name;c['B'+o.r]='ICT';c['C'+o.r]=String(o.score)});return{kind:'scores',cells:c,rows,T}}
function sheetHTML(sh,o={}){const hl=o.hl||{};const rows=[1,2,4,5,6,7,8,9,10,11,12];
 let h=`<div class="xlwrap"><table class="xl" aria-label="Spreadsheet"><thead><tr><th class="xc"></th>${[...XL_COLS].map(c=>`<th class="xc">${c}</th>`).join('')}</tr></thead><tbody>`;
 rows.forEach(r=>{h+=`<tr><th class="xr">${r}</th>`+[...XL_COLS].map(c=>{const a=c+r,v=(o.extra&&o.extra[a]!=null)?o.extra[a]:(sh.cells[a]??'');const cls=[r===4?'xh':'',r===1?'xt':'',hl[a]||'',/^-?[\d.]+%?$/.test(v)?'xn':''].join(' ');
  return`<td class="${cls}" data-cell="${a}" ${o.click?'tabindex="0" role="button" aria-label="Cell '+a+'"':''}>${esc(v)}</td>`}).join('')+'</tr>'});
 return h+'</tbody></table></div>'}
const fx=s=>`<code class="fx">${esc(s)}</code>`;
/* restored from the live build */
const normF = (e) =>
  String(e)
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2212]/g, "-");
function xlCheck(q,v){if(q.kind==='num'||q.kind==='money'){const t=String(v).replace(',','.').replace(/[^\d.\-]/g,'');if(t==='')return{parse:true,why:'Type a number first.'};const n=parseFloat(t);if(isNaN(n))return{parse:true,why:'Type a number, for example 12.50'};
  return{ok:Math.abs(n-q.answer)<(q.kind==='money'?0.006:1e-9)}}
 if(q.kind==='cell'){const a=normF(v).replace(/\$/g,'');if(!/^[A-H]\d{1,2}$/.test(a))return{parse:true,why:'Type a cell address like B7, or tap the cell.'};return{ok:a===q.answer}}
 if(q.kind==='tiles'||q.kind==='lock'){const s=normF(v);return{ok:q.accept.map(normF).includes(s)}}
 return{ok:v===q.answer}}
/* ---- levels ---- */
const XLV=[
 {name:'Cell Spotter',style:'Radar hunt',c1:'#1D6F42',c2:'#5FBF7F',icon:'radar',story:'The school shop sheet is a maze of cells. Lock your radar onto the right ones.',rule:'Every cell has an address: its column letter then its row number. B7 is column B, row 7.',tags:{'cell-find':1,'cell-read':2,'cell-locate':3}},
 {name:'Formula Forge',style:'Build the formula',c1:'#B5532F',c2:'#F2A65A',icon:'anvil',story:'Hammer cell references into working formulas. Every formula starts with =.',rule:'A formula starts with =. Use cell references, not typed numbers: Total = Unit Price × Quantity, so D5 is =B5*C5.',tags:{'f-mult':1,'f-add':2,'f-vat':3}},
 {name:'Shop Till',style:'Cash register',c1:'#2F6FEB',c2:'#7FB2FF',icon:'till',story:'Customers are queuing! Work out what each formula shows before the till prints the receipt.',rule:'* means multiply. =B5*C5 multiplies the price in B5 by the quantity in C5.',tags:{'calc-int':1,'calc-dec':2,'calc-sum':3}},
 {name:'Fill-Down Slide',style:'Slide the fill handle',c1:'#7B2FE0',c2:'#C49BFF',icon:'slide',story:'Grab the fill handle and slide a formula down the rows. Where does each reference land?',rule:'Relative references change when you fill down: =B5*C5 in row 5 becomes =B6*C6 in row 6. A reference with $ in front of the row stays fixed.',tags:{'fill-rel':1,'fill-abs':2,'fill-sum':3}},
 {name:'Dollar Lock',style:'Lock picking',c1:'#C9A227',c2:'#F5D76E',icon:'lock',story:'One cell holds the VAT rate for every row. Lock it with $ so it never slides away.',rule:'$ locks a reference. $H$2 always points to H2 when you fill down. Without $, H2 slides to H3, H4 … which are empty.',tags:{'abs-lock':1,'abs-why':2,'abs-pick':3}},
 {name:'VAT Market',style:'Market stall',c1:'#D9605A',c2:'#F7A99F',icon:'stall',story:'Every price at the market needs VAT added. The rate lives in H2.',rule:'VAT = Total × rate. With 18% in H2, E5 =D5*$H$2 gives D5 × 0.18. Total incl VAT = Total + VAT.',tags:{'vat-amt':1,'vat-inc':2,'vat-change':3}},
 {name:'Pass or Retry',style:'Card sorting',c1:'#0E9F86',c2:'#6EE0C5',icon:'bins',story:'Sort each learner into the right bin using the IF rule. Watch the boundary scores!',rule:'=IF(test,"value if true","value if false"). >= means "greater than or equal to", so a score equal to the pass mark passes.',tags:{'if-eval':1,'if-edge':2,'if-dist':3}},
 {name:'IF Builder',style:'Code blocks',c1:'#E04BA8',c2:'#FF9BD6',icon:'blocks',story:'Snap code blocks together to write IF formulas the sheet can use for every learner.',rule:'Build =IF(C5>=$H$2,"Pass","Retry"): the test, a comma, the true value, a comma, the false value. Text goes in quotes.',tags:{'if-build':1,'if-abs':2,'if-dist':3}},
 {name:'What-If Boss',style:'Boss battle',c1:'#E8005F',c2:'#7B2FE0',icon:'boss',story:'The Glitch keeps changing the pass mark in H2. Predict what happens to the class before it strikes.',rule:'Change one input and every formula that uses it updates. Count carefully: who is at or above the new pass mark?',tags:{'what-count':1,'what-change':2,'what-dist':3}}];
const ref=(c,r)=>c+r;
/* restored from the live build */
function xlGen(e, t) {
  const s = (s) => Object.assign({ lvl: e, tag: t, hl: {}, sol: [], first: "", rule: XLV[e].rule }, s);
  switch (t) {
    case "cell-find": {
      const e = makeShop(),
        t = R.pick([..."ABCDEF"]),
        a = R.int(5, 12),
        n = t + a;
      return s({
        sheet: e,
        kind: "cell",
        prompt: `Tap cell <b>${n}</b> on the sheet.`,
        answer: n,
        answerText: n,
        sol: [
          `Find column <b>${t}</b> along the top.`,
          `Go down to row <b>${a}</b>.`,
          `The cell where they meet is ${n}.`,
        ],
      });
    }
    case "cell-read": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = R.pick(["A", "B", "C"]),
        n = a + t.r,
        i = e.cells[n],
        o = [
          ...new Set(R.shuffle(e.rows.filter((e) => e !== t).map((t) => e.cells[a + t.r])).filter((e) => e !== i)),
        ].slice(0, 3);
      return s({
        sheet: e,
        kind: "choice",
        prompt: `What is in cell <b>${n}</b>?`,
        options: R.shuffle([i, ...o]),
        answer: i,
        answerText: i,
        sol: [`Column ${a}, row ${t.r}.`, `That cell holds ${i}.`],
      });
    }
    case "cell-locate": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = R.pick([
          ["B", "unit price"],
          ["C", "quantity"],
        ]),
        n = a[0] + t.r;
      return s({
        sheet: e,
        kind: "cell",
        prompt: `Which cell holds the <b>${a[1]}</b> of <b>${t.item}</b>? Tap it or type its address.`,
        answer: n,
        answerText: n,
        sol: [`${t.item} is in row ${t.r}.`, `The ${a[1]} column is ${a[0]}.`, `So the cell is ${n}.`],
      });
    }
    case "f-mult": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = ["=", "B" + t.r, "*", "C" + t.r],
        n = R.pick(e.rows.filter((e) => e !== t));
      return s({
        sheet: e,
        kind: "tiles",
        hl: { ["D" + t.r]: "xq" },
        prompt: `Build the formula for <b>D${t.r}</b>: the Total for <b>${t.item}</b> (Unit Price \xd7 Quantity).`,
        tiles: R.shuffle([...a, "+", "B" + n.r, "C" + n.r, "D" + t.r, String(t.price)]),
        accept: ["=B" + t.r + "*C" + t.r, "=C" + t.r + "*B" + t.r],
        answerText: "=B" + t.r + "*C" + t.r,
        sol: [
          "Start with =.",
          `Unit Price is in B${t.r}, Quantity is in C${t.r}.`,
          `Multiply them: =B${t.r}*C${t.r}. Use references, not the number ${m2(t.price)}, so the formula updates if the price changes.`,
        ],
      });
    }
    case "f-add": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = ["=", "D" + t.r, "+", "E" + t.r];
      return s({
        sheet: e,
        kind: "tiles",
        hl: { ["F" + t.r]: "xq" },
        prompt: `Build the formula for <b>F${t.r}</b>: Total incl VAT for <b>${t.item}</b> (Total + VAT).`,
        tiles: R.shuffle([...a, "*", "B" + t.r, "C" + t.r, "$H$2", "F" + t.r]),
        accept: ["=D" + t.r + "+E" + t.r, "=E" + t.r + "+D" + t.r],
        answerText: "=D" + t.r + "+E" + t.r,
        sol: [`Total is in D${t.r} and VAT is in E${t.r}.`, `Add them: =D${t.r}+E${t.r}.`],
      });
    }
    case "f-vat": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = ["=", "D" + t.r, "*", "$H$2"];
      return s({
        sheet: e,
        kind: "tiles",
        hl: { ["E" + t.r]: "xq", H2: "xk" },
        prompt: `Build the formula for <b>E${t.r}</b>: the VAT on ${t.item}, using the rate in H2 so it still works when filled down.`,
        tiles: R.shuffle([...a, "H2", "+", "B" + t.r, "D" + (t.r + 1), "C" + t.r]),
        accept: ["=D" + t.r + "*$H$2", "=$H$2*D" + t.r, "=D" + t.r + "*H$2", "=H$2*D" + t.r],
        answerText: "=D" + t.r + "*$H$2",
        sol: [
          "VAT = Total \xd7 rate.",
          `Total is D${t.r}. The rate is in H2 for every row, so lock it: $H$2.`,
          `=D${t.r}*$H$2`,
        ],
      });
    }
    case "calc-int": {
      const e = makeShop(),
        t = R.pick(e.rows);
      return (
        (t.price = R.int(2, 9)),
        (e.cells["B" + t.r] = m2(t.price)),
        (t.total = t.price * t.qty),
        s({
          sheet: e,
          kind: "num",
          hl: { ["B" + t.r]: "xk", ["C" + t.r]: "xk", ["D" + t.r]: "xq" },
          prompt: `D${t.r} contains ${fx("=B" + t.r + "*C" + t.r)}. What number does it show?`,
          answer: t.total,
          answerText: String(t.total),
          sol: [`B${t.r} = ${t.price}, C${t.r} = ${t.qty}.`, `${t.price} \xd7 ${t.qty} = ${t.total}.`],
          first: `Multiply ${t.price} by ${t.qty}.`,
          data: { item: t.item },
        })
      );
    }
    case "calc-dec": {
      const e = makeShop(),
        t = e.rows.filter((e) => e.price % 1),
        a = R.pick(t.length ? t : e.rows);
      return s({
        sheet: e,
        kind: "money",
        hl: { ["B" + a.r]: "xk", ["C" + a.r]: "xk", ["D" + a.r]: "xq" },
        prompt: `What does ${fx("=B" + a.r + "*C" + a.r)} show for <b>${a.item}</b>? (to 2 decimal places)`,
        answer: a.total,
        answerText: m2(a.total),
        sol: [`B${a.r} = ${m2(a.price)}, C${a.r} = ${a.qty}.`, `${m2(a.price)} \xd7 ${a.qty} = ${m2(a.total)}.`],
        first: `Multiply ${m2(a.price)} by ${a.qty}.`,
        data: { item: a.item },
      });
    }
    case "calc-sum": {
      const e = makeShop(),
        [t, a] = R.shuffle(e.rows).slice(0, 2),
        n = rnd2(t.total + a.total),
        i = {};
      return (
        e.rows.forEach((e) => (i["D" + e.r] = m2(e.total))),
        s({
          sheet: e,
          extra: i,
          kind: "money",
          hl: { ["D" + t.r]: "xk", ["D" + a.r]: "xk" },
          prompt: `A customer buys the ${t.item} and the ${a.item}. What does ${fx("=D" + t.r + "+D" + a.r)} show?`,
          answer: n,
          answerText: m2(n),
          sol: [`D${t.r} = ${m2(t.total)}, D${a.r} = ${m2(a.total)}.`, `${m2(t.total)} + ${m2(a.total)} = ${m2(n)}.`],
          data: { item: t.item + " + " + a.item },
        })
      );
    }
    case "fill-rel": {
      const e = makeShop(),
        t = R.int(7, 12),
        a = t,
        n = "=B" + a + "*C" + a,
        i = R.shuffle([n, "=B5*C5", "=B" + a + "*C5", "=B5*C" + a]);
      return s({
        sheet: e,
        kind: "choice",
        fillTo: t,
        from: "D5",
        hl: { D5: "xk", ["D" + t]: "xq" },
        prompt: `D5 contains ${fx("=B5*C5")}. You fill it down to <b>D${t}</b>. Which formula is in D${t}?`,
        options: i,
        answer: n,
        answerText: n,
        sol: [
          `Filling down from row 5 to row ${t} moves ${t - 5} rows.`,
          `Both references are relative, so both row numbers change to ${t}.`,
          `D${t} = ${n}`,
        ],
      });
    }
    case "fill-abs": {
      const e = makeShop(),
        t = R.int(6, 12),
        a = "=D" + t + "*$H$2",
        n = R.shuffle([a, "=D" + t + "*$H$" + t, "=D5*$H$2", "=D" + t + "*H" + (t - 3)]);
      return s({
        sheet: e,
        kind: "choice",
        fillTo: t,
        from: "E5",
        hl: { E5: "xk", H2: "xk", ["E" + t]: "xq" },
        prompt: `E5 contains ${fx("=D5*$H$2")}. After filling down, what is in <b>E${t}</b>?`,
        options: n,
        answer: a,
        answerText: a,
        sol: [`D5 is relative, so it becomes D${t}.`, "$H$2 is absolute, so it stays $H$2.", `E${t} = ${a}`],
      });
    }
    case "fill-sum": {
      const e = makeShop(),
        t = R.int(6, 12),
        a = "=D" + t + "+E" + t,
        n = R.shuffle([a, "=D5+E5", "=D" + t + "+E5", "=D" + t + "*E" + t]);
      return s({
        sheet: e,
        kind: "choice",
        fillTo: t,
        from: "F5",
        hl: { F5: "xk", ["F" + t]: "xq" },
        prompt: `F5 contains ${fx("=D5+E5")}. What appears in <b>F${t}</b> after filling down?`,
        options: n,
        answer: a,
        answerText: a,
        sol: ["Both references are relative.", `Row 5 becomes row ${t} in both.`, `F${t} = ${a}`],
      });
    }
    case "abs-lock":
      return s({
        sheet: makeShop(),
        kind: "lock",
        hl: { E5: "xq", H2: "xk" },
        lock: { left: "D5", ref: "H2" },
        prompt: `E5 has ${fx("=D5*H2")}. Tap the parts of <b>H2</b> to add $ locks so the rate stays put when you fill down.`,
        accept: ["=D5*$H$2", "=D5*H$2"],
        answerText: "=D5*$H$2",
        sol: [
          "D5 must change on each row, so leave it unlocked.",
          "H2 must not move, so lock it: $H$2 (the $ before 2 is the one that matters when filling down).",
          "=D5*$H$2",
        ],
      });
    case "abs-why": {
      const e = makeShop(),
        t = R.int(6, 10),
        a = "=D" + t + "*H" + (t - 3),
        n = R.shuffle([a, "=D" + t + "*H2", "=D" + t + "*$H$2", "=D5*H" + (t - 3)]);
      return s({
        sheet: e,
        kind: "choice",
        fillTo: t,
        from: "E5",
        hl: { E5: "xk", ["E" + t]: "xq", ["H" + (t - 3)]: "xbad" },
        prompt: `Challenge: E5 contains the WRONG formula ${fx("=D5*H2")}. What does it become in <b>E${t}</b> when filled down?`,
        options: n,
        answer: a,
        answerText: a,
        sol: [
          "Without $, H2 is relative too.",
          `Moving down ${t - 5} rows turns H2 into H${t - 3}.`,
          `H${t - 3} is empty, so the VAT shows 0. That is why we need $H$2.`,
        ],
      });
    }
    case "abs-pick": {
      const e = "=D5*$H$2";
      return s({
        sheet: makeShop(),
        kind: "choice",
        hl: { E5: "xq", H2: "xk" },
        prompt: "Which formula in E5 gives the correct VAT on <b>every</b> row after you fill it down to E12?",
        options: R.shuffle([e, "=D5*H2", "=$D$5*$H$2", "=$D$5*H2"]),
        answer: e,
        answerText: e,
        sol: [
          "D5 must move to D6, D7\u2026 so it stays relative.",
          "H2 must stay fixed, so it needs $: $H$2.",
          "$D$5 would wrongly use the first item's Total on every row.",
        ],
      });
    }
    case "vat-amt": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = {};
      return (
        e.rows.forEach((e) => (a["D" + e.r] = m2(e.total))),
        s({
          sheet: e,
          extra: a,
          kind: "money",
          hl: { ["D" + t.r]: "xk", H2: "xk", ["E" + t.r]: "xq" },
          prompt: `H2 holds ${e.rate}%. What does ${fx("=D" + t.r + "*$H$2")} show in E${t.r} for <b>${t.item}</b>?`,
          answer: t.vat,
          answerText: m2(t.vat),
          first: `${e.rate}% = ${e.rate / 100}. Multiply ${m2(t.total)} by ${e.rate / 100}.`,
          sol: [
            `D${t.r} = ${m2(t.total)}.`,
            `${e.rate}% = ${e.rate / 100}.`,
            `${m2(t.total)} \xd7 ${e.rate / 100} = ${m2(t.vat)}.`,
          ],
          data: { item: t.item },
        })
      );
    }
    case "vat-inc": {
      const e = makeShop(),
        t = R.pick(e.rows),
        a = {};
      return (
        e.rows.forEach((e) => {
          ((a["D" + e.r] = m2(e.total)), (a["E" + e.r] = m2(e.vat)));
        }),
        s({
          sheet: e,
          extra: a,
          kind: "money",
          hl: { ["D" + t.r]: "xk", ["E" + t.r]: "xk", ["F" + t.r]: "xq" },
          prompt: `What does ${fx("=D" + t.r + "+E" + t.r)} show: the Total incl VAT for <b>${t.item}</b>?`,
          answer: t.inc,
          answerText: m2(t.inc),
          sol: [`D${t.r} = ${m2(t.total)}, E${t.r} = ${m2(t.vat)}.`, `${m2(t.total)} + ${m2(t.vat)} = ${m2(t.inc)}.`],
          data: { item: t.item },
        })
      );
    }
    case "vat-change": {
      const e = makeShop(18),
        t = R.pick(e.rows),
        a = 15,
        n = rnd2((t.total * a) / 100),
        i = {};
      return (
        e.rows.forEach((e) => {
          ((i["D" + e.r] = m2(e.total)), (i["E" + e.r] = m2(e.vat)));
        }),
        s({
          sheet: e,
          extra: i,
          kind: "money",
          hl: { H2: "xq", ["E" + t.r]: "xk" },
          prompt: `HOTS: You change H2 from 18% to <b>15%</b>. What does E${t.r} (VAT on ${t.item}) show now?`,
          answer: n,
          answerText: m2(n),
          first: `Only H2 changes. D${t.r} stays ${m2(t.total)}.`,
          sol: [
            `The formula =D${t.r}*$H$2 stays the same; only the value in H2 changes.`,
            `${m2(t.total)} \xd7 0.15 = ${m2(n)}.`,
            "Every VAT cell updates automatically because they all point to $H$2.",
          ],
          data: { item: t.item },
        })
      );
    }
    case "if-eval": {
      const e = makeScores(70),
        t = R.pick(e.rows.filter((e) => Math.abs(e.score - 70) > 3)),
        a = t.score >= 70 ? "Pass" : "Retry";
      return s({
        sheet: e,
        kind: "swipe",
        bins: ["Retry", "Pass"],
        hl: { ["C" + t.r]: "xk", ["D" + t.r]: "xq" },
        card: { name: t.name, score: t.score },
        prompt: `D${t.r} has ${fx("=IF(C" + t.r + '>=70,"Pass","Retry")')}. Where does <b>${t.name}</b> (score ${t.score}) go?`,
        answer: a,
        answerText: a,
        sol: [`Test: is ${t.score} >= 70?`, `${t.score >= 70 ? "Yes" : "No"}, so the result is "${a}".`],
      });
    }
    case "if-edge": {
      const e = R.pick([60, 65, 70, 75]),
        t = makeScores(e),
        a = t.rows[0];
      ((a.score = e + R.pick([0, -1])), (t.cells["C" + a.r] = String(a.score)));
      const n = a.score >= e ? "Pass" : "Retry";
      return s({
        sheet: t,
        kind: "swipe",
        bins: ["Retry", "Pass"],
        hl: { ["C" + a.r]: "xk", H2: "xk", ["D" + a.r]: "xq" },
        card: { name: a.name, score: a.score },
        prompt: `H2 = ${e}. D${a.r} has ${fx("=IF(C" + a.r + '>=$H$2,"Pass","Retry")')}. <b>${a.name}</b> scored ${a.score}. Pass or Retry?`,
        answer: n,
        answerText: n,
        sol: [
          '>= means "greater than or EQUAL to".',
          `${a.score} >= ${e} is ${a.score >= e ? "TRUE" : "FALSE"}.`,
          `Result: "${n}".`,
        ],
      });
    }
    case "if-dist": {
      const e = R.pick([60, 65, 70]),
        t = makeScores(e),
        a = R.pick(t.rows),
        n = a.score >= e + 15 ? "Distinction" : "Keep improving";
      return s({
        sheet: t,
        kind: "swipe",
        bins: ["Keep improving", "Distinction"],
        hl: { ["C" + a.r]: "xk", H2: "xk", ["E" + a.r]: "xq" },
        card: { name: a.name, score: a.score },
        prompt: `H2 = ${e}. E${a.r} has ${fx("=IF(C" + a.r + '>=$H$2+15,"Distinction","Keep improving")')}. What does <b>${a.name}</b> (${a.score}) get?`,
        answer: n,
        answerText: n,
        sol: [
          `$H$2+15 = ${e}+15 = ${e + 15}.`,
          `Is ${a.score} >= ${e + 15}? ${a.score >= e + 15 ? "Yes" : "No"}.`,
          `Result: "${n}".`,
        ],
      });
    }
    case "if-build": {
      const e = makeScores(70),
        t = R.pick(e.rows).r,
        a = ["=IF(", "C" + t, ">=", "70", ",", '"Pass"', ",", '"Retry"', ")"];
      return s({
        sheet: e,
        kind: "tiles",
        hl: { ["D" + t]: "xq" },
        prompt: `Build D${t}: show "Pass" if the score in C${t} is <b>70 or more</b>, otherwise "Retry".`,
        tiles: R.shuffle([...a, ">", "<=", "C" + (12 === t ? 11 : t + 1)]),
        accept: [`=IF(C${t}>=70,"Pass","Retry")`, `=IF(70<=C${t},"Pass","Retry")`],
        answerText: `=IF(C${t}>=70,"Pass","Retry")`,
        sol: [
          "Start with =IF(",
          `Test: C${t}>=70 (70 or more includes 70, so use >=).`,
          'Then ,"Pass" for TRUE and ,"Retry" for FALSE, then close the bracket.',
        ],
      });
    }
    case "if-abs": {
      const e = ["=IF(", "C5", ">=", "$H$2", ",", '"Pass"', ",", '"Retry"', ")"];
      return s({
        sheet: makeScores(),
        kind: "tiles",
        hl: { D5: "xq", H2: "xk" },
        prompt: "MOTS: rewrite D5 so it uses the fixed pass mark in <b>H2</b> and still works when you fill it down.",
        tiles: R.shuffle([...e, "H2", "70", ">"]),
        accept: ['=IF(C5>=$H$2,"Pass","Retry")', '=IF(C5>=H$2,"Pass","Retry")', '=IF($H$2<=C5,"Pass","Retry")'],
        answerText: '=IF(C5>=$H$2,"Pass","Retry")',
        sol: [
          "Replace the typed 70 with a reference to H2.",
          "Lock it with $ so every row uses H2: $H$2.",
          '=IF(C5>=$H$2,"Pass","Retry")',
        ],
      });
    }
    case "if-build-dist": {
      const e = ["=IF(", "C5", ">=", "$H$2+15", ",", '"Distinction"', ",", '"Keep improving"', ")"];
      return s({
        sheet: makeScores(),
        kind: "tiles",
        hl: { E5: "xq", H2: "xk" },
        prompt:
          'HOTS: build E5 to show "Distinction" when the score is at least <b>15 above</b> the pass mark in H2, otherwise "Keep improving".',
        tiles: R.shuffle([...e, "$H$2", '"Pass"', ">"]),
        accept: ['=IF(C5>=$H$2+15,"Distinction","Keep improving")', '=IF(C5>=H$2+15,"Distinction","Keep improving")'],
        answerText: '=IF(C5>=$H$2+15,"Distinction","Keep improving")',
        sol: [
          "The target is the pass mark plus 15: $H$2+15.",
          "Test: C5>=$H$2+15.",
          '=IF(C5>=$H$2+15,"Distinction","Keep improving")',
        ],
      });
    }
    case "what-count": {
      const e = R.pick([60, 65, 70, 75]),
        t = makeScores(e),
        a = t.rows.filter((t) => t.score >= e).length;
      return s({
        sheet: t,
        kind: "num",
        hl: { H2: "xk" },
        prompt: `Every D cell has ${fx('=IF(C5>=$H$2,"Pass","Retry")')} filled down. With H2 = ${e}, <b>how many</b> learners show "Pass"?`,
        answer: a,
        answerText: String(a),
        first: `Go down column C and count scores of ${e} or more.`,
        sol: [
          `Count scores >= ${e}: ${
            t.rows
              .filter((t) => t.score >= e)
              .map((e) => e.name + " " + e.score)
              .join(", ") || "none"
          }.`,
          `That is ${a}.`,
        ],
      });
    }
    case "what-change": {
      const e = makeScores(70),
        t = 75;
      if (!e.rows.filter((e) => e.score >= 70 && e.score < t).length) {
        const t = e.rows[R.int(0, 7)];
        ((t.score = R.int(70, 74)), (e.cells["C" + t.r] = String(t.score)));
      }
      const a = e.rows.filter((e) => e.score >= 70 && e.score < t);
      return s({
        sheet: e,
        kind: "num",
        hl: { H2: "xq" },
        prompt: 'The Glitch changes H2 from 70 to <b>75</b>. How many learners change from "Pass" to "Retry"?',
        answer: a.length,
        answerText: String(a.length),
        first: "Only scores from 70 to 74 change: they passed before but not now.",
        sol: [
          "Before: pass if score >= 70. After: pass if score >= 75.",
          `Scores from 70 to 74 switch: ${a.map((e) => e.name + " " + e.score).join(", ")}.`,
          `That is ${a.length}.`,
        ],
      });
    }
    case "what-dist": {
      const e = R.pick([60, 65, 70]),
        t = makeScores(e),
        a = t.rows.filter((t) => t.score >= e + 15).length;
      return s({
        sheet: t,
        kind: "num",
        hl: { H2: "xk" },
        prompt: `Column E has ${fx('=IF(C5>=$H$2+15,"Distinction","Keep improving")')} filled down. H2 = ${e}. How many get "Distinction"?`,
        answer: a,
        answerText: String(a),
        first: `Distinction needs ${e}+15 = ${e + 15} or more.`,
        sol: [
          `Target: ${e}+15 = ${e + 15}.`,
          `Scores >= ${e + 15}: ${
            t.rows
              .filter((t) => t.score >= e + 15)
              .map((e) => e.name + " " + e.score)
              .join(", ") || "none"
          }.`,
          `That is ${a}.`,
        ],
      });
    }
  }
  return xlGen(e, "if-build-dist");
}
function xlTags(lv,tier){return Object.entries(XLV[lv].tags).filter(([k,t])=>t===tier).map(([k])=>k)}
function xlQ(lv,tag,seen){if(!tag){const tier=R.int(1,3);tag=R.pick(xlTags(lv,tier))}let q,g=0;do{q=xlGen(lv,tag);g++}while(seen&&seen.has(q.prompt+q.answerText)&&g<30);if(seen)seen.add(q.prompt+q.answerText);q.tier=XLV[lv].tags[tag];return q}
XLV[7].tags={'if-build':1,'if-abs':2,'if-build-dist':3};
const XLNAMES={'cell-find':'Finding a cell','cell-read':'Reading a cell','cell-locate':'Locating data','f-mult':'Total formula (×)','f-add':'Sum formula (+)','f-vat':'VAT formula with $H$2','calc-int':'Calculating totals','calc-dec':'Totals with decimals','calc-sum':'Adding cells',
 'fill-rel':'Relative fill down','fill-abs':'Fill down with $','fill-sum':'Filling a sum down','abs-lock':'Adding $ locks','abs-why':'Why =D5*H2 fails','abs-pick':'Choosing absolute refs','vat-amt':'VAT amount','vat-inc':'Total incl VAT','vat-change':'Changing the VAT rate',
 'if-eval':'Evaluating IF','if-edge':'IF boundary scores','if-dist':'Distinction rule','if-build':'Writing IF','if-abs':'IF with $H$2','if-build-dist':'Writing the Distinction IF','what-count':'Counting results','what-change':'What-if changes','what-dist':'Counting Distinctions'};
/* ---- state ---- */
function XS(){if(!S.ict)S.ict={cleared:Array(9).fill(false),stars:Array(9).fill(0),best:Array(9).fill(0),learned:Array(9).fill(false),skills:{}};return S.ict}
Object.assign(TAGNAMES,XLNAMES);
const xlOpen=i=>POW('unlock')||i===0||XS().cleared[i-1];
function xlMastery(lv){const sk=XS().skills;const tags=Object.keys(XLV[lv].tags);let s=0;tags.forEach(t=>{const k=sk[t];if(!k||!k.length)return;s+=k.reduce((a,b)=>a+b,0)/k.length*Math.min(1,k.length/3)});return Math.round(100*s/tags.length)}
function xlRecord(tag,ok){const sk=XS().skills;(sk[tag]=sk[tag]||[]).push(ok?1:0);if(sk[tag].length>10)sk[tag].shift()}
/* ---- banners (each level's own look) ---- */
function xlBanner(lv){const L=XLV[lv],c1=L.c1,c2=L.c2;const art={
 radar:`<g transform="translate(70 50)"><circle r="38" fill="none" stroke="${c2}" stroke-width="2"/><circle r="24" fill="none" stroke="${c2}" stroke-width="2" opacity=".7"/><circle r="10" fill="none" stroke="${c2}" stroke-width="2" opacity=".5"/><path d="M0 0L38 0A38 38 0 0 0 27 -27Z" fill="${c2}" opacity=".45" class="spin"/><circle cx="18" cy="-14" r="4" fill="#fff"/></g>`,
 anvil:`<g transform="translate(40 30)"><path d="M10 40h70l-10 14H20z" fill="#3B3F4A"/><path d="M0 22h90c0 10-14 18-30 18H30C14 40 0 32 0 22z" fill="#5A606E"/><path d="M60 0l14 18-6 4-14-18z" fill="#C49A6C"/><g class="spark" fill="${c2}"><circle cx="78" cy="20" r="3"/><circle cx="88" cy="12" r="2"/><circle cx="70" cy="10" r="2"/></g></g>`,
 till:`<g transform="translate(30 18)"><rect x="0" y="30" width="100" height="44" rx="6" fill="#2A2D36"/><rect x="10" y="38" width="44" height="16" rx="3" fill="#7CFFB2"/><text x="14" y="50" font-size="11" fill="#073" font-family="monospace">=B5*C5</text><rect x="64" y="38" width="28" height="28" rx="3" fill="${c2}"/><rect x="18" y="0" width="40" height="34" fill="#fff" class="receipt"/><path d="M24 10h28M24 18h22M24 26h26" stroke="#999" stroke-width="2"/></g>`,
 slide:`<g transform="translate(40 8)"><rect x="0" y="0" width="70" height="84" rx="4" fill="#fff" opacity=".9"/>${[0,1,2,3,4].map(i=>`<rect x="6" y="${6+i*16}" width="58" height="12" fill="${i?'#E9E3FF':c2}"/>`).join('')}<rect x="58" y="${14}" width="10" height="10" fill="${c1}" stroke="#fff" stroke-width="2" class="handle"/></g>`,
 lock:`<g transform="translate(55 12)"><path d="M10 34V22a20 20 0 0 1 40 0v12" fill="none" stroke="#fff" stroke-width="8"/><rect x="0" y="32" width="60" height="46" rx="10" fill="${c2}" stroke="#7A5A00" stroke-width="3"/><text x="30" y="66" text-anchor="middle" font-size="28" font-weight="700" fill="#5A3E00">$</text></g>`,
 stall:`<g transform="translate(25 10)"><path d="M0 22L10 0h100l10 22z" fill="${c2}"/>${[0,1,2,3,4,5].map(i=>`<path d="M${i*20} 22a10 10 0 0 0 20 0" fill="${i%2?'#fff':c1}"/>`).join('')}<rect x="8" y="32" width="104" height="44" fill="#8B5A2B"/><rect x="18" y="40" width="30" height="22" rx="3" fill="#FFF3D6"/><text x="33" y="55" font-size="10" text-anchor="middle" fill="#333">VAT</text><circle cx="80" cy="50" r="10" fill="#FF6B35"/><circle cx="96" cy="54" r="8" fill="#7BC043"/></g>`,
 bins:`<g transform="translate(20 20)"><path d="M0 20h46l-6 50H6z" fill="#D23F44"/><text x="23" y="50" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">RETRY</text><path d="M74 20h46l-6 50H80z" fill="${c1}"/><text x="97" y="50" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">PASS</text><rect x="44" y="0" width="32" height="22" rx="4" fill="#fff" transform="rotate(-8 60 11)" class="flycard"/></g>`,
 blocks:`<g transform="translate(20 22)"><rect x="0" y="0" width="44" height="22" rx="5" fill="${c1}"/><text x="22" y="15" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">=IF(</text><rect x="46" y="0" width="34" height="22" rx="5" fill="#2F6FEB"/><text x="63" y="15" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">C5</text><rect x="82" y="0" width="28" height="22" rx="5" fill="#E9A800"/><text x="96" y="15" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">&gt;=</text><rect x="20" y="30" width="60" height="22" rx="5" fill="#0E9F86"/><text x="50" y="45" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">"Pass"</text></g>`,
 boss:`<g transform="translate(60 48)"><path d="M-34 -6c0-22 14-34 34-34s34 12 34 34-14 40-34 40-34-18-34-40z" fill="${c1}"/><path d="M-34 -6l-12 -14M34 -6l12 -14M-20 30l-8 12M20 30l8 12" stroke="${c1}" stroke-width="6" stroke-linecap="round"/><rect x="-18" y="-16" width="12" height="12" fill="#B6FF6B"/><rect x="6" y="-16" width="12" height="12" fill="#B6FF6B"/><path d="M-14 12h28" stroke="#fff" stroke-width="4" stroke-dasharray="4 3"/><text x="0" y="-26" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">#REF!</text></g>`}[L.icon];
 return`<svg viewBox="0 0 170 96" class="xlart" aria-hidden="true">${art}</svg>`}
/* restored from the live build */
function viewIct(e) {
  const t = XS();
  ((CURGAME = "ict"),
    (e.innerHTML = `<div class="mapwrap"><div><p class="eyebrow">Grade 7 \xb7 ICT \xb7 Lesson 1</p><h2 style="font-size:28px;margin:4px 0 6px">Excel Lab</h2><p class="muted" style="margin:0 0 14px">School Shop and the IF Decision Lab: cell references, formulas, the fixed VAT cell $H$2, filling down and IF. ${t.cleared.filter(Boolean).length} of 9 levels cleared. Follow the road: each level is a different game. Tap any open level to play or replay it.</p>\n ${roadMap(
      XLV.map((e, s) => ({
        name: e.name,
        sub: e.style,
        c1: e.c1,
        c2: e.c2,
        ok: xlOpen(s),
        cleared: !!t.cleared[s],
        stars: t.stars[s] || 0,
      })),
      { label: "Excel Champion", done: t.cleared.every(Boolean) },
      "Excel Lab level map",
    )}</div>\n <aside class="side"><div class="panel"><h3>How Excel Lab works</h3><p class="muted" style="margin:0">Each level is a 10-question mission in its own game style. Every right answer adds 10% progress, and the super question that pops up once per level adds 15%. Reach 80% to clear it and open the next level; 100% earns 3 stars.</p></div>\n <div class="panel"><h3>Your skills</h3><div class="prog">${XLV.map((e, t) => `<div class="prow" style="padding:8px 10px"><div><b>${t + 1}. ${e.name}</b></div><div><b>${xlMastery(t)}%</b></div><div class="pbar"><i style="width:${xlMastery(t)}%;background:linear-gradient(90deg,${e.c1},${e.c2})"></i></div></div>`).join("")}</div></div></aside></div>`),
    roadWire(
      e,
      (e) => {
        if (!xlOpen(e)) return gtoast("Clear Level " + e + " to open this one");
        xlIntro(e);
      },
      () =>
        t.cleared.every(Boolean) ? "You cleared every Excel Lab level!" : "Clear all 9 levels to become Excel Champion",
    ));
}
function xlIntro(lv){const L=XLV[lv],xs=XS();const ex=xlQ(lv,Object.keys(L.tags)[0]);
 const m=modal(`<div style="--w1:${L.c1};--w2:${L.c2}"><div class="row" style="align-items:center">${xlBanner(lv)}<div><p class="eyebrow">Level ${lv+1} · ${L.style}</p><h2>${L.name}</h2></div></div><p style="font-size:17px">${L.story}</p>
 <div class="lesson-rule">${L.rule}</div><div class="wexample" style="margin-top:10px"><p class="eyebrow">Worked example</p><div>${ex.prompt}</div><ol class="steps">${ex.sol.map(s=>`<li>${s}</li>`).join('')}</ol><p style="margin:4px 0 0"><b>Answer:</b> ${esc(ex.answerText)}</p></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="xlGo">Start the mission</button><button class="btn ghost" id="xlX">Not now</button></div></div>`,'esc');
 $('#xlGo').onclick=()=>{xs.learned[lv]=true;save();xlStart(lv)};$('#xlX').onclick=closeModal}
/* ---- mission ---- */
let XRUN=null;
/* restored from the live build */
function xlLeave() {
  (XRUN && (clockStop(XRUN), document.removeEventListener("keydown", XRUN.key)), (XRUN = null));
}
/* restored from the live build */
function xlStart(e) {
  (closeModal(), hideFB(), RUN && leaveStage(), xlLeave(), (VIEW = "ictplay"), (CURGAME = "ict"), renderTop());
  const t = XLV[e];
  ((XRUN = {
    lv: e,
    pts: 0,
    sqOk: !1,
    superAt: R.int(3, 8),
    superDone: !1,
    tStart: 0,
    tick: 0,
    qn: 0,
    total: 10,
    correct: 0,
    hearts: 3,
    streak: 0,
    seen: new Set(),
    queue: [],
    miss: {},
    cur: null,
    hint: 0,
    usedHint: !1,
    res: [],
    key: null,
  }),
    NET.track("start", { game: "ict", stage: e }),
    ($("#main").innerHTML =
      `<section class="play xlplay" style="--w1:${t.c1};--w2:${t.c2}"><div class="hud"><button class="iconbtn" id="xlBack" aria-label="Back to Excel Lab">${IC.back}</button><div class="hud-title"><span class="eyebrow">Excel Lab \xb7 Level ${e + 1} \xb7 ${t.style}</span><b>${t.name}</b></div>\n <div class="hearts" id="xlHearts"></div><div class="xldots" id="xlDots"></div><span class="chip" id="xlScore" title="Level progress (80% clears it)">0%</span><span class="chip tmr${S.settings.calm ? " calm" : ""}" title="Level time">${IC.clock}<b id="xtmr">0:00</b></span><span class="flame" id="xlFlame"></span>${POW("autowin") ? '<button class="btn gold" id="xlWin" style="min-height:38px;padding:6px 12px;font-size:13px">Clear level</button>' : ""}</div>\n <div class="stagewrap"><div class="xlscene" id="xlScene"></div><div class="toast" id="toast" role="status"></div></div>\n <div class="qcard"><div class="qhead"><span class="ask" id="xlAsk"></span><span class="chip review" id="xlRev" hidden>Quick review</span></div><div class="qtext xlprompt" id="xlPrompt"></div>\n <div class="reveal" id="xlReveal" hidden></div><div id="xlBad" class="inline-bad" hidden role="alert"></div><div class="ctl" id="xlCtl"></div>\n <div class="hints"><button data-h="1">${IC.bulb}Hint 1 \xb7 5${IC.coin}</button><button data-h="2">Hint 2 \xb7 10${IC.coin}</button><button data-h="3">Hint 3 \xb7 15${IC.coin}</button></div><div class="hintbox" id="xlHint" hidden></div></div></section>`),
    ($("#xlBack").onclick = () => go("ict")),
    $$(".hints button").forEach((e) => (e.onclick = () => xlHint(+e.dataset.h))));
  const s = $("#xlWin");
  (s &&
    (s.onclick = () => {
      ((XRUN.correct = 10), (XRUN.pts = 100), (XRUN.qn = 10), xlEnd());
    }),
    (XRUN.key = (e) => {
      !XRUN ||
        !XRUN.cur ||
        XRUN.cur.done ||
        (document.activeElement && "INPUT" === document.activeElement.tagName) ||
        "swipe" !== XRUN.cur.q.kind ||
        ("ArrowLeft" !== e.key && "ArrowRight" !== e.key) ||
        (e.preventDefault(), xlSwipe("ArrowLeft" === e.key ? 0 : 1));
    }),
    document.addEventListener("keydown", XRUN.key),
    AU.music(e % 10),
    clockStart(XRUN, "xtmr"),
    xlNext());
}
/* restored from the live build */
function xlHud() {
  XRUN &&
    (($("#xlHearts").innerHTML = [0, 1, 2]
      .map((e) => `<span class="${e < XRUN.hearts ? "" : "lost"}">${IC.heart}</span>`)
      .join("")),
    ($("#xlDots").innerHTML = Array.from(
      { length: 10 },
      (e, t) => `<i class="${void 0 === XRUN.res[t] ? "" : XRUN.res[t] ? "y" : "n"}"></i>`,
    ).join("")),
    ($("#xlScore").textContent = XRUN.pts + "%"),
    ($("#xlFlame").innerHTML = XRUN.streak > 1 ? `${IC.flame}<span>${XRUN.streak}</span>` : ""),
    $$(".hints button").forEach((e) => (e.disabled = +e.dataset.h !== XRUN.hint + 1)));
}
/* restored from the live build */
function xlNext() {
  if (!XRUN) return;
  if ((hideFB(), XRUN.qn >= XRUN.total)) return xlEnd();
  if (!XRUN.superDone && XRUN.qn + 1 >= XRUN.superAt)
    return (
      (XRUN.superDone = !0),
      superAsk(
        "ict",
        XRUN.lv,
        () => {
          XRUN && xlNext();
        },
        () =>
          XRUN
            ? ((XRUN.pts = Math.min(100, XRUN.pts + 15)), XRUN.streak++, (XRUN.sqOk = !0), xlHud(), "+15% progress")
            : "",
      )
    );
  if (doorDue(XRUN, XRUN.pts))
    return doorAsk(
      "ict",
      XRUN.lv,
      () => {
        XRUN && xlNext();
      },
      () => {
        if (!XRUN) return "";
        const e = Math.min(30, 100 - XRUN.pts);
        return ((XRUN.pts = Math.min(100, XRUN.pts + 30)), XRUN.streak++, xlHud(), "+" + e + "% progress");
      },
    );
  (XRUN.qn++, (XRUN.hint = 0), ($("#xlHint").hidden = !0), ($("#xlBad").hidden = !0));
  const e = XRUN.lv;
  let t,
    s = !1;
  const a = XRUN.queue.findIndex((e) => e.due <= XRUN.qn);
  if (a >= 0) t = xlQ(e, XRUN.queue.splice(a, 1)[0].tag, XRUN.seen);
  else if (e >= 2 && Math.random() < 0.2) ((t = xlQ(R.int(0, e - 1), null, XRUN.seen)), (s = !0));
  else {
    const s = XRUN.qn <= 3 ? 1 : XRUN.qn <= 7 ? 2 : 3;
    t = xlQ(e, R.pick(xlTags(e, s)), XRUN.seen);
  }
  ((XRUN.cur = { q: t, review: s, done: !1, t0: performance.now(), flawed: !1 }),
    ($("#xlAsk").textContent = `Question ${XRUN.qn} of 10`),
    ($("#xlRev").hidden = !s),
    s && ($("#xlRev").textContent = "Quick review \xb7 " + XLV[t.lvl].name),
    ($("#xlPrompt").innerHTML = t.prompt));
  const n = $("#xlReveal");
  ((n.hidden = !POW("reveal")),
    POW("reveal") && (n.innerHTML = "Answer (admin reveal): <b>" + esc(t.answerText) + "</b>"),
    xlScene(t),
    xlControls(t),
    xlHud());
}
/* restored from the live build */
function xlScene(e) {
  const t = $("#xlScene"),
    s = (XLV[XRUN.lv], "cell" === e.kind);
  ((t.innerHTML = `<div class="xlbanner">${xlBanner(XRUN.cur && XRUN.cur.review ? e.lvl : XRUN.lv)}<div><b>${XLV[e.lvl].name}</b><span>${XLV[e.lvl].style}</span></div>${8 === e.lvl ? `<div class="bosshp"><span>Glitch HP</span><div><i style="width:${Math.max(0, 100 - XRUN.pts)}%"></i></div></div>` : ""}</div>\n <div class="xlbody">${e.card ? `<div class="xlcard" id="xlCard"><b>${esc(e.card.name)}</b><span>Score ${e.card.score}</span></div>` : ""}${sheetHTML(e.sheet, { hl: e.hl, click: s, extra: e.extra })}</div>`),
    s &&
      $$("td[data-cell]", t).forEach((e) => {
        const s = () => {
          XRUN.cur &&
            !XRUN.cur.done &&
            ($$("td.xsel", t).forEach((e) => e.classList.remove("xsel")),
            e.classList.add("xsel"),
            xlSubmit(e.dataset.cell));
        };
        ((e.onclick = s),
          (e.onkeydown = (e) => {
            ("Enter" !== e.key && " " !== e.key) || (e.preventDefault(), s());
          }));
      }));
  const a = $("td.xq", t) || $("td.xk", t),
    n = $(".xlwrap", t);
  if ((a && n && n.scrollWidth > n.clientWidth && (n.scrollLeft = Math.max(0, a.offsetLeft - 80)), e.fillTo)) {
    const s = e.from[0];
    let a = 5;
    const n = () => {
      if (!XRUN || XRUN.cur.q !== e) return;
      $$("td.xfill", t).forEach((e) => e.classList.remove("xfill"));
      const i = $(`td[data-cell="${s}${a}"]`, t);
      (i && i.classList.add("xfill"), a++, a <= e.fillTo && setTimeout(n, 260));
    };
    setTimeout(n, 300);
  }
}
/* restored from the live build */
function xlControls(e) {
  const t = $("#xlCtl");
  if (((t.innerHTML = ""), "choice" === e.kind))
    return (
      (t.innerHTML = '<div class="choices"></div>'),
      void e.options.forEach((e) => {
        const s = H(`<button class="btn choice xlopt">${esc(e)}</button>`);
        ((s.onclick = () => xlSubmit(e)), $(".choices", t).append(s));
      })
    );
  if ("swipe" === e.kind)
    return (
      (t.innerHTML = `<div class="muted" style="font-weight:700">Tap a bin, or use the \u2190 and \u2192 keys.</div><div class="xlbins">${e.bins.map((e, t) => `<button class="btn xlbin ${t ? "r" : "l"}" data-b="${t}">${t ? "" : "\u2190 "}${esc(e)}${t ? " \u2192" : ""}</button>`).join("")}</div>`),
      void $$(".xlbin", t).forEach((e) => (e.onclick = () => xlSwipe(+e.dataset.b)))
    );
  if ("tiles" === e.kind) {
    const s = [];
    t.innerHTML = `<div class="muted" style="font-weight:700">Tap blocks in order to build the formula. Tap a placed block to remove it.</div><div class="xlbar" id="xlBar" aria-live="polite"><span class="ph">fx</span></div><div class="xltiles">${e.tiles.map((e, t) => `<button class="xltile" data-i="${t}">${esc(e)}</button>`).join("")}</div><div class="row"><button class="btn ghost" id="xlClr">Clear</button><button class="btn w" id="xlChk">Check formula</button></div>`;
    const a = $("#xlBar", t),
      n = () => {
        ((a.innerHTML = s.length
          ? s.map((t, s) => `<button class="xltile on" data-k="${s}">${esc(e.tiles[t])}</button>`).join("")
          : '<span class="ph">fx</span>'),
          $$(".xltile[data-i]", t).forEach((e) => (e.disabled = s.includes(+e.dataset.i))),
          $$(".xltile[data-k]", a).forEach(
            (e) =>
              (e.onclick = () => {
                (s.splice(+e.dataset.k, 1), sfx("click"), n());
              }),
          ));
      };
    return (
      $$(".xltile[data-i]", t).forEach(
        (e) =>
          (e.onclick = () => {
            (s.push(+e.dataset.i), sfx("click"), n());
          }),
      ),
      ($("#xlClr", t).onclick = () => {
        ((s.length = 0), n());
      }),
      void ($("#xlChk", t).onclick = () => {
        if (!s.length) return toast("Build the formula first");
        xlSubmit(s.map((t) => e.tiles[t]).join(""));
      })
    );
  }
  if ("lock" === e.kind) {
    const s = { c: !1, r: !1 };
    t.innerHTML =
      '<div class="xlbar xllock" id="xlLock"></div><div class="row"><button class="btn w" id="xlChk">Check locks</button></div>';
    const a = () => {
      (($("#xlLock").innerHTML =
        `<span class="tk">=</span><span class="tk">${e.lock.left}</span><span class="tk">*</span><button class="lk ${s.c ? "on" : ""}" data-p="c" aria-pressed="${s.c}">${s.c ? "$" : "<i>+$</i>"}</button><span class="tk big">${e.lock.ref[0]}</span><button class="lk ${s.r ? "on" : ""}" data-p="r" aria-pressed="${s.r}">${s.r ? "$" : "<i>+$</i>"}</button><span class="tk big">${e.lock.ref.slice(1)}</span>`),
        $$(".lk", t).forEach(
          (e) =>
            (e.onclick = () => {
              ((s[e.dataset.p] = !s[e.dataset.p]), sfx("step"), a());
            }),
        ));
    };
    return (
      a(),
      void ($("#xlChk", t).onclick = () =>
        xlSubmit("=" + e.lock.left + "*" + (s.c ? "$" : "") + e.lock.ref[0] + (s.r ? "$" : "") + e.lock.ref.slice(1)))
    );
  }
  const s = H(
      `<form class="ans-form" autocomplete="off"><label for="xlIn">${"cell" === e.kind ? "Cell" : "Answer"}</label><input class="ans-in" id="xlIn" inputmode="${"cell" === e.kind ? "text" : "decimal"}" spellcheck="false" autocapitalize="characters" placeholder="${"money" === e.kind ? "e.g. 12.50" : "cell" === e.kind ? "e.g. B7" : ""}"><button class="btn w">Check</button></form>`,
    ),
    a = H('<div class="msg" role="status"></div>');
  ((s.onsubmit = (t) => {
    t.preventDefault();
    const n = $("#xlIn", s).value,
      i = xlCheck(e, n);
    i.parse ? (a.textContent = i.why) : xlSubmit(n);
  }),
    t.append(s, a),
    "cell" === e.kind &&
      t.prepend(H('<div class="muted" style="font-weight:700">Tap the cell on the sheet, or type its address.</div>')),
    setTimeout(() => {
      matchMedia("(pointer:coarse)").matches || "cell" === e.kind || $("#xlIn", s).focus();
    }, 30));
}
function xlSwipe(i){if(!XRUN||!XRUN.cur||XRUN.cur.done)return;const q=XRUN.cur.q;const c=$('#xlCard');if(c){c.classList.add(i?'goR':'goL')}setTimeout(()=>xlSubmit(q.bins[i]),c?260:0)}
/* restored from the live build */
function xlSubmit(e) {
  if (!XRUN) return;
  const t = XRUN.cur;
  if (!t || t.done) return;
  const s = t.q,
    a = xlCheck(s, e);
  if (a.parse) return;
  t.done = !0;
  const n = a.ok;
  if (
    (xlRecord(s.tag, n),
    S.stats.answered++,
    n && S.stats.correct++,
    NET.track("answer", {
      game: "ict",
      stage: s.lvl,
      tag: s.tag,
      tier: s.tier,
      ok: n,
      ms: Math.round(performance.now() - t.t0),
      review: !!t.review,
      hint: XRUN.hint,
    }),
    XRUN.res.push(n),
    n)
  ) {
    (XRUN.correct++,
      (XRUN.pts = Math.min(100, XRUN.pts + 10)),
      XRUN.streak++,
      (S.coins += 3 + (XRUN.streak >= 3 ? 1 : 0)),
      addXP(10),
      sfx("good"),
      sfx("coin"),
      XRUN.streak > S.stats.bestStreak && (S.stats.bestStreak = XRUN.streak),
      burstEl($("#xlPrompt"), 20, [XLV[XRUN.lv].c1, XLV[XRUN.lv].c2, "#fff"]),
      toast(R.pick(["Correct!", "Nice formula work!", "Spot on!", "Excel-lent!", "That cell checks out!"])));
    const e = $("#xlScene");
    (e.classList.add("xlwin"),
      setTimeout(() => e.classList.remove("xlwin"), 600),
      save(),
      xlHud(),
      setTimeout(xlNext, 1300));
  } else
    ((XRUN.streak = 0),
      addXP(3),
      POW("hearts") || (XRUN.hearts = Math.max(0, XRUN.hearts - 1)),
      sfx("bad"),
      shakeX(),
      (XRUN.miss[s.tag] = (XRUN.miss[s.tag] || 0) + 1),
      XRUN.queue.push({ tag: s.tag, due: XRUN.qn + R.int(1, 2) }),
      save(),
      xlHud(),
      xlFeedback(s, e, () => {
        if (XRUN && XRUN.hearts <= 0) return xlTraining();
        xlNext();
      }));
}
function shakeX(){const s=$('#xlScene');if(!s)return;s.classList.remove('shake');void s.offsetWidth;s.classList.add('shake')}
function xlFeedback(q,given,cb){hideFB();const sh=H(`<div class="sheet" id="fbSheet"><div role="dialog" aria-label="Feedback"><h3>Not quite, here is how</h3>
 ${given!==undefined&&given!==''?`<p style="margin:4px 0" class="muted">You answered: <b>${esc(given)}</b></p>`:''}<p style="margin:4px 0;font-size:18px">Correct answer: <b>${esc(q.answerText)}</b></p><ol class="steps">${q.sol.map((s,i)=>`<li style="animation-delay:${i*.12}s">${s}</li>`).join('')}</ol>
 <p class="muted" style="margin:4px 0 10px">A similar question is coming up soon so you can try again.</p><button class="btn w" id="fbNext">Next question</button></div></div>`);
 const L=XLV[XRUN?XRUN.lv:0];sh.style.cssText=`--w1:${L.c1};--w2:${L.c2}`;document.body.append(sh);const b=$('#fbNext');b.focus();b.onclick=()=>{hideFB();cb()}}
function xlHint(h){if(!XRUN||!XRUN.cur||XRUN.cur.done||h!==XRUN.hint+1)return;const cost=[0,5,10,15][h];if(!spend(cost))return toast('Not enough coins yet. Answer questions to earn more!');updTop();
 XRUN.hint=h;XRUN.usedHint=true;sfx('click');const q=XRUN.cur.q,hb=$('#xlHint');hb.hidden=false;
 if(h===1)hb.innerHTML=`<b>Rule:</b> ${XLV[q.lvl].rule}`;if(h===2)hb.innerHTML+=`<br><b>First step:</b> ${q.first||q.sol[0]}`;
 if(h===3){const s=xlQ(q.lvl,q.tag);hb.innerHTML+=`<br><b>A similar one, fully worked:</b> ${s.prompt}<ol>${s.sol.map(x=>`<li>${x}</li>`).join('')}</ol><b>Answer:</b> ${esc(s.answerText)}`}xlHud();save()}
function xlTraining(){const lv=XRUN.lv,L=XLV[lv];NET.track('training',{game:'ict',stage:lv});const ex=xlQ(lv);
 const m=modal(`<div style="--w1:${L.c1};--w2:${L.c2}"><p class="eyebrow">Out of hearts? No problem.</p><h2>Training Room</h2><p>Here is the key idea again with a worked example. Then you're straight back in with fresh hearts.</p>
 <div class="lesson-rule">${L.rule}</div><div class="wexample" style="margin-top:10px"><div>${ex.prompt}</div><ol class="steps">${ex.sol.map(s=>`<li>${s}</li>`).join('')}</ol><p style="margin:4px 0 0"><b>Answer:</b> ${esc(ex.answerText)}</p></div>
 <div class="row" style="margin-top:14px"><button class="btn w" id="trGo">Back to the mission</button></div></div>`);$('#trGo').onclick=()=>{closeModal();XRUN.hearts=3;badge('bounce');xlHud();xlNext()}}
/* restored from the live build */
function xlEnd() {
  const e = XRUN.lv,
    t = XLV[e],
    s = XS(),
    a = XRUN.correct,
    n = XRUN.pts,
    i = XRUN.sqOk,
    o = n >= 80,
    r = clockStop(XRUN),
    l = o ? bestTime("x" + e, r) : { prev: (S.times || {})["x" + e], nb: !1 },
    c = n >= 100 ? 3 : n >= 90 ? 2 : o ? 1 : 0,
    d = o && !s.cleared[e];
  ((s.best[e] = Math.max(s.best[e], Math.min(10, Math.floor(n / 10)))),
    o &&
      ((s.cleared[e] = !0),
      (s.stars[e] = Math.max(s.stars[e], c)),
      (S.coins += d ? 30 : 10),
      addXP(d ? 100 : 30),
      3 === c && badge("perfect"),
      NET.track("clear", { game: "ict", stage: e, ms: r, data: { stars: c, acc: n } })),
    save(),
    xlLeave(),
    sfx(o ? "crystal" : "level"),
    o && setTimeout(() => FX.burst(innerWidth / 2, innerHeight / 2.4, 120, [t.c1, t.c2, "#FFC531", "#fff"]), 200),
    modal(
      `<div style="--w1:${t.c1};--w2:${t.c2};text-align:center"><p class="eyebrow">Level ${e + 1} \xb7 ${t.name}</p><h2>${o ? "Level cleared!" : "So close!"}</h2>${xlBanner(e)}\n <p style="font-size:20px;margin:6px 0"><b>${n}%</b> progress</p><p class="muted" style="margin:0 0 6px">${a} of 10 questions right${i ? " + the super question" : ""}</p>${o ? timeLine(r, l) : `<p class="timeline">${IC.clock}<span>Time <b>${fmtT(r)}</b></span></p>`}<div class="stars">${[0, 1, 2].map((e) => IC.star.replace("<svg", `<svg class="${e < c ? "" : "off"}"`)).join("")}</div>\n <p>${o ? (d ? "+30 coins \xb7 +100 XP. " + (e < 8 ? "Level " + (e + 2) + " is now open!" : "You finished Excel Lab!") : "+10 coins \xb7 +30 XP for clearing it again.") : "You need 80% to clear this level. Each right answer is +10% and the super question is +15%. Have another go: the questions change every time."}</p>\n <div class="row" style="justify-content:center"><button class="btn w" id="xeMap">Back to Excel Lab</button>${o && e < 8 ? '<button class="btn" id="xeNext">Next level</button>' : '<button class="btn ghost" id="xeAgain">Play again</button>'}</div></div>`,
    ),
    ($("#xeMap").onclick = () => go("ict")));
  const p = $("#xeNext");
  p && (p.onclick = () => xlIntro(e + 1));
  const h = $("#xeAgain");
  h && (h.onclick = () => xlStart(e));
}
/* restored from the live build */
const CATALOG = [
  {
    grade: 7,
    subject: "Maths",
    games: [
      {
        id: "algebra",
        name: "Algebra Quest",
        topic: "Negatives to algebraic fractions \xb7 10 worlds",
        view: "map",
        c1: "#C4524B",
        c2: "#E9A800",
      },
    ],
  },
  {
    grade: 7,
    subject: "Science",
    games: [
      {
        id: "sci",
        name: "Cell Lab",
        topic: "Unit 1 Cells: plant cells, microscopes, specialised cells \xb7 3 levels",
        view: "sci",
        c1: "#2E7D32",
        c2: "#AD1457",
      },
    ],
  },
  {
    grade: 7,
    subject: "ICT",
    games: [
      {
        id: "ict",
        name: "Excel Lab",
        topic: "Lesson 1: School Shop & IF Decision Lab \xb7 9 levels",
        view: "ict",
        c1: "#1D6F42",
        c2: "#5FBF7F",
      },
    ],
  },
];
/* restored from the live build */
function gameBar() {
  const e = S.grade || 7,
    t = gradeGames(e);
  return `<nav class="gamebar" aria-label="Games by grade and class"><label class="gb-gradew"><span class="vh">Grade</span><select class="gb-grade" id="gradeSel">${GRADES.map((t) => `<option value="${t}" ${t === e ? "selected" : ""}>Grade ${t}</option>`).join("")}</select></label><button class="gb-home ${"home" === VIEW ? "on" : ""}" data-gv="home">All games</button>${t.length ? t.map((e) => `<div class="gb-cls"><span class="gb-lbl">${e.subject}</span>${e.games.map((e) => `<button class="gb-game ${(("map" === VIEW || "play" === VIEW || "rush" === VIEW) && "algebra" === e.id) || (("ict" === VIEW || "ictplay" === VIEW) && "ict" === e.id) || (("sci" === VIEW || "sciplay" === VIEW) && "sci" === e.id) || VIEW === "k3" + e.id || ("k3play" === VIEW && K3G === e.id) ? "on" : ""}" data-gv="${e.view}" style="--gc:${e.c1}">${e.name}</button>`).join("")}</div>`).join("") : `<span class="gb-empty">Grade ${e} games are coming soon</span>`}</nav>`;
}
/* restored from the live build */
function gameProgress(e) {
  if (K3IDS.includes(e)) return k3Prog(e);
  if ("sci" === e) {
    const e = SCS();
    return {
      done: e.cleared.filter(Boolean).length,
      of: 3,
      unit: "levels",
      stars: e.stars.reduce((e, t) => e + t, 0),
      max: 9,
    };
  }
  if ("algebra" === e)
    return {
      done: S.cleared.filter(Boolean).length,
      of: 10,
      unit: "worlds",
      stars: S.stars.reduce((e, t) => e + t, 0),
      max: 30,
    };
  const t = XS();
  return {
    done: t.cleared.filter(Boolean).length,
    of: 9,
    unit: "levels",
    stars: t.stars.reduce((e, t) => e + t, 0),
    max: 27,
  };
}
/* restored from the live build */
function viewHome(t) {
  const e = S.grade || 7,
    a = gradeGames(e);
  ((t.innerHTML = `<section><p class="eyebrow">Mindoza games</p><h2 style="font-size:clamp(26px,4vw,36px);margin:4px 0 6px">${NET.user ? "Hi " + esc(dispName()) + ", pick a game" : "Pick a game"}</h2><p class="muted" style="margin:0 0 12px">Choose your grade, then a game. Your coins, XP and character are shared across every game.</p>\n <div class="gradepills" role="tablist" aria-label="Grade">${GRADES.map((t) => `<button role="tab" aria-pressed="${t === e}" data-gr="${t}"><small>Grade</small>${t}${gradeGames(t).length ? '<i title="Games available"></i>' : ""}</button>`).join("")}</div>\n ${
    a.length
      ? '<div class="subjgrid">' +
        a
          .map(
            (t) =>
              `<div class="subjcol"><h3 class="pcat" style="font-size:18px">${t.subject}</h3><div class="hubgrid">${t.games
                .map((t) => {
                  const e = gameProgress(t.id);
                  return `<button class="hubcard" data-gv="${t.view}" style="--c1:${t.c1};--c2:${t.c2}"><span class="hubart">${"ict" === t.id ? xlBanner(0) : "sci" === t.id ? scBanner(0) : K3IDS.includes(t.id) ? k3Banner(t.id, null, 70) : avatarSVG(S.av, "av", 70)}</span><span class="hubtxt"><b>${t.name}</b><span>${t.topic}</span>\n  <span class="pbar"><i style="width:${Math.round((100 * e.done) / e.of)}%;background:linear-gradient(90deg,${t.c1},${t.c2})"></i></span><span class="muted">${e.done} of ${e.of} ${e.unit} cleared · ${e.stars}/${e.max} ★</span></span></button>`;
                })
                .join("")}</div></div>`,
          )
          .join("") +
        "</div>"
      : `<div class="panel soon"><div class="soon-art">${[1, 2, 3].map((t) => avatarSVG({ skin: t, hat: 0, trail: 0 }, "av", 64)).join("")}</div><h3>Grade ${e} games are coming soon</h3><p class="muted" style="margin:6px 0 12px">New games for this grade are being made. Grade 7 already has Algebra Quest, Cell Lab, Excel Lab, Volt Voyage, Atom Forge, Bio Odyssey and ¡Vamos!.</p><button class="btn" data-gr="7">Go to Grade 7</button></div>`
  }</section>`),
    $$("[data-gv]", t).forEach(
      (t) =>
        (t.onclick = () => {
          (AU.init(), go(t.dataset.gv));
        }),
    ),
    $$("[data-gr]", t).forEach((t) => (t.onclick = () => setGrade(+t.dataset.gr))));
}
/* restored from the live build */
CATALOG.push(
  {
    grade: 7,
    subject: "Physics",
    games: [
      {
        id: "phy",
        name: "Volt Voyage",
        topic: "KS3 Electricity & circuits \xb7 10 levels",
        view: "k3phy",
        c1: "#1C5FD4",
        c2: "#F5B700",
      },
    ],
  },
  {
    grade: 7,
    subject: "Chemistry",
    games: [
      {
        id: "chem",
        name: "Atom Forge",
        topic: "KS3 Matter, atoms, elements & compounds \xb7 10 levels",
        view: "k3chem",
        c1: "#7B1FA2",
        c2: "#26A69A",
      },
    ],
  },
  {
    grade: 7,
    subject: "Biology",
    games: [
      {
        id: "bio",
        name: "Bio Odyssey",
        topic: "KS3 Cells, skeleton, muscles & leaves \xb7 10 levels",
        view: "k3bio",
        c1: "#2E7D32",
        c2: "#EC407A",
      },
    ],
  },
  {
    grade: 7,
    subject: "Spanish",
    games: [
      {
        id: "spa",
        name: "\xa1Vamos!",
        topic: "KS3 Phonics, greetings, grammar & daily life \xb7 10 levels",
        view: "k3spa",
        c1: "#C62828",
        c2: "#FFB300",
      },
    ],
  },
);
/* restored from the live build */
NET.summary = function () {
  const e = S.stars.reduce((e, t) => e + t, 0),
    t = S.cleared.filter(Boolean).length,
    a = S.cleared.findIndex((e) => !e);
  return {
    xp: S.xp,
    level: level(),
    coins: POW("coins") ? 0 : S.coins,
    crystals: t,
    stars: e,
    answered: S.stats.answered,
    correct: S.stats.correct,
    bestStreak: S.stats.bestStreak,
    world: a < 0 ? 11 : a + 1,
    mastery: WORLDS.map((e, t) => stageMastery(t)),
    boss: (S.boss.r0 || 0) + (S.boss.r1 || 0) + (S.boss.r2 || 0) + (S.boss.f || 0),
    ictLevels: XS().cleared.filter(Boolean).length,
    ictStars: XS().stars.reduce((e, t) => e + t, 0),
    ictNow: XS().cleared.findIndex((e) => !e) + 1 || 10,
    ictMastery: XLV.map((e, t) => xlMastery(t)),
    sciLevels: SCS().cleared.filter(Boolean).length,
    sciStars: SCS().stars.reduce((e, t) => e + t, 0),
    sciNow: SCS().cleared.findIndex((e) => !e) + 1 || 4,
    sciMastery: SCV.map((e, t) => scMastery(t)),
    k3Levels: K3IDS.reduce((e, t) => e + K3S(t).cleared.filter(Boolean).length, 0),
    k3Stars: K3IDS.reduce((e, t) => e + K3S(t).stars.reduce((e, t) => e + t, 0), 0),
    fruit: S.av.skin,
    superOk: S.stats.superOk || 0,
    superTried: S.stats.superTried || 0,
  };
};
