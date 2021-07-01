const express = require('express');
const router = express.Router();

//@route    GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send('API: Profile Route');
});



module.exports = router;