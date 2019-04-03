
 

// Create an array that displays that will become the title of your buttons. 

let topics = ['Los Angeles', 'Beach', 'Graduation', 'Vacation', 'Vegas', 'Pool Party', 'Pina Colada', 'Summer Break', '4th of July', 'Travel', 'Gemini', 'Drop Top', 'Marvel Movies', 'Ice Cream', 'Island', 'Black Family BBQ']

// Giphy API key

const key = 'll9G3g7XyfUX9mDdxcCHOEPtSqRymaAp';

// This function displays the buttons for the summer GIFs
function renderSummerBtn() {

    //Delete the movies prior to adding new movies (necessary to prevent repeat buttons)
    $('#buttons-view').empty();

    // Loop through the array 
    for (let i = 0; i < topics.length; i++) {

        console.log(topics[i]);

        //Dynamically create buttons
        const button = $('<button>');

        // Add a class to that buton called 'summer-btn'
        button.addClass('summer-btn');

        // Add a data attribute
        button.attr('data-name', topics[i]);

        // Add button text
        button.text(topics[i]);

        // Append movies to button-view div
        $('#buttons-view').append(button);
    }
}


// This function renders the HTML to display the appropriate content
function displayGif() {

    const gif = $(this).attr('data-name');
    const queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=' + key + '&limit=10';

    // This is the standard ajax syntax to perform the GET request to the Giphy API //
    $.ajax({
        url: queryURL,
        method: "GET" // This is not necessary, but is useful to show which method ajax uses to get the data from the giphy API //
    }).then(function(response) {
        console.log(response); // WORKS! 

        // Empty out anything currently in the #summer div
        $('#summerGIF-view').empty();

        // Create a variable that captures results for each one of the div (there are a total of 10)
        let results = response.data;

        console.log (results); // WORKS!!

        // Create a for loop that creates a div for each response. There should be 10. Each GIF will display in it's own div
        for (let i = 0; i < results.length; i++) {

            // Create each div for the length of the results
            const gifDiv = $("<div>");

            // This stores the rating data for each div
            const summerRating = results[i].rating;

            console.log(summerRating);  // WORKS!

            // This stores the data attributes for the still/animate feature
            const summerDataStill = results[i].images.fixed_width_still.url;
            const summerDataAnimate = results[i].images.fixed_width.url;
            // const summerDataState = "still";

            // console.log(summerDataStill); // WORKS!
            // console.log(summerDataAnimate);  // WORKS!
            // console.log(summerDataState);  // WORKS!


            // console.log(summerImgURL); //WORKS!

            // This creates an element to hold the GIF
            const summerGifImg = $('<img>').attr('src', summerDataStill);

            // Add some attributes to the div to capture the data
            summerGifImg.attr('data-still', summerDataStill ).attr('data-animate', summerDataAnimate ).attr('data-state', 'still').addClass('gif');
           
            // This creates an element to have the rating displayed
            const displaySummerRating = $('<p>').text(`Rating: ` + summerRating);

            // // Display the rating
            // $(".summer").append(displaySummerRating);


            gifDiv.prepend(displaySummerRating);
            gifDiv.prepend(summerGifImg);


            $('#summerGIF-view').prepend(gifDiv);


            // // Append the GIF to summerGifDiv
            // $('.summer').append(summerGifImg);
    
            }

            $('.gif').on('click', function() {
                // console.log(this);

                const state = $(this).attr('data-state');

                if (state === "still") {
                    const animate = $(this).attr("data-animate");
                    // console.log(animate)
            
                    $(this).attr("src", animate);
                    $(this).attr('data-state', 'animate');
                    console.log(this);
            
                  } 
                  else if (state === "animate") {
                    const still = $(this).attr('data-still');
                    
                    $(this).attr('src', still);
                    $(this).attr('data-state', 'still');
                    console.log(this);
                    }
                  });
            });
        };
            



// This function handles events where a button is clicked (add "preventDefault" to prevent default HTML function)
$('#add-summerGif').on('click', function() {
    event.preventDefault();

    // Grabs the value from the input textbox
    let topic = $('#giphy-input').val().trim();

    // Push the data to the "topics" array
    topics.push(topic);

    renderSummerBtn();
});


// Add a click event listener to all buttons with a "summer-btn" class
$(document).on('click', '.summer-btn', displayGif);

renderSummerBtn();
