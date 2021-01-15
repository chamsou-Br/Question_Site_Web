const mongoose = require('mongoose');

const sheama = mongoose.Schema ;

const AnaRessshema = new sheama({
        username : String,
        reponse : String , 
        id : Number  ,
        display : String ,
        resN : Number }
    );
const anaresmodele = mongoose.model('anaresmodele' , AnaRessshema );

module.exports = anaresmodele;