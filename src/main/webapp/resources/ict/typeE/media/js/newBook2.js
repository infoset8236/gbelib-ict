jQuery(function ($) {
    const $naList = $(".naList");
    if (!$naList.length) return;

    const $items = $naList.find(".naItem");
    const totalCount = $items.length;

    const showCount = 3; // slidesToShow
    const scrollCount = 3;

    const $current = $(".panelCurrent");
    const $total = $(".panelTotal");

    $total.text("/" + totalCount);

    if ($naList.hasClass("slick-initialized")) {
        $naList.slick("unslick");
    }

    $naList.slick({
        slidesToShow: showCount,
        slidesToScroll: scrollCount,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 8000,
        infinite: true,
        variableWidth: false
    });

    function updatePagination(currentSlide) {
        let currentCount = currentSlide + showCount;

        if (currentCount > totalCount) {
            currentCount = totalCount;
        }

        $current.text(currentCount);
    }

    updatePagination(0);

    $naList.on("afterChange", function (event, slick, currentSlide) {
        updatePagination(currentSlide);
    });
});
