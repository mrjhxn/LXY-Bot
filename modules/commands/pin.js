module.exports.config = {
    name: "pin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Pinned Message",
    commandCategory: "Tool",
    usages: "<reply in a text>",
    cooldowns: 15,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require("fs");
  
  var id = event.messageReply.body;
  
  let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
  if(id == ""){ // == is equal to
                    		return api.sendMessage("No text Detected, Please Try Again.", event.threadID);
                    	}else{
                    		pinned.pin.message[event.threadID] = event.messageReply.body
							pinned.pin.sender[event.threadID] = event.messageReply.senderID
							return api.sendMessage("Your message is now in Pinned.", event.threadID, event.messageID)
							fs.writeFileSync("cache/pinned.json", JSON.stringify(pinned), "utf8")
                    	}
                    
}