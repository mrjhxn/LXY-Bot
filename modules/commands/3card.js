module.exports.config = {
	name: "3card",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "3card game for groups with bets (with pic of cards)",
	commandCategory: "Game",
	usages: "[create/start/join/info/leave]",
	cooldowns: 1
};


const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "diamonds", "clubs"];
const deck = [];

for (let i = 0 ; i < values.length; i++) {
  for (let x = 0; x < suits.length; x++) {
    let weight = parseInt(values[i]);
    if (["J", "Q", "K"].includes(values[i])) weight = 10;
    else if (values[i] == "A") weight = 11;
    const card = {
      Value: values[i],
      Suit: suits[x],
      Weight: weight,
      Icon: suits[x] == "spades" ? "♠️" : suits[x] == "hearts" ? "♥️" : suits[x] == "diamonds" ? "♦️" : "♣️"
		};
    deck.push(card);
  }
}

function createDeck() {
  // for 1000 turns
  // switch the values of two random cards
  const deckShuffel = [...deck];
  for (let i = 0; i < 1000; i++) {
    const location1 = Math.floor((Math.random() * deckShuffel.length));
    const location2 = Math.floor((Math.random() * deckShuffel.length));
    const tmp = deckShuffel[location1];
    deckShuffel[location1] = deckShuffel[location2];
    deckShuffel[location2] = tmp;
  }
  return deckShuffel;
}

function getLinkCard(Value, Suit) {
  return `https://raw.githubusercontent.com/ntkhang03/poker-cards/main/cards/${Value == "J" ? "jack" : Value == "Q" ? "queen" : Value == "K" ? "king" : Value == "A" ? "ace" : Value}_of_${Suit}.png`;
}

async function drawCard(cards) {
  // 500 x 726
  const Canvas = require("canvas");
	const canvas = Canvas.createCanvas(500*cards.length, 726);
  const ctx = canvas.getContext("2d");
  let x = 0;
  for (const card of cards) {
    const loadImgCard = await Canvas.loadImage(card);
    ctx.drawImage(loadImgCard, x, 0);
    x += 500;
  }
  return canvas.toBuffer();
}

