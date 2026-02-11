$(document).ready(function () {
    $('.book-slider').each(function () {
        const $slider = $(this);
        const $items = $slider.find('.book-item'); // 내부 아이템들 선택
        const groups = [];

        // 9개씩 추출하여 wrapper로 감싸기
        for (let i = 0; i < $items.length; i += 9) {
            const $wrapper = $('<div class="wrapper"></div>');
            $items.slice(i, i + 9).appendTo($wrapper);
            groups.push($wrapper);
        }

        // 기존 내용을 비우고 그룹화된 wrapper들 삽입
        $slider.empty().append(groups);

        // Slick 활성화
        $slider.slick({
            slidesToShow: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 8000,
            dots: groups.length > 1,
            accessibility: sessionStorage.getItem("g_earphone") !== 'Y',
            infinite: sessionStorage.getItem("g_earphone") !== 'Y'
        });
    });
});