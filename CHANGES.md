### 2.5.0 ##
* API Endpoints are changed to `repos/:owner/:repo` and `users/:owner` to avoid counter limitations
* Changed HTTP User-Agent string (PHP version) to `GitHubButtons/1.1`
* Renamed directory `Build/` to `Dist/`
* Bugfix: Counters limited to "30" because of a wrong API Endpoint

### 2.4.0 ###
* Added: client-side caching using [LocalStorage](http://www.w3schools.com/html/html5_webstorage.asp) - feature requested on [GitHub](https://github.com/AndiDittrich/GitHub-Buttons/issues/1)
* Added: error-text in case the GitHub API is not available/accessable
* Changed: php caching now stores the numbers(counts) directly instead of the json response
* Changed: the cache-directory of the `GitHub-Buttons-PHP.phtml` file to `.cache/`

### 2.3 ###
* Added PHP based version including server-side caching of GitHub API Requests
* Added PHP based example
* Some improvements of the [demo page](http://github-buttons.andidittrich.de)

### 2.2 ###
* Added option `count` to enable/disable the counter value or set it to a static value
* Removed old tags of the original "github-buttons"
* Recreated the Repository
* Some improvements of the [demo page](http://github-buttons.andidittrich.de)

### 2.1 ###
* jQuery as well as MooTools are nativly supported
* Added Native Element extension `Element.GitHubButton(options)` (use GitHubButtons.MooTools.js)
* Added native support for jQuery (use GitHubButtons.jQuery.js)

### 2.0 ###
Initial fork of [github-buttons](https://github.com/mdo/github-buttons) by [mdo](https://github.com/mdo)

* Added Copyright notices recommended by the [Apache 2.0 License Appendix](http://www.apache.org/licenses/LICENSE-2.0.html)
* Added button-type watchers/subscribers
* Added option to set custom button text
* Added standard build system used by [EnlighterJS](https://github.com/AndiDittrich/EnlighterJS)
* Added CHANGES.md to log significant modifications
* Added new documentation
* Added [demo-page](http://github-buttons.andidittrich.de/)
* Added YUI compressed builds
* Outsources styles to `Source/GitHubButtons.css`
* Changed: buttons now use a `div` as container tag