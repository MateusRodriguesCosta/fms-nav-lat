"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const coordinateConversion_1 = __importDefault(require("./coordinateConversion"));
const coordinateTypeEnum_1 = __importDefault(require("./coordinateTypeEnum"));
class Coordinate {
    constructor(Latitude, Longitude) {
        this.Latitude = Latitude;
        this.Longitude = Longitude;
    }
    GetLatitude(type = coordinateTypeEnum_1.default.Decimal) {
        const coordinateConversion = new coordinateConversion_1.default();
        switch (type) {
            case coordinateTypeEnum_1.default.DMS:
                return coordinateConversion.toDMS(this.Latitude);
            case coordinateTypeEnum_1.default.DegreePortion:
                return coordinateConversion.GetDegree(coordinateConversion.toDMS(this.Latitude));
            case coordinateTypeEnum_1.default.MinutesPortion:
                return coordinateConversion.GetMinutes(coordinateConversion.toDMS(this.Latitude));
            case coordinateTypeEnum_1.default.SecondsPortion:
                return coordinateConversion.GetSeconds(coordinateConversion.toDMS(this.Latitude));
            default:
                return this.Latitude;
        }
    }
    GetLongitude(type = coordinateTypeEnum_1.default.Decimal) {
        const coordinateConversion = new coordinateConversion_1.default();
        switch (type) {
            case coordinateTypeEnum_1.default.DMS:
                return coordinateConversion.toDMS(this.Longitude);
            case coordinateTypeEnum_1.default.DegreePortion:
                return coordinateConversion.GetDegree(coordinateConversion.toDMS(this.Longitude));
            case coordinateTypeEnum_1.default.MinutesPortion:
                return coordinateConversion.GetMinutes(coordinateConversion.toDMS(this.Longitude));
            case coordinateTypeEnum_1.default.SecondsPortion:
                return coordinateConversion.GetSeconds(coordinateConversion.toDMS(this.Longitude));
            default:
                return this.Longitude;
        }
    }
}
module.exports = Coordinate;
