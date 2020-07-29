

$(document).ready(function(){
//global variables




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


});

//make ajax calls

//get longitude and latitude
function getLocation(){
    var city = $("#input").val();
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=834fc904f66ef35ce03a84b6fe8c29b5";
 
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        console.log(response);

      
    });
}

// ajax call for weather

//render values

//save stuff

//create history buttons

//color for uv conditions

// Icon for weather


})