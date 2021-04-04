const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Arthur:arthur99@cluster0.zu0ow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
async function run() {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true,  'useUnifiedTopology': true});
  const db = client.db(myFirstDatabase);
  console.log('connected');
}

run();
//const products = [];

//const collection = db.collection('products');
//const result = collection.insertMany(products);

//console.log(result);
