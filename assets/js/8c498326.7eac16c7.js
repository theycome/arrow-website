"use strict";(self.webpackChunkarrow_website=self.webpackChunkarrow_website||[]).push([[6637],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var i=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=i.createContext({}),p=function(e){var t=i.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return r?i.createElement(f,o(o({ref:t},c),{},{components:r})):i.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<a;p++)o[p]=r[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}m.displayName="MDXCreateElement"},99756:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var i=r(87462),n=(r(67294),r(3905));const a={id:"serialization",title:"Serialization",description:"How to (de)serialize Arrow Core types.",sidebar_position:2},o="Serialization",l={unversionedId:"learn/quickstart/serialization",id:"learn/quickstart/serialization",title:"Serialization",description:"How to (de)serialize Arrow Core types.",source:"@site/content/docs/learn/quickstart/serialization.md",sourceDirName:"learn/quickstart",slug:"/learn/quickstart/serialization",permalink:"/learn/quickstart/serialization",draft:!1,editUrl:"https://github.com/arrow-kt/arrow-website/edit/main/content/docs/learn/quickstart/serialization.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"serialization",title:"Serialization",description:"How to (de)serialize Arrow Core types.",sidebar_position:2},sidebar:"learnSidebar",previous:{title:"From other FP languages",permalink:"/learn/quickstart/from-fp"},next:{title:"Migration to Arrow 1.2.0",permalink:"/learn/quickstart/migration"}},s={},p=[{value:"kotlinx.serialization",id:"kotlinxserialization",level:2},{value:"Jackson",id:"jackson",level:2}],c={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,i.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"serialization"},"Serialization"),(0,n.kt)("p",null,"Arrow Core types, such as ",(0,n.kt)("inlineCode",{parentName:"p"},"Either")," or ",(0,n.kt)("inlineCode",{parentName:"p"},"NonEmptyList"),", often appear as part\nof serializable types. We've decided to keep the Core library as slim as\npossible; in particular we didn't want to depend on particular serialization\nlibraries. As a result, you need a bit of additional ceremony compared to\nusing built-in types, which we discuss in this section."),(0,n.kt)("h2",{id:"kotlinxserialization"},(0,n.kt)("a",{parentName:"h2",href:"https://github.com/Kotlin/kotlinx.serialization"},"kotlinx.serialization")),(0,n.kt)("p",null,"If you're using kotlinx.serialization, you need to depend on the\n",(0,n.kt)("inlineCode",{parentName:"p"},"arrow-core-serialization")," with the same version of your ",(0,n.kt)("inlineCode",{parentName:"p"},"arrow-core"),".\nDeclare your serializable types as usual. However, when one of the fields\nmentions a type from Arrow Core,"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"@Serializable\ndata class Book(val title: String, val authors: NonEmptyList<String>)\n")),(0,n.kt)("p",null,'you need to "import" the serializer into the file. The easiest way is to\ninclude a ',(0,n.kt)("inlineCode",{parentName:"p"},"UseSerializers")," annotation at the very top."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"@file:UseSerializers(\n  EitherSerializer::class,\n  IorSerializer::class,\n  ValidatedSerializer::class,\n  OptionSerializer::class,\n  NonEmptyListSerializer::class,\n  NonEmptySetSerializer::class\n)\n")),(0,n.kt)("p",null,"The list above mentions all the serializers, but you only need to add those\nwhich are used in your fields. Don't worry too much: if you miss one, the\nkotlinx.serialization plug-in gives you an error."),(0,n.kt)("h2",{id:"jackson"},(0,n.kt)("a",{parentName:"h2",href:"https://github.com/FasterXML/jackson"},"Jackson")),(0,n.kt)("p",null,"If you're using Jackson for serialization, ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/arrow-kt/arrow-integrations#jackson-module"},"this module"),"\nadds support for Arrow types. You just need to call an additional method when\ncreating the mapper."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-kotlin"},"val mapper = ObjectMapper()\n    .registerKotlinModule()\n    .registerArrowModule()   // <- this is the one\n")))}d.isMDXComponent=!0}}]);