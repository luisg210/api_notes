import { response } from 'express';
import User from '../models/Users.js'; 
import generateToken from '../helpers/generateToken.js';
import bcrypt from 'bcryptjs';
import Users from '../models/Users.js';

const getAll = async (req, res = response) => {
    const users = await User.find();
    
    res.json(   
         users
    )
}

const login = async ( req, res = response ) => {
    let token = '', ok = false, user_ = {};
    
    const { user, password } = await req.body;
    
    try {
        user_ = await User.findOne( { user } );

        if (user_) {
            const validPass = await bcrypt.compare( password, user_.password );
            console.log('Res token', validPass);
            if ( validPass ) {
                token = generateToken( user_.id, user_.name );
                ok = true;
            }

        }

    } catch (err) {
        console.log(err);
    }   

    ok ? res.status(200).send({
        ok,   
        uid: user_.id,
        user: user_.user,
        token 
    }) : res.send({
        ok,
        msg: 'Login failed'
    });

    console.log("Se crea token: " + token);
}

const renew = async (req, res = response) => {
    const { uid, user } = await req;
    
    const token = generateToken( uid, user );

    res.send({
        ok: true, 
        uid,
        user, 
        token
    });
}

const save = async (req, res = response) => {
    let msg = '', ok = false, user_ = undefined, token;

    try {
        const { name, user, password } = await req.body;

        user_ = await Users.findOne( { user } );
        console.log(user_);
        if ( user_ ) {
            msg = 'User alredy exist';

        } else {
            user_ = new Users( {user, password, name} );
            console.log(user_);
            const salt = bcrypt.genSaltSync();
            user_.password = bcrypt.hashSync( password, salt );

            await Users.create(user_);

            token = generateToken( user_.id, user_.name );

            msg = 'Usuario creado';
            ok = true;
        }
    
    } catch (err) {
        console.error(err);
        
        msg = err;
    }

    if (ok) {
        res.send({
            uid: user_.id,
            user: user_.user,
            msg,
            token
        });

    } else {
        res.send({
            msg,
            ok
        });
    }

    console.log(msg);
}

const deleteUser = async (req, res = response) => {
    try {   
        const uid = req.params.id;
        const user = await User.findById( uid );

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no exite'
            });
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Eliminado'
        });

    } catch (error) {
        console.error(error);
        res.json({
            ok: false
        });
    }
}

const getById = async (req, res = response) => {
    try {
        const uid = req.params.id;
        const user = await User.findById( uid );

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no exite'
            });
        }

        res.json({
            ok: true,
            data: user
        });

    } catch (error) {
        console.error(error);
        res.json({
            ok: false
        });
    }
}

const update = async (req, res = response) => {
    try {
        const uid = req.params.id;
        const user = await User.findById( uid );

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no exite'
            });
        }

        await User.findByIdAndUpdate( uid, req.body, { new: true } );

        res.json({
            ok: true,
            data: user
        });

    } catch (error) {
        console.error(error);
        res.json({
            ok: false
        });
    }
}

export {
    getAll,
    save,
    deleteUser,
    getById,
    update,
    login,
    renew
}