import coordinate from './entities/coordinate';

class Navigation {
  
    private inertialCoordinates: coordinate;

    constructor(inertialCoordinates: coordinate) {
      this.inertialCoordinates = inertialCoordinates;
    }
  
    public pathToNextWaypoint() {
        //new Coordinate(156.742,156.742).GetLatitude(CoordinateType.DMS)
      return ``;
    }
   
    public calcCurveRadius() {
        return ``;
    }

  }
  
  export = Navigation;