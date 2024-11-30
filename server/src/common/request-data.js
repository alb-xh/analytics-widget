export const requestData = (req) => new Promise((resolve, reject) => {
  let body = '';

  req.on('error', (err) => reject(err));
  req.on('data', (chunk) => body += chunk.toString());
  req.on('end', () => {
    try {
      resolve(JSON.parse(body));
    } catch (err) {
      reject(err);
    }
  });
});