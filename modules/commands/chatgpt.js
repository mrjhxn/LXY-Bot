module.exports.config = {
	name: "gpt3",
	version: "3.2.1",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Ask anything!",
	commandCategory: "education",
	usages: "text",
	cooldowns: 120
};

module.exports.run = async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: global.config.OPENAI_KEY
    //"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",
  //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
  //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 - working
  //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 - working
  //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 - bill
  //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 - working
  //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 - Dec - working
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
