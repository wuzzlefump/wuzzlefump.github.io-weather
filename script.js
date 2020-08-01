
//global variables
var histBtn = [];
var latitude = "";
var longitude = "";




$(document).ready(function(){
initView();
addDate();


$("#submitBtn").click(function(event){
event.preventDefault();
getLocation();
save();
makeBtn();
});


$(".oldcity").on("click", function(event){
    event.preventDefault();
    var ocity = $(this).text()
    console.log(ocity)
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ocity+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        $("#location").text(ocity.toUpperCase());

            getWeather();
        });
})

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
function initView(){

        var oscity = JSON.parse(localStorage.getItem("cities"))
        if(oscity == null){
            return
        }
        
        console.log(oscity)
        var scity = oscity[oscity.length-1]
        console.log(scity)
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+scity+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
     

        render();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            $("#location").text(scity.toUpperCase());
    
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
//today
    $(".temp").text(response.current.temp)
    $(".humidity").text(response.current.humidity)
    $("#wind").text(response.current.wind_speed)
    $("#uv").text(response.current.uvi)
    $("#condition").text(response.current.weather[0].main);
// tomorrow
    $("#temp1").text(response.daily[1].temp.day)
    $("#humidity1").text(response.daily[1].humidity)
    $("#condition1").text(response.daily[1].weather[0].main);
//day 2
$("#temp2").text(response.daily[2].temp.day)
$("#humidity2").text(response.daily[2].humidity)
$("#condition2").text(response.daily[2].weather[0].main);
//day 3
$("#temp3").text(response.daily[3].temp.day)
$("#humidity3").text(response.daily[3].humidity)
$("#condition3").text(response.daily[3].weather[0].main);
//day 4
$("#temp4").text(response.daily[4].temp.day)
$("#humidity4").text(response.daily[4].humidity)
$("#condition4").text(response.daily[4].weather[0].main);
//day 5
$("#temp5").text(response.daily[5].temp.day)
$("#humidity5").text(response.daily[5].humidity)
$("#condition5").text(response.daily[5].weather[0].main);
        console.log(response);
uvColor();
iconMake();
    });



}

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
// uv function
function uvColor(){
    var uv = $("#uv").text()

    if( uv < 1){
        $("#uv").css("color", "darkgreen")
    }else if( uv<2 && uv>=1){
        $("#uv").css("color", "green")
    }else if( uv < 3 && uv>=2 ){
        $("#uv").css("color", "greenyellow")
    }else if(uv < 4 && uv >=3 ){
        $("#uv").css("color", "yellow")
    }else if(uv < 5 && uv >=4 ){
        $("#uv").css("color", "gold")
    }else if(uv < 6 && uv>=5 ){
        $("#uv").css("color", "orange")
    }else if(uv < 7 && uv>=6 ){
        $("#uv").css("color", "darkorange")
    }else if(uv < 8 && uv>=7 ){
        $("#uv").css("color", "red")
    }else if(uv < 9 && uv>=8 ){
        $("#uv").css("color", "crimson")
    }else if(uv < 10 && uv>=9 ){
        $("#uv").css("color", "darkred")
    }else if( uv>=10 ){
        $("#uv").css("color", "maroon")
    }
    
}
// icon function
function iconMake(){
    


    var forecast = [$("#day0"),$("#day1"),$("#day2"),$("#day3"),$("#day4"),$("#day5") ]
    var fcondition = [$("#condition").text(),$("#condition1").text(),$("#condition2").text(),$("#condition3").text(),$("#condition4").text(),$("#condition5").text() ]
    

    for(var i = 0; i<fcondition.length; i++ ){
        var rain = $("<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-droplet' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z'/><path fill-rule='evenodd' d='M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z'/></svg>");

        var cloud = $("<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-cloud' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z'/></svg>");

        var snow = $("<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-asterisk' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z'/></svg>");

        var sun = $("<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-sun' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z'/><path fill-rule='evenodd' d='M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z'/></svg>");

        if(fcondition[i] == "Clear" ){
            forecast[i].empty();
            forecast[i].prepend(sun)
        }else if(fcondition[i] == "Rain" ){
            forecast[i].empty();
            forecast[i].prepend(rain)
        }else if(fcondition[i] == "Clouds" ){
            forecast[i].empty();
            forecast[i].prepend(cloud)
        }else if(fcondition[i] == "Snow"){
            forecast[i].empty();
            forecast[i].prepend(snow)
        }
    }

}

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