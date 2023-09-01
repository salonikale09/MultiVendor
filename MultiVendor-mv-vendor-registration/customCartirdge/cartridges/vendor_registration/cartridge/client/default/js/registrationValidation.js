var countryList = require("country-list");

$(document).ready(function () {
  console.log("fdfd", countryList.getData());
  var listData = countryList.getData();
  listData.forEach((val) => {
    document.getElementById(
      "testCountry"
    ).innerHTML += `<option value="${val.name}">${val.name}</option>`;
  });
});
