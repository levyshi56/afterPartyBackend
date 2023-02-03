const {db} = require('./createDatabase.js')

async function generateUniqueId(type) {
  let digits = 0;
  if(type == 'event'){
    digits = 10000;
  }else if(type == 'person'){
    digits = 100_000_000;
  }else{
    digits = 10_000_000_000;
  }
  let Id = Math.floor(Math.random() * digits);
  while (await db.get(Id)) {
    Id = Math.floor(Math.random() * digits);
  }
  return Id;
}

async function addPhototoPersonId(personId, photoId){
  try {
    db.get(personId)
      .then(personalPhoto => {
        if (!personalPhoto){
          return 400, "error: personId is not in database"
        }
        personalPhoto.push(photoId);
        db.set(personId, personalPhoto);
        return 200, "Photo successfully added to person!";
      });
    } catch (error) {
      return 400, "error : could not add photo to person"
    }
}

async function addPhotoToEvent(eventId, personId, photoUrl) {
  try {
    const photoId = await generateUniqueId('photo');
    let event = await db.get(eventId);
    if (!event){
      return { status: 400, message: "eventId not in DB" };
    }
    await event.photos.push(photoId);
    let {status, message} = await addPhototoPersonId(personId, photoId);
    if (status == 200){
      db.set(photoId, photoUrl);
      db.set(eventId, event);
      return { status: 200, message: "Photo successfully added to event and person" };
    } else {
      return {status: 400, message: "photo could not add to person"};
    }
  } catch (error) {
    return { status: 400, message: "error : could not add photo to event" };
  }  
}


module.exports = {addPhotoToEvent};