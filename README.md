# API Documentation

## Get Event Details

Returns the details of the event with the specified id.

**URL** : `/events/:eventId`

**Method** : `GET`

**URL Params**

- `eventId` : 5 character alphanumeric string.

**Success Response**

- **Code** : `200`
- **Content** : `{ event : { eventId : [eventId], photos: [{personId : [personId], photoUrl: [photoUrl]}]} }`

**Error Response**

- **Code** : `400`
- **Content** : `Invalid five character string`

## Get Person Details

Returns the details of the person with the specified id.

**URL** : `/person/:personId`

**Method** : `GET`

**URL Params**

- `personId` : 8 character alphanumeric string.

**Success Response**

- **Code** : `200`
- **Content** : `{ person : { personId : [personId], events: [{eventId : [eventId], photoUrl: [photoUrl]}]} }`

**Error Response**

- **Code** : `400`
- **Content** : `Invalid eight character string`

## Add Photo

Adds a photo for a person to an event.

**URL** : `/events/:eventId/addPhoto/:personId`

**Method** : `POST`

**URL Params**

- `eventId` : 5 character alphanumeric string.
- `personId` : 8 character alphanumeric string.

**Data Params**

- `photoUrl` : string

**Success Response**

- **Code** : `200`
- **Content** : `{ message : Photo added successfully }`

**Error Response**

- **Code** : `400`
- **Content** : `Invalid request`

## Create Sample Events

Creates a sample set of events.

**URL** : `/api/createSampleEvents`

**Method** : `GET`

**Success Response**

- **Code** : `200`
- **Content** : `{ message : Events successfully added to database! }`

## Get All Events

Returns the details of all events.

**URL** : `/api/events`

**Method** : `GET`

**Success Response**

- **Code** : `200`
- **Content** : `{ events : [ { eventId : [eventId], photos: [{personId : [personId], photoUrl: [photoUrl]}]} ] }`
