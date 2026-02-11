
$(window).on('load', function() {
    // 설정
    const sliderSelector = ".chEtiqList";
    const itemSelector = ".chEtiqItem";
    const paginationCurrent = ".panelCurrent";
    const paginationTotal = ".panelTotal";
    const groupSize = 2;

    // DOM 요소
    const $slider = $(sliderSelector);
    const $items = $slider.children(itemSelector);
    const $current = $(paginationCurrent);
    const $total = $(paginationTotal);

    // 슬라이드 그룹 생성
    $slider.empty();
    for (let i = 0; i < $items.length; i += groupSize) {
        const $group = $('<div class="slideGroup"></div>');
        $items.slice(i, i + groupSize).appendTo($group);
        $slider.append($group);
    }

    // 총 아이템 수 표시
    $total.text("/" + $items.length);
    $current.text($slider.find(".slideGroup").first().find(itemSelector).length);

    // Slick 초기화
    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000,
        fade:true,
        dots: false,
        infinite: true
    });

    // 슬라이드 변경 시 현재 아이템 수 업데이트
    $slider.on("afterChange", function (_, slick, currentSlide) {
        let count = 0;
        $slider.find(".slideGroup").slice(0, currentSlide + 1).each(function () {
            count += $(this).find(itemSelector).length;
        });
        $current.text(count);
    });
});