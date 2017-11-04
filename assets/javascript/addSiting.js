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

storiesDB.on("value", function (snapshot) {
    var data = snapshot.val();
    if (data === null) {
        stories = [];
        return;  // no data, just return
    }
    stories = data;
    console.log(stories[0].description);


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
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
                longitude: 180,
                latitude: 555
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
