module.exports.config = {
	name: "grammarcheck",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Grammar Check",
	commandCategory: "word",
	usages: "",
	cooldowns: 5
};

module.exports.run =async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const axioss = require("axios");
  let text = args.join(" ");
const encodedParams = new URLSearchParams();
encodedParams.append("language", "en-US");
encodedParams.append("text", `${text}`);

const options = {
  method: 'POST',
  url: 'https://dnaber-languagetool.p.rapidapi.com/v2/check',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '8754bd8d9bmshfbf53f70a72936ap10b5b9jsn80ac2c4843e4',
    'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
  },
  data: encodedParams
};
  
axios.request(options).then(function (response) {
	return api.sendMessage(`== 𝗚𝗥𝗔𝗠𝗠𝗔𝗥 𝗖𝗛𝗘𝗖𝗞 ==\n\n🔎 Results\n\n${response.data.matches[0].message}\n\nKeyword: ${response.data.matches[0].replacements[0].value}`, event.threadID, event.messageID)

}).catch(function (error) {
	console.error(error);
  return api.sendMessage(`== 𝗚𝗥𝗔𝗠𝗠𝗔𝗥 𝗖𝗛𝗘𝗖𝗞 ==\n\n🔎 Results\n\nCorrect Grammar!`, event.threadID, event.messageID);
});

}