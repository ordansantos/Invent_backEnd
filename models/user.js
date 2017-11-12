var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
    	type: String,
    	required:true
    },

    password: {
    	type: String,
    	required: true
    },

    room: {
        type:String
    },

    userKind: {
        type:String
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
