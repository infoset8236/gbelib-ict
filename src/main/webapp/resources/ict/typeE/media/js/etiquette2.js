document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "/resources/ict/typeE/media/img/etiquette/etiquette-1.svg",
    "/resources/ict/typeE/media/img/etiquette/etiquette-2.svg",
    "/resources/ict/typeE/media/img/etiquette/etiquette-3.svg",
    "/resources/ict/typeE/media/img/etiquette/etiquette-4.svg",
    "/resources/ict/typeE/media/img/etiquette/etiquette-5.svg",
    "/resources/ict/typeE/media/img/etiquette/etiquette-6.svg",
    "/resources/ict/typeE/media/img/etiquette/etiquette-7.svg",
  ];

  document.querySelectorAll(".etImages").forEach((img, i) => {
    img.src = images[i % images.length];
  });
});

$(function () {
  const $slider = $(".etList");
  const $items = $slider.children(".etItem");
  const groupSize = 2;

  $slider.empty();

  for (let i = 0; i < $items.length; i += groupSize) {
    $("<div class='slideGroup'>")
      .append($items.slice(i, i + groupSize))
      .appendTo($slider);
  }

  $(".panelTotal").text("/" + $items.length);

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    dots: false,
    infinite: true,
  });

  $slider.on("afterChange", (e, slick, currentSlide) => {
    let count = 0;
    $slider
      .find(".slideGroup")
      .slice(0, currentSlide + 1)
      .each(function () {
        count += $(this).children(".etItem").length;
      });
    $(".panelCurrent").text(count);
  });

  $(".panelCurrent").text($slider.find(".slideGroup").first().children(".etItem").length);
});
