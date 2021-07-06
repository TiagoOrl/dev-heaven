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
        };

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


//@route    GET api/posts/post_id
// @desc    get single post
// @access  Public
router.get('/:post_id', async (req, res) => {
    
    try {
        const post = await UserPost.findOne({ _id: req.params.post_id })
            .populate('user', ['name','email','avatar']);

    if (!post) return res.status(404).json({ msg: 'Could not find post' });

    return res.json(post);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Could not find post' });
        return res.status(500).send('Internal error');
    }
});


//@route    DELETE api/posts/:post_id
// @desc    Deletes a post from the auth user by its post Id
// @access  Private
router.delete('/:post_id', authorizer, async (req, res) => {

    try {
        
        const post = await UserPost.findById(req.params.post_id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // compare user_id from post with id from auth to check if User owns the post
        if (post.user_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'User not authorized' });

        
        
        await UserPost.findOneAndRemove({ _id: req.params.post_id });
        return res.send(`Post of Id ${req.params.post_id} deleted...`);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Could not find post' });
        return res.status(500).send('Internal error');
    }
});


//@route    PUT api/posts/like/:post_id
// @desc    Adds a like object to a post by another authorized user
// @access  Private
router.put('/like/:post_id', authorizer, async (req, res) => {

    try {
        
        const post = await UserPost.findById(req.params.post_id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });


        // check if post already has a like from this user
        if (post.likes.find( like => like.user.toString() === req.user.id ))
            return res.status(401).json({ msg: 'Already liked this post' });

        post.likes.unshift({ user: req.user.id });
        await post.save();
        
        return res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    PUT api/posts/unlike/:post_id
// @desc    Removes a like object to a post by another authorized user
// @access  Private
router.put('/unlike/:post_id', authorizer, async (req, res) => {

    try {
        
        const post = await UserPost.findById(req.params.post_id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });


        // check if post already has a like from this user
        if (!post.likes.find( like => like.user.toString() === req.user.id ))
            return res.status(401).json({ msg: 'This user hasn\'t liked this post' });

        post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);
        await post.save();
        
        return res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    POST api/posts/comment/:post_id
// @desc    Adds a comment to a post by any auth user
// @access  Private
router.post('/comment/:post_id', [authorizer, 
    check('title', 'Title must have at least 5 characters').isLength({min: 5}),
    check('text', 'Text must have at least 12 characters').isLength({min: 12})
],
async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        const post = await UserPost.findById(req.params.post_id);
        if (!post)  return res.status(400).json({msg: 'Post not found'});


        const newComment = {
            text: req.body.text,
            title: req.body.title,
            username: user.name,
            avatar: user.avatar,
            user_id: req.user.id
        };

        post.comments.unshift(newComment);
        post.save();

        return res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    DELETE api/posts/comment/:post_id/:comment_id
// @desc    Removes a comment posted by a user
// @access  Private
router.delete('/comment/:post_id/:comment_id', authorizer, async (req, res) => {

    try {
        const post = await UserPost.findById(req.params.post_id);

        if (!post) return res.status(400).json({ msg: 'Post not found' });

        comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment) return res.status(400).json({ msg: 'Comment not found' });


        if (comment.user_id.toString() !==  req.user.id)
            return res.status(401).json({ msg: 'This comment doesnt belong to this user' });

        
        post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id);
        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
    
    

});

module.exports = router;