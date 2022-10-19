const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name : {type: String, required: true},
    last_name : {type: String, required: true},
    username :  {type: String, required: true},
    password : { type: String, required: true},
    membership_status : { type: String, required: true}
});

//virtual user url
UserSchema.virtual("url").get(function(){
    return `/user/${this._id}`;
})

// export model
module.exports = mongoose.model("User",UserSchema);