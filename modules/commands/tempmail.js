module.exports.config = {
	name: "tempmail",
	version: "3.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "Temporari mail",
	commandCategory: "word",
	usages: "generate|checkmail YOUR_TEMP_MAIL",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
  var texts = args.join(' ');
if (texts == "generate"){
const res = await axios.get(`https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10`);

  var result1 = res.data[0];
  var result2 = res.data[1];
  var result3 = res.data[2];
  var result4 = res.data[3];
  var result5 = res.data[4];
  var result6 = res.data[5];
  var result7 = res.data[6];
  var result8 = res.data[7];
  var result9 = res.data[8];
  var result10 = res.data[9];

  return api.sendMessage({body: `
== GENERATED MAIL ==
  ${result1}
  ${result2}
  ${result3}
  ${result4}
  ${result5}
  ${result6}
  ${result7}
  ${result8}
  ${result9}
  ${result10}
  `}, event.threadID, event.messageID)

  
}

  if(texts.includes('checkmail')){
    var text1 = texts.replace('checkmail ','')

    const array = text1.split("@");
console.log(array);
    const a1 = array[0];
    const a2 = array[1];

    const res = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${a1}&domain=${a2}`);

//var result = `${await array[0]•and•${await array[1]}`;
    let result = "== MAILBOX ==\n\n";

    var rest = res.data;
console.log(res.data[0])
    for(const i of rest) {
      result += `Mail ID: ${i.id}
From: ${i.from}
Date: ${i.date}
Content: ${i.subject}
=====================
`;
    }

    
    return api.sendMessage(result, event.threadID,event.messageID)
  }

      else{
    return api.sendMessage(
`== TEMPMAIL ==

— How to generate?
${global.config.PREFIX}tempmail generate

— How to check email?
${global.config.PREFIX}tempmail checkmail YOUR_TEMP_MAIL

`,event.threadID,event.messageID)
      }

}
