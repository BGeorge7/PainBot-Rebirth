
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent] 
});

const {loadCommands} = require("./classes/command-handler.js")
const {loadEvents} = require("./classes/event-handler")

loadEvents(client)

client.commands = new Collection();
const commandsObj = loadCommands(client);

client.login(token);