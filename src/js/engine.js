/* ================= MATHS ENGINE ================= */
const R={int:(a,b)=>Math.floor(Math.random()*(b-a+1))+a,
 nz(a,b){let v;do{v=R.int(a,b)}while(v===0);return v},
 pick:a=>a[Math.floor(Math.random()*a.length)],
 sg:()=>Math.random()<.5?-1:1,
 shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
 chance:p=>Math.random()<p};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
const MI='−';
const TX='×';
const DV='÷';
const SUPD='⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup=n=>String(n).split('').map(d=>SUPD[+d]).join('');
const num=n=>n<0?MI+Math.abs(n):String(n);
const pn=n=>n<0?'('+MI+Math.abs(n)+')':String(n);
const mon=(v,e=1)=>e===0?'':v+(e>1?sup(e):'');
function cstr(a){if(Number.isInteger(a))return String(a);for(let d=2;d<=12;d++){const n=a*d;if(Math.abs(n-Math.round(n))<1e-9)return Math.round(n)+'/'+d}return String(+a.toFixed(3))}
function trm(c,m,first){const a=Math.abs(c);const body=m===''?cstr(a):(a===1?'':cstr(a))+m;if(first)return(c<0?MI:'')+body;return(c<0?' '+MI+' ':' + ')+body}
function ex(terms){let o='',f=true;for(const[c,m]of terms){if(!c)continue;o+=trm(c,m,f);f=false}return o||'0'}
const frac=(t,b)=>`<span class="fr"><span>${t}</span><span>${b}</span></span>`;
/* ---- polynomials: object  monomialKey -> coefficient ---- */
const P={
 key(m){return Object.keys(m).filter(v=>m[v]).sort().map(v=>v+m[v]).join('.')},
 mono(k){const m={};if(!k)return m;k.split('.').forEach(s=>{m[s[0]]=+s.slice(1)});return m},
 c(n){return n?{'':n}:{}},
 v(x){return{[x+'1']:1}},
 clean(r){for(const k in r)if(Math.abs(r[k])<1e-9)delete r[k];return r},
 add(a,b,s=1){const r={...a};for(const k in b)r[k]=(r[k]||0)+s*b[k];return P.clean(r)},
 mul(a,b){const r={};for(const ka in a)for(const kb in b){const ma=P.mono(ka),mb=P.mono(kb);for(const v in mb)ma[v]=(ma[v]||0)+mb[v];const k=P.key(ma);r[k]=(r[k]||0)+a[ka]*b[kb]}return P.clean(r)},
 isConst(a){const ks=Object.keys(a);return ks.length===0||(ks.length===1&&ks[0]==='')},
 val(a){return a['']||0},
 pow(a,n){let r=P.c(1);for(let i=0;i<n;i++)r=P.mul(r,a);return r},
 div(a,b){const ks=Object.keys(b);if(ks.length!==1)throw'div';const mb=P.mono(ks[0]),cb=b[ks[0]];const r={};
  for(const k in a){const m=P.mono(k);for(const v in mb){m[v]=(m[v]||0)-mb[v];if(m[v]<0)throw'neg'}r[P.key(m)]=a[k]/cb}return P.clean(r)},
 eq(a,b){const d=P.add(a,b,-1);return Object.keys(d).length===0},
 deg(k){return k?k.split('.').reduce((s,x)=>s+ +x.slice(1),0):0}
};
function fmtMono(m){return Object.keys(m).sort().map(v=>mon(v,m[v])).join('')}
/* restored from the live build */
function fmtPoly(e) {
  return ex(
    Object.keys(e)
      .sort((e, t) => P.deg(t) - P.deg(e) || (e < t ? -1 : e > t ? 1 : 0))
      .map((t) => [e[t], fmtMono(P.mono(t))]),
  );
}
/* restored from the live build */
function normalise(e) {
  return String(e)
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/[\xd7\xb7\u2219\u22c5]/g, "*")
    .replace(/\xf7/g, "/")
    .replace(/[\u2070\xb9\xb2\xb3\u2074-\u2079]+/g, (e) => "^" + [...e].map((e) => SUPD.indexOf(e)).join(""))
    .replace(/\s+/g, "")
    .toLowerCase();
}
/* restored from the live build */
function tokenize(e, t) {
  e = normalise(e);
  const s = [];
  let a = 0;
  for (; a < e.length;) {
    const n = e[a];
    if (/[0-9.]/.test(n)) {
      let t = a;
      for (; t < e.length && /[0-9.]/.test(e[t]);) t++;
      const n = parseFloat(e.slice(a, t));
      if (isNaN(n)) throw "num";
      (s.push({ t: "n", v: n }), (a = t));
    } else if (/[a-z]/.test(n)) {
      const i = s[s.length - 1];
      if (t && "x" === n && i && ("n" === i.t || ")" === i.t) && /[0-9(\-]/.test(e[a + 1] || "")) {
        (s.push({ t: "*" }), a++);
        continue;
      }
      (s.push({ t: "v", v: n }), a++);
    } else if ("+-*/^()".includes(n)) (s.push({ t: n }), a++);
    else if ("[" !== n) {
      if ("]" !== n) throw "char";
      (s.push({ t: ")" }), a++);
    } else (s.push({ t: "(" }), a++);
  }
  const n = [];
  for (const e of s) {
    const t = n[n.length - 1];
    (!t ||
      ("n" !== t.t && "v" !== t.t && ")" !== t.t) ||
      ("n" !== e.t && "v" !== e.t && "(" !== e.t) ||
      ("n" === t.t && "n" === e.t) ||
      n.push({ t: "*" }),
      n.push(e));
  }
  return n;
}
/* restored from the live build */
function parsePoly(e, t) {
  const s = tokenize(e, t);
  if (!s.length) throw "empty";
  let a = 0;
  const n = () => s[a];
  function i() {
    let e = o();
    for (; n() && ("+" === n().t || "-" === n().t);) {
      const t = s[a++].t;
      e = P.add(e, o(), "+" === t ? 1 : -1);
    }
    return e;
  }
  function o() {
    let e = r();
    for (; n() && ("*" === n().t || "/" === n().t);) {
      const t = s[a++].t,
        n = r();
      e = "*" === t ? P.mul(e, n) : P.div(e, n);
    }
    return e;
  }
  function r() {
    return n() && "-" === n().t
      ? (a++, P.mul(P.c(-1), r()))
      : n() && "+" === n().t
        ? (a++, r())
        : (function () {
            const e = (function () {
              const e = n();
              if (!e) throw "end";
              if ("n" === e.t) return (a++, P.c(e.v));
              if ("v" === e.t) return (a++, P.v(e.v));
              if ("(" === e.t) {
                a++;
                const e = i();
                if (!n() || ")" !== n().t) throw "paren";
                return (a++, e);
              }
              throw "syn";
            })();
            if (n() && "^" === n().t) {
              a++;
              const t = r();
              if (!P.isConst(t)) throw "exp";
              const s = P.val(t);
              if (s < 0 || s % 1 || s > 40) throw "exp";
              return P.pow(e, s);
            }
            return e;
          })();
  }
  const l = i();
  if (a !== s.length) throw "trail";
  return l;
}
function fullyFactored(p){const ks=Object.keys(p);let g=0;for(const k of ks){if(!Number.isInteger(p[k]))return false;g=gcd(g,p[k])}if(g!==1)return false;
 const vars=new Set();ks.forEach(k=>Object.keys(P.mono(k)).forEach(v=>vars.add(v)));
 for(const v of vars){if(ks.every(k=>(P.mono(k)[v]||0)>0))return false}return true}
const READ_ERR="I couldn't read that. Check your brackets and signs.";
function checkAns(ans,input){
 try{
  switch(ans.type){
   case 'choice':return{ok:input===ans.i};
   case 'num':{if(String(input).trim()==='')return{parse:true,why:'Type an answer first.'};const p=parsePoly(input,true);if(!P.isConst(p))return{parse:true,why:'Type a number.'};return{ok:Math.abs(P.val(p)-ans.v)<1e-7}}
   case 'frac':{if(String(input).trim()==='')return{parse:true,why:'Type an answer first.'};const p=parsePoly(input,true);if(!P.isConst(p))return{parse:true,why:'Type a number or a fraction like 2/3.'};
    if(Math.abs(P.val(p)-ans.n/ans.d)>1e-7)return{ok:false};const s=normalise(input);const m=s.match(/^(-?\d+)\/(-?\d+)$/);
    if(ans.d!==1&&!m)return{ok:false,why:'Right value, but write it as a fraction, like 2/3.'};if(m&&(gcd(+m[1],+m[2])!==1||Math.abs(+m[2])===1))return{ok:false,why:'Equal, but not fully simplified. Cancel again!'};return{ok:true}}
   case 'poly':{if(String(input).trim()==='')return{parse:true,why:'Type an answer first.'};const p=parsePoly(input);return{ok:P.eq(p,ans.p)}}
   case 'factor':{if(String(input).trim()==='')return{parse:true,why:'Type an answer first.'};const p=parsePoly(input);if(!P.eq(p,ans.p))return{ok:false};
    const s=normalise(input);const m=s.match(/^([^()]*)\((.*)\)([^()]*)$/);if(!m)return{ok:false,why:'That is equal, but not factorised. Write it as HCF(bracket).'};
    let o=(m[1]+m[3]).replace(/^\*+|\*+$/g,'');if(o===''||o==='+')o='1';if(o==='-')o='-1';const outer=parsePoly(o);const inner=parsePoly(m[2]);
    if(Object.keys(outer).length!==1)return{ok:false,why:'Put a single term outside the bracket.'};
    if(!fullyFactored(inner))return{ok:false,why:'So close! There is still a common factor inside the bracket. Take out the HIGHEST common factor.'};return{ok:true}}
   case 'pair':{const r=[];for(let j=0;j<2;j++){const s=input[j];if(String(s||'').trim()==='')return{parse:true,why:'Fill in both values.'};const p=parsePoly(s,true);if(!P.isConst(p))return{parse:true,why:'Type numbers only.'};r.push(Math.abs(P.val(p)-ans.vals[j])<1e-7)}return{ok:r[0]&&r[1],parts:r}}
  }
 }catch(e){return{parse:true,why:READ_ERR}}
 return{ok:false}}
function ansText(ans){switch(ans.type){case'choice':return ans.opts[ans.i];case'num':return num(ans.v);case'frac':return ans.d===1?num(ans.n):num(ans.n)+'/'+ans.d;
 case'poly':case'factor':return ans.show||fmtPoly(ans.p);case'pair':return ans.vars[0]+' = '+num(ans.vals[0])+', '+ans.vars[1]+' = '+num(ans.vals[1])}}
const mkQ=o=>Object.assign({ask:'Work out',text:'',expr:'',sol:[],rule:'',first:'',data:{}},o);
const VARS=['x','y','a','m','n','p','k'];
/* ================= GENERATORS ================= */
const GEN=[];
/* ---- Stage 1: negative integers ---- */
GEN[0]={tags:{'neg-compare':1,'neg-add':2,'neg-sub':2,'neg-subneg':3,'neg-addneg':3,'neg-mul':4,'neg-div':4,'neg-word':4},
gen(tag){
 const mv=(a,op,b,text,rule,first)=>{const res=op==='+'?a+b:a-b;const d=res-a;const e=num(a)+' '+(op==='+'?'+':MI)+' '+pn(b);
  return mkQ({tag,key:tag+e,text,expr:e+' = ?',ans:{type:'num',v:res},data:{kind:'move',start:a,end:res},rule,first,
   sol:[`Start at ${num(a)} on the mine shaft.`,first,`Move ${d>0?'UP':'DOWN'} ${Math.abs(d)}: ${num(a)} → ${num(res)}.`,`Answer: ${num(res)}`]})};
 switch(tag){
 case'neg-compare':{let a,b;do{a=R.int(-14,8);b=R.int(-14,8)}while(a===b||(a>=0&&b>=0));const kind=R.pick(['high','low','cold','warm']);
  const big=Math.max(a,b),small=Math.min(a,b),want=(kind==='high'||kind==='warm')?big:small,u=(kind==='cold'||kind==='warm')?'°C':'';
  const ask={high:'Which gem is HIGHER (the greater number)?',low:'Which gem is DEEPER (the smaller number)?',cold:'Which temperature is COLDER?',warm:'Which temperature is WARMER?'}[kind];
  return mkQ({tag,key:'c'+a+'|'+b+kind,ask,expr:num(a)+u+' &nbsp;or&nbsp; '+num(b)+u,ans:{type:'choice',opts:[num(a)+u,num(b)+u],i:[a,b].indexOf(want)},data:{kind:'compare',nums:[a,b],want},
   rule:'Numbers get bigger as you go UP the number line. So −2 is greater than −9.',first:'Picture both numbers on the mine shaft. Which one sits higher up?',
   sol:[`Place ${num(a)} and ${num(b)} on the number line.`,`${num(big)} is above ${num(small)}, so ${num(big)} is greater (warmer) and ${num(small)} is smaller (colder).`,`Answer: ${num(want)}${u}`]})}
 case'neg-add':{const a=R.int(-12,-1),b=R.int(2,14);return mv(a,'+',b,'The cart rises '+b+' levels.','Adding a positive number moves UP the number line.',`Adding ${b} means move UP ${b} levels.`)}
 case'neg-sub':{if(R.chance(.5)){const a=R.int(0,8),b=R.int(a+1,a+10);return mv(a,'-',b,'The cart drops '+b+' levels.','Subtracting a positive number moves DOWN the number line.',`Subtracting ${b} means move DOWN ${b} levels.`)}
  const a=R.int(-9,-1),b=R.int(1,8);return mv(a,'-',b,'The cart drops '+b+' levels.','Subtracting a positive number moves DOWN the number line.',`Subtracting ${b} means move DOWN ${b} levels.`)}
 case'neg-subneg':{const a=R.int(-9,8),b=R.int(1,9);return mv(a,'-',-b,'Subtracting a negative... surprise, the cart goes UP!','Subtracting a negative is the same as adding: 4 − (−2) = 4 + 2.',`Two minus signs together make a plus: ${num(a)} − (${MI}${b}) = ${num(a)} + ${b}.`)}
 case'neg-addneg':{const a=R.int(-6,9),b=R.int(2,10);return mv(a,'+',-b,'Adding a negative sends the cart DOWN.','Adding a negative is the same as subtracting: 3 + (−5) = 3 − 5.',`Rewrite: ${num(a)} + (${MI}${b}) = ${num(a)} − ${b}.`)}
 case'neg-mul':{let a,b;do{a=R.nz(-9,9);b=R.nz(-9,9)}while(Math.abs(a)<2||Math.abs(b)<2||(a>0&&b>0));const r=a*b;const same=(a<0)===(b<0);
  return mkQ({tag,key:'m'+a+'|'+b,expr:pn(a)+' '+TX+' '+pn(b)+' = ?',ans:{type:'num',v:r},data:{kind:'calc'},rule:'Same signs → positive. Different signs → negative.',
   first:`First multiply the sizes: ${Math.abs(a)} ${TX} ${Math.abs(b)} = ${Math.abs(r)}.`,sol:[`Multiply the sizes: ${Math.abs(a)} ${TX} ${Math.abs(b)} = ${Math.abs(r)}.`,`Signs are ${same?'the same':'different'}, so the answer is ${same?'positive':'negative'}.`,`Answer: ${num(r)}`]})}
 case'neg-div':{let a,b;do{a=R.nz(-9,9);b=R.nz(-9,9)}while(Math.abs(a)<2||Math.abs(b)<2||(a>0&&b>0&&R.chance(.8)));const p=a*b;const same=(p<0)===(b<0);
  return mkQ({tag,key:'d'+p+'|'+b,expr:pn(p)+' '+DV+' '+pn(b)+' = ?',ans:{type:'num',v:a},data:{kind:'calc'},rule:'Dividing works like multiplying: same signs → positive, different signs → negative.',
   first:`First divide the sizes: ${Math.abs(p)} ${DV} ${Math.abs(b)} = ${Math.abs(a)}.`,sol:[`Divide the sizes: ${Math.abs(p)} ${DV} ${Math.abs(b)} = ${Math.abs(a)}.`,`Signs are ${same?'the same':'different'}, so the answer is ${same?'positive':'negative'}.`,`Answer: ${num(a)}`]})}
 case'neg-word':{const k=R.int(0,2);
  if(k===0){const a=R.int(-9,-1),b=R.int(3,15),r=a+b;return mkQ({tag,key:'w0'+a+b,ask:'Temperature problem',text:`At 6 am it is ${num(a)}°C. By noon it is ${b}°C warmer. What is the noon temperature?`,expr:num(a)+' + '+b+' = ?',ans:{type:'num',v:r},data:{kind:'move',start:a,end:r},
   rule:'Warmer means add (move up). Colder means subtract (move down).',first:`Warmer by ${b} means ${num(a)} + ${b}.`,sol:[`Warmer means add: ${num(a)} + ${b}.`,`Move up ${b} from ${num(a)}.`,`Answer: ${num(r)}°C`]})}
  if(k===1){const a=R.int(1,9),b=R.int(-12,-1),r=a-b;return mkQ({tag,key:'w1'+a+b,ask:'Temperature problem',text:`The temperature falls from ${a}°C to ${num(b)}°C. By how many degrees did it fall?`,expr:a+' '+MI+' '+pn(b)+' = ?',ans:{type:'num',v:r},data:{kind:'calc'},
   rule:'The difference between two temperatures is the bigger one minus the smaller one.',first:`Difference = ${a} − (${MI}${Math.abs(b)}) = ${a} + ${Math.abs(b)}.`,sol:[`Difference = ${a} − (${MI}${Math.abs(b)}).`,`Subtracting a negative is adding: ${a} + ${Math.abs(b)}.`,`Answer: ${r} degrees`]})}
  const d=R.int(2,9),t=R.int(2,5),r=-d*t;return mkQ({tag,key:'w2'+d+t,ask:'Depth problem',text:`A miner digs down ${d} metres every hour, starting at 0. What is her level after ${t} hours?`,expr:t+' '+TX+' ('+MI+d+') = ?',ans:{type:'num',v:r},data:{kind:'calc'},
   rule:'Going down is negative. Positive × negative = negative.',first:`Each hour is ${MI}${d}, so work out ${t} ${TX} (${MI}${d}).`,sol:[`Each hour changes the level by ${MI}${d}.`,`${t} ${TX} (${MI}${d}) = ${num(r)}.`,`Answer: ${num(r)} m`]})}
 }}};
/* ---- Stage 2: BIDMAS ---- */
let _uid=1;
const N=v=>({n:v});
const O=(op,l,r,br)=>({op,l,r,br:!!br,id:_uid++});
const isN=x=>x.n!==undefined;
function bEval(op,a,b){switch(op){case'+':return a+b;case'-':return a-b;case'*':return a*b;case'/':return a/b;case'^':return Math.pow(a,b)}}
function bTokens(node,out=[],ctx={}){
 if(isN(node)){const v=node.n;const neg=v<0;const s=neg&&(out.length>0||ctx.base)?'('+MI+Math.abs(v)+')':num(v);out.push({k:'n',s,v,sup:!!ctx.sup});return out}
 if(node.br)out.push({k:'(',s:'('});
 bTokens(node.l,out,{base:node.op==='^'});
 out.push({k:'op',op:node.op,id:node.id,s:{'+':'+','-':MI,'*':TX,'/':DV,'^':'^'}[node.op]});
 bTokens(node.r,out,{sup:node.op==='^'});
 if(node.br)out.push({k:')',s:')'});return out}
function bStr(toks){let o='';toks.forEach((t,i)=>{if(t.k==='op'&&t.op==='^')return;if(t.sup){o+=sup(t.v);return}const p=toks[i-1];
 if(i>0&&!(p.k==='(')&&t.k!==')')o+=' ';o+=t.s});return o}
function bReady(root){const toks=bTokens(root);const res=[];
 (function walk(n,d){if(isN(n))return;const dd=d+(n.br?1:0);if(isN(n.l)&&isN(n.r))res.push({node:n,depth:dd,cls:n.op==='^'?3:(n.op==='*'||n.op==='/')?2:1,pos:toks.findIndex(t=>t.id===n.id)});walk(n.l,dd);walk(n.r,dd)})(root,0);
 res.sort((a,b)=>b.depth-a.depth||b.cls-a.cls||a.pos-b.pos);return res}
function bReplace(n,id,v){if(isN(n))return n;if(n.id===id)return N(v);return{...n,l:bReplace(n.l,id,v),r:bReplace(n.r,id,v)}}
function bPairs(root){const t=bTokens(root);const ps=[];t.forEach((k,i)=>{if(k.k!=='op')return;const a=t[i-1],b=t[i+1];if(a&&b&&a.k==='n'&&b.k==='n'&&!a.sup){
 const lbl=k.op==='^'?a.s+sup(b.v):a.s+' '+k.s+' '+b.s;ps.push({id:k.id,label:lbl})}});return ps}
const BWHY={3:'Indices (powers) come before ×, ÷, + and −.',2:'× and ÷ come before + and − (work left to right).',1:'+ and − are done last, left to right.'};
function bSolve(root){const steps=[];let t=root;let guard=0;
 while(!isN(t)&&guard++<20){const r=bReady(t)[0];const n=r.node;const v=bEval(n.op,n.l.n,n.r.n);
  const why=r.depth>0?'Brackets first':['','Add/Subtract','Multiply/Divide','Indices'][r.cls];
  const lbl=n.op==='^'?pn(n.l.n)+sup(n.r.n):pn(n.l.n)+' '+{'+':'+','-':MI,'*':TX,'/':DV}[n.op]+' '+pn(n.r.n);
  t=bReplace(t,n.id,v);steps.push(`${why}: ${lbl} = ${num(v)} → ${bStr(bTokens(t))}`)}
 return{steps,val:t.n}}
function bValid(root){let t=root,g=0;while(!isN(t)&&g++<20){const n=bReady(t)[0].node;const v=bEval(n.op,n.l.n,n.r.n);if(!Number.isInteger(v)||Math.abs(v)>400)return false;t=bReplace(t,n.id,v)}return Number.isInteger(t.n)&&Math.abs(t.n)<=300}
GEN[1]={tags:{'bid-basic':1,'bid-brackets':2,'bid-indices':3,'bid-mixed':4},
gen(tag){const i=R.int,T={
 'bid-basic':[()=>O('+',N(i(2,15)),O('*',N(i(2,9)),N(i(2,9)))),()=>{const d=i(2,6);return O('-',O('*',N(i(2,9)),N(i(2,9))),O('/',N(d*i(1,8)),N(d)))},
   ()=>O('+',O('-',N(i(20,40)),O('*',N(i(2,5)),N(i(2,6)))),N(i(1,9))),()=>{const b=i(2,5);return O('+',O('/',N(b*i(2,9)),N(b)),O('*',N(i(2,7)),N(i(2,7))))}],
 'bid-brackets':[()=>O('*',O('+',N(i(2,9)),N(i(2,9)),1),N(i(2,6))),()=>O('+',O('*',N(i(2,6)),O('-',N(i(8,15)),N(i(1,7)),1)),N(i(1,12))),
   ()=>{const c=i(2,5);const s=c*i(2,6);const a=i(1,s-1);return O('-',O('/',O('+',N(a),N(s-a),1),N(c)),N(i(1,4)))},()=>O('+',N(i(2,20)),O('*',N(i(2,6)),O('-',N(i(6,12)),N(i(1,5)),1)))],
 'bid-indices':[()=>O('+',N(i(1,9)),O('*',N(i(2,5)),O('^',N(i(2,4)),N(2)))),()=>O('-',O('^',O('+',N(i(1,4)),N(i(1,4)),1),N(2)),N(i(1,15))),
   ()=>{const d=i(2,5);return O('-',O('*',N(i(2,4)),O('^',N(i(2,5)),N(2))),O('/',N(d*i(1,6)),N(d)))},()=>{const d=i(2,4);return O('-',O('+',N(i(1,9)),O('*',N(i(2,5)),O('^',N(2),N(i(2,3))))),O('/',N(d*i(1,5)),N(d)))}],
 'bid-mixed':[()=>{const b=i(1,5);return O('+',N(-i(2,9)),O('^',O('-',N(b),N(b+i(1,4)),1),N(2)))},()=>O('*',N(i(2,5)),O('+',N(i(2,9)),O('-',N(i(1,5)),N(i(6,12)),1),1)),
   ()=>O('-',O('^',N(-i(2,5)),N(2)),O('*',N(i(2,6)),N(i(2,6)))),()=>O('*',O('-',N(i(1,4)),N(i(5,9)),1),O('+',N(i(-6,-1)),N(i(1,3)),1)),
   ()=>O('-',N(i(10,40)),O('*',N(i(2,3)),O('+',N(i(1,4)),O('^',O('-',N(i(1,3)),N(i(4,6)),1),N(2)),1)))]};
 let tr,g=0;do{tr=R.pick(T[tag])();}while(!bValid(tr)&&g++<60);const s=bSolve(tr);const e=bStr(bTokens(tr));
 const first=bReady(tr)[0];const fn=first.node;
 return mkQ({tag,key:e,expr:e,ans:{type:'num',v:s.val},data:{tree:tr},rule:'BIDMAS: Brackets, Indices, Division and Multiplication (left to right), Addition and Subtraction (left to right).',
  first:`Do this part first: ${fn.op==='^'?pn(fn.l.n)+sup(fn.r.n):pn(fn.l.n)+' '+{'+':'+','-':MI,'*':TX,'/':DV}[fn.op]+' '+pn(fn.r.n)}. ${first.depth>0?'It is inside brackets.':BWHY[first.cls]}`,sol:s.steps.concat(['Answer: '+num(s.val)])})}};
/* ---- Stage 3: substitution ---- */
GEN[2]={tags:{'sub-one':1,'sub-two':2,'sub-pow':3,'sub-formula':4},
gen(tag){const i=R.int;const v=R.pick(['x','n','k','t']);
 const mk=(formula,vals,steps,res,rule,first,label='Damage')=>mkQ({tag,key:formula+JSON.stringify(vals),ask:'Substitute to find the value',expr:label+' = '+formula,text:Object.entries(vals).map(([k,x])=>k+' = '+num(x)).join(', '),
  ans:{type:'num',v:res},data:{formula,label},rule,first,sol:steps.concat(['Answer: '+num(res)])});
 switch(tag){
 case'sub-one':{const a=i(2,9),b=i(1,12),x=i(1,10),f=R.int(0,2);
  if(f===0)return mk(`${a}${v} + ${b}`,{[v]:x},[`Replace ${v} with ${x}: ${a} ${TX} ${x} + ${b}`,`= ${a*x} + ${b}`],a*x+b,'Swap the letter for its number, then use BIDMAS. 3x means 3 × x.',`${a}${v} means ${a} ${TX} ${v} = ${a} ${TX} ${x}.`);
  if(f===1){const bb=Math.min(b,a*x+5);return mk(`${a}${v} ${MI} ${bb}`,{[v]:x},[`Replace ${v} with ${x}: ${a} ${TX} ${x} ${MI} ${bb}`,`= ${a*x} ${MI} ${bb}`],a*x-bb,'Swap the letter for its number, then use BIDMAS. 3x means 3 × x.',`${a}${v} means ${a} ${TX} ${x}.`)}
  return mk(`${a}(${v} + ${b})`,{[v]:x},[`Replace ${v} with ${x}: ${a} ${TX} (${x} + ${b})`,`Brackets first: ${a} ${TX} ${x+b}`],a*(x+b),'Swap the letter for its number. Brackets first!',`Work out the bracket: ${x} + ${b} = ${x+b}.`)}
 case'sub-two':{const p=i(2,6),q=i(2,6),a=i(-5,9),b=R.nz(-6,6),f=R.int(0,2);
  if(f===0)return mk(`${p}a + ${q}b`,{a,b},[`Replace: ${p} ${TX} ${pn(a)} + ${q} ${TX} ${pn(b)}`,`= ${num(p*a)} + ${pn(q*b)}`],p*a+q*b,'Replace EVERY letter with its number. Put negatives in brackets.',`${p}a = ${p} ${TX} ${pn(a)} = ${num(p*a)}.`);
  if(f===1)return mk(`${p}a ${MI} b`,{a,b},[`Replace: ${p} ${TX} ${pn(a)} ${MI} ${pn(b)}`,`= ${num(p*a)} ${MI} ${pn(b)}`],p*a-b,'Replace EVERY letter with its number. Subtracting a negative means adding.',`${p}a = ${num(p*a)}. Then subtract ${pn(b)}.`);
  return mk(`ab + ${q}`,{a,b},[`ab means a ${TX} b: ${pn(a)} ${TX} ${pn(b)} = ${num(a*b)}`,`${num(a*b)} + ${q}`],a*b+q,'ab means a × b.',`ab = ${pn(a)} ${TX} ${pn(b)}.`)}
 case'sub-pow':{const x=-i(1,5),c=i(1,12),a=i(2,4),f=R.int(0,2);
  if(f===0)return mk(`${v}² + ${c}`,{[v]:x},[`Replace: (${MI}${-x})² + ${c}`,`(${MI}${-x})² = (${MI}${-x}) ${TX} (${MI}${-x}) = ${x*x}`,`${x*x} + ${c}`],x*x+c,'A negative number squared is positive: (−3)² = 9.',`(${MI}${-x})² = ${x*x}, because negative ${TX} negative = positive.`);
  if(f===1)return mk(`${a}${v}² ${MI} ${c}`,{[v]:x},[`Indices first: (${MI}${-x})² = ${x*x}`,`Then multiply: ${a} ${TX} ${x*x} = ${a*x*x}`,`${a*x*x} ${MI} ${c}`],a*x*x-c,'Square FIRST, then multiply: 2x² means 2 × x².',`Square first: (${MI}${-x})² = ${x*x}.`);
  return mk(`${v}³ + ${c}`,{[v]:x},[`(${MI}${-x})³ = (${MI}${-x}) ${TX} (${MI}${-x}) ${TX} (${MI}${-x}) = ${x*x*x}`,`${num(x*x*x)} + ${c}`],x*x*x+c,'A negative number cubed stays negative: (−2)³ = −8.',`(${MI}${-x})³ = ${num(x*x*x)}.`)}
 case'sub-formula':{const f=R.int(0,4);
  if(f===0){const l=i(3,15),w=i(2,12);return mk('lw',{l,w},[`A = l ${TX} w = ${l} ${TX} ${w}`],l*w,'A = lw means area = length × width.',`lw = ${l} ${TX} ${w}.`,'A')}
  if(f===1){const l=i(3,15),w=i(2,12);return mk('2l + 2w',{l,w},[`P = 2 ${TX} ${l} + 2 ${TX} ${w}`,`= ${2*l} + ${2*w}`],2*l+2*w,'Perimeter P = 2l + 2w adds all four sides.',`2l = 2 ${TX} ${l} = ${2*l}.`,'P')}
  if(f===2){const u=i(0,20),a=i(1,10),t=i(1,10);return mk('u + at',{u,a,t},[`v = ${u} + ${a} ${TX} ${t}`,`Multiply first: ${a*t}`,`${u} + ${a*t}`],u+a*t,'v = u + at: multiply a × t first, then add u.',`at = ${a} ${TX} ${t} = ${a*t}.`,'v')}
  if(f===3){const m=i(2,12),a=R.nz(-6,8);return mk('ma',{m,a},[`F = ${m} ${TX} ${pn(a)}`],m*a,'F = ma means force = mass × acceleration.',`ma = ${m} ${TX} ${pn(a)}.`,'F')}
  const b=2*i(2,9),h=i(2,12);return mk('½bh',{b,h},[`A = ½ ${TX} ${b} ${TX} ${h}`,`½ of ${b} is ${b/2}`,`${b/2} ${TX} ${h}`],b*h/2,'Triangle area A = ½bh: half of base × height.',`Half of ${b} is ${b/2}.`,'A')}
 }}};
/* ---- Stage 4: laws of indices ---- */
GEN[3]={tags:{'ind-mul':1,'ind-div':2,'ind-pow':3,'ind-zero':3,'ind-coef':4},
gen(tag){const i=R.int,v=R.pick(['a','x','y','m','n','p']);
 const RULES={add:'When you MULTIPLY powers of the same letter, ADD the powers: a³ × a² = a⁵.',sub:'When you DIVIDE powers of the same letter, SUBTRACT the powers: a⁷ ÷ a⁴ = a³.',mul:'A power of a power: MULTIPLY the powers: (a²)³ = a⁶.'};
 const mk=(L,op,Rt,rule,res,steps,first)=>{const e=op==='^'?'('+L+')'+Rt:L+' '+op+' '+Rt;const p=parsePoly(res);
  return mkQ({tag,key:e,ask:'Simplify',expr:e,ans:{type:'poly',p,show:fmtPoly(p)},data:{L,op,Rt,rule},rule:RULES[rule]+(tag==='ind-zero'?' Anything to the power 0 equals 1.':''),first,sol:steps.concat(['Answer: '+fmtPoly(p)])})};
 switch(tag){
 case'ind-mul':{const m=i(1,9),n=i(2,9);return mk(mon(v,m),TX,mon(v,n),'add',`${v}^${m+n}`,[`Multiplying, so ADD the powers: ${m} + ${n} = ${m+n}`],`Same letter, multiplying: add ${m} + ${n}.`)}
 case'ind-div':{const n=i(1,7),m=n+i(1,8);return mk(mon(v,m),DV,mon(v,n),'sub',`${v}^${m-n}`,[`Dividing, so SUBTRACT the powers: ${m} − ${n} = ${m-n}`],`Same letter, dividing: subtract ${m} − ${n}.`)}
 case'ind-pow':{const m=i(2,6),n=i(2,5);return mk(mon(v,m),'^',sup(n),'mul',`${v}^${m*n}`,[`Power of a power, so MULTIPLY: ${m} ${TX} ${n} = ${m*n}`],`Multiply the powers: ${m} ${TX} ${n}.`)}
 case'ind-zero':{const f=R.int(0,2),m=i(2,9);
  if(f===0)return mk(mon(v,m),DV,mon(v,m),'sub','1',[`Subtract the powers: ${m} − ${m} = 0, giving ${v}⁰`,`Anything to the power 0 is 1`],`${m} − ${m} = 0. What is ${v}⁰?`);
  if(f===1)return mk(mon(v,m),'^','⁰','mul','1',[`Multiply the powers: ${m} ${TX} 0 = 0, giving ${v}⁰`,`Anything to the power 0 is 1`],`${m} ${TX} 0 = 0.`);
  const n=i(2,8);return mk(v+'⁰',TX,mon(v,n),'add',`${v}^${n}`,[`${v}⁰ = 1, or add the powers: 0 + ${n} = ${n}`],`0 + ${n} = ${n}.`)}
 case'ind-coef':{const f=R.int(0,2);
  if(f===0){const a=i(2,6),b=i(2,6),m=i(1,6),n=i(2,6);return mk(a+mon(v,m),TX,b+mon(v,n),'add',`${a*b}${v}^${m+n}`,[`Multiply the numbers: ${a} ${TX} ${b} = ${a*b}`,`Add the powers: ${m} + ${n} = ${m+n}`],`Numbers multiply (${a} ${TX} ${b}); powers add.`)}
  if(f===1){const b=i(2,6),a=b*i(2,5),n=i(1,5),m=n+i(1,6);return mk(a+mon(v,m),DV,b+mon(v,n),'sub',`${a/b}${v}^${m-n}`,[`Divide the numbers: ${a} ${DV} ${b} = ${a/b}`,`Subtract the powers: ${m} − ${n} = ${m-n}`],`Numbers divide (${a} ${DV} ${b}); powers subtract.`)}
  const c=i(2,5),m=i(2,5),n=2;return mk(c+mon(v,m),'^',sup(n),'mul',`${c*c}${v}^${m*n}`,[`Square the number: ${c}² = ${c*c}`,`Multiply the powers: ${m} ${TX} 2 = ${m*2}`],`Both parts get squared: ${c}² and (${mon(v,m)})².`)}
 }}};
/* ---- Stage 5: equations (balance) ---- */
const sideStr=(a,b)=>ex([[a,'x'],[b,'']]);
function eqStr(s){if(s.br)return`${s.br.k}(x ${s.br.m<0?MI:'+'} ${Math.abs(s.br.m)}) = ${num(s.br.e)}`;return sideStr(s.a,s.b)+' = '+sideStr(s.c,s.d)}
function eqMoves(s){if(s.br){const mv=[{k:'expand'}];if(s.br.e%s.br.k===0)mv.push({k:'div',v:s.br.k});return mv}
 const mv=[];if(s.c!==0)mv.push({k:'addx',v:-s.c});if(s.b!==0)mv.push({k:'add',v:-s.b});if(!mv.length&&s.a!==1)mv.push({k:'div',v:s.a});return mv}
function eqApply(s,m){if(s.br){const{k,m:mm,e}=s.br;if(m.k==='expand')return{a:k,b:k*mm,c:0,d:e};if(m.k==='div'&&m.v===k)return{a:1,b:mm,c:0,d:e/k};return null}
 const t={...s};if(m.k==='add'){t.b+=m.v;t.d+=m.v}else if(m.k==='addx'){t.a+=m.v;t.c+=m.v}else if(m.k==='div'){t.a/=m.v;t.b/=m.v;t.c/=m.v;t.d/=m.v}else if(m.k==='mul'){t.a*=m.v;t.b*=m.v;t.c*=m.v;t.d*=m.v}return t}
const eqDone=s=>!s.br&&s.a===1&&s.b===0&&s.c===0;
function moveLabel(m){if(m.k==='expand')return'Expand brackets';if(m.k==='add')return(m.v<0?MI+' ':'+ ')+Math.abs(m.v);if(m.k==='addx')return(m.v<0?MI+' ':'+ ')+(Math.abs(m.v)===1?'':Math.abs(m.v))+'x';if(m.k==='div')return DV+' '+pn(m.v);if(m.k==='mul')return TX+' '+pn(m.v)}
function moveWhy(m){if(m.k==='expand')return'Expand the brackets to remove them';if(m.k==='add')return m.v<0?`Subtract ${-m.v} from both sides`:`Add ${m.v} to both sides`;if(m.k==='addx')return m.v<0?`Subtract ${moveLabel({k:'addx',v:-m.v}).slice(2)} from both sides to collect the x terms`:`Add ${moveLabel(m).slice(2)} to both sides`;if(m.k==='div')return`Divide both sides by ${num(m.v)}`;return''}
function eqDistract(s,valid){const d=[];valid.forEach(m=>{if(m.k==='add')d.push({k:'add',v:-m.v});if(m.k==='addx')d.push({k:'addx',v:-m.v});if(m.k==='div'){d.push({k:'mul',v:m.v});d.push({k:'add',v:-m.v})}if(m.k==='expand'&&s.br)d.push({k:'add',v:-s.br.m})});
 if(!s.br&&s.a!==1&&!valid.some(m=>m.k==='div'))d.push({k:'div',v:s.a});return d}
function eqSolve(s0){const steps=[];let s=s0,g=0;while(!eqDone(s)&&g++<8){const m=eqMoves(s)[0];s=eqApply(s,m);steps.push(`${moveWhy(m)}: ${eqStr(s)}`)}return steps}
/* ---- Stage 6: simultaneous equations ---- */
function sStr(a,b,c,vx='x',vy='y'){return ex([[a,vx],[b,vy]])+' = '+num(c)}
function shapeName(k){return{sq:'Square plot',rect:'Rectangle plot',tri:'Triangle plot',para:'Parallelogram plot',trap:'Trapezium plot',L:'L-shaped plot'}[k]}
GEN[4]={tags:{'eq-one':1,'eq-two':2,'eq-both':3,'eq-brackets':3,'eq-word':4},
gen(tag){const i=R.int;let s,x,text='';
 switch(tag){
 case'eq-one':{x=i(1,20);const f=R.int(0,2);if(f===0){const b=i(1,15);s={a:1,b,c:0,d:x+b}}else if(f===1){const b=i(1,15);s={a:1,b:-b,c:0,d:x-b}}else{const a=i(2,9);s={a,b:0,c:0,d:a*x}}break}
 case'eq-two':{x=i(1,12);const a=i(2,9),b=R.nz(-15,15);s={a,b,c:0,d:a*x+b};break}
 case'eq-both':{x=i(1,10);const c=i(1,5),a=c+i(1,5),b=R.nz(-12,12);const d=(a-c)*x+b;s={a,b,c,d};if(d===b)s.b+=1,s.d+=1;break}
 case'eq-brackets':{x=i(1,10);const k=i(2,6),m=R.nz(-6,9);s={br:{k,m,e:k*(x+m)}};if(x+m===0)s.br.m+=1,s.br.e=k*(x+s.br.m);break}
 case'eq-word':{const f=R.int(0,2);x=-i(1,9);
  if(f===0){const a=i(2,6),b=i(2,15);s={a,b,c:0,d:a*x+b};text=`I think of a number, multiply it by ${a} and add ${b}. The answer is ${num(a*x+b)}. What was my number?`}
  else if(f===1){const c=i(1,4),a=c+i(1,4),b=i(1,12);s={a,b,c,d:(a-c)*x+b};text='Solve this tricky one. The answer is negative!'}
  else{x=i(2,15);const a=i(2,5),b=i(2,20);s={a,b,c:0,d:a*x+b};text=`A taxi charges ${b} coins to start plus ${a} coins per km. A ride costs ${a*x+b} coins. How many km was it?`}
  break}}
 if(s.br)x=s.br.e/s.br.k-s.br.m;else x=(s.d-s.b)/(s.a-s.c);
 const e=eqStr(s);const m0=eqMoves(s)[0];
 return mkQ({tag,key:e,ask:'Solve the equation',text,expr:e,ans:{type:'num',v:x,label:'x ='},data:{state:s},
  rule:'Whatever you do to one side, do to the other. Undo + with −, × with ÷.',first:`Start with: ${moveWhy(m0)}.`,sol:eqSolve(s).concat([`Answer: x = ${num(x)}`])})}};
/* restored from the live build */
GEN[5] = {
  tags: { "sim-elim": 1, "sim-sub": 2, "sim-word": 3, "sim-neg": 4 },
  gen(e) {
    const t = R.int;
    let s,
      a,
      n,
      i,
      o = [],
      r = ["x", "y"],
      l = "",
      c = "Add or subtract the clues to make one letter disappear. Then put the value back in to find the other.";
    switch (e) {
      case "sim-elim":
        if (R.chance(0.5))
          ((a = t(1, 8)),
            (s = a + t(1, 8)),
            (n = sStr(1, 1, s + a)),
            (i = sStr(1, -1, s - a)),
            (o = [
              `Add the clues: (x + y) + (x ${MI} y) = ${s + a} + ${s - a}`,
              `2x = ${2 * s}, so x = ${s}`,
              `Put x = ${s} into x + y = ${s + a}: y = ${a}`,
            ]));
        else {
          ((s = t(1, 9)), (a = t(1, 9)));
          const e = t(2, 4);
          ((n = sStr(e, 1, e * s + a)),
            (i = sStr(1, 1, s + a)),
            (o = [
              `Subtract the clues: (${e}x + y) ${MI} (x + y) = ${e * s + a} ${MI} ${s + a}`,
              `${e - 1 == 1 ? "" : e - 1}x = ${(e - 1) * s}, so x = ${s}`,
              `Put x = ${s} into x + y = ${s + a}: y = ${a}`,
            ]));
        }
        break;
      case "sim-sub": {
        const e = R.int(0, 1);
        if (((s = t(1, 9)), 0 === e)) {
          const e = t(2, 4);
          ((a = e * s),
            (n = `y = ${e}x`),
            (i = sStr(1, 1, s + a)),
            (o = [
              `Swap y for ${e}x in x + y = ${s + a}: x + ${e}x = ${s + a}`,
              `${e + 1}x = ${s + a}, so x = ${s}`,
              `y = ${e} ${TX} ${s} = ${a}`,
            ]));
        } else {
          const e = t(1, 6);
          ((a = s + e),
            (n = `y = x + ${e}`),
            (i = sStr(2, 1, 2 * s + a)),
            (o = [
              `Swap y for x + ${e}: 2x + x + ${e} = ${2 * s + a}`,
              `3x = ${2 * s + a - e}, so x = ${s}`,
              `y = ${s} + ${e} = ${a}`,
            ]));
        }
        c = "Substitution: one clue tells you what y equals. Swap it into the other clue.";
        break;
      }
      case "sim-word":
        if (0 === R.int(0, 1))
          ((a = t(5, 15)),
            (s = a + t(2, 9)),
            (r = ["s", "a"]),
            (n = sStr(1, 1, s + a, "s", "a")),
            (i = sStr(1, -1, s - a, "s", "a")),
            (l = `Sam (s) and Ali (a) have ages that add up to ${s + a}. Sam is ${s - a} years older than Ali.`),
            (o = [
              `Clue 1: s + a = ${s + a}. Clue 2: s ${MI} a = ${s - a}`,
              `Add them: 2s = ${2 * s}, so s = ${s}`,
              `a = ${s + a} ${MI} ${s} = ${a}`,
            ]));
        else {
          ((s = t(2, 9)), (a = t(1, 9)), (r = ["p", "r"]));
          const e = t(2, 3);
          ((n = sStr(e, 1, e * s + a, "p", "r")),
            (i = sStr(1, 1, s + a, "p", "r")),
            (l = `${e} pens and 1 ruler cost ${e * s + a} coins. 1 pen and 1 ruler cost ${s + a} coins. Find the price of a pen (p) and a ruler (r).`),
            (o = [
              `Subtract the clues: ${e - 1} pen${e - 1 > 1 ? "s" : ""} = ${e * s + a} ${MI} ${s + a} = ${(e - 1) * s}`,
              `p = ${s}`,
              `r = ${s + a} ${MI} ${s} = ${a}`,
            ]));
        }
        c = "Turn each sentence into an equation, then add or subtract to make one letter disappear.";
        break;
      case "sim-neg": {
        do {
          ((s = R.nz(-9, 9)), (a = R.nz(-9, 9)));
        } while (s > 0 && a > 0);
        const e = t(1, 3),
          r = t(1, 3),
          l = t(1, 3),
          c = R.chance(0.5) ? 1 : -1;
        ((n = sStr(e, l, e * s + l * a)),
          (i = sStr(r, c * l, r * s + c * l * a)),
          -1 === c
            ? (o = [
                `The y terms are opposite, so ADD the clues: ${e + r}x = ${num((e + r) * s)}`,
                `x = ${num(s)}`,
                `Put x = ${num(s)} into clue 1: ${1 === e ? "" : e}(${num(s)}) + ${1 === l ? "" : l}y = ${num(e * s + l * a)}, so y = ${num(a)}`,
              ])
            : e !== r
              ? (o = [
                  `The y terms match, so SUBTRACT the clues: ${e - r == 1 ? "" : e - r == -1 ? MI : num(e - r)}x = ${num((e - r) * s)}`,
                  `x = ${num(s)}`,
                  `Put x = ${num(s)} into clue 1 to get y = ${num(a)}`,
                ])
              : ((i = sStr(r, -l, r * s - l * a)),
                (o = [
                  `The y terms are opposite, so ADD the clues: ${2 * e}x = ${num(2 * e * s)}`,
                  `x = ${num(s)}`,
                  `Put x = ${num(s)} into clue 1 to get y = ${num(a)}`,
                ])));
        break;
      }
    }
    return mkQ({
      tag: e,
      key: n + "|" + i,
      ask: "Find both values",
      text: l,
      expr: n + "<br>" + i,
      ans: { type: "pair", vars: r, vals: [s, a] },
      data: { e1: n, e2: i, vars: r },
      rule: c,
      first: o[0],
      sol: o.concat([`Check in BOTH clues. Answer: ${r[0]} = ${num(s)}, ${r[1]} = ${num(a)}`]),
    });
  },
};
/* ---- Stage 7: expanding ---- */
GEN[6]={tags:{'exp-num':1,'exp-var':2,'exp-neg':3,'exp-big':4},
gen(tag){const i=R.int,v=R.pick(['x','y','a','m','n']);let k,ko,inner,terms,dis;
 switch(tag){
 case'exp-num':{k=i(2,9);const m=i(1,12);ko=String(k);inner=[[1,v],[m,'']];terms=[[k,v],[k*m,'']];dis=[[k+m,v],[m,''],[k*m,v],[k,v+'²'],[k+m,'']];break}
 case'exp-var':{k=i(2,6);const m=i(1,9);ko=k+v;inner=[[1,v],[m,'']];terms=[[k,mon(v,2)],[k*m,v]];dis=[[k,v],[k*m,''],[m,''],[k+m,v],[k*m,mon(v,2)],[k,mon(v,3)]];break}
 case'exp-neg':{k=i(2,6);const p=i(2,5),m=i(1,7);ko=k+v;inner=[[p,v],[-m,'']];terms=[[k*p,mon(v,2)],[-k*m,v]];dis=[[k*m,v],[k*p,v],[-m,''],[-k*m,''],[k+p,mon(v,2)],[-k*m,mon(v,2)]];break}
 case'exp-big':{k=i(2,6);const p=i(2,4),q=i(1,6)*R.sg();ko=k+v;inner=[[p,mon(v,2)],[q,v]];terms=[[k*p,mon(v,3)],[k*q,mon(v,2)]];dis=[[k*p,mon(v,2)],[k*q,v],[k*p,mon(v,4)],[-k*q,mon(v,2)],[q,v],[k+p,mon(v,3)]];break}}
 const e=`${ko}(${ex(inner)})`;const res=ex(terms);const p=parsePoly(res);
 const lbl=(t,first)=>first?trm(t[0],t[1],true):trm(t[0],t[1],false).trim().replace(/\s+/,'');
 const sol=[`Multiply ${ko} by the first term: ${ko} ${TX} ${trm(inner[0][0],inner[0][1],true)} = ${trm(terms[0][0],terms[0][1],true)}`,`Multiply ${ko} by the second term: ${ko} ${TX} ${pn(inner[1][0])}${inner[1][1]} = ${trm(terms[1][0],terms[1][1],true)}`,`Put them together: ${res}`];
 return mkQ({tag,key:e,ask:'Expand',expr:e,ans:{type:'poly',p,show:res},data:{outer:ko,need:[lbl(terms[0],true),lbl(terms[1],false)],
  wrong:R.shuffle(dis.map((t,j)=>lbl(t,j%2===0)).filter(s=>s!==lbl(terms[0],true)&&s!==lbl(terms[1],false))).slice(0,5)},
  rule:'Multiply the term outside by EVERY term inside the bracket. Letters multiply too: x × x = x².',first:sol[0],sol:sol.concat(['Answer: '+res])})}};
/* restored from the live build */
GEN[7] = {
  tags: { "fac-num": 1, "fac-var": 2, "fac-big": 3, "fac-sub": 4 },
  gen(e) {
    const t = R.int,
      s = R.pick(["x", "y", "a", "m", "n"]);
    let a, n, i, o;
    const r = () => {
      let e, s;
      do {
        ((e = t(1, 4)), (s = t(1, 9)));
      } while (1 !== gcd(e, s));
      return [e, s];
    };
    switch (e) {
      case "fac-num":
        ((a = t(2, 9)), (n = 0), (i = 1), (o = t(1, 9)));
        break;
      case "fac-var":
        ((a = t(2, 5)), (n = 1), (i = 1), (o = t(1, 9)));
        break;
      case "fac-big":
        ((a = t(3, 10)), (n = 1), ([i, o] = R.chance(0.5) ? [1, t(1, 9)] : r()), 1 !== gcd(i, o) && (i = 1));
        break;
      case "fac-sub":
        ((a = t(2, 9)), (n = 1), ([i, o] = R.chance(0.6) ? [1, t(1, 9)] : r()), 1 !== gcd(i, o) && (i = 1), (o = -o));
    }
    const l = a + (n ? s : ""),
      c = [
        [i, s],
        [o, ""],
      ],
      d = n
        ? [
            [a * i, mon(s, 2)],
            [a * o, s],
          ]
        : [
            [a * i, s],
            [a * o, ""],
          ],
      p = ex(d),
      h = `${l}(${ex(c)})`,
      u = parsePoly(p),
      m = new Set([l]),
      f = [];
    for (let e = 2; e < a; e++) a % e == 0 && f.push(e);
    const $ = [
      n ? String(a) : 2 * a + "",
      n ? s : "1",
      n && f.length ? f[0] + s : (f[0] || a + 1) + "",
      n ? a + mon(s, 2) : a + s,
      n ? 2 * a + s : a + 1 + "",
    ];
    for (const e of $) {
      if (m.size >= 4) break;
      e !== l && m.add(e);
    }
    const g = R.shuffle([...m]),
      b = [
        `HCF of the numbers ${a * i} and ${Math.abs(a * o)}: ${a}`,
        n ? `Both terms contain ${s}, so the HCF is ${l}` : `No letter in both terms, so the HCF is ${a}`,
        `Divide each term by ${l}: ${trm(d[0][0], d[0][1], !0)} ${DV} ${l} = ${trm(i, s, !0)}, ${trm(d[1][0], d[1][1], !0)} ${DV} ${l} = ${num(o)}`,
        `Check by expanding: ${l}(${ex(c)}) = ${p} \u2713`,
      ];
    return mkQ({
      tag: e,
      key: p,
      ask: "Factorise fully",
      expr: p,
      ans: { type: "factor", p: u, show: h },
      data: { hcf: l, opts: g, innerT: c, inner: parsePoly(ex(c)), innerS: ex(c), terms: d, k: a, hv: n, v: s },
      rule: "Find the HIGHEST common factor of every term (numbers AND letters), put it outside, and divide each term by it.",
      first: b[0] + (n ? ". Do both terms share a letter?" : "."),
      sol: b.concat(["Answer: " + h]),
    });
  },
};
/* ---- Stage 9: area ---- */
GEN[8]={tags:{'area-rect':1,'area-tri':2,'area-para':2,'area-budget':2,'area-trap':3,'area-comp':3,'area-alg':4},
gen(tag){const i=R.int;const mk=(shape,ans,sol,rule,first,text='',type='num')=>{const k=tag+JSON.stringify(shape)+text;
 return mkQ({tag,key:k,ask:'Find the area',text,expr:shapeName(shape.k),ans:type==='num'?{type:'num',v:ans,label:'Area ='}:{type:'poly',p:parsePoly(ans),show:fmtPoly(parsePoly(ans)),label:'Area ='},data:{shape},rule,first,sol:sol.concat(['Answer: '+(type==='num'?ans:fmtPoly(parsePoly(ans)))+(type==='num'?(text.includes('cost')?' coins':' m²'):'')])})};
 switch(tag){
 case'area-rect':{if(R.chance(.3)){const s=i(2,12);return mk({k:'sq',w:s,h:s},s*s,[`Square: side ${TX} side = ${s} ${TX} ${s}`],'Area of a square = side × side.',`${s} ${TX} ${s}.`)}
  const w=i(3,15),h=i(2,10);return mk({k:'rect',w,h},w*h,[`Rectangle: length ${TX} width = ${w} ${TX} ${h}`],'Area of a rectangle = length × width.',`Multiply ${w} ${TX} ${h}.`)}
 case'area-tri':{const b=2*i(2,8),h=i(2,12);return mk({k:'tri',b,h},b*h/2,[`Triangle: ½ ${TX} base ${TX} height`,`½ ${TX} ${b} ${TX} ${h} = ${b/2} ${TX} ${h}`],'Area of a triangle = ½ × base × PERPENDICULAR height.',`Half of the base is ${b/2}. Now times the height.`)}
 case'area-para':{const b=i(3,14),h=i(2,10),sl=h+i(1,3);return mk({k:'para',b,h,sl},b*h,[`Parallelogram: base ${TX} perpendicular height = ${b} ${TX} ${h}`,`(Ignore the slanted side ${sl} m!)`],'Area of a parallelogram = base × perpendicular height. Not the slanted side!',`Use the height ${h}, not the slant ${sl}.`)}
 case'area-budget':{const w=i(3,10),h=i(2,8),c=i(2,9);return mk({k:'rect',w,h},w*h*c,[`Area = ${w} ${TX} ${h} = ${w*h} m²`,`Cost = ${w*h} ${TX} ${c} = ${w*h*c} coins`],'First find the area, then multiply by the cost per m².',`Area first: ${w} ${TX} ${h}.`,`Turf costs ${c} coins per m². How much does it cost to cover this plot?`)}
 case'area-trap':{let a=i(2,10),b=i(a+1,a+8),h=i(2,10);if((a+b)*h%2)h++;return mk({k:'trap',a,b,h},(a+b)*h/2,[`Trapezium: ½(a + b) ${TX} h`,`a + b = ${a} + ${b} = ${a+b}`,`½ ${TX} ${a+b} ${TX} ${h} = ${(a+b)*h/2}`],'Area of a trapezium = ½(a + b)h. Add the parallel sides, halve, times the height.',`Add the parallel sides: ${a} + ${b} = ${a+b}.`)}
 case'area-comp':{const W=i(6,14),H=i(5,12),cw=i(2,W-3),ch=i(2,H-2);const A=W*H-cw*ch;return mk({k:'L',W,H,cw,ch},A,[`Think of the big rectangle: ${W} ${TX} ${H} = ${W*H}`,`Take away the missing corner: ${cw} ${TX} ${ch} = ${cw*ch}`,`${W*H} ${MI} ${cw*ch} = ${A}`],'Split a compound shape into rectangles, or take a missing rectangle away from a big one.',`Big rectangle: ${W} ${TX} ${H} = ${W*H}.`)}
 case'area-alg':{const f=R.int(0,2);
  if(f===0){const a=i(2,9),m=i(1,9);return mk({k:'rect',w:`x + ${m}`,h:String(a),alg:1},`${a}(x+${m})`,[`Area = ${a} ${TX} (x + ${m})`,`Expand: ${a}x + ${a*m}`],'Area = length × width, then expand the bracket.',`Write ${a}(x + ${m}), then expand.`,'','poly')}
  if(f===1){const a=i(2,5),m=i(1,9);return mk({k:'rect',w:`x + ${m}`,h:a+'x',alg:1},`${a}x(x+${m})`,[`Area = ${a}x ${TX} (x + ${m})`,`Expand: ${a}x² + ${a*m}x`],'Area = length × width, then expand the bracket.',`Write ${a}x(x + ${m}), then expand.`,'','poly')}
  const b=2*i(1,5),m=i(1,9);return mk({k:'tri',b:String(b),h:`x + ${m}`,alg:1},`${b/2}(x+${m})`,[`Area = ½ ${TX} ${b} ${TX} (x + ${m})`,`= ${b/2}(x + ${m})`,`Expand: ${trm(b/2,'x',true)} + ${b/2*m}`],'Triangle area = ½ × base × height, then expand.',`½ ${TX} ${b} = ${b/2}, so area = ${b/2}(x + ${m}).`,'','poly')}}}};
/* ---- Stage 10: algebraic fractions ---- */
GEN[9]={tags:{'frac-num':1,'frac-single':2,'frac-both':3,'frac-ind':4},
gen(tag){const i=R.int,v='x';let top,bot,res,steps=[],choice=null,ans,first,rule='Factorise the top and bottom, then cancel common factors.';
 const fx=(t,b)=>frac(t,b);
 switch(tag){
 case'frac-num':{let a,b;do{a=i(1,9);b=i(2,10)}while(gcd(a,b)!==1||a===b);const k=i(2,9);top=String(a*k);bot=String(b*k);ans={type:'frac',n:a,d:b};
  steps=[`Find the HCF of ${a*k} and ${b*k}: ${k}`,`Divide top and bottom by ${k}: ${fx(a,b)}`];rule='Divide the top and the bottom by their highest common factor.';first=`What is the HCF of ${a*k} and ${b*k}?`;
  return mkQ({tag,key:top+'/'+bot,ask:'Simplify',expr:fx(top,bot),ans,data:{steps:[{kind:'type',ans}]},rule,first,sol:steps.concat(['Answer: '+ansText(ans)])})}
 case'frac-single':{const f=R.int(0,2),k=i(2,9),m=i(1,9);
  if(f===0){top=ex([[k,v],[k*m,'']]);bot=String(k);res=`x+${m}`;const F=fx(`${k}(x + ${m})`,k);choice={opts:[F,fx(`${k}(x + ${k*m})`,k),fx(`${k}x + ${m}`,k)],i:0};steps=[`Factorise the top: ${F}`,`Cancel the ${k}s: x + ${m}`]}
  else if(f===1){const kk=i(2,6);top=ex([[kk,mon(v,2)],[kk*m,v]]);bot=kk+v;res=`x+${m}`;const F=fx(`${kk}x(x + ${m})`,kk+'x');choice={opts:[F,fx(`${kk}(x² + ${m}x)`,kk+'x'),fx(`${kk}x(x + ${kk*m})`,kk+'x')],i:0};steps=[`Factorise the top: ${F}`,`Cancel the ${kk}x: x + ${m}`]}
  else{let p,q;do{p=i(2,5);q=i(1,9)}while(gcd(p,q)!==1);const kk=i(2,5);top=ex([[kk*p,v],[kk*q,'']]);bot=String(kk);res=`${p}x+${q}`;const F=fx(`${kk}(${p}x + ${q})`,kk);choice={opts:[F,fx(`${kk}(${p}x + ${kk*q})`,kk),fx(`${kk*p}(x + ${q})`,kk)],i:0};steps=[`Factorise the top: ${F}`,`Cancel the ${kk}s: ${p}x + ${q}`]}
  first='Factorise the top first. Its HCF should match the bottom.';break}
 case'frac-both':{const f=R.int(0,2),m=i(1,9);
  if(f===0){const B=i(2,5),A=B*i(2,4);top=ex([[A,v],[A*m,'']]);bot=ex([[B,v],[B*m,'']]);res=String(A/B);const F=fx(`${A}(x + ${m})`,`${B}(x + ${m})`);
   choice={opts:[F,fx(`${A}(x + ${A*m})`,`${B}(x + ${B*m})`),fx(`${A}x + ${m}`,`${B}x + ${m}`)],i:0};steps=[`Factorise top and bottom: ${F}`,`Cancel (x + ${m}): ${fx(A,B)}`,`${A} ${DV} ${B} = ${A/B}`]}
  else if(f===1){top=ex([[1,mon(v,2)],[m,v]]);bot=ex([[1,v],[m,'']]);res='x';const F=fx(`x(x + ${m})`,`x + ${m}`);choice={opts:[F,fx(`x²(1 + ${m}x)`,`x + ${m}`),fx(`${m}x(x + 1)`,`x + ${m}`)],i:0};steps=[`Factorise the top: ${F}`,`Cancel (x + ${m}): x`]}
  else{const k=i(2,6);top=ex([[k,mon(v,2)],[k*m,v]]);bot=ex([[1,v],[m,'']]);res=k+'x';const F=fx(`${k}x(x + ${m})`,`x + ${m}`);choice={opts:[F,fx(`${k}(x² + ${m})`,`x + ${m}`),fx(`${k}x(x + ${k*m})`,`x + ${m}`)],i:0};steps=[`Factorise the top: ${F}`,`Cancel (x + ${m}): ${k}x`]}
  first='Factorise BOTH top and bottom. Look for a matching bracket to cancel.';break}
 case'frac-ind':{const f=R.int(0,2);
  if(f===0){const n=i(1,4),mm=n+i(1,5);top=mon(v,mm);bot=mon(v,n);res=`x^${mm-n}`;steps=[`Dividing powers: subtract ${mm} − ${n} = ${mm-n}`];rule='Dividing powers of the same letter: subtract the powers.';first=`Subtract the powers: ${mm} − ${n}.`}
  else if(f===1){const b=i(2,5),a=b*i(2,5),n=i(1,3),mm=n+i(1,4);top=a+mon(v,mm);bot=b+mon(v,n);res=`${a/b}x^${mm-n}`;steps=[`Divide the numbers: ${a} ${DV} ${b} = ${a/b}`,`Subtract the powers: ${mm} − ${n} = ${mm-n}`];rule='Divide the numbers, and subtract the powers.';first=`${a} ${DV} ${b} = ${a/b}. Now the powers.`}
  else{const k=i(2,5),m=i(1,9);top=ex([[k,mon(v,3)],[k*m,mon(v,2)]]);bot=k+v;res=`x^2+${m}x`;const F=fx(`${k}x²(x + ${m})`,`${k}x`);choice={opts:[F,fx(`${k}x(x² + ${k*m}x)`,`${k}x`),fx(`${k}(x³ + ${m}x²)`,`${k}x`)],i:0};
   steps=[`Factorise the top: ${F}`,`Cancel ${k}x, leaving x(x + ${m})`,`= x² + ${m}x`];first='Take out the highest common factor of the top.'}
  break}}
 const p=parsePoly(res);ans=P.isConst(p)?{type:'num',v:P.val(p)}:{type:'poly',p,show:fmtPoly(p)};
 const st=[];if(choice)st.push({kind:'choice',opts:R.shuffle(choice.opts.map((o,j)=>({o,ok:j===0})))});st.push({kind:'type',ans});
 return mkQ({tag,key:top+'/'+bot,ask:'Simplify',expr:frac(top,bot),ans,data:{steps:st},rule,first,sol:steps.concat(['Answer: '+ansText(ans)])})}};
const TAGNAMES={'neg-compare':'Comparing negatives','neg-add':'Adding to negatives','neg-sub':'Subtracting below zero','neg-subneg':'Subtracting a negative','neg-addneg':'Adding a negative','neg-mul':'Multiplying negatives','neg-div':'Dividing negatives','neg-word':'Negative word problems',
'bid-basic':'Order of × ÷ + −','bid-brackets':'Brackets first','bid-indices':'Indices in BIDMAS','bid-mixed':'Nested brackets & negatives',
'sub-one':'One-letter substitution','sub-two':'Two-letter substitution','sub-pow':'Powers & negatives','sub-formula':'Real-life formulas',
'ind-mul':'Multiplying powers','ind-div':'Dividing powers','ind-pow':'Power of a power','ind-zero':'The zero index','ind-coef':'Indices with numbers',
'eq-one':'One-step equations','eq-two':'Two-step equations','eq-both':'Unknowns on both sides','eq-brackets':'Equations with brackets','eq-word':'Equation word problems',
'sim-elim':'Elimination','sim-sub':'Substitution method','sim-word':'Forming equations from clues','sim-neg':'Negative solutions',
'exp-num':'Number × bracket','exp-var':'Letter × bracket','exp-neg':'Expanding with negatives','exp-big':'Bigger powers',
'fac-num':'Number HCF','fac-var':'Letter HCF','fac-big':'Bigger HCFs','fac-sub':'Factorising with subtraction',
'area-rect':'Rectangles & squares','area-tri':'Triangles','area-para':'Parallelograms','area-budget':'Area budgets','area-trap':'Trapeziums','area-comp':'Compound shapes','area-alg':'Algebraic areas',
'frac-num':'Cancelling number fractions','frac-single':'Factorise the top','frac-both':'Factorise top and bottom','frac-ind':'Fractions with indices'};
function tagsOfTier(s,t){return Object.entries(GEN[s].tags).filter(([k,v])=>v===t).map(([k])=>k)}
function genQ(s,tier,tag,seen){if(!tag)tag=R.pick(tagsOfTier(s,tier));let q,g=0;
 do{q=GEN[s].gen(tag);g++}while(seen&&seen.has(q.key)&&g<40);if(seen)seen.add(q.key);q.stage=s;q.tier=GEN[s].tags[tag];return q}
