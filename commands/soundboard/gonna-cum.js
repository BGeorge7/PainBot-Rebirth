const { SlashCommandBuilder } = require('discord.js');

const { createAudioPlayer, createAudioResource, AudioPlayerStatus, joinVoiceChannel } = require('@discordjs/voice');
const { join } = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cum')
		.setDescription(':musical_note: I\'m gonna cum :musical_note: '),
	async execute(interaction, client) {

        const player = createAudioPlayer();
        const resource = createAudioResource(join(__dirname, '../../assets/cum.mp3'))
        const voicCh = interaction.member.voice

        if(!voicCh.channelId) 
        { 
            console.log(`${new Date(Date.now())}: ${interaction.user.tag}: Was not in a voice channel`)
            return interaction.reply({
                content: "You are not in a voice channel!"
            });
        }

        const connection = joinVoiceChannel({
            channelId: voicCh.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator
        })
    
        player.play(resource);
        connection.subscribe(player);

        player.once(AudioPlayerStatus.Playing, () => {
            console.log(new Date(Date.now()) + ': I\'m gonna cum is playing');

            interaction.reply({
                content: ":musical_note: I\'m gonna cum :musical_note:"
            });
        })

        player.on('error', error => {
            console.error(new Date(Date.now()) + ': ' + error);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy()
            console.log(new Date(Date.now()) + ': PainBot has left the voice channel')
        });
	},
};