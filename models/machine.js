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

    property: {
      type: String
    },

    inst_property: {
      type: String
    },

    monitor: {
      type: String
    },

    monitor_property: {
      type: String
    },

    inst_monitor_property: {
      type: String
    }
});

var Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
