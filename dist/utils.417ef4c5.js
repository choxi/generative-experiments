parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Xd6L":[function(require,module,exports) {
function t(i,r){if(!(this instanceof t))return new t(i,r);this.x=i||0,this.y=r||0}exports=module.exports=t,t.fromArray=function(i){return new t(i[0]||0,i[1]||0)},t.fromObject=function(i){return new t(i.x||0,i.y||0)},t.prototype.addX=function(t){return this.x+=t.x,this},t.prototype.addY=function(t){return this.y+=t.y,this},t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.addScalar=function(t){return this.x+=t,this.y+=t,this},t.prototype.addScalarX=function(t){return this.x+=t,this},t.prototype.addScalarY=function(t){return this.y+=t,this},t.prototype.subtractX=function(t){return this.x-=t.x,this},t.prototype.subtractY=function(t){return this.y-=t.y,this},t.prototype.subtract=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.subtractScalar=function(t){return this.x-=t,this.y-=t,this},t.prototype.subtractScalarX=function(t){return this.x-=t,this},t.prototype.subtractScalarY=function(t){return this.y-=t,this},t.prototype.divideX=function(t){return this.x/=t.x,this},t.prototype.divideY=function(t){return this.y/=t.y,this},t.prototype.divide=function(t){return this.x/=t.x,this.y/=t.y,this},t.prototype.divideScalar=function(t){return 0!==t?(this.x/=t,this.y/=t):(this.x=0,this.y=0),this},t.prototype.divideScalarX=function(t){return 0!==t?this.x/=t:this.x=0,this},t.prototype.divideScalarY=function(t){return 0!==t?this.y/=t:this.y=0,this},t.prototype.invertX=function(){return this.x*=-1,this},t.prototype.invertY=function(){return this.y*=-1,this},t.prototype.invert=function(){return this.invertX(),this.invertY(),this},t.prototype.multiplyX=function(t){return this.x*=t.x,this},t.prototype.multiplyY=function(t){return this.y*=t.y,this},t.prototype.multiply=function(t){return this.x*=t.x,this.y*=t.y,this},t.prototype.multiplyScalar=function(t){return this.x*=t,this.y*=t,this},t.prototype.multiplyScalarX=function(t){return this.x*=t,this},t.prototype.multiplyScalarY=function(t){return this.y*=t,this},t.prototype.normalize=function(){var i=this.length();return 0===i?(this.x=1,this.y=0):this.divide(t(i,i)),this},t.prototype.norm=t.prototype.normalize,t.prototype.limit=function(t,i){return Math.abs(this.x)>t&&(this.x*=i),Math.abs(this.y)>t&&(this.y*=i),this},t.prototype.randomize=function(t,i){return this.randomizeX(t,i),this.randomizeY(t,i),this},t.prototype.randomizeX=function(t,i){var o=Math.min(t.x,i.x),n=Math.max(t.x,i.x);return this.x=r(o,n),this},t.prototype.randomizeY=function(t,i){var o=Math.min(t.y,i.y),n=Math.max(t.y,i.y);return this.y=r(o,n),this},t.prototype.randomizeAny=function(t,i){return Math.round(Math.random())?this.randomizeX(t,i):this.randomizeY(t,i),this},t.prototype.unfloat=function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},t.prototype.toFixed=function(t){return void 0===t&&(t=8),this.x=this.x.toFixed(t),this.y=this.y.toFixed(t),this},t.prototype.mixX=function(t,i){return void 0===i&&(i=.5),this.x=(1-i)*this.x+i*t.x,this},t.prototype.mixY=function(t,i){return void 0===i&&(i=.5),this.y=(1-i)*this.y+i*t.y,this},t.prototype.mix=function(t,i){return this.mixX(t,i),this.mixY(t,i),this},t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.copyX=function(t){return this.x=t.x,this},t.prototype.copyY=function(t){return this.y=t.y,this},t.prototype.copy=function(t){return this.copyX(t),this.copyY(t),this},t.prototype.zero=function(){return this.x=this.y=0,this},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.cross=function(t){return this.x*t.y-this.y*t.x},t.prototype.projectOnto=function(t){var i=(this.x*t.x+this.y*t.y)/(t.x*t.x+t.y*t.y);return this.x=i*t.x,this.y=i*t.y,this},t.prototype.horizontalAngle=function(){return Math.atan2(this.y,this.x)},t.prototype.horizontalAngleDeg=function(){return o(this.horizontalAngle())},t.prototype.verticalAngle=function(){return Math.atan2(this.x,this.y)},t.prototype.verticalAngleDeg=function(){return o(this.verticalAngle())},t.prototype.angle=t.prototype.horizontalAngle,t.prototype.angleDeg=t.prototype.horizontalAngleDeg,t.prototype.direction=t.prototype.horizontalAngle,t.prototype.rotate=function(t){var i=this.x*Math.cos(t)-this.y*Math.sin(t),r=this.x*Math.sin(t)+this.y*Math.cos(t);return this.x=i,this.y=r,this},t.prototype.rotateDeg=function(t){return t=n(t),this.rotate(t)},t.prototype.rotateTo=function(t){return this.rotate(t-this.angle())},t.prototype.rotateToDeg=function(t){return t=n(t),this.rotateTo(t)},t.prototype.rotateBy=function(t){var i=this.angle()+t;return this.rotate(i)},t.prototype.rotateByDeg=function(t){return t=n(t),this.rotateBy(t)},t.prototype.distanceX=function(t){return this.x-t.x},t.prototype.absDistanceX=function(t){return Math.abs(this.distanceX(t))},t.prototype.distanceY=function(t){return this.y-t.y},t.prototype.absDistanceY=function(t){return Math.abs(this.distanceY(t))},t.prototype.distance=function(t){return Math.sqrt(this.distanceSq(t))},t.prototype.distanceSq=function(t){var i=this.distanceX(t),r=this.distanceY(t);return i*i+r*r},t.prototype.length=function(){return Math.sqrt(this.lengthSq())},t.prototype.lengthSq=function(){return this.x*this.x+this.y*this.y},t.prototype.magnitude=t.prototype.length,t.prototype.isZero=function(){return 0===this.x&&0===this.y},t.prototype.isEqualTo=function(t){return this.x===t.x&&this.y===t.y},t.prototype.toString=function(){return"x:"+this.x+", y:"+this.y},t.prototype.toArray=function(){return[this.x,this.y]},t.prototype.toObject=function(){return{x:this.x,y:this.y}};var i=180/Math.PI;function r(t,i){return Math.floor(Math.random()*(i-t+1)+t)}function o(t){return t*i}function n(t){return t/i}
},{}],"zRU7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=e(require("victor"));function e(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var u=e[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(t,u.key,u)}}function i(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}var r=function(){function e(t,u,i){n(this,e),this.x=t,this.y=u,this.z=i,void 0===i&&(this.z=0)}return i(e,[{key:"xAngle",value:function(){return new t.default(this.z,this.y).angle()}},{key:"yAngle",value:function(){return new t.default(this.z,this.x).angle()}},{key:"add",value:function(t){return new e(this.x+t.x,this.y+t.y)}},{key:"subtract",value:function(t){return new e(this.x-t.x,this.y-t.y)}},{key:"multiply",value:function(t){return new e(this.x*t,this.y*t)}},{key:"magnitude",value:function(){var t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}},{key:"rotate",value:function(n){var u=new t.default(this.x,this.y);return u.rotate(n),new e(u.x,u.y)}},{key:"unit",value:function(){var t=this.magnitude();return 0===t?new e(0,0):this.multiply(1/t)}},{key:"equals",value:function(t){return this.x===t.x&&this.y===t.y}}]),e}();exports.default=r;
},{"victor":"Xd6L"}],"NePj":[function(require,module,exports) {
"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=function(){function n(t,r,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:255;e(this,n),this.r=t,this.g=r,this.b=i,this.a=a}return t(n,[{key:"toP5",value:function(e){return e.color(this.r,this.g,this.b,this.a)}},{key:"alpha",value:function(e){return new n(this.r,this.g,this.b,e)}}],[{key:"lerp",value:function(e,t,r){return new n(r*e.r+(1-r)*t.r,r*e.g+(1-r)*t.g,r*e.b+(1-r)*t.b,r*e.a+(1-r)*t.a)}}]),n}();r.palettes={tron:{blue:new r(95,212,230),white:new r(239,233,234)},flat:{alizarin:new r(231,76,60),amethyst:new r(155,89,182),asbestos:new r(127,140,141),belizeHole:new r(41,128,185),carrot:new r(230,126,34),clouds:new r(236,240,241),concrete:new r(149,165,166),emerald:new r(46,204,113),greenSea:new r(22,160,133),midnightBlue:new r(44,62,80),nephritis:new r(39,174,96),orange:new r(243,156,18),peterRiver:new r(52,152,219),pomegranate:new r(192,57,43),pumpkin:new r(211,84,0),silver:new r(189,195,199),sunFlower:new r(241,196,15),turquoise:new r(26,188,156),wetAsphalt:new r(52,73,94),wisteria:new r(142,68,173)}};var i=r;exports.default=i;
},{}],"MgTz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("./math/vector")),r=n(require("./renderables/color"));function n(e){return e&&e.__esModule?e:{default:e}}function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function a(e,r,n){return r&&o(e.prototype,r),n&&o(e,n),e}var l=1,i=2,u=function(){function n(){t(this,n)}return a(n,null,[{key:"debugBezier",value:function(e,r,n,t,o){e.push(),e.noFill(),e.stroke(255,102,0),e.line(r.x,r.y,n.x,n.y),e.line(t.x,t.y,o.x,o.y),e.stroke(0,0,0),e.bezier(r.x,r.y,n.x,n.y,t.x,t.y,o.x,o.y),e.pop()}},{key:"fromCenter",value:function(r,n,t){var o=new e.default(n,0).rotate(t);return r.add(o)}},{key:"random",value:function(e,r){null==r&&(r=e,e=0);var n=r-e;return Math.floor(Math.random()*n)+e}},{key:"randomColor",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.default.palettes.flat,t=Object.keys(e),o=t[n.random(t.length)];return e[o]}},{key:"setGradient",value:function(e,r,n,t,o,a,u,f){if(e.noStroke(),f===l)for(var v=n;v<=n+o;v++){var d=e.map(v,n,n+o,0,1),c=e.lerpColor(a,u,d);e.fill(c),e.rect(r,v,t,1)}else if(f===i)for(var y=r;y<=r+t;y++){var s=e.map(y,r,r+t,0,1),p=e.lerpColor(a,u,s);e.fill(p),e.rect(y,n,1,o)}}},{key:"drawGradient",value:function(e,r,n,t,o){for(var a=o;a>0;--a){var l=lerpColor(n,t,a/o);fill(l),ellipse(e,r,a,a)}}},{key:"radialGradient",value:function(e,r,n,t,o,a){noStroke();for(var l=Math.max(n,t);l>0;l--){var i=l/Math.max(n,t),u=lerpColor(o,a,i);fill(u),ellipse(e,r,i*n,i*t)}}},{key:"toGPUCoordinate",value:function(e,r){var n=window.innerHeight;return{x:e-window.innerWidth/2,y:r-n/2}}}]),n}();exports.default=u;
},{"./math/vector":"zRU7","./renderables/color":"NePj"}]},{},["MgTz"], null)
//# sourceMappingURL=/generative-experiments/utils.417ef4c5.js.map