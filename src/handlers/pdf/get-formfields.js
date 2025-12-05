'use strict';

const {extractFormfields} = require('../../services/pdf/formfields');

const getFormfields = async (req, res, next) => {
  try {
      console.log(req.filePath);
    const jsonOutput = await extractFormfields(req.filePath);
    res.json(jsonOutput);
  }
  catch (err) {
    return next(err);
  }
};

module.exports = {getFormfields};
