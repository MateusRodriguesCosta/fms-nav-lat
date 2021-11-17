import AngularConversion from "../core/angularConversion";
import Hemisphere from "../Enums/hemisphere";

class Longitude {
  private Longitude: number;
  private Hemisphere: Hemisphere;

  constructor(Longitude: number, Hemisphere: Hemisphere = NaN) {
    this.Longitude = Longitude;
    this.Hemisphere = Hemisphere;
  }

  public get hemisphere(): Hemisphere {
    return this.Hemisphere;
  }

  public set hemisphere(hemisphere: Hemisphere) {
    this.Hemisphere = hemisphere;
  }

  public get decimal(): number {
    return this.Longitude;
  }

  public set decimal(longitude: number) {
    this.Longitude = longitude;
  }

  public get radians(): number {
    return this.Longitude * Math.PI / 180;
  }

  public get degrees(): number {
    return this.Longitude * 180 / Math.PI;
  }

  public get dms(): string {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.toDMS(this.Longitude);
  }

  public get degreePortion(): number {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.GetDegree(
      angularConversion.toDMS(this.Longitude)
    );
  }

  public get minutesPortion(): number {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.GetMinutes(
      angularConversion.toDMS(this.Longitude)
    );
  }

  public get secondsPortion(): number {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.GetSeconds(
      angularConversion.toDMS(this.Longitude)
    );
  }
}

export = Longitude;
