import express from "express";
import Coordinate from "./entities/coordinate";
import AngularConversion from "./core/angularConversion";
import AngularType from "./Enums/angularType";
import Hemisphere from "./Enums/hemisphere";
import Latitude from "./entities/latitude";
import Longitude from "./entities/longitude";
import AngularOperation from "./core/angularOperations";

const app = express();
const port = process.env.PORT || 80;

app.get("/", (req, res) => {
  let angularOperations: AngularOperation = new AngularOperation();
  let coordinateConversion: AngularConversion = new AngularConversion();

  let c1: Coordinate = new Coordinate(
    new Latitude(1.23005, Hemisphere.North),
    new Longitude(123.457, Hemisphere.East)
  );
  let c2: Coordinate = new Coordinate(
    new Latitude(12.3558, Hemisphere.North),
    new Longitude(12.3, Hemisphere.East)
  );

  let cres: number = angularOperations.sum(
    c1.Latitude.Get(),
    c2.Latitude.Get()
  );

  res.send("Result is " + cres);
});

app.get("/track", (req, res) => {
  res.send("GETTING WHOLE TRACK COORDINATES");
});

app.get("/track/next", (req, res) => {
  res.send("GETTING THE NEXT WAYPOINT");
});

app.get("/track/last", (req, res) => {
  res.send("GETTING THE LAST WAYPOINT");
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
