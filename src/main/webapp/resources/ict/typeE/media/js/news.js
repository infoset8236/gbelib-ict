$(function () {
  $(".newsSlideWrap").slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: "ease-in-out",
  });
});
