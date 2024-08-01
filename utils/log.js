const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
				console.log(chalk.bold.hex("#f5d271").bold('[ WARN ] • ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#ff0000").bold('[ ERROR ] • ') + data);
			break;
		default:
				console.log(chalk.bold.hex("#919cff").bold(`${option} [ Yuto ] • `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#f5d271").bold('[ WARN ] • ') + data);
			break;
		case "error":
		console.log(chalk.bold.hex("#ff0000").bold('[ ERROR ] • ') + data);
			break;
		default:
	console.log(chalk.bold.hex("#919cff").bold(`[ FIXED ] • `) + data);
			break;
	}
}