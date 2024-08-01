module.exports.config = {
	name: "tord",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Plue",
	description: "Truth or Dare",
	commandCategory: "Games",
    cooldowns: 5
};
var dare = ["Go to Admin's FaceBook then heart some post", "Message Confess Love to Admin", "Record Singing Any Song", "Record With Content I Love Admin Most", "Let admin picture make avt for 1 day", "Voice UGH 10s", "Take a video and say you love admin so much", "Mag confess ka ng nararamdaman mo kahit kanino", "Kiss mo ung admin dapat may tunog", "Send Pic yung mala aesthetic para sayo HAHAHAHA", "Display Relationshhip sa ADMIN", "Display Relationship kahit kanino", "Confess kana sa crush mo", "Myday mo yung Crush mo", "Myday mo yung ADMIN", "Sumali ka sa RedRoom tapos magkalat ka dun ng lahi mo", "Sumali ka sa Redroom tapos tadtadtadin mo ng like", "POST ka sa sa TL mo [ANG SARAP KO]", "POST ka sa sa TL mo [BAKLA PO AKO]", "POST ka sa sa TL mo [MAY LAWIT PO AKO]", "POST ka sa sa TL mo [Crush ko yung isa jan Confess kana kasi]", "POST ka sa sa TL mo [AGAWIN KO JOWA MO EH]", "Magsend ka ng [Hi kumain ka naba?] sa radom ferson", "Mag bigay ng Kiss sa random FERSON", "MAG BEBE TIME NG LIMA WITH SCREENSHOT DAPAT", "Bigyan/Ireto mo jowa sa kaibigan mo for 2 days", "Libre mo ng $10 load (random person)", "Makipag kiss ka kahit kanino walang malisha ha!", "Mag shit post ng nabrobroken 10x"];//Câu hỏi thách <3
var truth = ["Name your boyfriend/girlfriend/Ex.", "Have you ever been in love?", "Which of the superpower have you ever wished to have?", "Have you ever proposed to someone?", "Tell us your biggest embarrassing secret.", "Name the cutest boy or girl in your class?", "Who do you love the most? Mom or Dad?", "Who is your dream girl/dream boy?", "Name your current crush.", "Tell whats body part of you loveones/crush most u like it.", "Name your childhood crush.", "Did you ever have a crush on your teacher?", "Have you ever tried flirting with your best friend’s boyfriend/girlfriend?", "If you ever get a chance to marry a celebrity/actor or actress, who would he or she be?", "Describe the funniest prank someone ever played on you?", "Did u already taste your crush/bf/gf?", "What was your nickname in your childhood?", "Name of your pet? (Maybe its a human)", "Do you dance when you are alone?", "Name any part of your body that you want to exchange with your best friend.", "Pag namatay ba jowa, sino ang ipapalit mo?", "Ex or Current Relationship?", "Who caught your attention the most? seryoso dapat ha!", "Sino para sayo yung mukhang bida bida dito, pag inaway ka awayin mo din HAHAHA", "Tells whose your Crush (Bukod sa Karelationship mo!)", "What if bumalik si Ex magiging ayo ba ulit?", "What if nabanga mo si Ex ano una mong sasabihin (dapat meron tapos may halong kalandian)", "Sino gusto mo ka SOC dito sa group (Kung wala tell the name kung sino gusto mo ka SOC)", "Kaninong Typings ka nafafall?", "Pag ba umamin ako sayo sasagutin mo ba ako? HAHAHAHA", "Mahal mo paba ex mo?"];//Câu hỏi thật <3
module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");
   const { threadID, messageID, senderID } = event;
    
    
    
    if (!args[0]) {
     var msg = {body: `[ 𝐑𝐄𝐏𝐋𝐘 ] 𝐂𝐇𝐎𝐎𝐒𝐄 𝟏 𝐎𝐑 𝟐  \n====================\nㅤㅤㅤㅤ𝟏. 𝐓𝐑𝐔𝐓𝐇 \nㅤㅤㅤㅤ𝟐. 𝐃𝐀𝐑𝐄 \n====================\n𝐇𝐀𝐕𝐄 𝐀 𝐆𝐎𝐎𝐃 𝐋𝐔𝐂𝐊`}
        
        return api.sendMessage(msg, event.threadID, (error, info) => {
        
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
}
    module.exports.handleReply = async function ({
    args,
    event,
    Users,
    api,
    handleReply,
    Currencies
}) {
  const axios = require("axios");
    var { author } = handleReply;
    if (event.senderID != author) return api.sendMessage("====[ 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 ]====\n\nYour not a Sender of this command.", event.threadID, event.messageID); 
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "1": {
          api.unsendMessage(handleReply.messageID);
          
    return api.sendMessage(`𝐓𝐫𝐮𝐭𝐡 : ${truth[Math.floor(Math.random()*truth.length)]}`, event.threadID, event.messageID)

            }
            
        case "2": {
          api.unsendMessage(handleReply.messageID);
    return api.sendMessage(`𝐃𝐚𝐫𝐞 : ${dare[Math.floor(Math.random()*dare.length)]}`, event.threadID, event.messageID)
            }
            break;
					default:
           const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝟏 𝐨𝐫 𝟐", event.threadID, event.messageID);
            	if (choose > 2 || choose < 1) return api.sendMessage("𝐓𝐡𝐞 𝐬𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 𝐢𝐬 𝐧𝐨𝐭 𝐨𝐧 𝐭𝐡𝐞 𝐥𝐢𝐬𝐭.", event.threadID, event.messageID); 
    }
    }
}
      }