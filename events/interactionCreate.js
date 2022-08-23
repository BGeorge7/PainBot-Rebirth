module.exports = {

	name: 'interactionCreate',
    once: false,
	async execute(interaction, client) {

        if (interaction.isButton()) //button interaction handler
        {
            //console.log(interaction.user)
        }

        if (interaction.isChatInputCommand()) { //Slash Command Handler

            const { ownerId } = require('../config.json');

            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            if (command.devFlag && interaction.member.user.id !== ownerId) {
                await interaction.reply({
                    content: 'Only the application owner can execute that command!',
                    ephemeral: true
                })
                return
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
	},
};