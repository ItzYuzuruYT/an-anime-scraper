# Installation
```bash
npm i an-anime-scraper
```

# Description
an-anime-scraper is a scraper created to make anime scraping easier and implement in your programs. Currently only one website (gogoanime.ai) is supported

Important Note: This package is also inspired from [ctk-anime-scraper](https://www.npmjs.com/package/ctk-anime-scraper) package. You can checkout ctk's package by clicking on the name :)

[![NPM](https://nodei.co/npm/an-anime-scraper.png)](https://nodei.co/npm/an-anime-scraper/)


# Usage Examples
- Anime#animeInfo()
```javascript
const { Anime } = require('an-anime-scraper')
const anime = new Anime("gogoanime.ai")

anime.animeInfo('rezero').then(data => {
    console.log(data)
})
```


- Anime#animeInfoFetch()
```javascript
// Example #1
// Example with anime NAME as parameter
const { Anime } = require('an-anime-scraper')
const anime = new Anime("gogoanime.ai")

anime.animeInfoFetch("re:zero").then(data => {
    console.log(data)
})
```
```javascript
// Example #2
// Example with anime URL as parameter
// NOTE: if passing a url instead of name the second parameter must be set true. It is set to false by default
const { Anime } = require('an-anime-scraper')
const anime = new Anime("gogoanime.ai")

anime.animeInfoFetch("https://www1.gogoanime.ai/category/rezero-kara-hajimeru-isekai-seikatsu", true).then(data => {
    console.log(data)
})
```


- Anime#searchAnime()
```javascript
const { Anime } = require('an-anime-scraper')
const anime = new Anime("gogoanime.ai")

anime.searchAnime("horimiya").then(list => {
    console.log(list)
})
```


- Anime#getEpLinks()
```javascript
const { Anime } = require('an-anime-scraper')
const anime = new Anime("gogoanime.ai")

anime.getEpLinks("https://www1.gogoanime.ai/category/rezero-kara-hajimeru-isekai-seikatsu").then(links => {
    console.log(links)
})
```


- Anime#getInfo()
```javascript
const { Anime } = require('an-anime-scraper')
const anime = new Anime("gogoanime.ai")

anime.getInfo("https://www1.gogoanime.ai/category/rezero-kara-hajimeru-isekai-seikatsu").then(data => {
    console.log(data)
})
```



# Methods
```javascript
Anime.animeInfo()   // Gets data of an anime by name. Gives weird results idk
```
```javascript
Anime.animeInfoFetch()   // Gets data of an anime by NAME or URL. More preffered but is case-sensitive like in symbols and spaces...  yea!
```
```javascript
Anime.searchAnime()   // Searches for an anime by name and returns array of all anime links, imgs, names and release dates :L
```
```javascript
Anime.getEpLinks()   // Gets all episode links of the provided anime URL
```
```javascript
Anime.getInfo()   // Gets data of an anime by URL
```


# Update Changes (2.0.0):
[![npm version](https://badge.fury.io/js/an-anime-scraper.svg)](https://npmjs.com/package/an-anime-scraper)
- Added new method searchAnime
- GetEpisodes method is now getEpLinks
- animeInfoFetch method can now take url as a parameter by setting second parameter true
- More error handlers added


# Dependencies
[CHEERIO](https://npmjs.com/package/cheerio) | [NODE-FETCH](https://npmjs.com/package/node-fetch)

# Ending
I hope that concludes, here's a cookie 🍪
