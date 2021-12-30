(this.webpackJsonpreminder=this.webpackJsonpreminder||[]).push([[0],{12:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),l=a.n(c),o=(a(12),a(1)),u=a(2),m=a.n(u),i=a(5),s=a(6),E=function(e,t){if("CLEAR_CART"===t.type)return Object(o.a)(Object(o.a)({},e),{},{cart:[]});if("REMOVE"===t.type){var a=t.payload,n=e.cart.filter((function(e){return e.id!==a}));return Object(o.a)(Object(o.a)({},e),{},{cart:n})}if("INCREASE"===t.type||"DECREASE"===t.type){var r=e.cart.map((function(e){return e.id===t.payload?"INCREASE"===t.type?Object(o.a)(Object(o.a)({},e),{},{amount:e.amount+1}):Object(o.a)(Object(o.a)({},e),{},{amount:e.amount-1}):e}));return Object(o.a)(Object(o.a)({},e),{},{cart:r})}if("GET_TOTALS"===t.type){var c=e.cart.reduce((function(e,t){var a=t.price,n=t.amount,r=a*n;return e.amount+=n,e.total+=r,e}),{total:0,amount:0}),l=c.amount,u=c.total;return u=parseFloat(u.toFixed(2)),Object(o.a)(Object(o.a)({},e),{},{amount:l,total:u})}if("LOADING"===t.type)return Object(o.a)(Object(o.a)({},e),{},{loading:!0});if("DISPLAY_ITEMS"===t.type)return Object(o.a)(Object(o.a)({},e),{},{cart:t.payload,loading:!1});throw new Error("no matching actio type")},p=r.a.createContext(),d={loading:!1,cart:[{id:1,title:"Samsung Galaxy S7",price:599.99,img:"https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png",amount:1},{id:2,title:"google pixel ",price:499.99,img:"https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png",amount:1},{id:3,title:"Xiaomi Redmi Note 2",price:699.99,img:"https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368224/phone-3_h2s6fo.png",amount:1}],total:0,amount:0},v=function(e){var t=e.children,a=Object(n.useReducer)(E,d),c=Object(s.a)(a,2),l=c[0],u=c[1],v=function(){var e=Object(i.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u({type:"LOADING"}),e.next=3,fetch("https://course-api.com/react-useReducer-cart-project");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,u({type:"DISPLAY_ITEMS",payload:a});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){v()}),[]),Object(n.useEffect)((function(){u({type:"GET_TOTALS"})}),[l.cart]),r.a.createElement(p.Provider,{value:Object(o.a)(Object(o.a)({},l),{},{clearCart:function(){u({type:"CLEAR_CART"})},remove:function(e){u({type:"REMOVE",payload:e})},increase:function(e){u({type:"INCREASE",payload:e})},decrease:function(e){u({type:"DECREASE",payload:e})}})},t)},f=function(){return Object(n.useContext)(p)},h=function(){var e=f().amount;return r.a.createElement("nav",null,r.a.createElement("div",{className:"nav-center"},r.a.createElement("h3",null,"useReducer"),r.a.createElement("div",{className:"nav-container"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},r.a.createElement("path",{d:"M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z"})),r.a.createElement("div",{className:"amount-container"},r.a.createElement("p",{className:"total-amount"},e)))))},b=function(e){var t=e.id,a=e.img,n=e.title,c=e.price,l=e.amount,o=f(),u=o.remove,m=o.increase,i=o.decrease;return r.a.createElement("article",{className:"cart-item"},r.a.createElement("img",{src:a,alt:n}),r.a.createElement("div",null,r.a.createElement("h4",null,n),r.a.createElement("h4",{className:"item-price"},"$",c),r.a.createElement("button",{className:"remove-btn",onClick:function(){u(t)}},"remove")),r.a.createElement("div",null,r.a.createElement("button",{className:"amount-btn",onClick:function(){return m(t)}},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},r.a.createElement("path",{d:"M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"}))),r.a.createElement("p",{className:"amount"},l),r.a.createElement("button",{className:"amount-btn",onClick:function(){return i(t)}},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},r.a.createElement("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"})))))},g=function(){var e=f(),t=e.cart,a=e.total,n=e.clearCart;return 0===t.length?r.a.createElement("section",{className:"cart"},r.a.createElement("header",null,r.a.createElement("h2",null,"your bag"),r.a.createElement("h4",{className:"empty-cart"},"is currently empty"))):r.a.createElement("section",{className:"cart"},r.a.createElement("header",null,r.a.createElement("h2",null,"your bag")),r.a.createElement("div",null,t.map((function(e){return r.a.createElement(b,Object.assign({key:e.id},e))}))),r.a.createElement("footer",null,r.a.createElement("hr",null),r.a.createElement("div",{className:"cart-total"},r.a.createElement("h4",null,"total ",r.a.createElement("span",null,"$",a))),r.a.createElement("button",{className:"btn clear-btn",onClick:n},"clear cart")))};var y=function(){return f().loading?r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Loading...")):r.a.createElement("main",null,r.a.createElement(h,null),r.a.createElement(g,null))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null,r.a.createElement(y,null))),document.getElementById("root"))},7:function(e,t,a){e.exports=a(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.7e1db1db.chunk.js.map