module.exports.config = {
	name: "lyricsv3",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Jukie~",
	description: "Lyrics from api",
	commandCategory: "Phương tiện",
	usages: "lyrics [tên bài hát]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let timkiem = args.join(" ");
const res = await axios.get(`https://some-random-api.ml/lyrics?title=${timkiem}`);
var lyrics = res.data.lyrics;
var author = res.data.author;
var title = res.data.title;
return api.sendMessage(`❖━ LYRICS SEARCH ━❖\n\nTitle: ${title}\nAuthor: ${author}\n❖━━━━━━━━━━━━❖\n\n${lyrics}\n\n❖━━━━━━━━━━━━❖`, event.threadID, event.messageID)
}
