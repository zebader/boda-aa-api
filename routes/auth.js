const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Guest = require('../models/guest');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate('guests');
    console.log("user", user);
    req.session.currentUser = user

    const userDataToSend = {
        username:req.session.currentUser.username,
        email:req.session.currentUser.email,
        role:req.session.currentUser.role,
        id:req.session.currentUser._id,
        guests: req.session.currentUser.guests
    }
    return res.json(userDataToSend);
  } catch(error) {
    next(error);
  }
});

router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).populate('guests');
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch(error) {
      next(error);
    }
  }
);

router.post(
  '/create-user',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password, email, phone, role } = req.body;
      try {
        const user = await User.findOne({ username }, 'username').populate('guests');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ username, password: hashPass, email, phone, role });

        req.session.currentUser = newUser;

        const userDataToSend = {
            username:newUser.username,
            email:newUser.email,
            role:newUser.role,
            id:newUser._id,
            guests:newUser.guests
        }
        
        console.log(userDataToSend);
        res.status(200).json(userDataToSend);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

module.exports = router;
