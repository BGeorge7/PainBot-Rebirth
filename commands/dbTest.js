const { SlashCommandBuilder } = require('discord.js');
const db = require("../database/connet-db")
const userSchema = require("../database/user-schema")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dbtest')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {

        const user = {
            userId: interaction.member.id

        }
        await new userSchema(user).save()
		interaction.reply('Insert!');
	},
};