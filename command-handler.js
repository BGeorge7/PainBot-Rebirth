function loadCommands(client)
{

	const fs = require('node:fs');
	const path = require('node:path');
	const { REST } = require('@discordjs/rest');
	const { Routes } = require('discord.js');
	const { clientId, guildId, token } = require('./config.json');

	let commands = [];
	let commandsObj = [];
	const commandsPath = path.join(__dirname, 'commands');
	
	const getFiles = (dir, suffix) =>{
		const files = fs.readdirSync(dir,{
			withFileTypes: true,
		})
	
		let commandFiles = []

		for (const file of files) {
			if(file.isDirectory()){
				commandFiles = [
					...commandFiles,
					...getFiles(`${dir}\\${file.name}`, suffix),
				]
			} else if (file.name.endsWith(suffix)) {
				const filePath = path.join(dir, file.name);
				delete require.cache[require.resolve(filePath)]
				const command = require(filePath)
				commandFiles.push(command.data.toJSON());
				if(dir.endsWith("\\dev"))
				{
					command.devFlag = true
				}
				else 
				{
					command.devFlag = false
				}
				commandsObj.push(command)
			}
		}
	
		return commandFiles
	}
	
	commands = getFiles(commandsPath, ".js");

	commandsObj.forEach(c =>{
		client.commands.set(c.data.name, c)
	})

	const rest = new REST({ version: '10' }).setToken(token);

	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands. On NAZ'))
		.catch(console.error);

	// rest.put(Routes.applicationCommands(clientId), { body: commands })
	// 	.then(() => console.log('Successfully registered application commands. Global'))
	// 	.catch(console.error);

	return commandsObj 
}
module.exports = { loadCommands };