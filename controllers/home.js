const path = require('path')

exports.getHome = (req, res, next) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'))
    // return res.status(200).json({
    //     message: 'home page'
    // })
}