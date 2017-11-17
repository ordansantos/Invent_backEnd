var mongoose = require('mongoose');

//Schema para a planilha basica

var thingSchema = mongoose.Schema({

  //numero de patrimonio
    number_Patrimony: {
        type: String
    },

    //origem do objeto
    origem: {
        type: String
    },

    description: {
    	type: String,
      required: true
    },

    // marca / modelo
    brand_model: {
        type: String
    },

    serie: {
        type: String
    },

    situation: {
        type: String
    },

    comments: {
        type: String
    }, 

    room:{
        type: String
    },

    acquisition_date: {
        type: String
    }
});

var Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing
