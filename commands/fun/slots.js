const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const users = require("../../database/utils/user-db")
const { join } = require('node:path');
const slotsHelper = require(join(__dirname, '../../classes/slots-helper.js'))

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slots')
		.setDescription('playing slots with my life!')
        .addSubcommand((options) =>
		options
		.setName("table")
		.setDescription("Shows the game table"))
        .addSubcommand((options) =>
		options
		.setName("start")
		.setDescription("Starts the slots game")),
	async execute(interaction, client) {
        
        const sub = interaction.options.getSubcommand();

        switch(sub) {
			case "table": {
				interaction.reply({content: "https://thankschamp.s3.us-east-2.amazonaws.com/PainBot_Rebirth/game+table.png"})
			}
			break;
			case "start": {
				startSlots(interaction, client)
			}
			break;
        }

        
	},
};

async function startSlots(interaction, client)
{

    let myUser = await users.findUser(interaction.member)
    let currentBet = 5
    const roll = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('bSlotsRoll')
					.setLabel('Roll')
					.setStyle(ButtonStyle.Primary)
                    .setDisabled(false),
			)
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bSlotsStop')
                    .setLabel('Stop')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(false),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bSlotsPlus')
                    .setLabel('➕')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(false),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bSlotsMinus')
                    .setEmoji('➖')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(false),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bSlotsMax')
                    .setLabel('Max Bet')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(false),
            )

        embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`Slots!`)
            .setAuthor({ name: 'Pain Bot Rebirth', iconURL: 'https://thankschamp.s3.us-east-2.amazonaws.com/PainChamp.png', url: 'https://github.com/BGeorge7/PainBot-Rebirth' })
            .setThumbnail('https://thankschamp.s3.us-east-2.amazonaws.com/PainBot_Rebirth/1655922964casino-svgrepo-com.png')
            .addFields(
                //{ name: '\u200B', value: '\u200B' },
                { name: '╭―╮\n\u2008│❤\u200A│\n╰―╯', value: '\u200B', inline: true },
                { name: '╭―╮\n\u2008│💎\u2009│\n╰―╯', value: '\u200B', inline: true },
                { name: '╭―╮\n\u2008│🍒\u200A│\n╰―╯', value: '\u200B', inline: true },
                { name: '```Press \"Roll\" to start```', value: '\u200B' },
                { name: `Balance: ${myUser.bal}`, value: `Bet: ${currentBet}` },
            )
            .setTimestamp();

		const message = await interaction.reply({ //original Message
            embeds: [embed], 
            components: [roll], 
        }); 

        const filter = (btnInt) => {
            //btnInt.deferReply()
            return interaction.user.id === btnInt.user.id && btnInt.message.interaction.id === message.id
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 30000,
        })

        collector.on('collect', (i) =>{
            let receivedEmbed = i.message.embeds[0];

            if (i.customId === 'bSlotsRoll') {

                receivedEmbed.data.fields[3].name = '```' + Math.floor((Math.random() * 100) + 1) + '```'
                collector.resetTimer(30000)
                i.update({ embeds: [receivedEmbed] })
            }
            else if(i.customId === 'bSlotsStop') {

                receivedEmbed = slotsHelper.embedSetInfoField(receivedEmbed, 'Thanks for playing!')
                i.deferUpdate()
                message.interaction.editReply({embeds: [receivedEmbed]})
                collector.stop()
            }
            else if(i.customId === 'bSlotsPlus'){
                currentBet += currentBet === 25 ? 0 : 5
                receivedEmbed = slotsHelper.embedSetBet(receivedEmbed, currentBet)
                i.deferUpdate()
                message.interaction.editReply({embeds: [receivedEmbed]})
            }
            else if(i.customId === 'bSlotsMinus'){
                currentBet -= currentBet === 0 ? 0 : 5
                receivedEmbed = slotsHelper.embedSetBet(receivedEmbed, currentBet)
                i.deferUpdate()
                message.interaction.editReply({embeds: [receivedEmbed]})
            }
            else if(i.customId === 'bSlotsMax'){
                receivedEmbed = slotsHelper.embedSetBet(receivedEmbed, currentBet=25)
                i.deferUpdate()
                message.interaction.editReply({embeds: [receivedEmbed]})
            }

        })
        collector.on('end', async (i)=>{
            roll.components[0].data.disabled = true
            roll.components[1].data.disabled = true
            roll.components[2].data.disabled = true
            roll.components[3].data.disabled = true
            roll.components[4].data.disabled = true
           
            message.interaction.editReply({components: [roll]})
            
            console.log('End!')
        })

}