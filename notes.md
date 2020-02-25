### Sessions

- npm i express-session
- import it and use it as global middleware - in server.js
- accepts two arguments. First: configuration object
- server.use(session(sessionConfig));

- const sessionConfig = {
  name: 'ana', //name of the cookie
  secret: 'keep it', //
  cookie: {
  maxAge: 1000 \* 30, //the cookie/session valid for 30 seconds
  secure: false, //Https. True in production
  httpOnly: true //cookie can't be accessed by javascript
  },
  resave: false,
  saveUninitialized: false //GDPR laws against saving cookie automatically. User has to accept it
  };

  - change login endpoint:
    if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user; //saving info of the user in the session, get's a cookie

  - in the restrited middeware we no longer need to search anything in the database:

  delete:
  const bcrypt = require('bcryptjs');
  const Users = require('./../users/users_model.js');
  Users.findBy({ username })
  .first()
  .then(user => {
  if (user && bcrypt.compareSync(password, user.password)) {
  next();
  } else {
  res.status(401).json({ message: 'You shall not pass!' });
  }
  })
  .catch(({ name, message, stack }) => {
  res.status(500).json({ name, message, stack });
  });

FOR:
next()
