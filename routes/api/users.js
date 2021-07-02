const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route    POST api/users
// @desc    Create user
// @access  Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password',' Please enter a password with 6 or more chars')
        .isLength({min: 6})

], 
async (req, res) => {
    const errors = validationResult(req);

    // if there are errors in the body response...
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    

    const {name, email, password} = req.body;

    try {
        // se if user exists
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({ errors: [{msg: 'User already exists' }] });
        }

        // get users gravatars
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        
        // creates the user
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // commit to DB
        await user.save();

        // return JWT to be logged in afterwards
        const payload = {
            user: {
                id: user.id
            }
        }

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