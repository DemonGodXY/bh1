'use strict'

const compression = require('compression');
const express = require('express');
const app = express();
const authenticate = require('./src/authenticate');
const params = require('./src/params');
const proxy = require('./src/proxy');
const nocache = require('nocache');

const PORT = 8080;

app.set('etag', false);
app.disable('view cache');
app.disable('etag');
app.use(nocache());

app.use(compression({
  level: 9,
  threshold: 0
}))
app.enable('trust proxy');
app.get('/', authenticate, params, proxy);
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.listen(PORT, () => console.log(`Worker ${process.pid}: Listening on ${PORT}`));
