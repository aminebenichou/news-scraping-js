const PORT = 5400
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')


const app = express()

const url = `https://www.echoroukonline.com/francais`

axios(url)
    .then((response) => { 
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        
        $('.ech-card__cntn', html).each(function () {
            const image = $(this).find('.ech-card__figure').find('img').attr('data-src')
            const title = $(this).find('span').text()
            const link = $(this).find('a').attr('href')
            articles.push({
                image,
                title,
                link
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))
app.listen(PORT, ()=>console.log(`server running on PORT ${PORT}`))