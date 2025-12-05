'use strict';
const express = require('express');
const cors = require('cors');

const multer = require('multer');
const app = express();

const config = require('./config');

const {version} = require('./package.json');
const {debug} = require('./src/handlers');
const {errorHandler} = require('./src/handlers/errors');

const pdfRouter = require('./src/router');
const debugScopes = require('./src/debug-scopes');

// Multer configuration
// This will store files in memory. You can configure it to save to disk if needed.
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.use(debug(debugScopes.DEFAULT));

app.get('/version', async (__req, res) => {
  res.send({version});
});

// Apply multer middleware for routes that will handle file uploads.
// 'pdf' should be the name of the field in your form-data request.
// e.g. <input type="file" name="pdf" />
app.use('/pdf', upload.single('pdf'), pdfRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`PDF Libs listening on port: ${config.port}`);
});
