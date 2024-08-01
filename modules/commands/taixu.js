module.exports.config = {
    name: "taixiu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "tai/xiu",
    commandCategory: "Game",
    usages: "< tai/xiu + amount >",
    cooldowns: 15
};
module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const { senderID, messageID, threadID } = event;
    const axios = require('axios');
    const fs = require("fs-extra");
    const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;
    if (!args[0]) return api.sendMessage("You have to bet UP or UP...", threadID, messageID);
    const choose = args[0]
    if (choose.toLowerCase() != 'tai' && choose.toLowerCase() != 'xiu') return api.sendMessage("Bet tai or xiu ONLY", threadID, messageID)
    const money = args[1]
    if (money < 50 || isNaN(money)) return api.sendMessage("Your bet level is not suitable or less than 50$", threadID, messageID);
    if (moneyUser < money) return api.sendMessage(`Your current balance is not enough ${money}$ to play`, threadID, messageID);
    try {
        const res = (await axios.get(`https://api-ThanhAli.thanhbaybi.repl.co/taixiu`)).data
        const image = [];
        const result = res.result;
        if(result == false) result = '3 sides of the same type';
        for (let i in res.images) {
            var path = __dirname + `/cache/${i}.png`;
            var img = (await axios.get(`${res.images[i]}`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(path, Buffer.from(img, "utf-8"));
            image.push(fs.createReadStream(path));
        }
        if (choose.toLowerCase() == result) {
            await Currencies.increaseMoney(senderID, parseInt(money * 1));
            api.sendMessage({ body: `→ Result: ${result}\n→ You won and got: ${money*1}$\n→ Current balance: ${[moneyUser + money*1]}$`, attachment: image }, threadID, messageID);
        } else {
            await Currencies.decreaseMoney(senderID, parseInt(money));
            api.sendMessage({ body: `→ Result: ${result}\n→ You lost and lost: ${money*1}$\n→ Current balance: ${[moneyUser - money*1]}$`, attachment: image}, threadID, messageID);
        }
        for(var i = 0; i < image.length; i++) {
            fs.unlinkSync(__dirname + `/cache/${i}.png`);
        }
    } catch(e) {
        console.log(e);
        return api.sendMessage('An error occurred while executing the command, please try again later...', threadID, messageID);
    }
}