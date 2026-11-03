// Vercel Serverless Entry Point
// Routes dynamic /api/* and /stream/* calls to movieshub_api engine
const handler = require('../functions/movieshub_api/index.js');

module.exports = (req, res) => {
  return handler(req, res);
};
