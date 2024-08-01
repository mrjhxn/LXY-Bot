
module.exports.config = {
    name: "job",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "P-SeverTeam", 
    description: "",
    commandCategory: "Economy",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 900000
    }
};
module.exports.languages = {
    
    "en": {
        "cooldown": "You're done, come back later: %1 minute(s) %2 second(s)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
//random coins nhận được khi làm việc ít nhất 200
var coinscn = Math.floor(Math.random() * 401) + 200; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 801) + 200; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 401) + 200; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 601) + 200; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 201) + 200; //random coins khi đào đá
var coinsdd1 = Math.floor(Math.random() * 801) + 500; //random coins khi đào đá
var coinsdd2 = Math.floor(Math.random() * 3000) + 1000; //random coins khi đào đá

//random things to do
var rdcn = ['hiring staff', 'hotel administrator', 'at the power plant', 'restaurant chef', 'worker']; //random job when working in industrial park
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['plumber', 'neighbors air conditioner repair', 'multi-level sale', 'flyer distribution', 'shipper', 'computer repair', 'tour guide', 'breastfeeding' ]; //random work when working in the service area
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['earn 13 barrels of oil', 'earn 8 barrels of oil', 'earn 9 barrels of oil', 'earn 8 barrels of oil', 'steal the oil', 'take water and pour it into oil and sell it']; //random job while working at an oil field
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

var rdq = ['iron ore', 'gold ore', 'coal ore', 'lead ore', 'copper ore', 'oil ore']; //random job when mining ore
var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

var rddd = ['diamond', 'gold', 'coal', 'emerald', 'iron', 'ordinary stone', 'lazy', 'bluestone']; //random job when digging rock
var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

var rddd1 = ['vip guest', 'banana vendor', 'beggar', 'child kidnapper', 'Dinosaur', 'Fake Boyfriend/Girlfriend', 'Egg Vendor', 'Garbage Collector']; //random work when digging rock
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];

var rddd2 = ['Pornhub-Teacher', 'Pornhub-Cameraman', 'HACKER', 'Child kidnapper', 'Fake Taxi Driver', 'Scammer', 'Bank Robber', 'Motel Shipper']; //random work when digging rock
var work7 = rddd2[Math.floor(Math.random() * rddd2.length)];


var msg = "";
  
  var { author } = handleReply;
  if (event.senderID != author) return api.sendMessage("====[ 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 ]====\n", event.threadID, event.messageID);

  
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `⚡️You are working ${work1} in the industrial zone and earn ${coinscn}$` ; Currencies.increaseMoney(event.senderID, coinscn); break;             
                case "2": msg = `⚡️You are working ${work2} in the service area and earn ${coinsdv}$`; Currencies.increaseMoney(event.senderID, coinsdv); break;
                case "3": msg = `⚡️You ${work3} at the open oil and sell ${coinsmd}$`; Currencies.increaseMoney(event.senderID, coinsmd); break;
                case "4": msg = `⚡️You are mining ${work4} and earn ${coinsq}$`; Currencies.increaseMoney(event.senderID, coinsq); break;
                case "5": msg = `⚡️You can dig ${work5} and earn ${coinsdd}$` ; Currencies.increaseMoney(event.senderID, coinsdd); break;
                case "6": msg = `⚡️You work as ${work6} and given ${coinsdd1}$`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "7": msg = `⚡️You work as ${work7} and given ${coinsdd2}$`; Currencies.increaseMoney(event.senderID, coinsdd2); break;
                case "8": msg = "⚡️ Coming soon..."; break;
                case "DECODERS TEAM": msg = `⚡️You find the secret code make it unli till owner remove it\n\n100000$ added to your coins`; Currencies.increaseMoney(event.senderID, coinsdd2); break;//add case if you want 
                default: break;
            };
            const code = "DECODERS TEAM";
            //const choose = parseInt(event.body);
            const choose = event.body
            
            if (isNaN(event.body)) return api.sendMessage("⚡️Please REPLY 1 number", event.threadID, event.messageID);
            
            if (choose > 8 || choose < 1 && choose == code) return api.sendMessage("⚡️Option is not on the list.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
          
            if (msg == "⚡️Update update...") {
                msg = "⚡️Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime for each receipt 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("=== WORK JOBS ===" +
  /*công nghiệp*/ "\n\n1. work1" +
  /*dịch vụ*/  "\n2. work2." +
  /*Mỏ dầu*/ "\n3. work3." +
  /*Quặng*/ "\n4. work4" +
  /*Đào đá*/ "\n5. work5" +
  /*cave*/    "\n6. work6" +
                "\n7. work7" +
                "\n8. Update soon..." +
                "\n\n Secret code: []" +
                "\nClue: " +
                "\n -... --- - / --- .-- -. . .-. ... / .--. ..- -... .-.. .. -.-. / -.-. --- -- -- ..- -. .. - -.-- " +
                "\n\n⚡️Please reply to the message and choose by number or reply a secret code for a prize" //add case display here ||  \n[number]. [Career]" +
            , event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
/*
@credit P-SeverTeam
@Vui lòng không đổi credit!
*/