"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const angularConversion_1 = __importDefault(require("../core/angularConversion"));
class Longitude {
    constructor(Longitude, Hemisphere = NaN) {
        this.Longitude = Longitude;
        this.Hemisphere = Hemisphere;
    }
    get hemisphere() {
        return this.Hemisphere;
    }
    set hemisphere(hemisphere) {
        this.Hemisphere = hemisphere;
    }
    get decimal() {
        return this.Longitude;
    }
    set decimal(longitude) {
        this.Longitude = longitude;
    }
    get dms() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.toDMS(this.Longitude);
    }
    get degreePortion() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.GetDegree(angularConversion.toDMS(this.Longitude));
    }
    get minutesPortion() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.GetMinutes(angularConversion.toDMS(this.Longitude));
    }
    get secondsPortion() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.GetSeconds(angularConversion.toDMS(this.Longitude));
    }
}
module.exports = Longitude;
