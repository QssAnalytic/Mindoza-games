const {chromium}=require('playwright');const O=require('path').resolve('tests/shots')+'/';require('fs').mkdirSync(O,{recursive:true});const PAGE='file://'+require('path').resolve(process.argv[2]||'dist/test.html');const SH=process.argv[3]||'x';
const log=[];const ok=(c,m)=>{log.push((c?'PASS ':'FAIL ')+m)};
async function newp(b,w=1200,h=900){const p=await b.newPage({viewport:{width:w,height:h}});p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await p.goto(PAGE);await p.waitForTimeout(500);return p}
async function signup(p,u){await p.click('text=Sign up').catch(()=>{});await p.fill('#afName',u);await p.fill('#afUser',u);await p.fill('#afPass','testpass1');await p.click('#afGo');await p.waitForFunction(()=>VIEW!=='auth',null,{timeout:20000});await p.waitForTimeout(300);await p.evaluate(()=>closeModal())}
(async()=>{const b=await chromium.launch();const sfx=String(Date.now()%100000);const A='ali'+sfx,B='bob'+sfx;
 const pa=await newp(b);await signup(pa,A);
 await pa.evaluate(()=>{S.coins=200;S.owned.push('trail6','hat7');S.av.trail=6;S.av.hat=7;S.av.skin=0;save();go('map')});await pa.waitForTimeout(800);
 const hero=await pa.$('.hero-drag');ok(!!hero,'map hero is draggable');
 const bb=await hero.boundingBox();await pa.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await pa.mouse.down();for(let i=0;i<14;i++){await pa.mouse.move(bb.x+bb.width/2+i*14,bb.y+bb.height/2+i*6);await pa.waitForTimeout(25)}
 await pa.screenshot({path:O+SH+'_drag.png',clip:{x:Math.max(0,bb.x-150),y:Math.max(0,bb.y-120),width:520,height:360}});await pa.mouse.up();
 ok(await pa.evaluate(()=>document.querySelectorAll('.trail-fx > g').length)>3,'trail particles follow the character');
 await pa.waitForTimeout(1500);ok(await pa.evaluate(()=>document.querySelectorAll('.trail-fx > g').length)<12,'trail fades away after stopping');
 // vault: algebra
 const c0=await pa.evaluate(()=>S.coins);
 await pa.evaluate(()=>{window.__vdone=null;vaultAsk('algebra',5,ok=>window.__vdone=ok)});await pa.waitForTimeout(600);await pa.screenshot({path:O+SH+'_vault_q.png'});
 await pa.evaluate(()=>{const i=__vq.opts.indexOf(__vq.a);document.querySelectorAll('#vQ .super-opt')[i].click()});await pa.waitForTimeout(2600);await pa.screenshot({path:O+SH+'_vault_open.png'});
 const n=await pa.evaluate(()=>document.querySelectorAll('.coin-big').length);ok(n>=2&&n<=5,'vault spills '+n+' coins');
 for(const c of await pa.$$('.coin-big')){await c.click({force:true});await pa.waitForTimeout(120)}await pa.waitForTimeout(1400);
 const c1=await pa.evaluate(()=>S.coins);ok(c1-c0===n,`collected coins add up (${c1-c0} of ${n})`);await pa.screenshot({path:O+SH+'_vault_done.png'});
 await pa.click('#vNext');await pa.waitForTimeout(200);ok(await pa.evaluate(()=>window.__vdone===true),'vault continues the game');
 // wrong answer keeps the vault shut
 await pa.evaluate(()=>{vaultAsk('ict',3,()=>{})});await pa.waitForTimeout(500);await pa.evaluate(()=>{const i=__vq.opts.findIndex(o=>o!==__vq.a);document.querySelectorAll('#vQ .super-opt')[i].click()});await pa.waitForTimeout(800);
 ok(await pa.evaluate(()=>!document.querySelector('.vault.v-open')&&!document.querySelector('.coin-big')),'wrong answer keeps vault locked');await pa.screenshot({path:O+SH+'_vault_no.png'});await pa.evaluate(()=>closeModal());
 for(const g of ['sci','phy','chem','bio','spa']){await pa.evaluate(g=>{window.__vq=null;vaultAsk(g,2,()=>{})},g);await pa.waitForTimeout(250);ok(await pa.evaluate(()=>!!window.__vq&&document.querySelectorAll('#vQ .super-opt').length>=3),'vault question for '+g);await pa.evaluate(()=>closeModal())}
 // vault hooks in real play (world 6 forces one)
 await pa.evaluate(()=>{S.cleared=S.cleared.map((c,i)=>i<5);startStage(5)});await pa.waitForTimeout(800);let seen=false;
 for(let k=0;k<12&&!seen;k++){await pa.evaluate(()=>{closeModal();nextQ()});await pa.waitForTimeout(150);seen=await pa.evaluate(()=>!!document.querySelector('.vaultbox'))}
 ok(seen,'Mystery Mansion run shows the vault');await pa.evaluate(()=>{closeModal();go('home')});
 // super is 10 s, doors every 30
 ok(await pa.evaluate(()=>{const r={};S.doorN=28;const a=doorDue(r,10);const b=doorDue(r,10);return!a&&b}),'door shows on the 30th question');
 await pa.evaluate(()=>superAsk('algebra',0,()=>{}));await pa.waitForTimeout(300);ok(/10 seconds/.test(await pa.evaluate(()=>document.querySelector('#sqFlash').textContent)),'super question says 10 seconds');await pa.evaluate(()=>closeModal());
 // shop hats and trails
 await pa.evaluate(()=>{SHOPTAB='hat';go('shop')});await pa.waitForTimeout(400);await pa.screenshot({path:O+SH+'_shop_hats.png',fullPage:true});
 await pa.evaluate(()=>{SHOPTAB='trail';go('shop')});await pa.waitForTimeout(400);await pa.screenshot({path:O+SH+'_shop_trails.png',fullPage:true});
 const aid=await pa.evaluate(()=>NET.user.id);
 // friends
 const pb=await newp(b);await signup(pb,B);
 await pa.evaluate(()=>go('friends'));await pa.waitForTimeout(500);await pa.fill('#frQ',B.slice(0,5)).catch(()=>{});await pa.fill('#frQ',B);await pa.click('#frGo');await pa.waitForTimeout(800);
 await pa.screenshot({path:O+SH+'_friends_search.png'});const add=await pa.$('[data-add]');ok(!!add,'search finds the other player');if(add){await add.click();await pa.waitForTimeout(800)}
 await pb.evaluate(()=>go('friends'));await pb.waitForTimeout(1000);ok(!!(await pb.$('[data-acc]')),'request arrives');await pb.screenshot({path:O+SH+'_friends_req.png'});
 const acc=await pb.$('[data-acc]');if(acc){await acc.click();await pb.waitForTimeout(900)}
 await pa.evaluate(()=>go('friends'));await pa.waitForTimeout(900);ok((await pa.evaluate(()=>document.querySelectorAll('[data-rm]').length))===1,'now friends');await pa.screenshot({path:O+SH+'_friends_list.png'});
 // admin gift
 const pc=await newp(b);await pc.click('text=Sign in').catch(()=>{});await pc.evaluate(()=>{AUTHTAB='in'});
 const r=await pc.evaluate(async([u,pw])=>{const d=await NET.call('/api/login',{method:'POST',body:{username:u,password:pw}});NET.adopt(d);go('admin');return d.user.admin},[process.env.ADMIN_USER||'boss',process.env.ADMIN_PASS||'secretpass1']);ok(r,'admin signed in');await pc.waitForTimeout(800);
 await pc.evaluate(id=>playerDetail(id),aid);await pc.waitForTimeout(1500);ok(!!(await pc.$('#admGift')),'admin sees Give coins');
 await pc.fill('#agN','25');await pc.fill('#agNote','Great work!');await pc.click('#agGo');await pc.waitForTimeout(800);await pc.screenshot({path:O+SH+'_admin_gift.png'});
 ok(/Sent 25/.test(await pc.evaluate(()=>document.querySelector('#agMsg').textContent)),'gift sent');
 const g0=await pa.evaluate(()=>S.coins);await pa.evaluate(()=>go('home'));await pa.waitForTimeout(1800);ok(!!(await pa.$('#gBox')),'player gets the present');await pa.screenshot({path:O+SH+'_gift_box.png'});
 await pa.click('#gBox',{force:true});await pa.waitForTimeout(1600);await pa.screenshot({path:O+SH+'_gift_open.png'});for(const c of await pa.$$('.coin-big')){await c.click({force:true});await pa.waitForTimeout(100)}await pa.waitForTimeout(1500);
 ok((await pa.evaluate(()=>S.coins))-g0===25,'gift coins added: '+((await pa.evaluate(()=>S.coins))-g0));await pa.evaluate(()=>closeModal());
 await pa.evaluate(()=>go('home'));await pa.waitForTimeout(1500);ok(!(await pa.$('#gBox')),'gift is not given twice');
 // mobile
 const pm=await b.newPage({viewport:{width:390,height:844}});pm.errs=[];pm.on('pageerror',e=>pm.errs.push(e.message));await pm.goto(PAGE);await pm.waitForTimeout(400);await signup(pm,'mo'+sfx);
 await pm.evaluate(()=>{vaultAsk('algebra',2,()=>{})});await pm.waitForTimeout(500);await pm.evaluate(()=>{const i=__vq.opts.indexOf(__vq.a);document.querySelectorAll('#vQ .super-opt')[i].click()});await pm.waitForTimeout(2600);await pm.screenshot({path:O+SH+'_m_vault.png'});
 await pm.evaluate(()=>{closeModal();go('friends')});await pm.waitForTimeout(600);await pm.screenshot({path:O+SH+'_m_friends.png'});
 for(const p of [pa,pb,pc,pm])ok(!p.errs.length,'no page errors '+p.errs.join(' | '));
 console.log(log.join('\n'));await b.close()})().catch(e=>{console.log(log.join('\n'));console.log('CRASH',e.message);process.exit(1)});