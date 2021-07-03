const {check, validationResult} = require('express-validator/check');
const UserProfile = require('../../models/UserProfile');
const authenticator = require('../../middleware/jwt_auth');
const express = require('express');
const router = express.Router();

//@route    GET api/profile/me
// @desc    Get the unique profile from the current user authenticated/logged in
// @access  Private
router.get('/me', authenticator, async (req, res) => { // add authenticator middleware to protect API route

    try {
        // req.user.id comes from the auth token
        const profile = await UserProfile.findOne({ user: req.user.id  })
            .populate('user',['name', 'avatar']); // Join object references from User

        if (!profile) 
            return res.status(400).json({ msg: 'There is no profile for this user' });
        
        return res.json(profile);


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


module.exports = router;