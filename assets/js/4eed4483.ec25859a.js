"use strict";(self.webpackChunkarrow_website=self.webpackChunkarrow_website||[]).push([[2119,3169],{45104:(e,t,i)=>{i.d(t,{j:()=>n});i(67294);var r=i(33692);const a={wrapperContainer:"wrapperContainer_h3Ft",container:"container_maos",ctaList:"ctaList_bsH0"};var s=i(85893);function n(e){let{title:t,ctaList:i,className:n}=e;return(0,s.jsx)("div",{className:`${a.wrapperContainer} ${n}`,children:(0,s.jsxs)("div",{className:`container ${a.container}`,children:[(0,s.jsx)("h1",{children:t}),(0,s.jsx)("div",{className:a.ctaList,children:i&&i.map((e=>{let{title:t,href:i}=e;return(0,s.jsx)(r.Z,{href:i,className:"button button--primary",children:t},t)}))})]})})}},8730:(e,t,i)=>{i.d(t,{T:()=>o});i(67294);var r=i(33692),a=i(44996);const s={borderlessCard:"borderlessCard_sjEN",infoMode:"infoMode_oa1U",icon:"icon_c5iy",cardHeader:"cardHeader_Melu",title:"title_AiRZ",cardBody:"cardBody__x5U",cardFooter:"cardFooter_BYOD",link:"link_YPJo"};var n=i(85893);function o(e){let{title:t,icon:i,href:o,body:c}=e;const l=!o,d=l?"64px":"32px";return(0,n.jsxs)("div",{className:`card ${s.borderlessCard} ${l&&s.infoMode}`,children:[(0,n.jsxs)("div",{className:`card__header ${s.cardHeader}`,children:[(0,n.jsx)("img",{className:s.icon,src:(0,a.Z)(`/img/${i}`),alt:`${t} category`,title:`${t} category`,height:d,width:d}),(0,n.jsx)("h3",{className:s.title,children:t})]}),(0,n.jsx)("div",{className:`card__body ${s.cardBody}`,children:(0,n.jsx)("p",{children:c})}),!l&&(0,n.jsx)("div",{className:`card__footer ${s.cardFooter}`,children:(0,n.jsx)("strong",{children:(0,n.jsx)(r.Z,{href:o,className:s.link,children:"Learn more"})})})]})}},78914:(e,t,i)=>{i.d(t,{V:()=>s});i(67294);const r={hero:"hero_wgFg",container:"container_Iw7w",subtitle:"subtitle_oBSE",ctaList:"ctaList_HWQC"};var a=i(85893);function s(e){let{title:t,subtitle:i,ctaList:s,className:n}=e;return(0,a.jsx)("div",{className:`hero ${r.hero} ${n}`,children:(0,a.jsxs)("div",{className:`container ${r.container}`,children:[(0,a.jsx)("h1",{className:"hero__title",children:t}),i&&(0,a.jsx)("h2",{className:r.subtitle,children:i})]})})}},66569:(e,t,i)=>{i.d(t,{k:()=>m});i(67294);var r=i(33692),a=i(44996);const s="linkCard_uxt7",n="icon_lqTJ",o="cardHeader_NaDd",c="cardBody_svEQ",l="paragraph_UbEf";var d=i(85893);function h(e){let{href:t,children:i}=e;return(0,d.jsx)(r.Z,{href:t,className:s,children:i})}function u(e){let{title:t,icon:i,body:r}=e;return(0,d.jsxs)("div",{className:"card",children:[(0,d.jsxs)("div",{className:`card__header ${o}`,children:[(0,d.jsx)("img",{className:n,src:(0,a.Z)(`/img/${i}`),alt:`${t} category`,title:`${t} category`,width:"48px",height:"48px"}),(0,d.jsx)("h2",{title:t,className:"text--truncate",children:t})]}),(0,d.jsx)("div",{className:`card__body ${c}`,children:(0,d.jsx)("p",{className:`${l}`,children:r})})]})}const m=e=>(0,d.jsx)(h,{href:e.href,children:(0,d.jsx)(u,{...e})})},95784:(e,t,i)=>{i.r(t),i.d(t,{default:()=>r.default});var r=i(39867)},39867:(e,t,i)=>{i.r(t),i.d(t,{default:()=>m});i(67294);var r=i(52263),a=i(33692),s=i(49361),n=i(78914),o=i(66569),c=i(8730),l=i(45104);const d={hero:{title:"More libraries",subtitle:"Libraries that complement the Arrow ecosystem"},libraries:[{title:"Quiver",href:"https://block.github.io/quiver/",icon:"icon-support.svg",body:"Additional functional programming idioms over and above what is available from Arrow"},{title:"OpenSavvy",href:"https://opensavvy.dev/libraries/index.html",icon:"icon-generic-4.svg",body:"Open source utilities for unified software architecture"},{title:"Akkurate",href:"https://akkurate.dev/",icon:"icon-events.svg",body:"Expressive validation library for Kotlin"},{title:"Tribune",href:"https://github.com/sksamuel/tribune",icon:"icon-typed-errors.svg",body:"Toolset for creating simple parsers from raw input types, to properly validated parsed types"},{title:"kotlinx-serialization-jsonpath",href:"https://nomisrev.github.io/kotlinx-serialization-jsonpath/",icon:"icon-design.svg",body:"DSL for accessing and modifying deeply nested JSON for KotlinX Serialization with Arrow Optics"},{title:"Hoplite",href:"https://github.com/sksamuel/hoplite",icon:"icon-quickstart.svg",body:"Boilerplate-free Kotlin config library for loading configuration files as data classes"},{title:"Parsus",href:"https://github.com/alllex/parsus",icon:"icon-quote.png",body:"Parser-combinators with Kotlin Coroutines"},{title:"Inikio",href:"http://serranofp.com/inikio/",icon:"icon-resilience.svg",body:"Better initial-style DSLs in Kotlin"}],banner:{title:"Want to know more about Arrow?",ctaList:[{title:"Read the docs",href:"/learn/overview"}]}},h={verticalRhythm:"verticalRhythm_ciyB",textContainer:"textContainer_sUD0",featuresContainer:"featuresContainer_C4bu container",quotesContainer:"quotesContainer__RHU container",navigationContainer:"navigationContainer_fCvS"};var u=i(85893);function m(){const{siteConfig:e}=(0,r.Z)();return(0,u.jsxs)(s.Z,{title:"More libraries",description:e.tagline,children:[(0,u.jsx)(n.V,{title:d.hero.title,subtitle:d.hero.subtitle,ctaList:d.hero.ctaList,className:h.verticalRhythm}),(0,u.jsxs)("main",{children:[(0,u.jsx)("section",{className:`${h.featuresContainer} ${h.verticalRhythm}`,children:d.libraries.map((e=>(0,u.jsx)(o.k,{...e},e.title)))}),(0,u.jsxs)("section",{className:`container text--center ${h.textContainer} ${h.verticalRhythm}`,children:[(0,u.jsx)("h1",{children:"Even more libraries?"}),(0,u.jsxs)("p",{children:["We'd love to",(0,u.jsx)(a.Z,{href:"https://github.com/arrow-kt/arrow-website/issues",children:" hear "}),"about other library which complements the Arrow libraries and should be featured here!"]})]}),d.navs&&(0,u.jsx)("section",{className:`container ${h.navigationContainer} ${h.verticalRhythm}`,children:d.navs.map((e=>(0,u.jsx)(c.T,{...e},e.title)))}),(0,u.jsx)("section",{children:(0,u.jsx)(l.j,{title:d.banner.title,ctaList:d.banner.ctaList})})]})]})}}}]);