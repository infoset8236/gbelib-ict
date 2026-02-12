$(document).ready(function () {
    const $mainSlider = $('.mainBookList').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        dots: false,
        infinite: sessionStorage.getItem("g_earphone") !== 'Y',
        fade: true,
        cssEase: 'linear',
        asNavFor: '.bookList'   // ← 핵심: bookList와 동기화
    });

    // 2. 하단 리스트 슬라이더 - 5개씩 보여주기 (그룹화 제거, 모든 .book 직접 슬라이드)
    const $navSlider = $('.bookList').slick({
        slidesToShow: 6,          // 한 번에 5개 보이게
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: sessionStorage.getItem("g_earphone") !== 'Y',
        // focusOnSelect: true,      // 클릭한 항목으로 이동 + 포커스
        centerMode: false,        // 필요시 true로 해서 중앙 강조 가능
        asNavFor: '.mainBookList', // ← 핵심: 메인과 동기화
        pauseOnHover: true,       // 마우스 올리면 일시정지 (편의성 좋음, 선택)
        pauseOnFocus: true,
    });

    // 하이라이트 적용 (현재 선택된 책의 qrImage에 테두리)
    function applyHighlight() {
        $('.bookList .qrImage').css('border', 'none');

        // bookList에서 현재 active 슬라이드 찾기
        const $activeBook = $('.bookList .slick-current .book');

        if ($activeBook.length) {
            $activeBook.find('.qrImage').css('border', '2px solid #191F28');
        }
    }

    // 초기 로드 시 첫 번째 항목 하이라이트
    setTimeout(applyHighlight, 100);

    // 슬라이더 변경될 때마다 하이라이트 업데이트
    $navSlider.on('afterChange', function () {
        applyHighlight();
    });

    // .book 클릭 시에도 강제로 하이라이트 (안전장치)
    $('.bookList').on('click', '.book', function () {
        let loca = this.dataset.loca;
        let ctrlNo = this.dataset.ctrlno;
        $(".loadingOverlay").fadeIn(100);
        location.href="detailVertical.do?vLoca="+loca + "&vCtrl="+ctrlNo;
        // setTimeout(applyHighlight, 50); // slick 이벤트 후 약간 지연
    });

    $(document).on("click", ".bookDetail", function () {
        const data = {
            content1: this.dataset.title,
            content2: this.dataset.publisher,
            content3: this.dataset.callno,
            content4: this.dataset.acsson,
            content5: this.dataset.author,
            content6: this.dataset.subloca
        };
        popUpClick(data, this.dataset.type);
    })

    $(document).on('click', '.close', function () {
        if (typeof bodyOpen === "function") bodyOpen();
        $('#popup').fadeOut();
    });

    $(".print").on('click', function () {
        if (typeof printReceipt === "function") printReceipt();
        setTimeout(window.close, 5000);
    });
});

function popUpClick(data, type = 'detail') {
    Object.entries(data).forEach(([key, value]) => {
        $(".popup_" + key).text(value ?? "");
    });

    $('#popup').fadeIn();
}

/**
 * 청구기호 파싱
 * @param {string} callNo "818 이19ㅇ"
 */
function parseCallNumber(callNo) {
    const trimmed = callNo.trim();
    const m = trimmed.match(/^([\d.]+)\s*(.*)$/);
    if (!m) return { classNo: NaN, bookCode: "" };

    return {
        classNo: parseFloat(m[1]),
        bookCode: m[2].trim() || ""
    };
}

/**
 * 서가 위치 찾기
 * @param {string} roomName "종합자료실"
 * @param {string} callNo "818 이19ㅇ"
 */
