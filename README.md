# Installation
```bash
npm i an-anime-scraper
```

# Description
an-anime-scraper is a scraper created to make anime scraping easier and implement in your programs. Currently only one website (gogoanime.ai) is supported

# Usage Example
#1
```javascript
// requiring the package
const { Anime } = require('an-anime-scraper')
// using the AnimeInfo() method to get anime data
Anime.AnimeInfo("rezero").then((anime) => {
    console.log(anime)
})
```

#2
```javascript
// requiring the package
const { Anime } = require('an-anime-scraper')
// using the AnimeInfo() method to get anime data
Anime.AnimeInfo("rezero").then((anime) => {
    // all returned properties -> cover, episodeCount, genre, name, otherName, releasedDate, status, summary, type
    let name = anime.name
    let summary = anime.summary
    let cover = anime.cover

    console.log(`Name: ${name}\nSummary: ${summary}\nCover: ${cover}`)
})
```
or
```javascript
// requiring the package
const { Anime } = require('an-anime-scraper')
// using the AnimeInfo() method to get anime data
Anime.AnimeInfo("rezero").then((anime) => {
    // getting all properties at once with for in loop
    for (let key in anime){
        console.log(`${key}: ${anime[key]} \n`)
    }
})
```
![PROPERTIES](https://media.discordapp.net/attachments/847818568473378817/849247386832470066/unknown.png)

# Methods
```javascript
Anime.GetInfo()   // Gets Info of an anime by link
```
```javascript
Anime.AnimeInfo()   // Gets info of an anime with name. Is slower but better
```
```javascript
Anime.AnimeInfoFetch()   // Gets info of an anime with name. Faster than (Anime#AnimeInfo) but is somewhat case-sensitive 
```
```javascript
Anime.GetEpisodes()   // Gets all episode links of an anime season. Takes (name) as parameter
```

# Dependencies
[CHEERIO](https://npmjs.com/package/cheerio) | [NODE-FETCH](https://npmjs.com/package/node-fetch)

# Ending
I hope that concludes, here's a cookie 🍪
