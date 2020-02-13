$("#submit").on("click", function(event){
    event.preventDefault();
    let myCityInput = $("#city").val();
    let myStateInput = $("#state").val();
    console.log(myCityInput);
    console.log(myStateInput);
    
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + myCityInput + "," + myStateInput + ",US&appid=ff175c5d4fbe21dbdd37b7f1c9b145c0"
    
    console.log(queryURL);
    
$.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response){
            console.log(response);
        
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature (F) " + response.main.temp);
        
            // Converts Kelvin temperature to Fahrenheit
            let fahrenheit = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
            $(".temp").text("Temperature (Fahrenheit) " + fahrenheit);
        
        });
    });
            
