const homePage = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("user/home");
  }else{
    res.redirect("/");
  }
  console.log(req.session.isLoggedIn);
  
};

const profilePage = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("user/profile");
  }else{
    res.redirect("/");
  }
};



module.exports = { homePage, profilePage, };
