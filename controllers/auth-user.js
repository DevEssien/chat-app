exports.getHome = (req, res, next) => {
    return res.status(200).json({
        message: 'home page'
    })
}