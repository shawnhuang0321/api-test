const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require( 'body-parser' );
const fireData = require('./connections/firebase_admin');
// const admin = require("firebase-admin")
// var serviceAccount = require("./fire-api-test-97214-firebase-adminsdk-yzocl-a0e634c920");

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://fire-api-test-97214.firebaseio.com"
// });

// const fireData = admin.database()
// const RestAPI = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get('/', (req, res) => {
  fireData.ref('any').once('value', snapshot => {
    res.send(snapshot.val());
  })
})

app.post('/user', function(req, res) {
  const { name } = req.body;
  fireData.ref('user').push().set(name).then(() => {
    res.json({
      name,
      message: `我已經收到您名字: ${name}`,
    });
  })
  
  // res.send('robots')
});

app.listen(3000);
