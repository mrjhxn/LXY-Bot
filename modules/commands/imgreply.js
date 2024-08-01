module.exports.config = {
	name: "imgreply",
  version: "1.0.0",
	hasPermssion: 0,
	credits: "Hidden & Rip05", 
	description: "See photo of reply version",
	commandCategory: "img",
	usages: "",
  cooldowns: 5, 
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
const fs = require("fs");
const { threadID, messageID, senderID } = event;
    switch(handleReply.type) {
        case "check": {
          switch(event.body) {
					case "1":
						api.unsendMessage(handleReply.messageID);
						api.sendMessage({
							body: "1.\tKanna / 11.Blush\n2.\tSagiri\n3.\tBig Tits\n4.\tLucy\n5.\tIcon\n6.\tHusbu\n7.\tShota\n8.\tCoco\n9.\tBaka\ n10.\tBite\n\n[REPLY MESSAGE TO VIEW PHOTO]"}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "test",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
  };
};

case "hello": {
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage(""), event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "test",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			};
break;
};
      case "test": {
          switch(event.body) {
					case "1":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "Kanna UwU",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://apikanna.change-itit.repl.co')).data.data,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "2":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "Sagiri UwU",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://apisagiri.khoahoang3.repl.co')).data.data,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "3":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "Zú Bự Ít Thôi :))",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://img-hololive-api.up.railway.app/coco')).data.url,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "4":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "Lucy nè :3",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://apilucy.khoahoang3.repl.co')).data.data,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "5":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "OwO",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://anime.mikubaka2608.repl.co/')).data.data,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "6":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "UwU",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('http://zekais-api.herokuapp.com/randomhusbu?apikey=PSBteJUy')).data.result,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "7":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "Shota nè kk xD",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('http://zekais-api.herokuapp.com/randomshota?apikey=PSBteJUy')).data.result,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "8":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "Alime ít thôi :v",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://img-hololive-api.up.railway.app/coco/?fbclid=IwAR2w2gsVOnRM30UZ0ZpUkFhAiO1eeTjeeYaIFATrd4Hf-SszVVZKbSuWyBg')).data.url,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "9":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: "I Love You 3000 UwU",
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://nekos.best/api/v1/baka')).data.url,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "10":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: `Anime Ít Thôi =))`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://nekos.best/api/v1/bite')).data.url,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
         case "11":
						api.unsendMessage(handleReply.messageID);
						return api.sendMessage({
							body: `Hihi`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://nekos.best/api/v1/blush')).data.url,
			method: "GET",
			responseType: "stream"
		})).data}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
			});
break;
};
};
};
};

module.exports.run = async ({ api, event, handleReply }) => {
	const fs = require("fs");
	const { threadID, messageID, senderID } = event;
	return api.sendMessage({ body: "◆=====< Shop >=====◆\n☄️ 1)\tAnime\n\nReply tin nhắn để xem ảnh"}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "check",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })  
    })
              }