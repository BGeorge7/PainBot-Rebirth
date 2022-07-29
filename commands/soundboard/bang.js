const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');

const sbPlayer = require(join(__dirname, '../../classes/sound-board-player.js'))
const commandName = 'we\'ll bang ok'
const fileLocation = join(__dirname, '../../assets/soundboard/bang.mp3')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bang')
		.setDescription(`:musical_note: ${commandName} :musical_note: `),
	async execute(interaction, client) {

        sbPlayer.sbPlayer(interaction, commandName, fileLocation, 2.0)
	},
};