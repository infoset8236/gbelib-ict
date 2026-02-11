$(document).ready(function () {
    var homepage_id = "h102";
    var date_type = "2";

    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');

    var todayStr = year + "-" + month + "-" + day;

    var start_date = todayStr;
    var end_date = todayStr;
    var apiUrl = "/api/homepage/eventList.do?homepage_id=" + homepage_id + "&date_type=" + date_type + "&start_date=" + start_date + "&end_date=" + end_date;
    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (res) {
            if (res.result === 'FAIL') {
                location.href = "stairs2.do?before_url=stairs4.do&before_api_url="+apiUrl;
                return;
            }
            if (res && res["result-data"] && res["result-data"]["result-list"]) {
                const list = res["result-data"]["result-list"];
                renderEventSlides(list);
                initEventSlider();
            }
        },
        error: function (xhr, status, err) {
            location.href = "stairs2.do?before_url=stairs4.do&before_api_url="+apiUrl;
            console.error("행사안내 불러오기 실패:", err);
        }
    });

    function renderEventSlides(list) {
        const $top = $(".topEventSlide").empty();
        const $bottom = $(".bottomEventSlide").empty();

        list.forEach((item, i) => {
            const startDate = new Date(item.start_date);
            const day = startDate.getDate().toString().padStart(2, '0');
            const month = (startDate.getMonth() + 1).toString().padStart(2, '0');

            const topHtml = `
                <div class="topEventSlideItem">
                    <div class="index">${String(i + 1).padStart(2, '0')}</div>
                    <div class="title">${item.title}</div>
                </div>
            `;

            const bottomHtml = `
                <div class="bottomEventSlideItem">
                    <div class="timeAadPlace">
                        <div>${item.start_time && item.end_time ? item.start_time + " ~ " + item.end_time : (item.start_time || item.end_time || '')}</div>
                        <div>${item.place_name || ''}</div>
                    </div>
                    <div class="date">
                        <div>${month}</div>
                        <div>${day}</div>
                    </div>
                </div>
            `;

            $top.append(topHtml);
            $bottom.append(bottomHtml);
        });
    }

    // slick 초기화
    function initEventSlider() {
        $(".topEventSlide").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 8000,
            infinite: true,
            asNavFor: ".bottomEventSlide"
        });

        $(".bottomEventSlide").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 8000,
            infinite: true,
            asNavFor: ".topEventSlide"
        });
    }
});
