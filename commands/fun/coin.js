const { SlashCommandBuilder, Options } = require('discord.js');
const users = require("../../database/utils/user-db")
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coin')
		.setDescription('Flips a coin and tests your luck')
		.addStringOption(option =>
			option.setName('face')
			.setDescription('Coin face')
			.setRequired(true)
			.addChoices(
				{name: 'Heads', value: 'Heads'},
				{name: 'Tails', value: 'Tails'}
			))
		.addIntegerOption(option =>
			option.setName('bet')
			.setDescription('Bet amount')
			.setRequired(true)
			.setMinValue(0)),
	async execute(interaction, client) {

		let embed;

		let myUser = await users.findUser(interaction.member)

        let genNum = Math.floor((Math.random() * 100) + 1)
		let result = (genNum <= 50) ? 'Heads' : 'Tails'
        genNum = (genNum <= 50) ? 0 : 1

        if(myUser.bal < interaction.options.getInteger('bet'))
		{
			return interaction.reply({content: "Balance is to low!"})
        }
		else
		{
			if(interaction.options.getString('face').toString() === result)
			{
				myUser.bal += interaction.options.getInteger('bet')

				embed = new EmbedBuilder()
					.setColor(0x00FF00)
					.setTitle(`You got ${result}!`)
					.setAuthor({name: 'Pain Bot Rebirth', iconURL: 'https://thankschamp.s3.us-east-2.amazonaws.com/PainChamp.png', url: 'https://github.com/BGeorge7/PainBot-Rebirth'})
					.setDescription(`You won ${interaction.options.getInteger('bet')}!`)
					.setImage((result === 'Tails') ? 'https://thankschamp.s3.us-east-2.amazonaws.com/tails.png' : 'https://thankschamp.s3.us-east-2.amazonaws.com/Heads.png')
					.setTimestamp();
				interaction.reply({embeds: [embed]})
			}
			else
			{
				myUser.bal -= interaction.options.getInteger('bet')
				embed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setTitle(`You got ${result}!`)
					.setAuthor({name: 'Pain Bot Rebirth', iconURL: 'https://thankschamp.s3.us-east-2.amazonaws.com/PainChamp.png', url: 'https://github.com/BGeorge7/PainBot-Rebirth'})
					.setDescription(`You lost ${interaction.options.getInteger('bet')}!`)
					.setImage((result === 'Tails') ? 'https://thankschamp.s3.us-east-2.amazonaws.com/tails.png' : 'https://thankschamp.s3.us-east-2.amazonaws.com/Heads.png')
					.setTimestamp();
				interaction.reply({embeds: [embed]})
			}
			await users.modifyUser(myUser)
		}

	},
};