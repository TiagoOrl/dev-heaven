const  mongoose = require('mongoose');

// creates the model Schema from mongoose for the DB
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// building the model from the string name and Schema defined with mongoose
module.exports  = user = mongoose.model('user', UserSchema);