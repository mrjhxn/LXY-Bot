module.exports.config = {
	name: "openai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Ask anything",
	commandCategory: "words",
	usages: "[text]",
	cooldowns: 30
};

module.exports.run = async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: global.config.OPENAI_KEY
    //"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",
  //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
  //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 - online
  //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 - working
  //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 - working
  //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 - working
  //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 - working
  //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 - working
  //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 - working
  //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 - working
  //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 - working
  //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 - working
  
                        });
const openai = new OpenAIApi(configuration);  

  let texts = args.join(" ");
  if (!texts) return api.sendMessage(`Can't Answer!`, event.threadID, event.messageID);
  
try {
  const completion = await openai.createCompletion({
     model: "text-davinci-003",
    prompt: `${texts}`,
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty:0.0,
  });
  console.log(`OPEN AI:\n${completion.data.choices[0].text}\n`);
return api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID)
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
}
}
