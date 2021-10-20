"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Import the express dependency
const coordinate_1 = __importDefault(require("./coordinate"));
const coordinateTypeEnum_1 = __importDefault(require("./coordinateTypeEnum"));
const app = (0, express_1.default)(); //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 80; //Save the port number where your server will be listening
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {
    //res.send('LAT NAV API SERVICE IS ONLINE');      //server responds by sending the index.html file to the client's browser                                 
    res.send('Result is ' + new coordinate_1.default(156.742, 156.742).GetLatitude(coordinateTypeEnum_1.default.DMS));
});
app.get('/track', (req, res) => {
    res.send('GETTING WHOLE TRACK COORDINATES');
});
app.get('/track/next', (req, res) => {
    res.send('GETTING THE NEXT WAYPOINT');
});
app.get('/track/last', (req, res) => {
    res.send('GETTING THE LAST WAYPOINT');
});
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
