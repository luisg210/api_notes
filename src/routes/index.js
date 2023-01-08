import { Router } from "express";
import { deleteUser, getAll, getById, login, save, update, renew } from '../controllers/users.js';
import bodyParser from 'body-parser';
import validateToken from "../middleware/validateToken.js";

const route = Router();
const jsonParser = bodyParser.json();

route.get('/', getAll);

route.post('/login', jsonParser, login);
     
route.get('/renew', validateToken, renew);

route.post('/register', jsonParser, save);

route.delete('/delete/:id', deleteUser);

route.get('/getById/:id', getById);

route.put('/update/:id', jsonParser, update);

export default route;