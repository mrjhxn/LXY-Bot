module.exports.config = {
	name: "biblev2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "Random bible verse",
	commandCategory: "...",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let verses = args.join(" ");

const res = await axios.get(`https://quotes.rest/bible/verse.json`);

  var bookname = res.data.contents.book;
  var testament = res.data.contents.testament;
  var chapter = res.data.contents.chapter;
  var number = res.data.contents.number;
  var word = res.data.contents.verse;

return api.sendMessage(`=== BIBLE ===\n\n► Bookname: ${bookname}\n► Testament: ${testament}\n► Chapter: ${chapter}\n► Verse: ${number}\n► Word: ${word}`, event.threadID, event.messageID)
}