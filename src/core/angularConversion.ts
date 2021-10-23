import Hemisphere from "../Enums/hemisphere";

class AngularConversions {
  toDMS(value: number): string {
    // Degrees are the Non Decimal value
    let degrees: number = Math.trunc(value);
    let minutes: number = 0;
    let seconds: number = 0;

    // Get the decimal portion
    let decimalPortion: number = +("0." + (value + "").split(".")[1]);

    if (typeof decimalPortion !== "number" || Number.isNaN(decimalPortion)) {
      return `${degrees}°0'0"`;
    } else {
      // Minutes are the decimal portion multiplied by 60 then the integer result
      minutes = Math.trunc(decimalPortion * 60);

      // Get the decimal portion from the decimal portion above multiplied by 60
      decimalPortion = +("0." + (decimalPortion * 60 + "").split(".")[1]);

      if (typeof decimalPortion !== "number" || Number.isNaN(decimalPortion)) {
        return `${degrees}°${minutes}'0"`;
      } else {
        // Seconds are the decimal portion from above multiplied again by 60 then the integer rounded
        seconds = Math.round(decimalPortion * 60);
      }
    }

    return `${degrees}°${minutes}'${seconds}"`;
  }

  toDecimal(value: string, hemisphere: Hemisphere): number {

    if (this.GetDegree(value) === -1) return -1;
    if (this.GetMinutes(value) === -1) return -1;
    if (this.GetSeconds(value) === -1) return -1;

    if(hemisphere === Hemisphere.North || hemisphere === Hemisphere.East){

      return (
        this.GetDegree(value) +
        this.GetMinutes(value) / 60 +
        this.GetSeconds(value) / 3600
      );

    } else {

      return -(
        this.GetDegree(value) +
        this.GetMinutes(value) / 60 +
        this.GetSeconds(value) / 3600
      );

    }

    
  }

  GetDegree(value: string): number {
    if (value) {
      return +value.split("°")[0];
    }

    return -1;
  }

  GetMinutes(value: string): number {
    if (value) {
      return +value.split("°")[1].split("'")[0];
    }

    return -1;
  }

  GetSeconds(value: string): number {
    if (value) {
      return +value.split("'")[1].split('"')[0];
    }

    return -1;
  }
}

export = AngularConversions;
