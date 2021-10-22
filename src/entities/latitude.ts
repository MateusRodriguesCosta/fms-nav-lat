import AngularConversion from "../core/angularConversion";
import AngularType from "../Enums/angularType";
import Hemisphere from "../Enums/hemisphere";

class Latitude {
  private Latitude: number;
  private Hemisphere: Hemisphere;

  constructor(Latitude: number, Hemisphere: Hemisphere) {
    this.Latitude = Latitude;
    this.Hemisphere = Hemisphere;
  }

  GetHemisphere(): Hemisphere {
    return this.Hemisphere;
  }

  Get(type: AngularType = AngularType.Decimal): any {
    const angularConversion: AngularConversion = new AngularConversion();

    switch (type) {
      case AngularType.DMS:
        return angularConversion.toDMS(this.Latitude);
      case AngularType.DegreePortion:
        return angularConversion.GetDegree(
          angularConversion.toDMS(this.Latitude)
        );
      case AngularType.MinutesPortion:
        return angularConversion.GetMinutes(
          angularConversion.toDMS(this.Latitude)
        );
      case AngularType.SecondsPortion:
        return angularConversion.GetSeconds(
          angularConversion.toDMS(this.Latitude)
        );
      default:
        return this.Latitude;
    }
  }
}

export = Latitude;
