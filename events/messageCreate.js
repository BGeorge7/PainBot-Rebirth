const dbConnect = require("../database/utils/connect-db")
const {bridge} = require("../config.json")
const {bridged} = require ('../classes/bridge.js')


module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {

        if(message.author.bot) {return} //checks if the message came from a bot

        const bridgeDict = bridge.Dictionary
        const text = message.content.toLowerCase()

        if(text.includes(bridgeDict[5], 0) || bridgeCheckAnyWord(text, bridgeDict)) //Checks if the message contains the key word in the dictionary json
        {
            bridged(message)
        }
       
	},
};

function bridgeCheckAnyWord(text, bridgeDict)
{
    for(i = 0; i < bridgeDict.length; i++)//checks if the message in its entirety is any of the key words
    {
        if(text === bridgeDict[i])
        {
            return true;
        }
    }
    return false;
    
}