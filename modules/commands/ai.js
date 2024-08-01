module.exports.config = {
	name: "ai",
	version: "3.2.1",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Ask anything!",
	commandCategory: "education",
	usages: "text",
	cooldowns: 30
};

module.exports.run = async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: global.config.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);  

  let texts = args.join(" ");
  if (!texts) return api.sendMessage(`Hi? can I help you?`, event.threadID, event.messageID);
  
try {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: `${texts}`}],
                                });
  var msg = completion.data.choices[0].message.content;
  console.log(msg);
return api.sendMessage(msg, event.threadID, event.messageID)
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
    return api.sendMessage(error.message, event.threadID, event.messageID)
  }
}
}
