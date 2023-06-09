"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hemisphere_1 = __importDefault(require("../Enums/hemisphere"));
class AngularConversions {
    toDMS(value) {
        // Degrees are the Non Decimal value
        let degrees = Math.trunc(value);
        let minutes = 0;
        let seconds = 0;
        // Get the decimal portion
        let decimalPortion = +("0." + (value + "").split(".")[1]);
        if (typeof decimalPortion !== "number" || Number.isNaN(decimalPortion)) {
            return `${degrees}°0'0"`;
        }
        else {
            // Minutes are the decimal portion multiplied by 60 then the integer result
            minutes = Math.trunc(decimalPortion * 60);
            // Get the decimal portion from the decimal portion above multiplied by 60
            decimalPortion = +("0." + (decimalPortion * 60 + "").split(".")[1]);
            if (typeof decimalPortion !== "number" || Number.isNaN(decimalPortion)) {
                return `${degrees}°${minutes}'0"`;
            }
            else {
                // Seconds are the decimal portion from above multiplied again by 60 then the integer rounded
                seconds = Math.round(decimalPortion * 60);
            }
        }
        return `${degrees}°${minutes}'${seconds}"`;
    }
    toDecimal(value, hemisphere) {
        if (this.GetDegree(value) === -1)
            return -1;
        if (this.GetMinutes(value) === -1)
            return -1;
        if (this.GetSeconds(value) === -1)
            return -1;
        if (hemisphere === hemisphere_1.default.North || hemisphere === hemisphere_1.default.East) {
            return (this.GetDegree(value) +
                this.GetMinutes(value) / 60 +
                this.GetSeconds(value) / 3600);
        }
        else {
            return -(this.GetDegree(value) +
                this.GetMinutes(value) / 60 +
                this.GetSeconds(value) / 3600);
        }
    }
    GetDegree(value) {
        if (value) {
            return +value.split("°")[0];
        }
        return -1;
    }
    GetMinutes(value) {
        if (value) {
            return +value.split("°")[1].split("'")[0];
        }
        return -1;
    }
    GetSeconds(value) {
        if (value) {
            return +value.split("'")[1].split('"')[0];
        }
        return -1;
    }
}
module.exports = AngularConversions;
