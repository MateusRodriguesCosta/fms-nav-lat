import Latitude from "../entities/latitude";

class AngularOperation {
  sum(angle1: number, angle2: number): number {
    return angle1 + angle2;
  }

  subtract(angle1: number, angle2: number): number {
    return angle1 - angle2;
  }

  divide(angle: number, divider: number): number {
    return angle / divider;
  }

  LatitudeDifference(latitude1: Latitude, latitude2: Latitude): Latitude {
    let latitude: Latitude;

    if (latitude1.GetHemisphere() === latitude2.GetHemisphere()) {
      let result: number = Math.abs(
        this.subtract(latitude1.Get(), latitude2.Get())
      );

      latitude = new Latitude(result, latitude1.GetHemisphere());

      return latitude;
    } else {
      let result: number = this.sum(latitude1.Get(), latitude2.Get());

      latitude = new Latitude(result, latitude1.GetHemisphere());

      return latitude;
    }
  }

  /*
    sum1(coordinate1: Coordinate, coordinate2: Coordinate): Coordinate {            

        let latitude:number = coordinate1.GetLatitude() + coordinate2.GetLatitude();
        let longitude:number = coordinate1.GetLongitude() + coordinate2.GetLongitude();

        return new Coordinate(latitude,longitude);

    }

    

    divide3(coordinate: Coordinate, value: number): Coordinate {
    
        let latitude:number = coordinate.GetLatitude() / value;
        let longitude:number = coordinate.GetLongitude() / value;

        return new Coordinate(latitude,longitude);
    }*/
}

export = AngularOperation;
