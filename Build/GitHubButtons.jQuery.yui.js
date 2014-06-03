
					
/*!
---
name: GitHub-Buttons for MooTools and jQuery
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.2.2
build: c5ba1bd3594dbb8fa79aedccc9d131f5/June 3 2014

authors:
  - Andi Dittrich (author of MooTools/jQuery based versions)
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
*/
;
jQuery(function(a){a.fn.GitHubButton=(function(c){var l=a.extend({large:false,owner:null,repo:null,type:"star",text:null,count:true},c);var b="https://api.github.com";var e="https://github.com/"+l.owner+"/"+l.repo+"/";var d="https://github.com/"+l.owner+"/";var j="-";switch(l.type){case"star":b+="/repos/"+l.owner+"/"+l.repo+"/stargazers";j="Star";d=e+"stargazers";break;case"fork":b+="/repos/"+l.owner+"/"+l.repo+"/forks";
j="Fork";d=e+"network";break;case"watch":b+="/repos/"+l.owner+"/"+l.repo+"/subscribers";d+=l.repo+"/watchers";j="Watchers";break;case"follow":b+="/users/"+l.owner+"/followers";j="Follow @"+l.owner;e=d;d+="followers";break}var k=a("<div></div>",{"class":"github-btn "+(l.large?"github-btn-large":"")});var i=a("<a></a>",{"class":"gh-count",href:d,target:"_blank"});var h=a("<span></span>",{"class":"gh-ico"});
var f=a("<span></span>",{"class":"gh-text",text:(l.text?l.text:j)});var g=a("<a></a>",{"class":"gh-btn",href:e,target:"_blank"});g.append(h).append(f);k.append(g).append(i);if(typeof l.count=="boolean"){if(l.count){a.getJSON(b+"?callback=?",{format:"json"}).done(function(m){if(m.data.length){i.text(m.data.length)}})}else{i.hide()}}else{i.text(l.count)}return this.append(k)})});