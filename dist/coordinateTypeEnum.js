"use strict";
var CoordinateType;
(function (CoordinateType) {
    CoordinateType[CoordinateType["Decimal"] = 1] = "Decimal";
    CoordinateType[CoordinateType["DMS"] = 2] = "DMS";
    CoordinateType[CoordinateType["DegreePortion"] = 3] = "DegreePortion";
    CoordinateType[CoordinateType["MinutesPortion"] = 4] = "MinutesPortion";
    CoordinateType[CoordinateType["SecondsPortion"] = 5] = "SecondsPortion";
})(CoordinateType || (CoordinateType = {}));
module.exports = CoordinateType;
