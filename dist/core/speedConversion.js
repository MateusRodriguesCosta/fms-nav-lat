"use strict";
class SpeedConversion {
    kilometerToKnot(kilometer) {
        return kilometer * 0.539956803;
    }
    kilometerToMile(kilometer) {
        return kilometer * 0.621371;
    }
    knotToKilometer(knot) {
        return knot * 1.852;
    }
    knotToMile(knot) {
        return knot * 1.15078;
    }
    mileToKnot(mile) {
        return mile * 0.8689762419;
    }
    mileToKilometer(mile) {
        return mile * 1.609344;
    }
}
module.exports = SpeedConversion;
