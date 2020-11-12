"use strict";
$(document).ready(() => {
  $("#btn_translate").click(() => {
    const originalBox = document.getElementById("original-text");
    const original = originalBox.value;
    const targetBox = document.getElementById("translate-target");
    const target = targetBox.options[targetBox.selectedIndex].value;
    const source = "en";
    const type = "google";
    $.ajax({
      url: "/translate",
      dataType: "json",
      type: "POST",
      data: { original: original, source: source, target: target, type: type },
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
