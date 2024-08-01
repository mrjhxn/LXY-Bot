    var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
    module.exports.config = {
        name: "777vip",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "Q.Huy", // Mod từ baucua của Horizon
        description: "Fruit Gambling",
        commandCategory: "games",
        usages: "fruit + bet ooins",
        cooldowns: 5
    };

    module.exports.onLoad = async function () {
        if (!existsSync(__dirname + '/cache/grape.jpg')) {
            request('https://i.imgur.com/tmKK6Yj.jpg').pipe(createWriteStream(__dirname + '/cache/grape.jpg'));
        }
        if (!existsSync(__dirname + '/cache/melon.jpg')) {
            request('https://i.imgur.com/mBTKhUW.jpg').pipe(createWriteStream(__dirname + '/cache/melon.jpg'));
        }
        if (!existsSync(__dirname + '/cache/peach.jpg')) {
            request('https://i.imgur.com/2qgYuDr.jpg').pipe(createWriteStream(__dirname + '/cache/peach.jpg'));
        }
        if (!existsSync(__dirname + '/cache/apple.jpg')) {
            request('https://i.imgur.com/tXG56lV.jpg').pipe(createWriteStream(__dirname + '/cache/apple.jpg'));
        }
        if (!existsSync(__dirname + '/cache/berry.jpg')) {
            request('https://i.imgur.com/PLQkfy3.jpg').pipe(createWriteStream(__dirname + '/cache/berry.jpg'));
        }
        if (!existsSync(__dirname + '/cache/seven.jpg')) {
            request('https://i.imgur.com/1UBI1nc.jpg').pipe(createWriteStream(__dirname + '/cache/seven.jpg'));
        }
        if (!existsSync(__dirname + '/cache/slot.gif')) {
            request('https://i.imgur.com/QP7xZz4.gif').pipe(createWriteStream(__dirname + '/cache/slot.gif'));
        }
    };

    async function get(one,two,three) {
        var x1;
            switch (one) {
                case "grape": x1 = "🍇";
                    break;
                case "melon": x1 = '🍉';
                    break;
                case "peach": x1 = '🍑';
                    break;
                case "apple": x1 = '🍎';
                    break;
                case "berry": x1 = '🍓';
                    break;
                case "seven": x1 = '➐';
                  
            }
        var x2;
            switch (two) {
                case "grape": x2 = "🍇";
                    break;
                case "melon": x2 = '🍉';
                    break;
                case "peach": x2 = '🍑';
                    break;
                case "apple": x2 = '🍎';
                    break;
                case "berry": x2 = '🍓';
                    break;
                case "bay": x2 = '➐';
                    
            }
        var x3;
            switch (three) {
                case "grape": x3 = "🍇";
                    break;
                case "melon": x3 = '🍉';
                    break;
                case "peach": x3 = '🍑';
                    break;
                case "apple": x3 = '🍎';
                    break;
                case "berry": x3 = '🍓';
                    break;
                case "seven": x3 = '➐';
                    
            }
        var all = [x1, x2, x3];
    return full = all;
    }
