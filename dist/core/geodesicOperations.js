"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const coordinate_1 = __importDefault(require("../entities/coordinate"));
const latitude_1 = __importDefault(require("../entities/latitude"));
const longitude_1 = __importDefault(require("../entities/longitude"));
class GeodesicOperations {
    constructor() {
        this.earthRadius = 6371000;
    }
    sum(angle1, angle2) {
        return angle1 + angle2;
    }
    subtract(angle1, angle2) {
        return angle1 - angle2;
    }
    divide(angle, divider) {
        return angle / divider;
    }
    latitudeDifference(latitude1, latitude2) {
        if (latitude1.hemisphere === latitude2.hemisphere) {
            return Math.abs(this.subtract(latitude1.decimal, latitude2.decimal));
        }
        else {
            return this.sum(latitude1.decimal, latitude2.decimal);
        }
    }
    averageLatitude(latitude1, latitude2) {
        if (latitude1.hemisphere === latitude2.hemisphere) {
            let result = this.sum(latitude1.decimal, latitude2.decimal);
            result = this.divide(result, 2);
            return new latitude_1.default(result, latitude1.hemisphere);
        }
        else {
            let result = Math.abs(this.subtract(latitude1.decimal, latitude2.decimal));
            result = this.divide(result, 2);
            if (latitude1.decimal >= latitude2.decimal) {
                return new latitude_1.default(result, latitude1.hemisphere);
            }
            else {
                return new latitude_1.default(result, latitude2.hemisphere);
            }
        }
    }
    colatitude(latitude) {
        return new latitude_1.default(90 - latitude.decimal, latitude.hemisphere);
    }
    longitudeDifference(longitude1, longitude2) {
        if (longitude1.hemisphere === longitude2.hemisphere) {
            return Math.abs(this.subtract(longitude1.decimal, longitude2.decimal));
        }
        else {
            let result = this.sum(longitude1.decimal, longitude2.decimal);
            if (result > 180) {
                return 360 - result;
            }
            return result;
        }
    }
    averageLongitude(longitude1, longitude2) {
        if (longitude1.hemisphere === longitude2.hemisphere) {
            let result = this.sum(longitude1.decimal, longitude2.decimal);
            result = this.divide(result, 2);
            return new longitude_1.default(result, longitude1.hemisphere);
        }
        else {
            let result = Math.abs(this.subtract(longitude1.decimal, longitude2.decimal));
            result = this.divide(result, 2);
            if (longitude1.decimal >= longitude2.decimal) {
                return new longitude_1.default(result, longitude1.hemisphere);
            }
            else {
                return new longitude_1.default(result, longitude2.hemisphere);
            }
        }
    }
    antimeridian(longitude) {
        return new longitude_1.default(180 - longitude.decimal, longitude.hemisphere);
    }
    // This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is,
    // the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between
    // the points (ignoring any hills they fly over).
    // Haversine formula: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    // c = 2 ⋅ atan2( √a, √(1−a) )
    // d = R ⋅ c
    // where 	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
    // note that angles need to be in radians to pass to trig functions!
    distanceHaversine(coordinate1, coordinate2) {
        const φ1 = (coordinate1.Latitude.decimal * Math.PI) / 180; // φ, λ in radians
        const φ2 = (coordinate2.Latitude.decimal * Math.PI) / 180;
        const Δφ = ((coordinate2.Latitude.decimal - coordinate1.Latitude.decimal) *
            Math.PI) /
            180;
        const Δλ = ((coordinate2.Longitude.decimal - coordinate1.Longitude.decimal) *
            Math.PI) /
            180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = this.earthRadius * c; // in metres
        return d;
    }
    // This formula is for the initial bearing (sometimes referred to as forward azimuth)
    // which if followed in a straight line along a great-circle arc will take you from the start point to the end point.
    // Formula: 	θ = atan2( sin Δλ ⋅ cos φ2 , cos φ1 ⋅ sin φ2 − sin φ1 ⋅ cos φ2 ⋅ cos Δλ )
    // where 	φ1,λ1 is the start point, φ2,λ2 the end point (Δλ is the difference in longitude)
    forwardBearing(coordinate1, coordinate2) {
        const y = Math.sin(coordinate2.Longitude.radians - coordinate1.Longitude.radians) *
            Math.cos(coordinate2.Latitude.radians);
        const x = Math.cos(coordinate1.Latitude.radians) *
            Math.sin(coordinate2.Latitude.radians) -
            Math.sin(coordinate1.Latitude.radians) *
                Math.cos(coordinate2.Latitude.radians) *
                Math.cos(coordinate2.Longitude.radians - coordinate1.Longitude.radians);
        const θ = Math.atan2(y, x);
        return θ;
    }
    // Given a start point, initial bearing, and distance, this will calculate the destina­tion point
    // and final bearing travelling along a (shortest distance) great circle arc.
    // Formula: 	φ2 = asin( sin φ1 ⋅ cos δ + cos φ1 ⋅ sin δ ⋅ cos θ )
    // λ2 = λ1 + atan2( sin θ ⋅ sin δ ⋅ cos φ1, cos δ − sin φ1 ⋅ sin φ2 )
    // where 	φ is latitude, λ is longitude, θ is the bearing (clockwise from north), δ is the angular distance d/R; d being the distance travelled, R the earth’s radius
    destinationFromBearing(coordinate, bearing, distance) {
        const distancia_angular = distance / this.earthRadius;
        const start_lat = coordinate.Latitude.radians;
        const start_lng = coordinate.Longitude.radians;
        const φ2 = Math.asin(Math.sin(start_lat) * Math.cos(distancia_angular) + Math.cos(start_lat) * Math.sin(distancia_angular) * Math.cos(bearing));
        const λ2 = start_lng + Math.atan2(Math.sin(bearing) * Math.sin(distancia_angular) * Math.cos(start_lat), Math.cos(distancia_angular) - Math.sin(start_lat) * Math.sin(φ2));
        // Convert back from radians to degrees
        const coordinate_res = new coordinate_1.default(new latitude_1.default(φ2 * 180 / Math.PI), new longitude_1.default(λ2 * 180 / Math.PI));
        coordinate_res.setHemispheres();
        return coordinate_res;
    }
}
module.exports = GeodesicOperations;
