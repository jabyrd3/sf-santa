const _ = require('lodash');
const config = require('../config');
const { Client } = require('pg')

module.exports = (uuid) => {
  const client = new Client(config.db);
  console.log(`generating edit page for ${uuid}`)
  return new Promise((res, rej) => {
    client
      .connect()
      .then(() => {
        client.query('SELECT * FROM santa WHERE uuid=$1', [uuid], (err, result)=>{
          client.end()
          if(err)rej(err);
          const row = result.rows[0];
          res(`<!doctype html>
              <html class="no-js" lang="">
                  <head>
                      <meta charset="utf-8">
                      <meta http-equiv="x-ua-compatible">
                      <title>sf-santa admin</title>
                      <meta name="description" content="come get u some present">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <link rel="stylesheet" href="/css/main.css">
                      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
                      <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
                      <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
                  </head>
                  <body>
                    <div class="container">
                      <h1>secret santa admin – editing ${row.name} </h1>
                      <form method="POST" action="/admin/edit/${row.uuid}">
                          <label for="name">mail name</label>
                          <input id="fullname" type="text" name="name" value="${row.name}"/>
                          <label for="fbname">fb name</label>
                          <input id="fbname" type="text" name="fbname" value="${row.fbname}"/>
                          <label for="email">email (just for x-change updates)</label> 
                          <input value="${row.email}" id="email" type="email" name="email"/>
                          <div class="flex-wrap">
                            <div>
                              <label for="street-address">street</label>
                              <input id="address-line1" name="street-address" value="${row.address}"></input>
                            </div>
                            <div>
                              <label for="address-2">apt</label>
                              <input id="address-line2" name="address-line2" value="${row.address2}"></input>
                            </div>
                          </div>
                          <div class="flex-wrap">
                            <div>
                              <label for="city">city</label>
                              <input id="city" name="city" value="${row.city}"></input>
                            </div>
                            <div>
                              <label for="state">state</label>
                              <input id="state" name="state" value="${row.state}" ></input>
                            </div>
                            <div>
                              <label for="zip">zip</label>
                              <input id="zip" name="zip" value="${row.zip}"></input>
                            </div>
                          </div>
                          <div class="flex-wrap">
                            <input disabled="true" type="text" name="recipient" value="${row.recipient}" placeholder="recipient id"/>
                          </div>
                          <div class="flex-wrap">
                            <div>
                              <label for="country">Country</label>
                              <input type="text" maxlength="3" name="country" value="${row.country}">
                            </div>
                            <div class="vert-middle flex-wrap inline" style="padding-top: 20px;padding-left:20px;">
                              <input id="international" style="width:20px;" type="checkbox" name="international" checked="${row.international !== 'null'}"/>
                              <label class="label-inline" for="international">i would be cool with <br/>shipping internationally</label>
                            </div>
                          </div>
                          <div class="flex-wrap center">
                            <button role="submit">send</button>
                          </div>
                      </form>

                    </div>
                  </body>
              </html>`);
                  })
            })
      .catch(e => console.log(e) || rej(e))
  });
};
