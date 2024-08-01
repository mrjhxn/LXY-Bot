module.exports.config = {
	name: "tiktokinfo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Joshua Sy",
	description: "find tiktok info",
  usages: "[tiktok name]",
	commandCategory: "...",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let juswa = args.join(" ");

var lstct = ["Hs2lvnqu",
                 "DFFAzoK9",
                 "MKo2jiZV",
                 "5CdhXXpj",
                 "3mVzRgx7",
                 "rqGTz2jm",
                 "EgAPALwx",
                 "CNDSZotb",
                 "mGNXxaVM",
                 "F5bm7NSb",
                 "Fcq3Fb3x",
                 "uW8cz9KV",
                 "lBhndZpj",
                 "g29kwLXr",
                 "zrU7IVaB",
                 "uaoE6gpB",
                 "webnWOPq",
                 "HRIdpfFf",
                 "iNt2kCSB",
                 "YqECqIWi",
                 "lh5HjYNA",
                 "taYrWMam",
                 "w9s48mVd",
                 "IyWIYp8J",
                 "tvXOET6H"];
    var apikey = lstct[Math.floor(Math.random() * lstct.length)]
  
const res = await axios.get(`https://manhict.tech/api/tikInfo?query=${juswa}&apikey=${apikey}`);
var id = res.data.result.id;
var uniqueId = res.data.result.uniqueId;
var nickname = res.data.result.nickname;
var privateAccount = res.data.result.privateAccount;
var followerCount = res.data.result.followerCount;
var heart = res.data.result.heart;
var signature = res.data.result.signature;
var avatar = res.data.result.avatar;
return api.sendMessage(`id: ${id}\nUniqueId: ${uniqueId}\nNickname: ${nickname}\nPrivateAccount: ${privateAccount}\nFollowerCount: ${followerCount}\nHeart: ${heart}\nSignature: ${signature}\nAvatar: ${avatar}`, event.threadID, event.messageID)
}