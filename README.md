GitHub-Buttons for MooTools, jQuery and PHP
===========================================

GitHubButtons is a fork of the famous [github-buttons](http://ghbtns.com/) plugin using the original styles with a complete new javascript part based on MooTools/jQuery without the need of iframes.
It's targeted on MooTools/jQuery/PHP-Users which are already using various framework related scripts on their pages.
[Demo Page](http://github-buttons.andidittrich.de)

![Screenshot](http://github-buttons.andidittrich.de/screenshot.jpg)

Features
--------

* Stargazer Button
* Follower Button
* Watcher/Subscriber Button
* Fork Button
* Up-to-date counts using the [GitHub v3 API](https://developer.github.com/v3/) via JSONP
* Integrated client-side (jQuery, MooTools) and server-side (PHP) caching to avoid GitHub API rate limitation
* Two sizes available (small/large)
* Use it directly on your page without the security risk of iframes/cross domain issues!
* Ultra lightweight (2kB JS + 6kB CSS)
* Custom button text supported
* You can set the "count" manually
* jQuery as well as MooTools and PHP are supported by native code - use the framework/library of your choice

How to use
----------
Just add the JS+CSS files to your page and use the following code to inject a button into a given container

### MooTools Setup
```html
<head>
....
<!-- Include GitHub-Buttons Styles -->
<link rel="stylesheet" type="text/css" href="Build/GitHubButtons.yui.css" />

<!-- Include MooTools Framework -->
<script type="text/javascript" src="Resources/mootools-core-1.5.0-full-nocompat-yc.js"></script>
<script type="text/javascript" src="Resources/mootools-more-1.5.0.yui.js"></script>

<!-- Include GitHub-Buttons -->
<script type="text/javascript" src="Build/GitHubButtons.yui.js"></script>
...
</head>
<body>
....
<div id="container1"></div>
```

### MooTools Initialization

```js
window.addEvent('domready', function(){
	// create a new button
	var btn = new GitHubButton({
		owner : 'AndiDittrich',
		repo : 'EnlighterJS',
		large : true,
		type : 'star',
		text : 'Starring:'
	});

	// inject the button into the container (magic toElement() method is called by MooTools)
	document.id('container1').grab(btn);		
});
```

### jQuery Setup

```html
<head>
....
<!-- Include GitHub-Buttons Styles -->
<link rel="stylesheet" type="text/css" href="Build/GitHubButtons.yui.css" />

<!-- Include jQuery Library Framework -->
<script type="text/javascript" src="Resources/jquery-2.1.1.min.js"></script>

<!-- Include GitHub-Buttons -->
<script type="text/javascript" src="Source/GitHubButtons.jQuery.js"></script>
...
</head>
<body>
....
<div id="container1"></div>
```
	
### jQuery Initialization
```js
jQuery(function(jq){
	// create first button into "container1"
	jq('#container1').GitHubButton({
		owner : 'AndiDittrich',
		repo : 'EnlighterJS',
		large : true,
		type : 'star',
		text : 'Starring:'
	});
));
```
	
### PHP Setup

```php
<?php 
// include GitHubButtons
require('Build/GitHubButtons.php');

// create new instance of GitHubButtons using current directory as cache
$ghb = new GitHubButtons(__DIR__);		
?>
```

### PHP Usage

```php
<?php
// Stargazers
echo $ghb->button(array(
	'owner' => 'AndiDittrich',
	'repo' => 'EnlighterJS',
	'large' => true,
	'type' => 'star',
	'text' => 'Starring:'
));
?>
```

Syntax
------

### MooTools
A GitHubButton instance can be directly handled as an Element (implements the `toElement()` method)

**Instance Style**

```js
var el = new GitHubButton(options);
```

**Element Style**

```js
document.id(..).GitHubButton(options);	
```

### jQuery
The jQuery part only supports the commonly used element-style-syntax

**Element Style**

```js
jQuery(...).GitHubButton(options);
```

### PHP

**Instance Style**

```PHP
// create new instance of GitHubButtons using current directory as cache
$ghb = new GitHubButtons(__DIR__);	

// create a new button
echo $ghb->button(options);	
```

**Singleton Style**

```PHP
// initialize GitHubButtons singleton using current directory as cache
GitHubButtons::getInstance(__DIR__);

// create a new button
GitHubButtons::getInstance()->button(options)
```

Options
-------
The following options can be passed to the constructor/function - used by the MooTools and jQuery verison

* **owner** (String) - The owner of the GitHUb repository (required)
* **repo** (String) - The repository to observe (not required for type:follower)
* **large** (Boolean) - Display the large button version (default: false)
* **type** (String) - The button type: **star** for stargazers, **fork** for forks, **watch** for watchers and **follow* for follower (default: star)
* **text** (String) - An optional button text to displa instead of the default one (default: null)
* **count** (Boolean/Number - Enable/Disable (Boolean) the count or set it to a static value (Number) (default: true)
* **cache** (Boolean) - Enable/Disable response caching (LocalStorage for Javascript, File-based for PHP)
* **cacheLifetime** (Number) - The cache-lifetime in seconds (7200s -> 2hours default)
* **errorText** (String) - Text to display as count if the GitHub API Request failed (default: "NA")

Authors
-------
* [Andi Dittrich](http://andidittrich.de) (author of MooTools/jQuery/PHP based Plugin)
* [Mark Otto](http://twitter.com/mdo) (author of original github-buttons)

License
-------
GitHub-Buttons for MooTools, jQuery and PHP is released under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)