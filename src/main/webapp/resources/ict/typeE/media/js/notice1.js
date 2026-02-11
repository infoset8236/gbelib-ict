$(document).ready(function () {
    const $infoList = $(".infoList");
    const $current = $(".panelPagination .panelCurrent");
    const $total = $(".panelPagination .panelTotal");

    const groupSize = 3;    // infoItem 3개씩 묶기
    const wrapperSize = 2;  // 한 슬라이드에 infoGroup 2개

    var manage_idx = "1371";
    var board_type = "NOTICE";
    var apiUrl = "/api/homepage/boardList.do?manage_idx=" + manage_idx + "&board_type=" + board_type + "&kiosk_yn=Y";

    // ✅ 공지사항 불러오기
    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (res) {
            const list = res["result-data"]?.["result-list"] || [];

            if (list.length === 0) {
                $infoList.html('<div class="noData">공지사항이 없습니다.</div>');
                return;
            }

            // 기존 리스트 비우기
            $infoList.empty();

            // ===== infoItem 생성 =====
            list.forEach(item => {
                const $infoItem = $('<div class="infoItem"></div>');

                const imageUrl = getValidImageUrl(item.image_url);
                const decodedTitle = decodeHtmlEntities(item.title || "");

                const $img = $('<img class="infoImg" alt="">').attr("src", imageUrl);
                const $text = $('<div class="infoItemText"></div>').text(decodedTitle);

                $infoItem.append($img).append($text);
                $infoList.append($infoItem);
            });

            // ===== 그룹화 =====
            const $items = $infoList.children(".infoItem");
            const newList = $("<div></div>");

            for (let i = 0; i < $items.length; i += groupSize * wrapperSize) {
                const $wrapper = $('<div class="infoGroupWrapper"></div>');

                for (let j = i; j < i + groupSize * wrapperSize && j < $items.length; j += groupSize) {
                    const $group = $('<div class="infoGroup"></div>');
                    $items.slice(j, j + groupSize).appendTo($group);
                    $wrapper.append($group);
                }

                newList.append($wrapper);
            }

            $infoList.html(newList.html());

            // ===== Slick 초기화 =====
            const totalSlides = $infoList.find(".infoGroupWrapper").length;

            $total.text("/" + totalSlides);
            $current.text(1);

            $infoList.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 8000,
                dots: false,
                centerMode: false,
                infinite: true,
                variableWidth: true
            });

            // ===== 페이지네이션 (1씩 증가) =====
            $infoList.on("afterChange", function (_, slick, currentSlide) {
                $current.text(currentSlide + 1);
            });
        },
        error: function () {
            $infoList.html('<div class="noData">등록된 공지사항이 없습니다.</div>');
        }
    });
});


// ===== 유틸 =====
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
