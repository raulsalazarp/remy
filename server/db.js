const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://nicolasmolano:ScottPilgrim%231@cluster0.za1f2cr.mongodb.net/?retryWrites=true&w=majority'; 
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

module.exports = {
  connect,
  db: () => client.db(),
};
