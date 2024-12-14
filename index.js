var searchInput = document.getElementById("search");

var currentCity;
async function getCurrentLocation() {
  var curretRes = await fetch(`https://ip-api.com/json/?fields=city`);
  var curretData = await curretRes.json();
  currentCity = curretData.city;
  console.log(currentCity);
  getCountry(currentCity);
}

var data;
async function getCountry(country) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=068ed2b5c07d44849aa120354240712&q=${country}&days=3`
  );
  data = await res.json();

  console.log(data);

  display();
}

var searchInput = document.getElementById("search");

function search() {
  var word = searchInput.value;
  console.log(word);
  if (searchInput.value == "") {
    getCountry(currentCity);
  } else {
    getCountry(word);
  }
}
searchInput.addEventListener("input", function () {
  search();
});

function display() {
  var cartona = "";
  for (i = 0; i < data.forecast.forecastday.length; i++) {
    cartona += `

          <div class="col-md-4 ">
            <div class="item">
              <div class="sitem d-flex justify-content-between p-3">
                <h6>${new Date(
                  data.forecast.forecastday[i].date
                ).toDateString()}</h6>
                <h6></h6>
              </div>

              <div class="sitem2 p-3">
                <h6>${data.location.name}</h6>
                <h1>${data.forecast.forecastday[i].day.maxtemp_c}°c</h1>
                <img src="https://${
                  data.forecast.forecastday[i].day.condition.icon
                }">
  <h6>${data.forecast.forecastday[i].day.condition.text}</h6>
              </div>

              <div class="sitem3 p-3 d-flex justify-content-around">
                <i class="fa-solid fa-umbrella">  20%</i>
                <i class="fa-solid fa-wind">  ${data.forecast.forecastday[i].day.maxwind_mph} km/h</i>
                <i class="fa-solid fa-water">  East</i>
              </div>

            </div>
          </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}

getCurrentLocation();
