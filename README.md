# Phonebook full-stack

- Frontend server URI: `PHONEBOOK_FRONTEND_SERVER_URI` env variable (default: `http://localhost:3001)
- Backend server URI: `PHONEBOOK_BACKEND_SERVER_URI` env variable (default: `http://localhost:3002)

> **⚠️ Note!**<br/>Frontend is using Vite. Therefore, all variables that you need to pass to the front-end have to be prefixed with `VITE_`

> **⚠️ Note!**<br/>Backend requires knowledge of the frontend URI, so that it can set up correct CORS rules. It also requires knowledge of database URI.

## Links
- Frontend is available at https://phonebookfrontend-3fbo.onrender.com/
- Backend is available at https://phonebookbackend-3763.onrender.com