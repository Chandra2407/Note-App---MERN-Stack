const jwt = require('jsonwebtoken');
const JWT_SECRET = "graydragneel";

const getUser = (req,res,next)=>{
    // const bearerToken = req.header('auth-token');
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        res.status(401).send({message:'no token'});
    }
    try{
        const data = jwt.verify(bearerToken,JWT_SECRET);
        req.user = data;
        next()
    }
    catch(error){
        res.status(401).send({message:'invalid token'});
    }
}

module.exports = getUser