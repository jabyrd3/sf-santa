const http = require('http');
const uuidv4 = require('uuid/v4');
const serviceID = uuidv4();
let config;
const register = (remove) => {
  return new Promise((resolve, rej) => {
    if(!remove){
      const postData = JSON.stringify({
        "Name": config.name,
        "ID": serviceID,
        "Check": {
          "Name": "Santa",
          "HTTP": config.check.url,
          "Interval": config.check.interval,
          "DeregisterCriticalServiceAfter": "10s"
        },
        "Tags": []
      });
      console.log('starting app herp');
      const req = http.request({
        method: "PUT",
        hostname: config.hostname,
        port: "8500",
        protocol: config.protocol,
        path: "/v1/agent/service/register",
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res) => {
        console.log(`consul reg status: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('end', () => {
          resolve(0);
        });
      });
      req.write(postData);
      req.end();
    } else {
      console.log("what fuck")
        const req = http.request({
          method: "PUT",
          hostname: config.hostname,
          port: config.port,
          path: `/v1/agent/service/deregister/${serviceID}`
        }, () => {
          console.log('consul deregistered succesfully');
          resolve(1);
        });
        req.end()
    }
  });
}

// drain any proc errors to stdout
process.on('uncaughtException', function(err) {
  // todo: logut store state and info about locks, etc
  console.log('uncaught exception', err);
  register(true)
    .then(() =>
      process.exit(1));
});

process.on('SIGINT', function(err) {
  // todo: logut store state and info about locks, etc
  console.log('dereg with consul');
  register(true)
    .then(() =>
      process.exit(0));
      // process.kill(process.pid, 'SIGTERM'));
});

process.once('SIGUSR2', function () {
  register(true)
    .then(() =>
      process.kill(process.pid, 'SIGUSR2'));
});

process.on('unhandledRejection', function(reason, p){
  console.log('unhandledReject', reason, p);
});

module.exports = (c) => {
  config = c;
  return register;
};
