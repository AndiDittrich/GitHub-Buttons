<?php 
/**
 * Displays GitHub Style Buttons using GitHub API v3
 * @url http://github-buttons.andidittrich.de/
 * @see https://developer.github.com/v3/
 * @author Andi Dittrich <http://andidittrich.de>
 * @license Dual-Licensed under "The MIT License (X11)" and "Apache 2.0 License"
 * @version 1.1
 *
 */
class GitHubButtons{
	
	// global cachetime - 30min
	private $_cachetime = 1800;
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
				'count' => true
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
		
		// star, fork, follow, watch are supported
		switch ($options['type']){
			case 'star':
				$apiUrl = 'repos/' . $options['owner'] . '/' . $options['repo'] . '/stargazers';
				$text = 'Star';
				$buttonLink .= $options['repo'];
				$counterLink .= $options['repo'] . '/stargazers';
				break;
		
			case 'fork':
				$apiUrl = 'repos/' . $options['owner'] . '/' . $options['repo'] . '/forks';
				$text = 'Fork';
				$buttonLink .= $options['repo'];
				$counterLink .= $options['repo'] . '/network';
				break;
		
			case 'watch':
				$apiUrl = 'repos/' . $options['owner'] . '/' . $options['repo'] . '/subscribers';
				$text = 'Watchers';
				$buttonLink .= $options['repo'];
				$counterLink .= $options['repo'] . '/watchers';
				break;
		
			case 'follow':
				$counterLink .= 'followers';
				$text = 'Follow @' . $options['owner'];
				$apiUrl = 'users/'.$options['owner'].'/'.'followers';
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
			$dataset = $this->doApiRequest($apiUrl);
			
			// valid ?
			if (is_array($dataset)){
				$count = count($dataset);
			}else{
				$count = 0;
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
	private function doApiRequest($url){
		// cache url
		$cachefilename = $this->_cacheDir . '/github.'.sha1($url).'.cache.json';
		
		// 1h cachetime
		if (file_exists($cachefilename) && filemtime($cachefilename) > (time()-$this->_cachetime)){
			return json_decode(file_get_contents($cachefilename), true);
		}
		
		$opts = array('http' =>
				array(
						'method'  => 'GET',
						'protocol_version' => '1.1',
						'user_agent' => 'GitHubButtonsFetcher/1.0',
						'header'  => array(
								'Content-type: application/x-www-form-urlencoded;charset=UTF-8',
								'Connection: close',
								'Accept: application/vnd.github.v3+json'
						)
				)
		);
		
		// send request
		$data = file_get_contents('https://api.github.com/'.$url, false, stream_context_create($opts));
		
		// success ?
		if ($data===false){
			return array();
		}
		
		// cache data
		file_put_contents($cachefilename, $data);
		
		// return resposne data
		return json_decode($data, true);
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