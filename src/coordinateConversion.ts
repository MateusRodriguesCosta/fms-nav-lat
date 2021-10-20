import CoordinateType from './coordinateTypeEnum';

class CoordinateConversion {

    toDMS(decimal: number): string {

        let degrees:number = Math.trunc(decimal); // Non Decimal value
        let minutes:number = 0;
        let seconds:number = 0;

        if ((decimal + "").split(".")[1] != undefined) {

            minutes = Math.trunc(+("0." + (decimal + "").split(".")[1]) * 60); // Decimal value Multiplied by 60 then the non decimal result

        } else {
            
            return `${degrees}°0'0"`;

        }

        if((minutes + "").split(".")[1] != undefined) {

            seconds = +("0." + (minutes + "").split(".")[1]) * 60; // Decimal value from above Multiplied by 60

        } else {

            return `${degrees}°${minutes}'0"`;

        }

        return `${degrees}°${minutes}'${seconds}"`;

    }

    toDecimal(DMS: string): number {

        if(this.GetDegree(DMS) === -1) return -1;
        if(this.GetMinutes(DMS) === -1) return -1;
        if(this.GetSeconds(DMS) === -1) return -1;

        return this.GetDegree(DMS) + (this.GetMinutes(DMS)/60) + (this.GetMinutes(DMS)/3600)

    }

    GetDegree(DMS: string): number {

        if(DMS) {

            return +DMS.split("°")[0];

        }

        return -1;
    }

    GetMinutes(DMS: string): number {

        if(DMS) {

            return +DMS.split("'")[0];

        }

        return -1;
    }

    GetSeconds(DMS: string): number {
        
        if(DMS) {

            return +DMS.split("\"")[0];

        }

        return -1;
    }    

  }
  
  export = CoordinateConversion;