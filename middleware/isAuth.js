module.exports = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      req.session.error = "You have to Login first";
      res.redirect("http://127.0.0.1:4000/api/v1/user/login");
    }
  };