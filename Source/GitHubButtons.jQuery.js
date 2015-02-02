/*
---
name: GitHub-Buttons
description: Unofficial GitHub Buttons inspired by https://github.com/mdo/github-buttons

license: Dual-Licensed under "The MIT License (X11)" and "Apache 2.0 License"

authors:
  - Andi Dittrich
  
requires:
  - jQuery

provides: [GitHubButton]
...
*/
jQuery(function(jq){
	
	// use local storage as cache
	var storeItem = (function(name, data){
		// generate storage data
		var d = JSON.stringify({
			time: (new Date().getTime()),
			payload: data
		});
		
		// try to use html5 features
		if (typeof(Storage) !== "undefined"){
			localStorage.setItem(name, d);
		}
	});
	
	// use local storage as cache
	var retrieveItem = (function(name, cacheLifetime){
		// try to use html5 features
		if (typeof(Storage) !== "undefined"){
			// get item
			var ls = localStorage.getItem(name);
			
			// available ?
			if (!ls){
				return null;
			}
			
			// decode json serialized data
			ls = jq.parseJSON(ls);
			
			// lifetime expired ?
			if (!ls.time || (ls.time + (cacheLifetime*1000)) < (new Date().getTime())){
				return null;
			}
			
			// valid payload ?
			return (ls.payload ? ls.payload : null);
		}else{
			return null;
		}
	});
	
	// Element extension syntax familar with the MooTools one
	jq.fn.GitHubButton = (function(opt){
		var options = jq.extend({
			// large or small button ?
			large: false,
			
			// GitHub username
			owner: null,
			
			// GitHub repository name
			repo: null,
			
			// Button type (star, fork, watch, follow)
			type: 'star',
			
			// custom button text
			text: null,
			
			// enabled/disable counter - manual set the value
			count: true,
			
			// enable/disable caching
			cache: true,
			
			// cache lifetime in seconds (2h default)
			cacheLifetime: 7200,
			
			// error text/count
			errorText: 'NA'
		}, opt);
		
		// jsonp rest service url
		var url = 'https://api.github.com';
		
		// create repo url
		var repoUrl = 'https://github.com/' + options.owner + '/' + options.repo + '/';
		var actionUrl = 'https://github.com/' + options.owner + '/';
		
		// text to display
		var text = '-';
		
		// star, fork, follow, watch are supported
		switch (options.type){
			case 'star':
				url += '/repos/' + options.owner + '/' + options.repo + '/stargazers';
				text = 'Star';
				actionUrl = repoUrl + 'stargazers';
				break;
				
			case 'fork':
				url += '/repos/' + options.owner + '/' + options.repo + '/forks';
				text = 'Fork';
				actionUrl = repoUrl + 'network';
				break;
				
			case 'watch':
				url += '/repos/' + options.owner + '/' + options.repo + '/subscribers';
				actionUrl += options.repo + '/watchers';
				text = 'Watchers';
				break;
				
			case 'follow':
				url += '/users/' + options.owner + '/followers';
				text = 'Follow @' + options.owner;
				repoUrl = actionUrl;
				actionUrl += 'followers';
				break;
		}
		
		// create html structure
		// @see https://github.com/mdo/github-buttons/blob/master/github-btn.source.html
		// <span class="github-btn" id="github-btn">
		//  <a class="gh-btn" id="gh-btn" href="#" target="_blank">
		//    <span class="gh-ico"></span>
		//    <span class="gh-text" id="gh-text"></span>
		//  </a>
		//  <a class="gh-count" id="gh-count" href="#" target="_blank"></a>
		// </span>
		
		// create elements
		var buttonContainer = jq('<div></div>', {
			'class': 'github-btn ' + (options.large ? 'github-btn-large' : '')
		});
		var count = jq('<a></a>', {
			'class': 'gh-count',
			href: actionUrl,
			target: '_blank'
		});
		var ico = jq('<span></span>', {
			'class': 'gh-ico'
		});
		var txt = jq('<span></span>', {
			'class': 'gh-text',
			text: (options.text ? options.text : text)
		});
		var button = jq('<a></a>', {
			'class': 'gh-btn',
			href: repoUrl,
			target: '_blank'
		});
		
		// create structure
		button.append(ico).append(txt);
		buttonContainer.append(button).append(count);
		
		// which "count"-mode should be used ?
		if (typeof options.count == 'boolean'){
			// show count and request the data via JSONP ?
			if (options.count){				
				// cache instance name
				var cacheName = 'GHB_' + options.type + '_' + options.owner + '_' + options.repo;
				
				// cache version available ?
				if (options.cache === true){
					var cdata = retrieveItem(cacheName, options.cacheLifetime);
					
					if (cdata){
						// update text
						count.text(cdata);
						return this.append(buttonContainer);
					}
				}				
				
				// request data
				jq.getJSON(url + '?callback=?', {
					format: "json"
				}).done(function(response){
					// valid reponse ? request limit not exceeeded ?
			    	if (response.data.length){
			    		count.text(response.data.length);
			    		
			    		// update cache
						if (options.cache === true){
							storeItem(cacheName, response.data.length);
						}
						
					// set error text		
			    	}else{
			    		count.text(options.errorText);
			    	}
				});
			}else{
				// hide counter
				count.hide();				
			}
		}else{
			// manually set the count value
			count.text(options.count);
		}
		
		// enable chaining - return element instane
		return this.append(buttonContainer);
	});
});