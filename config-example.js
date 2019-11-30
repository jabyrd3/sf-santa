module.exports = {
  port: 10000,
  db: {
    user: 'postgres',
    database: 'postgres',
    host: 'postgres'
  },
  magicToken: 'somerandomvalue',
  mailkey: 'mailgun-key',
  maildomain: 'mailgundomain',
  // prob don't use this lol
  // consul: {
  //   name: 'sf-test-run',
  //   hostname: 'adf',
  //   port: 8500,
  //   protocol: 'http:',
  //   check: {
  //     checkurl: 'https://santa.dev.host/up',
  //     interval: '5s'
  //   }
  // } 
};
