
function embedSetBet(embed, bet)
{
    embed.data.fields[4].value = `Bet: ${bet}`
    return embed
}

function embedSetInfoField(embed, text)
{
    embed.data.fields[3].name = '```' + text + '```'
    return embed
}
module.exports = { embedSetBet, embedSetInfoField }