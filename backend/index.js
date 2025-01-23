const express = require("express");
const morgan = require("morgan");
const phonebookClient = require("./client/PhonebookClient");
const app = express();
const cors = require("cors");
const axios = require("axios");

const BACKEND_PROTOCOL = "http";
const BACKEND_HOST = process.env.PHONEBOOK_BACKEND_HOST || "localhost";
const BACKEND_PORT = process.env.PHONEBOOK_BACKEND_PORT || 3002;
const FRONTEND_PROTOCOL = "http";
const FRONTEND_HOST = process.env.PHONEBOOK_STATIC_HOST || "localhost";
const FRONTEND_PORT = process.env.PHONEBOOK_STATIC_PORT || 3001;

//
// Setup
//

// CORS
const corsOptions = {
  origin: `${FRONTEND_PROTOCOL}://${FRONTEND_HOST}:${FRONTEND_PORT}`,
};
app.use(cors(corsOptions));
// Enable JSON parser
app.use(express.json());
// Enable logging
app.use(morgan("[backend] :remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length]"));


async function start() {

  //
  // Endpoints
  //

  // Info
  app.get("/info", async (req, res) => {
    const persons = await phonebookClient.getAll();
    res.send(`
      <p>Phonebook has info for ${persons.length} people.</p>
      <code>${new Date()}</code>
    `);
  });

  // Get all persons
  app.get("/api/persons", async (req, res) => {
    const persons = await phonebookClient.getAll();
    res.json(persons);
  });

  // Get person by ID
  app.get("/api/persons/:id", async (req, res) => {
    const person = await phonebookClient.get(req.params.id);
    if (!person) {
      return res.status(404).send({
        status: "error",
        message: `Person with ID ${req.params.id} was not found.`
      });
    }

    res.json(person);
  });

  // Delete person by ID
  app.delete("/api/persons/:id", async (req, res) => {
    phonebookClient.remove(req.params.id);
    res.status(204).end();
  });

  // Create person
  app.post("/api/persons", async (req, res) => {
    const person = req.body;
    let persons = await phonebookClient.getAll();

    if (!person.name || person.name === "" || !person.phoneNumber || person.phoneNumber === "") {
      return res.status(400).json({
        status: "error",
        message: "Name and number are required."
      });
    }

    if (persons.some(p => p.name === person.name)) {
      return res.status(400).json({
        status: "error",
        message: `Person with the name ${person.name} already exists.`
      });
    }

    const response = await phonebookClient.save(person);

    if (response.id) {
      res.status(200).send({
        status: "success",
        id: response.id
      });
    }
    else {
      res.status(400).send({
        status: "error",
        message: "Something went wrong while saving person"
      });
    }
  });

  // Update person
  app.put("/api/persons/:id", async (req, res) => {
    const newPerson = req.body;
    const id = req.params.id;
    await phonebookClient.update(id, newPerson);
    res.status(201).header("Content-Location", id).send({
      id: id,
      ...newPerson
    });
  })
}

app.listen(BACKEND_PORT, BACKEND_HOST, start);
console.log(`Phonebook backend server started on ${BACKEND_HOST}:${BACKEND_PORT}.`);
console.log("CORS options: %o", corsOptions);