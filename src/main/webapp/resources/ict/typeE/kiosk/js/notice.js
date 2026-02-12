$(document).ready(function () {
    const $mainSlider = $(".libNoticeMain");
    const $subSlider = $(".libNoticeSub");

    const itemCount = $subSlider.children().length;

    if (itemCount > 5) {
        $mainSlider.slick({
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            speed: 500,
            infinite: true,
            asNavFor: ".libNoticeSub",
            autoplay: true,
            autoplaySpeed: 8000,
        });

        $subSlider.slick({
            slidesToScroll: 1,
            asNavFor: ".libNoticeMain",
            speed: 500,
            arrows: false,
            focusOnSelect: true,
            variableWidth: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 8000,
        });
    } else {
        $mainSlider.children().not(":first").hide();
        $mainSlider.children().first().show();

        let currentIndex = 0;

        function nextSlide() {
            currentIndex = (currentIndex + 1) % itemCount;
            $mainSlider.children().fadeOut(400).eq(currentIndex).fadeIn(600);

            $subSlider.children().removeClass("active").eq(currentIndex).addClass("active");
        }

        $subSlider.children().on("click", function () {
            currentIndex = $(this).index();
            $mainSlider.children().fadeOut(400).eq(currentIndex).fadeIn(600);

            $subSlider.children().removeClass("active");
            $(this).addClass("active");
        });

        $subSlider.children().first().addClass("active");

        setInterval(nextSlide, 8000);
    }
});
