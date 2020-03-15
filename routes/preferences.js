const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Preferences = require('../models/preferences');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const allPreferences = await Preferences.find();
    return res.status(200).json(allPreferences);
  } catch(error) {
    next(error);
  }
});

router.post( '/create', isLoggedIn(), async (req, res, next) => {
  const userId = req.session.currentUser._id
    try {
      const preference = await Preferences.create(req.body);
      const userWithPreferences = await User.findByIdAndUpdate( userId, { $push:{ userPreferences: preference } })
      return res.status(200).json(userWithPreferences);
    } catch (error) {
      next(error);
    }
  }
);

router.put( '/update/:id', isLoggedIn(), async (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
    try {
      const updatedPreference = await Preferences.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
      return res.status(200).json(updatedPreference);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
