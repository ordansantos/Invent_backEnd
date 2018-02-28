var app = require("../../app.js");
var chakram = require('chakram'),
    expect = chakram.expect;
var MYURL = 'http://localhost:8081';

var authorization;

describe("Login", function() {
    it("Salvar token para usá-lo em outros testes", function() {
        var post = chakram.post(MYURL + '/login', {
            email: "admin",
            password: "admin"
        });
        return post.then(function(response) {
          authorization = response.body.token; 
          return expect(response).to.have.status(200);
        });
    });

});

describe("Teste com sucesso para a criação de salas 'mokadas'", function() {

    it("criação da sala 1", function() {
        var post = chakram.post(MYURL + '/room', {
            _id: "500000000000000000000001",
            name: "Sala 1001 - CAA",
            things: []
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return post.then(function(response) {
          return expect(response).to.have.status(200);
        });
    });

    it("criação da sala 2", function() {
        var post = chakram.post(MYURL + '/room', {
            _id: "500000000000000000000002",
            name: "Sala 1002 - CAA",
            things: []
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return post.then(function(response) {
          return expect(response).to.have.status(200);
        });
    });

});


describe("Teste com sucesso para a remoção de salas", function() {

    it("remoção da sala 1", function() {
        var deleteRoom = chakram.delete(MYURL + '/room/500000000000000000000001',{}
            ,{ headers: {
                Authorization : 'Bearer ' + authorization
        }});
        return deleteRoom.then(function(response) {
            return expect(response).to.have.status(200);
        });
    });

    it("remoção da sala 2", function() {
        var deleteRoom = chakram.delete(MYURL + '/room/500000000000000000000002',{}
            ,{ headers: {
                Authorization : 'Bearer ' + authorization
        }});
        return deleteRoom.then(function(response) {
            return expect(response).to.have.status(200);
        });
    });

});