

$("#submit").on("click", function (event) {
    event.preventDefault();
    let myCityInput = $("#city").val();
    let myStateInput = $("#state").val();
    let myDateInput = $("#date").val();

    if (myCityInput === '' || myStateInput === '') {
        $('.ui.modal').modal('show');
        
    } else {

        if (!myDateInput) {
            (myDateInput = (moment().format('YYYY-MM-DD')));
            
        };

        $('#Events').css('background-color','yellow')

            
      
        // This clears the event Div when someone makes a new query
        $("#Events").empty();

        // This clears the restaurant Div when someone makes a new query
        $("#restaurant").empty();

        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCityInput + "," + myStateInput + ",US&appid=ff175c5d4fbe21dbdd37b7f1c9b145c0"
        const TMqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + myCityInput + "&stateCode=" + myStateInput + "&countryCode=US&StartDateTime=" + myDateInput + "T01:10:00Z&apikey=YMlYHHHVYwygEGBTQoXW1SB8KfJBSYPH"
        const ZomatoURL = "https://developers.zomato.com/api/v2.1/cities?q=" + myCityInput;

        $.ajax({

            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
              
 
                $(".city").html("<h3>" + response.name + " Weather Details </h3>");
                $(".wind").html("<h3> Wind Speed: " + response.wind.speed + "</h3>");
                $(".humidity").html("<h3> Humidity: " + response.main.humidity + "</h3>");

                // Converts Kelvin temperature to Fahrenheit
                let fahrenheit = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
                $(".temp").html("<h3> Temperature (Fahrenheit): " + fahrenheit + "</h3>");

                

            });

            $('#info').css('background-color','yellow')
            $('#info').css('margin-right','25px')
            $('#info').css('margin-left','25px')



        let eventHeading = $("<h2>");

        eventHeading = (`<h3> Events happening in ${myCityInput} <h3> <br>`);
        $("#Events").append(eventHeading);
        $("#Events").append("<br>");
        $('#Events').css('background-color','yellow')
        $('#Events').css('height','100%')
        $('#Events').css('margin-right','25px')

        


        $.ajax({
            url: TMqueryURL,
            method: "GET"
        })

            .then(function (TMresponse) {
                // loop through the TMresponse object and pull the first 5 events
                for (let eventIndex = 0; eventIndex < 5; eventIndex++) {

                    let imageIndex = 0;
                    let eventLink = $("<a>");
                    let eventImage = $("<img>");
                    let eventName = $("<p>");
                    let eventDate = $("<p>");
                    let eventVenue = $("<p>");

                    eventImage.attr("src", TMresponse._embedded.events[eventIndex].images[imageIndex].url);
                    eventImage.height(200);
                    eventLink.attr("href", TMresponse._embedded.events[eventIndex].url);
                    eventLink.attr("target", '_blank');
                    eventLink.html(eventImage);
                    eventName = (TMresponse._embedded.events[eventIndex].name);
                    eventDate = (TMresponse._embedded.events[eventIndex].dates.start.localDate);

                    eventVenue = (TMresponse._embedded.events[eventIndex]._embedded.venues[0].name);

                    $("#Events").append("Event: " + eventName + "<br>");
                    $("#Events").append("Event Date: " + eventDate + "<br>");
                    $("#Events").append("Event Venue: " + eventVenue + "<br>");
                    $("#Events").append(eventLink);
                    $("#Events").append("<br>" + "<br>");
                }

            });

        let restaurantHeading = $("<p>");
        restaurantHeading = (`<h3> Happening restaurants in ${myCityInput} <h3>`);
        $("#restaurant").append(restaurantHeading);
        $("#restaurant").append("<br>");
        $('#restaurant').css('background-color','yellow')
        $('#restaurant').css('height','100%')
        $('#restaurant').css('margin-left','25px')



        // Zomato AJAX calls, first one to determine entity_id of city, second one to find popular restaurants given that entity_id
        $.ajax({
            url: ZomatoURL,
            method: "GET",
            headers: { "user-key": "ebb5a0bfcc2b64b4d6e35e9a5c767e6b" }
        })

            .then(function (zomatoResponse) {
                const entity_id = zomatoResponse.location_suggestions[0].id;
                const ZomatoURL2 = "https://developers.zomato.com/api/v2.1/search?entity_type=city&collection_id=1&entity_id=" + entity_id;
                $.ajax({
                    url: ZomatoURL2,
                    method: "GET",
                    headers: { "user-key": "ebb5a0bfcc2b64b4d6e35e9a5c767e6b" }
                })

                    .then(function (zomatoResponse2) {

                        // loop through the zomatoResponse2 object and pull the first 5 restaurants
                        for (let restaurantIndex = 0; restaurantIndex < 5; restaurantIndex++) {

                            let restaurantImage = $("<img>");
                            let restaurantName = $("<div>");
                            let restaurantCuisines = $("<div>");
                            let restaurantAddress = $("<div>");
                            let restaurantLocality = $("<div>");
 
                            restaurantImage.attr("src", zomatoResponse2.restaurants[restaurantIndex].restaurant.thumb);
                            restaurantName = (zomatoResponse2.restaurants[restaurantIndex].restaurant.name);
                            restaurantCuisines = (zomatoResponse2.restaurants[restaurantIndex].restaurant.cuisines);
                            restaurantAddress = (zomatoResponse2.restaurants[restaurantIndex].restaurant.location.address)
                            restaurantLocality = (zomatoResponse2.restaurants[restaurantIndex].restaurant.location.locality);


                            $("#restaurant").append("<br>" + "Name: " + restaurantName + "<br>");
                            $("#restaurant").append("Cuisines: " + restaurantCuisines + "<br>");
                            $("#restaurant").append("Address: " + restaurantAddress + "<br>");
                            $("#restaurant").append("Locality: " + restaurantLocality + "<br>");
                            $("#restaurant").append(restaurantImage);
                            $("#restaurant").append("<br>");

                            console.log(zomatoResponse2)
                        }

                        

                    });
            });
    }
});

