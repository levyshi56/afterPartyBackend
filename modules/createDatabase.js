const Database = require("@replit/database")

const db = new Database()

  
function createSampleEvents(){

  const event1 = {
    photos: ["url", "url", "url"]
  };
  
  const event2 = {
    photos: ["url", "url", "url"]
  };
  
  db.set("12345", event1)
    .then(() => {
      return ("Events successfully added to database!");
    })
    .catch(err => {
      res.send(`Error: ${err.message}`);
    });
  db.set("abcde", event2)
  .then(() => {
    return ("Events successfully added to database!");
  })
  .catch(err => {
    return (`Error: ${err.message}`);
  });

  db.set("12345678", ['234'])
  .then(() => {
    return ("Events successfully added to database!");
  })
  .catch(err => {
    return (`Error: ${err.message}`);
  });

  db.set("01234567", ['123'])
  .then(() => {
    return ("Events successfully added to database!");
  })
  .catch(err => {
    return (`Error: ${err.message}`);
  });
};

module.exports = { db, createSampleEvents };
