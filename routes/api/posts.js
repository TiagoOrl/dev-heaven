const express = require('express');
const router = express.Router();

//@route    GET api/posts
// @desc    Get Posts
// @access  Public
router.get('/', (req, res) => {
    res.send('API: Posts Route');
});



module.exports = router;