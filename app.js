const path = require('path');
const express = require('express');

// ACCESS TO GALLERY MODULE
const gallery = require('./gallery.js');

// TO INITIALIZE APP
const app = express();

// VIEW ENGINE

app.set('view engine', 'ejs');

// INJECT DATA FROM JS FILES TO EJS

app.use(function (req, res, next) {
  res.locals.gallery = gallery
  next()
})

// HOME ROUTE

app.get('/', function (req, res) {
  res.render('index');
});


app.get('/gallery', function (req, res) {
  res.render('gallery');
});

app.get('/gallery/:id', function (req, res) {
  for (data of gallery) {
    if (data.id == req.params.id) {
      res.render('galleryid', {
        title: `${req.params.id}`
      });
      return;
    }
  }
});

app.use(express.static(path.join(__dirname, 'public')));


// ERROR 404

app.use(function (req, res) {
  res.status(404);
  res.send('404: File Not Found');
});


// SETTING UP SERVER

app.listen(process.env.PORT || 3000, function () {
  console.log("Our server is up running...");
});