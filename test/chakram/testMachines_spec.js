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

describe("Teste com sucesso para a criação de maquinas 'mokadas'", function() {

    it("criação da maquina 1", function() {
        var post = chakram.post(MYURL + '/machine', {
            _id: "500000000000000000000001",
            description: "Dell",
            destination: "",
            acquisition_date: "2018-01-15T03:00:00.000Z",
            situation: "bom",
            inst_monitor_Patrimony: "UFCO",
            monitor_number_Patrimony: "645654654654",
            monitor: "LG",
            inst_Patrimony: "UFCG",
            number_Patrimony: "54654654",
            ram_memory: "0909",
            hd: "909",
            processor: "i7",
            machine_user: "Lucas",
            public_ip: "65465465465465465",
            room: "Sala 102"
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return post.then(function(response) {
          return expect(response).to.have.status(200);
        });
    });

    it("criação da maquina 2", function() {
        var post = chakram.post(MYURL + '/machine', {
            _id: "500000000000000000000002",
             description: "Dell 2",
            destination: "",
            acquisition_date: "2018-01-08T03:00:00.000Z",
            situation: "ruim",
            inst_monitor_Patrimony: "0909098",
            monitor_number_Patrimony: "09098089",
            monitor: "090909",
            inst_Patrimony: "0909098",
            number_Patrimony: "00909098",
            ram_memory: "090909",
            hd: "9008",
            processor: "i7",
            machine_user: "Icaro",
            public_ip: "65465446565",
            room: "Sala 102"
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return post.then(function(response) {
          return expect(response).to.have.status(200);
        });
    });

});





describe("Teste com sucesso para a edição de maquinas 'mokadas'", function() {

    it("edição da maquina 1", function() {
        var put = chakram.put(MYURL + '/machine/500000000000000000000001', {
            _id: "500000000000000000000001",
            description: "Dell edit",
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return put.then(function (response) {
          return expect(response).to.have.status(200);
        });
    });

    it("edição da maquina 2", function() {
        var put = chakram.put(MYURL + '/machine/500000000000000000000002', {
            _id: "500000000000000000000002",
            description: "Dell 2 edit",
        },{ headers: {
            Authorization : 'Bearer ' + authorization
        }});
        return put.then(function (response) {
          return expect(response).to.have.status(200);
        });
    });

});

describe("Teste com sucesso para a remoção de maquinas", function() {

    it("remoção da maquina 1", function() {
        var deleteMachine = chakram.delete(MYURL + '/machine/500000000000000000000001',{}
            ,{ headers: {
                Authorization : 'Bearer ' + authorization
        }});
        return deleteMachine.then(function(response) {
            return expect(response).to.have.status(200);
        });
    });

    it("remoção da maquina 2", function() {
        var deleteMachine = chakram.delete(MYURL + '/machine/500000000000000000000002',{}
            ,{ headers: {
                Authorization : 'Bearer ' + authorization
        }});
        return deleteMachine.then(function(response) {
            return expect(response).to.have.status(200);
        });
    });

});