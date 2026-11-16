const SECRET="بحبك", START="2026-04-22T00:00:00", $=id=>document.getElementById(id);
let start=new Date(START);
try{const s=localStorage.getItem("os_start");if(s)start=new Date(s)}catch(e){}
/* hearts */
const HC=["💗","🤍","💕","🩷","🤎"];
setInterval(()=>{if(document.hidden)return;const h=document.createElement("span");h.className="h";h.textContent=HC[Math.random()*5|0];
h.style.cssText=`left:${Math.random()*100}%;font-size:${10+Math.random()*16}px;animation-duration:${6+Math.random()*6}s`;
$("hearts").appendChild(h);setTimeout(()=>h.remove(),12500)},700);
/* gate */
const norm=s=>s.trim().replace(/\s+/g,"").toLowerCase();
function typeInto(el,text,cb){let i=0;el.textContent="";(function t(){if(i<=text.length){el.textContent=text.slice(0,i++);setTimeout(t,45)}else cb&&cb()})()}
const steps=[["🥺","عملتلك المكان ده عشان أصالحك...","حقك عليا، ووحشتني ضحكتك وكلامك أكتر من أي حاجة ❤"],["🥹","أنا غلطت، وبعترف بده من قلبي.","ومش عاوز حاجة غير إننا نرجع زي ما كنا، وأحسن كمان."]];
function runStep(n){const s=steps[n];$("em").textContent=s[0];$("l1").textContent="";$("l2").textContent="";
 typeInto($("l1"),s[1],()=>typeInto($("l2"),s[2],()=>{if(n<steps.length-1)setTimeout(()=>runStep(n+1),1400);else $("enter").style.visibility="visible"}))}
$("gate").addEventListener("submit",e=>{e.preventDefault();
 if(norm($("sw").value)!==norm(SECRET)){$("err").textContent="الكلمة مش صح، جربي تاني 🤍";return}
 $("err").textContent="";$("stage").classList.add("opened");document.body.classList.add("op");$("gate").style.visibility="hidden";
 setTimeout(()=>{$("note").classList.add("on");runStep(0)},1500)});
function askWord(){if($("stage").classList.contains("opened")||$("gate").classList.contains("show"))return;$("stage").classList.add("on");$("hint").style.display="none";$("gate").classList.add("show");$("sw").focus()}
$("stage").addEventListener("click",askWord);$("stage").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();askWord()}});
$("enter").addEventListener("click",()=>{$("note").classList.remove("on");$("intro").classList.add("off");$("main").classList.add("on");$("mini").classList.add("on");au.play().catch(()=>{})});
/* counter */
function tick(){let d=Math.max(0,Date.now()-start),s=d/1e3|0;$("cs").textContent=s%60;$("cm").textContent=(s/60|0)%60;$("ch").textContent=(s/3600|0)%24;$("cd").textContent=s/86400|0}
tick();setInterval(tick,1000);
$("setd").onclick=()=>{const v=$("sd").value;if(!v)return;start=new Date(v+"T00:00:00");try{localStorage.setItem("os_start",start.toISOString())}catch(e){}tick()};
/* edit mode */
$("editBtn").onclick=()=>{const on=$("main").classList.toggle("editing");$("editBtn").textContent=on?"✓ تم":"✎ تعديل";
 document.querySelectorAll("#main [data-e]").forEach(e=>e.contentEditable=on)};
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ed=()=>$("main").classList.contains("editing")?' contenteditable="true"':"";
$("addm").onclick=()=>{const t=$("mt").value.trim(),d=$("md").value;if(!t)return;
 $("miles").insertAdjacentHTML("beforeend",`<div class="mile"><span data-e${ed()}>${esc(t)}</span><br><small>${esc(d||"")}</small></div>`);$("mt").value=""};
$("addmsg").onclick=()=>{const t=$("mi").value.trim();if(!t)return;
 $("msgs").insertAdjacentHTML("beforeend",`<div class="bub"><small>${esc($("main").querySelectorAll("h1 span")[1].textContent)}</small><span data-e${ed()}>${esc(t)}</span></div>`);$("mi").value=""};
$("cmpBtn").onclick=()=>{const c=$("cmpBtn").closest(".card"),on=c.classList.toggle("composing");$("cmpBtn").textContent=on?"✓ تم":"✎ ادخل وضع التعديل لكتابة رسالة";if(on)$("mi").focus()};
$("mi").addEventListener("keydown",e=>{if(e.key==="Enter")$("addmsg").click()});
/* gift */
$("gift").onclick=()=>{const g=$("gift");g.classList.remove("open");void g.offsetWidth;g.classList.add("open");g.textContent="💝";$("gimg").hidden=false;$("gimg").scrollIntoView({behavior:"smooth",block:"nearest"});
 if($("gnote").textContent.trim()==="اضغطي هنا")$("gnote").textContent="إنتِ أحلى حاجة حصلت في حياتي 🤍 وجودك جنبي بيخلّيني أحس إن الدنيا كلها بخير. سامحيني يا روح قلبي، ووعد مني أحافظ عليكي طول عمري ❤️"};
/* photos */
$("addp").onclick=()=>$("pf").click();
$("pf").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{
 const c=document.createElement("canvas"),k=Math.min(1,900/im.width);c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);
 $("photos").insertAdjacentHTML("beforeend",`<figure class="photo"><img alt="" src="${c.toDataURL("image/jpeg",.8)}"><figcaption data-e${ed()}>اكتبي تعليق 🤍</figcaption></figure>`)};im.src=r.result};r.readAsDataURL(f);e.target.value=""};
/* music */
const au=$("au");let hasSong=true;
function pick(){$("sf").click()}
$("pickS").onclick=pick;$("ic").onclick=pick;
$("sf").onchange=e=>{const f=e.target.files[0];if(!f)return;au.src=URL.createObjectURL(f);hasSong=true;$("sn").textContent=f.name.replace(/\.[^.]+$/,"");au.play().catch(()=>{})};
$("pp").onclick=()=>{if(!hasSong){pick();return}au.paused?au.play():au.pause()};
au.onplay=()=>{$("pp").textContent="❚❚";$("mini").classList.add("play")};
au.onpause=()=>{$("pp").textContent="▶";$("mini").classList.remove("play")};
/* edit password */
const EDIT_PASS="2204";let unlocked=false,pend=null;
function guard(f){if(unlocked){f();return}pend=f;$("pwi").value="";$("pwe").textContent="";$("pw").classList.add("on");$("pwi").focus()}
$("pwc").onclick=()=>{pend=null;$("pw").classList.remove("on")};
$("pwf").addEventListener("submit",e=>{e.preventDefault();if(norm($("pwi").value)!==norm(EDIT_PASS)){$("pwe").textContent="كلمة السر غلط";return}unlocked=true;$("pw").classList.remove("on");const f=pend;pend=null;f&&f()});
[["editBtn",()=>$("main").classList.contains("editing")],["cmpBtn",()=>$("cmpBtn").closest(".card").classList.contains("composing")],["pickS",()=>false],["ic",()=>false]].forEach(([id,isOn])=>{const el=$(id),f=el.onclick;el.onclick=ev=>{if(isOn())f.call(el,ev);else guard(()=>f.call(el,ev))}});
