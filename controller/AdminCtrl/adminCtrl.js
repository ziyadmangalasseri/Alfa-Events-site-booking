const dashboard = (req,res) => {
    try{
        res.render("admin/dashboard");
        // if (req.session.isLoggedIn) {
        //   }else{
        //     res.redirect("/");
        //   }
    }catch(err){
        console.error(err.message);
        
    }
}

module.exports = {dashboard}