const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const uuidv4 = require('uuid/v4');

const successTemplate = require('../client/success.js');
const clientTemplate = require('../client/index.js');
const userTemplate = require('../client/user.js');
const adminTemplate = require('../client/admin.js');
const editTemplate = require('../client/edit.js');
const adminSubmit = require('../client/admin-submit.js');
const { Client } = require('pg')
const config = require('../config');
const cp = require('child_process');
const fs = require('fs');
const gifs = fs.readdirSync('./client/gifs');
const randomize = require('./randomize');
const edit = require('./edit');

const mailer = require('./mailer.js');

server.listen(config.port, '0.0.0.0');

const postData = JSON.stringify({
  "Name": "sf-santa",
  "ID": uuidv4(),
  "Check": {
    "Name": "Santa",
    "HTTP": "https://santa.dev.host/up",
    "Interval": "5s",
    "DeregisterCriticalServiceAfter": "10s"
  },
  "Tags": []
});

console.log('starting app herp');
const req = http.request({
  method: "PUT",
  hostname: "jordanbyrd.com",
  port: "8500",
  path: "/v1/agent/service/register",
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }

}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.write(postData);
req.end();

const client = new Client(config.db);
client.connect()
  .then(() => {
    client.query({
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
        "uuid" varchar(100),
        "international" BOOLEAN,
        "country" varchar(3),
        "seen_page" BOOLEAN
      )`
    }).then(() => {
      client.end();
    }).catch(e => {
      console.log('table already exists')
    });
  })
  .catch(e => console.log("db seed failed", e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('./client'));

app.get('/', (req, res) => res.send(clientTemplate()));
app.get('/up', (req, res) => res.send('yup'))
app.get('/user/:id', (req, res) => {
  console.log('get user/id', req.params.id)
  userTemplate(req.params.id)
    .then(d=>res.send(d))
    .catch(console.log)
});

app.get('/success/:id', (req, res) => res.send(successTemplate(req.params.id, gifs)));

app.get('/admin', (req, res) => {
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query({
        name: 'admin',
        text: 'SELECT * FROM santa',
      })
      .then(rows => {
        client.end()
        res.send(adminTemplate(rows.rows));
      })
      .catch(e=>console.log(e) || client.end());
    });
});
app.get('/admin/add', (req, res) => res.send(adminSubmit()));
app.get('/admin/delete/:uuid', (req, res) => {
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query({
        name: 'admin delete',
        text: 'DELETE FROM santa WHERE uuid = $1 RETURNING *',
        values: [req.params.uuid]
      })
      .then(() => {
        client.query({
          name: 'admin',
          text: 'SELECT * FROM santa',
        })
        .then(rows => {
          client.end();
          res.redirect('/admin');
        })
        .catch(e => console.log(e) || client.end());

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
        text: 'INSERT INTO santa (name, email, address, recipient, uuid, address2, city, state, zip, international, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        values: [req.body.name, req.body.email, req.body['street-address'], null, uuidv4(), req.body['address-2'], req.body.city, req.body.state, req.body.zip, req.body.international||false, req.body.country || null],
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

app.get('/admin/sendmails', (req, res) => {
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query('SELECT * FROM SANTA')
        .then(result => {
          result.rows.map(row =>
            console.log(row) ||
            mailer(row));
        })
        .catch(console.log)
    })
    .catch(console.log)
  res.send('sent all emails woo');
});

app.get('/admin/sendnaughty', (req, res) => {
  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query('SELECT * FROM SANTA WHERE seen_page = false')
        .then(result => {
          result.rows.map(row =>
            console.log(row) ||
            mailer(row));
        })
        .catch(console.log)
    })
    .catch(console.log)
  res.send('sent all emails woo');
});

app.get('/admin/edit/:uuid', (req, res) =>
  editTemplate(req.params.uuid)
    .then(thing => {
      res.send(thing)
    })
    .catch(console.log));

app.post('/admin/edit/:uuid', (req, res) =>
  edit(req.params.uuid, req.body)
    .then(r => res.redirect('/admin'))
    .catch(console.log));

app.get('/admin/randomize', (req, res) => {
  randomize()
    .then(rows => 
      res.send(adminTemplate(rows)))
});

app.get('/emails/:token', (req, res) => {

  if(req.params.token !== config.magicToken){
    return res.status(401).send('invalid magic token');
  }

  const client = new Client(config.db);
  client.connect()
    .then(() => {
      client.query('SELECT * FROM santa', (err, result)=> res.json(result.rows));
    })
    .catch(console.log);
});

// drain any proc errors to stdout
process.on('uncaughtException', function(err) {
  // todo: logut store state and info about locks, etc
  console.log('uncaught exception', err);
});

process.on('unhandledRejection', function(reason, p){
  console.log('unhandledReject', reason, p);
});
 
