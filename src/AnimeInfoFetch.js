const fetch = require("node-fetch")
const cheerio = require("cheerio")

/**
 * This method scrapes anime directly from one link so is much faster than AnimeInfo. Tho the thing is it's case-sensitive so you can't really expect to get the same (anime)/(anime season) you search for
 * @param {string} name - Name of the anime to be fetched 
 * @returns object - Data of the fetched anime
 */

async function AnimeInfoFetch(name){
    if (!name) throw new Error(`Name of the anime needs to be specified`)
    if (typeof (name) !== 'string') throw new Error(`Name of the anime should be a string`)

    try {
        let baseUrl = `https://gogoanime.ai//search.html?keyword=${name.replace(/ /g, "_")}`
        let res = await fetch(baseUrl).then(res => res.text())
        let $x = cheerio.load(res)
        let link = `https://gogoanime.ai` + $x('div.last_episodes > ul.items > li').eq(0).find('div.img').find('a').attr('href')

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

        return anime;

    } catch (err) {
        throw new Error(`The name provided (${name}) couldn't be fetched unfortunately, try a different name`)
    }
}

module.exports = AnimeInfoFetch;