module.exports.handleEvent = async ({ Currencies, event, api, Users }) => {
  const Canvas = require("canvas");
  const fs = require ("fs-extra");
  
	const { senderID, threadID, body, messageID } = event;
  
	if (typeof body == "undefined") return;
	if (!global.moduleData.baicao) global.moduleData.baicao = new Map();
	if (!global.moduleData.baicao.has(threadID)) return;
	var values = global.moduleData.baicao.get(threadID);
	if (values.start != 1) return;
  
	const deckShuffel = values.deckShuffel; // Bộ bài

	if (body.indexOf("distribute the cards") == 0) {
		if (values.chiabai == 1) return;
		for (const key in values.player) {
			const card1 = deckShuffel.shift();
			const card2 = deckShuffel.shift();
			const card3 = deckShuffel.shift();
			var tong = (card1.Weight + card2.Weight + card3.Weight);
			if (tong >= 20) tong -= 20;
			if (tong >= 10) tong -= 10;
			values.player[key].card1 = card1;
			values.player[key].card2 = card2;
			values.player[key].card3 = card3;
			values.player[key].tong = tong;
			
			const linkCards = [];
			
			for (let i = 1; i < 4; i++) {
			  const Card = values.player[key]["card" + i];
			  linkCards.push(getLinkCard(Card.Value, Card.Suit));
			}
			
			const pathSave = __dirname + `/cache/card${values.player[key].id}.png`;
			fs.writeFileSync(pathSave, await drawCard(linkCards));
			
			api.sendMessage({
			  body: `Your post: ${card1.Value}${card1.Icon} | ${card2.Value}${card2.Icon} | ${card3.Value}${card3.Icon} \n\nYour total post: ${tong}`,
			  attachment: fs.createReadStream(pathSave)
			}, values.player[key].id, (error, info) => {
				if (error) return api.sendMessage(`Unable to distribute cards to users: ${values.player[key].id}`, threadID);
				fs.unlinkSync(pathSave);
			});
				
		}
		values.chiabai = 1;
		global.moduleData.baicao.set(threadID, values);
		return api.sendMessage("Post has been shared successfully! Everyone has 2 turns, if you don't see the post, please check the waiting message", threadID);
	}

	if (body.indexOf("change post") == 0) {
		if (values.chiabai != 1) return;
		var player = values.player.find(item => item.id == senderID);
		if (player.doibai == 0) return api.sendMessage("You've used up all of your swaps", threadID, messageID);
		if (player.ready == true) return api.sendMessage("You are ready, you cannot exchange cards!", threadID, messageID);
		const card = ["card1","card2","card3"];
		player[card[(Math.floor(Math.random() * card.length))]] = deckShuffel.shift();
		player.tong = (player.card1.Weight + player.card2.Weight + player.card3.Weight);
		if (player.tong >= 20) player.tong -= 20;
		if (player.tong >= 10) player.tong -= 10;
		player.doibai -= 1;
		global.moduleData.baicao.set(values);
		
		const linkCards = [];
			
		for (let i = 1; i < 4; i++) {
		  const Card = player["card" + i];
		  linkCards.push(getLinkCard(Card.Value, Card.Suit));
		}
		
	  const pathSave = __dirname + `/cache/card${player.id}.png`;
		fs.writeFileSync(pathSave, await drawCard(linkCards));
	  
		return api.sendMessage({
		  body: `Your post after being changed: ${player.card1.Value}${player.card1.Icon} | ${player.card2.Value}${player.card2.Icon} | ${player.card3.Value}${player.card3.Icon}\n\nYour total post: ${player.tong}`,
		  attachment: fs.createReadStream(pathSave)
    }, player.id, (error, info) => {
			if (error) return api.sendMessage(`Can't change post for user: ${player.id}`, threadID);
			fs.unlinkSync(pathSave);
		});
	}

	if (body.indexOf("ready") == 0) {
		if (values.chiabai != 1) return;
		var player = values.player.find(item => item.id == senderID);
		if (player.ready == true) return;
		const name = await Users.getNameUser(player.id);
		values.ready += 1;
		player.ready = true;
		if (values.player.length == values.ready) {
			const player = values.player;
			player.sort(function (a, b) { return b.tong - a.tong });

			var ranking = [], num = 1;

			for (const info of player) {
				const name = await Users.getNameUser(info.id);
				ranking.push(`${num++} • ${name} với ${info.card1.Value}${info.card1.Icon} | ${info.card2.Value}${info.card2.Icon} | ${info.card3.Value}${info.card3.Icon} => ${info.tong} nút\n`);
			}
			
			try {
				await Currencies.increaseMoney(player[0].id, values.rateBet * player.length);
			} catch (e) {};
			global.moduleData.baicao.delete(threadID);
			
			return api.sendMessage(`► Result:\n\n ${ranking.join("\n")}\n\nOnly the top player receives ${values.rateBet * player.length}$`, threadID);
		}
		else return api.sendMessage(`Player: ${name} Ready to flip cards, the rest: ${values.player.length - values.ready} the player has not turned the cards`, event.threadID);
	}
	
	if (body.indexOf("nonready") == 0) {
		const data = values.player.filter(item => item.ready == false);
		var msg = [];

		for (const info of data) {
			const name = global.data.userName.get(info.id) || await Users.getNameUser(info.id);
			msg.push(name);
		}
		if (msg.length != 0) return api.sendMessage("Players who are not ready include: " + msg.join(", "), threadID);
		else return;
	}
}

