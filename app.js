const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

// CONNECT DB

mongoose.connect('mongodb+srv://furkan:t7KgJMdSmM8a6Rll@cluster0.rpger.mongodb.net/pcat-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// TEMPLATE ENGİNE

app.set("view engine", "ejs");

/* 
const myLogger = (req, res, next) =>  {
    console.log("Middleware Log 1");
    next();
}
*/
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

// app.use(myLogger);

app.get("/", photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`SUNUCU ${port} ta BAŞLATILDI`)
})