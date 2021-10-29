import Coordinate from "../entities/coordinate";
import Latitude from "../entities/latitude";
import Longitude from "../entities/longitude";
import Hemisphere from "../Enums/hemisphere";

class GeodesicOperations {
  private earthRadius = 6371e3; // metres

  sum(angle1: number, angle2: number): number {
    return angle1 + angle2;
  }

  subtract(angle1: number, angle2: number): number {
    return angle1 - angle2;
  }

  divide(angle: number, divider: number): number {
    return angle / divider;
  } 

  latitudeDifference(latitude1: Latitude, latitude2: Latitude): number {
    if (latitude1.hemisphere === latitude2.hemisphere) {
      return Math.abs(this.subtract(latitude1.decimal, latitude2.decimal));
    } else {
      return this.sum(latitude1.decimal, latitude2.decimal);
    }
  }

  averageLatitude(latitude1: Latitude, latitude2: Latitude): Latitude {
    if (latitude1.hemisphere === latitude2.hemisphere) {
      let result: number = this.sum(latitude1.decimal, latitude2.decimal);

      result = this.divide(result, 2);

      return new Latitude(result, latitude1.hemisphere);
    } else {
      let result: number = Math.abs(
        this.subtract(latitude1.decimal, latitude2.decimal)
      );

      result = this.divide(result, 2);

      if (latitude1.decimal >= latitude2.decimal) {
        return new Latitude(result, latitude1.hemisphere);
      } else {
        return new Latitude(result, latitude2.hemisphere);
      }
    }
  }

  colatitude(latitude: Latitude): Latitude {
    return new Latitude(90 - latitude.decimal, latitude.hemisphere);
  }

  longitudeDifference(longitude1: Longitude, longitude2: Longitude): number {
    if (longitude1.hemisphere === longitude2.hemisphere) {
      return Math.abs(this.subtract(longitude1.decimal, longitude2.decimal));
    } else {
      let result: number = this.sum(longitude1.decimal, longitude2.decimal);

      if (result > 180) {
        return 360 - result;
      }

      return result;
    }
  }

  averageLongitude(longitude1: Longitude, longitude2: Longitude): Longitude {
    if (longitude1.hemisphere === longitude2.hemisphere) {
      let result: number = this.sum(longitude1.decimal, longitude2.decimal);

      result = this.divide(result, 2);

      return new Longitude(result, longitude1.hemisphere);
    } else {
      let result: number = Math.abs(
        this.subtract(longitude1.decimal, longitude2.decimal)
      );

      result = this.divide(result, 2);

      if (longitude1.decimal >= longitude2.decimal) {
        return new Longitude(result, longitude1.hemisphere);
      } else {
        return new Longitude(result, longitude2.hemisphere);
      }
    }
  }

  antimeridian(longitude: Longitude): Longitude {
    return new Longitude(180 - longitude.decimal, longitude.hemisphere);
  }

  // This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is,
  // the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between
  // the points (ignoring any hills they fly over).
  // Haversine formula: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  // c = 2 ⋅ atan2( √a, √(1−a) )
  // d = R ⋅ c
  // where 	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
  // note that angles need to be in radians to pass to trig functions!
  distanceHaversine(coordinate1: Coordinate, coordinate2: Coordinate): number {
    const φ1 = (coordinate1.Latitude.decimal * Math.PI) / 180; // φ, λ in radians
    const φ2 = (coordinate2.Latitude.decimal * Math.PI) / 180;
    const Δφ =
      ((coordinate2.Latitude.decimal - coordinate1.Latitude.decimal) *
        Math.PI) /
      180;
    const Δλ =
      ((coordinate2.Longitude.decimal - coordinate1.Longitude.decimal) *
        Math.PI) /
      180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = this.earthRadius * c; // in metres

    return d;
  }

  // This formula is for the initial bearing (sometimes referred to as forward azimuth)
  // which if followed in a straight line along a great-circle arc will take you from the start point to the end point.
  // Formula: 	θ = atan2( sin Δλ ⋅ cos φ2 , cos φ1 ⋅ sin φ2 − sin φ1 ⋅ cos φ2 ⋅ cos Δλ )
  // where 	φ1,λ1 is the start point, φ2,λ2 the end point (Δλ is the difference in longitude)
  initialBearing(coordinate1: Coordinate, coordinate2: Coordinate): number {
    const y =
      Math.sin(coordinate2.Longitude.decimal - coordinate1.Longitude.decimal) *
      Math.cos(coordinate2.Latitude.decimal);
    const x =
      Math.cos(coordinate1.Latitude.decimal) *
        Math.sin(coordinate2.Latitude.decimal) -
      Math.sin(coordinate1.Latitude.decimal) *
        Math.cos(coordinate2.Latitude.decimal) *
        Math.cos(coordinate2.Longitude.decimal - coordinate1.Longitude.decimal);
    const θ = Math.atan2(y, x);
    const brng = ((θ * 180) / Math.PI + 360) % 360; // in degrees

    return brng;
  }

  // Given a start point, initial bearing, and distance, this will calculate the destina­tion point
  // and final bearing travelling along a (shortest distance) great circle arc.
  // Formula: 	φ2 = asin( sin φ1 ⋅ cos δ + cos φ1 ⋅ sin δ ⋅ cos θ )
  // λ2 = λ1 + atan2( sin θ ⋅ sin δ ⋅ cos φ1, cos δ − sin φ1 ⋅ sin φ2 )
  // where 	φ is latitude, λ is longitude, θ is the bearing (clockwise from north), δ is the angular distance d/R; d being the distance travelled, R the earth’s radius
  destinationFromBearing(
    coordinate1: Coordinate,
    bearing: number,
    distance: number
  ): Coordinate {
    const φ2 = Math.asin(
      Math.sin(coordinate1.Latitude.decimal) *
        Math.cos(distance / this.earthRadius) +
        Math.cos(coordinate1.Latitude.decimal) *
          Math.sin(distance / this.earthRadius) *
          Math.cos(bearing)
    );
    const λ2 =
      coordinate1.Longitude.decimal +
      Math.atan2(
        Math.sin(bearing) *
          Math.sin(distance / this.earthRadius) *
          Math.cos(coordinate1.Latitude.decimal),
        Math.cos(distance / this.earthRadius) -
          Math.sin(coordinate1.Latitude.decimal) * Math.sin(φ2)
      );

    // The longitude can be normalised to −180…+180 using (lon+540)%360-180

    let latitude:Latitude = new Latitude(φ2);
    let longitude:Longitude = new Longitude(φ2);
    let coordinate:Coordinate = new Coordinate(latitude, longitude);
    
    coordinate.setHemispheres();

    return coordinate;
  }
}

export = GeodesicOperations;
