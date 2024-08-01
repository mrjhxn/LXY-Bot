module.exports.config = {
	name: "rangkings",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "rangkings",
	commandCategory: "word",
	usages: "rangkings",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = global.nodemodule['axios'];

  return api.sendMessage(`≡≡≡ 𝗦𝗘𝗥𝗩𝗘𝗥 𝗥𝗔𝗡𝗚𝗞𝗜𝗡𝗚𝗦 ≡≡≡

≡ 200000 exp - Generals ✡
≡ 150000 exp - Mythical ✩✩✩✩✩✩
≡ 120000 exp - Mythical ✩✩✩✩✩
≡ 100000 exp - Mythical ✩✩✩✩
≡ 90000 exp - Mythical ✩✩✩
≡ 80000 exp - Mythical ✩✩
≡ 70000 exp - Mythical ✩
≡ 60000 exp - Legendary V
≡ 50000 exp - Legendary IV
≡ 45000 exp - Legendary III
≡ 40000 exp - Legendary II
≡ 35000 exp - Legendary I
≡ 32000 exp - Grand-Master V
≡ 29000 exp - Grand-Master IV
≡ 25000 exp - Grand-Master III
≡ 21000 exp - Grand-Master II
≡ 19000 exp - Grand-Master I
≡ 16000 exp - Master V
≡ 13000 exp - Master IV
≡ 11000 exp - Master III
≡ 10000 exp - Master II
≡ 9000 exp - Master I
≡ 8000 exp - Elite V
≡ 6100 exp - Elite IV
≡ 5900 exp - Elite III
≡ 5700 exp - Elite II
≡ 5200 exp - Elite I
≡ 5000 exp - Diamond V
≡ 4800 exp - Diamond IV
≡ 4500 exp - Diamond III
≡ 4000 exp - Diamond II
≡ 3800 exp - Diamond I
≡ 3500 exp - Platinum IV
≡ 3200 exp - Platinum III
≡ 3000 exp - Platinum II
≡ 2900 exp - Platinum I
≡ 2500 exp - Gold IV
≡ 2300 exp - Gold III
≡ 2000 exp - Gold II
≡ 1500 exp - Gold I
≡ 1200 exp - Silver III
≡ 1000 exp - Silver II
≡ 900 exp - Silver I
≡ 500 exp - Bronze III
≡ 100 exp - Bronze II
≡ Beginner - Bronze I`, event.threadID, event.messageID)
}
