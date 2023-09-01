console.log('I love YOU')

$(".uploadFile").on('click', function(){
    var button = $(this);
    var controllerUrl = button.attr('data-url');

    $.ajax({
        url: controllerUrl,
        method: "GET",
        success: function (data) {
          alert()
  
        },
        error: function () {
          $.spinner().stop();
          alert(1);
        },
      });
});