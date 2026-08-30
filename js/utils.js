export function showToast(message,type="info"){const host=document.getElementById("toastHost");if(!host){alert(message);return}const el=document.createElement("div");el.className="qs-toast";el.textContent=message;host.appendChild(el);if(window.gsap)gsap.fromTo(el,{opacity:0,y:15},{opacity:1,y:0,duration:.25});setTimeout(()=>{if(window.gsap)gsap.to(el,{opacity:0,y:10,duration:.2,onComplete:()=>el.remove()});else el.remove()},3000)}
export function statusBadge(status){return `<span class="badge-status status-${status}">${status.replace("_"," ")}</span>`}
export function priorityBadge(priority){return `<span class="badge-status priority-${priority}">${priority}</span>`}
export function initials(name="User"){return name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}
export function ticketId(){return `QS-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}`}
export function escapeHTML(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
export function getQuery(name){return new URLSearchParams(location.search).get(name)}
export async function requireUser(supabase,role=null){const {data:{user},error}=await supabase.auth.getUser();if(error||!user){location.href="auth.html";return null}const {data:profile}=await supabase.from("profiles").select("*").eq("id",user.id).single();if(role&&profile?.role!==role){location.href=profile?.role==="provider"?"provider-dashboard.html":"dashboard.html";return null}return {user,profile}}
export function setupMenu(){const b=document.getElementById("menuBtn"),s=document.getElementById("sidebar");if(b&&s)b.onclick=()=>s.classList.toggle("open")}
