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

//make ajax call

//render values

//save stuff

//create history buttons

//color for uv conditions

// Icon for weather


})