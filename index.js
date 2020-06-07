import './style.css';
import 'ol/ol.css'
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Tile as TileLayer, Vector as VectorLayer, } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import Feature from 'ol/Feature.js';
import { LineString, Point } from 'ol/geom.js';
import { fromLonLat } from 'ol/proj.js';
import { Stroke, Style, Icon } from 'ol/style.js';

var london = fromLonLat([-0.12755, 51.507222]);

var map = new Map("map");
var raster = new TileLayer({
  source: new OSM()
});

var view = new View({
  center: london,
  zoom: 6
});

var map = new Map({
  layers: [raster],
  target: 'map',
  view: view,
  loadTilesWhileAnimating: true,
});

const coordsElement = document.getElementById('coords');
coordsElement.addEventListener('change', onCoordsEntered);
 
function onCoordsEntered(e){
  var latLong = e.target.value.split(",");  // parse lat,long user input
  if(latLong.length == 2){
    console.log(latLong);
    var coords = fromLonLat([parseFloat(latLong[1]), parseFloat(latLong[0])]); // flip lat/long for input to fromLonLat
      console.log(coords);

   // animate to the entered location
   view.animate({
      center: coords,
      duration: 500,
   });

   // use this instead if you don't want animation
   // view.setCenter(coords);
  }
}

