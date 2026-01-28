import{c as u,o as s,r as j,n as z,h as g,a as f,b as a,d as v,t as y,m as q,e as k,u as p,F as A,f as I,p as b,g as V,w as M,i as w,j as E,v as $,k as F,l as N}from"./index-DfC6sHtH.js";/* empty css             */import{t as U}from"./toastr-CY63SwY8.js";/* empty css                   */import"./_commonjsHelpers-CqkleIqs.js";const D={__name:"Button",props:{appearance:{type:String,default:"outline"},size:{type:String,default:"md"}},setup(e){return(n,l)=>(s(),u("button",{class:z(["ui-button",e.appearance,e.size]),onClick:l[0]||(l[0]=o=>n.$emit("click",o))},[j(n.$slots,"default")],2))}};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),K=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(n,l,o)=>o?o.toUpperCase():l.toLowerCase()),P=e=>{const n=K(e);return n.charAt(0).toUpperCase()+n.slice(1)},Y=(...e)=>e.filter((n,l,o)=>!!n&&n.trim()!==""&&o.indexOf(n)===l).join(" ").trim(),x=e=>e==="";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=({name:e,iconNode:n,absoluteStrokeWidth:l,"absolute-stroke-width":o,strokeWidth:i,"stroke-width":c,size:d=h.width,color:t=h.stroke,...r},{slots:m})=>g("svg",{...h,...r,width:d,height:d,stroke:t,"stroke-width":x(l)||x(o)||l===!0||o===!0?Number(i||c||h["stroke-width"])*24/Number(d):i||c||h["stroke-width"],class:Y("lucide",r.class,...e?[`lucide-${C(P(e))}-icon`,`lucide-${C(e)}`]:["lucide-icon"])},[...n.map(L=>g(...L)),...m.default?[m.default()]:[]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(e,n)=>(l,{slots:o,attrs:i})=>g(Z,{...i,...l,iconNode:n,name:e},o);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=B("eye-closed",[["path",{d:"m15 18-.722-3.25",key:"1j64jw"}],["path",{d:"M2 8a10.645 10.645 0 0 0 20 0",key:"1e7gxb"}],["path",{d:"m20 15-1.726-2.05",key:"1cnuld"}],["path",{d:"m4 15 1.726-2.05",key:"1dsqqd"}],["path",{d:"m9 18 .722-3.25",key:"ypw2yx"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=B("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),T=["for"],_={class:"input-wrapper"},G=["id","type","placeholder","value"],H={key:0,class:"ui-input-footer"},J={key:0,class:"ui-input-error"},Q={key:1,class:"ui-input-hint"},S={__name:"Input",props:{modelValue:String,label:String,placeholder:{type:String,default:"__hidden__"},type:{type:String,default:"text"},id:String,hint:String,error:String},emits:["update:modelValue"],setup(e,{emit:n}){const l=e,o=n,i=f(l.id||`input-${Math.random().toString(36).slice(2,10)}`),c=f(l.type);function d(){c.value=c.value==="password"?"text":"password"}return(t,r)=>(s(),u(A,null,[a("div",{class:z(["ui-input",e.error?"error":""])},[e.label?(s(),u("label",{key:0,for:i.value},y(e.label),9,T)):v("",!0),a("div",_,[a("input",q({id:i.value,type:c.value,placeholder:e.placeholder,value:e.modelValue,onInput:r[0]||(r[0]=m=>o("update:modelValue",m.target.value)),class:e.placeholder=="__hidden__"?"placeholder-hidden":""},t.$attrs),null,16,G),l.type==="password"?(s(),u("button",{key:0,type:"button",onClick:r[1]||(r[1]=m=>d()),class:"ui-input-toggle"},[c.value==="password"?(s(),k(p(R),{key:0,height:"16"})):(s(),k(p(O),{key:1,height:"16"}))])):v("",!0)])],2),e.error||e.hint?(s(),u("div",H,[e.error?(s(),u("small",J,y(e.error),1)):v("",!0),e.hint?(s(),u("small",Q,y(e.hint),1)):v("",!0)])):v("",!0)],64))}},X={key:0,class:"content"},W={class:"form"},ee={key:0,class:"form__content"},te={class:"version"},le={key:1,class:"content not-auth"},ie={__name:"AuthView",setup(e){const n=F(),l=f(""),o=f(""),i=f(!0);I(()=>{b.value&&V.verify().then(d=>{d.valid?window.location.href="/dashboard":i.value=!1})});async function c(){const d=l.value,t=o.value;i.value=!0,V.login(d,t).then(r=>{if(r.error)U.error("Помилка авторизації"),i.value=!1;else{const m=n.query.redirect||"/dashboard";window.location.href=m}})}return(d,t)=>p(b)?(s(),u("div",X,[a("div",W,[t[7]||(t[7]=a("div",{class:"header"},[a("h2",null,"Lazni Kyiv"),a("p",null,"Адміністрування")],-1)),i.value?(s(),u("div",ee,t[2]||(t[2]=[a("span",{class:"loader"},null,-1)]))):(s(),u("form",{key:1,class:"form__content",onSubmit:M(c,["prevent"])},[t[4]||(t[4]=a("h2",null,"Вхід",-1)),t[5]||(t[5]=a("br",null,null,-1)),w(p(S),{label:"Логін",type:"email",placeholder:"example@laznikyiv.com",required:"",modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=r=>l.value=r)},null,8,["modelValue"]),w(p(S),{label:"Пароль",type:"password",placeholder:"lazni123",required:"",modelValue:o.value,"onUpdate:modelValue":t[1]||(t[1]=r=>o.value=r)},null,8,["modelValue"]),t[6]||(t[6]=a("br",null,null,-1)),w(p(D),null,{default:E(()=>t[3]||(t[3]=[N(" Увійти ")])),_:1}),a("small",te," v "+y(p($))+" © "+y(new Date().getFullYear())+" Lazni Kyiv ",1)],32))])])):(s(),u("div",le,[t[8]||(t[8]=a("h1",null,"401",-1)),t[9]||(t[9]=a("p",null,"Доступ до панелі адміністрування заблоковано",-1)),a("span",null,y(p($))+" © "+y(new Date().getFullYear())+" Lazni Kyiv",1)]))}};export{ie as default};
