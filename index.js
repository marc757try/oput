const express = require('express')
const axios = require('axios')
//const { JSDOM } = require('jsdom')
const request = require("request"),
 const   cheerio = require("cheerio"),
const bodyParser = require('body-parser')
const https=require('https')

const token = process.env.CURS_BOT
const appUrl = process.env.APP_URL

const setWebhook = url => axios.get(`https://api.telegram.org/bot${token}/setWebhook?url=${url}`)
const sendMessage = (chatId, text) => axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
const parseCurs = ()=>{
  url = "https://privatbank.ua/"

  request(url, function (error, response, body) {
      if (!error) {
          const $ = cheerio.load(body),
              curs = $("#USD_buy").text()
             // b = $("#USD_sell").text()
                  }
      else { return }
  }
}
const app = express()
//app.use(bodyParser.json())
app.post('/telegram', (req, res) => {
  const {
    text,
    chat: { id },
  } = req.body.message
  parseCurs(text).then(
    curs => sendMessage(id, curs),
    () => sendMessage(id, 'error'),
  )
  res.send()
})
app.get('*', (_req, res) => {
  res.send(' Express.js')
})
app.listen(process.env.PORT || 3000, () => {
  setWebhook(`${appUrl}/telegram`)
})
