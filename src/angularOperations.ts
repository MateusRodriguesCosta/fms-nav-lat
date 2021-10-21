import Coordinate from "./coordinate";
import CoordinateType from "./coordinateTypeEnum";

class AngularOperations {

    sum(coordinate1: Coordinate, coordinate2: Coordinate): Coordinate {            

        let latitude:number = coordinate1.GetLatitude() + coordinate2.GetLatitude();
        let longitude:number = coordinate1.GetLongitude() + coordinate2.GetLongitude();

        return new Coordinate(latitude,longitude);

    }

    subtract(coordinate1: Coordinate, coordinate2: Coordinate) {

        let latitude:number = coordinate1.GetLatitude() - coordinate2.GetLatitude();
        let longitude:number = coordinate1.GetLongitude() - coordinate2.GetLongitude();

        return new Coordinate(latitude,longitude);

    }

}


export = AngularOperations;