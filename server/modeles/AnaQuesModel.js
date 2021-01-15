const mongoose = require('mongoose');

const sheama = mongoose.Schema ;

const AnaQuesshema = new sheama({
         username : String ,
          question : String ,
          display : String , 
          id : Number }
    );
const anaquesmodele = mongoose.model('anaquesmodele' , AnaQuesshema );

module.exports = anaquesmodele; 