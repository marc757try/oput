'use strict'
var TelegramBot = require('node-telegram-bot-api');


var token = '852827328:AAFOqo07RxcZJkItZj8PxwFi2tCrZ7k6Rzs';

var bot = new TelegramBot(token, {polling: true});
var notes=[]
const osmosis=require('osmosis')
osmosis
   .get('https://privatbank.ua')
   .find('.resourcescontent ul.app-card-grid')
   .follow('li a[href]')
   .find('.resourcescontent')
   .set({
       'appname': '.app-header__details h1',
       'email': '#AppInfo table tbody tr:nth-child(2) td > a'
    })
   .log(console.log)   
   .data(console.log)

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
  var userId = msg.from.id;
  var text = match[1];
  var time = match[2];

  notes.push({ 'uid': userId, 'time': time, 'text': text });

  bot.sendMessage(userId, 'Отлично! :)');
});
setInterval(function(){
  for (var i = 0; i < notes.length; i++){
      var curDate = new Date().getHours() + ':' + new Date().getMinutes();
          if ( notes[i]['time'] == curDate ) {
              bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
              notes.splice(i,1);
          }
      }
},1000);

