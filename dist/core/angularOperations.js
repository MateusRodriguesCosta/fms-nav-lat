"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const latitude_1 = __importDefault(require("../entities/latitude"));
class AngularOperation {
    sum(angle1, angle2) {
        return angle1 + angle2;
    }
    subtract(angle1, angle2) {
        return angle1 - angle2;
    }
    divide(angle, divider) {
        return angle / divider;
    }
    LatitudeDifference(latitude1, latitude2) {
        let latitude;
        if (latitude1.GetHemisphere() === latitude2.GetHemisphere()) {
            let result = Math.abs(this.subtract(latitude1.Get(), latitude2.Get()));
            latitude = new latitude_1.default(result, latitude1.GetHemisphere());
            return latitude;
        }
        else {
            let result = this.sum(latitude1.Get(), latitude2.Get());
            latitude = new latitude_1.default(result, latitude1.GetHemisphere());
            return latitude;
        }
    }
}
module.exports = AngularOperation;
