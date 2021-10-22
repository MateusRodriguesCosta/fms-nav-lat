import Latitude from "./latitude";
import Longitude from "./longitude";

class Coordinate {

  public Latitude: Latitude;
  public Longitude: Longitude;

  constructor(Latitude: Latitude, Longitude: Longitude) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }
  
}

export = Coordinate;