module.exports.run = async ({ api, event, args, Currencies }) => {
	var { senderID, threadID, messageID } = event;
  if (args.length == 0) return api.sendMessage(`====[♣️ 3 Cards ♣️]====\n» HDSD: ${global.config.PREFIX}3cards to see how to play`, threadID, messageID);
	threadID = String(threadID);
	senderID = String(senderID);
	
	if (!global.moduleData.baicao) global.moduleData.baicao = new Map();
	var values = global.moduleData.baicao.get(threadID) || {};
  var data = await Currencies.getData(event.senderID);
  var money = data.money     
    
	switch (args[0]) {
		case "create":
		case "-c": {
			if (global.moduleData.baicao.has(threadID)) return api.sendMessage("Currently, this group has a 3-cards table that is open", threadID, messageID);
			if (!args[1] || isNaN(args[1]) || parseInt(args[1]) <= 1) return api.sendMessage("► Your bet is not a number or your bet is less 1$", threadID, messageID);
      if (money < args[1]) return api.sendMessage(`► You do not have enough money to be able to initialize the table with the price: ${args[1]}$`,event.threadID,event.messageID);
      await Currencies.decreaseMoney(event.senderID, Number(args[1]));
			global.moduleData.baicao.set(event.threadID, { "author": senderID, "start": 0, "chiabai": 0, "ready": 0, player: [ { "id": senderID, "card1": 0, "card2": 0, "card3": 0, "doibai": 2, "ready": false } ], rateBet: Number(args[1])});
			return api.sendMessage(`► Table 3 plants with price ${args[1]}$ Your account has been created successfully!, to join please enter 3card join\n► Creators do not need to join`, event.threadID, event.messageID);
		}
		
		case "join":
		case "-j": {
			if (!values) return api.sendMessage("There are currently no 3 tree tables, you can create using baicao create", threadID, messageID);
			if (values.start == 1) return api.sendMessage("Currently the table of 3 trees has been started", threadID, messageID);
			if (money < values.rateBet) return api.sendMessage(`► You do not have enough money to join the table with price: ${values.rateBet}$`,event.threadID,event.messageID)
			if (values.player.find(item => item.id == senderID)) return api.sendMessage("You have joined this 3 cards table!", threadID, messageID);
			values.player.push({ "id": senderID, "card1": 0, "card2": 0, "card3": 0, "tong": 0, "doibai": 2, "ready": false });
			await Currencies.decreaseMoney(event.senderID, values.rateBet);
			global.moduleData.baicao.set(threadID, values);
			return api.sendMessage("You have successfully joined!", threadID, messageID);
		}

		case "leave":
		case "-l": {
			if (typeof values.player == "undefined") return api.sendMessage("There are currently no 3 tree tables, you can create using 3cay create", threadID, messageID);
			if (!values.player.some(item => item.id == senderID)) return api.sendMessage("You have not joined the 3 cards table in this group!", threadID, messageID);
			if (values.start == 1) return api.sendMessage("Currently the table of 3 cards has been started", threadID, messageID);
			if (values.author == senderID) {
				global.moduleData.baicao.delete(threadID);
				api.sendMessage("Author has left the table, which means the table will be disbanded!", threadID, messageID);
			}
			else {
				values.player.splice(values.player.findIndex(item => item.id === senderID), 1);
				api.sendMessage("You have left this 3 cards table!", threadID, messageID);
				global.moduleData.baicao.set(threadID, values);
			}
			return;
		}

		case "start":
		case "-s": {
			if (!values) return api.sendMessage("There are currently no 3 cards tables, you can create using 3cards create", threadID, messageID);
			if (values.author !== senderID) return api.sendMessage("You don't have to be the host to get started", threadID, messageID);
			if (values.player.length <= 1) return api.sendMessage("Currently your table has no players participating, you can invite that person to join by asking another player to enter 3cards join", threadID, messageID);
			if (values.start == 1) return api.sendMessage("The table is now started by the owner", threadID, messageID);
			values.deckShuffel = createDeck(); // Bộ bài
			values.start = 1;
			return api.sendMessage("Your 3 cards table is started", threadID, messageID);
		}

		case "info":
		case "-i": {
			if (typeof values.player == "undefined") return api.sendMessage("There are currently no 3 cards tables, you can create using 3cards create", threadID, messageID);
			return api.sendMessage(
				"=== 3 cards ===" +
				"\n- Author Table: " + values.author +
				"\n- Total number of players: " + values.player.length + " Person"
			, threadID, messageID);
		}
    case "huongdan":
		  case "-h": {
     if (typeof values.player == "undefined") return api.sendMessage("► Instructions for using 3 cards\n\n/3cards create 100(100 is the bet amount) : to create a table\n/3cards join : to join the game\n/3cards start : to start the game\ndistribute the cards : for table creators \nready : to lower cards\nchange post : to change the post if the post is bad(Only 3 in turn)\n/3card info : to see table information \n/3cards leave : to leave the table ", threadID, messageID);
      }

		default: {
			return global.utils.throwError(this.config.name, threadID, messageID);
		}
	}
}