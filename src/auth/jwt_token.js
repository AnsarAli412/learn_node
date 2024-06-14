const jwt = require('jsonwebtoken');



module.exports =  class JWTToken{

     generateJWT = (id)=>{
        return jwt.sign({id:id},'secretKey',{expiresIn:'24h'})
     };
    
    
      verifyJWT = (req,res,next) =>{
        const token = req.header('Authorization').split(' ')[0];
        if(!token) return res.status(401).send({message:"Access Denied"});
    
        try{
            const verified = jwt.verify(token,'secretKey',);
            req.user = verified;
            next();
        }catch(error){
            res.status(400).send('Invalid Token');
        }
    
     };
 }
