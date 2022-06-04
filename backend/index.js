const mongoose = require('mongoose');
const express = require('express');
const { urlencoded } = express;
require('dotenv').config();
const User = require('./models/User');

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB.......'))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    // 'https://portfoliocreator.vercel.app'
    'localhost:3000'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

app.post('/api/update', async (req, res) => {
  const user = req.body;
  const { email } = req.body;
  const url = user.url;

  console.log(user);

  const userFromDB = await User.findOne({ email }).lean();

  await User.findOneAndUpdate(
    { email },
    {
      image: user.image,
      color: user.color,
      username: user.username,
      phone: user.phone,
      address: user.address,
      profession: user.profession,
      aboutMe: user.aboutMe,
      skills: user.skills,
      projects: user.projects,
    }
  ).lean();

  if (!userFromDB.url) {
    console.log('no url');
    await User.findOneAndUpdate(
      { email },
      {
        url: url,
      }
    ).lean();
  }

  console.log('updated');
  res.json({ done: 'yes' });
});

app.post('/api/create', async (req, res) => {
  const user = req.body;
  if (user) {
    const userFromDB = await User.findOne({
      email: user.email,
    }).catch((err) => console.log('==> User not found.'));
    // console.log(user, userFromDB);
    if (userFromDB) {
      console.log('==> User already in DB, so new instance is not created.');
      res.json({
        message: 'User is already in DB, so new instance is not created.',
      });
      return;
    }
    const newUser = await new User({
      email: user.email,
      accountCreationDate: new Date().getTime(),
    }).save();
    res.json({ action: 'Create user', newUser });
    return;
  }
  res.json({ action: 'Create user', message: 'User signed out.' });
});

app.post('/api/getURL', async (req, res) => {
  console.log('==> getURL');
  // console.log(req.body);
  const { url } = req.body;
  console.log(`==> url: ${url}`);
  const userFromDB = await User.findOne({ url: url });
  console.log(userFromDB);
  res.json(userFromDB);
});

app.post('/api/get', async (req, res) => {
  console.log('==> getURL');
  // console.log(req.body);
  const { email } = req.body;
  console.log(`==> email: ${email}`);
  const userFromDB = await User.findOne({ email: email });
  console.log(userFromDB);
  res.json(userFromDB);
});
