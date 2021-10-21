"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Import the express dependency
const angularOperations_1 = __importDefault(require("./angularOperations"));
const coordinate_1 = __importDefault(require("./coordinate"));
const coordinateConversion_1 = __importDefault(require("./coordinateConversion"));
const app = (0, express_1.default)(); //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 80; //Save the port number where your server will be listening
app.get('/', (req, res) => {
    let angularOperations = new angularOperations_1.default();
    let coordinateConversion = new coordinateConversion_1.default();
    let c1 = new coordinate_1.default(coordinateConversion.toDecimal("55°36'15\""), 1);
    //let c2:Coordinate = new Coordinate(coordinateConversion.toDecimal("10°56'75\""),2);    
    console.log(c1);
    console.log(coordinateConversion.toDMS(c1.GetLatitude()));
    //console.log('+' + c1.GetLatitude(CoordinateType.DMS));
    //console.log('+' + c2.GetLatitude(CoordinateType.DMS));
    //let cres = angularOperations.sum(c1, c2);
    res.send('Result is ' /*+ cres.GetLatitude(CoordinateType.DMS)*/);
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
