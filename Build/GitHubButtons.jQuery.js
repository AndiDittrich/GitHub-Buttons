/*!
---
name: GitHub-Buttons for MooTools, jQuery and PHP
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.3
build: 17cd815dcbc98ed06f9d474f578286b4/September 3 2014

authors:
  - Andi Dittrich (author of MooTools/jQuery/PHP based versions)
  - Mark Otto (author of original github-buttons styles)
  
download: https://github.com/AndiDittrich/MooTools.GitHub-Buttons
website: http://github-buttons.andidittrich.de
demo: http://github-buttons.andidittrich.de
  
requires:
  - Core/1.4.5
  - More/Number.Format
  - More/Request.JSONP

provides: [GitHubButton]
...
*//*
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
			count: true
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
				// request data
				jq.getJSON(url + '?callback=?', {
					format: "json"
				}).done(function(response){
					// valid reponse ? request limit not exceeeded ?
			    	if (response.data.length){
			    		count.text(response.data.length);
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