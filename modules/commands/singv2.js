
module.exports.config = {
	name: "singv2",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Horizon ",
	description: "Play music via YouTube link, SoundCloud or search keyword",
	commandCategory: "Dành cho người dùng",
	usages: "sing [Text]",
	cooldowns: 10,
	envConfig: {
		"YOUTUBE_API": "AIzaSyDAiwFBGnV6wbOe3UPY8h61vRzxSgxRa_g",
		"SOUNDCLOUD_API": "M4TSyS6eV0AcMynXkA3qQASGcOFQTWub"
	}
};
const keyapi = "AIzaSyAPOLxogXUimECrUGr-2oFLoHk7B4XyAOY";
module.exports.handleReply = async function({ api, event, handleReply }) {
	const ytdl = require("ytdl-core");
	if (isNaN(event.body)) return api.sendMessage("Please Enter 1 Number ! , Please Click Again !",event.threadID,event.messageID);
	const { createReadStream, createWriteStream, unlinkSync, statSync,readFileSync,writeFileSync } = require("fs-extra");
	 const { join } = require("path");
	const axios = require("axios"); 
	//var { data:Res } = await axios.get("http://localhost:1337/api/f-apis/3");
		// var x = await Res.data.attributes.Api;
	let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${handleReply.link[event.body - 1]}&key=${keyapi}`)).data;
	let title = datac.items[0].snippet.title;
    api.sendMessage('► 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗡𝗚 𝗠𝗨𝗦𝗜𝗖!\n\n🎶 Sᴏɴɢ Tɪᴛʟᴇ: '+title+'\n\nPlease Wait <3',event.threadID);
	try {   
		await ytdl(handleReply.link[event.body - 1],{ filter: 'audioonly'})
			.pipe(createWriteStream(__dirname + `/cache/singv2/singv2.m4a`))
			.on("close", () => {
				if (statSync(__dirname + `/cache/singv2/singv2.m4a`).size > 26000000) return api.sendMessage('Can`t send file s too large!', event.threadID, () => unlinkSync(__dirname + `/cache/singv2/singv2.m4a`), event.messageID);
				else return api.sendMessage({body: `► 𝗡𝗢𝗪 𝗣𝗟𝗔𝗬𝗜𝗡𝗚!\n\n🎶 Sᴏɴɢ Tɪᴛʟᴇ: ${title} \n\nHappy Listening!`,attachment: createReadStream(__dirname + `/cache/singv2/singv2.m4a`)}, event.threadID, event.messageID);
			})
			.on("error", (error) => api.sendMessage(`Error : \n${error}`, event.threadID, event.messageID));
		}
	catch (e) {
		console.log(e)
		api.sendMessage("Your request could not be processed!", event.threadID, event.messageID);
	}
	return api.unsendMessage(handleReply.messageID);
};

module.exports.run = async function({ api, event, args,help }) {
		const { createReadStream, createWriteStream, unlinkSync, statSync,readFileSync,writeFileSync } = require("fs-extra");
	 const { join } = require("path");
	 const axios = require("axios");
	//var { data:Res } = await axios.get("http://localhost:1337/api/f-apis/3");
		//var x = await Res.data.attributes.Api;
	const ytdl = require("ytdl-core");
	const YouTubeAPI = require("simple-youtube-api");
	const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
	
	if (args.length == 0 || !args) return api.sendMessage('Search cannot be left blank!', event.threadID, event.messageID);
	const keywordSearch = args.join(" ");
	const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
	const urlValid = videoPattern.test(args[0]);
	
	if (urlValid) {
		try { 
			var id = args[0].split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            (id[2] !== undefined) ? id = id[2].split(/[^0-9a-z_\-]/i)[0] : id = id[0];
			ytdl(args[0])
				.pipe(createWriteStream(__dirname + `/cache/singv2.m4a`))
				.on("close", () => {
					if (statSync(__dirname + `/cache/singv2.m4a`).size > 26214400) return api.sendMessage('This Post Is Long We Can`t Send , Change your choice !', event.threadID, () => unlinkSync(__dirname + `/cache/singv2/singv2.m4a`), event.messageID);
					else{
						 api.sendMessage({attachment: createReadStream(__dirname + `/cache/singv2/singv2.m4a`)}, event.threadID, event.messageID)
							thisThread.listmusic.push(id);
								writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
					}
				})
				.on("error", (error) => api.sendMessage(`There was a problem processing the request :V, error: \n${error}`, event.threadID, event.messageID));
		}
		catch (e) {
			console.log(e);
			api.sendMessage("Your request could not be processed!", event.threadID, event.messageID);
		}
	}
	else {
		try {
			var link = [], msg = "", num = 0;
			var results = await youtube.searchVideos(keywordSearch,7);	
			for (let value of results) {
				if (typeof value.id == 'undefined') return;
				link.push(value.id);
				 var linkd = "https://www.youtube.com/watch?v=" + value.id;
				 let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
				 let gettime = datab.items[0].contentDetails.duration;
				 let time = (gettime.slice(2));
				 let time2 = ""
				 if (time.includes('H')) time2 = time.replace("H", " Hours ")
				 var haha = time.replace("M", " Mins ");
				 var haha2 = haha.replace("S", " Secs ")
				 let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
				 let channel = datac.items[0].snippet.channelTitle;
				msg += (`${num+=1} • ${value.title}\n► Time : ${haha2}\n► Channel : ${channel}\n❖━━━━━━━━━━━━❖\n`);
			}
			return api.sendMessage(`► 𝗦𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗦𝘂𝗰𝗰𝗲𝘀𝘀!, Have ${link.length} Video!\n\n❖━━━━━━━━━━━━❖\n${msg}► Please Reply to Bot Messages By Sequence Number`, event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, link: link }), event.messageID);
		}
		catch (error) {
			api.sendMessage("The request could not be processed due to an error: " + error.message, event.threadID, event.messageID);
		}
	}
}

// vì đang bận project ma sói nên không kịp code kho nhạc + code theo cách riêng của horizon nên lấy tạm cái này đi =))