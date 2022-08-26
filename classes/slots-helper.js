
const emojiEnum =
{
    OneHundred: '<:100s:1011753004304695296>',
    Kekw: '<:kekw:1011753286438756372>',
    OneK: '<:1k:1011753221477380116>',
    Chad: '<:chad:1011753465623617667>',
    OneHead: '<:1head:1011753170285903912>',
    ThreeHead: '<:3head:1011753120897974288>',
    FourHead: '<:4head:1011753066204246126>',
    DamnH: '<:damnh:1011753492479750144>',
    Healthcare: '<:healthcare:1011753254780145735>',
    Love: '<:love:1011753439274991718>'
}

const emojiEnumArr = Object.keys(emojiEnum).map(
    (key) => [
        String(key), emojiEnum[key]
    ])

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

function enumTester()
{
    console.log(emojiEnumArr)
}

function randomizeBoard()
{
    let resultsArr = []
    //Num 1
    resultsArr.push(emojiEnumArr[Math.floor(Math.random() * 10)])
    //Num 2
    resultsArr.push(emojiEnumArr[Math.floor(Math.random() * 10)])
    //Num 3
    resultsArr.push(emojiEnumArr[Math.floor(Math.random() * 10)])

    //console.log(resultsArr)

    return resultsArr;
}

function embedRollResults(embed, boardArr, title, infoText, balance, color)
{
    embed.fields[0].name = '╭―╮\n\u2008│'+ boardArr[0][1] +'\u2009│\n╰―╯'
    embed.fields[1].name = '╭―╮\n\u2008│'+ boardArr[1][1] +'\u2009│\n╰―╯'
    embed.fields[2].name = '╭―╮\n\u2008│'+ boardArr[2][1] +'\u2009│\n╰―╯'
    embed.fields[4].name = `Balance: ${balance}`
    embed.fields[3].name = '```'+infoText+'```'
    embed.data.title = title
    embed.data.color = color

    return embed
}

function payoutChecker(boardArr)
{
    let numOneK = 0
    boardArr.forEach(roll =>{ //counts how many 1k are in the arr
        if(roll[1] === emojiEnum.OneK)
            numOneK+=1
    })

    if(numOneK == 3) 
    {
        return 21 //3 1k = x21
    }
    else if(numOneK == 2) 
    {
        return 14 //2 1k = x14
    }
    else if(numOneK == 1) 
    {
        return 7 //1 1k = x7
    }

    let isAnyHead = true
    boardArr.forEach(roll =>{
        if(!(roll[1] === emojiEnum.OneHead || roll[1] === emojiEnum.ThreeHead || roll[1] === emojiEnum.FourHead))
            isAnyHead = false
    })

    if(isAnyHead)
    {
        return 750 //Any Head = x750
    }
    else if(boardArr[0][1] === emojiEnum.FourHead && boardArr[1][1] === emojiEnum.FourHead && boardArr[2][1] === emojiEnum.FourHead)
    {
        return 3000 //3 4head = x3000
    }
    else if(boardArr[0][1] === emojiEnum.ThreeHead && boardArr[1][1] === emojiEnum.ThreeHead && boardArr[2][1] === emojiEnum.ThreeHead)
    {
        return 2000 //3 3head = x2000
    }
    else if(boardArr[0][1] === emojiEnum.OneHead && boardArr[1][1] === emojiEnum.OneHead && boardArr[2][1] === emojiEnum.OneHead)
    {
        return 1000 //3 1head = x1000
    }
    else if(boardArr[0][1] === emojiEnum.Healthcare && boardArr[1][1] === emojiEnum.Healthcare && boardArr[2][1] === emojiEnum.Healthcare)
    {
        return 500 //3 Healthcare = x500
    }
    else if(boardArr[0][1] === emojiEnum.Kekw && boardArr[1][1] === emojiEnum.Kekw && boardArr[2][1] === emojiEnum.Kekw)
    {
        return 250 //3 Kekw = x250
    }
    else if(boardArr[0][1] === emojiEnum.Love && boardArr[1][1] === emojiEnum.Love && boardArr[2][1] === emojiEnum.Love)
    {
        return 169 //3 Kekw = x169
    }
    else if(boardArr[0][1] === emojiEnum.Chad && boardArr[1][1] === emojiEnum.Chad && boardArr[2][1] === emojiEnum.Chad)
    {
        return 100 //3 Kekw = x100
    }
    else if(boardArr[0][1] === emojiEnum.DamnH && boardArr[1][1] === emojiEnum.DamnH && boardArr[2][1] === emojiEnum.DamnH)
    {
        return 100 //3 Kekw = x50
    }

    return 0 //In case of no winnings

}
module.exports = { embedSetBet, embedSetInfoField, enumTester, randomizeBoard, embedRollResults, payoutChecker }