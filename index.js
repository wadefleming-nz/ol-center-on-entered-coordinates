import './style.css';
import 'ol/ol.css'
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Tile as TileLayer } from 'ol/layer.js';
import { OSM } from 'ol/source.js';
import { fromLonLat } from 'ol/proj.js';

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
    // flip lat/long for input to fromLonLat
    var coords = fromLonLat([parseFloat(latLong[1]), parseFloat(latLong[0])]);

    // animate to the entered location
    view.animate({
      center: coords,
      duration: 500,
    });

    // use this instead if you don't want animation
    // view.setCenter(coords);
  }
}

