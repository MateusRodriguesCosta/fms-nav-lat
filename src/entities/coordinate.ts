import Hemisphere from "../Enums/hemisphere";
import Latitude from "./latitude";
import Longitude from "./longitude";

class Coordinate {

  public Latitude: Latitude;
  public Longitude: Longitude;

  constructor(Latitude: Latitude, Longitude: Longitude) {
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }

  public setHemispheres(){
    if (this.Latitude.decimal >= 0) {
      this.Latitude.hemisphere = Hemisphere.North;
    } else {
      this.Latitude.hemisphere = Hemisphere.South;
    }

    if (this.Longitude.decimal >= 0) {
      this.Longitude.hemisphere = Hemisphere.East;
    } else {
      this.Longitude.hemisphere = Hemisphere.West;
    }
  }
  
}

export = Coordinate;
