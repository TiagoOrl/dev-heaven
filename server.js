const express = require('express');
const connectDB = require('./config/db');

const app = express()

// connect db
connectDB();

// init Middleware
app.use(express.json({extended: false})); // allows to get body data from request endpoint


app.get('/', (req, res) => res.send('Hello world from API!'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/user_profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});






