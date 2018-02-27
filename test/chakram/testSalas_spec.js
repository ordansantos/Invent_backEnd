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