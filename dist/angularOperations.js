"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const coordinate_1 = __importDefault(require("./coordinate"));
class AngularOperations {
    sum(coordinate1, coordinate2) {
        let latitude = coordinate1.GetLatitude() + coordinate2.GetLatitude();
        let longitude = coordinate1.GetLongitude() + coordinate2.GetLongitude();
        return new coordinate_1.default(latitude, longitude);
    }
    subtract(coordinate1, coordinate2) {
        let latitude = coordinate1.GetLatitude() - coordinate2.GetLatitude();
        let longitude = coordinate1.GetLongitude() - coordinate2.GetLongitude();
        return new coordinate_1.default(latitude, longitude);
    }
}
module.exports = AngularOperations;
