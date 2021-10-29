import express from "express";
import Coordinate from "./entities/coordinate";
import AngularConversion from "./core/angularConversion";
import AngularType from "./Enums/angularType";
import Hemisphere from "./Enums/hemisphere";
import Latitude from "./entities/latitude";
import Longitude from "./entities/longitude";
import AngularOperation from "./core/geodesicOperations";

const app = express();
const port = process.env.PORT || 80;

app.get("/", (req, res) => {
  let angularOperations: AngularOperation = new AngularOperation();
  let coordinateConversion: AngularConversion = new AngularConversion();

 

  res.send("Result is ");
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
