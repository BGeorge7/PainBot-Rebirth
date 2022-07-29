const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');

const sbPlayer = require(join(__dirname, '../../classes/sound-board-player.js'))
const commandName = 'That\'s cap!'
const fileLocation = join(__dirname, '../../assets/soundboard/cap.mp3')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cap')
		.setDescription(`:musical_note: ${commandName} :musical_note: `),
	async execute(interaction, client) {

        sbPlayer.sbPlayer(interaction, commandName, fileLocation, 0.5)
	},
};