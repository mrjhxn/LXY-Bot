const axios = require('axios');

module.exports.config = {
	name: 'ai2',
	version: '1.0.0',
	hasPermssion: 2,
	credits: 'NTKhang',
	description: 'OpenAI ChatGPT',
	commandCategory: 'Tiện ích',
	usages: 'text | img <text>',
	cooldowns: 5
};

module.exports.run = async function ({
	api, event, args
}) {
	switch (args[0]) {
		case 'img':
		case 'image': {   
			if (!args[1])
				return api.sendMessage('Vui lòng nhập nội dung', event.threadID, event.messageID);
			const response = await axios({
				url: 'https://APITHANHALIsharon.shar0n.repl.co/openai/imagecreate?apikey=ThanhAliVip_1234567890&size=1024x1024&query=' + encodeURIComponent(args.slice(1).join(' ')),
				method: 'GET'
			});
			const imageUrl = response.data.data[0].url;
			const image = await axios.get(imageUrl, {
				responseType: 'stream'
			});
			image.data.path = `image.png`;
			return api.sendMessage({
				attachment: image.data
			}, event.threadID, event.messageID);
		}
		default: {
			if (!args[0])
				return api.sendMessage('Vui lòng nhập nội dung', event.threadID, event.messageID);
			const response = await axios({
				url: 'https://APITHANHALIsharon.shar0n.repl.co/openai/chat?apikey=ThanhAliVip_1234567890&query=' + encodeURIComponent(args.join(' ')),
				method: 'GET'
			});
			const text = response.data.text;
			return api.sendMessage(text, event.threadID, event.messageID);
		}
	}
};