$(document).ready(function() {


    const $mainSlider = $('.libNoticeMain');
    const $subSlider = $('.libNoticeSub');


    $mainSlider.slick({
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        speed: 500,
        infinite: true,
        asNavFor: '.libNoticeSub',
        autoplay: true,
        autoplaySpeed: 8000
    });

    $subSlider.slick({
        slidesToScroll: 1,
        asNavFor: '.libNoticeMain',
        speed: 500,
        arrows: false,
        focusOnSelect: true,
        variableWidth: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000
    });

});