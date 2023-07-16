var apiKey = 'd9b7b208a88c0d28208b6c15c4b7035f';

// var cityVal
// var cityKey

var memoryArr =  JSON.parse(localStorage.getItem('key')) || []

searchHistory ()

const span = $("span")
span.on('click', getHistory)

function getHistory() {
  var spanVal = $(this).text()
  
  fetchData(spanVal);
  fetchDataFiveDay(spanVal) ;
}

const button = $("button")
button.on("click", function() {
  var textField = $(this).prev().val();
  // console.log(textField)

  fetchData(textField);
  fetchDataFiveDay(textField) ;
  store (textField);
})

function store (city) {
  var cityVal = city ;
  var cityKey = city;

  var store = {
    key: cityKey,
    val: cityVal
  }
  memoryArr.push(store);

  localStorage.setItem('key', JSON.stringify(memoryArr))
  searchHistory ()
}

function searchHistory () {
  
  for (let i = 0; i < memoryArr.length; i++) {
    // console.log(memoryArr)
    const divTag = $("<div>").addClass("row justify-content-end");
    const span = $("<span>").addClass("searchHistory").text(`${memoryArr[i].val}`) ;

    $("#searchHistory").append(divTag.append(span));
  }
  }



function fetchData(city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiURL) 
  .then((res) => { return res.json()})
  .then((info) => {
    // console.log(info)  
    getWeather (info) ;
  })
  .catch((err) => {
    console.log(err)
  })
}

function getWeather (weatherArr) {
  const weatherIcon = weatherArr.weather[0].icon  ;
  const weatherIconURL = `https://openweathermap.org/img/w/${weatherIcon}.png` ;
  const cityMainName = weatherArr.name ;
  const mainDate = dayjs().format("MMMM DD YYYY");
  const tempMain = weatherArr.main.temp ;
  const tempMainHum = weatherArr.main.humidity;
  const windMain = weatherArr.wind.speed ;

  const weatherMainIma = $("<img>").addClass("weatherIconMain").attr("src", `${weatherIconURL}`)
  const ulMain = $("<ul>").addClass("cityMain").text(`${cityMainName} (${mainDate})`) ;
  const liMainTemp = $("<li>").addClass("tempMain").text(`Temp: ${tempMain} °F / Humidity: ${tempMainHum}%`)
  const liWindMain = $("<li>").addClass("windMain").text(`Wind Speed: ${windMain} mph`)
  
  // console.log(ulMain)
  // console.log(tempMain,tempMainHum)

  $(".todayWeather").append(weatherMainIma, ulMain).append(liMainTemp, liWindMain) ;
}

function fetchDataFiveDay(city) {
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiURL)
  .then((res) => { return res.json()})
  .then((info) => {
    console.log(info)  
    getWeatherFiveDay (info) ;
  })
  .catch((errFiveDay) => {
    console.log(errFiveDay)
  })
}

function getWeatherFiveDay(weatherArrFive) {

  for (let i = 0; i < weatherArrFive.list.length; i+=8) {  
    const weatherIcon = weatherArrFive.list[i].weather[0].icon ;
    const weatherIconURL = `https://openweathermap.org/img/w/${weatherIcon}.png` ;
    const cityName = weatherArrFive.city.name ;
    var dateFiveDay = weatherArrFive.list[i].dt_txt;
    dateFiveDay = dateFiveDay.slice(0,-9);
    const temp = weatherArrFive.list[i].main.temp ;
    const hum = weatherArrFive.list[i].main.humidity ;
    const wind = weatherArrFive.list[i].wind.speed;

    const card = $("<div>").addClass("card col-lg-2 col-sm-12").attr("id","#weather")
    const div = $("<div>").addClass("card-body")
    const weatherImg = $("<img>").addClass("weatherIcon card-img-top").attr("src", `${weatherIconURL}`)
    const ulFiveDay = $("<ul>").addClass("cityName card-title").text(`${cityName}`) ;
    const liDate = $("<li>").addClass("date card-text").text(`Date: ${dateFiveDay}`);
    const liTemp = $("<li>").addClass("temp card-text").text(`Temp: ${temp} °F`) ;
    const liHum = $("<li>").addClass("temp card-text").text(`Humidity: ${hum}%`) ;
    const liWind = $("<li>").addClass("wind card-text").text(`Wind Speed: ${wind} mph`)

    console.log(dateFiveDay) ;
    $("#fiveDay").append(card.append(div.append(weatherImg).append(ulFiveDay).append(liDate, liTemp, liHum, liWind))) ;
}
}

