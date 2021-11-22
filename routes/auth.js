const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const uuidv1 = require('uuidv1')

const User = require('../models/user');
const Guest = require('../models/guest');
const ResetPassword = require('../models/resetPassword')

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

const { sendMail } = require('../helpers/sendMail')
const { resetPasswordEmailTemplate } = require('../helpers/resetPasswordEmailTemplate')

router.get('/me', isLoggedIn(), async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate('guests');
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
        res.status(404).json({
            error: "No existe un usuario registrado con este email"
        })
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;

        const userDataToSend = {
            username:user.username,
            email:user.email,
            role:user.role,
            id:user._id,
            guests:user.guests
        }

        return res.status(200).json(userDataToSend);
      } else {
        res.status(401).json({
            error: "Contraseña Incorrecta"
        })
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
        const userByEmail = await User.findOne({ email }, 'email');
        const userByName = await User.findOne({ username }, 'username');
      if (userByEmail) {
        res.status(422).json({
            error: "Este email ya esta registrado, prueba con otro por favor"
        })
      } else if(userByName) {
        res.status(422).json({
            error: "Este nombre de usuario ya esta registrado, prueba con otro por favor"
        })
      }
      else {
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

router.post('/forgot', isNotLoggedIn(), async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await User.findOne({ email }, 'email');
    if(userByEmail) {
        const id = uuidv1()
        const request = {
            id,
            email: userByEmail.email
        }
        const reset = await ResetPassword.create(request);
        sendMail({
            to: userByEmail.email,
            subject: "Restaurar contraseña",
            html: resetPasswordEmailTemplate(id)
        })
        res.status(200).json()
    } else {
        res.status(404).json({
            error: "El email es incorrecto o no existe"
        })
    }
});

router.post('/reset-password/:id', isNotLoggedIn(), async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body

    const resetPasswordById = await ResetPassword.findOne({ id }, 'email');

    if(resetPasswordById) {
        try {
            const { email } = resetPasswordById
            const userByEmail = await User.findOne({ email }, 'password');

            if(bcrypt.compareSync(password, userByEmail.password)) {
                res.status(422).json({
                    error: "La contraseña tiene que ser diferente a la anterior"
                })
            } else {

                const salt = bcrypt.genSaltSync(10);
                const hashPass = bcrypt.hashSync(password, salt);
    
                const userToUpdate = {
                    password:hashPass,
                }

                const userId = await User.findOne({ email }, 'id');
                const updatedUser = await User.findByIdAndUpdate(userId, {$set: userToUpdate}, {new:true})

                await ResetPassword.findOneAndRemove({ id });
                return res.status(200).json(updatedUser);
            }
        } catch (error) {
            next(error);
        }
    } else {
        res.status(404).json({
            error: "El link es incorrecto o no existe"
        })
    }
});


module.exports = router;
