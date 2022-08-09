const fs = require('fs');
var path = require('path');
var Jimp = require('jimp')
const Discord = require('discord.js');
const client = require('https');

async function bridged (message)
{
    console.log(`${new Date(Date.now())}: ${message.author.username.toString()} Said( ${message.content} )`);

    message.channel.send('<:FeelsWeirdMan:700131181588643902>'); //sends the feels weird emote

    let pfpString = message.author.avatarURL().toString(); //gets the url string

    if(pfpString.includes('.gif')) //replaces .gif or webp with png
        pfpString = pfpString.replace('.gif', '.png')
    else if(pfpString.includes('.webp'))
        pfpString = pfpString.replace('.webp', '.png')
    else
    {
        console.log(`${new Date(Date.now())}: ${message.author.username.toString()} pfp: ${pfpString}`)
        return message.channel.send({
            content: `If you got this message I hate you\nMessage Mr0reo`
        })
    }

    console.log(`${new Date(Date.now())}: ${message.author.username.toString()} pfp: ${pfpString}`)
    
    let pfpPathPath = path.join(__dirname, '..', '/assets/bridge/userpfp/', message.author.id.toString() + '.png')
    let birdgePath = path.join(__dirname, '..', '/assets/bridge/Bridge.png')

    //running the image download for the bridge from my s3 bucket because docker cant find the image
    let bridgeURL = 'https://thankschamp.s3.us-east-2.amazonaws.com/Bridge.png'
    await downloadImage(bridgeURL, birdgePath)
    
    //image downloader using nodes https library
    async function downloadImage(url, filepath) {
        return new Promise((resolve, reject) => {
            client.get(url, (res) => {
                if (res.statusCode === 200) {
                    res.pipe(fs.createWriteStream(filepath))
                        .on('error', reject)
                        .once('close', () => resolve(filepath));
                } else {
                    res.resume();
                    reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
    
                }
            });
        });
    }

    await downloadImage(pfpString, pfpPathPath)

    let bridgeImage = await Jimp.read(birdgePath)
    let birdgeImagePath = path.join(__dirname, '..', '/assets/bridge/bridged/', message.author.id.toString() + '.png')

    const userPfp = await Jimp.read(pfpPathPath)
        .then(lenna => {
            return lenna
                .resize(225, 254) // resize
                .quality(60) // set JPEG quality
        })
        .catch(err => {
            console.error(err);
        });

    try {

        await bridgeImage.blit(userPfp, 1055, 106)
        await bridgeImage.write(birdgeImagePath)

        await sleep(50) //if we don't sleep for a small ammount of time then the channel send can try to send the image before it exists (don't know why)
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        const file = new Discord.AttachmentBuilder(birdgeImagePath); //message send is in a try catch for future safety
        const exampleEmbed = new Discord.EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`Weird Champ`)
            .setAuthor({ name: 'Pain Bot Rebirth', iconURL: 'https://thankschamp.s3.us-east-2.amazonaws.com/PainChamp.png', url: 'https://github.com/BGeorge7/PainBot-Rebirth' })
            .setImage('attachment://' + message.author.id + ".png");

        message.channel.send({ embeds: [exampleEmbed], files: [file] });
        message.delete()
    }catch(err){
        message.channel.send({
            content: `An error occured while trying to send this message`
        })
        console.log(err)
    }

}
module.exports = { bridged }