"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const geodesicOperations_1 = __importDefault(require("./core/geodesicOperations"));
const coordinate_1 = __importDefault(require("./entities/coordinate"));
const latitude_1 = __importDefault(require("./entities/latitude"));
const longitude_1 = __importDefault(require("./entities/longitude"));
const hemisphere_1 = __importDefault(require("./Enums/hemisphere"));
const app = (0, express_1.default)();
const port = process.env.PORT || 80;
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/../nav-showcase.html'));
});
app.get("/mock-airports", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/../mock/MOCK_AIRPORTS.json'));
});
app.get("/track", (req, res) => {
    const geoOps = new geodesicOperations_1.default();
    let coordinate1 = new coordinate_1.default(new latitude_1.default(-23.224540, hemisphere_1.default.South), new longitude_1.default(-45.861898, hemisphere_1.default.West));
    let coordinate2 = new coordinate_1.default(new latitude_1.default(-23.431944, hemisphere_1.default.South), new longitude_1.default(-46.469444, hemisphere_1.default.West));
    let bearing = geoOps.forwardBearing(coordinate1, coordinate2);
    let next_coordinate = geoOps.destinationFromBearing(coordinate1, bearing, 10);
    let remaining_distance = geoOps.distanceHaversine(coordinate1, coordinate2);
    let result_track = [next_coordinate];
    while (remaining_distance > 150) {
        next_coordinate = geoOps.destinationFromBearing(next_coordinate, bearing, 10);
        bearing = geoOps.forwardBearing(next_coordinate, coordinate2);
        result_track = [...result_track, next_coordinate];
        remaining_distance = geoOps.distanceHaversine(next_coordinate, coordinate2);
        console.log(remaining_distance);
    }
    res.send(result_track);
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
