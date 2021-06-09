const fetch = require('node-fetch')
const cheerio = require('cheerio')

class Anime {
    constructor(baseUrl) {
        this.baseUrl = baseUrl.toLowerCase() || `https://gogoanime.ai`
        if (!this.baseUrl.toLowerCase().startsWith('http'.toLowerCase())) this.baseUrl = "https://" + this.baseUrl
        if (this.baseUrl.match(/(https?:\/\/)?(www\.)?(gogoanime.)(ai|vc)/gi) === null) throw new Error('Only 2 supported links currently https://gogoanime.ai and https://gogoanime.vc')
    }

    /**
     * This method allows searching anime with name tho it's slower than others due to multiple fetch. It's somewhat case-insensitive but it do sometimes give weird results :P
     * @param {string} name Name of the anime as parameter
     * @returns Data/Info of the fetched anime
     */

    async animeInfo(name) {
        if (!name) throw new Error(`Name of the anime needs to be specified`)
        if (typeof (name) !== 'string') throw new Error(`Name of the anime should be a string`)

        try {
            name = name.replace(/\s/g, "%20")
            let baseUrl = `https://myanimelist.net/search/all?cat=all&q=${name}`

            let res = await fetch(baseUrl).then(res => res.text())
            let $x = cheerio.load(res)
            let nmae = $x('div.js-scrollfix-bottom-rel > article > div.list.di-t.w100').eq(0).find('div.information > a:first').text()

            baseUrl = `${this.baseUrl}//search.html?keyword=${nmae.replace(/\s/g, "_")}`
            res = await fetch(baseUrl).then(res => res.text())
            $x = cheerio.load(res)
            let link = `${this.baseUrl}` + $x('div.last_episodes > ul.items > li').eq(0).find('div.img').find('a').attr('href')

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
                episodeCount: $a('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end'),
                link: link
            }

            return anime;
        } catch (err) {
            throw new Error(`Couldn't fetch the anime info due to an error most probably due to the url or name being Invalid`)
        }
    }

    /**
     * This method fetches anime data directly from the provided NAME or URL. If name is provided it'll pick the first result from anime search array and fetch the data. If URL is provided it'll fetch directly from the url. Also you have to pass in true as 2nd parameter if you're passing URL
     * @param {string} link Either link or name of the anime
     * @param {boolean} isUrl Boolean to specify if link is a url or name
     * @returns Data/Info of the fetched anime
     */

    async animeInfoFetch(link, isUrl) {
        if (!link || typeof (link) !== 'string') throw Error("Name or link of the anime must be provided in order to search and should be a STRING format")
        if (!isUrl) isUrl = false;
        if (typeof (isUrl) !== "boolean") throw Error("Typeof Second parameter must be either true or false. Set TRUE to get info by link or set FALSE to get info by name")

        if (link && isUrl === false) {
            let name = link
            try {
                let baseUrl = `${this.baseUrl}//search.html?keyword=${name.replace(/\s/g, "_")}`
                let res = await fetch(baseUrl).then(res => res.text())
                let $x = cheerio.load(res)
                let link = `${this.baseUrl}` + $x('div.last_episodes > ul.items > li').eq(0).find('div.img').find('a').attr('href')

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
                    episodeCount: $a('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end'),
                    link: link
                }

                return anime;

            } catch (err) {
                throw new Error(`Couldn't fetch the anime info due to an error most probably due to the URL or NAME being Invalid`)
            }
        } else if (link && isUrl === true) {
            try {
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
                    episodeCount: $a('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end'),
                    link: link
                }

                return anime;
            } catch (err) {
                throw new Error(`Couldn't fetch the anime info due to an error most probably due to the URL or NAME being Invalid`)
            }
        }
    }

    /**
     * This method searches for an anime on gogoanime and returns all links in an array
     * @param {string} name Anime name to be searched
     * @returns Array of searched anime links and anime imgs
     */

    async searchAnime(name) {
        if (!name) throw Error("Anime name must be provided to search in query")
        if (typeof (name) !== 'string') throw Error("Anime name must be a string")

        try {
            let baseUrl = `${this.baseUrl}//search.html?keyword=${name.replace(/\s/gi, "%20")}`
            let res = await fetch(baseUrl).then(res => res.text())
            let $ = cheerio.load(res)

            let anime = {
                links: [],
                imgs: [],
                names: [],
                releasedDates: []
            }

            $('div.main_body > div.last_episodes > ul.items > li').each(function (i, elem) {
                $ = cheerio.load($(this).html())
                anime.links.push(`https://gogoanime.ai${$('div.img > a').attr('href')}`)
                anime.imgs.push($('div.img > a > img').attr('src'))
                anime.names.push($('p.name > a').attr('title'))
                anime.releasedDates.push($('p.released').text().trim())
            })

            if (anime.links.length === 0) throw Error("Anime fetch failed. Most probably due to invalid anime search name")
            return anime;
        } catch (err) {
            throw new Error(`Couldn't search for the anime query most probably due to the BaseUrl or NAME being Invalid`)
        }
    }


    /**
     * This method gets all episode links of the specified anime/season
     * @param {string} url Url of the anime/season
     * @returns Data as in array, to be specific all the streaming links for the anime/season
     */

    async getEpLinks(url) {
        if (!url) throw Error("Url of the anime/season is required")
        if (typeof (url) !== "string") throw Error("Url must be a string")

        let body = await fetch(url).then(res => res.text()).catch(err => {
            throw Error("There was an error while fetching the URL. Common reasons: Invalid URL provided")
        })
        let $ = cheerio.load(body)

        try {
            let epLinks = []
            let epLenght = $('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end')
            epLenght = parseInt(epLenght) + 1

            for (let c = 1; c < epLenght; c++) {
                epLinks.push(`https://gogoanime.ai/${$('div.anime_info_body_bg > h1').text().replace(/ /g, "-").replace(/[^A-Za-z0-9-]/g, "")}-episode-${[c]}`)
            }

            return epLinks;
        } catch (err) {
            throw Error("Couldn't fetch the episode links for given url. Common reasons: Invalid URL provided")
        }
    }


    /**
     * This method fetches anime data directly from the link. Same as animeInfoFetch URL method
     * @param {string} url URL of the anime/season to be searched 
     * @returns Data of the fetched URL
     */

    async getInfo(url) {
        if (!url) throw Error("URL must be provided to fetch the data")
        if (typeof (url) !== 'string') throw Error("URL must be a string")

        let body = await fetch(url).then(res => res.text()).catch(err => {
            throw Error("There was an error while fetching the URL. Common reasons: invalid URL provided")
        })
        let $ = cheerio.load(body)
        let $a = cheerio.load(body)
        $ = cheerio.load($('div.anime_info_body_bg').html())

        try {
            let anime = {
                name: $('h1').text(),
                cover: $('img').attr('src'),
                type: $('p.type').eq(0).find('a').text(),
                summary: $('p.type').eq(1).text().trim().replace(/Plot Summary:/i, "").trim(),
                genre: $('p.type').eq(2).find('a').text(),
                releasedDate: $('p.type').eq(3).text().replace(/Released:/i, "").trim(),
                status: $('p.type').eq(4).find('a').text(),
                otherName: $('p.type').eq(5).text().replace(/Other name/i, ""),
                episodeCount: $a('div.anime_video_body > ul#episode_page > li').find('a').attr('ep_end'),
                link: url
            }

            if (anime.name === '404') throw new Error(`Invalid Anime`)
            return anime;
        } catch (err) {
            throw new Error("Couldn't fetch the anime data most probably due to the URL being Invalid")
        }
    }

}

module.exports = Anime;