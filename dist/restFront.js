"use strict";
$(document).ready(() => {
  $("#btn_translate").click(() => {
    console.log("button click");
    const originalBox = document.getElementById("original-text");
    console.log(originalBox);
    const original = originalBox.value;
    const targetBox = document.getElementById("translate-target");
    const target = targetBox.options[targetBox.selectedIndex].value;

    $.ajax({
      url: "/translate",
      dataType: "json",
      type: "POST",
      data: { original: original, target: target },
      success: (result) => {
        if (result) {
          $("#translate-text").html(result.result);
        }
      },
      error: (request, status, error) => {
        alert(
          "code = " +
            request.status +
            " message = " +
            request.responseText +
            " error = " +
            error
        );
      },
    });
  });
});
