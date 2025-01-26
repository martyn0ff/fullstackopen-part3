const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const unknownEndpoint = require("./middleware/unknownEndpoint");
const URLUtil= require("../../common/util/URLUtil");

const FRONTEND_URI = new URL(process.env.PHONEBOOK_FRONTEND_SERVER_URI || "http://localhost:3001");
const BACKEND_URI = new URL(process.env.PHONEBOOK_BACKEND_SERVER_URI || "http://localhost:3002");

class Rest {
  dbClient;

  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  // Setup
  async configure(app) {

    // Configure CORS
    const corsOptions = {
      origin: FRONTEND_URI.origin
    };
    app.use(cors(corsOptions));
    // Enable JSON parser
    app.use(express.json());
    // Enable logging
    app.use(morgan("[backend] :remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length]"));
    console.log("CORS options: %o", corsOptions);
    // Unknown endpoints handler
    // (ensure it's set up last, because
    // it sends the response)

    //
    // Endpoints
    //

    // Info
    app.get("/info", async (req, res) => {
      const persons = await this.dbClient.getAll();
      res.send(`
      <p>Phonebook has info for ${persons.length} people.</p>
      <code>${new Date()}</code>
    `);
    });

    // Get all persons
    app.get("/api/persons", async (req, res) => {
      const persons = await this.dbClient.getAll();
      res.json(persons);
    });

    // Get person by ID
    app.get("/api/persons/:id", async (req, res) => {
      const person = await this.dbClient.get(req.params.id);
      if (!person) {
        return res.status(404).send({
          status: "error",
          message: `Person with ID "${req.params.id}" was not found.`
        });
      }

      res.json(person);
    });

    // Delete person by ID
    app.delete("/api/persons/:id", async (req, res) => {
      this.dbClient.remove(req.params.id);
      res.status(204).end();
    });

    // Create person
    app.post("/api/persons", async (req, res) => {
      const person = req.body;

      if (!person.name || person.name === "" || !person.phoneNumber || person.phoneNumber === "") {
        return res.status(400).json({
          status: "error",
          message: "Name and number are required."
        });
      }

      const persons = await this.dbClient.getAll();

      if (persons.some(p => p.name === person.name)) {
        return res.status(400).json({
          status: "error",
          message: `Person with the name ${person.name} already exists.`
        });
      }

      const newEntry = await this.dbClient.save(person);
      res.status(200).send({
        status: "success",
        id: newEntry._id
      });
    });

    // Update person
    app.put("/api/persons/:id", async (req, res) => {
      const newPerson = req.body;
      const id = req.params.id;
      await this.dbClient.update(id, newPerson);
      res.status(201).header("Content-Location", id).send({
        id: id,
        ...newPerson
      });
    });

    // Handle unknown endpoints
    app.use(unknownEndpoint());

    return this;
  }


  start(app) {
    app.listen(URLUtil.getPort(BACKEND_URI), BACKEND_URI.hostname);
    console.log(`Phonebook backend server started on ${BACKEND_URI.origin}.`);
  }

}

module.exports = Rest;