function getShelfName(roomName, callNo, itemExtra = "-") {
    const { classNo, bookCode } = parseCallNumber(callNo);
    if (isNaN(classNo)) return null;


    if (roomName === "디지털라운지") {
        return {number:"16", floor:"2F",shelf:"디지털라운지 16"};
    }

    // 1. 유아자료실 예외 처리 (별치기호가 '아동' 혹은 '그림책'인 경우)
    if (roomName === "유아자료실" && (itemExtra === "그림책" || itemExtra === "아동")) {
        return {number:"17", floor:"1F",shelf:"17-그림책"};
    }

    // 2. 특수 별치기호 우선 매칭 (일반 아동 도서 제외)
    // '큰글', '다문화', '신착' 등은 분류번호보다 우선합니다.
    const specialExtras = ["큰글", "다문화", "1학년", "2학년", "3학년", "4학년", "5학년", "6학년"];
    if (specialExtras.includes(itemExtra)) {
        const special = SHELVES.find(s => s.room === roomName && s.extra === itemExtra);
        if (special) return special;
    }

    // 3. 일반 서가 검색 (분류번호 + 도서기호 정밀 비교)
    // 여기서 itemExtra가 "아동"이거나 "-"인 일반 도서들을 처리합니다.
    const candidates = SHELVES.filter(s => {
        // 자료실 일치 여부 확인
        if (s.room !== roomName) return false;
        // 특수 서가가 아닌 일반 서가(아동/일반)만 필터링
        return s.extra === "아동" || s.extra === "-" || s.extra === "";
    });

    for (const s of candidates) {
        const startC = parseFloat(s.startClass);
        const endC = parseFloat(s.endClass);

        // 분류번호 범위 체크
        if (classNo < startC || classNo > endC) continue;

        // 같은 분류번호 내에서 도서기호 경계 체크
        if (classNo === startC && bookCode.localeCompare(s.startBook) < 0) continue;
        if (classNo === endC && bookCode.localeCompare(s.endBook) > 0) continue;

        // 813.8처럼 범위가 쪼개진 경우, 더 구체적인 서가를 찾기 위해 계속 탐색하지 않고 첫 매칭 시 반환
        // (SHELVES 배열 순서가 중요함)
        return s;
    }

    return {number: "-1",floor:"1F",shelf:roomName};
}

function printReceipt() {
    const printContents = document.querySelector('.printContent').innerHTML;
    const printWindow = window.open('', '_blank', 'width=400,height=600');

    printWindow.document.write('<html><head><title>도서 위치 안내</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
        @media print {
            @page { 
                size: 80mm auto; 
                margin: 0 !important; /* 여백을 0으로 하고 내부 padding으로 조절 */
            }
            body { 
                margin: 0; 
                padding: 5mm 5mm 0 5mm; /* 상좌우 여백 */
                width: 70mm; 
                font-family: 'Malgun Gothic', sans-serif;
            }
            td, th { font-weight: 800; font-size: 10pt; line-height: 1.4; }
            img { max-width: 100% !important; height: auto !important; margin-bottom: 10px; }
            
            /* 핵심: 하단 잘림 방지를 위한 가짜 여백 요소 */
            .print-footer-spacer {
                display: block;
                height: 100px; /* 이 높이만큼 종이를 더 밀어 올립니다 */
                content: "";
            }
            
            #print_btn_box, #sms_btn_box, .close-btn, button { display: none !important; }
        }
    `);
    printWindow.document.write('</style></head><body>');

    // 내용을 감싸고 마지막에 확실한 여백용 div 추가
    printWindow.document.write('<div class="receipt-body">');
    printWindow.document.write(printContents);
    printWindow.document.write('</div>');
    printWindow.document.write('<div class="print-footer-spacer"></div>'); // 하단 공백 추가

    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.onload = function() {
        // 이미지가 로드될 시간을 충분히 주기 위해 0.5초 대기
        setTimeout(function() {
            printWindow.focus();
            printWindow.print();

            // 사용자가 확인을 누른 후 5초 뒤 창 닫기
            setTimeout(function() {
                printWindow.close();
            }, 5000);
        }, 500);
    };
}
