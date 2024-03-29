const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(createError(422))
  } else {
    next();
  }
}

exports.isAdmin = () => (req, res, next) => {

    if (req.session.currentUser.role !== "admin") {
        res.status(401).json({
            error: "No tienes permisos"
        })
    } else {
      next();
    }
  }
