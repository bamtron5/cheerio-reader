var cheerio   = require("cheerio");
var request   = require("request");
var inquirer  = require("inquirer");
var fs        = require("fs");

fs.access('./tmp/config.json', fs.F_OK, function(err) {
    if (!err) {
        return;
    } else {
        writeConfig(JSON.parse("{}"));
    }
});

var config = {};
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
		getSelector();
	} else {
		getUrl();
	}
});

function getSelector(){
	var selectorOptions = [
		{
			type: "input",
			name: "selector",
			message: "Choose an element selector\ne.g. article, #myId, .myClass, article#myId .myClass:"
		}
	];

	inquirer.prompt( selectorOptions, function( answers ) {
		config.selector = answers.selector;
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
		config.url = answers.url;
		readArticle(config);
	});
}

function writeConfig(input){
	fs.writeFile("./tmp/config.json", input, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    
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