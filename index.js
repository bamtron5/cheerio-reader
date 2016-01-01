var cheerio    = require("cheerio");
var request    = require("request");
var inquirer   = require("inquirer");
var fs         = require("fs");
var siteObj    = JSON.stringify({sites:{}},null,1);
var fileConfig = require("./tmp/config.json") || siteObj;

var app = function(){
	var localConfig = {};
	var sites = ["Add new site"];

	var siteOptions = [
		{
			type: "list",
			name: "sites",
			message: "Select a website or add a new one:",
			choices: sites
		}
	];

	inquirer.prompt( siteOptions, function( answers ) {
		if(answers.sites === "Add new site"){
			addNewSite();
		} else {
			getSelector();
		}
	});

	function addNewSite(){
		var selectorOptions = [
			{
				type: "input",
				name: "sitename",
				message: "Add a new site name:"
			}
		];

		inquirer.prompt( selectorOptions, function( answers ) {
			localConfig.sitename = answers.sitename;
			getSelector();
		});
	}

	function getSelector(){
		var selectorOptions = [
			{
				type: "input",
				name: "selector",
				message: "Choose an element selector\ne.g. article, #myId, .myClass, article#myId .myClass:"
			}
		];

		inquirer.prompt( selectorOptions, function( answers ) {
			localConfig.selector = answers.selector;
			getUrl();
		});
	}

	function getUrl(){
		var urlOptions = [
			{
				type: "input",
				name: "url",
				message: "Paste in your url:"
			}
		];

		inquirer.prompt( urlOptions, function( answers ) {
			localConfig.url = answers.url;
			writeConfig();
		});
	}

	function writeConfig(){
		fileConfig.sites[localConfig.sitename] = {
			"sitename":localConfig.sitename,
			"selector":localConfig.selector
		};

		fileConfig = JSON.stringify(fileConfig,null,1);

		fs.writeFile("./tmp/config.json", fileConfig, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}, function(){
			readArticle(localConfig);
		});
	}

	function readArticle(options){
		request(options.url, function (error, response, html) {
		  if (!error && response.statusCode == 200) {
		    var $ = cheerio.load(html);
		    var article = $(options.selector);

		    /* if selector is not on the page then return an error*/
		    if(article.length === 0){
		    	console.log('\nYou made a boo boo:\n"' + options.selector + '" does not exist on the page.');
		    	return false;
		    }

		    var text = '';
		    $(article).children().each(function(i, element){
		    	switch(element.name) {
		    		case "p":
		    			text += $(element).text();
		    			break;
		    		case "h1":
		    			text += $(element).text();
		    			break;	    		
	    			case "h2":
		    			text += $(element).text();
		    			break;	    		
	    			case "h3":
		    			text += $(element).text();
		    			break;	    		
	    			case "h4":
		    			text += $(element).text();
		    			break;	    		
	    			case "h5":
		    			text += $(element).text();
		    			break;	    		
	    			case "h6":
		    			text += $(element).text();
		    			break;
		    	}
		    });

		    /*OUR RETURNED TEXT*/
		    console.log(text);
		    return true;

		  } else {

		  	/* Your url did not resolve */
		  	console.log('\nYou made a boo boo:\n' + error);
		  	return false;

		  }
		});
	};
};

app();