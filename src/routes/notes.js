import { Router } from 'express';
import validateToken from '../middleware/validateToken.js';
import bodyParser from 'body-parser';
import { getAll, save, deleteNote, getById, update } from '../controllers/notes.js';

const notesRoute = Router();

notesRoute.use( validateToken );

const jsonParser = bodyParser.json();

notesRoute.get('/', getAll);

notesRoute.post('/', jsonParser, save);

notesRoute.delete('/:id', deleteNote);

notesRoute.get('/:id', getById);

notesRoute.put('/:id', jsonParser, update); 

export default notesRoute; 