const mongoose = require('mongoose');
const express = require('express');
const { urlencoded } = express;
const cors = require('./cors');

const somethingRouter = require('./routes/routes');

const connectDB = require('./utils/connectDB');

connectDB();

const app = express();

app.use(express.json({ strict: false }));
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api', somethingRouter);
// app.use(cors);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.listen(process.env.PORT || 5000, () => {
  console.log('==> API server started on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/getURL', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  console.log('==> getURL');
  // console.log(req.headers);
  // console.log(req.body);
  const { url } = req.body;
  console.log(`==> url: ${url}`);
  // const userFromDB = await User.findOne({ url: url });
  // console.log(userFromDB);
  // res.json(userFromDB);
});
