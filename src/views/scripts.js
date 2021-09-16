$(document).ready(function () {
  $(".nav-item").click(function () {
    var current = location.href.split("/")[3];
    $(".active").removeClass("active");
    $(`#${current}`).addClass("active");
  });
});
