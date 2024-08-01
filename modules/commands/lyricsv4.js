module.exports.config = {
	name: "lyricsv4",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "GENIUS LYRICS",
	commandCategory: "game",
	usages: "",
	cooldowns: 5
};

module.exports.run =async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const axioss = require("axios");
  let text = args.join(" ");
const options1 = {
  method: 'GET',
  url: 'https://genius-song-lyrics1.p.rapidapi.com/search',
  params: {q: `${text}`, per_page: '1', page: '1'},
  headers: {
    'X-RapidAPI-Key': '8754bd8d9bmshfbf53f70a72936ap10b5b9jsn80ac2c4843e4',
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
  }
};

axios.request(options1).then(function (response1){
  var resSong = response1.data.response.hits[0].result.id;
  
const options = {
  method: 'GET',
  url: `https://genius-song-lyrics1.p.rapidapi.com/songs/${resSong}/lyrics`,
  headers: {
    'X-RapidAPI-Key': '8754bd8d9bmshfbf53f70a72936ap10b5b9jsn80ac2c4843e4',
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
  }
};
  
axios.request(options).then(function (response) {
	return api.sendMessage(`== 𝗟𝗬𝗥𝗜𝗖𝗦V4 ==\n\nTITLE:\n${response.data.response.lyrics.tracking_data.title}\nARTIST:\n${response.data.response.lyrics.tracking_data.primary_artist}\n\nLYRICS\n\n${response.data.response.lyrics.lyrics.body.plain}`, event.threadID, event.messageID)

}).catch(function (error) {
	console.error(error);
});
}).catch(function (error) {
	console.error(error);
});

}