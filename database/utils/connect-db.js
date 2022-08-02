const {mongoose, connection} = require("mongoose")
const { dbConnectionURI } = require('../../config.json')


async function connectToDB() {
    mongoose.connect(dbConnectionURI,{
         keepAlive: true
    })
}

exports.connectToDB = connectToDB
exports.dbConnection = connection

connection.on('error', err => {
    console.log(`${new Date(Date.now())}: ${err}`)
})

connection.on('open', () => {
    console.log(`${new Date(Date.now())}: Connected to the DB`)
})

connection.on('close', () => {
    console.log(`${new Date(Date.now())}: Connection to the DB closed`)
})