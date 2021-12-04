const jwt=require('jsonwebtoken')
module.exports={
  isAuthenticated:function(req,res,next){
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function(err, decodedToken) {
     console.log(decodedToken)
    if(err) { return res.status(401).json({msg:"not authorized"}); }
    else {
     req.id = decodedToken.id;   // Add to req object
     next();
    }
  }) 
}
}
