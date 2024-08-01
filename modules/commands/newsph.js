module.exports.config = {
	name: "newsph",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "NEWS PHILLIPINES",
	commandCategory: "words",
	usages: "",
	cooldowns: 5
};

module.exports.run =async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const axioss = require("axios");
const options = {
  method: 'GET',
  url: 'https://philippine-news.p.rapidapi.com/latest',
  params: {limit: '5'},
  headers: {
    'X-RapidAPI-Key': '8754bd8d9bmshfbf53f70a72936ap10b5b9jsn80ac2c4843e4',
    'X-RapidAPI-Host': 'philippine-news.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);

  let msg = `===== NEWS PH =====\n`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${response.data[0].title}\n`;
    msg += `\n📝 Description:\n [𝟭]. ${response.data[0].description}\n`;
    msg += `\nℹ Source: [𝟭]. ${response.data[0].source}`;
    msg += `\n🗓 Publish Date: [𝟭]. ${response.data[0].pubDate}`;
    msg += `\n🔗 Reference:\n [𝟭]. ${response.data[0].link}`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${response.data[1].title}\n`;
    msg += `\n📝 Description:\n [𝟐]. ${response.data[1].description}\n`;
    msg += `\nℹ Source: [𝟐]. ${response.data[1].source}`;
    msg += `\n🗓 Publish Date: [𝟐]. ${response.data[1].pubDate}`;
    msg += `\n🔗 Reference:\n [𝟐]. ${response.data[1].link}`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${response.data[2].title}\n`;
    msg += `\n📝 Description:\n [𝟑]. ${response.data[2].description}\n`;
    msg += `\nℹ Source: [𝟑]. ${response.data[2].source}`;
    msg += `\n🗓 Publish Date: [𝟑]. ${response.data[2].pubDate}`;
    msg += `\n🔗 Reference:\n [𝟑]. ${response.data[2].link}`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${response.data[3].title}\n`;
    msg += `\n📝 Description:\n [𝟒]. ${response.data[3].description}\n`;
    msg += `\nℹ Source: [𝟒]. ${response.data[3].source}`;
    msg += `\n🗓 Publish Date: [𝟒]. ${response.data[3].pubDate}`;
    msg += `\n🔗 Reference:\n [𝟒]. ${response.data[3].link}`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${response.data[4].title}\n`;
    msg += `\n📝 Description:\n [𝟓]. ${response.data[4].description}\n`;
    msg += `\nℹ Source: [𝟓]. ${response.data[4].source}`;
    msg += `\n🗓 Publish Date: [𝟓]. ${response.data[4].pubDate}`;
    msg += `\n🔗 Reference:\n [𝟓]. ${response.data[4].link}`;
    msg += `\n==========================\n\n`;
  return api.sendMessage(msg, event.threadID, event.messageID);
}).catch(function (error) {
	console.error(error);
});

}