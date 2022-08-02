const dbConnect = require("../database/utils/connect-db")


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await dbConnect.connectToDB()
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};