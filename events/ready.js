const dbConnect = require("../database/utils/connect-db")
const {branch} = require("../config.json")


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		await dbConnect.connectToDB()
		client.user.setPresence({ 
			activities: [{ 
				name: 'Now with slash commands!',
				type: 0
			}] 
		});
		console.log(`Ready! Logged in as ${client.user.tag}, Running on ${branch}`);
	},
};