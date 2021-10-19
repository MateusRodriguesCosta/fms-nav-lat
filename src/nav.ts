import coordinate from './coordinate';

class Navigation {
  
    private inertialCoordinates: coordinate;

    constructor(inertialCoordinates: coordinate) {
      this.inertialCoordinates = inertialCoordinates;
    }
  
    public pathToNextWaypoint() {
      return ``;
    }
   
    public calcCurveRadius() {
        return ``;
    }

  }
  
  export = Navigation;