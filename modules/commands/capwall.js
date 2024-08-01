const axios = require("axios");
const fs = require("fs");
module.exports.config = {
    name: "capwall",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",
    description: "Take a picture of the user's profile",
    commandCategory: "MEMBER",
    usages: "",
    cooldowns: 5
}
module.exports.run = async function ({ api,Users,event, args }) {
  const name = await Users.getNameUser(event.senderID)
    api.sendMessage(`wait a minute, wait for a cap ${name}!!`, event.threadID, event.messageID);
    var uid = String(args[0]);
    isNaN(uid) && (uid = Object.keys(event.mentions)[0], "message_reply" == event.type ? uid = event.messageReply.senderID : uid = event.senderID);
    var cookies = `datr=9cFjY0OeUHZI3BFcDieRp89b;sb=9cFjY539NB0D2jsmouwHGnP7;c_user=100014811933322;xs=42%3AeCWY1hCBTuSeqA%3A2%3A1667482128%3A-1%3A6299;m_page_voice=100014811933322;fbl_cs=AhDqOtFtCTsPOJ6ORQ%2BK0RcMGGF0WWx6MGdoWVd0QmJNVFo4VCtud2pUQg;locale=vi_VN;fbl_ci=489060856220921;m_pixel_ratio=2;vpd=v1%3B633x360x2;fbl_st=101430230%3BT%3A27794988;wd=1360x657;fr=0nAhvDsxxm53RrYIW.AWVXogOsIu0oiuIbbk227uF0UZ8.BjY8H1.vf.AAA.0.0.BjbKb3.AWW71hEbNyo;presence=C%7B%22lm3%22%3A%22g.4041113556008349%22%2C%22t3%22%3A%5B%7B%22i%22%3A%22g.5458262784262797%22%7D%2C%7B%22i%22%3A%22g.5490248381070356%22%7D%2C%7B%22i%22%3A%22g.5150585554977172%22%7D%5D%2C%22utc3%22%3A1668264699980%2C%22v%22%3A1%7D;|Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = ``;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`api-vip.procyrus.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=a12e16&url=${url}&dimension=1920x1080`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `it's done ${name}`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
      }