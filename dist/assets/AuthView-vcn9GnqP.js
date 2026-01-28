import{c as u,o as s,r as L,n as S,h as g,a as v,b as a,d as y,t as f,m as j,e as k,u as m,F as q,f as A,p as b,g as V,w as I,i as w,j as M,v as E,k as N,l as U}from"./index-BHK97qKn.js";/* empty css             */import{t as F}from"./toastr-CY63SwY8.js";/* empty css                   */import"./_commonjsHelpers-CqkleIqs.js";const _={__name:"Button",props:{appearance:{type:String,default:"outline"},size:{type:String,default:"md"}},setup(e){return(o,l)=>(s(),u("button",{class:S(["ui-button",e.appearance,e.size]),onClick:l[0]||(l[0]=n=>o.$emit("click",n))},[L(o.$slots,"default")],2))}};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),D=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,l,n)=>n?n.toUpperCase():l.toLowerCase()),K=e=>{const o=D(e);return o.charAt(0).toUpperCase()+o.slice(1)},P=(...e)=>e.filter((o,l,n)=>!!o&&o.trim()!==""&&n.indexOf(o)===l).join(" ").trim(),C=e=>e==="";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=({name:e,iconNode:o,absoluteStrokeWidth:l,"absolute-stroke-width":n,strokeWidth:i,"stroke-width":c,size:d=h.width,color:t=h.stroke,...r},{slots:p})=>g("svg",{...h,...r,width:d,height:d,stroke:t,"stroke-width":C(l)||C(n)||l===!0||n===!0?Number(i||c||h["stroke-width"])*24/Number(d):i||c||h["stroke-width"],class:P("lucide",r.class,...e?[`lucide-${$(K(e))}-icon`,`lucide-${$(e)}`]:["lucide-icon"])},[...o.map(B=>g(...B)),...p.default?[p.default()]:[]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=(e,o)=>(l,{slots:n,attrs:i})=>g(Z,{...i,...l,iconNode:o,name:e},n);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=z("eye-closed",[["path",{d:"m15 18-.722-3.25",key:"1j64jw"}],["path",{d:"M2 8a10.645 10.645 0 0 0 20 0",key:"1e7gxb"}],["path",{d:"m20 15-1.726-2.05",key:"1cnuld"}],["path",{d:"m4 15 1.726-2.05",key:"1dsqqd"}],["path",{d:"m9 18 .722-3.25",key:"ypw2yx"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=z("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),T=["for"],Y={class:"input-wrapper"},G=["id","type","placeholder","value"],H={key:0,class:"ui-input-footer"},J={key:0,class:"ui-input-error"},Q={key:1,class:"ui-input-hint"},x={__name:"Input",props:{modelValue:String,label:String,placeholder:{type:String,default:"__hidden__"},type:{type:String,default:"text"},id:String,hint:String,error:String},emits:["update:modelValue"],setup(e,{emit:o}){const l=e,n=o,i=v(l.id||`input-${Math.random().toString(36).slice(2,10)}`),c=v(l.type);function d(){c.value=c.value==="password"?"text":"password"}return(t,r)=>(s(),u(q,null,[a("div",{class:S(["ui-input",e.error?"error":""])},[e.label?(s(),u("label",{key:0,for:i.value},f(e.label),9,T)):y("",!0),a("div",Y,[a("input",j({id:i.value,type:c.value,placeholder:e.placeholder,value:e.modelValue,onInput:r[0]||(r[0]=p=>n("update:modelValue",p.target.value)),class:e.placeholder=="__hidden__"?"placeholder-hidden":""},t.$attrs),null,16,G),l.type==="password"?(s(),u("button",{key:0,type:"button",onClick:r[1]||(r[1]=p=>d()),class:"ui-input-toggle"},[c.value==="password"?(s(),k(m(R),{key:0,height:"16"})):(s(),k(m(O),{key:1,height:"16"}))])):y("",!0)])],2),e.error||e.hint?(s(),u("div",H,[e.error?(s(),u("small",J,f(e.error),1)):y("",!0),e.hint?(s(),u("small",Q,f(e.hint),1)):y("",!0)])):y("",!0)],64))}},X={key:0,class:"content"},W={class:"form"},ee={key:0,class:"form__content"},te={class:"version"},le={key:1,class:"content not-auth"},ie={__name:"AuthView",setup(e){const o=N(),l=v(""),n=v(""),i=v(!0);A(()=>{b.value&&V.verify().then(d=>{d.valid?window.location.href="/dashboard":i.value=!1})});async function c(){const d=l.value,t=n.value;i.value=!0,V.login(d,t).then(r=>{if(r.error)F.error("Помилка авторизації"),i.value=!1;else{const p=o.query.redirect||"/dashboard";window.location.href=p}})}return(d,t)=>m(b)?(s(),u("div",X,[a("div",W,[t[7]||(t[7]=a("div",{class:"header"},[a("h2",null,"Lazni Kyiv"),a("p",null,"Адміністрування")],-1)),i.value?(s(),u("div",ee,t[2]||(t[2]=[a("span",{class:"loader"},null,-1)]))):(s(),u("form",{key:1,class:"form__content",onSubmit:I(c,["prevent"])},[t[4]||(t[4]=a("h2",null,"Вхід",-1)),t[5]||(t[5]=a("br",null,null,-1)),w(m(x),{label:"Логін",type:"email",placeholder:"example@laznikyiv.com",required:"",modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=r=>l.value=r)},null,8,["modelValue"]),w(m(x),{label:"Пароль",type:"password",placeholder:"lazni123",required:"",modelValue:n.value,"onUpdate:modelValue":t[1]||(t[1]=r=>n.value=r)},null,8,["modelValue"]),t[6]||(t[6]=a("br",null,null,-1)),w(m(_),null,{default:M(()=>t[3]||(t[3]=[U(" Увійти ")])),_:1}),a("small",te," v "+f(m(E))+" © "+f(new Date().getFullYear())+" Lazni Kyiv ",1)],32))])])):(s(),u("div",le,t[8]||(t[8]=[a("h1",null,"Lazni Kyiv",-1),a("p",null,"Доступ до панелі адміністрування заблоковано",-1)])))}};export{ie as default};
