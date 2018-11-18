# FluPrediction
A demo application using text mining on TwitterSearch feed data to display predictions on Flu in the UK

**Start demo**
1. Install Webstorm from IntelliJ. You can find the JavaScript IDE by navigating to the following 
URL: [Webstorm](https://www.jetbrains.com/webstorm/)
A 30-day free trial is included.
2. Unzip the .zip project file to a known location.
3. Once Webstorm is successfuly installed, in the navigation bar located at the top select File -> Open.. 
4. Select the Project root folder and select Open.
5. Select the bin/www configuration and Run the project.
6. Go to your browser and navigate to [localhost:3000](localhost:3000)
7. The Web app should be running and displayed in the browser.

**Important to note**
1. Pagination (e.g. retrieval of multiple pages of of tweets from twitter query) is turned off by default. 
You can turn this on by navigating to twitterSearchGet.js and uncomment line 78. 
```//retrieveTweetsBatch(maxID,callback);```
2. Only the first 100 most recent tweets that fulfill the query are used for prediction. 
3. There is a limit to the amount of requests you are allowed to send to Twitter. This resolves quickly within a few minutes.
4. If you want to receive the latest tweets that have been generated in the meantime, run 
```analysisAutoML.js```. If you see tweets returned to the console, that means the latest tweets have been analysed, 
the classifier has predicted whether the retrieved tweets are actually flu and removed non-flu tweets, and a new 
```data/cities.json``` file has been generated.
5. In the folder ```data/tweets.csv``` a list of 5000 tweets including locations are saved. These may be used for testing purposes.

