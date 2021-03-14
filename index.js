const fs=require('fs')
const http=require('http')
const express=require('express')
const app=express();
const pug=require('pug');
const ejs=require('ejs');
const bodyparser=require('body-parser')
var jsonparser=bodyparser.json()
var urlencodedparser=bodyparser.urlencoded({extended:true})
const passport=require("passport")
const session=require('express-session')
const flash=require('express-flash')
const methodoverride=require('method-override')
const bcrypt=require('bcrypt')
var mongoose = require('mongoose');
const { stringify } = require('querystring');


app.set('veiw engine','ejs')
// app.set()

// const initialisePassport=require('./passport-config')
// initialisePassport(
//     passport,
//     email=>user.find(user=>user.email === email),
//     id=>user.find(user =>user.id === id)
// )


//flash is creating error in connecting localhost through browser
// app.use(flash)


mongoose.connect("mongodb://localhost:27017/",(err,client)=> {
    if(!err){
        console.log("succesfully connected")
    }
    else console.log("error in connection with database")
})


var myschema=mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    dob:Date,
    password:String,

})

var mydb=mongoose.model('mydb', myschema);
var mydatabase=new mydb({ name:mydatabase});
console.log(mydatabase.name);

mydatabase.save(function(err,mydatabase){
    if(err) return console.error(err);
})


const port=80
index=fs.readFileSync('index.html')
newreg=fs.readFileSync('new registration.html')
studentlogin=fs.readFileSync('student login.html')
stafflogin=fs.readFileSync('staff login.html')



let user=[];

app.use(express.urlencoded({extended: true}))
app.use(bodyparser.json());


app.get('/',function(req,res){
    res.end(index)

});


app.get('/about', function(req,res){
    res.end('hello this is about')
});


app.get('/stafflogin',(req,res) => {
    res.end(stafflogin);

});


app.get('/studentlogin',(req,res) => {
    res.end(studentlogin);

});


app.get('/newregistration',(req,res) => {
    res.end(newreg);

});


app.post('/newregistration',urlencodedparser,(req,res) => {

    if(req.body.password != req.body.cpassword)
    {
        res.end("password not confirmed, please try again")
    }

    
    else{

        user.push({

            id: Date.now().toString(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username:req.body.username,
    
            date:req.body.dob,
            password: req.body.password,
            cpassword:req.body.cpassword
        });
        // console.log("user ${user}!")
        console.log(user)
        // console.log('user: '+ user)
        res.redirect("/studentlogin")


    }

});

app.post('/loginwelcome',(req,res)=>{

})


app.delete('/logout', (req,res)=>{
    req.logOut()
    res.redirect('/login')
})

//if authenticated then call next else redirect to login window
// function checkAuthenticated(req,res,next){
//     if(req.isAuthenticated()){
//         return next
//     }
//     res.redirect('/login')
// }


//if not authenticated redirect to loginwindow else next
// function checkNotAuthenticated(req,res,next){
//     if(req.isAuthenticated()){
//         return res.redirect('/login')
//     }
//     next()
// }

app.listen(port,()=>{
    console.log('server started on',{port});
});
