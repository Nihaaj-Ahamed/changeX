import jwt from 'jsonwebtoken';

export  const shoutBeLoggedIn=async(req,res)=>{
    console.log("User ID:", req.userId);
    res.status(200).json({message:"You are logged in"});   
};
export  const shoutBeAdmin=async(req,res)=>{
        const token= req.cookies.token;
    if(!token) return res.status(401).json({message:"Not Authenticated"});

    jwt.verify(token,process.env.JWT_SECRET_KEY, async (err, payload)=>{
        if(err)return res.status(403).json({message:"Token is not valid"});
        if(!payload.isAdmin) {
            return res.status(403).json({message:"Not Authorized"});
        }
    });
    res.status(200).json({message:"You are logged in as admin"});    


}

