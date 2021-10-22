"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const angularConversion_1 = __importDefault(require("../core/angularConversion"));
const angularType_1 = __importDefault(require("../Enums/angularType"));
class Longitude {
    constructor(Longitude, Hemisphere) {
        this.Longitude = Longitude;
        this.Hemisphere = Hemisphere;
    }
    GetHemisphere() {
        return this.Hemisphere;
    }
    Get(type = angularType_1.default.Decimal) {
        const angularConversion = new angularConversion_1.default();
        switch (type) {
            case angularType_1.default.DMS:
                return angularConversion.toDMS(this.Longitude);
            case angularType_1.default.DegreePortion:
                return angularConversion.GetDegree(angularConversion.toDMS(this.Longitude));
            case angularType_1.default.MinutesPortion:
                return angularConversion.GetMinutes(angularConversion.toDMS(this.Longitude));
            case angularType_1.default.SecondsPortion:
                return angularConversion.GetSeconds(angularConversion.toDMS(this.Longitude));
            default:
                return this.Longitude;
        }
    }
}
module.exports = Longitude;
