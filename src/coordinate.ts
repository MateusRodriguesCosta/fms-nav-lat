import CoordinateConversion from './coordinateConversion';
import CoordinateType from './coordinateTypeEnum';

class Coordinate {

    private Latitude: number;
    private Longitude: number;
  
    constructor(Latitude: number, Longitude: number) {
      this.Latitude = Latitude;
      this.Longitude = Longitude;
    }

    GetLatitude(type: CoordinateType = CoordinateType.Decimal): any {
        
        const coordinateConversion:CoordinateConversion = new CoordinateConversion();

        switch (type) {
          case CoordinateType.DMS:
            return coordinateConversion.toDMS(this.Latitude);
          case CoordinateType.DegreePortion:
            return coordinateConversion.GetDegree(coordinateConversion.toDMS(this.Latitude));
          case CoordinateType.MinutesPortion:
            return coordinateConversion.GetMinutes(coordinateConversion.toDMS(this.Latitude));
          case CoordinateType.SecondsPortion:
            return coordinateConversion.GetSeconds(coordinateConversion.toDMS(this.Latitude));
          default:
            return this.Latitude;
        }
  
    }

    GetLongitude(type: CoordinateType = CoordinateType.Decimal): any {

        const coordinateConversion:CoordinateConversion = new CoordinateConversion();

        switch (type) {
          case CoordinateType.DMS:
            return coordinateConversion.toDMS(this.Longitude);
          case CoordinateType.DegreePortion:
            return coordinateConversion.GetDegree(coordinateConversion.toDMS(this.Longitude));
          case CoordinateType.MinutesPortion:
            return coordinateConversion.GetMinutes(coordinateConversion.toDMS(this.Longitude));
          case CoordinateType.SecondsPortion:
            return coordinateConversion.GetSeconds(coordinateConversion.toDMS(this.Longitude));
          default:
            return this.Longitude;
        }  
    }

  }
  
  export = Coordinate;