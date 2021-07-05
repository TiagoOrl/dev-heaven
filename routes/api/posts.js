const authorizer = require('../../middleware/jwt_auth');
const UserPost = require('../../models/Post');
const UserProfile = require('../../models/UserProfile');
const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//@route    POST api/posts
// @desc    Create a post for the authorized/logged User
// @access  Private
router.post('/', authorizer, [
    check('text', 'A text is required for posting').not().isEmpty(),
    check('title', 'A title is needed for posting').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
        return res.status(400).json({errors: errors.array()});


    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            title: req.body.title,
            name: user.name,
            avatar: user.avatar,
            user_id: req.user.id
        }

        let userPostModel = new UserPost(newPost);
        await userPostModel.save();
        return res.json(userPostModel);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Internal error" });
    }

    
});


//@route    GET api/posts
// @desc    Get all posts from the platform
// @access  Public
router.get('/', async (req, res) => {
    
    try {
        const allPosts = await UserPost.find()
            .populate('user', ['name','email','avatar']);

        return res.json(allPosts);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


module.exports = router;