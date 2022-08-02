const { SlashCommandBuilder } = require('discord.js');
const users = require("../../database/utils/user-db")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {

		let myUser = await users.findUser(interaction.member)
       	interaction.reply({content: `Your current balance is: ${myUser.bal}`})
	},
};