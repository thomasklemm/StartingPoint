(function(e,t){var n;e.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var n=e('meta[name="csrf-token"]').attr("content");n&&t.setRequestHeader("X-CSRF-Token",n)},fire:function(t,n,r){var i=e.Event(n);return t.trigger(i,r),i.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(r){var i,s,o,u,a,f;if(n.fire(r,"ajax:before")){u=r.data("cross-domain")||null,a=r.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType;if(r.is("form")){i=r.attr("method"),s=r.attr("action"),o=r.serializeArray();var l=r.data("ujs:submit-button");l&&(o.push(l),r.data("ujs:submit-button",null))}else r.is(n.inputChangeSelector)?(i=r.data("method"),s=r.data("url"),o=r.serialize(),r.data("params")&&(o=o+"&"+r.data("params"))):(i=r.data("method"),s=n.href(r),o=r.data("params")||null);return f={type:i||"GET",data:o,dataType:a,crossDomain:u,beforeSend:function(e,i){return i.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+i.accepts.script),n.fire(r,"ajax:beforeSend",[e,i])},success:function(e,t,n){r.trigger("ajax:success",[e,t,n])},complete:function(e,t){r.trigger("ajax:complete",[e,t])},error:function(e,t,n){r.trigger("ajax:error",[e,t,n])}},s&&(f.url=s),n.ajax(f)}return!1},handleMethod:function(r){var i=n.href(r),s=r.data("method"),o=r.attr("target"),u=e("meta[name=csrf-token]").attr("content"),a=e("meta[name=csrf-param]").attr("content"),f=e('<form method="post" action="'+i+'"></form>'),l='<input name="_method" value="'+s+'" type="hidden" />';a!==t&&u!==t&&(l+='<input name="'+a+'" value="'+u+'" type="hidden" />'),o&&f.attr("target",o),f.hide().append(l).appendTo("body"),f.submit()},disableFormElements:function(t){t.find(n.disableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with",t[n]()),t[n](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(n.enableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[n](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t=e.data("confirm"),r=!1,i;return t?(n.fire(e,"confirm")&&(r=n.confirm(t),i=n.fire(e,"confirm:complete",[r])),r&&i):!0},blankInputs:function(t,n,r){var i=e(),s,o=n||"input,textarea";return t.find(o).each(function(){s=e(this);if(r?s.val():!s.val())i=i.add(s)}),i.length?i:!1},nonBlankInputs:function(e,t){return n.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(n,r){var i=n.data("events"),s=!0;return i!==t&&i.submit!==t&&e.each(i.submit,function(e,t){if(typeof t.handler=="function")return s=t.handler(r)}),s},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return n.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},e.ajaxPrefilter(function(e,t,r){e.crossDomain||n.CSRFProtection(r)}),e(document).delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(e(this))}),e(document).delegate(n.linkClickSelector,"click.rails",function(r){var i=e(this),s=i.data("method"),o=i.data("params");if(!n.allowAction(i))return n.stopEverything(r);i.is(n.linkDisableSelector)&&n.disableElement(i);if(i.data("remote")!==t)return(r.metaKey||r.ctrlKey)&&(!s||s==="GET")&&!o?!0:(n.handleRemote(i)===!1&&n.enableElement(i),!1);if(i.data("method"))return n.handleMethod(i),!1}),e(document).delegate(n.inputChangeSelector,"change.rails",function(t){var r=e(this);return n.allowAction(r)?(n.handleRemote(r),!1):n.stopEverything(t)}),e(document).delegate(n.formSubmitSelector,"submit.rails",function(r){var i=e(this),s=i.data("remote")!==t,o=n.blankInputs(i,n.requiredInputSelector),u=n.nonBlankInputs(i,n.fileInputSelector);if(!n.allowAction(i))return n.stopEverything(r);if(o&&i.attr("novalidate")==t&&n.fire(i,"ajax:aborted:required",[o]))return n.stopEverything(r);if(s)return u?n.fire(i,"ajax:aborted:file",[u]):!e.support.submitBubbles&&e().jquery<"1.7"&&n.callFormSubmitBindings(i,r)===!1?n.stopEverything(r):(n.handleRemote(i),!1);setTimeout(function(){n.disableFormElements(i)},13)}),e(document).delegate(n.formInputClickSelector,"click.rails",function(t){var r=e(this);if(!n.allowAction(r))return n.stopEverything(t);var i=r.attr("name"),s=i?{name:i,value:r.val()}:null;r.closest("form").data("ujs:submit-button",s)}),e(document).delegate(n.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&n.disableFormElements(e(this))}),e(document).delegate(n.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&n.enableFormElements(e(this))})})(jQuery),function(e){"use strict";var t=!1;e("a[data-reveal-id]").live("click",function(t){t.preventDefault();var n=e(this).attr("data-reveal-id");e("#"+n).reveal(e(this).data())}),e.fn.reveal=function(n){var r={animation:"fadeAndPop",animationSpeed:300,closeOnBackgroundClick:!0,dismissModalClass:"close-reveal-modal",open:e.noop,opened:e.noop,close:e.noop,closed:e.noop};return n=e.extend({},r,n),this.each(function(){function f(){o=!1}function l(){o=!0}function c(n){var r=e(".reveal-modal.open");r.length===1&&(t=!0,e(".reveal-modal.open").trigger("reveal:close"))}function h(){o||(l(),c(r),r.addClass("open"),n.animation==="fadeAndPop"&&(r.css({top:e(document).scrollTop()-s,opacity:0,visibility:"visible",display:"block"}),u.fadeIn(n.animationSpeed/2),r.delay(n.animationSpeed/2).animate({top:e(document).scrollTop()+i+"px",opacity:1},n.animationSpeed,function(){r.trigger("reveal:opened")})),n.animation==="fade"&&(r.css({opacity:0,visibility:"visible",display:"block",top:e(document).scrollTop()+i}),u.fadeIn(n.animationSpeed/2),r.delay(n.animationSpeed/2).animate({opacity:1},n.animationSpeed,function(){r.trigger("reveal:opened")})),n.animation==="none"&&(r.css({visibility:"visible",display:"block",top:e(document).scrollTop()+i}),u.css({display:"block"}),r.trigger("reveal:opened")))}function p(){o||(l(),r.removeClass("open"),n.animation==="fadeAndPop"&&(r.animate({top:e(document).scrollTop()-s+"px",opacity:0},n.animationSpeed/2,function(){r.css({top:i,opacity:1,visibility:"hidden",display:"none"})}),t?r.trigger("reveal:closed"):u.delay(n.animationSpeed).fadeOut(n.animationSpeed,function(){r.trigger("reveal:closed")}),t=!1),n.animation==="fade"&&(r.animate({opacity:0},n.animationSpeed,function(){r.css({opacity:1,visibility:"hidden",display:"none",top:i})}),t?r.trigger("reveal:closed"):u.delay(n.animationSpeed).fadeOut(n.animationSpeed,function(){r.trigger("reveal:closed")})),n.animation==="none"&&(r.css({visibility:"hidden",display:"block",top:i}),t||u.css({display:"none"}),r.trigger("reveal:closed")))}function d(){r.unbind(".reveal"),u.unbind(".reveal"),e("."+n.dismissModalClass).unbind(".reveal"),e("body").unbind(".reveal")}var r=e(this),i=parseInt(r.css("top"),10),s=r.height()+i,o=!1,u=e(".reveal-modal-bg"),a;u.length===0&&(u=e('<div class="reveal-modal-bg" />').insertAfter(r),u.fadeTo("fast",.8)),r.bind("reveal:open.reveal",h),r.bind("reveal:close.reveal",p),r.bind("reveal:opened.reveal reveal:closed.reveal",f),r.bind("reveal:closed.reveal",d),r.bind("reveal:open.reveal",n.open),r.bind("reveal:opened.reveal",n.opened),r.bind("reveal:close.reveal",n.close),r.bind("reveal:closed.reveal",n.closed),r.trigger("reveal:open"),a=e("."+n.dismissModalClass).bind("click.reveal",function(){r.trigger("reveal:close")}),n.closeOnBackgroundClick&&(u.css({cursor:"pointer"}),u.bind("click.reveal",function(){r.trigger("reveal:close")})),e("body").bind("keyup.reveal",function(e){e.which===27&&r.trigger("reveal:close")})})}}(jQuery),jQuery.foundation=jQuery.foundation||{},jQuery.foundation.customForms=jQuery.foundation.customForms||{},jQuery(document).ready(function(e){function t(t){e("form.custom input:"+t).each(function(){var n=e(this).hide(),r=n.next("span.custom."+t);r.length===0&&(r=e('<span class="custom '+t+'"></span>').insertAfter(n)),r.toggleClass("checked",n.is(":checked")),r.toggleClass("disabled",n.is(":disabled"))})}function n(t){var n=e(t),r=n.next("div.custom.dropdown"),i=n.find("option"),s=0,o;if(n.hasClass("no-custom"))return;r.length===0?($customSelectSize="",e(t).hasClass("small")?$customSelectSize="small":e(t).hasClass("medium")?$customSelectSize="medium":e(t).hasClass("large")?$customSelectSize="large":e(t).hasClass("expand")&&($customSelectSize="expand"),r=e('<div class="custom dropdown '+$customSelectSize+'"><a href="#" class="selector"></a><ul></ul></div>"'),i.each(function(){o=e("<li>"+e(this).html()+"</li>"),r.find("ul").append(o)}),r.prepend('<a href="#" class="current">'+i.first().html()+"</a>"),n.after(r),n.hide()):(r.find("ul").html(""),i.each(function(){o=e("<li>"+e(this).html()+"</li>"),r.find("ul").append(o)})),r.toggleClass("disabled",n.is(":disabled")),i.each(function(t){this.selected&&(r.find("li").eq(t).addClass("selected"),r.find(".current").html(e(this).html()))}),r.css("width","inherit"),r.find("ul").css("width","inherit"),r.find("li").each(function(){r.addClass("open"),e(this).outerWidth()>s&&(s=e(this).outerWidth()),r.removeClass("open")}),r.is(".small, .medium, .large, .expand")||(r.css("width",s+18+"px"),r.find("ul").css("width",s+16+"px"))}e.foundation.customForms.appendCustomMarkup=function(){t("checkbox"),t("radio"),e("form.custom select").each(function(){n(this)})},e.foundation.customForms.appendCustomMarkup()}),function(e){function t(t){var n=0,r=t.next();$options=t.find("option"),r.find("ul").html(""),$options.each(function(){$li=e("<li>"+e(this).html()+"</li>"),r.find("ul").append($li)}),$options.each(function(t){this.selected&&(r.find("li").eq(t).addClass("selected"),r.find(".current").html(e(this).html()))}),r.removeAttr("style").find("ul").removeAttr("style"),r.find("li").each(function(){r.addClass("open"),e(this).outerWidth()>n&&(n=e(this).outerWidth()),r.removeClass("open")}),r.css("width",n+18+"px"),r.find("ul").css("width",n+16+"px")}function n(e){var t=e.prev(),n=t[0];0==t.is(":disabled")&&(n.checked=n.checked?!1:!0,e.toggleClass("checked"),t.trigger("change"))}function r(t){var n=t.prev(),r=n[0];0==n.is(":disabled")&&(e('input:radio[name="'+n.attr("name")+'"]').each(function(){e(this).next().removeClass("checked")}),r.checked=r.checked?!1:!0,t.toggleClass("checked"),n.trigger("change"))}e("form.custom span.custom.checkbox").live("click",function(t){t.preventDefault(),t.stopPropagation(),n(e(this))}),e("form.custom span.custom.radio").live("click",function(t){t.preventDefault(),t.stopPropagation(),r(e(this))}),e("form.custom select").live("change",function(n){t(e(this))}),e("form.custom label").live("click",function(t){var i=e("#"+e(this).attr("for")),s,o;i.length!==0&&(i.attr("type")==="checkbox"?(t.preventDefault(),s=e(this).find("span.custom.checkbox"),n(s)):i.attr("type")==="radio"&&(t.preventDefault(),o=e(this).find("span.custom.radio"),r(o)))}),e("form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector").live("click",function(t){var n=e(this),r=n.closest("div.custom.dropdown"),i=r.prev();t.preventDefault(),e("div.dropdown").removeClass("open");if(0==i.is(":disabled"))return r.toggleClass("open"),r.hasClass("open")?e(document).bind("click.customdropdown",function(t){r.removeClass("open"),e(document).unbind(".customdropdown")}):e(document).unbind(".customdropdown"),!1}),e("form.custom div.custom.dropdown li").live("click",function(t){var n=e(this),r=n.closest("div.custom.dropdown"),i=r.prev(),s=0;t.preventDefault(),t.stopPropagation(),e("div.dropdown").removeClass("open"),n.closest("ul").find("li").removeClass("selected"),n.addClass("selected"),r.removeClass("open").find("a.current").html(n.html()),n.closest("ul").find("li").each(function(e){n[0]==this&&(s=e)}),i[0].selectedIndex=s,i.trigger("change")})}(jQuery),function(e,t,n){function u(e){var t={},r=/^jQuery\d+$/;return n.each(e.attributes,function(e,n){n.specified&&!r.test(n.name)&&(t[n.name]=n.value)}),t}function a(){var e=n(this);e.val()===e.attr("placeholder")&&e.hasClass("placeholder")&&(e.data("placeholder-password")?e.hide().next().show().focus().attr("id",e.removeAttr("id").data("placeholder-id")):e.val("").removeClass("placeholder"))}function f(){var e,t=n(this),r=t,i=this.id;if(t.val()===""){if(t.is(":password")){if(!t.data("placeholder-textinput")){try{e=t.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(u(this),{type:"text"}))}e.removeAttr("name").data("placeholder-password",!0).data("placeholder-id",i).bind("focus.placeholder",a),t.data("placeholder-textinput",e).data("placeholder-id",i).before(e)}t=t.removeAttr("id").hide().prev().attr("id",i).show()}t.addClass("placeholder").val(t.attr("placeholder"))}else t.removeClass("placeholder")}var r="placeholder"in t.createElement("input"),i="placeholder"in t.createElement("textarea"),s=n.fn,o;r&&i?(o=s.placeholder=function(){return this},o.input=o.textarea=!0):(o=s.placeholder=function(){return this.filter((r?"textarea":":input")+"[placeholder]").not(".placeholder").bind("focus.placeholder",a).bind("blur.placeholder",f).trigger("blur.placeholder").end()},o.input=r,o.textarea=i,n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(a);setTimeout(function(){e.each(f)},10)})}),n(e).bind("unload.placeholder",function(){n(".placeholder").val("")}))}(this,document,jQuery),function(e){"use strict";var t={bodyHeight:0,pollInterval:1e3},n={init:function(r){return this.each(function(){var r,i,s,o;e(window).data("tooltips","init"),r=e(".has-tip"),i=e(".tooltip"),s=function(e,t){return'<span data-id="'+e+'" class="tooltip">'+t+'<span class="nub"></span></span>'},o=setInterval(n.isDomResized,t.pollInterval),i.length<1&&r.each(function(t){var r,i,o,u,a;r=e(this),o="foundationTooltip"+t,u=r.attr("title"),a=n.inheritable_classes(r),r.data("id",o),i=e(s(o,u)),i.addClass(a).appendTo("body"),Modernizr.touch&&i.append('<span class="tap-to-close">tap to close </span>'),n.reposition(r,i,a),i.fadeOut(150)}),e(window).on("resize.tooltip",function(){var t=e(".tooltip");t.each(function(){var t,i,s,o;t=e(this).data(),i=r=e(".has-tip"),s=e(this),o=s.attr("class"),r.each(function(){e(this).data().id==t.id?i=e(this):i=i}),n.reposition(i,s,o)})}),Modernizr.touch?(e(".tooltip").on("click.tooltip touchstart.tooltip touchend.tooltip",function(t){t.preventDefault(),e(this).fadeOut(150)}),r.on("click.tooltip touchstart.tooltip touchend.tooltip",function(t){t.preventDefault(),e(".tooltip").hide(),e("span[data-id="+e(this).data("id")+"].tooltip").fadeIn(150),r.attr("title","")})):r.hover(function(){e("span[data-id="+e(this).data("id")+"].tooltip").fadeIn(150),r.attr("title","")},function(){e("span[data-id="+e(this).data("id")+"].tooltip").fadeOut(150)})})},inheritable_classes:function(t){var n=["tip-top","tip-left","tip-bottom","tip-right","noradius"],r=t.attr("class").split(" ").map(function(t,r){if(e.inArray(t,n)!==-1)return t}).join(" ");return e.trim(r)},reload:function(){var t=e(this);return t.data("tooltips")?t.tooltips("destroy").tooltips("init"):t.tooltips("init")},destroy:function(){return this.each(function(){e(window).unbind(".tooltip"),e(".has-tip").unbind(".tooltip"),e(".tooltip").each(function(t){e(e(".has-tip").get(t)).attr("title",e(this).text())}).remove()})},reposition:function(t,n,r){var i,s,o,u,a,f;i=t.data("width"),s=n.children(".nub"),o=s.outerHeight(),u=s.outerWidth(),f=function(e,t,n,r,i,s){return e.css({top:t,bottom:r,left:i,right:n,width:s?s:"auto"}).end()},f(n,t.offset().top+t.outerHeight()+10,"auto","auto",t.offset().left,i),f(s,-o,"auto","auto",10),e(window).width()<767?(a=t.parents(".row"),n.width(a.outerWidth()-20).css("left",a.offset().left).addClass("tip-override"),f(s,-o,"auto","auto",t.offset().left)):r.indexOf("tip-top")>-1?(f(n,t.offset().top-n.outerHeight()-o,"auto","auto",t.offset().left,i).removeClass("tip-override"),f(s,"auto","auto",-o,"auto")):r.indexOf("tip-left")>-1?(f(n,t.offset().top+t.outerHeight()/2-o,"auto","auto",t.offset().left-n.outerWidth()-10,i).removeClass("tip-override"),f(s,n.outerHeight()/2-o/2,-o,"auto","auto")):r.indexOf("tip-right")>-1&&(f(n,t.offset().top+t.outerHeight()/2-o,"auto","auto",t.offset().left+t.outerWidth()+10,i).removeClass("tip-override"),f(s,n.outerHeight()/2-o/2,"auto","auto",-o))},isDomResized:function(){var n=e("body");t.bodyHeight!=n.height()&&(t.bodyHeight=n.height(),e(window).trigger("resize"))}};e.fn.tooltips=function(t){if(n[t])return n[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return n.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.tooltips")}}(jQuery),jQuery(document).ready(function(e){function t(t){var n=t.closest("dl").find("dd.active"),r=t.children("a").attr("href")+"Tab";r=r.replace(/^.+#/,"#"),r=r.replace(/^.+#/,"#"),n.removeClass("active"),t.addClass("active"),e(r).closest(".tabs-content").children("li").hide(),e(r).css("display","block")}e("dl.tabs dd a").on("click.fndtn",function(n){t(e(this).parent("dd"))}),window.location.hash&&(t(e('a[href="'+window.location.hash+'"]')),e.foundation.customForms.appendCustomMarkup()),e(".alert-box").delegate("a.close","click",function(t){t.preventDefault(),e(this).closest(".alert-box").fadeOut(function(t){e(this).remove()})}),e("input, textarea").placeholder(),e(this).tooltips();var n=!1;Modernizr.touch||navigator.userAgent.match(/Windows Phone/i)?(e(".nav-bar a.flyout-toggle").on("click.fndtn touchstart.fndtn",function(t){t.preventDefault();var r=e(this).siblings(".flyout").first();n===!1&&(e(".nav-bar .flyout").not(r).slideUp(500),r.slideToggle(500,function(){n=!1})),n=!0}),e(".nav-bar>li.has-flyout").addClass("is-touch")):e(".nav-bar>li.has-flyout").hover(function(){e(this).children(".flyout").show()},function(){e(this).children(".flyout").hide()}),e(".button.dropdown > ul").addClass("no-hover"),e(".button.dropdown").on("click.fndtn touchstart.fndtn",function(e){e.stopPropagation()}),e(".button.dropdown.split span").on("click.fndtn touchstart.fndtn",function(t){t.preventDefault(),e(".button.dropdown").not(e(this).parent()).children("ul").removeClass("show-dropdown"),e(this).siblings("ul").toggleClass("show-dropdown")}),e(".button.dropdown").not(".split").on("click.fndtn touchstart.fndtn",function(t){t.preventDefault(),e(".button.dropdown").not(this).children("ul").removeClass("show-dropdown"),e(this).children("ul").toggleClass("show-dropdown")}),e("body, html").on("click.fndtn touchstart.fndtn",function(){e(".button.dropdown ul").removeClass("show-dropdown")});var r=e(".button.dropdown:not(.large):not(.small):not(.tiny)").outerHeight()-1,i=e(".button.large.dropdown").outerHeight()-1,s=e(".button.small.dropdown").outerHeight()-1,o=e(".button.tiny.dropdown").outerHeight()-1;e(".button.dropdown:not(.large):not(.small):not(.tiny) > ul").css("top",r),e(".button.dropdown.large > ul").css("top",i),e(".button.dropdown.small > ul").css("top",s),e(".button.dropdown.tiny > ul").css("top",o)}),function(e){var t={init:function(t){return this.each(function(){var r=e.extend({owner:"thomasklemm",repo:"Readme.js",styles:!0},t),i=e(this),s=i.data("owner")||r.owner,o=i.data("repo")||r.repo,u=i.data("styles")||r.styles,a="<p>Loading Readme <b>"+s+"/"+o+"</b>...</p>";i.html(a),e.ajax({url:"https://api.github.com/repos/"+s+"/"+o+"/readme",headers:{Accept:"application/vnd.github.html"},success:function(t){u!="none"&&e("body").prepend(n),i.html(t)},error:function(e){e.status===404?i.html("404: Repo <b>"+s+"/"+o+"</b> is unknown to Github or has no Readme."):i.html("Error <b>"+e.status+"</b> occurred when trying to load Readme of Github Repo <b>"+s+"/"+o+"</b>.")}})})}};e.fn.readme=function(n){if(t[n])return t[n].apply(this,Array.prototype.slice.call(arguments,1));if(typeof n=="object"||!n)return t.init.apply(this,arguments);e.error("Method "+n+" does not exist on jQuery.tooltip")};var n='<style>.markdown-body{-webkit-box-sizing:border-box;font-size:14px;line-height:1.6}.markdown-body>*:first-child{margin-top:0 !important}.markdown-body>*:last-child{margin-bottom:0 !important}.markdown-body a.absent{color:#c00}.markdown-body a.anchor{display:block;padding-left:30px;margin-left:-30px;cursor:pointer;position:absolute;top:0;left:0;bottom:0}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin:20px 0 10px;padding:0;font-weight:bold;-webkit-font-smoothing:antialiased;cursor:text;position:relative}.markdown-body h1 .mini-icon-link,.markdown-body h2 .mini-icon-link,.markdown-body h3 .mini-icon-link,.markdown-body h4 .mini-icon-link,.markdown-body h5 .mini-icon-link,.markdown-body h6 .mini-icon-link{display:none;color:#000}.markdown-body h1:hover a.anchor,.markdown-body h2:hover a.anchor,.markdown-body h3:hover a.anchor,.markdown-body h4:hover a.anchor,.markdown-body h5:hover a.anchor,.markdown-body h6:hover a.anchor{text-decoration:none;line-height:1;padding-left:0;margin-left:-22px;top:15%}.markdown-body h1:hover .mini-icon-link,.markdown-body h2:hover .mini-icon-link,.markdown-body h3:hover .mini-icon-link,.markdown-body h4:hover .mini-icon-link,.markdown-body h5:hover .mini-icon-link,.markdown-body h6:hover .mini-icon-link{display:inline-block}.markdown-body h1 tt,.markdown-body h1 code{font-size:inherit}.markdown-body h2 tt,.markdown-body h2 code{font-size:inherit}.markdown-body h3 tt,.markdown-body h3 code{font-size:inherit}.markdown-body h4 tt,.markdown-body h4 code{font-size:inherit}.markdown-body h5 tt,.markdown-body h5 code{font-size:inherit}.markdown-body h6 tt,.markdown-body h6 code{font-size:inherit}.markdown-body h1{font-size:28px;color:#000}.markdown-body h2{font-size:24px;border-bottom:1px solid #ccc;color:#000}.markdown-body h3{font-size:18px}.markdown-body h4{font-size:16px}.markdown-body h5{font-size:14px}.markdown-body h6{color:#777;font-size:14px}.markdown-body p,.markdown-body blockquote,.markdown-body ul,.markdown-body ol,.markdown-body dl,.markdown-body table,.markdown-body pre{margin:15px 0}.markdown-body hr{background:transparent url("https://a248.e.akamai.net/assets.github.com/images/modules/pulls/dirty-shade.png?ac8b47a3") repeat-x 0 0;border:0 none;color:#ccc;height:4px;padding:0}.markdown-body>h2:first-child{margin-top:0;padding-top:0}.markdown-body>h1:first-child{margin-top:0;padding-top:0}.markdown-body>h1:first-child+h2{margin-top:0;padding-top:0}.markdown-body>h3:first-child,.markdown-body>h4:first-child,.markdown-body>h5:first-child,.markdown-body>h6:first-child{margin-top:0;padding-top:0}.markdown-body a:first-child h1,.markdown-body a:first-child h2,.markdown-body a:first-child h3,.markdown-body a:first-child h4,.markdown-body a:first-child h5,.markdown-body a:first-child h6{margin-top:0;padding-top:0}.markdown-body h1 p,.markdown-body h2 p,.markdown-body h3 p,.markdown-body h4 p,.markdown-body h5 p,.markdown-body h6 p{margin-top:0}.markdown-body li p.first{display:inline-block}.markdown-body ul,.markdown-body ol{padding-left:30px}.markdown-body ul.no-list,.markdown-body ol.no-list{list-style-type:none;padding:0}.markdown-body ul :first-child,.markdown-body ol :first-child{margin-top:0}.markdown-body dl{padding:0}.markdown-body dl dt{font-size:14px;font-weight:bold;font-style:italic;padding:0;margin:15px 0 5px}.markdown-body dl dt:first-child{padding:0}.markdown-body dl dt>:first-child{margin-top:0}.markdown-body dl dt>:last-child{margin-bottom:0}.markdown-body dl dd{margin:0 0 15px;padding:0 15px}.markdown-body dl dd>:first-child{margin-top:0}.markdown-body dl dd>:last-child{margin-bottom:0}.markdown-body blockquote{border-left:4px solid #ddd;padding:0 15px;color:#777}.markdown-body blockquote>:first-child{margin-top:0}.markdown-body blockquote>:last-child{margin-bottom:0}.markdown-body table{padding:0}.markdown-body table tr{border-top:1px solid #ccc;background-color:#fff;margin:0;padding:0}.markdown-body table tr:nth-child(2n){background-color:#f8f8f8}.markdown-body table tr th{font-weight:bold;border:1px solid #ccc;text-align:left;margin:0;padding:6px 13px}.markdown-body table tr td{border:1px solid #ccc;text-align:left;margin:0;padding:6px 13px}.markdown-body table tr th :first-child,.markdown-body table tr td :first-child{margin-top:0}.markdown-body table tr th :last-child,.markdown-body table tr td :last-child{margin-bottom:0}.markdown-body img{max-width:100%}.markdown-body span.frame{display:block;overflow:hidden}.markdown-body span.frame>span{border:1px solid #ddd;display:block;float:left;overflow:hidden;margin:13px 0 0;padding:7px;width:auto}.markdown-body span.frame span img{display:block;float:left}.markdown-body span.frame span span{clear:both;color:#333;display:block;padding:5px 0 0}.markdown-body span.align-center{display:block;overflow:hidden;clear:both}.markdown-body span.align-center>span{display:block;overflow:hidden;margin:13px auto 0;text-align:center}.markdown-body span.align-center span img{margin:0 auto;text-align:center}.markdown-body span.align-right{display:block;overflow:hidden;clear:both}.markdown-body span.align-right>span{display:block;overflow:hidden;margin:13px 0 0;text-align:right}.markdown-body span.align-right span img{margin:0;text-align:right}.markdown-body span.float-left{display:block;margin-right:13px;overflow:hidden;float:left}.markdown-body span.float-left span{margin:13px 0 0}.markdown-body span.float-right{display:block;margin-left:13px;overflow:hidden;float:right}.markdown-body span.float-right>span{display:block;overflow:hidden;margin:13px auto 0;text-align:right}.markdown-body code,.markdown-body tt{margin:0 2px;padding:0 5px;white-space:pre-line;word-wrap:break-word;border:1px solid #eaeaea;background-color:#f8f8f8;border-radius:3px}.markdown-body tt{font-size:14px;white-space:normal !important}.markdown-body pre code{margin:0;padding:0;white-space:pre;border:none;background:transparent}.markdown-body .highlight pre{background-color:#f8f8f8;border:1px solid #ccc;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}.markdown-body pre{background-color:#f8f8f8;border:1px solid #ccc;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}.markdown-body pre code,.markdown-body pre tt{background-color:transparent;border:none}.markdown-body code,.markdown-body tt{margin:0 2px;padding:0 5px;white-space:pre-line;word-wrap:break-word;border:1px solid #eaeaea;background-color:#f8f8f8;border-radius:3px}.markdown-body pre code{margin:0;padding:0;white-space:pre;border:none;background:transparent}.markdown-body .highlight pre{background-color:#f8f8f8;border:1px solid #ccc;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}.markdown-body pre{background-color:#f8f8f8;border:1px solid #ccc;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}.markdown-body pre code,.markdown-body pre tt{background-color:transparent;border:none}.highlight{background:#fff}.highlight .c{color:#998;font-style:italic}.highlight .err{color:#a61717;background-color:#e3d2d2}.highlight .k,.highlight .o{font-weight:bold}.highlight .cm{color:#998;font-style:italic}.highlight .cp{color:#999;font-weight:bold}.highlight .c1{color:#998;font-style:italic}.highlight .cs{color:#999;font-weight:bold;font-style:italic}.highlight .gd{color:#000;background-color:#fdd}.highlight .gd .x{color:#000;background-color:#faa}.highlight .ge{font-style:italic}.highlight .gr{color:#a00}.highlight .gh{color:#999}.highlight .gi{color:#000;background-color:#dfd}.highlight .gi .x{color:#000;background-color:#afa}.highlight .go{color:#888}.highlight .gp{color:#555}.highlight .gs{font-weight:bold}.highlight .gu{color:purple;font-weight:bold}.highlight .gt{color:#a00}.highlight .kc,.highlight .kd,.highlight .kn,.highlight .kp,.highlight .kr{font-weight:bold}.highlight .kt{color:#458;font-weight:bold}.highlight .m{color:#099}.highlight .s{color:#d14}.highlight .na{color:teal}.highlight .nb{color:#0086b3}.highlight .nc{color:#458;font-weight:bold}.highlight .no{color:teal}.highlight .ni{color:purple}.highlight .ne,.highlight .nf{color:#900;font-weight:bold}.highlight .nn{color:#555}.highlight .nt{color:navy}.highlight .nv{color:teal}.highlight .ow{font-weight:bold}.highlight .w{color:#bbb}.highlight .mf,.highlight .mh,.highlight .mi,.highlight .mo{color:#099}.highlight .sb,.highlight .sc,.highlight .sd,.highlight .s2,.highlight .se,.highlight .sh,.highlight .si,.highlight .sx{color:#d14}.highlight .sr{color:#009926}.highlight .s1{color:#d14}.highlight .ss{color:#990073}.highlight .bp{color:#999}.highlight .vc,.highlight .vg,.highlight .vi{color:teal}.highlight .il{color:#099}.highlight .gc{color:#999;background-color:#eaf2f5}.highlight .k,.highlight .kt{color:blue}.highlight .nf{color:#000;font-weight:normal}.highlight .nc{color:#2b91af}.highlight .nn{color:#000}.highlight .s,.highlight .sc{color:#a31515}</style>'}(jQuery),$(document).ready(function(){$(".readme_js").readme({owner:$(this).data("owner"),repo:$(this).data("repo")})}),function(){}.call(this),$("#js_load_readme").submit(function(e){$this=$(this);var t=$this.find("[name='owner']").val(),n=$this.find("[name='repo']").val();$("#readme_custom").readme({owner:t,repo:n}),e.preventDefault()}),function(){$(function(){return $("#readme_sinatra").readme({owner:"sinatra",repo:"sinatra"})})}.call(this);