const homePage= (req,res) =>{
    res.render('user/home');
}


const profilePage= (req,res) =>{
    res.render('user/profile');
}
module.exports={homePage,profilePage};