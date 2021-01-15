// require moongoose 

const mongoose = require('mongoose');

mongoose.Promise = global.Promise ;

const signmodele = require('./modeles/signmodele');

const anaquesmodele = require('./modeles/AnaQuesModel');

const anaresmodele = require('./modeles/AnaResModele');

const restoresmodele = require('./modeles/ResToResModele');


//  require express

const express = require('express');

const app = express();

//connectg mongoose 
 mongoose.connect("mongodb://localhost/quesweb",{ useUnifiedTopology: true , useNewUrlParser: true } );

mongoose.connection.once('open',function(){

    console.log("connection mongoose is succed");

}).on('error', Error => {

    console.log('connection moongoose failed');
});

 var remov = false;
// remove collection
if (remov == true ) {

   mongoose.connection.collection("mymodeles").drop((err,delOk) => {
      if (err) console.log('erreur');
   else if (delOk) console.log('collection remove');
   
   });

};   


var bodyparser = require('body-parser');
const { isMaster } = require('cluster');
const { findOne } = require('./modeles/signmodele');

var urlencodedparser = bodyparser.urlencoded({extended:false});



app.get('/ana'  , (req , res ) => {

  anaquesmodele.find({}).then(question => {
       anaresmodele.find({}).then(reponse => {
           restoresmodele.find({}).then(restores => {
            const data = {
                question : question ,
                reponse : reponse , 
                reponseToReponse : restores
            }
         res.send(data);
           })
       }) 
   })   
})

app.post('/project' , urlencodedparser , (req , res) => {

    if (req.body.type === 'getProjectFromData') {
        const username = req.body.user ;
            app.get('/project', (req , res) => {
                signmodele.findOne({username : username}).then(data => {
                res.send(data.projects);
            })
        })
    }

    if (req.body.type === 'addproject') {

        signmodele.findOne({username : req.body.user}).then(data => {
            const newproject = {
            title : req.body.title ,
                 description : req.body.description ,
                  datebegin : req.body.databegin   , 
                  datalimite : req.body.datalimite ,
                   finish : 'nofinish' , 
                   id : Math.random()
            }
           const project = [...data.projects , newproject]
            signmodele.findOneAndUpdate({username : data.username} , {projects : project}).then(()=> console.log('ubdate'));
        
        })
    }

    if (req.body.type === 'removeproject') {
        signmodele.findOne({username : req.body.user}).then(data => {
           
            const newproject = data.projects.filter(proj => {
                
                if (proj.id != req.body.id) {
                    return proj
                }
            })
            signmodele.findOneAndUpdate({username : data.username} , {projects : newproject}).then(() => console.log('ubdate Remove'));
        })
    }

    if (req.body.type === 'finishProject') {
        signmodele.findOne({username : req.body.user}).then(data => {
            const newproject = data.projects.filter(proj => {
                if (proj.id == req.body.id && proj.finish == 'nofinish' ) {
                    proj.finish = 'finish' ; 
                } else  if (proj.id == req.body.id && proj.finish == 'finish' ) {
                    proj.finish = 'nofinish' ; 
                }
                return proj
            })
            console.log(newproject);
            signmodele.findOneAndUpdate({username : data.username}, {projects : newproject}).then(() => console.log('ubdate finish'));
        })
    }
})


app.post('/ana' , urlencodedparser , (req , res) => {
  
   if (req.body.type === "question") {
       
        var ques = new anaquesmodele({
            username : req.body.user,
            question : req.body.question ,
            display : 'None' , 
            id : Math.random()
        })
        ques.save();
    }
    if (req.body.type === 'reponse') {
        var repons = new anaresmodele({
            username : req.body.user,
            reponse : req.body.reponse , 
            id : req.body.id  ,
            display : 'None',
            resN : Math.random()
        })
        repons.save();
    }
    if (req.body.type === 'restores') {
        var restores = new restoresmodele({
            username : req.body.user,
            reponse : req.body.reponse , 
            id : req.body.id , 
            display : 'None' ,
            resN : req.body.resN , 
            key : Math.random() 
        })
        restores.save();
    }

    console.log(req.body); 
})
app.post('/login' , urlencodedparser ,(req ,res ) => {
    var user = new signmodele({ 
        username  : req.body.username ,
        email : req.body.email ,
        password : req.body.password,
    });
    console.log(user);
    user.save().then(() => {
        console.log('save succed');
    })
})

app.post("/Signin" , urlencodedparser , (req , res ) => {
    console.log(req.body.username + ' +++ ' + req.body.password);
    var userinfo = {
        username : req.body.username ,
        password : req.body.password
    }

   
            app.get('/signin', (req , res ) => {
                console.log(userinfo);
                signmodele.findOne({username : userinfo.username , password : userinfo.password}).then((data) => {
                    if (data === null) {
                        var isuser = {
                            isuser : false
                        }
                        res.send(isuser);
            }
            else {
                 var isuser = {
                     isuser : true 
                 }
                 res.send(isuser);
            }
        })
        })
    })

app.listen(5000 , () => {
    console.log('nodejs connection succed');
});