(this["webpackJsonpsettl-me"]=this["webpackJsonpsettl-me"]||[]).push([[20],{1494:function(e,t,a){e.exports=a.p+"static/media/customercard.1dd1f9d0.svg"},1519:function(e,t,a){"use strict";var n=a(9),r=a.n(n),s=a(15),c=a(37),l=a.n(c),o=a(38),u=a(19);function i(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var a=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?a:3&a|8).toString(16)}))}var m=i();t.a=function(){var e=Object(u.useSelector)((function(e){return e.user.details})),t=e.token,a=e.tokenType;return{getAllWallets:function(){var e=Object(s.a)(r.a.mark((function e(n){var s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m=i(),e.prev=1,e.next=4,l.a.get(o.a+"backoffice/Analytics/WalletSavings?days=".concat(n),{params:{days:30},headers:{"X-RequestId":"".concat(m),Authorization:"".concat(a," ").concat(t)}});case 4:return s=e.sent,e.abrupt("return",s.data);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),refundAccount:function(){var e=Object(s.a)(r.a.mark((function e(n){var s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m=i(),e.prev=1,e.next=4,l.a.post(o.a+"backoffice/Customers/Refund",n,{headers:{"X-RequestId":"".concat(m),Authorization:"".concat(a," ").concat(t)}});case 4:return s=e.sent,e.abrupt("return",s.data);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),reprocessTransaction:function(){var e=Object(s.a)(r.a.mark((function e(n){var s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m=i(),e.prev=1,e.next=4,l.a.post(o.a+"backoffice/Customers/ReprocessTransaction",n,{headers:{"X-RequestId":"".concat(m),Authorization:"".concat(a," ").concat(t)}});case 4:return s=e.sent,e.abrupt("return",s.data);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()}}},1596:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a(0),s=a.n(r),c=a(364),l=a(1494),o=a.n(l),u=a(9),i=a.n(u),m=a(15),d=a(19),p=a(58),f=a(1477),x=a(1479),v=a(1384),b=a(1519),g=a(102),h=Object(d.connect)((function(e){var t,a,n,r,s,c;return{userName:null===e||void 0===e||null===(t=e.user)||void 0===t||null===(a=t.details)||void 0===a||null===(n=a.admin)||void 0===n?void 0:n.fullname,email:null===e||void 0===e||null===(r=e.user)||void 0===r||null===(s=r.details)||void 0===s||null===(c=s.admin)||void 0===c?void 0:c.email}}))((function(e){var t=e.show,a=e.setShow,c=e.data,l=e.transId,o=e.userName,u=e.email,d=(e.reload,Object(r.useState)("Assurance Uwangue")),h=Object(n.a)(d,2),E=h[0],y=h[1],N=Object(r.useState)(""),S=Object(n.a)(N,2),w=S[0],O=S[1],j=Object(r.useState)(!1),k=Object(n.a)(j,2),C=k[0],R=k[1],A=Object(r.useState)({state:"",message:"",status:""}),T=Object(n.a)(A,2),I=T[0],D=T[1],F=Object(b.a)(),W=F.refundAccount,q=F.reprocessTransaction,z=function(e,t){t(e.target.value)},_=function(){var e=Object(m.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),R(!0),"Refund Customer"!==c.title){e.next=12;break}return e.next=5,W({adminFullName:o.split(" ")[0],adminEmail:u,reason:w,transId:l});case 5:if("00"!==(n=e.sent).code){e.next=11;break}return console.log(n.data),R(!1),a(!1),e.abrupt("return",!0);case 11:D({state:!0,status:n.status,message:n.message});case 12:if("Reprocess Transaction"!==c.title){e.next=21;break}return e.next=15,q({fullName:o.split(" ")[0],adminEmail:u,reason:w,transId:l});case 15:if("00"!==(r=e.sent).code){e.next=20;break}return console.log(r.data),a(!1),e.abrupt("return",!0);case 20:D({state:!0,status:r.status,message:r.message});case 21:return R(!1),e.abrupt("return",!1);case 23:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(f.a,{show:t,centered:!0,onHide:function(){return a(!1)},className:"transaction-modal"},s.a.createElement("div",{style:{display:"relative"}},s.a.createElement("h3",{style:{textAlign:"center",borderBottom:"1px solid rgba(231, 231, 237, 0.6)",padding:"1.5rem 0"}},c.title),s.a.createElement(p.a,{style:{position:"absolute",top:"20px",right:"20px",cursor:"pointer"},onClick:function(){return a(!1)}})),s.a.createElement("div",{style:{display:"flex",flexDirection:"column",padding:"3rem 2rem",height:"100%",gap:"30px"}},s.a.createElement("p",{style:{textAlign:"center",margin:"0 auto",fontSize:"16px"}},"Please confirm this is the right customer account before initiating this process"),s.a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},s.a.createElement("fieldset",{className:"float-label",style:{margin:"0"}},s.a.createElement(v.a,{name:"name",autoComplete:"off",type:"text",className:"form-control shadow-none",value:E,style:{margin:"0"},onChange:function(e){return z(e,y)},required:!0}),s.a.createElement("label",{htmlFor:"Full_Name"},"Admin Full Name")),s.a.createElement(v.a,{type:"textarea",className:"form-control shadow-none",style:{backgroundColor:"#FAFAFA",resize:"none",height:"200px",padding:"20px"},value:w,onChange:function(e){return z(e,O)},placeholder:c.reason,required:!0})),s.a.createElement(x.a,{onClick:_,style:{backgroundColor:"#4F1699",padding:".6rem 1.5rem",marginTop:"1rem"}},c.placeholder,C?s.a.createElement("div",{className:"spinner-border spinner-border-sm spinner text-white ml-2",role:"status"},s.a.createElement("span",{className:"sr-only"},"Loading...")):""))),s.a.createElement(g.a,{isOpen:I.state,toggle:function(){D({state:!1,message:"",status:""})},title:I.message,details:I.status}))})),E=a(22);t.default=function(e){var t=e.setShowCustomerDetails,a=e.details,l={title:"Refund Customer",reason:"Refund Reason",placeholder:"Initiate Refund"},u={title:"Reprocess Transaction",reason:"Reprocess Reason",placeholder:"Reprocess"},i=Object(r.useState)(null),m=Object(n.a)(i,2),d=m[0],p=m[1],f=Object(r.useState)(!1),x=Object(n.a)(f,2),v=x[0],b=x[1],g=Object(r.useState)(a.transId),y=Object(n.a)(g,1)[0],N=[{"Transaction Name":a.transDomain},{"Savings Wallet":a.fundSource},{"Wallet Name":a.transType},{"Transaction Type":a.transEntry},{"Created at":a.transDate},{"Customer ID":s.a.createElement(E.b,{to:"/customers/details/"+a.customerId},s.a.createElement("p",{className:"name"},a.customerId)," ")},{"Customer Wallet ID":a.transId}];return Object(r.useEffect)((function(){window.scrollTo(0,0)}),[]),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{style:{display:"flex",gap:"10px",padding:"10px"}},s.a.createElement("span",{style:{color:"#4f1699",cursor:"pointer"},onClick:function(){return t((function(e){return!e}))}},"All Saving Transactions"),s.a.createElement("span",{style:{color:"#304762"}}," > ")," ",s.a.createElement("span",{style:{color:"#304762"}},"Savings Transaction Details")),s.a.createElement("div",{className:"customer_card_body"},s.a.createElement("div",{className:"flex"},s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement("h4",{className:"greeting"},s.a.createElement("img",{src:o.a,className:"",alt:"Settl Logo"}),s.a.createElement("span",{className:"pl-2"},"Savings Transaction Details ")),s.a.createElement("div",{className:"flex"},s.a.createElement("p",{className:"price"},"\u20a6".concat(a.transAmount,".00")),s.a.createElement("p",{className:"status "+("SUCCESS"===a.transStatus?"success":"REFUNDED"===a.transStatus?"registered":"failed")},a.transStatus)))),"FAILED"===a.transStatus?s.a.createElement("div",{className:"buttons"},s.a.createElement(c.a,{className:"button_neutral",onClick:function(){p(l),b(!0)}},"Refund Customer"),s.a.createElement(c.a,{className:"button_approve",onClick:function(){p(u),b(!0)}},"Reprocess Transaction")):""),s.a.createElement("div",{className:"details"},N.map((function(e){return s.a.createElement("div",{style:{display:"flex"}},s.a.createElement("p",{style:{width:"50%",color:"rgba(48, 71, 98, 0.8)"}},Object.keys(e)),s.a.createElement("p",{style:{width:"50%",color:"#304762",fontWeight:500}},Object.values(e)))})))),d&&s.a.createElement(h,{show:v,setShow:b,data:d,transId:y}))}}}]);
//# sourceMappingURL=20.378d5289.chunk.js.map