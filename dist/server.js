"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); //Import the express dependency
var app = (0, express_1.default)(); //Instantiate an express app, the main work horse of this server
var port = process.env.PORT || 80; //Save the port number where your server will be listening
//Idiomatic expression in express to route and respond to a client request
app.get('/', function (req, res) {
    res.send('Nice little boy!'); //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});
app.listen(port, function () {
    console.log("Now listening on port " + port);
});
