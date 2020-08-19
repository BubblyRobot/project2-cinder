/*!
 * chartjs-plugin-deferred
 * http://chartjs.org/
 * Version: 0.2.0
 *
 * Copyright 2016 Simon Brunel
 * Released under the MIT license
 * https://github.com/chartjs/chartjs-plugin-deferred/blob/master/LICENSE.md
 */
"use strict";!function(){var e=window.Chart,t=e.helpers,n="_chartjs_deferred",r="_deferred_model";function a(e,t){var n=parseInt(e,10);return isNaN(n)?0:"string"==typeof e&&-1!==e.indexOf("%")?n/100*t:n}function f(e){var t=e[r],n=e.chart.canvas;if(null===n.offsetParent)return!1;var f=n.getBoundingClientRect(),d=a(t.yOffset||0,f.height),l=a(t.xOffset||0,f.width);return f.right-l>=0&&f.bottom-d>=0&&f.left+l<=window.innerWidth&&f.top+d<=window.innerHeight}function d(t){var a=t.target[n];a.ticking||(a.ticking=!0,e.platform.defer((function(){var e,t,n=a.instances.slice(),d=n.length;for(t=0;t<d;++t)f(e=n[t])&&(o(e),e[r].appeared=!0,e.update());a.ticking=!1})))}function l(e){if(e.nodeType===Node.ELEMENT_NODE){var n=t.getStyle(e,"overflow-x"),r=t.getStyle(e,"overflow-y");return"auto"===n||"scroll"===n||"auto"===r||"scroll"===r}return e.nodeType===Node.DOCUMENT_NODE}function o(e){e[r].elements.forEach((function(r){var a=r[n].instances;a.splice(a.indexOf(e),1),a.length||(t.removeEvent(r,"scroll",d),delete r[n])})),e[r].elements=[]}e.Deferred=e.Deferred||{},e.Deferred.defaults={enabled:!0,xOffset:0,yOffset:0,delay:0},e.platform=t.extend(e.platform||{},{defer:function(e,n,r){var a=function(){e.call(r)};n?window.setTimeout(a,n):t.requestAnimFrame.call(window,a)}}),e.plugins.register({beforeInit:function(a){(a[r]=function(n){var r=e.Deferred.defaults,a=n.options.deferred,f=t.getValueOrDefault;return void 0===a?a={}:"boolean"==typeof a&&(a={enabled:a}),{enabled:f(a.enabled,r.enabled),xOffset:f(a.xOffset,r.xOffset),yOffset:f(a.yOffset,r.yOffset),delay:f(a.delay,r.delay),appeared:!1,delayed:!1,loaded:!1,elements:[]}}(a)).enabled&&function(e){for(var t,a,f=e.chart.canvas.parentElement;f;)l(f)&&(0===(a=(t=f[n]||(f[n]={})).instances||(t.instances=[])).length&&f.addEventListener("scroll",d,{passive:!0}),a.push(e),e[r].elements.push(f)),f=f.parentElement||f.ownerDocument}(a)},beforeDatasetsUpdate:function(t){var n=t[r];if(!n.enabled)return!0;if(!n.loaded){if(!n.appeared&&!f(t))return!1;if(n.appeared=!0,n.loaded=!0,o(t),n.delay>0)return n.delayed=!0,e.platform.defer((function(){n.delayed=!1,t.update()}),n.delay),!1}return!n.delayed&&void 0}})}();