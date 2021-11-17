"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const angularConversion_1 = __importDefault(require("../core/angularConversion"));
class Latitude {
    constructor(Latitude, Hemisphere = NaN) {
        this.Latitude = Latitude;
        this.Hemisphere = Hemisphere;
    }
    get hemisphere() {
        return this.Hemisphere;
    }
    set hemisphere(hemisphere) {
        this.Hemisphere = hemisphere;
    }
    get decimal() {
        return this.Latitude;
    }
    set decimal(latitude) {
        this.Latitude = latitude;
    }
    get radians() {
        return this.Latitude * Math.PI / 180;
    }
    get degrees() {
        return this.Latitude * 180 / Math.PI;
    }
    get dms() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.toDMS(this.Latitude);
    }
    get degreePortion() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.GetDegree(angularConversion.toDMS(this.Latitude));
    }
    get minutesPortion() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.GetMinutes(angularConversion.toDMS(this.Latitude));
    }
    get secondsPortion() {
        const angularConversion = new angularConversion_1.default();
        return angularConversion.GetSeconds(angularConversion.toDMS(this.Latitude));
    }
}
module.exports = Latitude;
