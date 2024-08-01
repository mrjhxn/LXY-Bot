module.exports.config = {
	name: "bible",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "random anime qoutes with character",
	commandCategory: "Random Text",
	usages: "",
	cooldowns: 5,
	dependencies: {
		"axios":""}
	
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];

const res = await axios.get(`https://labs.bible.org/api/?passage=random&type=json`);
var bookname = res.data[0].bookname;
var chapter = res.data[0].chapter;
var verse = res.data[0].verse;
var text = res.data[0].text;
return api.sendMessage(`=== BIBLE ===\n\n► Bookname: ${bookname}\n► Chapter: ${chapter}\n► Verse: ${verse}\n\n${text}`, event.threadID, event.messageID)
}