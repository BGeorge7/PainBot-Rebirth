const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');

const sbPlayer = require(join(__dirname, '../../classes/sound-board-player.js'))
const commandName = 'We do a little trolling'
const fileLocation = join(__dirname, '../../assets/soundboard/trolling.mp3')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trolling')
		.setDescription(`:musical_note: ${commandName} :musical_note: `),
	async execute(interaction, client) {

        sbPlayer.sbPlayer(interaction, commandName, fileLocation, 0.7)
	},
};