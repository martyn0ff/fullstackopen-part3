const express = require("express");
const app = express();

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const PORT = 4444;

//
// Setup
//

// Enable JSON parser
app.use(express.json());

//
// Endpoints
//

// Info
app.get("/info", (req, res) => {
  res.send(`
      <p>Phonebook has info for ${persons.length} people.</p>
      <code>${new Date()}</code>
    `);
})

// Get all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
})

// Get person by ID
app.get("/api/persons/:id", (req, res) => {
  const person = persons.find(person => person.id === req.params.id);
  if (!person) {
    return res.status(404).send(`<p>Person with ID ${req.params.id} was not found.</p>`)
  }

  res.json(person);
})

// Delete person by ID
app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter(person => person.id !== req.params.id);
  res.status(204).end();
})

// Create person
app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person.name || person.name === "" || !person.number || person.number === "") {
    return res.status(400).json({
      status: "error",
      message: "Name and number are required."
    });
  }

  if (persons.some(p => p.name === person.name)) {
    return res.status(400).json({
      status: "error",
      message: `Person with the name ${person.name} already exists.`
    })
  }

  const newPerson = {
    id: String(Math.floor(Math.random()*100_000)),
    ...person
  };

  persons = persons.concat(newPerson);
  res.status(200).send({
    status: "success",
    id: newPerson.id
  })
})

app.listen(PORT);
console.log(`Server started on port ${PORT}.`);