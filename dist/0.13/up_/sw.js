const e="mxg-v0.13.0",s=["./","favicon.ico","src/icons/circle.ico","src/icons/circle.svg","src/icons/tire.svg","src/icons/wheel.svg","src/index.html","src/style.css","src/ts/app.js","src/images/UoL_Logo.png"];self.addEventListener("install",t=>{t.waitUntil((async()=>{(await caches.open(e)).addAll(s)})())}),self.addEventListener("activate",s=>{s.waitUntil((async()=>{let s=await caches.keys();await Promise.all(s.map(s=>{if(s!==e)return caches.delete(s)})),await clients.claim()})())}),self.addEventListener("fetch",s=>{if("navigate"===s.request.mode){s.respondWith(caches.match("/"));return}s.respondWith((async()=>{let t=await caches.open(e);return await t.match(s.request.url)||new Response(null,{status:404})})())});
//# sourceMappingURL=sw.js.map
