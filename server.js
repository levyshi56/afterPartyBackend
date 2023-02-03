const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());

const port = 3000
const path = require('path');
const {db, createSampleEvents} = require('./modules/createDatabase.js')
const Database = require("@replit/database")
const {addPhotoToEvent} = require('./modules/helper.js')

const EVENT_REGEX = /^[a-zA-Z0-9]{5}$/;
const PERSON_REGEX = /^[a-zA-Z0-9]{8}$/;

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.get('/api/createSampleEvents', function(req, res) {
  createSampleEvents();
  res.send('Events successfully added to database!');
});


app.get('/api/events', function(req, res) {
  db.list().then(value => { res.send(value)})
})

app.post('/events/:eventId/addPhoto/:personId', (req, res) => {
  try {
    const eventId = req.params.eventId;
    const personId = req.params.personId;
    const photoUrl = req.body.photoUrl;
    if (!eventId || !personId || !photoUrl || !EVENT_REGEX.test(eventId)) {
      console.log("eventId : " + eventId, "personId : " + personId, "photoUrl : " + photoUrl);
      return res.status(400).send({ message: 'Invalid request'});
    }
    addPhotoToEvent(eventId, personId, photoUrl).then(({status, message}) => {
      return res.status(status).send({ message: message });
    });
  }
  catch (error){
    return res.status(400).send({message: "Error: " + error.message})
  }
});

app.get('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  if (EVENT_REGEX.test(eventId)) {
    db.get(eventId)
    .then(value => { return res.send(value)})
    .catch(error => { return res.send(error)})
  }else{
    return res.send('Invalid five character string');
  }
});

app.get

app.get('/person/:personId', (req, res) => {
  const personId = req.params.personId;
  if (PERSON_REGEX.test(personId)) {
    db.get(personId)
    .then(value => {return res.status(200).send(value)})
    .catch(error => {return res.send(error)})
  }else{
    res.send('Invalid 8 character string');
  }
  
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})

