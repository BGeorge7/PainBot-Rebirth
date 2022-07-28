module.exports = {

	name: 'interactionCreate',
    once: false,
	async execute(interaction, client) {

        const { token, ownerId} = require('../config.json');

		if (!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if(command.devFlag && interaction.member.user.id !== ownerId) 
        {
            await interaction.reply({ content: 'Only the application owner can execute that command!', 
                ephemeral: true })
            return 
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};