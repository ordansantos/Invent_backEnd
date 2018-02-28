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
var db = mongoose.connection;

// ------------------- Populate Room collection on first run--------------------

var Room = mongoose.model('Room', rommSchema);

var createRoom = function(nameRoom) {

 	new Room({
 		name: nameRoom,
 		things: []
 	}).save(function(error) {
 		if (error) {
 			console.error(" Data Insetion error! ");
 		}
 	});
 };

 //funcao para criar as salas somente uma unica vez.
 Room.find(function (err, room) {
   console.log(room.length);
   if (room.length == 0) {
     createRoom('Sala 100');
     createRoom('Sala 101');
     createRoom('Sala 102');
     createRoom('Sala 103');
     createRoom('Sala 104');
     createRoom('Sala 105');
     createRoom('Sala 106');
     createRoom('Sala 200');
     createRoom('Sala 201');
     createRoom('Sala 202');
     createRoom('Sala 203');
     console.log("Salas Criadas!");
   }
 });

module.exports = Room;
