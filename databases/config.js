// Database Connection Established

const mongoose = require('mongoose');
const dbName = 'socketApp';
const dbUrl = 'mongodb://127.0.0.1:27017/' + dbName;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
    console.error(`Error connecting to database: ${err}`);
});

dbConnection.once('open', () => {
    console.log(`Connected to database: ${dbName}`);
});

// App Information
const appName = 'Ashi Chat';
const developerName = 'Ashish Madhup';

console.log(`${appName} developed by ${developerName}`);
