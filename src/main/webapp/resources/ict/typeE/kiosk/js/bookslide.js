$(function () {
    new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    $(document).ready(function () {

        $("#loading").show();


        setTimeout(function () {
            $("#loading").fadeOut();
        }, 3000);
    });