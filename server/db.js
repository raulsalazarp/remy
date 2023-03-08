const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://remy:remydev@cluster0.za1f2cr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

function close() {
  client.close();
  console.log('MongoDB connection closed');
}

module.exports = {
  connect,
  close,
  db: (name) => client.db(name),
};