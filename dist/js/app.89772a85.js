(function(e){function t(t){for(var l,o,s=t[0],i=t[1],c=t[2],p=0,d=[];p<s.length;p++)o=s[p],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(l in i)Object.prototype.hasOwnProperty.call(i,l)&&(e[l]=i[l]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],l=!0,s=1;s<n.length;s++){var i=n[s];0!==r[i]&&(l=!1)}l&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var l={},r={app:0},a=[];function o(t){if(l[t])return l[t].exports;var n=l[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=l,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(n,l,function(t){return e[t]}.bind(null,l));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=i;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"31f2":function(e,t,n){"use strict";n("ebce")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var l=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("HelloWorld",{attrs:{msg:"越哥说电影解说合集"}}),n("el-backtop",{attrs:{target:"body","visibility-height":100}})],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),n("p",[e._v("越哥说电影，专注好电影！")]),n("p",[e._v(" (来源:微信公众号) ")]),n("div",{staticStyle:{"margin-top":"15px",padding:"15px"}},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"输入电影名"},on:{change:e.searchDoms},model:{value:e.searchKeyword,callback:function(t){e.searchKeyword=t},expression:"searchKeyword"}},[n("el-select",{staticStyle:{width:"100px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.select,callback:function(t){e.select=t},expression:"select"}},[n("el-option",{attrs:{label:"公众号",value:1}}),n("el-option",{attrs:{disabled:"",label:"B站",value:2}}),n("el-option",{attrs:{disabled:"",label:"Youtube",value:3}}),n("el-option",{attrs:{disabled:"",label:"西瓜视频",value:4}})],1),n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchDoms},slot:"append"})],1)],1),e.datalen===e.htmls.length?n("el-row",e._l(e.htmls,(function(t,l){return n("el-col",{key:l,attrs:{xs:24,sm:6,md:6,lg:6,xl:6}},[n("p",[e._v(e._s(t.title)+"年解说合集")]),n("div",{staticClass:"grid-content bg-purple-dark",domProps:{innerHTML:e._s(t.html)}})])})),1):e._e(),n("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"50%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("span",[e._v(e._s(e.dialogMsg))]),n("p",[n("span",[e._v("扫码去微信公众号查看")])]),n("p",[n("img",{attrs:{alt:"Yue QR",src:"qrcode.bmp"}})]),n("p",[n("a",{attrs:{target:"_blank",href:e.bLink}},[e._v("前往B站查看")])]),n("p",[n("a",{attrs:{target:"_blank",href:e.xLink}},[e._v("前往西瓜视频查看")])]),n("p",[n("a",{attrs:{target:"_blank",href:e.yLink}},[e._v("前往Youtube查看")])])]),n("el-divider",[e._v("about project")]),n("el-footer",[e._v("© 2021 "),n("a",{attrs:{target:"_blank",href:"git66.com"}},[e._v("struy")]),e._v("｜"),n("a",{attrs:{target:"_blank",href:"https://github.com/StruggleYang/yue-search"}},[e._v("源代码")]),e._v("｜本项目仅供学习使用，请勿用于商业用途！")])],1)},s=[],i=(n("ac1f"),n("5319"),n("4e82"),n("159b"),n("bc3a")),c=n.n(i),u={name:"HelloWorld",components:{},props:{msg:String},data:function(){return{htmls:[{title:"未知",html:"<p>数据未知</p>"}],datalen:1,select:1,searchKeyword:"",dialogMsg:"",dialogVisible:!1,bLink:"",xLink:"",yLink:""}},created:function(){var e=this;c.a.get("/db/data.json").then((function(t){t.data.length>0&&(e.htmls=[],e.datalen=t.data.length);for(var n=function(n){var l=t.data[n];c.a.get("/wechat-page/"+l).then((function(t){e.htmls.push({title:l.replace(".html",""),html:t.data.replace(/<p><br\s\s\/><\/p>/g,"").replace(/<p><span style="font-size: \d\dpx;"><br\s\s\/><\/span><\/p>/g,"").replace(/<p style=""><br\s\s\/><\/p>/g,"")}),e.datalen===e.htmls.length&&(e.htmls=e.htmls.sort((function(e,t){return e.title-t.title})),setTimeout((function(){e.removeDefTitle()}),1))}))},l=0;l<t.data.length;l++)n(l)}))},methods:{removeDefTitle:function(){var e=document.getElementsByClassName("grid-content");e.forEach((function(e){e.removeChild(e.firstChild)}))},showMsg:function(e){this.dialogVisible=!0,this.dialogMsg=e},handleClose:function(){this.dialogVisible=!1},searchDoms:function(){var e=document.querySelectorAll('a[textvalue*="'+this.searchKeyword+'"]');this.bLink="https://space.bilibili.com/149558293/search/video?keyword="+this.searchKeyword,this.xLink="https://www.ixigua.com/search/越哥说电影"+this.searchKeyword,this.yLink="https://www.youtube.com/channel/UChgCVolsF6L7DWmOpWKSkMA/search?query="+this.searchKeyword,0===e.length&&this.showMsg("没有找到《"+this.searchKeyword+"》的解说，赶紧让越哥解说😂,或者去下面找找"),e.forEach((function(e){e.classList.add("search"),e.scrollIntoView({block:"center"})}))}}},p=u,d=(n("31f2"),n("2877")),h=Object(d["a"])(p,o,s,!1,null,null,null),f=h.exports,b={name:"App",components:{HelloWorld:f}},g=b,v=(n("034f"),Object(d["a"])(g,r,a,!1,null,null,null)),m=v.exports,y=n("5c96"),_=n.n(y);n("0fae");l["default"].config.productionTip=!1,l["default"].use(_.a),new l["default"]({render:function(e){return e(m)}}).$mount("#app")},"85ec":function(e,t,n){},ebce:function(e,t,n){}});
//# sourceMappingURL=app.89772a85.js.map