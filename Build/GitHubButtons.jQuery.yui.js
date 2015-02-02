
					
/*!
---
name: GitHub-Buttons for MooTools, jQuery and PHP
description: Unofficial GitHub Buttons based on https://github.com/mdo/github-buttons

license: Apache 2.0 License
version: 2.4.0
build: cb8aa1b6a4c254d81d3bb523fb0e3d3c/February 2 2015

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
}});c.fn.GitHubButton=(function(e){var p=c.extend({large:false,owner:null,repo:null,type:"star",text:null,count:true,cache:true,cacheLifetime:7200,errorText:"NA"},e);var d="https://api.github.com";var g="https://github.com/"+p.owner+"/"+p.repo+"/";var f="https://github.com/"+p.owner+"/";var n="-";switch(p.type){case"star":d+="/repos/"+p.owner+"/"+p.repo+"/stargazers";n="Star";f=g+"stargazers";break;
case"fork":d+="/repos/"+p.owner+"/"+p.repo+"/forks";n="Fork";f=g+"network";break;case"watch":d+="/repos/"+p.owner+"/"+p.repo+"/subscribers";f+=p.repo+"/watchers";n="Watchers";break;case"follow":d+="/users/"+p.owner+"/followers";n="Follow @"+p.owner;g=f;f+="followers";break}var o=c("<div></div>",{"class":"github-btn "+(p.large?"github-btn-large":"")});var k=c("<a></a>",{"class":"gh-count",href:f,target:"_blank"});
var j=c("<span></span>",{"class":"gh-ico"});var h=c("<span></span>",{"class":"gh-text",text:(p.text?p.text:n)});var i=c("<a></a>",{"class":"gh-btn",href:g,target:"_blank"});i.append(j).append(h);o.append(i).append(k);if(typeof p.count=="boolean"){if(p.count){var l="GHB_"+p.type+"_"+p.owner+"_"+p.repo;if(p.cache===true){var m=a(l,p.cacheLifetime);if(m){k.text(m);return this.append(o)}}c.getJSON(d+"?callback=?",{format:"json"}).done(function(q){if(q.data.length){k.text(q.data.length);
if(p.cache===true){b(l,q.data.length)}}else{k.text(p.errorText)}})}else{k.hide()}}else{k.text(p.count)}return this.append(o)})});