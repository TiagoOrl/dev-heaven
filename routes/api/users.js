const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

//@route    POST api/users
// @desc    Create user
// @access  Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password',' Please enter a password with 6 or more chars')
        .isLength({min: 6})

], (req, res) => {
    const errors = validationResult(req);

    // if there are errors in the body response...
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.send('API: Post users');
});



module.exports = router;