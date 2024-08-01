module.exports.config = {
	name: "freeai-img",
	version: "3.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "Lyrics from api",
	commandCategory: "word",
	usages: "text",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = require('axios');
let text = args.join(" ");
const res = await axios.get(`https://chards-bot-api.richardretada.repl.co/api/tools/ai-image?content=${text}`);

  const t = (await axios.get(`${res.data.result.image1.url}`, {
                responseType: "stream"
            })).data;

  console.log(res.data.result.image1.url)

return api.sendMessage({body: `❖━ GENERATE ━❖\n`, attachment: t}, event.threadID, event.messageID)
}
