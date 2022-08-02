const { SlashCommandBuilder } = require('discord.js');
const db = require("../../database/utils/connect-db")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot and closes gracfully'),
	async execute(interaction, client) {

		await interaction.reply('Bot is stopping....');
		await db.dbConnection.close();
		process.exit();
	},
};