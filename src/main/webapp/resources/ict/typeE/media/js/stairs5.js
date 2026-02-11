$(document).ready(function () {
    function initEtiquetteSlider(selector, itemClass) {
        $(selector).each(function () {
            const $slider = $(this);
            const $items = $slider.children();
            const groupedItems = [];

            // 3개씩 묶기
            for (let i = 0; i < $items.length; i += 3) {
                const $group = $('<div class="wrapper"></div>');
                $items.slice(i, i + 3).appendTo($group);
                groupedItems.push($group);
            }

            $slider.empty().append(groupedItems);

            // init 이벤트
            $slider.on('init', function () {
                $slider.find(`.slick-current .${itemClass}`).each(function (i, el) {
                    setTimeout(() => {
                        $(el).addClass('animate');
                    }, i * 200);
                });
            });

            // afterChange 이벤트
            $slider.on('afterChange', function (event, slick, currentSlide) {
                $slider.find(`.${itemClass}`).removeClass('animate');

                $($slider.find('.slick-slide')[currentSlide])
                    .find(`.${itemClass}`)
                    .each(function (i, el) {
                        setTimeout(() => {
                            $(el).addClass('animate');
                        }, i * 200);
                    });
            });

            // slick 초기화
            $slider.slick({
                slidesToShow: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 8000,
                dots: false,
                infinite: true,
                fade: true,
                cssEase: 'linear'
            });
        });
    }

    // 호출
    initEtiquetteSlider('.etiquetteTopList', 'etiquetteTopListItem');
    initEtiquetteSlider('.etiquetteBottomList', 'etiquetteBottomListItem');
});
