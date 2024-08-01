const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "bard",
  version: "0.0.1",
  hasPermission: 0,
  credits: "CHARDS BOT",
  description: "Mirai Bard Version",
  commandCategory: "entertainment",
  usage: "(question) or Reply image",
  cooldowns: 20,
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const query = event.body.slice(5).trim();
  let d = "";

  if (event.type == "message_reply") {
    d = event.messageReply.attachments[0]?.url;
  }

  console.log(d);

  let queryFromImage = "";
  if (d) {
    const rest = await axios.get(`https://chardsbot-api.joshuag06.repl.co/imgur?link=${encodeURIComponent(d)}`);
    const imgs = rest.data.uploaded.image;

    const resttext = await axios.get(`https://image-to-text.joshuag06.repl.co/img2text?imageurl=${encodeURIComponent(imgs)}`);
    queryFromImage = resttext.data.text;
  }

  const combinedQuery = query || queryFromImage;

  if (!combinedQuery) {
    api.sendMessage("Could you kindly share your inquiry or pose a question?", threadID, messageID);
    return;
  }

  api.sendMessage("We are currently searching for an answer. Please hold on while we find the information you're looking for...", threadID, messageID);

  try {
    const response = await axios.get(`https://chards-test-api.joshuag06.repl.co/bard?text=${encodeURIComponent(combinedQuery)}`);
    const { content, images } = response.data.newResponse;

    if (content && content.length > 0) {
      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      const attachments = [];
      for (let i = 0; i < images.length; i++) {
        const imagePath = `cache/test${i + 1}.png`;

        try {
          const imageResponse = await axios.get(images[i].url, { responseType: "arraybuffer" });
          fs.writeFileSync(imagePath, imageResponse.data);
          attachments.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("An error has occurred during the process of downloading and saving the photo. Apologies for the inconvenience.", error);
        }
      }

      // Add \n and bold formatting to the content, and remove asterisks
      const formattedContent = content.replace(/\\n/g, '\n');
      const modifiedContent = formattedContent.replace(/\*([^*]+)\*/g, '**$1**');
      const finalContent = modifiedContent.replace(/\*/g, '');

      // Add Title and Url text for each image
      const modifiedImages = images.map((image) => {
        const imageUrl = `[Title: ${image.tag}]\n${image.url}`;
        return imageUrl.replace(/\[Image of ([^\]]+)\]/g, 'Title: $1').replace(/\(([^)]+)\)/g, 'Url: $1');
      });

      api.sendMessage({ attachment: attachments, body: finalContent, mentions: [] }, threadID, messageID);
    } else {
      api.sendMessage(content, threadID, messageID);
    }
  } catch (error) {
    console.error("An error has occurred while attempting to fetch data from the Bard API. We apologize for the inconvenience and will work to resolve the issue as soon as possible.", error);
    api.sendMessage("We regret to inform you that the attempt to fetch data from the API has failed. We apologize for the inconvenience and will address the issue promptly.", threadID, messageID);
  }
};
