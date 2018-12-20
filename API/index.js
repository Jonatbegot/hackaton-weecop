const { google } = require('googleapis');
const oAuth2 = require('./oAuth');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;


app.get('/calendar/events', function (req, res) {
  const calendar = google.calendar({
    version: 'v3'
  });
  calendar.events.list({
    auth: oAuth2,
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

app.post('/calendar/', (req, res) => {
  const event = req.body;
  console.log(event);
  const calendar = google.calendar({
    version: 'v3',
    oAuth2
  });
  calendar.events.insert({
      auth: oAuth2,
      calendarId: 'primary',
      resource: event,
  //   sendUpdates: 'all',
    },
    function (err, event) {
      if (err) {
        console.log(
          'There was an error contacting the Calendar service: ' + err
        );
        return res.status(500).send(err.message);
      }
      res.send(event.data);
      res.end();
    }
  );
})


app.listen(port, (err) => {
  if (err) {
    return console.log(`An error occurred while trying listening on ${port}`);
  }
  console.log(`Listening on ${port}`);
})

