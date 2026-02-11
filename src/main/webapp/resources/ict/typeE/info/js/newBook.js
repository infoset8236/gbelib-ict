$(document).ready(function() {

    $('.mainSlideItemWrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,                // 페이드 인/아웃
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000,
        asNavFor: '.subSlideImageWrapper',
        centerMode: true,
    });

    $('.subSlideImageWrapper').slick({
        slidesToShow: 5,           // 화면에 보여질 슬라이드 수
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000,
        asNavFor: '.mainSlideItemWrapper',
        variableWidth: true,
        centerMode: true,
    });

});
