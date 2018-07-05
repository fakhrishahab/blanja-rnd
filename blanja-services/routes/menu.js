import express from 'express';
import getMenu from '../services/menu';

let route = express.Router();
let app = express();

app
.use('/menu', getMenu)

module.exports = app;