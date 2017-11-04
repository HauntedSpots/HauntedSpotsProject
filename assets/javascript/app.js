// Initialize Firebase
var config = {
	apiKey: "AIzaSyAcdqr-aT41H0CEvg5-_t6_ldpMHKeYmM4",
	authDomain: "haunted-spots-1509589532630.firebaseapp.com",
	databaseURL: "https://haunted-spots-1509589532630.firebaseio.com",
	projectId: "haunted-spots-1509589532630",
	storageBucket: "",
	messagingSenderId: "378273039449"
};

firebase.initializeApp(config);

var db = firebase.database();


db.ref().on("child_added", function(snapshot) {
	var stories = snapshot.val();
	console.log(snapshot.val());
	console.log(snapshot.val()[0].location.geo);
	var latitude = Number(snapshot.val()[0].location.geo.latitude);
	var longitude = Number(snapshot.val()[0].location.geo.longitude);
	console.log(latitude, longitude);

});

var googleMapsApiKey = "AIzaSyDY7MH2dv1jH8-T__4VIShSb79MOxirXLM";

function initMap() {

   	var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 40.7607793, lng: -111.8910474}
    });

	var newPoint = new google.maps.Marker({
	    position: {lat: 40.6029647, lng: -111.8554152},
	    map: map,
	    label: "1"
	    //icon: 
	});

	var hoverwindow = new google.maps.InfoWindow({
	  	content: "<div>newPoint data</div>"
	})

    newPoint.addListener('click', function() {
    	//open modal
    	alert("modal goes here");
    	hoverwindow.close(map, newPoint);
  	});
    newPoint.addListener('mouseover', function() {
	    hoverwindow.open(map, newPoint);
  	});
  	newPoint.addListener('mouseout', function() {
  		hoverwindow.close(map, newPoint);
  	});
};