#Cheerio Reader 

This project will prompt you from a node server to enter a url and an "article" selector and return the text of the article.
The initial intent of this project was to have an automated method of an article to be read out loud to the user. 

### Setup
Clone the repo `git clone https://github.com/bamtron5/cheerio-reader.git`
 - Run 'cd cheerio-reader' 
 - Run `npm install`
 - Run 'node index.js'
 - At the first prompt, enter in the URL you are wanting to have the article text returned from
 - At the second prompt, enter in the selector type (from the URL, do an inspect element, select the text portion of the page/article)

 - Example #1: URL: http://www.metrolyrics.com/push-pull-lyrics-purity-ring.html  Selector: #lyrics-body-text
 - Example #2: URL: http://www.infowars.com/third-journalist-killed-in-3-months-in-turkey-in-suspected-assassination/ Selector: article

### Tech Used
- [Cheerio](https://github.com/cheeriojs/cheerio): Used to parse the XML/HTML
- [Request](https://github.com/request/request): 
- [Prompt](https://github.com/flatiron/prompt): 