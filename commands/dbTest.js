const { SlashCommandBuilder } = require('discord.js');
//const db = require("../database/utils/connect-db")
//const userSchema = require("../database/schemas/user-schema")
const users = require("../database/utils/user-db")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dbtest')
		.setDescription('Some test command'),
	async execute(interaction, client) {

        // const user = {
        //     userId: interaction.member.id

        // }
        // await new userSchema(user).save()
		// interaction.reply('Insert!');

		let myUser = await users.findUser(interaction.member)
		myUser.dailySteak+=1
		console.log(await users.modifyUser(myUser))
		interaction.reply({content: "yeet"})

	},
};