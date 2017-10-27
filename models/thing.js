var mongoose = require('mongoose');

var thingSchema = mongoose.Schema({

    numberOfPatrimony: {
        type: String
    },

    name: {
        type: String,
        required:true
    },

    source: {
        type: String
    },

    description: {
    	type: String
    },

    brand_model: {
        type: String
    },

    series: {
        type: String
    },

    situation: {
        type: String
    },

    comments: {
        type: String
    }


});

var Thing = mongoose.model('Thing', thingSchema);

module.exports = mongoose.model('Thing', thingSchema);