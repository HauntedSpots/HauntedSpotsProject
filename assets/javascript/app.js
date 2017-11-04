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
var totalChildren = 0;

var googleMapsApiKey = "AIzaSyDY7MH2dv1jH8-T__4VIShSb79MOxirXLM";

function initMap() {

   	var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 40.7607793, lng: -111.8910474}
    });

   	//
   	db.ref("/stories").on("child_added", function(snapshot) { 
		totalChildren++;

			var date = snapshot.val().date;
			var description = snapshot.val().description;
			var locationCity = snapshot.val().location.city;
			var locationGeoLatitude = snapshot.val().location.geo.latitude;
			var locationGeoLongitude = snapshot.val().location.geo.longitude;
			var locationState = snapshot.val().location.state;
			var name = snapshot.val().name;
			var rating = String(snapshot.val().rating);
			var truthFactor	= snapshot.val().truthFactor;
			var type = snapshot.val().type;

			console.log(date);
			console.log(description);
			console.log(locationCity, locationState);
			console.log(locationGeoLatitude, locationGeoLongitude);
			console.log(name);
			console.log(rating);
			console.log(truthFactor);
			console.log(type);	

			var newPoint = new google.maps.Marker({
			    position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
			    map: map,
			    label: rating
			    //icon: 
			});

			var hoverwindow = new google.maps.InfoWindow({
			  	content: "<div>" + name + "</div>"
			})

		    newPoint.addListener('click', function() {
		    	$("#storyDescription").text(description);
		    	$("#myModal").modal("show");
		    	hoverwindow.close(map, newPoint);
		  	});
		    newPoint.addListener('mouseover', function() {
			    hoverwindow.open(map, newPoint);
		  	});
		  	newPoint.addListener('mouseout', function() {
		  		hoverwindow.close(map, newPoint);
		  	});
	});

   	//
};