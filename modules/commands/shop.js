module.exports.config = {
	name: "shop",
	version: "1.0.0",
	credits: "HungCho & Khánh Milo",
	description: "shop",
	usages: "",
    commandCategory: "game-sp",
	cooldowns: 0,
	dependencies: {
        "fs-extra" : ""
    }
};
module.exports.onLoad = function () {
    const fs = global.nodemodule["fs-extra"];

	if (!fs.existsSync(__dirname + "/cache/bill.json")) {
		const requestList = [];
		fs.writeFileSync(__dirname + "/cache/bill.json", JSON.stringify(requestList));
	}
}
module.exports.handleReply = async function({ api, event, handleReply, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
	const dirFile = __dirname + "/cache/bill.json";
  const { configPath } = global.client;
  const { ADMINBOT } = global.config;
  var config = require(configPath);

	var getList = fs.readFileSync(dirFile);
	var getData = JSON.parse(getList);

    if (handleReply.author != event.senderID) return;
    var data = await Currencies.getData(handleReply.author);
    var exp =  data.exp;
    var money = data.money
    var d = new Date();
    var date = d.getDate()+'/'+(d.getMonth() + 1 )+'/'+d.getFullYear();
	var time = d.getHours() + ":" + d.getMinutes();
    switch (handleReply.type) {
        case "banking": {
            switch (event.body) {
                case "1": {
                    return api.sendMessage(
                        "You can reply the amount you need to change to exp! 20 dollars = 1 exp."
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "money"
                      });
                  }, event.messageID);
                } 
                case "2": {
                    return api.sendMessage(
                        "You can reply the number of exp you need to convert to money! 5 exp = 1 dollar."
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "exp"
                      });
                  }, event.messageID);
                }
                case "3": {
                  
                    return api.sendMessage(
                        "Requirements to buy Admin.\n\n15,000,000,000 MONEY\n200 LEVEL\n\nPlease Reply if you want to buy!"
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "admin"
                      });
                  }, event.messageID);
                  
                }
                default:
                    break;
            }
            return;
          }
          case "exp": {
            var content = event.body;
            if(content > exp) api.sendMessage("Your exp is not enough? please scratch more keys",event.threadID,event.messageID)
            else 
            {
            await Currencies.increaseMoney(handleReply.author, parseInt(content / 5));
            var exp = ((await Currencies.getData(handleReply.author)).exp) - parseInt(content);
            await Currencies.setData(handleReply.author, { exp })
            var msg = `💸 Successful transaction !\nTime: ${time} - ${date}\nDetails: exchange ${content} exp for ${content / 5} dollars.`
            api.sendMessage(msg,handleReply.author);
            const suggest = msg;
            getData.push(suggest);
            api.sendMessage("Your transaction has been saved on the system!",event.threadID, () => fs.writeFileSync(dirFile, JSON.stringify(getData)),event.messageID);
          
            }
          break;
       }
       case "money": {
        var content = event.body;
        if(content > money) api.sendMessage("Your money is not enough!",event.threadID,event.messageID)
        else 
        {
            await Currencies.increaseMoney(event.senderID, parseInt("-"+content))
        var exp = ((await Currencies.getData(handleReply.author)).exp) + parseInt(content / 20);
        await Currencies.setData(handleReply.author, { exp })
        var msg = `💸 Transaction successful !\nTime: ${time} - ${date}\nDetails: exchange ${content} dollars for ${content / 20} exp.`
        api.sendMessage(msg,handleReply.author);
        const suggest = msg;
        getData.push(suggest);
        api.sendMessage("Your transaction has been saved on the system!",event.threadID, () => fs.writeFileSync(dirFile, JSON.stringify(getData)),event.messageID);
      
        }
      break;
   }
        case "admin": {
        var content = "15000000000";
        var contentexp = "15000000000";
        if(content > money && contentexp > exp) api.sendMessage("Your money/level is not enough!",event.threadID,event.messageID)
        else 
        {
            await Currencies.decreaseMoney(event.senderID, parseInt(content))
        var exp = ((await Currencies.getData(handleReply.author)).exp) - parseInt(contentexp);
        await Currencies.setData(handleReply.author, { exp })
        var msg = `💸 Transaction successful !\nTime: ${time} - ${date}\nDetails: decrease ${content} money and ${contentexp} exp.`
        api.sendMessage(msg,handleReply.author);
        const suggest = msg;
        getData.push(suggest);
        //ADMINBOT.push(handleReply.author);
        config.ADMINBOT.push(handleReply.author);
        writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
        api.sendMessage("Your transaction has been saved on the system!",event.threadID, () => fs.writeFileSync(dirFile, JSON.stringify(getData)),event.messageID);
        }
      break;
   }
      }
    }
module.exports.run = async function({ api, event, args }) {
    const fs = global.nodemodule["fs-extra"];
	const dirFile = __dirname + "/cache/bill.json";

	var getList = fs.readFileSync(dirFile);
	var getData = JSON.parse(getList);

    if(!args[0])return api.sendMessage(
                "◆━━◆ SHOP " +
                "\n» Please enter option «" +
                "\n\n1. Convert money to exp ❄️." +
                "\n2. Convert exp to money 💦." +
                "\n3. Buy bot Admin." +
                "\n4. Update after ⚒." +
                "\n\n» Please reply to the message and select by number «"
            , event.threadID, (error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "banking"
                });
            }, event.messageID);
     
    if (args[0] == "check") {
        var workList = "";
			getData.map(item => workList += `\n ${item}`);
			return api.sendMessage(`${workList}`, event.threadID, event.messageID);
		}
        
}
