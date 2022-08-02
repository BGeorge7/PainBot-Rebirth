const { SlashCommandBuilder } = require('discord.js');
const users = require("../../database/utils/user-db")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Free money!'),
	async execute(interaction, client) {

		let myUser = await users.findUser(interaction.member)

		let dailyTimeStamp = new Date(myUser.dailyTimeStamp) //A mess that lets me add one fucking day
		dailyTimeStamp.setDate(dailyTimeStamp.getDate())
		let roundedNow = new Date(new Date(Date.now()).setHours(0, 0, 0, 0)) //rounds todays date down to the nearest date (I know it hurts to look at. but it works)

		let diff = roundedNow - dailyTimeStamp //difference between the current date and dailyTimeStamp

		if (dailyTimeStamp < roundedNow)
		{
			if(new Date(diff).getDate() === 1) //if the number of days that have passed since the last daily is more than 1. the streak is not applied
				myUser.dailyStreak += 1
			else
				myUser.dailyStreak = 1

			let dailyBonus = 100*(myUser.dailyStreak >= 5 ? 5 : myUser.dailyStreak) //if the dailystreak is greater than or equal to 5 then set the multiplier to 5
        	myUser.bal += dailyBonus
			myUser.dailyTimeStamp = Date.now()
			await users.modifyUser(myUser)
			console.log(`${new Date(Date.now())}: ${interaction.user.tag}: Ran daily`)
       		interaction.reply({content: `+${dailyBonus}\nYour new balance is: ${myUser.bal}`})
		} 
		else 
		{
			//take the current date minus the current date rounded down MINUS zero (start of unix time) gets you how many hours left in the day
			let fullTimeLeft =  new Date(new Date(0) - new Date(Date.now()-roundedNow)).toISOString()  
			//extracts the hours and minutes
			let formatedTimeLeft = fullTimeLeft.slice(fullTimeLeft.search('T')+1, fullTimeLeft.lastIndexOf(':'))
			console.log(`${new Date(Date.now())}: ${interaction.user.tag}: Ran daily, but it was not ready`)
			interaction.reply({content: `Your daily is not ready yet!\nYour daily will reset in ${formatedTimeLeft}`})
		}
	},
};