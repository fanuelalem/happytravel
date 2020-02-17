

$("#submit").on("click", function(event){
    event.preventDefault();
    let myCityInput = $("#city").val();
    let myStateInput = $("#state").val();
    let myDateInput = $("#date").val();
    
    if (myCityInput === '' || myStateInput === ''){
        $('.ui.modal').modal('show');
    } else {

    if (!myDateInput){
        (myDateInput = (moment().format('YYYY-MM-DD')));
    };

    // This clears the event Div when someone makes a new query
    $( "#Events").empty();

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCityInput + "," + myStateInput + ",US&appid=ff175c5d4fbe21dbdd37b7f1c9b145c0"
    const TMqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + myCityInput + "&stateCode=" + myStateInput + "&countryCode=US&StartDateTime=" + myDateInput + "T01:10:00Z&apikey=YMlYHHHVYwygEGBTQoXW1SB8KfJBSYPH"


$.ajax({

        url: queryURL,
        method: "GET"
    })
    
    .then(function(response){

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        
        // Converts Kelvin temperature to Fahrenheit
        let fahrenheit = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
        $(".temp").text("Temperature (Fahrenheit) " + fahrenheit);
        
        });

        var eventHeading = $("<h2>");

        eventHeading = ("Events happening in " + myCityInput);
        $("#Events").append(eventHeading);
        $("#Events").append("<br>");

$.ajax({
         url: TMqueryURL,
         method: "GET"
        })
    
        .then(function(TMresponse){
            console.log(TMresponse);
            // loop through the TMresponse object and pull the first 5 events
            for (eventIndex = 0; eventIndex < 5; eventIndex++){

                var imageIndex = 0;
                var eventLink = $("<a>");
                var eventImage = $("<img>");
                var eventName = $("<p>");
                var eventDate = $("<p>");
                var eventVenue = $("<p>");

            eventImage.attr("src", TMresponse._embedded.events[eventIndex].images[imageIndex].url);
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
            $("#Events").append("<br>");
            }
            
            });

        }
    });

