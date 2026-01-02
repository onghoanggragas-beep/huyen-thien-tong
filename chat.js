let pid=null;
fetch("/api/enter").then(r=>r.json()).then(d=>{
  pid=d.playerId;log(d.intro);
});
function send(){
  const t=i.value; log("🧑 "+t);
  fetch("/api/talk",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({playerId:pid,npc:"master",message:t})})
  .then(r=>r.json()).then(d=>log("👴 "+d.reply));
  i.value="";
}
function cult(){
  fetch("/api/cultivate",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({playerId:pid})})
  .then(r=>r.json()).then(d=>{
    if(d.dead) log("💀 Tẩu hỏa nhập ma.");
    else log(`🧘 Cảnh giới: ${d.realm}`);
  });
}
function log(t){document.getElementById("log").innerHTML+=`<p>${t}</p>`;}
