const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // references the 'user' string name Model
    },
    text: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String,
    },
    likes:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            username: {
                type: String
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model('post', PostSchema);