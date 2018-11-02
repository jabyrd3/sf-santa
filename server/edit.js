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
          email=$2,
          address=$3,
          address2=$4,
          city=$5,
          state=$6,
          zip=$7,
          recipient=$8,
          country=$9 WHERE uuid=$10 RETURNING *`, [
            body.name,
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
              if(err) rej(err);
              client.end();
              res(result.rows);
            });
        })
        .catch(e => console.log(e) || rej(e))
      })
      .catch(e => console.log(e) || rej(e));
  });
};
