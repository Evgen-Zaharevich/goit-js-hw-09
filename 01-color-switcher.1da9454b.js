const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body;let o=null;function r(t){t.setAttribute("disabled",!0)}function a(t){t.removeAttribute("disabled")}t.addEventListener("click",(function(){o=setInterval((()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),r(t),a(e)})),e.addEventListener("click",(function(){clearInterval(o),a(t),r(e)}));
//# sourceMappingURL=01-color-switcher.1da9454b.js.map