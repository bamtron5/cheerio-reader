var cheerio = require("cheerio");
var request = require("request");
var prompt  = require("prompt");

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
    options.text = '';

    //read article from cheerio
    readArticle(options);
});

function readArticle(options){
	request(options.url, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
	    var article = $(options.selector);
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
	    console.log(text);
	  }
	});
};