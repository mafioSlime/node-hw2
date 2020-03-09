const path = require('path');
const express = require('express');

// ACCESS TO GALLERY MODULE
const gallery = require('./gallery.js');

// TO INITIALIZE APP
const app = express();

// VIEW ENGINE

app.set('view engine', 'ejs');

// INJECT DATA FROM JS FILES TO EJS

app.use((req, res, next) => {
  res.locals.gallery = gallery
  next()
})

// HOME ROUTE


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/gallery', (req, res) => {
  res.render('gallery')
})

app.get('/gallery/:id', (req, res) => {
  for (data of gallery) {
    if (data.id == req.params.id) {
      res.render('galleryid', {
        title: `${req.params.id}`
      })
      return
    }
  }
})

app.use(express.static(path.join(__dirname, 'public')));


// ERROR 404

app.use((req, res) => {
  res.status(404)
  res.send("404: Server Not Found")
})


// SETTING UP SERVER

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running live...")
})