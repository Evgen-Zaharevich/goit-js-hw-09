!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequired7c6=r);var o,i=r("h6c0i");function u(e,n){var t=Math.random()>.3;return new Promise((function(r,o){setTimeout((function(){t?r("✅ Fulfilled promise ".concat(e," in ").concat(n,"ms")):o("❌ Rejected promise ".concat(e," in ").concat(n,"ms"))}),n)}))}(o="form",document.querySelector(o)).addEventListener("submit",(function(e){e.preventDefault();for(var n=e.target.elements,t=n.delay,r=n.step,o=n.amount,a=Number(t.value),c=Number(r.value),f=Number(o.value),l=0;l<f;l+=1){u(l+1,a).then((function(e){return i.Notify.success(e)})).catch((function(e){return i.Notify.failure(e)})),a+=c}}))}();
//# sourceMappingURL=03-promises.c27088a2.js.map
