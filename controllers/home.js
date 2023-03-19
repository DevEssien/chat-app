const path = require('path')

exports.getHome = (req, res, next) => {
    return res.render('home')
}