if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>a(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/9bpQ3mZVrwWwMn_NaAMrp/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/9bpQ3mZVrwWwMn_NaAMrp/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/29-26240771a5cdee23.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/424-100887daa9bf7a1a.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/690-1d477cae34b95f12.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/698-0a9cbae465497627.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/74-30953e8a334223a3.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/763-be16cb9981b16e64.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/7af305c8-ad4e80c0da4c036a.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/884-f1e9d1e43d904aab.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/930-e2cd63a4899ab2da.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/(details)/%5Bid%5D/page-af4f3b9cc6685cba.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/(details)/%5Bid%5D/watch/%5Bepisode_id%5D/page-692f3d9dd17ccebd.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/(details)/layout-4f80246cf06b42f5.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/(main)/layout-4aefc62b72270460.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/(main)/page-f631874ae13a3ec0.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/error-4d5819a43a29ed7a.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/layout-7f708b2fc1edb85f.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/app/loading-2142ce4f1fe3bedc.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/bce60fc1-64fbd4a0b44b107c.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/cd72e915-522e0af0d548ff04.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/main-app-0f4732a9e9ad3d5f.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/main-b7979f02fdcc691f.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-3d1642c11fdb1136.js",revision:"9bpQ3mZVrwWwMn_NaAMrp"},{url:"/_next/static/css/990afcf268a40da9.css",revision:"990afcf268a40da9"},{url:"/_next/static/css/dc6c6c460cea390e.css",revision:"dc6c6c460cea390e"},{url:"/_next/static/media/6728a7319476fa9d-s.p.ttf",revision:"875d4258ee6fbe724cfa1340568880ad"},{url:"/bg_placeholder.webp",revision:"c4b388d44d7684521cac2ea89db90801"},{url:"/icon.png",revision:"9f3e5b74e26388b87376fb5691510ed2"},{url:"/manifest.json",revision:"7866ed272c1ecef8ced4ada0d7a4f793"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
