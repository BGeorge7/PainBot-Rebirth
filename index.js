const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, ownerId} = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const {loadCommands} = require("./command-handler.js")
const {loadEvents} = require("./event-handler.js")

loadEvents(client)

client.commands = new Collection();
const commandsObj = loadCommands(client);

client.login(token);