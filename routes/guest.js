const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Guest = require('../models/guest');

const {
  isLoggedIn,
  isAdmin
} = require('../helpers/middlewares');

router.get('/guests', isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const allGuests = await Guest.find().populate('user');
    return res.status(200).json(allGuests);
  } catch(error) {
    next(error);
  }
});

router.post( '/create-guest', isLoggedIn(), async (req, res, next) => {
  const userId = req.session.currentUser._id
    try {
        
        const guest = await Guest.create(req.body);
        const user = await User.findByIdAndUpdate( userId, { $push:{ guests: guest } })
        await Guest.findByIdAndUpdate( guest._id, { $push:{ user: user } })
    
      return res.status(200).json(guest);
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
      const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})

      return res.status(200).json(updatedGuest);
    } catch (error) {
      next(error);
    }
  }
);

router.delete( '/delete/:id', isLoggedIn(), async (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const userId = req.session.currentUser._id
    try {
      await Guest.findByIdAndRemove(req.params.id);
      await User.findByIdAndUpdate( userId, { $pull: { guests: { $elemMatch:{_id:req.params.id} }  }})

      return res.status(200).json({ message: 'Guest succesfully deleted' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
