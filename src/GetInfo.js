const fetch = require("node-fetch")
const cheerio = require("cheerio")

/**
 * Get Info about a specific anime on gogoanime with link
 * @param {string} link - Link of the anime to scrape info from
 * @returns object - Returns info on the anime link provided
 */

async function GetInfo(link) {
    if (!link) throw new Error(`Link to the anime is not provided`)
    if (typeof (link) !== "string") throw new Error(`TypeOf link is supposed to be a string`)

    let body = await fetch(link).then(res => res.text())
    let $ = cheerio.load(body)
    let $a = cheerio.load(body)
    $ = cheerio.load($('div.anime_info_body_bg').html())

    let anime = {
        name: $('h1').text(),
        cover: $('img').attr('src'),
        type: $('p.type').eq(0).find('a').text(),
        summary: $('p.type').eq(1).text().trim().replace(/Plot Summary:/i, "").trim(),
        genre: $('p.type').eq(2).find('a').text(),
        releasedDate: $('p.type').eq(3).text().replace(/Released:/i, "").trim(),
        status: $('p.type').eq(4).find('a').text(),
        otherName: $('p.type').eq(5).text().replace(/Other name/i, ""),
        episodeCount: $a('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end')
    }

    if(anime.name === '404') throw new Error(`Invalid Anime, plz try with a different link`)

    return anime;
}

module.exports = GetInfo;