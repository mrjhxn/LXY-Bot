module.exports.config = {
	name: "playpick", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.5.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "Plue", // Công nhận module sở hữu là ai
	description: "play totopick", // Thông tin chi tiết về lệnh
	commandCategory: "general", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "[scissors/paper/rock]", // Cách sử dụng lệnh
	cooldowns: 5
};

module.exports.run = function({ api, event, args }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯
	let items = {
		"scissor": 0,
		"paper": 1,
		"rock": 2
	}
	if (!Object.keys(items).includes(args[0])) return api.sendMessage("Invalid selection", event.threadID);
	let player = items[args[0]];
	let random = Math.floor(Math.random() * 3);
	let bot = Object.values(items)[random];
	let msg = `=== 𝗣𝗟𝗔𝗬 𝗣𝗜𝗖𝗞 ===\n\nYou choose: ${args[0]}\nThe bot chooses: ${Object.keys(items)[random]}\n`;
	if (player == bot) msg += "Draw";
	else if (player - bot == -1 || player - bot == 2) msg += "You win";
	else msg += "You lose";
	return api.sendMessage(msg, event.threadID);
}