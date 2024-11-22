const isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.redirect("/"); // Redirect to login page if not logged in
  }
};

module.exports  = {isAuthenticated}
