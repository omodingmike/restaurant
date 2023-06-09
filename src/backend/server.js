const http = require("http");
require("dotenv").config();
const app = require("./app/app");
const server = http.createServer(app);
require("./config/database");
const PORT = process.env.PORT || 9000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server running at port: ${PORT}`);
});
