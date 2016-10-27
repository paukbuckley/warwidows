/*
  mediaCheck - http://github.com/sparkbox/mediaCheck
  Version: 0.4.6, 10-21-2016 Author: Rob Tarr (http://twitter.com/robtarr)
*/
(function(){window.mediaCheck=function(options){var breakpoints,checkQuery,convertEmToPx,createListener,getPXValue,hasMatchMedia,i,mmListener,mq,mqChange;mq=void 0;mqChange=void 0;createListener=void 0;convertEmToPx=void 0;getPXValue=void 0;hasMatchMedia=window.matchMedia!==undefined&&!!window.matchMedia("!").addListener;if(hasMatchMedia){mqChange=function(mq,options){if(mq.matches){if(typeof options.entry==="function"){options.entry(mq)}}else{if(typeof options.exit==="function"){options.exit(mq)}}if(typeof options.both==="function"){return options.both(mq)}};createListener=function(){mq=window.matchMedia(options.media);mq.addListener(function(){return mqChange(mq,options)});window.addEventListener("orientationchange",function(){mq=window.matchMedia(options.media);return mqChange(mq,options)},false);return mqChange(mq,options)};return createListener()}else{breakpoints={};mqChange=function(mq,options){if(mq.matches){if(typeof options.entry==="function"&&(breakpoints[options.media]===false||breakpoints[options.media]==null)){options.entry(mq)}}else{if(typeof options.exit==="function"&&(breakpoints[options.media]===true||breakpoints[options.media]==null)){options.exit(mq)}}if(typeof options.both==="function"){options.both(mq)}return breakpoints[options.media]=mq.matches};convertEmToPx=function(value){var emElement,px;emElement=void 0;emElement=document.createElement("div");emElement.style.width="1em";emElement.style.position="absolute";document.body.appendChild(emElement);px=value*emElement.offsetWidth;document.body.removeChild(emElement);return px};getPXValue=function(width,unit){var value;value=void 0;switch(unit){case"em":value=convertEmToPx(width);break;default:value=width}return value};for(i in options){breakpoints[options.media]=null}checkQuery=function(parts){var constraint,dimension,matches,ratio,value,windowHeight,windowWidth;constraint=parts[1];dimension=parts[2];if(parts[4]){value=getPXValue(parseInt(parts[3],10),parts[4])}else{value=parts[3]}windowWidth=window.innerWidth||document.documentElement.clientWidth;windowHeight=window.innerHeight||document.documentElement.clientHeight;if(dimension==="width"){matches=constraint==="max"&&value>windowWidth||constraint==="min"&&value<windowWidth}else if(dimension==="height"){matches=constraint==="max"&&value>windowHeight||constraint==="min"&&value<windowHeight}else if(dimension==="aspect-ratio"){ratio=windowWidth/windowHeight;matches=constraint==="max"&&eval(ratio)<eval(value)||constraint==="min"&&eval(ratio)>eval(value)}return matches};mmListener=function(){var j,len,matches,media,medias,parts;medias=options.media.split(/\sand\s|,\s/);matches=true;for(j=0,len=medias.length;j<len;j++){media=medias[j];parts=media.match(/\((.*?)-(.*?):\s([\d\/]*)(\w*)\)/);if(!checkQuery(parts)){matches=false}}return mqChange({media:options.media,matches:matches},options)};if(window.addEventListener){window.addEventListener("resize",mmListener,false)}else{if(window.attachEvent){window.attachEvent("onresize",mmListener)}}return mmListener()}}}).call(this);
