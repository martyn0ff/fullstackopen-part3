const axios = require("axios");

const DATABASE_PROTOCOL = process.env.PHONEBOOK_DATABASE_PROTOCOL || "https";
const DATABASE_HOST = process.env.PHONEBOOK_DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.PHONEBOOK_DATABASE_PORT || 3000;
const DATABASE_BASE_URL = `${DATABASE_PROTOCOL}://${DATABASE_HOST}:${DATABASE_PORT}`;

function getAll() {
  console.log("DB URL: " + DATABASE_BASE_URL);
  return axios.get(`${DATABASE_BASE_URL}/persons`)
    .then(res => res.data)
    .catch(err => console.error(err));
}

function get(id) {
  return axios.get(`${DATABASE_BASE_URL}/persons/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err));
}

function save(entryObject) {
  return axios.post(`${DATABASE_BASE_URL}/persons`, entryObject)
    .then(res => res.data)
    .catch(err => console.error(err));
}

function update(id, newEntryObject) {
  console.log("id=%o, new=%o", id, newEntryObject);
  return axios.put(`${DATABASE_BASE_URL}/persons/${id}`, newEntryObject)
    .then(res => res.data)
    .catch(err => console.error(err));
}

function remove(id) {
  return axios.delete(`${DATABASE_BASE_URL}/persons/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err));
}

module.exports = { getAll, save, update, get, remove };