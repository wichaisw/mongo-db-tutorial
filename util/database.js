require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
  // MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@play-ground.46xs0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@play-ground.46xs0.mongodb.net/shop?retryWrites=true&w=majority`)
    .then(client => {
      console.log('Connected!')
      _db = client.db();
      callback();
    })
    .catch(err => {
      throw err;
    });
}

const getDb = () => {
  if(_db) {
    return _db;
  }

  throw 'No database found';
};

module.exports = {
  mongoConnect,
  getDb
}