const axios = require("axios");
const fs = require("fs");
module.exports.config = {
    name: "capv2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MAVERICK",
    description: "Chụp ảnh profile của người dùng",
    commandCategory: "THÀNH VIÊN",
    usages: "",
    cooldowns: 5
}
module.exports.run = async function ({ api,Users,event, args }) {
  const name = await Users.getNameUser(event.senderID)
    api.sendMessage(`Wait a minute ${name}!!`, event.threadID, event.messageID);
    var uid = String(args[0]);
    isNaN(uid) && (uid = Object.keys(event.mentions)[0], "message_reply" == event.type ? uid = event.messageReply.senderID : uid = event.senderID);
    var cookies = ``,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=2VAxYymm3abr1GVmAXDnDI_C;datr=YgxVY4gJ7Oqbjm8P7IozzdqX;vpd=v1%3B742x393x2.75;c_user=100001795291235;xs=6%3ABA0_gMA7BNJ3CA%3A2%3A1668452077%3A-1%3A6627;m_page_voice=100001795291235;fr=01EYitRc1NYIO3qLq.AWU0Qibj0WgvPmSwTRlYMSQZRtg.BjMVDZ.3Z.AAA.0.0.BjcqGE.AWULwH0s33o;dpr=2.75;wd=980x1195;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`thieutrungkien.dev/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=c259ed&url=${url}&dimension=1366x768`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `Hey, it's done ${name}`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
}