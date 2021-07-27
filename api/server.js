const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const db = require('./data/db-config')
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })
const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");
const plantRouter = require("./plants/plants-router");

server.get("/", (req, res) => {
  res.status(200).json({
    api: "Running Successfully!",
  });
});

server.get("/api", (req, res) => {
  res.status(200).json({
    api: "Welcome to my API",
  });
});

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/plants", userRouter);

//error middleware
server.use((err, req, res) => {
  console.log({ err });
  res.status(500).json({
    message: `There was an error retrieving this data: ${err.message}`,
  });
});

module.exports = server;
