module.exports.config = {
	name: "trivia",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Joshua Sy",
	description: "trivia",
	commandCategory: "...",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
const res = await axios.get(`http://jservice.io/api/random`);
var answer = res.data[0].answer;
var question = res.data[0].question;
return api.sendMessage(`Question: ${question}\n\nAnswer: ${answer}`, event.threadID, event.messageID)
}