const mongoose = require("mongoose")
const User = require("./user")

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

messageSchema.pre("remove", async function(next){
    // find a user
    // remove the id of the message from their messages list
    // save that user
    // return next
    try{
        let user = await User.findById(this.user)
        user.message.remove(this._id)

        await user.save()
        return next()
    } catch(e){
        return next(e)
    }
})

const Message = mongoose.model("Message", messageSchema)
module.exports = Message