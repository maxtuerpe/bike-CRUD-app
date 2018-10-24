

const requireLoggin = (req, res, next) => {
    if (!res.locals.loggedIn){
        req.session.message="HAVE IT SO THAT YOU ARE LOGGED IN!"
        res.redirect('back')
    } else{
        next();  
    }
    
}



module.exports = requireLoggin;