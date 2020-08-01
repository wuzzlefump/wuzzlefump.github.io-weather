
//global variables
var histBtn = [];
var latitude = "";
var longitude = "";




$(document).ready(function(){
render();




//run functions
addDate();

//adding dates
function addDate(){
const date = moment().format('MMMM Do YYYY');
$(".date").text(date);
const dateZero = moment().calendar();
$("#date0").text(dateZero);
const dateOne = moment().add(1,'days').calendar();
$("#date1").text(dateOne);
const dateTwo = moment().add(2,'days').calendar();
$("#date2").text(dateTwo);
const dateThree = moment().add(3,'days').calendar();
$("#date3").text(dateThree);
const dateFour = moment().add(4,'days').calendar();
$("#date4").text(dateFour);
const dateFive = moment().add(5,'days').calendar();
$("#date5").text(dateFive);

}

//submit button
$("#submitBtn").click(function(event){
event.preventDefault();
getLocation();
save();
makeBtn();
});

$(".oldcity").on("click", function(event){
    var city = $(this).text()
    console.log(city)
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        $("#location").text(city.toUpperCase());

            getWeather();
        });
})
//get longitude and latitude ajax call
function getLocation(){
    var city = $("#input").val();
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        $("#location").text(city.toUpperCase());

            getWeather();
        });

}


// ajax call for weather
function getWeather(){
 

    var queryURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid=fecdb578259a1a724a8226c96828ee6d"; 

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    $(".temp").text(response.current.temp)//need to convert to f
    $(".humidity").text(response.current.humidity)
    $("#wind").text(response.current.wind_speed)
    $("#uv").text(response.current.uvi)
        console.log(response);

    });



}
//render values

//save stuff
function save(){
    var city = $("#input").val();
    histBtn.push(city);

    localStorage.setItem("cities", JSON.stringify(histBtn));
    console.log(JSON.parse(localStorage.getItem("cities")));


}

//create history buttons
function makeBtn(){
    var savedBtns = JSON.parse(localStorage.getItem("cities"));
    $("#btnContainer").empty();
    if(savedBtns== null){
        return;
    }
    for(var i=0; i< savedBtns.length;i++){
        var newList = $("<li class = 'list-group-item'> </li>")
        var listBtn = $("<button class= 'oldcity'>");
        listBtn.text(savedBtns[i])
        $("#btnContainer").prepend(newList);
        newList.append(listBtn);
        
    }

}
function ktof(x){
x-273.15*1.8+32;
}

//color for uv conditions

// Icon for weather

//clear history
$("#clear").click(function(){
    clearHist();
    
})
function clearHist(){

$("#btnContainer").empty();
localStorage.clear();
histBtn =[]
}
//render
function render(){
makeBtn();
}

})