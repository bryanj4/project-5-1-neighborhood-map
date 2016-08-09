# Rome Travel App #

##### Synopsis #####
The Rome Travel App will provide you with some interesting destinations and information about the most important places to visit in Rome.


### Table of Contents ###
* [Dependencies](#dependencies)
* [Installation](#installation)
* [How to Run](#how-to-run)
* [About](#about)
* [Attribution](#attribution)



## Dependencies ##
You will need the programs listed below in order to install and run the web app:

* A modern Web Browser (Chrome)
* Git
* Node.js and these NPM packages installed globally
    * Gulp.js
    * Bower.js
* Google Maps Javascript API Key - Enable most or all of the APIs


## Installation ##

~~~
git clone https://github.com/bryanj4/project-5-1-neighborhood-map.git
cd project-5-1-neighborhood-map
npm install
bower install
~~~
After you install of the dependencies, then you need to place your API key into the src/index.html file and replace the current key with you key. Once you do that then the Rome Map App will work.


## How to Run ##
~~~
cd /abspath/project-5-1-neighborhood-map
gulp serve
~~~
Usually a browser will pop up with page otherwise just copy the link in the terminal and open it up in a browser.


## About ##
If you need to reset the view back to show all markers then press the Purple **R** at the top left portion of the screen.

You can press the descriptive button above to get the desired marker view. You can also Press the *Currency Conversion* button for the current exchange rate from a list of well used currencies (**Uses third party API**). Press the *About* button for a description of the App.

You can also filter the markers based on the name of the location as well as pre-defined keywords to make sure you find the place you are looking for.

When you click on a marker then you should get a pop up InfoWindow which has the known Wikipedia description (**Wikipedia API**) along with a link to the official website.


## Attribution ##
I received some help from a Udacity tutor, Karol, from Germany. I also attributed sources throughout the code.
