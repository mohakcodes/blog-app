const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=> {
    let token = req.header("cookie");
    if(!token){
        return res.status(401).json("You Are Not Authenticated");
    }
    if (token.startsWith("token=")) {
        token = token.slice(6, token.length).trimLeft();
    }
    jwt.verify(token, process.env.SECRETKEY, async(err,data)=>{
        if(err){
            return res.status(403).json("Invalid Token");
        }
        req.userId = data._id;
        next();
    })
}

module.exports = verifyToken;