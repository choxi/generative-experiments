parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A4Ui":[function(require,module,exports) {
function n(n,r){if(!(n instanceof r))throw new TypeError("Cannot call a class as a function")}function r(n,r){return a(n)||e(n,r)||i(n,r)||t()}function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(n,r){if(n){if("string"==typeof n)return o(n,r);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(n,r):void 0}}function o(n,r){(null==r||r>n.length)&&(r=n.length);for(var t=0,i=new Array(r);t<r;t++)i[t]=n[t];return i}function e(n,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n)){var t=[],i=!0,o=!1,e=void 0;try{for(var a,s=n[Symbol.iterator]();!(i=(a=s.next()).done)&&(t.push(a.value),!r||t.length!==r);i=!0);}catch(c){o=!0,e=c}finally{try{i||null==s.return||s.return()}finally{if(o)throw e}}return t}}function a(n){if(Array.isArray(n))return n}console.log("Starting spark-brush");var s=window.innerWidth,c=window.innerHeight,u={},l=[];function f(){s=window.innerWidth,c=window.innerHeight,frameRate(30),createCanvas(s,c,WEBGL)}function d(){var n=new m(mouseX-s/2,mouseY-c/2);l.push(n)}function h(){background(0),noStroke(),Object.entries(u).forEach(function(n){var t=r(n,2),i=t[0],o=t[1];fill(o.color),ellipse(o.x,o.y,o.size),o.y+=random(50)-25,o.x+=random(50)-25,o.size*=.5,o.size<=.1&&delete u[i]}),l.forEach(function(n){if(random(2)<50){var r=new y;r.x=n.x,r.y=n.y,r.originX=n.x,r.originY=n.y,u[r.id]=r}})}var y=function r(){n(this,r),this.id=uuidv4(),this.x=random(s)-s/2,this.y=random(c)-c/2,this.originX=this.x,this.originY=this.y,this.speed=random(10)+1,this.size=random(10)+50,this.color=color(random(255),random(255),random(255),100)},m=function r(t,i){n(this,r),this.x=t,this.y=i};
},{}]},{},["A4Ui"], null)
//# sourceMappingURL=/generative-experiments/spark-brush.d0166a4e.js.map