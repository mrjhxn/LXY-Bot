module.exports.config = {
  name: "play",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "SaikiDesu",
  description: "Play music with lyrics",
  commandCategory: "utility",
  usages: "[title]",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async({api, event}) => {
	const axios = require("axios");
    const fs = require("fs-extra");
    const Innertube = require("youtubei.js");
    const request = require("request");
    let input = event.body;
    let vips = ["",""];
 
    var text = input;     text = text.substring(6)
let data = input.split(" ");
  
if (data.length < 2) {               return api.sendMessage("❒ Can't play, Invalid Command or No title match", event.threadID);
}
  

data.shift()

//console.log(saiki)
           
  const youtube = await new Innertube();
  const search = await youtube.search(text);
  
if (search.videos[0] === undefined){
api.sendMessage("❒ Error: Invalid request.",event.threadID,event.messageID)
api.setMessageReaction("❎", event.messageID, (err) => {}, true)
}else{
api.sendMessage(`╭┈ ❒ 𝗡𝗼𝘄 𝗦𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴\n╰┈➤ ${text}\n\n ❒ please wait <3...`,  event.threadID,event.messageID);
api.setMessageReaction("✅", event.messageID, (err) => {}, true)
var timeleft = 3;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  //  api.sendMessage("A video has found!\n\nStarting to Download", event.threadID, event.messageID);
    }
  timeleft -= 1;
}, 1000);
  const stream = youtube.download(search.videos[0].id, {
    format: 'mp4',
    type: 'audio',
    audioQuality: 'lowest',
    loudnessDB: '20',
    audioBitrate: '320',
    fps: '30'
  });
  
  
stream.pipe(fs.createWriteStream(__dirname + `/cache/${event.senderID}.m4a`))

  stream.on('start', () => {
    console.info('[DOWNLOADER]', 'Starting download now!');
  }); 
  stream.on('info', (info) => {
    /*console.info('[DOWNLOADER]',`Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);
    console.log(info)*/
    console.info('[DOWNLOADER]',`${search.videos[0]}`);
  });
  stream.on('end', () => {
  // process.stdout.clearLine();
  // process.stdout.cursorTo(0);
    console.info(`[DOWNLOADER] Downloaded`)
    
if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26214400) return api.sendMessage('❒ [ERR] The file could not be sent because it is larger than 25MB.', event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
    console.log(JSON.stringify(search.videos[0]))
    var message = {
          body:(`╭┈ ❒ 𝗡𝗼𝘄 𝗣𝗹𝗮𝘆𝗶𝗻𝗴\n╰┈➤ Title: ${search.videos[0].title}\n╰┈➤ Channel: ${search.videos[0].channel.name}\n╰┈➤ Views: ${search.videos[0].metadata.view_count}\n╰┈➤ Description: ${search.videos[0].description}\n\n\n╰┈➤ Channel Link: ${search.videos[0].channel.url}\n╰┈➤ Video Link: ${search.videos[0].url}`),
         attachment:[ 
fs.createReadStream(__dirname + `/cache/${event.senderID}.m4a`)]}
           api.sendMessage(message, event.threadID,event.messageID);
  }); 
stream.on('error', (err)=> console.error('[ERROR]',err))

  stream.on('end', async () => {                                             if (fs.existsSync(__dirname + `/cache/${event.senderID}.m4a`)) {
                                    fs.unlink(__dirname + `/cache/${event.senderID}.m4a`, function (err) {
                                  if (err) console.log(err);                                        
                                  console.log(__dirname + `/cache/${event.senderID}.m4a is deleted!`);
                                                        });
                                                     }
             })
 
}
      } 
                                     
