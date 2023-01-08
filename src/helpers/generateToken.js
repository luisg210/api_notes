import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();  

const generateToken = ( uid, user ) => {

    /*return new Promise(( resolve, reject ) => {
        const payload = { uId, name };

        jwt.sign( payload, process.env.SECRET_WORD, {
            expiresIn: '4h'

        }, ( err, token ) => {
            if (err) {
                console.log('Error generate token: ', err);
                reject('Token does not create');

            }

            resolve( token );

        } );
    });*/

    try {
        const payload = { uid, user };

        const token = jwt.sign( payload, process.env.SECRET_WORD);
        
        return token;

    } catch (err) {
        console.log(err);
    }
}

export default generateToken;