const express = require("express");
const morgan = require("morgan");
const { getPort } = require("../../common/util/URLUtil");
const app = express();

const URI = new URL(process.env.PHONEBOOK_FRONTEND_SERVER_URI || "http://localhost:3001");

//
// Setup
//

// Enable JSON parser
app.use(express.json());
// Enable logging
app.use(morgan("[static] :remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length]"));
// Serve dist/ folder
app.use(express.static("dist"));

// Start server
app.listen(+getPort(URI), URI.hostname);
console.log(`Static files server started on ${URI.origin}.`);