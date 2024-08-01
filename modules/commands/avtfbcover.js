module.exports.config = {
    name: "avtfbcover",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Plu",
    description: "create avt wibu",
    commandCategory: "Create a banner",
    usages: "[ID] [TEXT] [TEXT]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    if(!args[0]) {

        //api.sendMessage(`✅Vui lòng nhập theo định dạng:\n${prefix}${this.config.name} ID/Namenv + Chữ nền + Chữ ký + Mã màu/color`,event.threadID,event.messageID)
            let getAvatar = (await axios.get(`https://i.postimg.cc/T1wVWhGp/FBCOVER.png`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(getAvatar, "utf-8") );
            api.sendMessage({ body: `Please enter in the format:\n${prefix}${this.config.name} ID/Namenv + Text background + Signature + Color code/color\nPlease use the command ${global.config.PREFIX} listid to get the list ID\n\nExample:\n${prefix}${this.config.name} 5 BLUUUU BluIchiro\n\nIf you don't really get it, contact the admin.`,
                  attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
    }
    else{
    const id = args[0]; //ID nhân vật
    if(!args[1]) {


            api.sendMessage(`Missing background text\nType: ${prefix}${this.config.name} ID/Namenv + Text background + Text background + Color code/color `, event.threadID);
    } 
    else {     
    const namebg = args[1]; //chữ nền
    if(!args[2]) {


            api.sendMessage(`Missing signature\nType: ${prefix}${this.config.name} ID/Namenv + Text background + Signature + Color code/color `, event.threadID);
    } 
    else {    
    const chuky = args[2]; //chữ ký

    var rdcolor = ['pink', 'blue', 'red', 'green', 'yellow ', 'brown', 'orange', 'gray'];
    var colorr = rdcolor[Math.floor(Math.random() * rdcolor.length)];   //random màu



   /* function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color1 = '#';
    for (var i = 0; i < 6; i++) {
     color1 += letters[Math.floor(Math.random() * 16)];
  }
    return color1;
  }
    var colorr = generateRandomColor();*/// random mã màu
    
    //var colorr = '#'+Math.floor(Math.random()*16777215).toString(16); //random mã màu 2

    const color = args[3] || colorr;
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


            let getAvatar = (await axios.get(`https://www.nguyenmanh.name.vn/api/fbcover2?name=${namebg}&id=${id}&subname=${chuky}&apikey=${apikey}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avttt.png", Buffer.from(getAvatar, "utf-8") );
            api.sendMessage({ body: `Your Avatar Wibu is here`,
                  attachment: fs.createReadStream(__dirname + `/cache/avttt.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avttt.png`), event.messageID);
}
}
}
}
//https://api.phamvandien.xyz/taoanhdep/avatarwibu?id=${id}&chu_nen=${namebg}&chu_ky=${chuky}