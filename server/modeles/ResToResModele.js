const mongoose = require('mongoose');

const sheama = mongoose.Schema ;

const Restoressheama = new sheama({
    username : String,
    reponse : String , 
    id : Number , 
    display : String ,
    resN : Number , 
    key : Number }
    );
const restoresmodele = mongoose.model('arestoresmodele' , Restoressheama );

module.exports = restoresmodele;