document.addEventListener("DOMContentLoaded", () => {
    // 미리 담아둔 이미지 경로 배열
    const images = [
        "/resources/ict/dglib/media/img/etiquette/etiquette-1.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-2.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-3.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-4.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-5.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-6.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-7.svg"
    ];

    const imgs = document.querySelectorAll(".etImages");

    imgs.forEach((img, index) => {
        img.src = images[index % images.length];
    });
});


$(document).ready(function () {
    // 설정
    const sliderSelector = ".etList";
    const itemSelector = ".etItem";
    const paginationCurrent = ".panelCurrent";
    const paginationTotal = ".panelTotal";

    // DOM
    const $slider = $(sliderSelector);
    const $items = $slider.children(itemSelector);
    const $current = $(paginationCurrent);
    const $total = $(paginationTotal);

    // 페이지네이션 초기값
    $total.text("/" + $items.length);
    $current.text(1);

    // Slick 초기화 (1개짜리 슬라이드)
    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000,
        dots: false,
        infinite: true
    });

    // 슬라이드 변경 시 현재 번호 업데이트
    $slider.on("afterChange", function (_, slick, currentSlide) {
        $current.text(currentSlide + 1);
    });
});
