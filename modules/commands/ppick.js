module.exports.config = {
    name: `ppick`,
    version: `1.0.0`,
    hasPermssion: 0,
    credits: `D-Jukie`,
    description: `play pick bet money here are the list:scissors, rock, paper)`,
    commandCategory: `Game`,
    usages: `[scissors/rock/paper]`,
    cooldowns: 15
};
module.exports.run = async function({ api, event, args, Users, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const money = (await Currencies.getData(senderID)).money;
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];

    const listIMG = ['https://i.imgur.com/1uBAGlO.jpg', 'https://i.imgur.com/EOZx1tL.jpg', 'https://i.imgur.com/2WSbVaK.jpg'];
    const listItem = ['scissors', 'rock', 'paper'];

    var bot = listItem[Math.floor(Math.random() * listItem.length)];

    var user = args[0];
    var coins = args[1];
    if(!user) return api.sendMessage('[𝐌𝐎𝐍𝐄𝐘 💸] Missing data!', threadID, messageID);
    if(listItem.includes(user.toLowerCase()) == false) return api.sendMessage('[𝐌𝐎𝐍𝐄𝐘 💸] Invalid selection', threadID, messageID);

    var fu = listItem.findIndex(i => i == user);
    var fb = listItem.findIndex(i => i == bot);
    var a = [fu, fb];
    
    if (args[1] < 1000 || isNaN(args[1])) return api.sendMessage(`[𝐌𝐎𝐍𝐄𝐘 💸] Your bet level does not match or is below 1000$`, threadID, messageID);
    if (money < coins) return api.sendMessage(`[𝐌𝐎𝐍𝐄𝐘 💸] You are not enough ${coins}$ to play`, threadID, messageID);

    var compare = function (choice1, choice2){
        var out = [`✌️`, `👊`, `✋`];
        var checkwin = []
        var msgWin = `\n 🎎 Person: ${out[fu]} 𝐕𝐒 🤖 𝐁𝐨𝐭: ${out[fb]}\n[𝐌𝐎𝐍𝐄𝐘 💸] Coins: ${coins}$`
        var msgLose = `\n 🎎 Person: ${out[fu]} 𝐕𝐒 🤖 𝐁𝐨𝐭: ${out[fb]}\n[𝐌𝐎𝐍𝐄𝐘 💸] Apart from: ${coins}$`
        if(choice1 == choice2) {
            checkwin.push(`[It's over 🐸] - Draw\n 🎎 User: ${out[fu]}\n[𝐕𝐒] 🤖 𝐁𝐨𝐭: ${out[fb]}`)
            checkwin.push(3)
            return checkwin
        }
        if(choice1 == 'rock') {
            if(choice2 == 'scissors') {
                checkwin.push(`[It's over 🐸] - Win ${msgWin}`)
                checkwin.push(0)
                return checkwin
            }
            if(choice2 == 'paper') {
                checkwin.push(`[It's over 🐸] - Lose ${msgLose}`)
                checkwin.push(1)
                return checkwin
            }
        }
        if(choice1 == 'paper') {
            if(choice2 == 'rock') {
                checkwin.push(`[It's over 🐸] - Win ${msgWin}`)
                checkwin.push(0)
                return checkwin
            }
            if(choice2 == 'scissors') {
                checkwin.push(`[It's over 🐸] - Lose ${msgLose}`)
                checkwin.push(1)
                return checkwin
            }
        }
        if(choice1 == 'scissors') {
            if(choice2 == 'paper') {
                checkwin.push(`[It's over 🐸] - Win ${msgWin}`)
                checkwin.push(0)
                return checkwin
            }
            if(choice2 == 'rock') {
                checkwin.push(`[It's over 🐸] - Lose ${msgLose}`)
                checkwin.push(1)
                return checkwin
            }
        }
    };
    async function image(list) {
        var images = [];
        let download = (await axios.get(`${list[fb]}`, { responseType: "arraybuffer" } )).data; 
        let download_2 = (await axios.get(`${list[fu]}`, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/cache/avt${fb}.png`, Buffer.from(download, "utf-8"));
        fs.writeFileSync( __dirname + `/cache/avt${fu}.png`, Buffer.from(download_2, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/cache/avt${fu}.png`));
        images.push(fs.createReadStream(__dirname + `/cache/avt${fb}.png`));
        return images
    }
    async function moneyU(type) {
        if(type == 3) return
        if(type == 0)  return Currencies.setData(senderID, options = {money: money + parseInt(coins)});
        if(type == 1) return Currencies.setData(senderID, options = {money: money - parseInt(coins)});
    }
    await moneyU(compare(user, bot)[1])
    var msg = {body: compare(user, bot)[0], attachment: await image(listIMG)}
    return api.sendMessage(msg, threadID, messageID);
}