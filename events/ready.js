const dbConnect = require("../database/connet-db")


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await dbConnect.connectToDB()
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};