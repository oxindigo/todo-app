const V="todo-v6";const CORE=["./","index.html","bg.jpg","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(r.mode==="navigate"||(u.origin===location.origin&&/\/(index\.html)?$/.test(u.pathname))){e.respondWith(fetch(r.url,{cache:"no-store"}).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put("index.html",c));}return res;}).catch(()=>caches.match("index.html")));return;}
  if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const c=res.clone();caches.open(V).then(x=>x.put(r,c));}return res;}).catch(()=>hit);return hit||net;}));}
});
