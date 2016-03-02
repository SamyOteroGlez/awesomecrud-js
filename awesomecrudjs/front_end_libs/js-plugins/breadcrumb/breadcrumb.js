/**

 breadcrumb.js
 
 version: 0.2 
 date: 24 February 2016
 created by: Samy Otero
 gitHub: https://github.com/SamyOteroGlez/breadcrumb.js
 
How to use:

1- Load the library file to your page.

	<script src="breadcrumb.js"></script>

2- Initialize breadcrumb.js by adding the next code in your page.

	<script>
		breadcrumb.init(
			container_id_to_render, 
			{
				stopLink: {}, 
				urlDivider: '', 
				divider: '', 
				groupCountainerTag: '', 
				containerTag: '', 
				cssStyleGroupContainer: '', 
				cssStyleTag: '', 
				cssStyle: '', 
			}
		);	
	</script>
 
 3- Enjoy it!
 
 -----------------------------------------------------------------------------
 
 Explanation:
 	
	breadcrumb.init(container_id_to_render, config);
 	
	container_id_to_render: Id of the breadcrumbs container.
		<div id="breadcrumb" class="any_class"></div>
	
	config: Configuration parameters.	
		stopLink: Array of actions that you don't want as links.
			stopLink: {
					edit: 'edit',
					show: 'show', 
				}
		
		urlDivider: Set the char where to split the url. By default takes "/".
			http://localhost/user/create
			
		divider: Divider to show between links in the breadcrumbs. By default takes " ".
			Home User Create
			
		groupCountainerTag: Cointainer to group all the links. Could be a list like <ol> or <ul>. Just write ul or ol, no need of <>.
		
		containerTag: Container of each link. Could be <li> if groupCountainerTag is a list tag. Just write li or span, no need of <>.
		
		cssStyleGroupContainer, cssStyleTag and cssStyle: Css styles for each container.
	
	-----------------------------------------------------------------------------
	
 **/

var breadcrumb = function(id, config){
	
	var breadcrumb = function(id, config){
		//Name of the actions you don't wat as link
		var stopLink = config.stopLink;

		//Divider
		var divider = ' ';

		//Tags and containers
		var groupCountainerTag = config.groupCountainerTag;
		var groupCountainerTagO = '';
		var groupCountainerTagC = '';
		var groupCountainerTagClose = '';
		var classGoupTag = '';

		var containerTag = config.containerTag;
		var containerTagO = '';
		var containerTagC = '';
		var containerTagClose = '';		
		var classTag = '';

		//Styles
		var cssStyleGroupContainer = config.cssStyleGroupContainer;
		var cssStyleTag = config.cssStyleTag;
		var cssStyle = config.cssStyle;
		
		//urlDivider
		var urlDivider = '/';
		
		//Others
		var x = 0;
		var stop = 0;
		var output = "";
		breadcrumb = new Object;
		url = location.href;	
		url = url.slice(8, url.length);
		cut = url.indexOf(urlDivider);
		url = url.slice(cut + 1, url.length);
		
		//divider preparation
		if(config.divider != ''){
			divider = config.divider;
		}
		
		//urlDivider preparation
		if(config.urlDivider != ''){
			urlDivider = config.urlDivider;
		}

		//Container preparation 
		if(config.containerTag != ''){
			containerTag = config.containerTag;
			containerTagO = "<";
			containerTagC = ">";
			containerTagClose = "</" + containerTag + ">";
			classGoupTag = " class='" + cssStyleGroupContainer + "'";
		}
		
		//Tag preparation
		if(config.groupCountainerTag != ''){
			groupCountainerTag = config.groupCountainerTag;
			groupCountainerTagO = "<";
			groupCountainerTagC = ">";
			groupCountainerTagClose = "</" + groupCountainerTag + ">";
			classTag = " class='" + cssStyleTag + "'";
		}

		output = groupCountainerTagO + groupCountainerTag + classGoupTag + groupCountainerTagC + containerTagO + containerTag + classTag + containerTagC + "<a class='" + cssStyle + "' href=\"/\">" + document.title +  "</a>" + containerTagClose;

		//Cutting the url
		while(!stop){
		  cut = url.indexOf(urlDivider);

		  if (cut != -1){
			breadcrumb[x] = url.slice(0, cut);
			url = url.slice(cut + 1, url.length);
		  }else{
			breadcrumb[x] = url;
			stop = 1;
		  }
		  x++;
		}

		//Links creation
		for(var i in breadcrumb){

		  if(i == (x-1)){
			output += divider + containerTagO + containerTag + classTag + containerTagC +  breadcrumb[i] + containerTagClose;
		  }
		  else{
			aux  = 0;

			for(var j in stopLink){

				if(breadcrumb[i] == stopLink[j]){
					output += divider + containerTagO + containerTag + classTag + containerTagC +  breadcrumb[i] + containerTagClose;
					aux = 1;
					break;
				}
			}  
			if(aux == 0){
				output += divider + containerTagO + containerTag + classTag + containerTagC +  "<a class='" + cssStyle + "' href=\"/" + breadcrumb[i] + "\">" + breadcrumb[i] + "</a>" + containerTagClose;
			}  	
		  }	      
		}
		output += groupCountainerTagClose;
		
		$('#' + id).html(output);
	};
	
	return{		
		init: function(id, config){
			breadcrumb(id, config);
		}		
	};	
}();