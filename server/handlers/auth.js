const db = require("../models")
const jwt = require("jsonwebtoken")

exports.signin = async function (req, res, next) {
    // finding user
    try {
        let user = await db.User.findOne({
            email: req.body.email
        })
        let { id, username, profileImageUrl } = user
        let isMatch = await user.comparePassword(req.body.password)
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
                process.env.SECRET_KEY)
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        }
        else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }
    } catch(e){

        console.log("blabla")
        next({status: 400, message: "Invalid Email/Password."})
    }
    // checking if their password matches what was sent to the server
    // if it all matches
    // log them in

}

exports.signup = async function (req, res, next) {
    try {
        // create a user
        // create a token (signing a token)
        let user = await db.User.create(req.body)
        let { id, username, profileImageUrl } = user
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY)
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })

    } catch (err) {
        // see what kind of error
        // if it is a certain error
        // respond with username/email already taken
        // otherwise just send back a generic 400

        // 11000 - error that occurs when the validation fails
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or was already taken"
        }

        return next({
            status: 400,
            message: err.message
        })
    }
}