var full = [];
    module.exports.run = async function({ api, event, args, Currencies }) { var out = (msg) => api.sendMessage(msg,event.threadID, event.messageID);
        const slotItems = ["grape", "melon", "peach", "apple", "berry", "seven",];
            const moneyUser = (await Currencies.getData(event.senderID)).money;
                var moneyBet = parseInt(args[1]);
                    if (!args[0] || !isNaN(args[0])) return api.sendMessage("select: [grape/melon/peach/apple/berry/seven] [amount]",event.threadID, event.messageID);
                    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("Bet amount cannot be empty or negative amount", event.threadID, event.messageID);
                if (moneyBet > moneyUser) return api.sendMessage("The amount you bet is bigger than your balance!", event.threadID, event.messageID);
            if (moneyBet < 10000) return api.sendMessage("The deposit amount cannot be less than $10000", event.threadID, event.messageID);
        var number = [], win = false;
    for (let i = 0; i < 3; i++) number[i] = slotItems[Math.floor(Math.random() * slotItems.length)];
        var itemm;
            var icon;
                switch (args[0]) {
                    case "grape":
                        case "Grape": itemm = "grape";
                                icon = '🍇';
                            break;
                    case "melon": 
                        case "Melon": itemm = "melon";
                                icon = '🍉';
                            break;
                    case "peach":
                        case "Peach": itemm = "peach";
                                icon = '🍑';
                            break;
                    case "apple":
                        case "Apple": itemm = "apple";
                                icon = '🍎';
                            break;
                    case "berry": 
                        case "Berry": itemm = "berry";
                                icon = '🍓';
                            break;
                    case "seven":
                        case "Seven": itemm = "seven";
                                icon = '➐';
                            
                            break;
                                default: return api.sendMessage("Select: [grape/melon/peach/apple/berry/seven] [amount]",event.threadID, event.messageID);
                }      
                await get(number[0],number[1],number[2]);
            api.sendMessage({body:"SPINNING....",attachment: createReadStream(__dirname + "/cache/slot.gif")},event.threadID,async (error,info) => {
                await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                    api.unsendMessage(info.messageID);
                          await new Promise(resolve => setTimeout(resolve, 100));
    var array = [number[0],number[1],number[2]];
        var listimg = [];
           for (let string of array) {
               listimg.push(createReadStream(__dirname + `/cache/${string}.jpg`));
           }
        if (array.includes(itemm)) {
            var i = 0;
                if (array[0] == itemm) i+=1;
                    if (array[1] == itemm) i+=1;
                if (array[2] == itemm) i+=1;
            if (i == 1) {
                var mon = parseInt(args[1]) * 1;  
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s1")
                        return api.sendMessage({body:`🎰  ${full.join(" | ")} 🎰\n→ Because there is 1 ${args[0].toLocaleLowerCase()} ${icon}\n→ You choose: ${args[0].toLocaleLowerCase()}\n→ You won and got: ${mon}$\n━━━━━━━━━━━━━━━━━━\n→ Current balance is: ${[moneyUser + mon]}$`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 2) {
                var mon = parseInt(args[1]) * 2; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s2")
                        return api.sendMessage({body:`🎰  ${full.join(" | ")} 🎰\n→ Because there are 2 ${args[0].toLocaleLowerCase()} ${icon}\n→ You choose: ${args[0].toLocaleLowerCase()}\n→ You won and got: ${mon}\n━━━━━━━━━━━━━━━━━━\n→ Current balance is: ${[moneyUser + mon]}$`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 3) {
                var mon = parseInt(args[1]) * 3; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log('s3')
                        return api.sendMessage({body:`🎰  ${full.join(" | ")} 🎰\n→ Because there are 3 ${args[0].toLocaleLowerCase()} ${icon}\n→ You choose: ${args[0].toLocaleLowerCase()}\n→ You won and got: ${mon}$\n━━━━━━━━━━━━━━━━━━\n→ Current balance is: ${[moneyUser + mon]}$`,attachment: listimg},event.threadID, event.messageID);
            }
            else return api.sendMessage("Error ! Code : XX1N",event.threadID,event.messageID);
        } else  {
            await Currencies.decreaseMoney(event.senderID, parseInt(args[1])); console.log('s4')
            return api.sendMessage({body:`🎰  ${full.join(" | ")} 🎰\n→ Because there is 0 ${args[0].toLocaleLowerCase()} ${icon}\n→ You choose: ${args[0].toLocaleLowerCase()}\n→ You lost and lost: ${args[1]}$\n━━━━━━━━━━━━━━━━━━\n→ Current balance is: ${[moneyUser -args[1]]}$`,attachment: listimg},event.threadID, event.messageID);
        }
            } ,event.messageID);
    };