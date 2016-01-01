var cheerio = require("cheerio");
var request = require("request");
var prompt  = require("prompt");
var say     = require('say');
    colors = require('colors');

/*prompt schema*/
var schema = {
	properties: {
	  url: {
	    required: true
	  },
	  selector: {
	    required: true
	  }
	}
};

prompt.start();
prompt.get(schema, function(err, result){
	var options = {};

	/*output prompt to user*/
	console.log('Command-line input received:');
    console.log('  url: ' + result.url);
    console.log('  selector: ' + result.selector);

    //set options
    options.url = result.url;
    options.selector = result.selector;

    //read article from cheerio
    readArticle(options);
});

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
	  	
	  	/*Don't show the output text and just read it*/
	  	//text=String(text);
	  	
	  	/*Speak the text */
	    say.speak(null,text); 
	    return true;	  	

	  } else {

	  	/* Your url did not resolve */
	  	console.log('\nYou made a boo boo:\n' + error);
	  	return false;

	  }
	});
};