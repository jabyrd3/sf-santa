module.exports = {
  port: 10000,
  db: {
    user: 'postgres',
    database: 'postgres',
    host: 'postgres'
  },
  magicToken: '' // some string for validating api clients, akin to the emailer
};
