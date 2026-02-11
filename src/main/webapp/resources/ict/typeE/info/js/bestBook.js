$(document).ready(function () {
    $('.swiper-wrapper').slick({
        slidesToShow: 1,       // 한 번에 1개 슬라이드
        slidesToScroll: 1,
        infinite: true,        // 무한 반복
        autoplay: true,        // 자동 슬라이드
        autoplaySpeed: 2500,   // 슬라이드 속도 (ms)
        arrows: false,         // 화살표 숨김
        dots: false,           // 도트 표시 여부
        swipe: true,           // 터치 가능
        adaptiveHeight: true   // 내부 높이에 따라 슬라이더 높이 조정
    });
});
