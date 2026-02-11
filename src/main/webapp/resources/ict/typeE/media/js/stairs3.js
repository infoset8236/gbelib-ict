$(document).ready(function () {
    const manage_idx = "1371";
    const board_type = "NOTICE";
    const apiUrl = "/api/homepage/boardList.do?manage_idx=" + manage_idx + "&board_type=" + board_type + "&kiosk_yn=Y";

    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (res) {
            if (res.result === 'FAIL') {
                location.href = "stairs2.do?before_url=stairs3.do&before_api_url="+apiUrl;
                return;
            }

            if (res && res["result-data"] && res["result-data"]["result-list"]) {
                const list = res["result-data"]["result-list"];
                renderNoticeList(list);

                // 슬라이더 적용
                initNoticeSlider('.noticeTopList', 'noticeTopListItem');
                initNoticeSlider('.noticeBottomList', 'noticeBottomListItem');
            }
        },
        error: function (xhr, status, err) {
            location.href = "stairs2.do?before_url=stairs3.do&before_api_url="+apiUrl;
            console.error("공지사항 불러오기 실패:", err);
        }
    });

    function decodeHtmlEntities(str) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
    }

    function getValidImageUrl(url) {
        if (!url) return '/resources/ict/dglib/media/img/common/dummy.png';
        const lower = url.toLowerCase();
        if (lower.includes('noimg') || lower.includes('no_img') || lower.includes('noimage')) {
            return '/resources/ict/dglib/media/img/common/dummy.png';
        }
        return url;
    }

    // 12개 단위 → 6+6 분할
    function renderNoticeList(list) {
        const $topList = $(".noticeTopList").empty();
        const $bottomList = $(".noticeBottomList").empty();

        list.forEach((item, i) => {
            const blockIdx = Math.floor(i / 3);   // 0,1,2 ... (3개 단위 블럭)
            const isTop = (blockIdx % 2 === 0);   // 짝수 블럭 → Top, 홀수 블럭 → Bottom

            const decodedTitle = decodeHtmlEntities(item.title || "");

            const imageUrl = getValidImageUrl(item.image_url);

            const html = `
                <div class="${isTop ? 'noticeTopListItem' : 'noticeBottomListItem'}">
                    <img class="noticeImg" src="${imageUrl}" alt="">
                    <div class="noticeContent">
                        <div>${String(i+1).padStart(2, '0')}</div>
                        <div>${decodedTitle}</div>
                    </div>
                </div>
            `;

            if (isTop) {
                $topList.append(html);
            } else {
                $bottomList.append(html);
            }
        });
    }

    // slick 초기화 함수 (기존 그대로)
    function initNoticeSlider(selector, itemClass) {
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
});
