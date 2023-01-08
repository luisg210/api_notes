import express from 'express';
import dotenv from 'dotenv';
import conection from './src/database/db.js';
import morgan from 'morgan';
import cors from 'cors';
import index from './src/routes/index.js';
import notesRoute from './src/routes/notes.js';

//para variables de entorno
dotenv.config();  

//se crea una variable de express 
const app = express(); 

//Se conecta a mongo
conection();

//const __dirname = dirname(fileURLToPath(import.meta.url));

//Middleware que intercepta peticiones y las muestra
app.use(morgan('dev'));
//app.set('views', join(__dirname, 'src/views'));
//app.set('view engine', 'ejs');
//app.use(router);
//Cors
app.use(cors());
//Rutas
app.use('/api/auth', index);
app.use('/api/notes', notesRoute);

//Levantar server
app.listen(process.env.PORT || 5000, () => {     
    console.log(`Server is running on port ${process.env.PORT || 5000}`);  
});                