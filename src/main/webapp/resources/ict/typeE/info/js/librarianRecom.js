$(document).ready(function() {
    const $wrapper = $('.slideItemWrapper');
    const $items = $wrapper.children('.slideItem');
    const groupSize = 9;

    $wrapper.empty();
    for (let i = 0; i < $items.length; i += groupSize) {
        const $group = $('<div class="slideGroup"></div>');
        $items.slice(i, i + groupSize).appendTo($group);
        $wrapper.append($group);
    }

    $wrapper.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        variableWidth: true,
    });
});
