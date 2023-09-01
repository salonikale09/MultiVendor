$(document.body).on("change", "#selectID", function (e) {
  var optVal = $("#selectID option:selected").val();
  let url = document.getElementById("listUrl").value;

  $.ajax({
    url: url + "?id=" + optVal,
    method: "GET",
    success: function (data) {
     $('#vendor-list').empty()
     $('#vendor-list').html(data)
    },
    error: function () {
    },
  });
});


