document.addEventListener("DOMContentLoaded", () => {
    // 미리 담아둔 이미지 경로 배열
    const images = [
        "/resources/ict/dglib/media/img/etiquette/etiquette-1.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-2.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-3.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-4.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-5.svg",
        "/resources/ict/dglib/media/img/etiquette/etiquette-6.svg",
    ];

    const imgs = document.querySelectorAll(".etImages");

    imgs.forEach((img, index) => {
        // index에 맞춰 배열에서 src 가져오기
        img.src = images[index % images.length];
    });
});

$(document).ready(function () {
    // 설정
    const sliderSelector = ".etList";          // 슬라이더 컨테이너
    const itemSelector = ".etItem";            // 슬라이드 아이템
    const paginationCurrent = ".panelCurrent"; // 현재 아이템 표시
    const paginationTotal = ".panelTotal";     // 전체 아이템 표시

    // DOM 요소
    const $slider = $(sliderSelector);
    const $items = $slider.children(itemSelector);
    const $current = $(paginationCurrent);
    const $total = $(paginationTotal);

    // 그룹화 제거 — 아이템을 그대로 둠
    // 이전 코드에서는 그룹을 만들었지만 이제는 그대로 사용
    $total.text("/" + $items.length);
    $current.text(1); // 처음 시작은 1번째 아이템

    // Slick 초기화
    $slider.slick({
        slidesToShow: 1,        // 한 번에 하나씩 보여줌
        slidesToScroll: 1,      // 한 번에 하나씩 이동
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        variableWidth: true,
        dots: false,
        infinite: true
    });

    // 슬라이드 변경 시 현재 인덱스 업데이트
    $slider.on("afterChange", function (_, slick, currentSlide) {
        $current.text(currentSlide + 1);
    });
});
