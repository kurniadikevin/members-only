const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title : {type: String, required: true},
    text : {type: String, required: true},
    user : { type : Schema.Types.ObjectId, ref : "User"},
    timeStamp : new Date()
});

//virtual message url
MessageSchema.virtual("url").get(function(){
    return `/message/${this._id}`;
})

module.exports= mongoose.model("Message",MessageSchema)

