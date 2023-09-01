var fileConvert = require("xml-js");
var contents;
var fileObjData;

$(document).ready(function () {
  document
    .getElementById("files")
    .addEventListener("change", handleFileSelect, false);
  console.log(fileConvert);
});

function handleFileSelect(event) {
  var contents = event.target.files; // FileList object
  // for (var i = 0, f; (f = files[i]); i++) {
  //   var reader = new FileReader();
  //   reader.onload = (function (reader) {
  //     return function () {
  //       contents = reader.result;
  //       var lines = contents.split("\n");
  //       fileObjData = fileConvert.xml2json(contents);
  //       console.log("xml - file", contents);
  //       console.log("json - file", fileObjData);
  //     };
  //   })(reader);
  //   reader.readAsText(f);
  // }
}

$(document).ready(function () {
  
  $("#fileUploadBtn").click(function () {
    $("#uploadings").show();
    // var catalogUrl = document.getElementById("catalogUrl").value;
    console.log('loader run');
    var catalogUrl = "https://fileupload-canl.onrender.com/api/multipleFiles";
    var datacustomer = $(this);
    var customer = datacustomer.attr('data-customer')
    console.log(customer)
    var formData = new FormData();
    var multipleFiles = $('#files')[0].files;
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('files', multipleFiles[i]);
    }

  console.log(formData)
    $.ajax({
      url: catalogUrl,
      method: "POST",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: 'multipart/form-data',
      processData: false,
      success: function (data) {
        // $.spinner().start();
        console.log(data)
        alert("Uploaded sucessfully")
       


      },
      complete: function(){
        $('#uploadings').hide();
      },
      error: function () {
        $.spinner().stop();
      },
    });
    
    
  });
});
