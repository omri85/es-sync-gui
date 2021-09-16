$(document).ready(function () {
  $(".delete").click(function () {
    var id = $(this).attr("id");
    $.ajax({
      url: `api/connection/${id}`,
      method: "DELETE",
    }).done(function () {
      location.reload();
    });
  });
});
