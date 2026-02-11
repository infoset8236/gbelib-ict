$(document).ready(function () {
    const manageCode = "DG";

    // 날짜 계산
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];

    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const startDate = threeMonthsAgo.toISOString().split("T")[0];

    const params = {
        manageCode: manageCode,
        search_start_date: startDate,
        search_end_date: endDate,
        pageno: "1",
        display: "20"
    };

    const apiUrl = `/book/newbookList.do?${$.param(params)}`;

    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (data) {
            handleApiResponse(data, apiUrl);
        },
        error: function (xhr, status, error) {
            redirectToErrorPage(apiUrl);
            console.error("서버 API 호출 실패:", error);
        }
    });

    function handleApiResponse(data, apiUrl) {
        // 응답 검증 - 데이터가 배열인지 확인
        if (!data || !Array.isArray(data) || data.length === 0) {
            redirectToErrorPage(apiUrl);
            return;
        }

        // 유효한 도서 필터링 (reg_no가 있는 항목만)
        const books = data.filter(function(item) {
            return item && item.reg_no;
        });

        if (books.length === 0) {
            redirectToErrorPage(apiUrl);
            return;
        }

        renderBooks(books);
    }

    function redirectToErrorPage(apiUrl) {
        location.href = "stairs2.do?before_url=stairs6.do&before_api_url=" + encodeURIComponent(apiUrl);
    }

    function renderBooks(books) {
        const $top = $(".bookTopList").empty();
        const $bottom = $(".bookBottomList").empty();

        $.each(books, function (index, book) {
            const imgUrl = getBookImage(book);
            const title = escapeHtml(book.title || '');
            const author = escapeHtml(book.author || '');
            const description = escapeHtml(book.description || '');

            const html = `
                <div class="${index % 6 < 3 ? 'bookTopListItem' : 'bookBottomListItem'}">
                    <div class="information">
                        <div>${author}</div>
                        <div>${title}</div>
                    </div>
                    <div class="summary">
                        ${description}
                    </div>
                    <img class="bookImg" src="${imgUrl}" alt="${title}" onerror="this.src='/resources/ict/dglib/smart/img/common/dummy.png'">
                </div>
            `;

            // index%6 < 3 → Top, 아니면 Bottom
            if (index % 6 < 3) {
                $top.append(html);
            } else {
                $bottom.append(html);
            }
        });

        // 슬라이더 초기화
        initializeSliders($top, $bottom);
    }

    function getBookImage(book) {
        // image 필드 확인
        if (book.image && book.image.trim() !== "" && book.image.indexOf("noimg3.gif") === -1) {
            return book.image;
        }

        // 기본 이미지
        return "/resources/ict/dglib/smart/img/common/dummy.png";
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function initializeSliders($top, $bottom) {
        // 기존 slick 인스턴스가 있다면 제거
        if ($top.hasClass('slick-initialized')) {
            $top.slick('unslick');
        }
        if ($bottom.hasClass('slick-initialized')) {
            $bottom.slick('unslick');
        }

        const hasMultipleTopItems = $top.children().length > 1;
        const hasMultipleBottomItems = $bottom.children().length > 1;

        // Top 슬라이더 초기화 (RTL - 오른쪽에서 왼쪽)
        $top.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 8000,
            infinite: hasMultipleTopItems,
            rtl: true,
            speed: 500,
            cssEase: 'ease-in-out',
            pauseOnHover: true,
            pauseOnFocus: true
        });

        // Bottom 슬라이더 초기화 (LTR - 왼쪽에서 오른쪽)
        $bottom.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 8000,
            infinite: hasMultipleBottomItems,
            speed: 500,
            cssEase: 'ease-in-out',
            pauseOnHover: true,
            pauseOnFocus: true
        });
    }
});
