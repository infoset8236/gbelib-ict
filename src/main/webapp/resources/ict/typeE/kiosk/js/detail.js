$(document).ready(function () {
    const $mainSlider = $('.mainBookList').slick({
        slidesToShow: 1,
        arrows: false,
        autoplay: false,
        dots: false,
        infinite: sessionStorage.getItem("g_earphone") !== 'Y',
        fade: true,
        cssEase: 'linear',
    });

    $('.bookList').each(function () {
        const $slider = $(this);
        const $children = $slider.children();
        const grouped = [];

        for (let i = 0; i < $children.length; i += 6) {
            const $group = $('<div class="bookItem"></div>');
            $children.slice(i, i + 6).appendTo($group);
            grouped.push($group);
        }

        $slider.empty().append(grouped).slick({
            slidesToShow: 1,
            arrows: false,
            autoplay: false,
            dots: grouped.length > 1,
            infinite: sessionStorage.getItem("g_earphone") !== 'Y'
        });

        let currentBookIndex = 0;

        const highlightBook = ($books, slideIndex) => {
            $books.find('.qrImage').css('border', 'none');
            $books.eq(currentBookIndex).find('.qrImage').css('border', '2px solid #191F28');
            $mainSlider.slick('slickGoTo', slideIndex * 6 + currentBookIndex);
        };

        const initHighlight = (slideIndex) => {
            const $books = $slider.find(`.slick-slide[data-slick-index="${slideIndex}"] .book`);
            currentBookIndex = 0;
            highlightBook($books, slideIndex);
        };

        $slider.on('click', '.book', function () {
            const $clicked = $(this);
            const slideIndex = $clicked.closest('.slick-slide').data('slick-index');
            const $books = $clicked.closest('.bookItem').find('.book');

            currentBookIndex = $books.index($clicked);
            highlightBook($books, slideIndex);
        });

        initHighlight(0);
    });

    $('.close').on('click', function (e) {
        bodyOpen();
        $('.popup').fadeOut();
    });
    if (typeof keyPadController !== "undefined" && keyPadController) {
        bodyOpen();
    }
});

function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function seogaQR(regNo, manageCode) {
    let seogaImage = null;

    const bookDetailUrl = `/api/klas/bookAllDetail.do?manage_code=${manageCode}&reg_no=${regNo}`;
    $.ajax({
        url: bookDetailUrl,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.RESULT_INFO === "SUCCESS" && response.LIST_DATA && response.LIST_DATA.length > 1) {
                const bookData = response.LIST_DATA[1];

                const title = bookData.TITLE_INFO || "-";
                const shelfLocName = bookData.SHELF_LOC_NAME || "-";
                const callNo = bookData.CALL_NO || "-";
                const robot_yn = bookData.ROBOT_YN || "N";

                const $popup = $('#popup');
                if (typeof keyPadController !== "undefined" && keyPadController) {
                    keyPadController.openModal($("#popup"));
                }

                const $printButton = $popup.find('.print');
                if (robot_yn === "Y") {
                    $printButton.show();
                } else {
                    $printButton.hide();
                }

                $popup.find('.popupDetailsMeta div:nth-child(1) span').text(title);
                $popup.find('.popupDetailsMeta div:nth-child(2) span').text(shelfLocName);
                $popup.find('.popupDetailsMeta div:nth-child(3) span').text(callNo);

                const location_key = bookData.SHELF_LOCATION_KEY;
                let floor = null;
                let num = null;
                if (location_key && location_key.match(/(\d+)층/) && location_key.match(/-(\d+)$/)) {
                    floor = (location_key.match(/(\d+)층/) || [])[1];
                    num = (location_key.match(/-(\d+)$/) || [])[1];
                    if (num && num.length === 1) {
                        num = '0' + num;
                    }
                    seogaImage = `W_${floor}F_${num}.png`;
                } else {
                    seogaImage = `W_3F_66.png`;
                    floor = 3;
                    num = 66;
                }
                $(".metaFloor").text(floor + "층");
                $(".metaSection").text(num);

                const qrUrl = `https://library.daegu.go.kr/dglib/seogaLocation.do?seogaImage=${seogaImage}&manage_code=${manageCode}&reg_no=${regNo}`;

                $popup.find('.mapImage').attr('src', "/resources/ict/dglib/seogaLocation/" + seogaImage);

                const $qrWrap = $popup.find('.qrImageWrap');
                $qrWrap.empty();

                const qr = new QRCodeStyling({
                    width: remToPx(13),
                    height: remToPx(13),
                    data: qrUrl,
                    image: "/resources/ict/common/img/common/logo-black.svg",
                    dotsOptions: { color: "#000000", type: "square" },
                    backgroundOptions: { color: "#ffffff" }
                });

                qr.append($qrWrap[0]);

                // 여기부터 추가된 부분
                const $qrSection = $popup.find('.qrSection');
                const hasCanvas = $qrWrap.find('canvas').length > 0;

                $qrSection
                    .toggleClass('has-canvas', hasCanvas)
                    .css('display', hasCanvas ? 'flex' : 'none');

                $popup.fadeIn();
            } else {
                console.warn("도서 상세 정보가 비어 있습니다.");
            }
        },
        error: function(xhr, status, error) {
            console.error('도서 정보를 가져오는데 실패했습니다:', error);
            alert('도서 정보를 불러올 수 없습니다.');
        }
    });
}