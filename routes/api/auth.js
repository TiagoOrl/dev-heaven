const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
const config = require('config');
const User = require('../../models/User');
const auth = require('../../middleware/jwt_auth');
const express = require('express');


const router = express.Router();


//@route    GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {   // 2nd parameter is middleware
    
    try {
        const user = await User.findById(req.user.id).select('-password');  // get authenticated user
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
});

//@route    POST api/auth
// @desc    LOGIN user and get token
// @access  Public
router.post('/',[
    check('email', 'Please include a valid Email').isEmail(),
    check('password',' Password is required').exists()

], 
async (req, res) => {
    const errors = validationResult(req);

    // if there are errors in the body response...
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    

    const {email, password} = req.body;

    try {
        // se if user exists
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ errors: [{msg: 'Error trying to login.' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Error trying to login.' }] });
        }

        // return JWT to be logged in afterwards
        const payload = {
            user: {
                id: user.id
            }
        }

        // set the user id as the payload
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000 },    // large time span for dev purposes
            (err, token) => {
                if(err) throw err;
                
                return res.json({ token });    // sends token as JSON through response
            });

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }

    
});




module.exports = router;