const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bal: {
        type: Number,
        default: 0
    },
    dailyStreak: {
        type: Number,
        default: 1,
    },
    dailyTimeStamp: {
        type: Date,
        default: 0
    }
    
},
{
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema)