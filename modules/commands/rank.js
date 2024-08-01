const fs = global.nodemodule["fs-extra"];
module.exports.config = {
	name: "rank",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "Rank is accompanied by a random image ><, download the image yourself when loading this rank",
	commandCategory: "TIỆN ÍCH",
	cooldowns: 30,
	dependencies: {
		"fs-extra": "",
		"path": "",
		"jimp": "",
		"node-superfetch": "",
		"canvas": ""
	}
};

module.exports.onLoad = async function () {
	const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
	const path = resolve(__dirname, "cache" );
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
	if (!existsSync(resolve(__dirname, 'cache', 'rankcard1.png'))) await downloadFile ("https://i.imgur.com/ciPIvFk.png", resolve(__dirname, 'cache', 'rankcard1.png'));
  if (!existsSync(resolve(__dirname, 'cache', 'rankcard2.png'))) await downloadFile("https://i.imgur.com/8ghhGmd.png", resolve(__dirname, 'cache', 'rankcard2.png'));
  if (!existsSync(resolve(__dirname, 'cache', 'rankcard3.png'))) await downloadFile("https://i.imgur.com/y9To0p6.png", resolve(__dirname, 'cache', 'rankcard3.png'));
  //muốn thêm ảnh thì cứ làm như trên nhé lên web ibb.co hoặc i.imgur.com để up ảnh rồi lấy đường link add dô như vậy là tự tải ảnh về cache nhé!!!! tối đa 30 ảnh
}

//random color 
function getRandomColor() {
  	var letters = '0123456789ABCDEF';
 	var color = '#';
  	for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


module.exports.makeRankCard = async (data) => {    
    /*
    * 
    * Remake from Canvacord
    * 
    */

    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
	const Canvas = global.nodemodule["canvas"];
	const request = global.nodemodule["node-superfetch"];
	const __root = path.resolve(__dirname, "cache");
  const __roots = path.resolve(__dirname, "cache/rankup");
	const PI = Math.PI;

    const { id, name, rank, level, expCurrent, expNextLevel } = data;

	Canvas.registerFont(__root + "/regular-font.ttf", {
		family: "Manrope",
		weight: "regular",
		style: "normal"
	});
	Canvas.registerFont(__root + "/bold-font.ttf", {
		family: "Manrope",
		weight: "bold",
		style: "normal"
	});
//random rankcard by Super Cute ,png by Ngo Duc Hien(please keep credit)
	const pathCustom = path.resolve(__dirname, "cache", "customrank");
	var customDir = fs.readdirSync(pathCustom);
	let random = Math.floor(Math.random() * 26) + 1;
	    var dirImages = __root + "/rankcard" + random + ".png";
      var dirImage = __roots + "/ranksup" + random + ".png";


	customDir = customDir.map(item => item.replace(/\.png/g, ""));

	for (singleLimit of customDir) {
		var limitRate = false;
		const split = singleLimit.split(/-/g);
		var min = parseInt(split[0]), max = parseInt((split[1]) ? split[1] : min);
	
		for (; min <= max; min++) {
			if (level == min) {
				limitRate = true;
				break;
			}
		}

		if (limitRate == true) {
			dirImage = pathCustom + `/${singleLimit}.png`;
			break;
		}
	}

	let rankCard = await Canvas.loadImage(dirImage);
	const pathImg = __root + `/rank_${id}.png`;
	
	var expWidth = (expCurrent * 615) / expNextLevel;
	if (expWidth > 615 - 18.5) expWidth = 615 - 18.5;

  let avatar = await request.get(`https://graph.facebook.com/${id}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  
	/*
 
 let avatar = await request.get(`https://graph.facebook.com/${id}/picture?height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
 
*/
	avatar = await this.circle(avatar.body);

	const canvas = Canvas.createCanvas(934, 282);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 45, 50, 180, 180);

	ctx.font = `bold 36px Manrope`;
	ctx.fillStyle = getRandomColor();
	ctx.textAlign = "start";
	ctx.fillText(name, 270, 164);
	ctx.font = `36px Manrope`;
	ctx.fillStyle = getRandomColor();
	ctx.textAlign = "center";

	ctx.font = `bold 32px Manrope`;
	ctx.fillStyle = getRandomColor();
	ctx.textAlign = "end";
	ctx.fillText(level, 934 - 55, 82);
	ctx.fillStyle = getRandomColor();
	ctx.fillText("Lv.", 934 - 55 - ctx.measureText(level).width - 10, 82);

	ctx.font = `bold 32px Manrope`;
	ctx.fillStyle = getRandomColor();
	ctx.textAlign = "end";
	ctx.fillText(rank, 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 25, 82);
	ctx.fillStyle = getRandomColor();
	ctx.fillText("#", 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 16 - ctx.measureText(rank).width - 16, 82);

	ctx.font = `bold 26px Manrope`;
	ctx.fillStyle = getRandomColor();
	ctx.textAlign = "start";
	ctx.fillText("/ " + expNextLevel, 710 + ctx.measureText(expCurrent).width + 10, 164);
	ctx.fillStyle = getRandomColor();
	ctx.fillText(expCurrent, 710, 164);

	ctx.beginPath();
	ctx.fillStyle = getRandomColor();
	ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * PI, 0.5 * PI, true);
	ctx.fill();
	ctx.fillRect(257 + 18.5, 147.5 + 36.25, expWidth, 37.5);
	ctx.arc(257 + 18.5 + expWidth, 147.5 + 18.5 + 36.25, 18.75, 1.5 * PI, 0.5 * PI, false);
	ctx.fill();

	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
	return pathImg;
}

