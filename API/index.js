const fs = require('fs');
const {google} = require('googleapis');
const googleAuth = require('google-auth-library');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'token.json';

const googleSecrets = JSON.parse(fs.readFileSync('client_secret.json')).installed;
var oauth2Client = new googleAuth.OAuth2Client(
  googleSecrets.client_id,
  googleSecrets.client_secret,
  googleSecrets.redirect_uris[0]
);

const token = fs.readFileSync(TOKEN_PATH);
oauth2Client.setCredentials(JSON.parse(token));


app.get('/calendar/events', function (req, res) {
  const calendar = google.calendar({
    version: 'v3'
  });
  calendar.events.list({
    auth: oauth2Client,
    calendarId: "primary",
      timeMin: (new Date()).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    res.json(response.data.items);
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log(`An error occurred while trying listening on ${port}`);
  }
  console.log(`Listening on ${port}`);
})

