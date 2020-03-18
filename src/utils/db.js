const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = client;
