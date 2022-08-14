const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const errorController = require('./controllers/error');
// const { mongoConnect, getDb } = require('./util/database');
const mongoose = require('mongoose');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// middleware for global user
app.use((req, res, next) => {
  User.findById(`${process.env.SHOP_USER}`)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@play-ground.46xs0.mongodb.net/shop`)
  .then(result => {
    // create a test user
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: 'Eric Wang',
          email: 'joma@jomama.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000, () => console.log('server is runing on port 3000'));
  })
  .catch(err => {
    console.log(err);
  });