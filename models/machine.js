var mongoose = require('mongoose');

var machineSchema = mongoose.Schema({

    room: {
      type: String,
    },

    name: {
        type: String,
        required: true
    },

    public_ip: {
      type: String
    },

    machine_user: {
      type: String
    },

    processor: {
      type: String
    },

    hd: {
      type: String
    },

    ram_memory: {
      type: String
    },

    number_Patrimony: {
      type: String
    },

    inst_Patrimony: {
      type: String
    },

    monitor: {
      type: String
    },

    monitor_number_Patrimony: {
      type: String
    },

    inst_monitor_Patrimony: {
      type: String
    }, 

    situation: {
        type: String
    },

    acquisition_date: {
        type: Date
    },

    destination:{
        type: String
    }
});

var Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
