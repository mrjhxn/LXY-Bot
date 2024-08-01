module.exports.config = {
    name: "piratekings",
    version: "1.0.4",
    hasPermssion: 0,
    credits: "MintDaL",
    description: "Game Pirate Kings but played with bots",
    commandCategory: "Games",
    usages: "",
    cooldowns: 0
};

const path = require("path");
const { mkdirSync, writeFileSync, existsSync, createReadStream, readdirSync } = require("fs-extra")
const axios = require("axios")

module.exports.onLoad = async () => {
    const dir = __dirname + `/pirateking/datauser/`;
    const _dir = __dirname + `/pirateking/datauser/`;
    const __dir = __dirname + `/pirateking/cache/`;
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (!existsSync(_dir)) mkdirSync(_dir, { recursive: true });
    if (!existsSync(__dir)) mkdirSync(__dir, { recursive: true });
    return;
}

module.exports.checkPath = function (type, senderID) {
    const pathGame = path.join(__dirname, 'pirateking', 'datauser', `${senderID}.json`);
    const pathGame_1 = require("./pirateking/datauser/" + senderID + '.json');
    if (type == 1) return pathGame
    if (type == 2) return pathGame_1
}

module.exports.image = async function(link) {
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        writeFileSync( __dirname + `/pirateking/cache/pirateking.png`, Buffer.from(download, "utf-8"));
        images.push(createReadStream(__dirname + `/pirateking/cache/pirateking.png`));
    return images
}

module.exports.run = async function ({ api, event, args, Users, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const pathData = path.join(__dirname, 'pirateking', 'datauser', `${senderID}.json`);
    switch (args[0]) {
        case 'register':
        case '-r': {
            const nDate = new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Manila'
            });
            if (!existsSync(pathData)) {
                var obj = {};
                obj.name = (await Users.getData(senderID)).name;
                obj.ID = senderID;
                obj.shield = 3
                obj.coins = 20000
                obj.Island = {};
                obj.Island.level = 1
                obj.Island.coinsLV = 200
                obj.Island.data = {};
                obj.Island.data.tower = 0
                obj.Island.data.tree = 0
                obj.Island.data.boat = 0
                obj.Island.data.pet = 0
                obj.Island.data.chest = 0
                obj.spin = 10
                obj.timeRegister = nDate
                writeFileSync(pathData, JSON.stringify(obj, null, 4));
                return api.sendMessage("Sign up successfully!", threadID, messageID);
            } else return api.sendMessage("Do you have an account.", threadID, messageID);
        }
        case 'spin': {
            if (!existsSync(pathData)) {
                return api.sendMessage("You have not registered the game yet!", threadID, messageID);
            }
            if(this.checkPath(2, senderID).spin == null) return api.sendMessage('Youre a Bugger! you can`t spin anymore.', threadID, messageID);
            else if(this.checkPath(2, senderID).spin == 0) return api.sendMessage('You have run out of spins, please buy more.', threadID, messageID);
            this.checkPath(2, senderID).spin = parseInt(this.checkPath(2, senderID).spin) - 1;
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(this.checkPath(2, senderID), null, 4));
            var items = [`${this.checkPath(2, senderID).Island.level * 1000} coins`, `${this.checkPath(2, senderID).Island.level * 3000} coins`, `${this.checkPath(2, senderID).Island.level * 5000} coins`, 'thieves', 'shield', 'attack', '1 spin', '2 spin', '5 spin'];
            var getItem = items[Math.floor(Math.random() * items.length)];
            var i = this.getSpin(items, getItem, senderID);
            api.sendMessage(`Congratulations on your win: ${getItem}`, threadID, messageID);
            await new Promise(resolve => setTimeout(resolve, 500));
            const data = readdirSync(__dirname + `/pirateking/datauser`);
            if(i == 3) {
                if(data.length < 4) return api.sendMessage(`Need at least 3 players on the server to steal`, threadID, messageID);
                const dem = [];
                for (let i of data) { 
                    if(i != `${senderID}.json`) {
                        dem.push(require(`./pirateking/datauser/${i}`));
                    }
                }
                dem.sort((a, b) => a.coins + b.coins);
                var msg = `The highest amount is: ${dem[0].coins / 2}\n`
                const randomIndex = dem.sort(function() { return .5 - Math.random() });
                for(var i = 0; i < 3; i ++) {
                    msg += `${i+1}. ${randomIndex[i].name} - Island level ${randomIndex[i].Island.level}\n`
                }
                msg += 'Please reply with the option you want to steal'
                return api.sendMessage({body: `\n${msg}`, attachment: await this.image('https://i.imgur.com/EMjJAXT.jpg')}, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "steal",
                        dem,
                        randomIndex
                    })
                }, messageID);
            }
            else if(i == 5) {
                if(data.length < 4) return api.sendMessage(`Requires at least 3 players on the server to attack`, threadID, messageID);
                var msgf = `==== [ ATTACK ] ====\n`, number = 1, p = [];
                for (let i of data) { 
                    if(i != `${senderID}.json`) {
                        var o = require(`./pirateking/datauser/${i}`);
                        p.push(o)
                        msgf += `${number++}. ${o.name} - Island lv ${o.Island.level}\n`
                    }
                }
                return api.sendMessage({body: msgf, attachment: await this.image('https://i.imgur.com/sCXcUat.jpg')}, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "attack",
                        p
                    })
                }, messageID);
            }
            break;
        }
        case 'build':
        case '-b': 
        case 'xaydung': {
            if (!existsSync(pathData)) {
                return api.sendMessage("You have not registered the game yet!", threadID, messageID);
            }
            var a = require(`./pirateking/datauser/${senderID}.json`);
            return api.sendMessage(`In what part of the island do you want to build?\n1. Tower - ${a.Island.coinsLV * (a.Island.data.tower + 1)} coins (${a.Island.data.tower}/50)\n2. Trees - ${a.Island.coinsLV * (a.Island.data.tree + 1)} coins (${a.Island.data.tree}/50)\n3. Boat - ${a.Island.coinsLV * (a.Island.data.boat + 1)} coins (${a.Island.data.boat}/50)\n4. Pets on display - ${a.Island.coinsLV * (a.Island.data.pet + 1)} coins (${a.Island.data.pet}/50)\n5. Treasure Chest - ${a.Island.coinsLV * (a.Island.data.chest + 1)} coins (${a.Island.data.chest}/50)\n💠==== Chards Bot ====💠`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "build"
                })
            }, messageID);
        }
        case 'shop':
        case '-s': {
            if (!existsSync(pathData)) {
                return api.sendMessage("You have not registered the game yet!", threadID, messageID);
            }
            return api.sendMessage(`Please enter options.\n1. Exchange money for game coins!\n2. Exchange game coins for money\n3. Buy spins!`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "shop"
                })
            }, messageID);
        }
        case 'me':
        case 'info':
        case '-i': {
            if (!existsSync(pathData)) {
                return api.sendMessage("You have not registered the game yet!", threadID, messageID);
            }
            var a = require(`./pirateking/datauser/${senderID}.json`);
            return api.sendMessage(`===== [ Pirate King ] =====\n★ You are on the island level ${a.Island.level}\n★ Remaining Spins: ${a.spin}\n★ Shields remaining: ${a.shield}\n★ Coins: ${a.coins}\n★ Island information:\n  ☆ Tower: (${a.Island.data.tower}/50)\n  ☆ Trees: (${a.Island.data.tree}/50)\n  ☆ Boat: (${a.Island.data.boat}/50)\n  ☆ Pets: (${a.Island.data.pet}/50)\n  ☆ Treasure Chest: (${a.Island.data.chest}/50)`, threadID, messageID);
        }
        case 'top': {
            if (!existsSync(pathData)) {
                return api.sendMessage("You have not registered the game yet!", threadID, messageID);
            }
            const data = readdirSync(__dirname + `/pirateking/datauser`);
            if(data.length < 3) return api.sendMessage(`Need at least 3 players on the server to see the top`, threadID, messageID);
            var p = []
            for (let i of data) { 
                var o = require(`./pirateking/datauser/${i}`);
                p.push(o)
                msgf += `${number++}. ${o.name} - Island lv ${o.Island.level}\n`
            }
            p.sort((a, b) => b.Island.level - a.Island.level);
            var msg = '==== [ TOP ] ====\n'
            for(var i = 0; i < 3; i++) {
                msg += `${i+1}. ${p[i].name} with island level ${p[i].Island.level}\n`
            }
            return api.sendMessage(msg, threadID, messageID);
        }
        default: {
            return api.sendMessage({body: `===== [ Pirate Kings ] =====\nPirate Kings is an extremely fun and entertaining pirate-themed game. The goal of this game is that you have to earn a lot of gold to build your island by attacking and plundering from other pirate islands.\n\nGuide to play Pirate Kings:\n» register: To register\n» spin: Spin game\n» build: Build island\n» shop: Convert money - coins, buy spin\n» info: View info about you\n» top: View top level on the server`, attachment: await this.image('https://i.imgur.com/ImCPLP2.png')}, threadID, messageID);
        }
    }
}
module.exports.handleReply = async ({ event, api, Currencies, handleReply, Users }) => {
    const { body, threadID, messageID, senderID } = event;
    switch (handleReply.type) {
        case 'steal': {
            if(body != 1 && body != 2 && body != 3) return
            api.unsendMessage(handleReply.messageID)
            var dem = handleReply.dem
            var dataUser = require(`./pirateking/datauser/${senderID}`);
            var f = dem.findIndex(i => i.ID == (handleReply.randomIndex[parseInt(body) - 1]).ID)
            dataUser.coins = dataUser.coins + dem[parseInt(body) -1].coins / 2;
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(dataUser, null, 4));
            dem[parseInt(body) -1].coins = dem[parseInt(body) -1].coins / 2;
            writeFileSync(this.checkPath(1, (handleReply.randomIndex[parseInt(body) - 1]).ID), JSON.stringify(dem[parseInt(body) -1], null, 4));
            if(f == 0) return api.sendMessage(`Congratulations you have selected the winner with the highest amount!\nYou get ${dem[parseInt(body) -1].coins / 2} coins`, threadID, messageID);
            return api.sendMessage(`The thief of ${dem[parseInt(body) -1].name}!\nYou get ${dem[parseInt(body) -1].coins / 2} coins`, threadID, messageID);
        }
        case 'attack': {
            api.unsendMessage(handleReply.messageID)
            var u = handleReply.p[parseInt(body) - 1]
            return api.sendMessage(`Where on the island do you want to attack?\n1. Tower (${u.Island.data.tower}/50)\n2. Green Tree (${u.Island.data.tree}/50)\n3. Boat (${u.Island.data.boat}/50)\n4. Show pet (${u.Island.data.pet}/50)\n5. Treasure Chest (${u.Island.data.chest}\n💠==== Chards Bot ====💠`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "chosseAttack",
                    p: handleReply.p[parseInt(body) - 1]
                })
            }, messageID);
        }
        case 'build': {
            var a = require(`./pirateking/datauser/${senderID}.json`);
            var l = ['tower', 'tree', 'boat', 'pet', 'chest']
            if(a.coins < a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1)) return api.sendMessage(`You don't have enough coins in the game to build!`, threadID, messageID);
            a.coins = a.coins - a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1);
            await Currencies.decreaseMoney(senderID, a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1));
            api.unsendMessage(handleReply.messageID)
            if(body == 1) {
                if(a.Island.data.tower == 50) return api.sendMessage('This areas level is at its maximum, so it cant be built', threadID, messageID);
                a.Island.data.tower = a.Island.data.tower + 10;
                a.coins - a.Island.coinsLV * (a.Island.data[l[parseInt(body) - 1]] + 1);
                api.sendMessage(`Successful build: ${a.Island.data.tower}/50`, threadID, messageID);
            }
            if(body == 2) {
                if(a.Island.data.tree == 50) return api.sendMessage('This areas level is at its maximum, so it cant be built', threadID, messageID);
                a.Island.data.tree = a.Island.data.tree + 10;
                api.sendMessage(`Successful build: ${a.Island.data.tree}/50`, threadID, messageID);
            }
            if(body == 3) {
                if(a.Island.data.boat == 50) return api.sendMessage('This areas level is at its maximum, so it cant be built', threadID, messageID);
                a.Island.data.boat = a.Island.data.boat + 10;
                api.sendMessage(`Successful build: ${a.Island.data.boat}/50`, threadID, messageID);
            }
            if(body == 4) {
                if(a.Island.data.pet == 50) return api.sendMessage('This areas level is at its maximum, so it cant be built', threadID, messageID);
                a.Island.data.pet = a.Island.data.pet + 10;
                api.sendMessage(`Successful build: ${a.Island.data.pet}/50`, threadID, messageID);
            }
            if(body == 5) {
                if(a.Island.data.chest == 50) return api.sendMessage('This areas level is at its maximum, so it cant be built', threadID, messageID);
                a.Island.data.chest = a.Island.data.chest + 10;
                api.sendMessage(`Successful build: ${a.Island.data.chest}/50`, threadID, messageID);
            }
            if(a.Island.data.tower == 50 && a.Island.data.tree == 50 && a.Island.data.boat == 50 && a.Island.data.pet == 50 && a.Island.data.chest == 50) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                api.sendMessage(`Build on the island you have maxed out!\nYou will be upgraded to LV island ${(a.Island.level) + 1}`, threadID, messageID);
                a.Island.level = a.Island.level + 1;
                a.Island.coinsLV = a.Island.coinsLV + 100;
                a.Island.data.tower = 0;
                a.Island.data.tree = 0;
                a.Island.data.boat = 0;
                a.Island.data.pet = 0;
                a.Island.data.chest = 0;
            }
            return writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
        }
        case 'chosseAttack': {
            var msg
            api.unsendMessage(handleReply.messageID)
            var j = ['tower', 'trees', 'boat', 'pet', 'chest']
            if(handleReply.p.shield != 0) {
                handleReply.p.shield = handleReply.p.shield - 1
                writeFileSync(this.checkPath(1, handleReply.p.ID), JSON.stringify(handleReply.p, null, 4));
                return api.sendMessage('The attack was blocked by the shield!', threadID, messageID);
            }
            if(body == 1) {
                if(handleReply.p.Island.data.tower == 0) return api.sendMessage('Attack failed. The index of this area is 0', threadID, messageID);
                handleReply.p.Island.data.tower = handleReply.p.Island.data.tower - 10
                msg = 'You attacked the tower on the island of ' + `${handleReply.p.name} successful!`
            }
            if(body == 2) {
                if(handleReply.p.Island.data.tree == 0) return api.sendMessage('Attack failed. The index of this area is 0', threadID, messageID);
                handleReply.p.Island.data.tree = handleReply.p.Island.data.tree - 10
                msg = 'You attacked the trees on the island of ' + `${handleReply.p.name} successful!`
            }
            if(body == 3) {
                if(handleReply.p.Island.data.boat == 0) return api.sendMessage('Attack failed. The index of this area is 0', threadID, messageID);
                handleReply.p.Island.data.boat = handleReply.p.Island.data.boat - 10
                msg = 'You attacked the boat on the island of ' + `${handleReply.p.name} successful!`
            }
            if(body == 4) {
                if(handleReply.p.Island.data.pet == 0) return api.sendMessage('Attack failed. The index of this area is 0', threadID, messageID);
                handleReply.p.Island.data.pet = handleReply.p.Island.data.pet - 10
                msg = 'You attacked the pet on the island of ' + `${handleReply.p.name} successful!`
            }
            if(body == 5) {
                if(handleReply.p.Island.data.chest == 0) return api.sendMessage('Attack failed. The index of this area is 0', threadID, messageID);
                handleReply.p.Island.data.chest = handleReply.p.Island.data.chest - 10
                msg = 'You attacked the treasure chest on the island of ' + `${handleReply.p.name} successful!`
            }
            writeFileSync(this.checkPath(1, handleReply.p.ID), JSON.stringify(handleReply.p, null, 4));
            api.sendMessage(`You got ${(this.checkPath(2, senderID)).name} attack on ${j[parseInt(body) - 1]}!`, handleReply.p.ID);
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'shop': {
            if(body == 1) {
                return api.sendMessage('Please reply to this message with the amount you want to exchange!', threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "botcoins"
                    })
                }, messageID);
            }
            else if(body == 2) {
                return api.sendMessage('Please reply to this message with the amount you want to exchange!', threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "coinsbot"
                    })
                }, messageID);
            }
            else if(body == 3) {
                return api.sendMessage('Please reply to this message with the number of spins you want to buy! (10 spins 2000$)', threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "spinn"
                    })
                }, messageID);
            }
            else {
                return api.sendMessage('Invalid selection!', threadID, messageID);
            }
        }
        case 'spinn': {
            var a = require(`./pirateking/datauser/${senderID}.json`);
            await checkMoney(senderID, parseInt(body));
            api.unsendMessage(handleReply.messageID)
            await Currencies.decreaseMoney(senderID, parseInt(body)*2000);
            a.spin = a.spin + parseInt(body)
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
            return api.sendMessage(`Successfully purchased ${body} spins (${parseInt(body) * 2000}$)`, threadID, messageID);
        }
        case 'botcoins': {
            var a = require(`./pirateking/datauser/${senderID}.json`);
            await checkMoney(senderID, parseInt(body));
            api.unsendMessage(handleReply.messageID)
            await Currencies.decreaseMoney(senderID, parseInt(body));
            a.coins = a.coins + parseInt(body)
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
            return api.sendMessage(`Successfully loaded ${body} coins into the game!`, threadID, messageID);
        }
        case 'coinsbot': {
            var a = require(`./pirateking/datauser/${senderID}.json`);
            if(a.coins == null) return api.sendMessage('Null coins/bugs are not allowed to transac!', threadID, messageID);
            if(a.coins < parseInt(body)) return api.sendMessage('You dont have enough money to make this transaction!', threadID, messageID);
            api.unsendMessage(handleReply.messageID)
            await Currencies.increaseMoney(senderID, parseInt(body)*15/100);
            a.coins = a.coins - parseInt(body)
            writeFileSync(this.checkPath(1, senderID), JSON.stringify(a, null, 4));
            return api.sendMessage(`Successfully withdraw ${body*15/100} coins to bot account!\n(Withdraw interest 15%)`, threadID, messageID);
        }
    }
    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w == null) return api.sendMessage('You dont have enough money to make this transaction!', threadID, messageID);
        if (w < parseInt(maxMoney)) return api.sendMessage('You dont have enough money to make this transaction!', threadID, messageID);
    }
}
module.exports.getSpin = function (items, getItem, senderID) {
    const path = this.checkPath(1, senderID)
    var pathData = this.checkPath(2, senderID)
    var i = items.findIndex(index => index == getItem);
    if(i == 0) pathData.coins = parseInt(pathData.coins) + pathData.Island.level * 1000
    if(i == 1) pathData.coins = parseInt(pathData.coins) + pathData.Island.level * 3000
    if(i == 2) pathData.coins = parseInt(pathData.coins) + pathData.Island.level * 5000
    if(i == 4) {
        if(pathData.shield != 3) {
            pathData.spin = parseInt(pathData.spin) + 1
            pathData.shield = parseInt(pathData.shield) + 1;
        }
    }
    if(i == 6) pathData.spin = parseInt(pathData.spin) + 1
    if(i == 7) pathData.spin = parseInt(pathData.spin) + 2
    if(i == 8) pathData.spin = parseInt(pathData.spin) + 5
    writeFileSync(path, JSON.stringify(pathData, null, 4));
    return i
}