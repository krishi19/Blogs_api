import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
const secretKey = process.env.TOKEN_SECRET;

const  tokenMiddleware =  async(req,res,next)=>{
    console.log('req body token val :',req.body);
    const authHeader = req.headers.authorization;
    console.log('auth headere', authHeader);
    try{
        if(authHeader){
            try{
                const token = authHeader.split('Bearer ')[1];
                console.log('token: ', token);
                const decodedToken = jwt.decode(token, secretKey);
                console.log('token decoded: ', decodedToken);
                if(decodedToken){
                    if (Date.now() >= decodedToken.exp * 1000) {
                        // return res.status(401).json({
                        //     message:'Sorry, token invalid or already expired!'
                        // });
                        throw Boom.unauthorized('Sorry, token invalid or already expired!');
                    }else{
                        next();
                    }
                }else{
                    // return res.status(401).json({
                    //     message:'Token invalid !'
                    // });
                    throw Boom.unauthorized('Token invalid !');
                }
            }catch(e){
                // return res.status(500).json({
                //     message:'Something went wrong !'
                // });
                throw Boom.badData('Something went wrong !');
            }
        }else{
            // return res.status(401).json({
            //     message:'Sorry, unathorized access !'
            // });
            throw Boom.forbidden('Sorry, unathorized access !');
        }
    }catch(e){
        // return res.status(e.output.statusCode).json({
        //     message: e.output.payload.message,
        // });
        next(e);
    }
};

export default tokenMiddleware;
