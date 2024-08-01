module.exports.config = {
	name: "sarsa3",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Bearz",
	description: "hentai random",
	commandCategory: "Random-img",
	usages: "hentai",
	cooldowns: 60
};

module.exports.run = async ({ api, event, Currencies}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	var money = (await Currencies.getData(event.senderID)).money
	if (money >= 10500) {
axios.get('https://manhict.tech/api/nsfw/masturbation?apikey=Ff7Xm5h9').then(res => {
	var image = res.data.url;
  
	let callback = function () {
					api.sendMessage({
						body: `Hentai 😼😼😼\ndeducted: -10500   `,
						attachment: fs.createReadStream(__dirname + `/cache/boobs1.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs1.png`), event.messageID);
				};
				request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs1.png`)).on("close", callback);
				Currencies.setData(event.senderID, options = {money: money - 10500})
			})
	} else return api.sendMessage("Need 10500 dollars to see photos?",event.threadID,event.messageID);
}