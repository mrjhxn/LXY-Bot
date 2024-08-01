const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your name",
  description: "Retrieves random email address and email messages using the smstome.com API",
  commandCategory: "utility",
  usages: ["tempmail"],
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event }) {
  try {
    // Retrieve random email address and private key
    const randomEmailResponse = await axios.get('https://smstome.com/api/get-random-email?device_id=QQ3A.200705.002');
    const randomEmail = randomEmailResponse.data.data.email;
    const privateKey = randomEmailResponse.data.data.id;

    // Send the random email address and private key to the user
    await api.sendMessage(`Your Tempmail Address is ${randomEmail}\nYour Private Key is ${privateKey}`, event.threadID);

    // Retrieve email messages for the provided private key
    const emailMessagesResponse = await axios.get(`https://smstome.com/api/email-messages?email_id=${encodeURIComponent(privateKey)}`);
    const emailMessages = emailMessagesResponse.data.data;

    if (emailMessages.length === 0) {
      api.sendMessage('No email messages found.', event.threadID);
      return;
    }

    // Retrieve details from the first email message
    const firstEmailMessage = emailMessages[0];
    const fromName = firstEmailMessage.from_name;
    const subject = firstEmailMessage.subject;
    const message = firstEmailMessage.message;
    const attachmentUrl = firstEmailMessage.attachments[0].link;

    // Download and save the attachment image
    const attachmentImage = await axios.get(attachmentUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync('./cache/email_attachment.jpg', Buffer.from(attachmentImage.data, 'binary'));

    // Send the attachment image and the email details to the user
    await api.sendMessage({
      body: `📧 Email Details:\nFrom: ${fromName}\nSubject: ${subject}\nMessage: ${message}`,
      attachment: fs.createReadStream('./cache/email_attachment.jpg')
    }, event.threadID);

    // Delete the temporary attachment image file
    fs.unlinkSync('./cache/email_attachment.jpg');
  } catch (error) {
    console.error('Error retrieving email messages:', error);
    api.sendMessage('Failed to retrieve email messages.', event.threadID);
  }
};