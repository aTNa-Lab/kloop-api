(this["webpackJsonpkloop-api"]=this["webpackJsonpkloop-api"]||[]).push([[0],{309:function(e,t,a){e.exports=a(626)},314:function(e,t,a){},624:function(e,t,a){},625:function(e){e.exports=JSON.parse("{}")},626:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(246),o=a.n(c),i=(a(314),a(254)),l=a(44),s=a.n(l),u=a(150),m=a(23),d=a(253),p={flex:1,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"30px",paddingBottom:"30px",paddingLeft:"auto",paddingRight:"auto",borderWidth:2,borderRadius:2,borderColor:"#eeeeee",borderStyle:"dashed",backgroundColor:"#fafafa",color:"#bdbdbd",outline:"none",transition:"border .24s ease-in-out"},f=function(e){var t=Object(n.useCallback)((function(t){t.forEach((function(t){e.handleChange(t)}))}),[]),a=Object(d.a)({onDrop:t,noClick:!0,noKeyboard:!0,multiple:!0}),c=(a.acceptedFiles,a.getRootProps),o=a.getInputProps,i=a.open;return r.a.createElement("section",{className:"container",style:{width:"100%"}},r.a.createElement("div",c({style:p}),r.a.createElement("input",o()),r.a.createElement("p",null,"Drag 'n' drop some files here, or click to select files"),r.a.createElement("button",{type:"button",onClick:i},"Open File Dialog")))},g=a(647),b=function(e){return r.a.createElement(g.a,{onChange:e.handleChange,value:e.value,label:"Embedding",placeholder:"Enter your embedding",variant:"outlined",rowsMin:9,rowsMax:9,style:{width:"100%",height:"100%"}})},h=a(646),j=a(641),E=a(149),O=a.n(E),v=function(e){return console.log("GOT",e),r.a.createElement("div",null,r.a.createElement(O.a,{option:{tooltip:{trigger:"axis",axisPointer:{animation:!1}},legend:{data:["check","check1","check"],left:10},xAxis:{type:"category",data:e.timeRange},yAxis:{type:"value"},series:[{data:e.dates,type:"line"}]}}))},y=a(645),k=a(648),w=a(644),x=Object(j.a)((function(e){return{images:{height:300}}})),S=function(e){var t=x(),a=e.closest.map((function(e,a){return r.a.createElement(k.a,{key:a},r.a.createElement("img",{src:e.image,alt:a,className:t.images}),r.a.createElement(w.a,{title:e.metadata.distance}))})),n=e.farest.map((function(e,a){return r.a.createElement(k.a,{key:a},r.a.createElement("img",{src:e.image,alt:a,className:t.images}),r.a.createElement(w.a,{title:e.metadata.distance}))}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Closest"),r.a.createElement(y.a,{className:t.gridList,cols:e.quantity,cellHeight:"auto"},a),r.a.createElement("h2",null,"Farest"),r.a.createElement(y.a,{className:t.gridList,cols:e.quantity,cellHeight:"auto"},n))},D=(a(624),a(67)),C=a(252),N=(a(625),a(649)),_=Object(j.a)((function(e){return{root:{flexGrow:1,overflow:"hidden",padding:e.spacing(0,3)},gridItem:{padding:e.spacing(1),width:"50%"},gridList:{transform:"translateZ(0)"},images:{height:300},spinner:{color:"grey",right:0,top:0,margin:"15px",position:"absolute"}}}));var R=function(){var e=_(),t=Object(n.useState)(""),a=Object(m.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)(null),d=Object(m.a)(l,2),p=d[0],g=d[1],j=Object(n.useState)(null),E=Object(m.a)(j,2),O=(E[0],E[1]),y=Object(n.useState)(null),k=Object(m.a)(y,2),w=(k[0],k[1]),x=Object(n.useState)([]),R=Object(m.a)(x,2),I=R[0],T=R[1],M=Object(n.useState)([]),L=Object(m.a)(M,2),P=L[0],U=L[1],F=Object(n.useState)(!1),G=Object(m.a)(F,2),J=G[0],A=G[1],V=Object(n.useState)(3),q=Object(m.a)(V,2),B=q[0],K=(q[1],Object(n.useState)(!1)),W=Object(m.a)(K,2),X=W[0],Z=W[1],H=Object(n.useState)(null),z=Object(m.a)(H,2),$=z[0],Q=z[1],Y=Object(n.useState)(null),ee=Object(m.a)(Y,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(!1),re=Object(m.a)(ne,2),ce=re[0],oe=re[1],ie=function(){var e=Object(u.a)(s.a.mark((function e(){var t,a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!0),console.log("Sending data"),(t=new FormData).append("token","TDlRJi8ORMGVrMedVkZDXsUDK"),t.append("action","faiss_search"),t.append("table_name","lukoshko_with_arr_norm"),t.append("index_filename","ktrk_index.faiss"),t.append("radius",.93),t.append("file1",p,"image.jpg"),e.prev=9,e.next=12,fetch("https://9e94093f8750.sn.mynetname.net:5000/",{method:"POST",body:t});case 12:return a=e.sent,e.next=15,a.json();case 15:n=e.sent,O(n),console.log(n),se(n),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(9),console.error("\u041e\u0448\u0438\u0431\u043a\u0430:",e.t0);case 24:case"end":return e.stop()}}),e,null,[[9,21]])})));return function(){return e.apply(this,arguments)}}(),le=function(){var e=Object(u.a)(s.a.mark((function e(t){var a,n,r,c,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Getting image"),a=window.URL||window.webkitURL,(n=new FormData).append("token","TDlRJi8ORMGVrMedVkZDXsUDK"),n.append("action","extract_frame"),n.append("file_path",t.file_path),n.append("frame_index",t.frame_index),e.prev=7,e.next=10,fetch("https://9e94093f8750.sn.mynetname.net:5000/",{method:"POST",body:n});case 10:return r=e.sent,e.next=13,r.blob();case 13:return c=e.sent,o=a.createObjectURL(c),console.log("RESPONSE",c),e.abrupt("return",{metadata:t,image:o});case 19:e.prev=19,e.t0=e.catch(7),console.error("\u041e\u0448\u0438\u0431\u043a\u0430:",e.t0);case 22:case"end":return e.stop()}}),e,null,[[7,19]])})));return function(t){return e.apply(this,arguments)}}(),se=function(e){var t=Object.values(e[0].metadata);console.log(t);var a=Object(i.a)(t).sort((function(e,t){return e.distance-t.distance}));w(a),ue(a),me(a)},ue=function(e){var t=e.slice(e.length-B),a=e.slice(0,B);console.log("closest",t),console.log("farest",a);var n=[],r=[];t.forEach((function(e){return le(e).then((function(e){return n.push(e)}))})),a.forEach((function(e){return le(e).then((function(e){return r.push(e)}))})),T(n),U(r),setTimeout((function(){return Z(!1)}),2e3)},me=function(e){var t=Object(D.e)("%U"),a=e,n=Object(D.a)(a,(function(e){return t(Date.parse(e.appearance_time))}));console.log("Time extent",n);var r=t(Object(D.b)(a,(function(e){return new Date(e.appearance_time)})));console.log("MAX",r);var c=Object(D.c)(n[0],n[1]).concat(r);console.log(c);var o=Object(C.a)().key((function(e){return t(Date.parse(e.appearance_time))})).rollup((function(e){return Object(D.d)(e,(function(e){return 1}))})).map(a);console.log("NESTED",o);var i=c.map((function(e){return(e<10?o.get("0"+e):o.get(e))||0}));console.log(i),Q(i),ae(c)};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:e.spinner},X?r.a.createElement(N.a,{size:32,style:{color:"grey"}}):null),r.a.createElement(h.a,{container:!0,direction:"column",alignItems:"center",justify:"center"},r.a.createElement(h.a,{container:!0,justify:"center",className:e.gridItem},r.a.createElement(f,{handleChange:function(e){console.log(e),g(e)}})),r.a.createElement(h.a,{container:!0,justify:"center",className:e.gridItem},r.a.createElement(b,{handleChange:function(e){o(e.target.value)},value:c})),r.a.createElement(h.a,{container:!0,justify:"center",className:e.gridItem},r.a.createElement("button",{onClick:function(){return ie()}},"Send Data")),r.a.createElement(h.a,{container:!0,justify:"center",className:e.gridItem},r.a.createElement("button",{onClick:function(){A(!J)}},"Show Images")),r.a.createElement(h.a,{container:!0,justify:"center",className:e.gridItem},r.a.createElement("button",{onClick:function(){oe(!ce)}},"Show Charts"))),J?r.a.createElement(S,{farest:P,closest:I,quantity:B}):null,ce?r.a.createElement(v,{timeRange:te,dates:$}):null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[309,1,2]]]);
//# sourceMappingURL=main.ca0460ac.chunk.js.map