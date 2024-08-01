module.exports.config = {
	name: "para3",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Paraphrase Strength 3",
	commandCategory: "game",
	usages: "",
	cooldowns: 5
};

module.exports.run =async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const axioss = require("axios");
  let text = args.join(" ");
const options = {
  method: 'POST',
  url: 'https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '8754bd8d9bmshfbf53f70a72936ap10b5b9jsn80ac2c4843e4',
    'X-RapidAPI-Host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com'
  },
  data: `{"language":"en","strength":3,"text":"${text}"}`
};
  
axios.request(options).then(function (response) {
	return api.sendMessage(`== 𝗕𝗔𝗦𝗜𝗖 𝗣𝗔𝗥𝗔𝗣𝗛𝗥𝗔𝗦𝗘 ==\n\n🔎 Results\n\n${response.data.rewrite}`, event.threadID, event.messageID)

}).catch(function (error) {
	console.error(error);
});

}