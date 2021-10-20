import express from 'express'; //Import the express dependency
import Coordinate from './coordinate';
import CoordinateType from './coordinateTypeEnum';

const app = express();              //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 80;              //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    //res.send('LAT NAV API SERVICE IS ONLINE');      //server responds by sending the index.html file to the client's browser                                 

    res.send('Result is ' + new Coordinate(156.742,156.742).GetLatitude(CoordinateType.DMS));

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