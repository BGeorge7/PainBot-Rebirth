const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');

const sbPlayer = require(join(__dirname, '../../classes/sound-board-player.js'))
const commandName = 'I\'m gonna cum'
const fileLocation = join(__dirname, '../../assets/soundboard/cum.mp3')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cum')
		.setDescription(`:musical_note: ${commandName} :musical_note: `),
	async execute(interaction, client) {

        sbPlayer.sbPlayer(interaction, commandName, fileLocation, 1.0)
	},
};