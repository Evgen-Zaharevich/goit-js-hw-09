!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var r,i=o("h6c0i");function a(e,n){var t=Math.random()>.3;return new Promise((function(o,r){setTimeout((function(){t?o({position:e,delay:n}):r({position:e,delay:n})}),n)}))}(r="form",document.querySelector(r)).addEventListener("submit",(function(e){e.preventDefault();for(var n=e.target.elements,t=n.delay,o=n.step,r=n.amount,u=Number(t.value),l=Number(o.value),c=Number(r.value),f=0;f<c;f+=1){a(f+1,u).then((function(e){var n=e.position,t=e.delay;return i.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;return i.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))})),u+=l}}))}();
//# sourceMappingURL=03-promises.87d59703.js.map
