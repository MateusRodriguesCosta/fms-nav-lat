import AngularConversion from "../core/angularConversion";
import AngularType from "../Enums/angularType";
import Hemisphere from "../Enums/hemisphere";

class Longitude {
  private Longitude: number;
  private Hemisphere: Hemisphere;

  constructor(Longitude: number, Hemisphere: Hemisphere) {
    this.Longitude = Longitude;
    this.Hemisphere = Hemisphere;
  }

  GetHemisphere(): Hemisphere {
    return this.Hemisphere;
  }

  Get(type: AngularType = AngularType.Decimal): any {
    const angularConversion: AngularConversion = new AngularConversion();

    switch (type) {
      case AngularType.DMS:
        return angularConversion.toDMS(this.Longitude);
      case AngularType.DegreePortion:
        return angularConversion.GetDegree(
          angularConversion.toDMS(this.Longitude)
        );
      case AngularType.MinutesPortion:
        return angularConversion.GetMinutes(
          angularConversion.toDMS(this.Longitude)
        );
      case AngularType.SecondsPortion:
        return angularConversion.GetSeconds(
          angularConversion.toDMS(this.Longitude)
        );
      default:
        return this.Longitude;
    }
  }
}

export = Longitude;
