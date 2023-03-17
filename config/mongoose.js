const mongoose = require('mongoose');

const db = async () => {
    const connection = await mongoose.connect('mongodb://localhost:27017/Sample');
    if(connection){
        console.log('connected to mongodb...........');
    }
}

db().catch((err) => {
    console.log(`Error while conncting to mongodb: ${err}`);
});

module.exports = db;