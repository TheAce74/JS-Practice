$(document).ready(() => {
  function count() {
    $(".timer").animate(
      {
        right: "0",
      },
      10000
    );

    setTimeout(next, 10100);
  }

  function next() {
    for (let i = 0; i < 10; i++) {
      if ($(".slider img").eq(i).css("display") == "block") {
        if (i < 9) {
          $(".slider img").eq(i).css({
            transform: "scale(2.5)",
          });

          $(".slider img")
            .eq(i)
            .fadeOut(5000, () => {
              $(".slider img")
                .eq(i + 1)
                .fadeIn();

              $(".slider img").eq(i).css("transform", "scale(1)");

              $(".timer").css("right", "100%");

              $(".items span").eq(i).css("background-color", "white");
              $(".items span")
                .eq(i + 1)
                .css("background-color", "red");

              count();
            });
        } else {
          $(".slider img").eq(9).css({
            transform: "scale(2.5)",
          });

          $(".slider img")
            .eq(9)
            .fadeOut(5000, () => {
              $(".slider img").eq(0).fadeIn();

              $(".slider img").eq(9).css("transform", "scale(1)");

              $(".timer").css("right", "100%");

              $(".items span").eq(9).css("background-color", "white");
              $(".items span").eq(0).css("background-color", "red");

              count();
            });
        }
      }
    }
  }

  //wait 2 seconds before starting the slider animation
  setTimeout(count, 2000);
});
