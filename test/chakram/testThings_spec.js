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

describe("Teste com sucesso para a criação de objetos 'mokadas'", function() {

    it("criação da objeto 1", function() {
        var post = chakram.post(MYURL + '/thing', {
            _id: "500000000000000000000001",
            description: "Cadeira presidente",
            destination: "",
            acquisition_date: "2017-12-05T03:00:00.000Z",
            room: "Sala 102",
            comments: "",
            situation: "ruim",
            serie: "6565654654654",
            brand_model: "desk",
            origem: "SPLAB",
            number_Patrimony: "654654465"
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return post.then(function(response) {
          return expect(response).to.have.status(200);
        });
    });

    it("criação da objeto 2", function() {
        var post = chakram.post(MYURL + '/thing', {
            _id: "500000000000000000000002",
            description: "Cadeira",
            destination: "",
            acquisition_date: "2017-12-04T03:00:00.000Z",
            room: "Sala 100",
            comments: "",
            situation: "bom",
            serie: "3232323232",
            brand_model: "desk",
            origem: "ufcg",
            number_Patrimony: "32323233"
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return post.then(function(response) {
          return expect(response).to.have.status(200);
        });
    });

});





describe("Teste com sucesso para a edição de objetos 'mokadas'", function() {

    it("edição da objeto 1", function() {
        var put = chakram.put(MYURL + '/thing/500000000000000000000001', {
            _id: "500000000000000000000001",
             description: "Cadeira presidente edit",
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return put.then(function (response) {
          return expect(response).to.have.status(200);
        });
    });

    it("edição da objeto 2", function() {
        var put = chakram.put(MYURL + '/thing/500000000000000000000002', {
            _id: "500000000000000000000002",
             description: "Cadeira edit",
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return put.then(function (response) {
          return expect(response).to.have.status(200);
        });
    });

});

describe("Teste com sucesso para a remoção de objetos", function() {

    it("remoção da objeto 1", function() {
        var deleteThing = chakram.delete(MYURL + '/thing/500000000000000000000001',{}
            ,{ headers: {
                Authorization : 'Bearer ' + authorization
        }});
        return deleteThing.then(function(response) {
            return expect(response).to.have.status(200);
        });
    });

    it("remoção da objeto 2", function() {
        var deleteThing = chakram.delete(MYURL + '/thing/500000000000000000000002',{}
            ,{ headers: {
                Authorization : 'Bearer ' + authorization
        }});
        return deleteThing.then(function(response) {
            return expect(response).to.have.status(200);
        });
    });

});