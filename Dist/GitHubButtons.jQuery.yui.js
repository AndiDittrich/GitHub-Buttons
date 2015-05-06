
					
/*!
---
name: GitHub-Buttons for MooTools, jQuery and PHP
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.5.0
build: f45236994ab6e40edbe05b20127fa7de/May 6 2015

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
*/
;
jQuery(function(c){var b=(function(e,f){var g=JSON.stringify({time:(new Date().getTime()),payload:f});if(typeof(Storage)!=="undefined"){localStorage.setItem(e,g)}});var a=(function(e,f){if(typeof(Storage)!=="undefined"){var d=localStorage.getItem(e);if(!d){return null}d=c.parseJSON(d);if(!d.time||(d.time+(f*1000))<(new Date().getTime())){return null}return(d.payload?d.payload:null)}else{return null
}});c.fn.GitHubButton=(function(e){var q=c.extend({large:false,owner:null,repo:null,type:"star",text:null,count:true,cache:true,cacheLifetime:7200,errorText:"NA"},e);var d="https://api.github.com";var g="https://github.com/"+q.owner+"/"+q.repo+"/";var f="https://github.com/"+q.owner+"/";var n="-";var o="";switch(q.type){case"star":d+="/repos/"+q.owner+"/"+q.repo;n="Star";f=g+"stargazers";o="stargazers_count";
break;case"fork":d+="/repos/"+q.owner+"/"+q.repo;n="Fork";f=g+"network";o="forks_count";break;case"watch":d+="/repos/"+q.owner+"/"+q.repo;f+=q.repo+"/watchers";n="Watchers";o="subscribers_count";break;case"follow":d+="/users/"+q.owner;n="Follow @"+q.owner;g=f;f+="followers";o="followers";break}var p=c("<div></div>",{"class":"github-btn "+(q.large?"github-btn-large":"")});var k=c("<a></a>",{"class":"gh-count",href:f,target:"_blank"});
var j=c("<span></span>",{"class":"gh-ico"});var h=c("<span></span>",{"class":"gh-text",text:(q.text?q.text:n)});var i=c("<a></a>",{"class":"gh-btn",href:g,target:"_blank"});i.append(j).append(h);p.append(i).append(k);if(typeof q.count=="boolean"){if(q.count){var l="GHB_"+q.type+"_"+q.owner+"_"+q.repo+"_"+o;if(q.cache===true){var m=a(l,q.cacheLifetime);if(m){k.text(m);return this.append(p)}}c.getJSON(d+"?callback=?",{format:"json"}).done(function(r){if(r.data&&r.data[o]){var s=r.data[o];
k.text(s);if(q.cache===true){b(l,s)}}else{k.text(q.errorText)}})}else{k.hide()}}else{k.text(q.count)}return this.append(p)})});