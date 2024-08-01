module.exports.config = {
	name: "bard-ai",
	version: "3.2.1",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Ask anything!",
	commandCategory: "education",
	usages: "text",
	cooldowns: 120
};

module.exports.run = async function({ args, api, event}) {
  //===================================
  const bardapi = require('@xelcior/bard-api');

const _bard = new bardapi("XQj5r6w5jksUybqkh6ncs_jP6aIsdIajMgxg7lf3nP4Rfgu5GKBPOE75-rIS_ZeBxQfklw.");

(async () => {
    const answer = await _bard.getAnswer(args.join(""));
    console.log(answer); //use response
    return api.sendMessage(answer, event.threadID, event.messageID)
})();
};