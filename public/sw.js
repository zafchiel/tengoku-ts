if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>t(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),i)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Lwt7J1_3_vy5d8M3ces4M/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/Lwt7J1_3_vy5d8M3ces4M/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/29-26240771a5cdee23.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/399-3e76c0ae2c4ae0a9.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/518-02e53940f583e45d.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/527-a8f753c30d3e6f32.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/698-0a9cbae465497627.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/759-ebe43b6e183228f7.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/7af305c8-ad4e80c0da4c036a.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/864-cbb0bfb79e59951c.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/884-f1e9d1e43d904aab.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/938-20ba831c368bc699.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(details)/%5Bid%5D/page-caecc1253bdd99ae.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(details)/%5Bid%5D/watch/%5Bepisode_id%5D/page-e314ff404ee84d5e.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(details)/layout-736e440825a5ab51.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(main)/layout-f2b1e66a24750192.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(main)/page-33da25d76ffa126f.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(user)/layout-436b1cbf7dd3054b.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/(user)/user/%5Buser_id%5D/page-469054b2fcb65a86.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/error-09ed0fbc5dc260c1.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/layout-7bcbab619876270a.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/app/loading-175fcd86f98bb472.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/bce60fc1-64fbd4a0b44b107c.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/cd72e915-522e0af0d548ff04.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/main-1ffd285e67438083.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/main-app-092d2fdd939b4494.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1d20cf36aeba75e4.js",revision:"Lwt7J1_3_vy5d8M3ces4M"},{url:"/_next/static/css/990afcf268a40da9.css",revision:"990afcf268a40da9"},{url:"/_next/static/css/afd66ec4a69d718e.css",revision:"afd66ec4a69d718e"},{url:"/_next/static/media/6728a7319476fa9d-s.p.ttf",revision:"875d4258ee6fbe724cfa1340568880ad"},{url:"/bg_placeholder.webp",revision:"c4b388d44d7684521cac2ea89db90801"},{url:"/icon.png",revision:"9f3e5b74e26388b87376fb5691510ed2"},{url:"/logo.png",revision:"7d777319df5c357991d670fa1ae16761"},{url:"/manifest.json",revision:"714e43c5ae579d41059c428360bd1141"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));