import {supabase} from "./supabase.js";import {showToast} from "./utils.js";
const $=id=>document.getElementById(id), loginForm=$("loginForm"),registerForm=$("registerForm");
function setMode(register){$("loginTab").classList.toggle("active",!register);$("registerTab").classList.toggle("active",register);loginForm.classList.toggle("d-none",register);registerForm.classList.toggle("d-none",!register)}
$("loginTab").onclick=()=>setMode(false);$("registerTab").onclick=()=>setMode(true);setMode(new URLSearchParams(location.search).get("mode")==="register");
$("regRole").onchange=()=>$("providerFields").classList.toggle("d-none",$("regRole").value!=="provider");
function msg(text,ok=false){$("authMessage").innerHTML=`<div class="alert ${ok?"alert-success":"alert-danger"} py-2 small">${text}</div>`}
async function routeUser(){const {data:{user}}=await supabase.auth.getUser();if(!user)return;const {data:p}=await supabase.from("profiles").select("role").eq("id",user.id).single();if(p?.role)location.href=p.role==="provider"?"provider-dashboard.html":"dashboard.html"}
loginForm.onsubmit=async e=>{e.preventDefault();const {error}=await supabase.auth.signInWithPassword({email:$("loginEmail").value.trim(),password:$("loginPassword").value});if(error){msg(error.message);return}await routeUser()};
registerForm.onsubmit=async e=>{e.preventDefault();const role=$("regRole").value;const {data,error}=await supabase.auth.signUp({email:$("regEmail").value.trim(),password:$("regPassword").value,options:{data:{full_name:$("regName").value.trim(),role}}});if(error){msg(error.message);return}if(!data.user){msg("Registration completed. Check your email to confirm your account.",true);return}
const {error:pe}=await supabase.from("profiles").upsert({id:data.user.id,full_name:$("regName").value.trim(),email:$("regEmail").value.trim(),role});if(pe){msg(pe.message);return}
if(role==="provider"){const {error:ve}=await supabase.from("providers").insert({user_id:data.user.id,name:$("regName").value.trim(),service_category:$("regService").value,location:$("regLocation").value.trim(),experience:Number($("regExperience").value)||0,price:Number($("regPrice").value)||0,rating:5,description:$("regDescription").value.trim()});if(ve){msg(ve.message);return}}
if(data.session){location.href=role==="provider"?"provider-dashboard.html":"dashboard.html"}else msg("Account created. Please confirm your email, then log in.",true)};
routeUser();
