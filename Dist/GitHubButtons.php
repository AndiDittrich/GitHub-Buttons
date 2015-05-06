<?php 
/**
 * Displays GitHub Style Buttons using GitHub API v3
 * @url http://github-buttons.andidittrich.de/
 * @see https://developer.github.com/v3/
 * @author Andi Dittrich <http://andidittrich.de>
 * @license Dual-Licensed under "The MIT License (X11)" and "Apache 2.0 License"
 * @version 1.2
 *
 */
class GitHubButtons{
	
	// global cache dir
	private $_cacheDir;
	
	function __construct($cacheDir = '.'){
		// store cache dir
		$this->_cacheDir = $cacheDir;
	}

	/**
	 * Defines the default options - 
	 * @param array $options
	 * @return multitype:
	 */
	private function mergeOptions($options){
		$defaults = array(
				// large or small button ?
				'large' => false,
				
				// GitHub username
				'owner' => null,
				
				// GitHub repository name
				'repo' => null,
				
				// Button type (star, fork, watch, follow)
				'type' => 'star',
				
				// custom button text
				'text' => null,
				
				// enabled/disable counter - manual set the value
				'count' => true,
				
				// enable caching by default
				'cache' => true,
				
				// cache lifetime in seconds (2h default)
				'cacheLifetime' => 7200,
				
				// text/count if GitHub API is unavailable
				'errorText' => 'NA'
		);
		return array_merge($defaults, $options);
	}
	
	/**
	 * Generate the HTML Output
	 * @param array $options
	 */
	public function button($options){
		// set default options
		$options = $this->mergeOptions($options);
		
		// vars
		$text = '';
		$count = null;
		$buttonLink = 'https://github.com/' . $options['owner'] . '/';
		$counterLink = 'https://github.com/' . $options['owner'] . '/';
		$apiUrl = '';
        $responseSelector = '';
		
		// star, fork, follow, watch are supported
		switch ($options['type']){
			case 'star':
                $apiUrl = 'repos/' . $options['owner'] . '/' . $options['repo'];
				$text = 'Star';
				$buttonLink .= $options['repo'];
				$counterLink .= $options['repo'] . '/stargazers';
                $responseSelector = 'stargazers_count';
				break;
		
			case 'fork':
                $apiUrl = 'repos/' . $options['owner'] . '/' . $options['repo'];
				$text = 'Fork';
				$buttonLink .= $options['repo'];
				$counterLink .= $options['repo'] . '/network';
                $responseSelector = 'forks_count';
				break;
		
			case 'watch':
                $apiUrl = 'repos/' . $options['owner'] . '/' . $options['repo'];
				$text = 'Watchers';
				$buttonLink .= $options['repo'];
				$counterLink .= $options['repo'] . '/watchers';
                $responseSelector = 'subscribers_count';
				break;
		
			case 'follow':
				$counterLink .= 'followers';
				$text = 'Follow @' . $options['owner'];
				$apiUrl = 'users/'.$options['owner'];
                $responseSelector = 'followers';
				break;
		}
		
		// user defined text ?
		if ($options['text']!=null){
			$text = $options['text'];
		}
		
		// user defined count ?
		if (is_numeric($options['count'])){
			$count = $options['count'];
		}else{
			// fetch count
			$response = $this->doApiRequest($apiUrl, $options['cache'], $options['cacheLifetime'], $responseSelector);
			
			// valid ?
			if (is_numeric($response)){
				$count = $response;
			}else{
				$count = $options['errorText'];
			}
		}
		
		// large button ?
		$large = ($options['large']===true ? ' github-btn-large' : '');
		
		// create html structure
		// @see https://github.com/mdo/github-buttons/blob/master/github-btn.source.html
		$html  = '<span class="github-btn'.$large.'"><a class="gh-btn" href="'.$buttonLink.'" target="_blank"><span class="gh-ico"></span>';
		$html .= '<span class="gh-text">'.$text.'</span></a>';
		$html .= ($options['count']===false ? '' : '<a class="gh-count" href="'.$counterLink.'" target="_blank">'.$count.'</a>');
		$html .= '</span>';
		
		return $html;
	}
	
	/**
	 * Do Single HTTP GET Request including caching
	 * @param unknown $url
	 * @return string
	 */
	private function doApiRequest($url, $cacheEnabled, $cacheLifetime, $selector){
		// cache url
		$cachefilename = $this->_cacheDir . '/github.'.sha1($url.$selector).'.cache.json';
		
		// 1h cachetime
		if ($cacheEnabled && file_exists($cachefilename) && filemtime($cachefilename) > (time()-$cacheLifetime)){
			return file_get_contents($cachefilename);
		}
		
		$opts = array('http' =>
				array(
						'method'  => 'GET',
						'protocol_version' => '1.1',
						'user_agent' => 'GitHubButtons/1.1',
						'header'  => array(
								'Content-type: application/x-www-form-urlencoded;charset=UTF-8',
								'Connection: close',
								'Accept: application/vnd.github.v3+json'
						)
				)
		);
		
		// send request
		$data = false;
		try{
			$data = @file_get_contents('https://api.github.com/'.$url, false, stream_context_create($opts));
		}catch(Exception $error){}

		// success ?
		if ($data===false){
			return false;
		}else{
			// decode data
			$jdata = json_decode($data, true);

            // extract
            $cnt = $jdata[$selector];

			if ($cacheEnabled){
				// cache data
				file_put_contents($cachefilename, $cnt);
			}
			
			// return resposne data
			return $cnt;
		}
	}
	
	// singleton instance
	private static $__instance;
	
	// get singelton instance
	public static function getInstance($cacheDir=null){
		// check if singelton instance is avaible
		if (self::$__instance==null){
			// create new instance if not
			self::$__instance = new self($cacheDir);
		}
		return self::$__instance;
	}
}

?>