(this.webpackJsonpreminder=this.webpackJsonpreminder||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(7),l=n.n(c),i=(n(14),n(8)),o=n(5),s=n(1),m=n(4),u=function(e){var t=e.items,n=e.removeItem,a=e.editItem;return r.a.createElement("div",{className:"grocery-list"},t.map((function(e){var t=e.id,c=e.title;return r.a.createElement("article",{className:"grocery-item",key:t},r.a.createElement("p",{className:"title"},c),r.a.createElement("div",{className:"btn-container"},r.a.createElement("button",{className:"edit-btn",type:"button",onClick:function(){a(t)}},r.a.createElement(m.a,null)),r.a.createElement("button",{className:"delete-btn",type:"button",onClick:function(){return n(t)}},r.a.createElement(m.b,null))))})))},f=function(e){var t=e.type,n=e.msg,c=e.removeAlert,l=e.list;return Object(a.useEffect)((function(){var e=setTimeout((function(){c()}),2e3);return function(){return clearTimeout(e)}}),[l]),r.a.createElement("p",{className:"alert alert-".concat(t)},n)};var b=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(function(){var e=localStorage.getItem("list");return e?JSON.parse(localStorage.getItem("list")):[]}()),m=Object(s.a)(l,2),b=m[0],d=m[1],g=Object(a.useState)(!1),v=Object(s.a)(g,2),E=v[0],p=v[1],O=Object(a.useState)(null),y=Object(s.a)(O,2),j=y[0],N=y[1],S=Object(a.useState)({show:!1,msg:"",type:""}),h=Object(s.a)(S,2),I=h[0],k=h[1],w=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";k({show:e,msg:t,type:n})};return Object(a.useEffect)((function(){localStorage.setItem("list",JSON.stringify(b))}),[b]),r.a.createElement("section",{className:"section-center"},r.a.createElement("form",{className:"grocery-form",onSubmit:function(e){if(e.preventDefault(),n)if(n&&E)d(b.map((function(e){return e.id===j?Object(o.a)(Object(o.a)({},e),{},{title:n}):e}))),p(!1),N(null),c(""),w(!0,"item edited!","success");else{w(!0,"item added!","success");var t={id:(new Date).getTime().toString(),title:n};d([].concat(Object(i.a)(b),[t])),c("")}else w(!0,"please enter value","danger")}},I.show&&r.a.createElement(f,Object.assign({},I,{removeAlert:w,list:b})),r.a.createElement("h3",null,"grocery bud"),r.a.createElement("div",{className:"form-control"},r.a.createElement("input",{type:"text",className:"grocery",placeHolder:"e.g. eggs",value:n,onChange:function(e){return c(e.target.value)}}),r.a.createElement("button",{className:"submit-btn",type:"submit"},E?"edit":"Submit"))),b.length>0&&r.a.createElement("div",{className:"grocery-container"},r.a.createElement(u,{items:b,removeItem:function(e){w(!0,"item removed","danger"),d(b.filter((function(t){return t.id!==e})))},editItem:function(e){var t=b.find((function(t){return t.id===e}));p(!0),N(e),c(t.title)}}),r.a.createElement("button",{className:"clear-btn",onClick:function(){w(!0,"empty list","danger"),d([])}},"clear items")))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root"))},9:function(e,t,n){e.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.37c42543.chunk.js.map