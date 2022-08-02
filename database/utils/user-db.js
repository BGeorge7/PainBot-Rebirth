const db = require('./connect-db')
const userSchema = require("../schemas/user-schema")
const { DiscordUser } = require('discord.js')

async function findUser(user) {

    try {
        const result = await userSchema.findOneAndUpdate({ //functions like a find OR create feature
            userId: user.id
        },
            {
                userId: user.id
            },
            {
                upsert: true,
                new: true
            })
        return result
    } catch (err) {
        console.log(err)
    }
}

async function modifyUser(modifiedUser) {
    try {
        const result = await userSchema.findOneAndUpdate({
            userId: modifiedUser.userId
        },
            modifiedUser,
            {
                new: true
            }
        )

        return result;
    } catch (err) {
        console.log(err)
    }

}
exports.modifyUser = modifyUser
exports.findUser = findUser