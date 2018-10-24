const requireLoggin = () => {
    console.log(req.session);
    next();
}



module.exports = requireLoggin;