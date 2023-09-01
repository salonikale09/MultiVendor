$('.uploadFile').on('click', function () {
  var button = $(this);
  var filename = button.attr('data-filename');
  var file = button.attr('data-file');
  var catalog = filename.includes('catalog');
  var catalogUrl = button.attr('data-url');
  var data = { filedata: file, filenme: filename };

  $.ajax({
    url: catalogUrl,
    method: 'POST',
    data: data,
    success: function (data) {},
    error: function () {
      $.spinner().stop();
    }
  });
});

$('.uploadAllFile').on('click', function () {
  var button = $(this);
  var file = button.attr('data-file');
  // var catalog = filename.includes("catalog");
  var catalogUrl = button.attr('data-url');
  var data = { file: 'fileSend' };
  console.log(JSON.stringify(file));
  $.ajax({
    url: catalogUrl,
    method: 'GET',
    data: data,
    success: function (dat) {
      alert('File Uploaded Successfully');
      console.log(dat);
      location.reload();
    },
    error: function () {

    }
  });
});
