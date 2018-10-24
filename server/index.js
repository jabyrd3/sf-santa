const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const uuidv4 = require('uuid/v4');
const successTemplate = require('../client/success.js');
const clientTemplate = require('../client/index.js');
const adminTemplate = require('../client/admin.js');
const { Client } = require('pg')
const config = require('../config');
const cp = require('child_process');
const fs = require('fs');
const gifs = fs.readdirSync('./client/gifs');

server.listen(config.port, '0.0.0.0');
console.log('starting app');
const client = new Client(config.db);
client.connect()
  .then(() => client.query({
    name: 'createdb',
    text: `CREATE TABLE IF NOT EXISTS "santa"(
      "id" SERIAL,
      "name" varchar(100),
      "email" varchar(100),
      "address" varchar(200),
      "address2" varchar(200),
      "city" varchar(100),
      "state" varchar(100),
      "zip" varchar(100),
      "recipient" varchar(100),
      "uuid" varchar(100)
    )`
  }))
  .catch(e => console.log("db seed failed", e));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('./client'));

app.get('/', (req, res) => res.send(clientTemplate()));
app.get('/success/:id', (req, res) => res.send(successTemplate(req.params.id, gifs)));
app.get('/admin', (req, res) => {
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query({
        name: 'admin',
        text: 'SELECT * FROM santa',
      })
      .then(rows=>res.send(adminTemplate(rows.rows)))
      .catch(e=>console.log(e) || client.end());
    });
});
app.get('/delete/:uuid', (req, res) => {
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query({
        name: 'admin delete',
        text: 'DELETE FROM santa WHERE uuid = $1 RETURNING *',
        values: [req.params.uuid]
      })
      .then(() =>{
        client.query({
          name: 'admin',
          text: 'SELECT * FROM santa',
        })
        .then(rows=>res.send(adminTemplate(rows.rows)))
        .catch(e=>console.log(e) || client.end());

      })
      .catch(e=>console.log(e) || client.end())
    });
});
app.post('/submit', (req, res)=>{
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query({
        name: 'testingupdate',
        text: 'INSERT INTO santa (name, email, address, recipient, uuid, address2, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values: [req.body.name, req.body.email, req.body['street-address'], null, uuidv4(), req.body['address-2'], req.body.city, req.body.state, req.body.zip],
      })
        .then(result => {
          console.log(`${req.body.name} signed up for secret santa, id is ${result.rows[0].id}`);
          client.end();
          res.redirect(`/success/${result.rows[0].uuid}`)
        })
        .catch(e => console.log(e) || client.end())
    })
    .catch(e => console.log(e) || client.end() )
});
