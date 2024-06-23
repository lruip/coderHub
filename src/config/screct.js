const fs = require("fs");
const path = require("path");

const PRIVATEKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);

const PUBLICKEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = { PRIVATEKEY, PUBLICKEY };
