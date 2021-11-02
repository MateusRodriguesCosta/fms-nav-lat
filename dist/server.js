"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const angularConversion_1 = __importDefault(require("./core/angularConversion"));
const geodesicOperations_1 = __importDefault(require("./core/geodesicOperations"));
const app = (0, express_1.default)();
const port = process.env.PORT || 80;
app.get("/", (req, res) => {
    let angularOperations = new geodesicOperations_1.default();
    let coordinateConversion = new angularConversion_1.default();
    //res.sendFile(path.join(__dirname+'/nav-showcase.html'));
    res.sendFile(path_1.default.join(__dirname + '/../nav-showcase.html'));
});
app.get("/track", (req, res) => {
    res.send("GETTING WHOLE TRACK COORDINATES");
});
app.get("/track/next", (req, res) => {
    res.send("GETTING THE NEXT WAYPOINT");
});
app.get("/track/last", (req, res) => {
    res.send("GETTING THE LAST WAYPOINT");
});
app.listen(port, () => {
    //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});
