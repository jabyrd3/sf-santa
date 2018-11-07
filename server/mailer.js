const config = require('../config');

const api_key=config.mailkey;

const mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: config.maildomain 
});

module.exports = (emailee) => {
  mailgun.messages().send({
    from: 'Big Ol Gritty <gritty@santa.dev.host>',
    to: emailee.email,
    subject: `yo, ${emailee.name.split(' ')[0]} sf secret gritty IMPORTANT info email!`,
    text: `
      hey ${emailee.name.split(' ')[0]}, its that time of year!

      go here: https://santa.dev.host/user/${emailee.uuid}
      to see instructions for what to do next. There'll be some info about who
      your secret santa match is and their address`
  }, (error, body) => {
    console.log(error, body);
  });
};
