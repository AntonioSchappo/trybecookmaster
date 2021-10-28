require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const db = null;

const connection = () => (db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS))
.then((conn) => conn.db(DB_NAME))
.catch((err) => {
    console.error(err);
    process.exit();
});

module.exports = connection;
