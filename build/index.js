(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,n,s,i,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],isUndefined(n))return!1;if(isFunction(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];n.apply(this,i)}else if(isObject(n)){for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];for(o=n.slice(),s=o.length,r=0;s>r;r++)o[r].apply(this,i)}return!0},EventEmitter.prototype.addListener=function(e,t){var n;if(!isFunction(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned){var n;n=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function n(){this.removeListener(e,n),s||(s=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var s=!1;return n.listener=t,this.on(e,n),this},EventEmitter.prototype.removeListener=function(e,t){var n,s,i,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,s=-1,n===t||isFunction(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(n)){for(r=i;r-->0;)if(n[r]===t||n[r].listener&&n[r].listener===t){s=r;break}if(0>s)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],isFunction(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?isFunction(e._events[t])?1:e._events[t].length:0};
},{}],2:[function(require,module,exports){
!function(){function e(e){var t={val:e},n=e.split(/\s+in\s+/);return n[1]&&(t.val=y(0)+n[1],n=n[0].slice(y(0).length).trim().split(/,\s*/),t.key=n[0],t.pos=n[1]),t}function t(e,t,n){var r={};return r[e.key]=t,e.pos&&(r[e.pos]=n),r}function n(n,r,i){function u(e,t,n){d.splice(e,0,t),m.splice(e,0,n)}l(n,"each");var f,a=n.outerHTML,s=n.previousSibling,p=n.parentNode,d=[],m=[];i=e(i),r.one("update",function(){p.removeChild(n)}).one("premount",function(){p.stub&&(p=r.root)}).on("update",function(){var e=w(i.val,r);if(e){if(!Array.isArray(e)){var n=JSON.stringify(e);if(n==f)return;f=n,c(m,function(e){e.unmount()}),d=[],m=[],e=Object.keys(e).map(function(n){return t(i,n,e[n])})}c(v(d,e),function(e){var t=d.indexOf(e),n=m[t];n&&(n.unmount(),d.splice(t,1),m.splice(t,1))});var l=p.childNodes,g=[].indexOf.call(l,s);c(e,function(n,c){var s=e.indexOf(n,c),v=d.indexOf(n,c);if(0>s&&(s=e.lastIndexOf(n,c)),0>v&&(v=d.lastIndexOf(n,c)),0>v){!f&&i.key&&(n=t(i,n,s));var h=new o({tmpl:a},{before:l[g+1+s],parent:r,root:p,loop:!0,item:n});return u(s,n,h)}return i.pos&&m[v][i.pos]!=s&&(m[v].one("update",function(e){e[i.pos]=s}),m[v].update()),s!=v?(p.insertBefore(l[g+v+1],l[g+s+1]),u(s,d.splice(v,1)[0],m.splice(v,1)[0])):void 0}),d=e.slice()}})}function r(e,t){d(e,function(e){1==e.nodeType&&c(e.attributes,function(n){/^(name|id)$/.test(n.name)&&(t[n.value]=e)})})}function i(e,t,r){function i(e,t,n){if(t.indexOf(y(0))>=0){var i={dom:e,expr:t};r.push(s(i,n))}}d(e,function(e){var r=e.nodeType;if(3==r&&"STYLE"!=e.parentNode.tagName&&i(e,e.nodeValue),1==r){var u=e.getAttribute("each");if(u)return n(e,t,u),!1;c(e.attributes,function(t){var n=t.name,r=n.split("__")[1];return i(e,t.value,{attr:r||n,bool:r}),r?(l(e,n),!1):void 0});var f=C[e.tagName.toLowerCase()];return f?(f=new o(f,{root:e,parent:t}),!1):void 0}})}function o(e,t){function n(){c(Object.keys(C),function(e){l[e]=w(C[e],v||f)})}function o(){if(f.trigger("premount"),g)u=d.firstChild,y.insertBefore(u,t.before||null);else for(;d.firstChild;)y.appendChild(d.firstChild);y.stub&&(f.root=y=v.root),v&&v.on("update",f.update).one("unmount",f.unmount),f.trigger("mount")}var u,f=b.observable(this),l=m(t.opts)||{},d=p(e.tmpl),v=t.parent,g=t.loop,h=[],y=t.root,x=t.item,C={};s(this,{parent:v,root:y,opts:l},x),c(y.attributes,function(e){C[e.name]=e.value}),this.update=function(e){s(f,e,x),n(),f.trigger("update",x),a(h,f,x),f.trigger("updated")},this.unmount=function(){var e=g?u:y,t=e.parentNode;if(t){if(v)t.removeChild(e);else for(;y.firstChild;)y.removeChild(y.firstChild);f.trigger("unmount"),v&&v.off("update",f.update).off("unmount",f.unmount),f.off("*")}},n(),r(d,this),e.fn&&e.fn.call(this,l),i(d,this,h),this.update(),o()}function u(e,t,n,r,i){n[e]=function(e){e=e||window.event,e.which=e.which||e.charCode||e.keyCode,e.target=e.target||e.srcElement,e.currentTarget=n,e.item=i,t.call(r,e)!==!0&&(e.preventDefault&&e.preventDefault(),e.returnValue=!1);var o=i?r.parent:r;o.update()}}function f(e,t,n){e&&(e.insertBefore(n,t),e.removeChild(t))}function a(e,t,n){c(e,function(e){var r=e.dom,i=e.attr,o=w(e.expr,t);if(null==o&&(o=""),e.value!==o){if(e.value=o,!i)return r.nodeValue=o;if(l(r,i),"function"==typeof o)u(i,o,r,t,n);else if("if"==i){var a=e.stub;o?a&&f(a.parentNode,a,r):(a=e.stub=a||document.createTextNode(""),f(r.parentNode,r,a))}else if(/^(show|hide)$/.test(i))"hide"==i&&(o=!o),r.style.display=o?"":"none";else if("value"==i)r.value=o;else if("riot"==i.slice(0,4))i=i.slice(5),o?r.setAttribute(i,o):l(r,i);else{if(e.bool){if(r[i]=o,!o)return;o=i}"object"!=typeof o&&r.setAttribute(i,o)}}})}function c(e,t){for(var n,r=0,i=(e||[]).length;i>r;r++)n=e[r],null!=n&&t(n,r)===!1&&r--;return e}function l(e,t){e.removeAttribute(t)}function s(e,t,n){return t&&c(Object.keys(t),function(n){e[n]=t[n]}),n?s(e,n):e}function p(e){var t=e.trim().slice(1,3).toLowerCase(),n=/td|th/.test(t)?"tr":"tr"==t?"tbody":"div",r=document.createElement(n);return r.stub=!0,r.innerHTML=e,r}function d(e,t){if(e)if(t(e)===!1)d(e.nextSibling,t);else for(e=e.firstChild;e;)d(e,t),e=e.nextSibling}function v(e,t){return e.filter(function(e){return t.indexOf(e)<0})}function m(e){function t(){}return t.prototype=e,new t}function g(e){var t=document.createElement("style");t.innerHTML=e,document.head.appendChild(t)}function h(e,t,n){var r=C[t];return r&&e?(r=new o(r,{root:e,opts:n}),x.push(r),r.on("unmount",function(){x.splice(x.indexOf(r),1)})):void 0}var b={version:"v2.0.11",settings:{}};b.observable=function(e){e=e||{};var t={},n=0;return e.on=function(r,i){return"function"==typeof i&&(i._id="undefined"==typeof i._id?n++:i._id,r.replace(/\S+/g,function(e,n){(t[e]=t[e]||[]).push(i),i.typed=n>0})),e},e.off=function(n,r){return"*"==n?t={}:n.replace(/\S+/g,function(e){if(r)for(var n,i=t[e],o=0;n=i&&i[o];++o)n._id==r._id&&(i.splice(o,1),o--);else t[e]=[]}),e},e.one=function(t,n){return n&&(n.one=1),e.on(t,n)},e.trigger=function(n){for(var r,i=[].slice.call(arguments,1),o=t[n]||[],u=0;r=o[u];++u)r.busy||(r.busy=1,r.apply(e,r.typed?[n].concat(i):i),r.one?(o.splice(u,1),u--):o[u]!==r&&u--,r.busy=0);return e},e},function(e,t){function n(){return u.hash.slice(1)}function r(e){return e.split("/")}function i(e){e.type&&(e=n()),e!=o&&(f.trigger.apply(null,["H"].concat(r(e))),o=e)}if(this.top){var o,u=location,f=e.observable(),a=window,c=e.route=function(e){e[0]?(u.hash=e,i(e)):f.on("H",e)};c.exec=function(e){e.apply(null,r(n()))},c.parser=function(e){r=e},a.addEventListener?a.addEventListener(t,i,!1):a.attachEvent("on"+t,i)}}(b,"hashchange");var y=function(e,t,n){return function(r){return t=b.settings.brackets||e,n!=t&&(n=t.split(" ")),r&&r.test?t==e?r:RegExp(r.source.replace(/\{/g,n[0].replace(/(?=.)/g,"\\")).replace(/\}/g,n[1].replace(/(?=.)/g,"\\")),r.global?"g":""):n[r]}}("{ }"),w=function(){function e(e,n){return n=(e||y(0)+y(1)).replace(y(/\\{/),"￰").replace(y(/\\}/),"￱").split(y(i)),new Function("d","return "+(n[0]||n[2]||n[3]?"["+n.map(function(e,n){return n%2?t(e,1):'"'+e.replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"'}).join(",")+'].join("")':t(n[1])).replace(/\uFFF0/g,y(0)).replace(/\uFFF1/g,y(1))+";")}function t(e,t){return e=e.replace(/\n/g," ").replace(y(/^[{ ]+|[ }]+$|\/\*.+?\*\//g),""),/^\s*[\w- "']+ *:/.test(e)?"["+e.replace(/\W*([\w- ]+)\W*:([^,]+)/g,function(e,t,r){return r.replace(/[^&|=!><]+/g,n)+'?"'+t.trim()+'":"",'})+'].join(" ")':n(e,t)}function n(e,t){return e=e.trim(),e?"(function(v){try{v="+(e.replace(o,function(e,t,n){return n?"(d."+n+"===undefined?window."+n+":d."+n+")":e})||"x")+"}finally{return "+(t?'!v&&v!==0?"":v':"v")+"}}).call(d)":""}var r={},i=/({[\s\S]*?})/,o=/(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_]\w*)/gi;return function(t,n){return t&&(r[t]=r[t]||e(t))(n)}}(),x=[],C={};b.tag=function(e,t,n,r){"function"==typeof n?r=n:n&&g(n),C[e]={name:e,tmpl:t,fn:r}},b.mount=function(e,t,n){function r(e){var r=t||e.tagName.toLowerCase(),o=h(e,r,n);o&&i.push(o)}"*"==e&&(e=Object.keys(C).join(", ")),"object"==typeof t&&(n=t,t=0);var i=[];return e.tagName?(r(e),i[0]):(c(document.querySelectorAll(e),r),i)},b.update=function(){return c(x,function(e){e.update()})},b.mountTo=b.mount,b.util={brackets:y,tmpl:w},"object"==typeof exports?module.exports=b:"function"==typeof define&&define.amd?define(function(){return b}):this.riot=b}();
},{}],3:[function(require,module,exports){
var riot=require("riot");riot.tag("app",'<div id="header"> <a id="yc" href="http://www.ycombinator.com"> <img src="https://news.ycombinator.com/y18.gif"> </a> <h1><a href="#">Hacker News</a></h1> <span class="source"> Built with <a href="https://muut.com/riotjs/" target="_blank">Riot.js</a> | <a href="https://github.com/txchen/riot-hn" target="_blank">Source</a> </span> </div> <div id="placeholder"></div>',function(){var e=this;this.loadView=function(t,i){var r=document.getElementById("hnview");r&&r.remove();var o=document.getElementById("placeholder");o.insertAdjacentHTML("afterend",'<div id="hnview"></div>'),e.currentview=t+i,riot.mountTo(document.getElementById("hnview"),t,{data:i}),e.update()}.bind(this),this.studyRoute=function(t,i){switch(t){case"user":require("./views/user-view.html"),e.loadView("user-view",i);break;case"item":require("./views/item-view.html"),e.loadView("item-view",i);break;case"news":require("./views/news-view.html"),e.loadView("news-view",i);break;default:riot.route("news/1")}}.bind(this),riot.route(e.studyRoute),this.on("mount",function(){riot.route.exec(e.studyRoute)})});
},{"./views/item-view.html":9,"./views/news-view.html":10,"./views/user-view.html":11,"riot":2}],4:[function(require,module,exports){
var riot=require("riot");riot.tag("comment",'<li show="{ data.text }"> <div class="comhead"> <a class="toggle" onclick="{ toggle }">{ open ? \'[-]\' : \'[+]\' }</a> <a href="#user/{ data.by }">{ data.by }</a> { filters.fromNow(data.time) } ago </div> <div class="comment-content" name="commentcontent" show="{ open }"></div> <ul class="child-comments" if="{ data.kids }" show="{ open }"> <comment each="{ comments }" data="{ this }"></comment> </ul> </li>',function(t){var e=require("../store"),o=this;o.data=t.data,o.open=!0,this.on("mount",function(){e.fetchItems(o.data.kids,function(t){o.comments=t,o.update()}),o.commentcontent.innerHTML=o.data.text}),this.toggle=function(){this.open=!this.open}.bind(this)});
},{"../store":8,"riot":2}],5:[function(require,module,exports){
var riot=require("riot");riot.tag("item",'<span class="index">{ opts.index }.</span> <p> <a class="title" href="{ href() }" target="_blank">{ itemdata.title }</a> <span class="domain" show="{ showDomain() }"> ({ filters.domain(itemdata.url) }) </span> </p> <p class="subtext"> <span show="{ showInfo() }"> { itemdata.score } points by <a href="#user/{ itemdata.by }">{ itemdata.by }</a> </span> { filters.fromNow(itemdata.time) } ago <span class="comments-link" show="{ showInfo() }"> | <a href="#item/{ itemdata.id }">comments</a> </span> </p>',function(t){var a=this;a.itemdata=t.data,this.href=function(){return a.itemdata.url||"#/item/"+a.itemdata.id}.bind(this),this.showInfo=function(){return"story"===a.itemdata.type||"poll"===a.itemdata.type}.bind(this),this.showDomain=function(){return"story"===a.itemdata.type}.bind(this)});
},{"riot":2}],6:[function(require,module,exports){
var parser=document.createElement("a");filters={fromNow:function(r){var e=Date.now()/1e3-Number(r);return 3600>e?~~(e/60)+" minutes":86400>e?~~(e/3600)+" hours":~~(e/86400)+" days"},domain:function(r){return parser.href=r,parser.hostname}};
},{}],7:[function(require,module,exports){
require("./filters.js"),require("./app.html"),require("riot").mount("app");
},{"./app.html":3,"./filters.js":6,"riot":2}],8:[function(require,module,exports){
var api=new Firebase("https://hacker-news.firebaseio.com/v0"),storiesPerPage=30,cachedStoryIds=[],Emitter=require("events").EventEmitter,store=module.exports=new Emitter;api.child("topstories").on("value",function(e){cachedStoryIds=e.val(),store.emit("update")}),store.fetchItem=function(e,t){api.child("item/"+e).once("value",function(e){t(e.val())})},store.fetchUser=function(e,t){api.child("user/"+e).once("value",function(e){t(e.val())})},store.fetchItems=function(e,t){function r(r){o.push(r),o.length>=e.length&&t(o)}if(!e||!e.length)return t([]);var o=[];e.forEach(function(e){store.fetchItem(e,r)})},store.fetchItemsByPage=function(e,t){var r=(e-1)*storiesPerPage,o=e*storiesPerPage,s=cachedStoryIds.slice(r,o);store.fetchItems(s,t)};
},{"events":1}],9:[function(require,module,exports){
var riot=require("riot");riot.tag("item-view",'<div class="view item-view" show="{ items.length }"> <item class="item" each="{ items }" data="{ this }"></item> <ul class="poll-options" if="{ pollOptions }"> <li each="{ pollOptions }"> <p>{ text }</p> <p class="subtext">{ score } points</p> </li> </ul> <ul class="comments" if="{ comments }"> <comment each="{ comments }" data="{ this }"></comment> </ul> <p show="{ !comments.length }">No comments yet.</p> </div>',function(t){require("../components/item.html"),require("../components/comment.html");var e=require("../store"),i=this;i.items=[],this.fetchComments=function(){e.fetchItems(i.items[0].kids,function(t){i.comments=t,i.update()})}.bind(this),this.fetchPollOptions=function(){e.fetchItems(i.items[0].parts,function(t){i.pollOptions=t,i.update()})}.bind(this),i.on("mount",function(){e.fetchItem(t.data,function(t){i.items=[t],i.fetchComments(),"poll"===t.type&&i.fetchPollOptions(),i.update()})})});
},{"../components/comment.html":4,"../components/item.html":5,"../store":8,"riot":2}],10:[function(require,module,exports){
var riot=require("riot");riot.tag("news-view",'<div class="view news-view" class="{loading: !items.length}"> <ul> <li class="item" each="{ item, i in items }" track-by="id"> <item data="{ item }" index="{ (parent.page - 1) * 30 + i + 1}" ></item> </li> </ul> <div class="nav" show="{ items.length }"> <a if="{ page > 1 }" href="#news/{ page - 1 }">&lt; prev</a> <a if="{ page < 4 }" href="#news/{ page - -1 }">more...</a> </div> </div>',function(e){require("../components/item.html");var i=require("../store"),t=this;t.page=e.data,t.items=[],this.fetchNews=function(){i.fetchItemsByPage(t.page,function(e){t.items=e,t.displayPage=t.page,t.update()})}.bind(this),t.on("mount",function(){t.fetchNews(),i.on("update",t.fetchNews)}),t.on("unmount",function(){i.removeListener("update",t.fetchNews)})});
},{"../components/item.html":5,"../store":8,"riot":2}],11:[function(require,module,exports){
var riot=require("riot");riot.tag("user-view",'<div class="view user-view" show="{ user }"> <ul> <li><span class="label">user:</span> { user.id }</li> <li><span class="label">created:</span> { filters.fromNow(user.created) } ago</li> <li><span class="label">karma:</span> { user.karma }</li> <li> <span class="label">about:</span> <div class="about" name="about"></div> </li> </ul> <p class="links"> <a href="https://news.ycombinator.com/submitted?id={ user.id }">submissions</a><br> <a href="https://news.ycombinator.com/threads?id={ user.id }">comments</a> </p> </div>',function(s){var a=require("../store"),e=this;e.on("mount",function(){a.fetchUser(s.data,function(s){e.user=s,e.about.innerHTML=e.user.about,e.update()})})});
},{"../store":8,"riot":2}]},{},[7])


//# sourceMappingURL=index.js.map