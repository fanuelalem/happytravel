const queryURL = "api.openweathermap.org/data/2.5/weather?q=" + City + "usa&APPID=ff175c5d4fbe21dbdd37b7f1c9b145c0"

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response){
    console.log(queryURL);
    console.log(response);

    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);

});