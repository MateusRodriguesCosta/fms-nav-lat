import CoordinateType from './coordinateTypeEnum';

class Coordinate {

    private Latitude: number;
    private Longitude: number;
  
    constructor(Latitude: number, Longitude: number) {
      this.Latitude = Latitude;
      this.Longitude = Longitude;
    }
  
    public Get(type: CoordinateType = NaN) {

        if (type = CoordinateType.Decimal) {
            return ``;
        } if (type = CoordinateType.DegreePortion) {
            return ``;
        } else if(type = CoordinateType.MinutesPortion) {
            return ``;
        } else if(type = CoordinateType.SecondsPortion) {
            return ``;
        } else {
            return ``;
        }   
    }
   
    public Set() {
        return ``;
    }

  }
  
  export = Coordinate;