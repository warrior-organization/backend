import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';

import DatabaseConfig from './config/database';
import ControllerConfig from './config/controller';
import AuthConfig from './config/authentication';

const app = express();

// middlewares do express
app.use(cors({origin:['http://localhost:3000', 'http://warrior-frontend.appspot.com']}))
app.use(bodyParser.json({limit : '5mb'}))
app.use(bodyParser.urlencoded({extended:true, limit : '50mb'}));
app.use(morgan('combined'));


// Configurações de rotas
ControllerConfig.config(app);

// Configurações do db
DatabaseConfig.config()
require('mongoose').Promise = global.Promise

// Configurações de autenticação
AuthConfig.config();

// Iniciando o servidor
const porta = process.env.PORT || 3001
app.listen(porta, () => console.log(`Servidor iniciado na porta ${porta}`))
