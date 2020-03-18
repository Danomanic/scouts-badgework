const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

client.connect((err) => {
  if (err) {
    console.log('Unable to connect to Database', err);
    process.exit(0);
  }
  console.log('Database Connected.');
});

module.exports = client;
