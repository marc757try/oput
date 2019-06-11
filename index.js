const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const bodyParser = require('body-parser');

const token = process.env.CURS_BOT;
const appUrl = process.env.APP_URL;

const setWebhook = url => axios.get(`https://api.telegram.org/bot${token}/setWebhook?url=${url}`);
const sendMessage = (chatId, text) => axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
const parseCurs = async (date) => {
  const {
    window: { document },
  } = await JSDOM.fromURL('https://privatbank.ua/', {
    resources: 'usable',
    runScripts: 'dangerously',
  });
  const docp = Array.from(document.querySelectorAll('.main'));
  const doc = docp.filter(el => el.querySelector('.content_conteiner_index');
  return doc ? doc.querySelector('.').textContent : 'no info';
};

const app = express();
app.use(bodyParser.json());
app.post('/telegram', (req, res) => {
  const {
    text,
    chat: { id },
  } = req.body.message;
  parseCurs(text).then(
    curs => sendMessage(id, curs),
    () => sendMessage(id, 'error'),
  );
  res.send();
});
app.get('*', (_req, res) => {
  res.send('Express.js');
});
app.listen(process.env.PORT || 3000, () => {
  setWebhook(`${appUrl}/telegram`);
});
