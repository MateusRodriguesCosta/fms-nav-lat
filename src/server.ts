import express from 'express'; //Import the express dependency
import AngularOperations from './angularOperations';
import Coordinate from './coordinate';
import CoordinateConversion from './coordinateConversion';
import CoordinateType from './coordinateTypeEnum';

const app = express();              //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 80;              //Save the port number where your server will be listening

app.get('/', (req, res) => {

    let angularOperations = new AngularOperations();


    let coordinateConversion:CoordinateConversion = new CoordinateConversion();



    let c1:Coordinate = new Coordinate(coordinateConversion.toDecimal("55°36'15\""),1);
    //let c2:Coordinate = new Coordinate(coordinateConversion.toDecimal("10°56'75\""),2);    

    console.log(c1);

    console.log(coordinateConversion.toDMS(c1.GetLatitude()));

    //console.log('+' + c1.GetLatitude(CoordinateType.DMS));
    //console.log('+' + c2.GetLatitude(CoordinateType.DMS));

    //let cres = angularOperations.sum(c1, c2);

    res.send('Result is ' /*+ cres.GetLatitude(CoordinateType.DMS)*/);    

});

app.get('/track', (req, res) => {
    res.send('GETTING WHOLE TRACK COORDINATES');
});

app.get('/track/next', (req, res) => {
    res.send('GETTING THE NEXT WAYPOINT');
});

app.get('/track/last', (req, res) => {
    res.send('GETTING THE LAST WAYPOINT');
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});