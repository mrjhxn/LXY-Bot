module.exports.config = {
    name: "ztest2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "PLUE",
    description: "create avt wibu",
    commandCategory: "Create a banner",
    usages: "ID | TEXT | TEXT",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
    if (!text) return api.sendMessage(`Just add text\n\n${prefix}avtwibu1 ID-NUMBER (1-820) | TEXT | TEXT`, event.threadID, event.messageID);
    else{
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

            let getAvatar = (await axios.get(`https://manhict.tech/api/avtWibu?id=${text[0]}&chunen=${text[1]}&chuky=${text[2]}&apikey=${apikey}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avttt.png", Buffer.from(getAvatar, "utf-8") );
            api.sendMessage({ body: `Your Avatar Wibu is here`,
                  attachment: fs.createReadStream(__dirname + `/cache/avttt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avttt.png`), event.messageID);
}
}
//https://api.phamvandien.xyz/taoanhdep/avatarwibu?id=${id}&chu_nen=${namebg}&chu_ky=${chuky}