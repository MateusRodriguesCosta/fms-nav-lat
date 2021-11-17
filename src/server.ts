import express from "express";
import path from "path";
import AngularConversion from "./core/angularConversion";
import GeodesicOperations from "./core/geodesicOperations";
import AngularOperation from "./core/geodesicOperations";
import Coordinate from "./entities/coordinate";
import Latitude from "./entities/latitude";
import Longitude from "./entities/longitude";
import Hemisphere from "./Enums/hemisphere";

const app = express();
const port = process.env.PORT || 80;

app.get("/", (req, res) => {

  res.sendFile(path.join(__dirname+'/../nav-showcase.html'));

});

app.get("/mock-airports", (req, res) => {
  
  res.sendFile(path.join(__dirname+'/../mock/MOCK_AIRPORTS.json'));  

});

app.get("/track", (req, res) => {
  
  const geoOps = new GeodesicOperations();
  
  let coordinate1:Coordinate = new Coordinate(new Latitude(-23.224540, Hemisphere.South), new Longitude(-45.861898, Hemisphere.West));
  let coordinate2:Coordinate = new Coordinate(new Latitude(-23.431944, Hemisphere.South), new Longitude(-46.469444, Hemisphere.West));

  let bearing:number = geoOps.forwardBearing(coordinate1, coordinate2);     
  let next_coordinate:Coordinate = geoOps.destinationFromBearing(coordinate1,bearing, 10);  
  let remaining_distance:number =  geoOps.distanceHaversine(coordinate1, coordinate2);
  
  let result_track: Coordinate[] = [next_coordinate];

  while(remaining_distance > 150) {

    next_coordinate = geoOps.destinationFromBearing(next_coordinate,bearing, 10);
    bearing = geoOps.forwardBearing(next_coordinate, coordinate2);    

    result_track = [...result_track, next_coordinate];

    remaining_distance = geoOps.distanceHaversine(next_coordinate, coordinate2);    

  }    
  
  res.send(result_track);
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
