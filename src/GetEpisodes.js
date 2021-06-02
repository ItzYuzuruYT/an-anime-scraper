const fetch = require('node-fetch')
const cheerio = require('cheerio')

/**
 * This method allows you to Fetch links of all episodes of an anime. One disappointment is it's somewhat case-sensitive
 * @param {string} name - Name of the anime 
 * @returns object - Links of all the episodes of anime/season
 */

async function GetEpisodes(name) {
    if (!name) throw new Error(`Name of the anime is required`)
    if (typeof (name) !== "string") throw new Error(`Name must be a string`)

    let baseUrl = `https://gogoanime.ai//search.html?keyword=${name.replace(/ /g, "_")}`

    try {
        let res = await fetch(baseUrl).then(res => res.text())
        let $x = cheerio.load(res)
        let link = `https://gogoanime.ai` + $x('div.last_episodes > ul.items > li').eq(0).find('div.img').find('a').attr('href')

        let body = await fetch(link).then(res => res.text())
        let $ = cheerio.load(body)

        let epLinks = []
        let epLenght = $('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end')
        epLenght = parseInt(epLenght) + 1

        for (let c = 1; c < epLenght; c++) {
            epLinks.push(`https://gogoanime.ai/${$('div.anime_info_body_bg > h1').text().replace(/ /g, "-").replace(/[^A-Za-z0-9-]/g, "")}-episode-${[c]}`)
        }

        return epLinks;
    } catch (err){
        throw new Error(`Name of the anime (${name}) is invalid`)
    }

}

module.exports = GetEpisodes;
