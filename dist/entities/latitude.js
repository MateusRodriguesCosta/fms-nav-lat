"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const angularConversion_1 = __importDefault(require("../core/angularConversion"));
const angularType_1 = __importDefault(require("../Enums/angularType"));
class Latitude {
    constructor(Latitude, Hemisphere) {
        this.Latitude = Latitude;
        this.Hemisphere = Hemisphere;
    }
    GetHemisphere() {
        return this.Hemisphere;
    }
    Get(type = angularType_1.default.Decimal) {
        const angularConversion = new angularConversion_1.default();
        switch (type) {
            case angularType_1.default.DMS:
                return angularConversion.toDMS(this.Latitude);
            case angularType_1.default.DegreePortion:
                return angularConversion.GetDegree(angularConversion.toDMS(this.Latitude));
            case angularType_1.default.MinutesPortion:
                return angularConversion.GetMinutes(angularConversion.toDMS(this.Latitude));
            case angularType_1.default.SecondsPortion:
                return angularConversion.GetSeconds(angularConversion.toDMS(this.Latitude));
            default:
                return this.Latitude;
        }
    }
}
module.exports = Latitude;
