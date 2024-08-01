module.exports.config = {
  name: "18+abs",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Joshua Sy",
  description: "18+ Image",
  commandCategory: "Other",
    cooldowns: 15,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")

var link = [
"https://i.imgur.com/0ABaNW8.jpg",
"https://i.imgur.com/tFLsUrB.jpg",
"https://i.imgur.com/DwUTmUc.jpg",
"https://i.imgur.com/jt8Sq1k.jpg",
"https://i.imgur.com/fJdrgSM.jpg",
"https://i.imgur.com/gNqCvBe.jpg",
"https://i.imgur.com/qmMqH8g.jpg",
"https://i.imgur.com/zUml2RB.jpg",
"https://i.imgur.com/RJRB3qH.jpg",
"https://i.imgur.com/HZMIvcc.jpg",
"https://i.imgur.com/9q8XZHJ.jpg",
"https://i.imgur.com/F9ElhsA.jpg",
"https://i.imgur.com/uVdX2BA.jpg",
"https://i.imgur.com/dnRTvSk.jpg",
"https://i.imgur.com/CMZ9Pfc.jpg",
"https://i.imgur.com/yy4Fs7x.jpg",
"https://i.imgur.com/yWeAWA2.jpg",
"https://i.imgur.com/dXNkZA3.jpg",
"https://i.imgur.com/E9m93sQ.jpg",
"https://i.imgur.com/kTU2KZH.jpg",
"https://i.imgur.com/dAvulPk.jpg",
"https://i.imgur.com/SCU0Nhk.jpg",
"https://i.imgur.com/4nqZymL.jpg",
"https://i.imgur.com/LUfTN1s.jpg",
"https://i.imgur.com/15LMEKv.jpg",
"https://i.imgur.com/t7urpcr.jpg",
"https://i.imgur.com/tmj9zFk.jpg",
"https://i.imgur.com/Ev46eaK.jpg",
"https://i.imgur.com/tbiCrBl.jpg",
"https://i.imgur.com/wUdMFK0.jpg",
"https://i.imgur.com/KzZDRNm.jpg",
"https://i.imgur.com/5WPneSm.jpg",
"https://i.imgur.com/rzEdDnJ.jpg",
"https://i.imgur.com/o79KFAX.jpg",
"https://i.imgur.com/Q41cf5H.jpg",
"https://i.imgur.com/fJnc4iZ.jpg",
"https://i.imgur.com/NyPaQ7t.jpg",
"https://i.imgur.com/7T2L2my.jpg",
"https://i.imgur.com/4QK9Qy2.jpg",
"https://i.imgur.com/SI8d4TU.jpg",
"https://i.imgur.com/o25oZ16.jpg",
"https://i.imgur.com/U4BrgSK.jpg",
"https://i.imgur.com/i8cMBW2.jpg",
"https://i.imgur.com/cmb6ubS.jpg",
"https://i.imgur.com/Dqpui42.jpg",
"https://i.imgur.com/Y90BLzr.jpg",
"https://i.imgur.com/VjuUbba.jpg",
"https://i.imgur.com/QT7uKiy.jpg",
"https://i.imgur.com/CVQdxAX.jpg",
"https://i.imgur.com/QKQYUsx.jpg",
"https://i.imgur.com/IB29l19.jpg",
"https://i.imgur.com/k5dNPhc.jpg",
"https://i.imgur.com/haa1XJ7.jpg",
"https://i.imgur.com/AVeISTj.jpg",
"https://i.imgur.com/KDkkxVP.jpg",
"https://i.imgur.com/hLVgS6l.jpg",
"https://i.imgur.com/hXNJatS.jpg",
"https://i.imgur.com/UzXsSSp.jpg",
"https://i.imgur.com/we2iAQ7.jpg",
"https://i.imgur.com/JuqU7AS.jpg",
"https://i.imgur.com/vn3vNsi.jpg",
"https://i.imgur.com/aV4WVsq.jpg"
  ];
  var abs = link[Math.floor(Math.random() * link.length)];


    let imgs1 = (await axios.get(`${abs}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.png", Buffer.from(imgs1, "utf-8"));

    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.png"));
    return api.sendMessage({attachment: allimage
    }, event.threadID);
}