module.exports.circle = async (image) => {
    const jimp = global.nodemodule["jimp"];
	image = await jimp.read(image);
	image.circle();
	return await image.getBufferAsync("image/png");
}

module.exports.expToLevel = (point) => {
	if (point < 0) return 0;
	return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
}

module.exports.levelToExp = (level) => {
	if (level <= 0) return 0;
	return 3 * level * (level - 1);
}

module.exports.getInfo = async (uid, Currencies) => {
	let point = (await Currencies.getData(uid)).exp;
	const level = this.expToLevel(point);
	const expCurrent = point - this.levelToExp(level);
	const expNextLevel = this.levelToExp(level + 1) - this.levelToExp(level);
	return { level, expCurrent, expNextLevel };
}

module.exports.run = async ({ uid, event, api, args, Currencies, Users, Threads }) => {
	const fs = global.nodemodule["fs-extra"];
	let dataAll = (await Currencies.getAll(["userID", "exp"]));
	const mention = Object.keys(event.mentions);
  const name = global.data.userName.get(event.senderID) || await Users.getNameUser

	dataAll.sort((a, b) => {
		if (a.exp > b.exp) return -1;
		if (a.exp < b.exp) return 1;
	});
  

	if (args.length == 0) {

    const listUserID = event.participantIDs
    var id = listUserID
      exp = [];
    for(const idUser of listUserID) {
      const countMess = await Currencies.getData(event.senderID) || await Currencies.getData(id);
      exp.push({"name" : idUser.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
  }
      exp.sort(function (a, b) { return b.exp - a.exp });
      const pek = exp.findIndex(info => parseInt(info.uid) == parseInt(event.senderID)) + 1; const infoUser = exp[pek- 1];

    
    
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(event.senderID)) + 1;
		const name = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
		if (rank == 0) return api.sendMessage("You are currently not in the database so can't see your rank, please try again in 5 seconds.", event.threadID, event.messageID);
    const Userexp = infoUser.exp;
    var Userrank = infoUser.exp == 200000 ? 'Generals'
    : infoUser.exp > 150000 ? 'Mythical ✩✩✩✩✩✩'
    : infoUser.exp > 120000 ? 'Mythical ✩✩✩✩✩'
    : infoUser.exp > 100000 ? 'Mythical ✩✩✩✩'
    : infoUser.exp > 90000 ? 'Mythical ✩✩✩'
    : infoUser.exp > 80000 ? 'Mythical ✩✩'
    : infoUser.exp > 70000 ? 'Mythical ✩'
    : infoUser.exp > 60000 ? 'Legendary V'
    : infoUser.exp > 50000 ? 'Legendary IV'
    : infoUser.exp > 45000 ? 'Legendary III'
    : infoUser.exp > 40000 ? 'Legendary II'
    : infoUser.exp > 35000 ? 'Legendary I'
    : infoUser.exp > 35000 ? 'Grand-Master V'
    : infoUser.exp > 29000 ? 'Grand-Master IV'
    : infoUser.exp > 25000 ? 'Grand-Master III'
    : infoUser.exp > 21000 ? 'Grand-Master II'
    : infoUser.exp > 19000 ? 'Grand-Master I'
    : infoUser.exp > 16000 ? 'Master V'
    : infoUser.exp > 13000 ? 'Master IV'
    : infoUser.exp > 11000 ? 'Master III'
    : infoUser.exp > 10000 ? 'Master II'
    : infoUser.exp > 9000 ? 'Master I'
    : infoUser.exp > 8000 ? 'Elite V'
    : infoUser.exp > 6100 ? 'Elite IV'
    : infoUser.exp > 5900 ? 'Elite III'
    : infoUser.exp > 5700 ? 'Elite II'
    : infoUser.exp > 5200 ? 'Elite I'
    : infoUser.exp > 5000 ? 'Diamond V'
    : infoUser.exp > 4800 ? 'Diamond IV'
    : infoUser.exp > 4500 ? 'Diamond III'
    : infoUser.exp > 4000 ? 'Diamond II'
    : infoUser.exp > 3800 ? 'Diamond I'
    : infoUser.exp > 3500 ? 'Platinum IV'
    : infoUser.exp > 3200 ? 'Platinum III'
    : infoUser.exp > 3000 ? 'Platinum II'
    : infoUser.exp > 2900 ? 'Platinum I'
    : infoUser.exp > 2500 ? 'Gold IV'
    : infoUser.exp > 2300 ? 'Gold III'
    : infoUser.exp > 2000 ? 'Gold II'
    : infoUser.exp > 1500 ? 'Gold I'
    : infoUser.exp > 1200 ? 'Silver III'
    : infoUser.exp > 1000 ? 'Silver II'
    : infoUser.exp > 900 ? 'Silver I'
    : infoUser.exp > 500 ? 'Bronze III'
    : infoUser.exp > 100 ? 'Bronze II'
    : 'Bronze I';

//=================================================
//=================================================




		const point = await this.getInfo(event.senderID, Currencies);
		const timeStart = Date.now();
		let pathRankCard = await this.makeRankCard({ id: event.senderID, name, rank, ...point })
		return api.sendMessage({body: `===== RANK INFO =====\n\n► Name: ${name}\n► Top: ${rank} 🏆\n► Level: ${point.level}\n► Exp: ${Userexp}\n► Rank: ${Userrank}\n\n=====================`, attachment: fs.createReadStream(pathRankCard, {'highWaterMark': 128 * 1024}) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length == 1) {
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(mention[0])) + 1;
		const name = global.data.userName.get(mention[0]) || await Users.getNameUser(mention[0]);
		if (rank == 0) return api.sendMessage("You are currently not in the database so can't see your rank, please try again in 5 seconds.", event.threadID, event.messageID);
		let point = await this.getInfo(mention[0], Currencies);
		let pathRankCard = await this.makeRankCard({ id: mention[0], name, rank, ...point })
		return api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length > 1) {
		for (const userID of mention) {
			const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(userID)) + 1;
			const name = global.data.userName.get(userID) || await Users.getNameUser(userID);
			if (rank == 0) return api.sendMessage("You are currently not in the database so can't see your rank, please try again in 5 seconds.", event.threadID, event.messageID);
			let point = await this.getInfo(userID, Currencies);
			let pathRankCard = await this.makeRankCard({ id: userID, name, rank, ...point })
			return api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
		}
	}
}