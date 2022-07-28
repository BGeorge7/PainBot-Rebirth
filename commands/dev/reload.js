const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');
const {loadCommands} = require("../../command-handler.js")
const {loadEvents} = require("../../event-handler.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload you commands/events')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand((options) =>
		options
		.setName("commands")
		.setDescription("Reloads commands"))
		.addSubcommand((options) =>
		options
		.setName("events")
		.setDescription("Reloads events")),

	async execute(interaction, client) {
		const sub = interaction.options.getSubcommand();

		switch(sub) {
			case "events": {
				loadEvents(client)
				interaction.reply({content: "Reloaded the events"})
			}
			break;
			case "commands": {
				loadCommands(client);
				interaction.reply({content: "Reloaded the commands"})
			}
			break;
		}
		

	},
};