const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ChatKit = require('pusher-chatkit-server');

const chatKit = new ChatKit.default({
  instanceLocator: 'v1:us1:39e44a7f-7cdc-4a28-8dde-2e32a2d93ff8',
  key:
    '94a90715-64ff-4684-b98e-03c2e4806b26:UYFRzDN25QmIaPjuiRFOmlayC+JoLz2YiTnfmzerluw=',
});

const errorMessages = {
  USER_ALREADY_EXITS: 'services/chatkit/user_already_exists',
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', async (req, res) => {
  const { username } = req.body;
  const user = { name: username, id: username };

  try {
    await chatKit.createUser(user);
    console.log('Created user ', user.name);
    res.status(201).json(user);
  } catch (error) {
    if (error.error === errorMessages.USER_ALREADY_EXITS) {
      console.log('User already exits ', user.name);
      res.status(201).json(user);
    } else {
      console.error(error);
      res.status(error.status).json(error);
    }
  }
});

app.listen(3001);
console.log('Running on port 3001');
