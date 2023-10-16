const TelegramBot = require('node-telegram-bot-api');
const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const token = '6697771514:AAE0z5GTG15PPfhLQ9bo6xN3OVbVbFFo8xM';    
const bot = new TelegramBot(token, {polling: true});
const fs = require('fs')
const ytdl = require('ytdl-core')



bot.on('message', async(message) => {
    const chatId = message.chat.id
    const full_name = message.from.first_name
    if(message.text=='/start') {
        const userName = message.from.username
        bot.sendMessage(chatId,`Asslomu aleykum <b>${full_name}</b> botimizga hush kelibsiz. Botga biror bir youtube link yuboring. Men sizga videosini yuklab beraman.`,{
            parse_mode:'HTML'
        })    
    }



    else if(ytdl.validateURL(message.text)){
        async function botSendVideo() {
        try {
         await  bot.sendMessage(chatId,'Video link keldi')
        let info = await ytdl.getInfo(message.text)
        let video_title = info.videoDetails.title
        ytdl(message.text).pipe(fs.createWriteStream(`videos/${video_title}.mp4`));

         setTimeout(async() => {
            await bot.sendVideo(chatId,`videos/${video_title}.mp4`,{
                caption:video_title + `Telegram kanalimiz `
            })
         },10000)

        } catch (error) {
            console.log(error + "");
        }
        }
        botSendVideo()
    }
    
})