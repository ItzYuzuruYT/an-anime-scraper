const fetch = require('node-fetch')
const cheerio = require('cheerio')

/**
 * This method allows searching anime with name tho it's slower than others due to multiple fetch. It's somewhat case-insensitive but it do sometimes give weird results :P
 * @param {string} name - Name of the anime to be searched
 * @returns object - Info on the searched anime
 */

async function AnimeInfo(name) {
    if (!name) throw new Error(`Name of the anime needs to be specified`)
    if (typeof (name) !== 'string') throw new Error(`Name of the anime should be a string`)

    try {
        name = name.replace(/ /g, "%20")
        let baseUrl = `https://myanimelist.net/search/all?cat=all&q=${name}`

        let res = await fetch(baseUrl).then(res => res.text())
        let $x = cheerio.load(res)
        let nmae = $x('div.js-scrollfix-bottom-rel > article > div.list.di-t.w100').eq(0).find('div.information > a:first').text()

        baseUrl = `https://gogoanime.ai//search.html?keyword=${nmae.replace(/ /g, "_")}`
        res = await fetch(baseUrl).then(res => res.text())
        $x = cheerio.load(res)
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

module.exports = AnimeInfo;