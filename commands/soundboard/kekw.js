const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');

const sbPlayer = require(join(__dirname, '../../classes/sound-board-player.js'))
const commandName = 'kekw'
const fileLocation = join(__dirname, '../../assets/soundboard/KEKW.mp3')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kekw')
		.setDescription(`:musical_note: ${commandName} :musical_note: `),
	async execute(interaction, client) {

        sbPlayer.sbPlayer(interaction, commandName, fileLocation, 0.7)
	},
};