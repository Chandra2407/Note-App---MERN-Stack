const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/NoteApp"

const connectToMongo = async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log(`connected to ${mongoURI}`);
    });
}
module.exports =connectToMongo;