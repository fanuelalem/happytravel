$("#submit").on("click", function(event){
    event.preventDefault();
    let myCityInput = $("#city").val();
    let myStateInput = $("#state").val();
    let myDateInput = $("#date").val();

    if (myCityInput === '' || myStateInput === ''){
        $('.ui.modal').modal('show');
    } else {

        
        
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCityInput + "," + myStateInput + ",US&appid=ff175c5d4fbe21dbdd37b7f1c9b145c0"
    const TMqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + myCityInput + "&state=" + myStateInput + "&StartDateTime=" + myDateInput + "T17:10:00Z&apikey=YMlYHHHVYwygEGBTQoXW1SB8KfJBSYPH"
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response){
        // console.log(response);
        
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        
        // Converts Kelvin temperature to Fahrenheit
        let fahrenheit = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
        $(".temp").text("Temperature (Fahrenheit) " + fahrenheit);
        
    });
    $.ajax({
        url: TMqueryURL,
        method: "GET"
    })
    
    .then(function(TMresponse){
        console.log(TMresponse);
        
        eventIndex = 0;
        imageIndex = 0;
        console.log(TMresponse._embedded.events[eventIndex].eventIndex.images[imageIndex].imageIndex.url);
        $("#Events").attr("src", TMresponse._embedded.events[eventsIndex].eventsIndex.images[imageIndex].imageIndex.url)
        
    });
    
}
    
});