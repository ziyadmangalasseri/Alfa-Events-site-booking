const userModel = require("../../model/userModel");

const homePage = (req, res) => {
    res.render("user/home");
  // console.log("admin is ",req.session.adminisLoggedIn);
  // console.log("user is ",req.session.userisLoggedIn);

  
};


const profilePageDetails = async (req, res) => {
  try {
    const userId = req.session.userDataId;
    if (!userId) {
      return res.redirect("/"); 
    }

    const userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.status(404).send("User not found");
    }
    res.render("user/profile", { users: userDetails });
  } catch (error) {
    console.error("Error in profilePageDetails:", error.message);
    res.status(500).send("Server error");
  }
};



module.exports = { homePage,profilePageDetails };
