const { Pool, Client } = require('pg')
const config = require('../config');
const _ = require('lodash');

const shakeAndBake = (rows, pool, release) => {
    let avail = rows.map(r => r.uuid);
    console.log('jab avail', avail);
    return rows.map(row => new Promise((res, rej) => {
      const target = _.sample(avail.filter(r=>r !== row.uuid));
      avail = avail.filter(p => p !== target);
      pool.query({
        name: 'update all recipients',
        text: 'UPDATE santa SET recipient=$1 WHERE uuid=$2 RETURNING *',
        values: [target, row.uuid]
      }, (err, result) => {
        if(err){
          console.log('error:', err);
          return rej(err);
        }
        console.log('single row finished', result.rows[0])
        release();
        return res(result.rows[0]);
      });
    }));
};
module.exports = () => {
  return new Promise((res, rej) => {
    const pool = new Pool({
      host: config.db.host,
      user: config.db.user,
      database: config.db.database,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    pool.connect((err, client, release) => {
      if(err)console.log(err);
      client.query('SELECT * FROM santa', (err, result) => {
        if(err)rej(err);
        release();
        return Promise
          .all(shakeAndBake(result.rows, pool, release))
          .then(rows=>{
            pool.end();
            res(rows);
          })
          .catch(console.log);
      });
    });
  });
};
