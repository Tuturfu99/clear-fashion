/* eslint-disable no-console, no-process-exit */
const axios = require('axios');
const cheerio = require('cheerio');
const dedicatedbrand = require('./sources/dedicatedbrand');
const mudjeans = require('./sources/mudjeans')
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Arthur:arthur99@cluster0.zu0ow.mongodb.net/clearfashion?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';




async function sandboxD (eshop = 'https://www.dedicatedbrand.com/en/men') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const links = await dedicatedbrand.scrapeLinks(eshop);
    finalproduct=[];
    console.log(links[1].href);
    for (let i=1; i<links.length;i++){
      sublink = links[i].href;
      console.log(sublink)
      if(sublink!='https://www.dedicatedbrand.comundefined'){
        product = await dedicatedbrand.scrape(sublink);
        for (let j=0; j<product.length;j++){
          finalproduct.push(product[j])
        }
      }
    }
    // const products = await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/t-shirts');
    console.log('Dedicated a été scrapé avec succès');
    return finalproduct;
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function sandboxM (eshop = 'https://mudjeans.eu/collections/men'){
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    finalproducts = await mudjeans.scrape(eshop);
    console.log('Mudjeans a été scrapé avec succès');
    return finalproducts;
  } catch (e){
    console.error(e);
    process.exit(1);
  }
}


async function run(products) {

  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true,  'useUnifiedTopology': true});
  const db = client.db(MONGODB_DB_NAME);
  console.log('connected');

  const collection = db.collection('products');
  const result = collection.insertMany(products);

  console.log(result);

}




async function sandbox(){
  const [,, eshop] = process.argv;
  const products =[];
  productM= await sandboxM(eshop);
  for (let j=0; j<productM.length;j++){
    products.push(productM[j])
  }

  productD = await sandboxD(eshop);
  for (let j=0; j<productD.length;j++){
    products.push(productD[j])
  }

  console.log(products.length);
  return products;
}

async function main(){
  const products = await sandbox();
  console.log(products);
  run(products);
}
main();
//run();

