var mongoose = require('mongoose');

var rommSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    things: {
        type: Array
    }
});

var Room = mongoose.model('Room', rommSchema);

module.exports = Room;
