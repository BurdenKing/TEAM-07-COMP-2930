
// Initialize and add the map
function initMap() {
  // The location of BCIT
  var BCIT = {lat: 49.2526785, lng: -123.0027276,17};
  // The map, centered at BCIT
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: BCIT});
  // The marker, positioned at BCIT
  var marker = new google.maps.Marker({position: BCIT, map: map});
}
