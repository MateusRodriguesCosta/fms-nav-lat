import AngularConversion from "../core/angularConversion";
import AngularType from "../Enums/angularType";
import Hemisphere from "../Enums/hemisphere";

class Latitude {
  private Latitude: number;
  private Hemisphere: Hemisphere;

  constructor(Latitude: number, Hemisphere: Hemisphere = NaN) {
    this.Latitude = Latitude;
    this.Hemisphere = Hemisphere;
  }

  public get hemisphere(): Hemisphere {
    return this.Hemisphere;
  }

  public set hemisphere(hemisphere: Hemisphere){
    this.Hemisphere = hemisphere;
  }

  public get decimal(): number {
    return this.Latitude;
  }

  public set decimal(latitude: number) {
    this.Latitude = latitude;
  }

  public get dms(): string {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.toDMS(this.Latitude);
  }

  public get degreePortion(): number {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.GetDegree(
      angularConversion.toDMS(this.Latitude)
    );
  }

  public get minutesPortion(): number {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.GetMinutes(
      angularConversion.toDMS(this.Latitude)
    );
  }

  public get secondsPortion(): number {
    const angularConversion: AngularConversion = new AngularConversion();
    return angularConversion.GetSeconds(
      angularConversion.toDMS(this.Latitude)
    );
  }

}

export = Latitude;
