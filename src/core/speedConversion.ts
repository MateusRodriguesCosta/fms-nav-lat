class SpeedConversion {
  kilometerToKnot(kilometer: number): number {
    return kilometer * 0.539956803;
  }
  kilometerToMile(kilometer: number): number {
    return kilometer * 0.621371;
  }
  knotToKilometer(knot: number): number {
    return knot * 1.852;
  }
  knotToMile(knot: number): number {
    return knot * 1.15078;
  }
  mileToKnot(mile: number): number {
    return mile * 0.8689762419;
  }
  mileToKilometer(mile: number): number {
    return mile * 1.609344;
  }
}

export = SpeedConversion;
