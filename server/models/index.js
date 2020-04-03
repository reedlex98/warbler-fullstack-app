const mongoose = require("mongoose")
mongoose.set("debug", true)
mongoose.Promise = Promise
mongoose.connect(process.env.CONNECTION_STRING, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
})

module.exports.User = require("./user")
module.exports.Message = require("./message")