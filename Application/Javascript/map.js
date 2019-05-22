//connects to firebase


const firebaseConfig = {
    apiKey: "AIzaSyC92FAonMbNaZiapSbs_A0RDzS0YPgpcMw",
    authDomain: "parkaway-comp2930.firebaseapp.com",
    databaseURL: "https://parkaway-comp2930.firebaseio.com",
    projectId: "parkaway-comp2930",
    storageBucket: "parkaway-comp2930.appspot.com",
    messagingSenderId: "817259487218",
    appId: "1:817259487218:web:c64c81d3cf0c5465"
};

firebase.initializeApp(firebaseConfig);
  
//Function to read data from firebase
  

  
  
var database = firebase.database();

//root ref to firebase.

function initMap() {
  var lotAColor = 0;
  var ref = database.ref().child('parkinglot');
    ref.on('value',getData);

// Function to convert RGB value to hexdecimal.
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//Read parking lot status from Firebase.
function getData(data) {

  var lots = data.val();
  var lotArray = Object.keys(lots);


  // Determine the color of the circle based on how full it is.
  function lotColor(lotName) { 
    for (var i = 0; i < lotArray.length; i++) {
      var k = lotArray[i];
      if (lotName.toString() == lotArray[i]) {
        var colorNum = lots[k].full;
    
    //get RGB values.
    var a = colorNum >= 50 ? 255 : Math.round(colorNum /50 * 255);
    var b = colorNum >= 50 ? Math.round(255 - ((colorNum -50)/50 * 255)) : 255;

    //Calc color.
    var myColor = rgbToHex(a,b,0);
    return myColor;
    }
  }
}
     
    // Get color responding to fullness from  database
    lotAColor = lotColor("lotA");
    lotBColor = lotColor("lotB");
    lotDColor = lotColor("lotD");
    lotFColor = lotColor("lotF");
    lotGColor = lotColor("lotG");
    lotJColor = lotColor("lotJ");
    lotKColor = lotColor("lotK");
    lotLColor = lotColor("lotL");
    lotNColor = lotColor("lotN");
    lotOColor = lotColor("lotO");
    lotQColor = lotColor("lotQ");

  
// Initialize and add the map

var BCIT = {lat: 49.248, lng: -123.0018124};
//customize icon.
var parkingIcon = "https://img.icons8.com/dusk/48/000000/parking.png"

//google map
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15.5,
  zoomControl: false,
  center: BCIT,
  gestureHandling: 'cooperative',
  disableDefaultUI: true,
  styles:
  [
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "weight": 1
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "weight": 0.8
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "water",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      }
  ]
});
  
          //geolocations of parking lot locations        
  
          var lotA = new google.maps.Marker({
            position: {lat: 49.2520931, lng:-122.9987794},
            map: map,
            title: 'Student Parking Lot A',
            icon: parkingIcon
          });
  
          var lotB = new google.maps.Marker({
              position: {lat:49.2509521, lng: -122.9985251},
              map:map,
              title: 'Student Parking Lot B',
              icon: parkingIcon
          });
  
          var lotD = new google.maps.Marker({
              position: {lat:49.2480284, lng:-122.9991663},
              map:map,
              title: 'Student Parking Lot D',
              icon: parkingIcon
          });
  
          
          var lotF = new google.maps.Marker({
              position: {lat: 49.2471789, lng:-122.9989153},
              map:map,
              title: 'Student Parking Lot F',
              icon: parkingIcon
          });
  
  
          var lotG = new google.maps.Marker({
              position: {lat: 49.2460731, lng: -122.9980626},
              map:map,
              title: 'Student Parking Lot G',
              icon: parkingIcon
          });
  
  
          var lotJ = new google.maps.Marker({
              position: {lat: 49.2453803,lng: -123.0021826},
              map:map,
              title: 'Student Parking Lot J',
              icon: parkingIcon
          });
  
          var lotK = new google.maps.Marker({
              position: {lat: 49.2453292,lng: -123.0010095},
              map:map,
              title: 'Student Parking Lot K',
              icon: parkingIcon
          });
  
          var lotL = new google.maps.Marker({
              position: {lat: 49.2449058,lng: -123.001035},
              map:map,
              title: 'Student Parking Lot L',
              icon: parkingIcon
          });
  
          var lotN = new google.maps.Marker({
              position: {lat: 49.2447456, lng: -123.0024028},
              map:map,
              title: 'Student Parking Lot N',
              icon: parkingIcon
          });
  
          var lotO = new google.maps.Marker({
              position: {lat: 49.2424306, lng: -123.0004639},
              map:map,
              title: 'Student Parking Lot O',
              icon: parkingIcon
          });
  
          var lotQ = new google.maps.Marker({
              position: {lat:49.2541109,lng:-123.0036502},
              map:map,
              title: 'Student Parking Lot Q',
              icon: parkingIcon
          });
  
  
  
  
  
          //Marker circles for each lot.
          var lotACircle = new google.maps.Circle({
              strokeColor: lotAColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotAColor,
              fillOpacity: 0.6,
              map: map,
              center: lotA.position,
              radius: 80
            });
  
          var lotBCircle = new google.maps.Circle({
              strokeColor: lotBColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotBColor,
              fillOpacity: 0.6,
              map: map,
              center: lotB.position,
              radius: 80
            });
  
            var lotDCircle = new google.maps.Circle({
              strokeColor: lotDColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotDColor,
              fillOpacity: 0.6,
              map: map,
              center: lotD.position,
              radius: 80
            });
            
            var lotFCircle = new google.maps.Circle({
              strokeColor: lotFColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotFColor,
              fillOpacity: 0.6,
              map: map,
              center: lotF.position,
              radius: 80
            });
            
            var lotGCircle = new google.maps.Circle({
              strokeColor: lotGColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotGColor,
              fillOpacity: 0.6,
              map: map,
              center: lotG.position,
              radius: 80
            });
  
  
            var lotJCircle = new google.maps.Circle({
              strokeColor: lotJColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotJColor,
              fillOpacity: 0.6,
              map: map,
              center: lotJ.position,
              radius: 80
            });
  
          var lotKCircle = new google.maps.Circle({
              strokeColor: lotKColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotKColor,
              fillOpacity: 0.6,
              map: map,
              center: lotK.position,
              radius: 80
            });
  
            var lotLCircle = new google.maps.Circle({
              strokeColor: lotLColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotLColor,
              fillOpacity: 0.6,
              map: map,
              center: lotL.position,
              radius: 80
            });
            
            var lotNCircle = new google.maps.Circle({
              strokeColor: lotNColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotNColor,
              fillOpacity: 0.6,
              map: map,
              center: lotN.position,
              radius: 80
            });
            
            var lotOCircle = new google.maps.Circle({
              strokeColor: lotOColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotOColor,
              fillOpacity: 0.6,
              map: map,
              center: lotO.position,
              radius: 80
            });
  
            var lotQCircle = new google.maps.Circle({
              strokeColor: lotQColor,
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: lotQColor,
              fillOpacity: 0.6,
              map: map,
              center: lotQ.position,
              radius: 80
            });
          

          // Event handlers    
          //lotA event handler.
          lotA.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotA";
          });
  
          lotACircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotA";
          });
  
          //lotB event handler.
          lotB.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotB";
          });
  
          lotBCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotB";
          });
  
          //lotD event handler.
          lotD.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotD";
          });
  
          lotDCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotD";
          });
  
          //lotF event handler.
          lotF.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotF";
          });
  
          lotFCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotF";
          });
  
          //lotG event handler.
          lotG.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotG";
          });
  
          lotGCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotG";
          });
  
          //lotJ event handler.
          lotJ.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotJ";
          });
  
          lotJCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotJ";
          });
  
          //lotK event handler.
          lotK.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotK";
          });
  
          lotKCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotK";
          });
  
          //lotL event handler.
          lotL.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotL";
          });
  
          lotLCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotL";
          });
  
          //lotN event handler.
          lotN.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotN";
          });
  
          lotNCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotN";
          });
  
          //lotO event handler.
          lotO.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotO";
          });
  
          lotOCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotO";
          });
  
          //lotQ event handler.
          lotQ.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotQ";
          });
  
          lotQCircle.addListener('click',function(){
            window.location.href = "./dynamicPage.html?#lotQ";
          });
  
    } 
  }