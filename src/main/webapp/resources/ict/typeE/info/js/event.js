$(document).ready(function() {

    const $eventSlide = $('.libEventBox');

    $eventSlide.slick({
        slidesToScroll: 1,
        arrows: false,
        speed: 500,
        infinite: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 8000
    });
});