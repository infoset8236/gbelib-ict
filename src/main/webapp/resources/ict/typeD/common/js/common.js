let lastFocusedElement = null;

$(function (){
    if (typeof keyPadController !== "undefined" && keyPadController) {
        keyPadController.init(jQuery, {debugMode: false});
    }
})

/*let lastFocusedElement = null; //팝업 열기 전 포커스 기억
let audio = new Audio();
const STORAGE_KEY = 'DEVICE_CODE';

function getDeviceCode (useApi = true) {
    let code = localStorage.getItem(STORAGE_KEY) || '';
    if (useApi) {
        $.ajax({
            url: '/api/deviceCode/getDeviceCode.do',
            type: 'GET',
            dataType: 'json',
            data: { code: code },
            success: function (res) {
                console.log('서버 응답:', res.DEVICE_CODE);
                if (res && res.DEVICE_CODE) {
                    if (!code || code !== res.DEVICE_CODE) {
                        localStorage.setItem(STORAGE_KEY, res.DEVICE_CODE);
                    }
                    return res.DEVICE_CODE;
                } else {
                    console.warn('서버에서 디바이스 코드를 찾지 못했습니다.');
                    return null;
                }
            },
            error: function (xhr, status, error) {
                console.error('요청 실패');
                console.error('상태코드:', xhr.status);
                console.error('에러내용:', error);
                console.error('응답본문:', xhr.responseText);
                return null;
            }
        });
    } else {
        return code;
    }
}*/

function showCommonPopup(message, callback, callback2 = null) {
    lastFocusedElement = document.activeElement;
    $(".commonPopupContent").attr("aria-label", message);
    $(".commonPopupMessage").text(message);
    $(".commonPopup").fadeIn(function() {
        // 🔹 팝업이 열린 후 포커스 이동
        // $(".commonPopupMessage").attr("tabindex", "-1").focus();
    });

    $(".commonPopupClose").off("click").on("click", function() {
        closeCommonPopup(callback, callback2);
    });
}
function bodyOpen() {
    if (typeof keyPadController !== "undefined" && keyPadController) {
        keyPadController.openModal($("body"));
    }
}
function customPopup(message, callback = bodyOpen, callback2 = null) {
    keyPadController.openModal($("#commonPopup"));
    showCommonPopup(message.replaceAll("\\n", "\n"), callback, callback2);
    let item = sessionStorage.getItem("g_earphone");
    if (item === 'Y') {
        keyPadController.setFocus(0, true);
    }
}

function customPopupHtml(message,callback = bodyOpen,callback2 = null) {
    keyPadController.openModal($("#commonPopup"));
    showCommonPopupHtml(message.replaceAll("\\n", "\n"), callback,callback2);
    let item = sessionStorage.getItem("g_earphone");
    if (item === 'Y') {
        keyPadController.setFocus(0, true);
    }
}

function showCommonPopupHtml(message, callback) {
    // 🔹 현재 포커스된 요소 기억
    lastFocusedElement = document.activeElement;
    $(".commonPopupMessage").html(message);
    $(".commonPopup").fadeIn(function() {
        $(".commonPopupMessage").attr("tabindex", "-1").focus();
    });

    $(".commonPopupClose").off("click").on("click", function() {
        closeCommonPopup(callback);
    });
}

function closeCommonPopup(callback, callback2 = null) {
    $(".commonPopup").fadeOut(function() {
        $(".commonPopupMessage").text("");
        $(".commonPopupClose").off("click");

        // 🔹 팝업 닫힌 후, 이전 포커스 복귀
        if (lastFocusedElement) {
            $(lastFocusedElement).focus();
            lastFocusedElement = null;
        }

        if (typeof callback === "function") {
            callback();
        }

        if (callback2 && typeof callback === "function") {
            callback2();
        }
    });
}

// 🔹 ESC 키로 닫기
$(document).on("keydown", function(e) {
    if (e.key === "Escape" && $(".commonPopup").is(":visible")) {
        closeCommonPopup();
    }
});

// 🔹 로그아웃 버튼
$(function() {
    $("#smartLogoutBtn").on("click", function () {
        $.ajax({
            type: "POST",
            url: "logout.do",
            success: function () {
                window.location.href = "main.do";
            },
            error: function () {
                showCommonPopup("로그아웃 처리 중 오류가 발생했습니다.");
            }
        });
    });
});

