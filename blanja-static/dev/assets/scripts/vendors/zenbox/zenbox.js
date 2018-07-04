jQuery(document).ready(function() {
	$j('#zenboxfooter').on('click', function(){
		$j('#zenbox').trigger('click');
	});
	
	$j("#zenbox").one("click", function(){
		
		var self = $j(this)
		var tempZen = $j(this).children().clone();
		var loading = "<div class='zenbox-loading tAlign-center'><img src='" + res2Url + "/static/public/images/loading.gif' height='32'></div>"
		$j(this).empty().append(loading);
		
		window.zEmbed || function (e, t) {
			var n,
			o,
			d,
			i,
			s,
			a = [],
			r = document.createElement("iframe");
			window.zEmbed = function () {
				a.push(arguments)
			},
			window.zE = window.zE || window.zEmbed,
			r.src = "javascript:false",
			r.title = "",
			r.role = "presentation",
			(r.frameElement || r).style.cssText = "display: none",
			d = document.getElementsByTagName("script"),
			d = d[d.length - 1],
			d.parentNode.insertBefore(r, d),
			i = r.contentWindow,
			s = i.document;
			try {
				o = s
			} catch (e) {
				n = document.domain,
				r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);',
				o = s
			}
			o.open()._l = function () {
				var o = this.createElement("script");
				n && (this.domain = n),
				o.id = "js-iframe-async",
				o.src = e,
				this.t = +new Date,
				this.zendeskHost = t,
				this.zEQueue = a,
				this.body.appendChild(o);
				
				var langLocale = loxia.getCurrentLocale();
				if (langLocale == "en_US"){
					langLocale == 'en';
				}else {langLocale = 'id';}

				zE(function() { 
					zE.setLocale(langLocale); 
					zE.hide();
				});
				
				window.zESettings = { 
						webWidget: { 
							color: { theme: '#e2211d' },
							contactForm: { attachments: false } 
						} 
					};
					
				zE(function() {
					zE.activate({hideOnClose: true});
				});
				
				self.click(function() {
					zE.activate({hideOnClose: true});
				});
				
			},
			o.write('<body onload="document._l();">'),
			o.close()
		}
		("https://assets.zendesk.com/embeddable_framework/main.js", "blanja.zendesk.com");
		
		var interval = setInterval(function(){
			if($j(".zopim").length != 0) {
				setTimeout(function(){
					self.empty().append(tempZen);
				}, 2000)
			}
		}, 500);
		
		setTimeout(function(){
			clearInterval(interval);
		}, 10000);
	});
});