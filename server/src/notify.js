const functions = require('@google-cloud/functions-framework');

functions.http('main', (req, res) => {
  res.send('Notify');
});