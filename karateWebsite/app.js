const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactKarate', {useNewUrlParser: true});
const port = 80;

//making mongoose schema
var contactSchema = new mongoose.Schema({
    email: String,
    password: String
});
var Contacts = mongoose.model('Contacts', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('Home.pug', params);
})
app.get('/Services', (req, res)=>{
    const params = {}
    res.status(200).render('Services.pug', params);
})
app.get('/About', (req, res)=>{
    const params = {}
    res.status(200).render('About.pug', params);
})
app.get('/Info', (req, res)=>{
    const params = {}
    
    res.status(200).render('Info.pug', params);
})
app.get('/Contacts', (req, res)=>{
    const params = {}
    res.status(200).render('Contacts.pug', params);
})

app.post('/Contacts', (req, res)=>{
    var myData = new Contacts(req.body);
    myData.save().then(()=>{
        res.send("The itmes have been saved.")
    }).catch(()=>{
        res.status(error404).send("The items have not been saved.")
    });
    // res.status(200).render('Contacts.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


