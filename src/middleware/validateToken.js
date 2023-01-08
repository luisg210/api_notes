import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { response } from "express";

dotenv.config();  
const verify = jwt.verify;

const validateToken = ( req, res = response, next ) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false, 
            msg: 'No token sent'
        });
    }

    try {
        const data = verify(
            token, 
            process.env.SECRET_WORD 
        );

        const { uid, user } = jwt.verify(
            token, 
            process.env.SECRET_WORD 
        );
        req.uid = uid;
        req.user = user;

    } catch ( err ) {
        console.log(token);
        return res.status(401).json({
            ok: false,
            msg: 'No valid token: ' + err
        });
        
    }

    next();
}

export default validateToken;