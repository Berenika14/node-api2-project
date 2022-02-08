// require your server and launch it here
const server = require("./api/server");

const port = 80;

server.listen(port, () => {
  console.log("Server listening on port 80 😍");
});
