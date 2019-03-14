// var api = "http://api.giphy.com/v1/gifs/search?";
// var apiKey = "&api_key=iXGWNWKvg16gyISZmQwv7hcACnJWrs5s";
// var query = "&q=animals";

var responseHolder = {};

// var tenPics =  ;

var topics = ["dogs", "cats", "fish", "turtles", "goldfish"];
// console.log(topics)

// Function for dumping the JSON content for each button into the div


function displayTopicPic() {
    // console.log("This is the function displayTopicGiphy");

    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?" + "&api_key=iXGWNWKvg16gyISZmQwv7hcACnJWrs5s" + "&q=" + topic;

    // An ajax that will call for the designated topic
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        responseHolder = response;
        // console.log(response);
        // The div to hold giphy
        var topicDiv = $("#giphy");
        topicDiv.empty();
        for (var i = 0; i < 10; i++) {
            // Creating a variable to store the embed giphy url of the topic searched
            var embedStillPic = [response.data[i].images.fixed_width_still.url];

            // Creating an element to display the giphy
            var pic = $("<img>").attr("src", embedStillPic).attr("data-picNum", i);

            // Appending the topic
            topicDiv.append(pic);

            $("#buttons-view").append(topicDiv);

        }
        // console.log("Image added")

    });

}


function renderButtons() {

    // Deleting the topic buttons prior to adding new topic buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("topic");
        // Adding a data-attribute with a value of the topic at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}
// This function is used to add an animal button on to the existing list
$("#add-topic").on("click", function (event) {
    // console.log("You clicked here");
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#topic-input").val().trim();
    // The topic from the textbox is then added to our array
    topics.push(topic);
    // console.log(topics);

    // calling renderButtons which handles the processing of our topic array
    renderButtons();
});

// Once a button is clicked, picture will appear.
$(document).on("click", ".topic", displayTopicPic)

// Once the pic is clicked, the giphy will appear.
$(document).on('click', "img", function () {
    // console.log("Function for the giphy");
    // console.log(this, event);
    var data_picNum = $(this).attr("data-picnum");
    var embedPlayPic = [responseHolder.data[data_picNum].images.fixed_width.url];
    // Creating an element to display the giphy
    $(this).attr("src", embedPlayPic);
});



// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();
