const { SlashCommandBuilder } = require('discord.js');
const users = require("../../database/utils/user-db")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Free money!'),
	async execute(interaction, client) {

		let myUser = await users.findUser(interaction.member)
        myUser.bal -=100
        await users.modifyUser(myUser)
       	interaction.reply({content: `+100\nYour new balance is: ${myUser.bal} brian is a bitch :dog: `})
        
	},
};