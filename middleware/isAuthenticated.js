 const userisAuthenticated = (req, res, next) => {

  if (req.session.userisLoggedIn) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.redirect("/"); // Redirect to login page if not logged in
  }
};

const adminisAuthenticated = (req, res, next) => {

  if (req.session.adminisLoggedIn) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.redirect("/"); // Redirect to login page if not logged in
  }
};


module.exports  = {userisAuthenticated,adminisAuthenticated}
