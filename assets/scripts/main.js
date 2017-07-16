
class foodData {
    //Create initial location
    
    constructor(){
        this.location={lat:0, lng:0};
        //updateCurrentLocation();
    }
}

class mapData{
    constructor(){
        this.markers=[]
        this.updateMapPosition();
    }
    updateMapPosition(){
        for( var i=0; i<this.markers.length;i++){
            this.markers[i].setMap(null);
        }
        this.markers=[];
        marker = new google.maps.Marker({
            position: food.location,
            map: this.map,
            icon: "./assets/css/images/coordinate.png"
        });     
        this.markers.push(marker);  
        this.map.center=food.location;
    }
}

food = new foodData()
mapContainer= new mapData()




function initMap() {
    mapContainer.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        mapTypeControl:false,
        zoomControl:false,
        streetViewControl:false,
        center: food.location,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#96E7E3'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#0c9b93'}]},
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#FFFFFF'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#A1C5D4'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.text',
                stylers: [{color: '#15749C'}]
            },
            {
                featureType: "road",
                elementType: "labels.text",
                stylers: [{color: '#FFFFFF'}]
            }
        ]
    });
    marker = new google.maps.Marker({
        position: food.location,
        map: mapContainer.map,
        icon: "./assets/css/images/coordinate.png"
    });
    mapContainer.markers.push(marker);
}

$(document).ready(function () {
        //Routinely check location and update map location
        //Every 5 seconds
        setInterval(updateCurrentLocation, 5000);

});
function updateCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoPosition);
    } else {
        console.log( "Geolocation is not supported by this browser.");
    }  
    if( (Math.abs(food.location.lat-mapContainer.markers[0].position.lat)+Math.abs(food.location.lng-mapContainer.markers[0].position.lng))>0.0001){
        mapContainer.updateMapPosition();
    }
}
function geoPosition(personPos){
    food.location={lat: personPos.coords.latitude,lng:personPos.coords.longitude};
}