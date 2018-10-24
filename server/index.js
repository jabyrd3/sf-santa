const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const uuidv4 = require('uuid/v4');
const successTemplate = require('../client/success.js');
const { Client } = require('pg')
const config = require('../config');
const cp = require('child_process');

console.log(config)
server.listen(config.port, '0.0.0.0');
/*CREATE TABLE IF NOT EXISTS "Team"(
  "id" SERIAL,
  "name" varchar(50) NOT NULL,
  "description" varchar(255)
);*/

const client = new Client(config.db);
client.connect()
  .then(client.query({
    name: 'createdb',
    text: `CREATE TABLE IF NOT EXISTS "santa"(
      "name" varchar(100),
      "email" varchar(100),
      "address" varchar(200),
      "recipient" varchar(100),
      "activity" varchar(10),
      "uuid" varchar(100)
    )`
  }))
  .catch()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/', express.static('./client'));
app.get('/success/:id', (req, res) => res.send(successTemplate(req.params.id)));
app.post('/submit', (req, res)=>{
  console.log(req.body)
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query({
        name: 'testingupdate',
        text: 'INSERT INTO santa (name, email, address, recipient, activity, uuid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [req.body.name, req.body.email, req.body.address, null, req.body.activity, uuidv4()],
      })
        .then(result => {
          console.log(`${req.body.name} signed up for secret santa, id is ${result.rows[0].id}`);
          client.end();
          res.redirect(`/success/${result.rows[0].uuid}`)
        })
        .catch(e => console.log(e) || client.end())
    })
    .catch(e => client.end() || console.log(e))
});
