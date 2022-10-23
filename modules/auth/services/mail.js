// External Imports
//const moment = require("moment");

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const Mailgun = require("mailgun.js");
const formData = require("form-data");
//const Token = require("../controllers/authentication");

function sendmail(mailObject) {
  if (process.env.MAILGUN_TEST_EMAIL)
    mailObject.to = process.env.MAILGUN_TEST_EMAIL;

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: "api", key: API_KEY });
  // client.messages
  const sent = client.messages.create(DOMAIN, mailObject);
}
module.exports = sendmail;