// 🔹 로딩 오버레이 처리
$(document).ready(function() {
    let loadingTimeout = null;

    $(document).ajaxStart(function() {
        $(".loadingOverlay").fadeIn(100);

        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(function() {
            $(".loadingOverlay").fadeOut(200);
        }, 2000);
    });

    $(document).ajaxStop(function() {
        clearTimeout(loadingTimeout);
        $(".loadingOverlay").fadeOut(200);
    });

    $(document).ajaxError(function() {
        clearTimeout(loadingTimeout);
        $(".loadingOverlay").fadeOut(200);
    });
});


const SHELVES = [
    // 어린이자료실
    {number:"01", floor:"1F" ,shelf: "어린이자료실 1", room: "어린이자료실", extra: "아동", startClass: "000", startBook: "가11ㄱ", endClass: "329.999", endBook: "힣99ㅎ" },
    {number:"02", floor:"1F" , shelf: "어린이자료실 2", room: "어린이자료실", extra: "아동", startClass: "330", startBook: "가11ㄱ", endClass: "375.199", endBook: "힣99ㅎ" },
    {number:"03", floor:"1F" , shelf: "어린이자료실 3", room: "어린이자료실", extra: "아동", startClass: "375.2", startBook: "가11ㄱ", endClass: "406.999", endBook: "힣99ㅎ" },
    {number:"04", floor:"1F" , shelf: "어린이자료실 4", room: "어린이자료실", extra: "아동", startClass: "407", startBook: "가11ㄱ", endClass: "499.999", endBook: "힣99ㅎ" },
    {number:"05", floor:"1F" , shelf: "어린이자료실 5", room: "어린이자료실", extra: "아동", startClass: "500", startBook: "가11ㄱ", endClass: "599.999", endBook: "힣99ㅎ" },
    {number:"06", floor:"1F" , shelf: "어린이자료실 6", room: "어린이자료실", extra: "아동", startClass: "600", startBook: "가11ㄱ", endClass: "699.999", endBook: "힣99ㅎ" },
    {number:"07", floor:"1F" , shelf: "어린이자료실 7", room: "어린이자료실", extra: "아동", startClass: "700", startBook: "가11ㄱ", endClass: "799.999", endBook: "힣99ㅎ" },
    {number:"08", floor:"1F" , shelf: "어린이자료실 8", room: "어린이자료실", extra: "아동", startClass: "800", startBook: "가11ㄱ", endClass: "813.8", endBook: "섯99ㅎ" },
    {number:"09", floor:"1F" , shelf: "어린이자료실 9", room: "어린이자료실", extra: "아동", startClass: "813.8", startBook: "성11ㄱ", endClass: "813.8", endBook: "천95ㅎ" },
    {number:"10", floor:"1F" , shelf: "어린이자료실 10", room: "어린이자료실", extra: "아동", startClass: "813.8", startBook: "천96ㄱ", endClass: "833.8", endBook: "히235ㅈ" },
    {number:"11", floor:"1F" , shelf: "어린이자료실 11", room: "어린이자료실", extra: "아동", startClass: "833.8", startBook: "히235ㅊ", endClass: "843.6", endBook: "빟99ㅎ" },
    {number:"12", floor:"1F" , shelf: "어린이자료실 12", room: "어린이자료실", extra: "아동", startClass: "843.6", startBook: "사11ㄱ", endClass: "910.999", endBook: "힣99ㅎ" },
    {number:"13", floor:"1F" , shelf: "어린이자료실 13", room: "어린이자료실", extra: "아동", startClass: "911", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },

    // 경북독서친구 및 기타 (어린이/유아)
    {number:"14",floor:"1F" , shelf: "14-경북독서친구", room: "어린이자료실", extra: "1학년", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"14",floor:"1F" , shelf: "14-경북독서친구", room: "어린이자료실", extra: "2학년", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"14",floor:"1F" , shelf: "14-경북독서친구", room: "어린이자료실", extra: "3학년", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"14",floor:"1F" , shelf: "14-경북독서친구", room: "어린이자료실", extra: "4학년", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"14",floor:"1F" , shelf: "14-경북독서친구", room: "어린이자료실", extra: "5학년", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"14",floor:"1F" , shelf: "14-경북독서친구", room: "어린이자료실", extra: "6학년", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"15",floor:"1F" , shelf: "15-어린이자료실 새로 온 책", room: "(신착)어린이자료실", extra: "아동", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"15",floor:"1F" , shelf: "15-유아자료실 새로온책", room: "(신착)유아자료실", extra: "아동", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"16",floor:"1F" , shelf: "16-다문화 도서", room: "어린이자료실", extra: "다문화", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"17",floor:"1F" , shelf: "17-그림책", room: "유아자료실", extra: "아동", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"17",floor:"1F" , shelf: "17-그림책", room: "유아자료실", extra: "그림책", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },

    // 종합자료실
    {number:"01" ,floor:"2F" , shelf: "종합자료실 1", room: "종합자료실", extra: "-", startClass: "100", startBook: "가11ㄱ", endClass: "199.999", endBook: "힣99ㅎ" },
    {number:"02" ,floor:"2F" , shelf: "종합자료실 2", room: "종합자료실", extra: "-", startClass: "200", startBook: "가11ㄱ", endClass: "327.855", endBook: "힣99ㅎ" },
    {number:"03" ,floor:"2F" , shelf: "종합자료실 3", room: "종합자료실", extra: "-", startClass: "327.856", startBook: "가11ㄱ", endClass: "453", endBook: "힣99ㅎ" },
    {number:"04" ,floor:"2F" , shelf: "종합자료실 4", room: "종합자료실", extra: "-", startClass: "453.1", startBook: "가11ㄱ", endClass: "599.999", endBook: "힣99ㅎ" },
    {number:"05" ,floor:"2F" , shelf: "종합자료실 5", room: "종합자료실", extra: "-", startClass: "600", startBook: "가11ㄱ", endClass: "699.999", endBook: "힣99ㅎ" },
    {number:"06" ,floor:"2F" , shelf: "종합자료실 6", room: "종합자료실", extra: "-", startClass: "700", startBook: "가11ㄱ", endClass: "813.6", endBook: "권99ㅎ" },
    {number:"07" ,floor:"2F" , shelf: "종합자료실 7", room: "종합자료실", extra: "-", startClass: "813.6", startBook: "궏11ㄱ", endClass: "813.7", endBook: "박59ㅎ" },
    {number:"08" ,floor:"2F" , shelf: "종합자료실 8", room: "종합자료실", extra: "-", startClass: "813.7", startBook: "박60ㄱ", endClass: "818", endBook: "긯99ㅎ" },
    {number:"09" ,floor:"2F" , shelf: "종합자료실 9", room: "종합자료실", extra: "-", startClass: "818", startBook: "기11ㄱ", endClass: "833.6", endBook: "앻99ㅎ" },
    {number:"10" ,floor:"2F" , shelf: "종합자료실 10", room: "종합자료실", extra: "-", startClass: "833.6", startBook: "야11ㄱ", endClass: "843.6", endBook: "헿99ㅎ" },
    {number:"11" ,floor:"2F" , shelf: "종합자료실 11", room: "종합자료실", extra: "-", startClass: "843.6", startBook: "혀11ㄱ", endClass: "911.054", endBook: "힣99ㅎ" },
    {number:"12" ,floor:"2F" , shelf: "종합자료실 12", room: "종합자료실", extra: "-", startClass: "911.055", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"13" ,floor:"2F" , shelf: "13-큰글자 도서", room: "종합자료실", extra: "큰글", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"14" ,floor:"2F" , shelf: "14-새로 온 책", room: "(신착)종합자료실", extra: "", startClass: "000", startBook: "가11ㄱ", endClass: "999.999", endBook: "힣99ㅎ" },
    {number:"15" ,floor:"2F" , shelf: "15-총류", room: "종합자료실", extra: "-", startClass: "000", startBook: "가11ㄱ", endClass: "099.999", endBook: "힣99ㅎ" },
    {number:"16",floor:"2F" , shelf: "계단서가", room: "종합자료실", extra: "지역작가", startClass: "000", startBook: "가11ㄱ", endClass: "099.999", endBook: "힣99ㅎ" }
];
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
