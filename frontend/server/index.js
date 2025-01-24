const express = require("express");
const morgan = require("morgan");
const app = express();

const HOST = process.env.PHONEBOOK_STATIC_HOST || "localhost";
const PORT = process.env.PHONEBOOK_STATIC_PORT || 3001;

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
app.listen(PORT, HOST);
console.log(`Static files server started on ${HOST}:${PORT}.`);