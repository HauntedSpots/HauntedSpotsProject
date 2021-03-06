var config = {
    apiKey: "AIzaSyAcdqr-aT41H0CEvg5-_t6_ldpMHKeYmM4",
    authDomain: "haunted-spots-1509589532630.firebaseapp.com",
    databaseURL: "https://haunted-spots-1509589532630.firebaseio.com",
    projectId: "haunted-spots-1509589532630",
    storageBucket: "haunted-spots-1509589532630.appspot.com",
    messagingSenderId: "378273039449"
};
firebase.initializeApp(config);

var database = firebase.database();
var storiesDB = database.ref("/stories");
var stories = [];

storiesDB.on("child_added", function(snapshot) {
    var data = snapshot.val();
    console.log("Data from child_added: ");
    console.log(data);
    var date = data.date;
    var description = data.description;
    var city = data.location.city;
    var latitude = data.location.geo.latitude;
    var longitude = data.location.geo.longitude;
    var state = data.location.state;
    var name = data.name;
    var rating = data.rating;
    var truthFactor	= data.truthFactor;
    var type = data.type;

    var story = {
        name: name,
        location: {
            state: state,
            city: city,
            geo: {
                longitude: longitude,
                latitude: latitude
            }
        },
        description: description,
        type: type,
        rating: rating,
        truthFactor: truthFactor,
        date: date
    };

    stories.push(story);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$("#add-siting-btn").on("click", function () {
    event.preventDefault();
    loadedFromFirebaseAlready = true;
    var storyName = $("#name-input").val().trim();
    var storyDate = $("#date-input").val().trim();
    var storyDesc = $("#desc-input").val().trim();
    var storyLongitude = $("#longitude").val().trim();
    var storyLatitude = $("#latitude").val().trim();
    var storyState = $("#state").val().trim();
    var storyCity = $("#city").val().trim();
    var storyType = $("#type").val().trim();
    var storyRating = $("#rating").val().trim();

    if (storyName.length === 0 || storyDate.length === 0 || storyRating.length === 0 ||
        storyLatitude.length === 0 || storyLongitude.length === 0 || storyType.length === 0) {
        return;  // not enough values input to make the object
    } else {
        var story = {
            name: storyName,
            location: {
                state: storyState,
                city: storyCity,
                geo: {
                    longitude: Number(storyLongitude),
                    latitude: Number(storyLatitude)
                }
            },
            description: storyDesc,
            type: storyType,
            rating: storyRating,
            truthFactor: 1,
            date: storyDate
        };

        stories.push(story);

        storiesDB.set(stories);
        // console.log(story);
        $("#newSitingForm").trigger("reset");
    }
});

function createStory1() {
    var story = {
        name: "American Fork Canyon Hearse",
        location: {
            state: "UT",
            city: "American Fork",
            geo: {
                latitude: 40.4336333,
                longitude: -111.7390882
            }
        },
        description: "it is to be said that if you do three circles at the top of tibble fork parking " +
        "lot you will come to the fork when exiting the canyon and a hearse will " +
        "follow you and chase you with red lights",
        type: "Ghost",
        rating: 1,
        truthFactor: 2,
        date: "11/03/2017 11:58 PM"
    };

    stories.push(story);
}

function createStory2() {
    var story = {
        name: "Kaysville Ghost",
        location: {
            state: "UT",
            city: "Kaysville",
            geo: {
                latitude: 41.0352216,
                longitude: -111.9385521
            }
        },
        description: "Testing the Kaysville Ghost and the Kaysville residents",
        type: "Ghost",
        rating: 2,
        truthFactor: 3,
        date: "11/03/2017 11:58 PM"
    };

    stories.push(story);
}

function loadup(){
    createStory1();
    createStory2();
    storiesDB.set(stories);
}

// loadup();
