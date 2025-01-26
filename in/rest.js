const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const unknownEndpoint = require("./middleware/unknownEndpoint");
const URLUtil = require("../domain/util/URLUtil");
const JsonResponse = require("../domain/JsonResponse");

const FRONTEND_URI = new URL(
  process.env.PHONEBOOK_FRONTEND_SERVER_URI || "http://localhost:3001",
);
const BACKEND_URI = new URL(
  process.env.PHONEBOOK_BACKEND_SERVER_URI || "http://localhost:3002",
);

class Rest {
  dbClient;

  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  // Setup
  async configure(app) {
    // Configure CORS
    const corsOptions = {
      origin: FRONTEND_URI.origin,
    };
    app.use(cors(corsOptions));
    // Enable JSON parser
    app.use(express.json());
    // Enable logging
    app.use(morgan("common"));
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
      return res.send(`
        <p>Phonebook has info for ${persons.length} people.</p>
        <code>${new Date()}</code>
      `);
    });

    // Get all persons
    app.get("/api/persons", async (req, res) => {
      const persons = [];
      try {
        const fetchedPersons = await this.dbClient.getAll();
        fetchedPersons.forEach((person) => persons.push(person));
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json(JsonResponse.newError(error.name, error.message));
      }

      return res.json(persons);
    });

    // Get person by ID
    app.get("/api/persons/:id", async (req, res) => {
      const person = {};
      try {
        const fetchedPerson = await this.dbClient.get(req.params.id);
        if (!fetchedPerson) {
          return res
            .status(404)
            .json(
              JsonResponse.newError(
                `Person with ID ${req.params.id} was not found.`,
              ),
            );
        }
        person.person = fetchedPerson;
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json(JsonResponse.newError(error.name, error.message));
      }

      return res.json(person.person);
    });

    // Delete person by ID
    app.delete("/api/persons/:id", async (req, res) => {
      try {
        await this.dbClient.remove(req.params.id);
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json(JsonResponse.newError(error.name, error.message));
      }
      return res.status(204).end();
    });

    // Create person
    app.post("/api/persons", async (req, res) => {
      const person = req.body;

      if (
        !person.name ||
        person.name === "" ||
        !person.phoneNumber ||
        person.phoneNumber === ""
      ) {
        return res
          .status(400)
          .json(JsonResponse.newError("Name and number are required."));
      }

      const persons = [];
      try {
        const fetchedPersons = await this.dbClient.getAll();
        fetchedPersons.forEach((person) => persons.push(person));
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json(JsonResponse.newError(error.name, error.message));
      }

      if (persons.some((p) => p.name === person.name)) {
        return res
          .status(400)
          .json(
            JsonResponse.newError(
              `Person with the name ${person.name} already exists.`,
            ),
          );
      }

      const newEntry = {};
      try {
        newEntry.entry = await this.dbClient.save(person);
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json(JsonResponse.newError(error.name, error.message));
      }

      return res.status(200).json({
        status: "success",
        id: newEntry.entry._id,
      });
    });

    // Update person
    app.put("/api/persons/:id", async (req, res) => {
      const newPerson = req.body;
      const id = req.params.id;
      try {
        await this.dbClient.update(id, newPerson);
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .json(JsonResponse.newError(error.name, error.message));
      }

      return res
        .status(201)
        .header("Content-Location", id)
        .json({
          id: id,
          ...newPerson,
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
