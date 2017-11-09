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

var googleMapsApiKey = "AIzaSyDY7MH2dv1jH8-T__4VIShSb79MOxirXLM";
var weatherApiKey = "132260a72c04254ec694dcde2b5d9b91"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "&units=imperial&appid=" + weatherApiKey;

// Here we run our AJAX call to the OpenWeatherMap API


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 39.8097343, lng: -98.5556199}
    });

    $(".fader").on("mouseenter", function () {
        $(this).fadeTo("slower", 1);
        $(this).css("opacity", 1);
    });

    var children = 0;

    db.ref("/stories").on("child_added", function (snapshot) {
        children++;


        var date = snapshot.val().date;
        var description = snapshot.val().description;
        var locationCity = snapshot.val().location.city;
        var locationGeoLatitude = snapshot.val().location.geo.latitude;
        var locationGeoLongitude = snapshot.val().location.geo.longitude;
        var locationState = snapshot.val().location.state;
        var name = snapshot.val().name;
        var rating = snapshot.val().rating;
        var type = snapshot.val().type;
        var temp;
        var weather;

        $.ajax({
            url: queryURL + "&lat=" + locationGeoLatitude + "&lon=" + locationGeoLongitude,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
            .done(function (response) {

                // Log the data in the console as well
                temp = Math.floor(response.main.temp);
                weather = response.weather[0].description;

            });

        var newPoint = null;
        if (type === 'Sasquatch') {
            var image = {
                url: 'assets/images/sas2.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(40, 52),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };


            newPoint = new google.maps.Marker({
                position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
                map: map,
                id: locationCity,
                animation: google.maps.Animation.DROP,
                icon: image
            });
        } else if (type === 'Ghost') {
            var image = {
                url: 'assets/images/ghost.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(40, 52),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };


            newPoint = new google.maps.Marker({
                position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
                map: map,
                id: locationCity,
                animation: google.maps.Animation.DROP,
                icon: image
            });
        } else if (type === 'Cemetary') {
            var image = {
                url: 'assets/images/grave-stone.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(40, 52),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };


            newPoint = new google.maps.Marker({
                position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
                map: map,
                id: locationCity,
                animation: google.maps.Animation.DROP,
                icon: image
            });
        } else if (type === 'Other Paranormal activities') {
            var image = {
                url: 'assets/images/question-mark.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(50, 62),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };


            newPoint = new google.maps.Marker({
                position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
                map: map,
                id: locationCity,
                animation: google.maps.Animation.DROP,
                icon: image
            });
        }else if (type === 'House') {
                var image = {
                    url: 'assets/images/house.png',
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(50, 62),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(0, 32)
                };


                newPoint = new google.maps.Marker({
                    position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
                    map: map,
                    id: locationCity,
                    animation: google.maps.Animation.DROP,
                    icon: image
                });
        } else {
            newPoint = new google.maps.Marker({
                position: {lat: locationGeoLatitude, lng: locationGeoLongitude},
                map: map,
                animation: google.maps.Animation.DROP,
                id: locationCity
            });
        }

        var hoverwindow = new google.maps.InfoWindow({
            content: "<div>" + name + "</div>"
        });

        newPoint.addListener('click', function () {
            $("#pointTitle").text(name);

            var newDiv = $("<div>");
            newDiv.append($("<p>").text("Location: " + locationCity + ", " + locationState));
            newDiv.append($("<p>").text("Type: " + type));
            newDiv.append($("<p>").text("Rating: " + rating));
            newDiv.append($("<p>").text("Description: " + description));
            newDiv.append($("<hr>"));
            newDiv.append($("<p>").text("Current Temperature: " + temp + "° F"));
            newDiv.append($("<p>").text("Current Weather: " + weather));
            newDiv.append($("<br>"));
            $("#pointDetails").html(newDiv);
            $("#myModal").modal("show");
            hoverwindow.close(map, newPoint);
        });
        newPoint.addListener('mouseover', function () {
            hoverwindow.open(map, newPoint);
        });
        newPoint.addListener('mouseout', function () {
            hoverwindow.close(map, newPoint);
        });
    });

    $("#goSubmit").on("click", function () {
        var searchValue = $("#searchInput").val().trim();

        for (var i = 0; i < children; i++) {

            db.ref().on("child_added", function (snapshot) {

                var dbCity = snapshot.val()[i].location.city;

                if (searchValue === dbCity) {
                    console.log(dbCity);
                    console.log("true");

                } else {
                    console.log(dbCity);
                    console.log("false");

                }
            });
        }

    });

}