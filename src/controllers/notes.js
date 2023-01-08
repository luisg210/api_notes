import { response } from "express";
import Notes from '../models/Notes.js';

const getAll = async (req, res = response) => {
    let msg = undefined, ok = false, data = [];

    try {
        data = await Notes.find( {user: req.header('user-id')} ).sort( {date: 'desc'} );
        
        if (data) {
            ok = true;
        }

    } catch (error) {
        msg = error;
    }

    if (ok) {
        res.send({
            ok,    
            data
        });

    } else {
        res.send({
            ok,
            msg
        });

    }
}

const save = async (req, res = response) => {
    let data = await req.body;
    let msg = undefined, ok = false;
    
    try {
        data.user = req.header('user-id');
        const __res = await Notes.create( data );

        if (__res) {
            ok = true;
            msg = 'Agregado con éxito';
        }

    } catch (error) {
        
        msg = error;
    }

    if (ok) {
        res.send({
            ok,
            msg
        });

    } else {
        res.send({
            ok,
            msg
        });
    }
}

const deleteNote = async (req, res = response) => {
    let msg = undefined;

    try {
        const { id } = req.params;
        
        await Notes.findByIdAndDelete(id);

        msg = `Note with id ${id} was deleted!`;

    } catch (err) {
        msg = err;
    }

    res.send({
        msg
    });
}

const getById = async ( req, res = response ) => {
    let data = {}, msg = '', ok = false;

    try {
        const { id } = req.params;

        data = await Notes.findById( id );

        if ( data ) {
            ok= true;

        } else {
            msg = `Note with id ${id} not found`;
        }

    } catch (error) {
        msg = 'Note was not found';
    }

    ok ? res.send({
        data
    }) 
    : res.send({
        msg
    }); 

}

const update = async (req, res = response) => {
    const data = await req.body;
    let msg = undefined, ok = false;
   
    try {
        const { id } = req.params;
        const __res = await Notes.findByIdAndUpdate( id, data );

        if (__res) {
            ok = true;
            msg = 'Actualizado con éxito';
        }

    } catch (error) {
        msg = error;
    }

    if (ok) {
        res.send({
            ok,
            msg
        });

    } else {
        res.send({
            ok,
            msg
        });
    }
}

export {
    save,
    getAll,
    deleteNote,
    getById,
    update
};