// create modele in database 
const mongoose = require('mongoose');

const sheama = mongoose.Schema ;






const signshema = new sheama({

    username : String ,
    email : String ,
    password : String,
    projects : Array

});
const signmodele = mongoose.model('signmodele' , signshema );

module.exports = signmodele ; 
