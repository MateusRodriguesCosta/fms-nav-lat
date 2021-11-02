"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hemisphere_1 = __importDefault(require("../Enums/hemisphere"));
class Coordinate {
    constructor(Latitude, Longitude) {
        this.Latitude = Latitude;
        this.Longitude = Longitude;
    }
    setHemispheres() {
        if (this.Latitude.decimal >= 0) {
            this.Latitude.hemisphere = hemisphere_1.default.North;
        }
        else {
            this.Latitude.hemisphere = hemisphere_1.default.South;
        }
        if (this.Longitude.decimal >= 0) {
            this.Longitude.hemisphere = hemisphere_1.default.East;
        }
        else {
            this.Longitude.hemisphere = hemisphere_1.default.West;
        }
    }
}
module.exports = Coordinate;
