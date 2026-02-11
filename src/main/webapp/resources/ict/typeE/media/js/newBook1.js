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
      handleApiResponse(data);
    },
    error: function (xhr, status, error) {
      showNoDataMessage();
      console.error("서버 API 호출 실패:", error);
    }
  });

  function handleApiResponse(data) {
    // 응답 검증 - 데이터가 배열인지 확인
    if (!data || !Array.isArray(data) || data.length === 0) {
      showNoDataMessage();
      return;
    }

    // 유효한 도서 필터링 (reg_no가 있는 항목만)
    const books = data.filter(function(item) {
      return item && item.reg_no;
    });

    if (books.length === 0) {
      showNoDataMessage();
      return;
    }

    renderBooks(books);
  }

  function showNoDataMessage() {
    $(".naList").html('<div class="noData">신착도서가 없습니다.</div>');
  }

  function renderBooks(books) {
    const $slider = $(".naList");
    $slider.empty();

    // 도서 아이템 생성
    const bookItems = books.map(function(book) {
      const imgUrl = getBookImage(book);
      const title = escapeHtml(book.title || '');
      const author = escapeHtml(book.author || '');
      const publisher = escapeHtml(book.publisher || '');
      const shelfLoc = escapeHtml(book.shelf_loc_name || '');
      const description = escapeHtml(book.description || '');

      return `
                <div class="naItem">
                    <div class="naImg">
                        <img class="infoImg" src="${imgUrl}" alt="${title}" onerror="this.src='/resources/ict/dglib/nonTouch/img/common/dummy.png'">
                    </div>
                    <div class="naContent">
                        <div class="naTitle">${title}</div>
                        <div class="naInfo">
                            <div class="naAuthor">${author} · ${publisher}</div>
                            <div class="naLoc">${shelfLoc}</div>
                        </div>
                        <div class="naDesc">${description}</div>
                    </div>
                </div>
            `;
    }).join('');

    $slider.html(bookItems);

    // 슬라이더 초기화
    initializeSlider($slider);
  }

  function getBookImage(book) {
    // image 필드 확인
    if (book.image && book.image.trim() !== "" && book.image.indexOf("noimg3.gif") === -1) {
      return book.image;
    }

    // 기본 이미지
    return "/resources/ict/dglib/nonTouch/img/common/dummy.png";
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

  function initializeSlider($slider) {
    const itemSelector = ".naItem";
    const groupSize = 2;
    const paginationCurrent = ".panelCurrent";
    const paginationTotal = ".panelTotal";

    const $items = $slider.children(itemSelector);
    const $current = $(paginationCurrent);
    const $total = $(paginationTotal);

    // 그룹화
    const groups = [];
    const originalItems = $items.get(); // DOM 요소 배열로 저장
    $slider.empty();

    for (let i = 0; i < originalItems.length; i += groupSize) {
      const $group = $('<div class="slideGroup"></div>');
      $(originalItems.slice(i, i + groupSize)).appendTo($group);
      $slider.append($group);
      groups.push($group);
    }

    // 총 아이템 수 (naItem 기준)
    const totalItems = originalItems.length;
    $total.text("/" + totalItems);
    $current.text(Math.min(groupSize, totalItems)); // 시작은 첫 slideGroup의 naItem 수

    // 기존 slick 인스턴스가 있다면 제거
    if ($slider.hasClass('slick-initialized')) {
      $slider.slick('unslick');
    }

    // slick 초기화
    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 8000,
      dots: false,
      infinite: groups.length > 1,
      speed: 500,
      cssEase: 'ease-in-out',
      pauseOnHover: true,
      pauseOnFocus: true
    });

    // 슬라이드 변경 이벤트
    $slider.on("afterChange", function (event, slick, currentSlide) {
      // 현재 슬라이드의 naItem 수 계산
      const currentGroupIndex = currentSlide;
      const itemsInCurrentGroup = groups[currentGroupIndex].children(itemSelector).length;
      const previousItems = groups.slice(0, currentGroupIndex).reduce(function(sum, group) {
        return sum + group.children(itemSelector).length;
      }, 0);

      $current.text(previousItems + itemsInCurrentGroup);
    });
  }
});
