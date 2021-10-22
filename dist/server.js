"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coordinate_1 = __importDefault(require("./entities/coordinate"));
const angularConversion_1 = __importDefault(require("./core/angularConversion"));
const hemisphere_1 = __importDefault(require("./Enums/hemisphere"));
const latitude_1 = __importDefault(require("./entities/latitude"));
const longitude_1 = __importDefault(require("./entities/longitude"));
const angularOperations_1 = __importDefault(require("./core/angularOperations"));
const app = (0, express_1.default)();
const port = process.env.PORT || 80;
app.get("/", (req, res) => {
    let angularOperations = new angularOperations_1.default();
    let coordinateConversion = new angularConversion_1.default();
    let c1 = new coordinate_1.default(new latitude_1.default(1.23005, hemisphere_1.default.North), new longitude_1.default(123.457, hemisphere_1.default.East));
    let c2 = new coordinate_1.default(new latitude_1.default(12.3558, hemisphere_1.default.North), new longitude_1.default(12.3, hemisphere_1.default.East));
    let cres = angularOperations.sum(c1.Latitude.Get(), c2.Latitude.Get());
    res.send("Result is " + cres);
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
