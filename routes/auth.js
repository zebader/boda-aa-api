const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Preferences = require('../models/preferences');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate('userPreferences');
    req.session.currentUser = user
    return res.json(req.session.currentUser);
  } catch(error) {
    next(error);
  }
});

router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { username, password } = req.body;
    try {
      const user = await User.findOne({ username }).populate('userPreferences');
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
    const { username, password, userType } = req.body;
      try {
      const user = await User.findOne({ username }, 'username').populate('userPreferences');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPass, userType });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
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
