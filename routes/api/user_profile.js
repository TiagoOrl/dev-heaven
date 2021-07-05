const config = require('config');
const request = require('request');
const {check, validationResult} = require('express-validator/check');
const UserProfile = require('../../models/UserProfile');
const User = require('../../models/User');
const authenticator = require('../../middleware/jwt_auth');
const express = require('express');
const router = express.Router();


//@route    GET api/profile/user/:user_id
// @desc    Get profile by User Id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const user_profile = await UserProfile
            .findOne({user: req.params.user_id})    // find user profile by the "foreign key"
            .populate('user', ['name','avatar']);


        if (!user_profile){
            return res.status(400).json({ msg: 'Could not find profile for this user' });
        }

        return res.json(user_profile);

    } catch (error) {
        console.error(error.message);
        
        // check if Id string passed to the URL is not a ObjectId type
        if (error.kind === 'ObjectId')
            return res.status(400).json({ msg: 'Could not find profile for this user' });

        return res.status(500).send('Internal error');
    }
});

//@route    GET api/profile
// @desc    get all profiles route
// @access  Public
router.get('/', async (req, res) => {
    try {
        const allProfiles = await UserProfile.find()
            .populate('user', ['name','avatar']);

        return res.json(allProfiles);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});

//@route    GET api/profile/me
// @desc    Get the unique profile from the current user authenticated/logged in
// @access  Private
router.get('/me', authenticator, async (req, res) => { // add authenticator middleware to protect API route

    try {
        // req.user.id comes from the auth token
        const userProfile = await UserProfile.findOne({ user: req.user.id  })
            .populate('user',['name', 'avatar']); // Join object references from User

        if (!userProfile) 
            return res.status(400).json({ msg: 'There is no profile for this user' });
        
        return res.json(userProfile);


    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    POST api/profile
// @desc    create or update a new profile for the user
// @access  Private
router.post('/', [authenticator,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()

], 
    async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        github_username,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin

    } = req.body;   // full data from the body request and assign to variables

    const profileFields = {};   // object created to be inserted in DB
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (github_username) profileFields.github_username = github_username;
    
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
        console.log(profileFields.skills);
    }

    
    // add and Build social object in profileFields
    profileFields.social = {};

    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;


    try {
        
        let userProfileModel = await UserProfile.findOne( {user: req.user.id } );

        if (userProfileModel){
            // update the users profile
            userProfileModel = await UserProfile.findOneAndUpdate(
                { user: req.user.id }, { 
                $set: profileFields}, 
                { new: true }
                );

            return res.json(userProfileModel);
        }

        // Create new profile for the user
        userProfileModel = new UserProfile(profileFields);
        await userProfileModel.save();
        return res.json(userProfileModel);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }


});


//@route    DELETE api/profile
// @desc    Delete user, profile and posts associated with this user
// @access  Private
router.delete('/', authenticator, async (req, res) => {
    try {
        
        // @todo - remove users posts

        // remove profile and user by token payload (user: id)
        await UserProfile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        
        return res.json( {msg: 'User deleted succesfully'} );

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    PUT api/profile/experience
// @desc    Add user profile experience
// @access  Private
router.put('/experience', [authenticator, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], 
async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty)
        return res.status(400).json({ errors: errors.array() });

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from, 
        to,
        current,
        description
    };
    
    try {
        
        // req.user.id comes from the auth token
        const userProfile = await UserProfile.findOne({ user: req.user.id  });

        if (!userProfile) 
            return res.status(400).json({ msg: 'There is no profile for this user' });

        userProfile.experience.unshift(newExp);
        await userProfile.save();

        return res.json(userProfile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    PUT api/profile/education
// @desc    Add user profile education
// @access  Private
router.put('/education', [authenticator, [
    check('school', 'school name is required').not().isEmpty(),
    check('degree', 'degree type is required').not().isEmpty(),
    check('fieldOfStudy', 'fieldOfStudy is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], 
async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty)
        return res.status(400).json({ errors: errors.array() });

    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = req.body;

    const educationItem = {
        school,
        degree,
        fieldOfStudy,
        from, 
        to,
        current,
        description
    };
    
    try {
        
        // req.user.id comes from the auth token
        const userProfile = await UserProfile.findOne({ user: req.user.id  });

        if (!userProfile) 
            return res.status(400).json({ msg: 'There is no profile for this user' });

        userProfile.education.unshift(educationItem);
        await userProfile.save();

        return res.json(userProfile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});


//@route    DELETE api/profile/experience/:exp_id
// @desc    Removes a single experience item from the UserProfile experiences list
// @access  Private
router.delete('/experience/:exp_id', authenticator, 
async (req, res) => {

    try {
        const userProfile = await UserProfile.findOne({ user: req.user.id });

        if (!userProfile)   return res.status(400).send('User not found');

        const experienceItem =  UserProfile.find({ 
            experience: { 
               $elemMatch: { id: req.params.exp_id } 
            }
         }); 

        if (!experienceItem) return res.status(400).send('This item does not exists');

        // Get remove index        
        const removeIndex = userProfile.experience.map(item => item.id).indexOf(req.params.exp_id);
        userProfile.experience.splice(removeIndex, 1);
        await userProfile.save();

        return res.json(userProfile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }

});

//@route    DELETE api/profile/education/:edu_id
// @desc    Removes a single education item from the UserProfile educations list
// @access  Private
router.delete('/education/:edu_id', authenticator, 
async (req, res) => {

    try {
        const userProfile = await UserProfile.findOne({ user: req.user.id });

        if (!userProfile)   return res.status(400).send('User not found');

        // Get remove index        
        const removeIndex = userProfile.education.map(item => item.id).indexOf(req.params.edu_id);
        userProfile.education.splice(removeIndex, 1);
        await userProfile.save();

        return res.json(userProfile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }

});


//@route    GET api/profile/github/:username
// @desc    Get user repos from his github account
// @access  Public
router.get('/github/:username', async (req, res) => {

    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
                    sort=created:asc&client_id=${config.get('gitHubClientId')}&
                    client_secret=${config.get('githubClientSecret')}`,
                    method: 'GET',
                    headers: { 'user-agent': 'node.js' }
        }

        request(options, (err, _res, _body) => {
            if (err) console.error(err);

            if (_res.statusCode !== 200)
                return res.status(404).json({ msg: 'No github profile found' });
            
            return res.json(JSON.parse(_body));
        });


    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal error');
    }
});

module.exports = router;