const jwt = require('jsonwebtoken');
const config = require('config');




module.exports = function(req, res, next){
    
    // Get token from header 
    const token = req.header('x-auth-token');

    // Check if header has token
    if (!token) {
        return res.status(401).json( {msg: 'Token is void in this header'} );
    }

    // if token exists:
    try {
        // decrypt token to check if its valid
        const decoded = jwt.verify(token, config.get('jwtSecret')); 
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token is invalid'});
    }
}