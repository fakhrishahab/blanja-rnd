import express from 'express';
import homepage from '../services/homepage';
// import getShortcut from '../services/homepage/shortcut';


let route = express.Router();
let app = express();

app
.use('/home', homepage)
// .use('/home', getShortcut)

module.exports = app;