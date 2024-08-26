const functions = require('@google-cloud/functions-framework');

functions.http('notify', (req, res) => {
  res.send('Hello, World');
});