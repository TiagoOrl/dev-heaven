const mongoose = require('mongoose');
const config = require('config');



// this module is responsible for connecting mongoose to remote mongoDB database
const db = config.get('mongoURI');
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected...');

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}


module.exports = connectDB;