const _ = require('lodash');
const config = require('../config');
const { Client } = require('pg');

module.exports = (uuid) => {
  const client = new Client(config.db);
  return new Promise((res, rej) => {
    return client
      .connect()
      .then(() => {
        console.log('pre first query');
        return client.query('UPDATE santa SET seen_page=true WHERE uuid=$1 RETURNING *', [uuid], (err, result) => {
          const theirData = result.rows[0];
          if(!theirData){
            return res('that account isn\'t available. if you have multiple emails from us, use the other link.');
          }
          return client.query('SELECT * FROM santa WHERE uuid=$1', [theirData.recipient], (err, result)=> {
            const recData = result.rows[0];
            client.end();
            res(`<!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible">
            <title>streetfighters seekrit santo</title>
            <meta name="description" content="come get u some present">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
            <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
            <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
        <div class="wreath"></div>
          <div class="container wide">
            <h1>first annual street fighters<br/><span class="orange">SECRET GRITTY</span> gift x-change</h1>
            <div class="flex-wrap success">
              <div>
                <h3>Your info:</h3>
                <p>
                  ${theirData.name} <br />
                  ${theirData.address}${theirData.address2 !== 'null' && theirData.address2!==null? `, ${theirData.address2}` : ''} <br />
                  ${theirData.city},  
                  ${theirData.state} ${theirData.zip} <br /> ${theirData.country} <br />
                </p>
                <p>if any of this is incorrect, please dm tay or email <a mailto="me@mail.jordanbyrd.com">me</a> and we can fix it.</p>
              </div>
              <div>
                <h3>Send a gritmas gift to:</h3>
                <p>
                  ${recData.name} <br />
                  ${recData.address}${recData.address2 !== 'null' && recData.address2!==null? `, ${recData.address2}` : ''} <br />
                  ${recData.city},  
                  ${recData.state} ${recData.zip} <br /> ${recData.country} <br />
                </p>
              </div>
            </div>
            <div class="gritty"></div>
            <div class="snow-container">
              <div class="snow foreground"></div>
              <div class="snow foreground layered"></div>
              <div class="snow middleground"></div>
              <div class="snow middleground layered"></div>
              <div class="snow background"></div>
              <div class="snow background layered">
            </div>
          </div>
        </body>
    </html>`)
          });
        });
      }).catch(console.log);
})};
