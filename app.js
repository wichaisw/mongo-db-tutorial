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
// app.use((req, res, next) => {
//   User.findById('62f394915a8d0e2ecb8dd480')
//     .then(user => {
//       req.user = new User(
//         user.name,
//         user.email,
//         user.cart,
//         user._id
//       );
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@play-ground.46xs0.mongodb.net/shop`)
  .then(result => {
    app.listen(3000, () => console.log('server is runing on port 3000'));
  })
  .catch(err => {
    console.log(err);
  })