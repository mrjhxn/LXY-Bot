module.exports.config = {
	name: "sarsaya",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Bearz",
	description: "anime hentai random",
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
axios.get('https://apituandz1407.herokuapp.com/api/nude.php').then(res => {
	var image = res.data.data;
  
	let callback = function () {
					api.sendMessage({
						body: `wag kang bastos 😼😼😼\ndeducted: -10500   `,
						attachment: fs.createReadStream(__dirname + `/cache/boobs1.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs1.png`), event.messageID);
				};
				request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs1.png`)).on("close", callback);
				Currencies.setData(event.senderID, options = {money: money - 10500})
			})
	} else return api.sendMessage("Need 10500 dollars to see photos?",event.threadID,event.messageID);
}