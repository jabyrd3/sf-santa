const { Client } = require('pg')
const config = require('../config');
const _ = require('lodash');

module.exports = (uuid, body) => {
console.log('hrm', uuid, body)
const client = new Client(config.db);
  return new Promise((res, rej) => {
    client.connect()
      .then(() => {
        client.query(`UPDATE santa SET name=$1,
          fbname=$2,
          email=$3,
          address=$4,
          address2=$5,
          city=$6,
          state=$7,
          zip=$8,
          recipient=$9,
          country=$10 WHERE uuid=$11 RETURNING *`, [
            body.name,
            body.fbname,
            body.email,
            body['street-address'],
            body['address-line2'],
            body.city,
            body.state,
            body.zip,
            body.recipient,
            body.country,
            uuid])
        .then(result => {
          return client.query('SELECT * FROM santa', (err, result) =>{
              client.end();
              if(err) rej(err);
              res(result.rows);
            });
        })
        .catch(e => {
          console.log(e);
          client.end();
          rej(e);
        })
      })
      .catch(e => {
        console.log(e);
        client.end();
        rej(e);
      });
  });
};
