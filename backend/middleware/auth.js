
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req,res,next)=>{
    try{

         const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({message:"no token generated"})
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(400).json({message:"Invalid token format"})

        }
        
        const decoder = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoder;
        next()
      
        }catch(e){

            return res.status(501).json({message:"Error in catch",e});
        }
    
    
}