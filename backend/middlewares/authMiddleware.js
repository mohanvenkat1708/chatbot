const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1];

        if(!token){
            res.status(401).json({message: "No token, Authorization denied!"});
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("The decode user is : ", req.user);
            next();
        }catch(err){
            res.status(400).send(err.message);//json({message: "Token not valid!!!"});
        }
    }
    else{
        res.status(401).json({message: "No token, Authorization denied!"});
    }
    
}

module.exports = verifyToken;