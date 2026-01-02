const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function userMiddleware(req, res, next) {
    const authToken = req.headers.token;
    if(!authToken){
        return res.status(401).json(`Token missing!!`);
    }
    try{
        const decoded= jwt.verify(authToken,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(e){
        return res.status(401).json({
            msg:`Invalid or expired token!!`
        })
    }
}

module.exports = userMiddleware;