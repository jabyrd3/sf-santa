const http = require('http');
const uuidv4 = require('uuid/v4');
const serviceID = uuidv4();
const config = require('../config');
module.exports = (remove) => {
  return new Promise((resolve, rej) => {
    if(!remove){
      const postData = JSON.stringify({
        "Name": "sf-santa-test",
        "ID": serviceID,
        "Check": {
          "Name": "Santa",
          "HTTP": config.consul.checkurl,
          "Interval": "5s",
          "DeregisterCriticalServiceAfter": "10s"
        },
        "Tags": []
      });
      console.log('starting app herp');
      const req = http.request({
        method: "PUT",
        hostname: config.consul.hostname,
        port: "8500",
        protocol: config.consul.protocol,
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
          resolve();
          console.log('No more data in response.');
        });
      });
      req.write(postData);
      req.end();
    } else {
      console.log("what fuck")
        const req = http.request({
          method: "PUT",
          hostname: config.consul.hostname,
          port: config.consul.port,
          path: `/v1/agent/service/deregister/${serviceID}`
        }, () => {
          console.log('whatter fuck')
          resolve(1);
        });
        req.end()
    }
  });
}
