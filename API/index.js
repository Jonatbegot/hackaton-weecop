const { google } = require('googleapis');
const oAuth2 = require('./oAuth');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;

const calIds = {
  1: {
    id: 'jobegot1@gmail.com',
    email: 'jobegot1@gmail.com'
  },
  2: {
    id: 'm35l66kbcos8lnm20ltt77o8o8@group.calendar.google.com',
    email: 'hemilie94@gmail.com'
  }
}

app.get('/calendar/events/:calId', function (req, res) {
  const calId = req.params.calId;
  const calendarId = calIds[calId].id;

  const calendar = google.calendar({
    version: 'v3'
  });
  calendar.events.list({
    auth: oAuth2,
    calendarId: calendarId,
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

app.post('/calendar/:calId', (req, res) => {
  const calId = req.params.calId;
  const calendarEmail = calIds[calId].email;
  const calendarId = calIds[calId].id;
  console.log(calendarId);

  const event = req.body;
  event.attendees.push({
    displayName: 'hôte',
    email: calendarEmail
  })

  const calendar = google.calendar({
    version: 'v3',
    oAuth2
  });
  calendar.events.insert({
      auth: oAuth2,
      calendarId: calendarId,
      resource: event,
    sendUpdates: 'all',
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

