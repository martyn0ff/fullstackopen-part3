# Phonebook full-stack

- `json-server`'s host defaults to `localhost`, configurable through `PHONEBOOK_DATABASE_HOST` environment variable
- `json-server`'s port defaults to `3000`, configurable through `PHONEBOOK_DATABASE_PORT` environment variable
- React frontend's static files server host defaults to `localhost`, configurable through `PHONEBOOK_STATIC_HOST` environment variable
- React frontend's static files port defaults to `3001`, configurable through `PHONEBOOK_STATIC_PORT` environment variable
- NodeJS backend's host defaults to `localhost`, configurable through `PHONEBOOK_BACKEND_HOST` environment variable
- NodeJS backend's port defaults to `3002`, configurable through `PHONEBOOK_BACKEND_PORT` environment variable

Frontend is using Vite. Therefore, all variables that you need to pass to the front-end have to be prefixed with `VITE_`

> **⚠️ Note!**<br>Backend requires knowledge of the front-end host and port, so that it can set up correct CORS rules. It also requires knowledge of database host and port.
