const facilityData = {
    "1F": {
        mapImage: "/resources/ict/typeE/info/img/facility/1F.svg",
        items: [
            {
                num: "Facility  1",
                title: "북카페 407",
                img: "",
                time: "이용시간: 화~일요일 09:00~22:00\n" +
                    "         (월요일 정기휴관)",
                desc: "독서와 휴식이 가능한 열린 공간"
            },
            {
                num: "Facility  2",
                title: "열람실",
                img: "",
                time: "이용시간: 화~일요일 09:00~22:00\n" +
                    "         (월요일 정기휴관)",
                desc: "학습과 독서를 위한 조용한 집중 공간"
            },
            {
                num: "Facility  3",
                title: "강의실1",
                img: "",
                time: "이용대상: 도서관 프로그램 참여자",
                desc: "도서관 주관 교육 프로그램 및 강연을 위한 공간"
            },
            {
                num: "Facility  4",
                title: "스마트도서관",
                img: "",
                time: "이용시간: 24시간 연중무휴",
                desc: "도서 대출·반납이 가능한 무인 자동화 시스템"
            },
            {
                num: "Facility  5",
                title: "도서반납함",
                img: "",
                time: "이용시간: 24시간 연중무휴",
                desc: "자료실 이용시간 외 자료 반납을 위한 전용함 비치"
            },
        ]
    },
    "2F": {
        mapImage: "/resources/ict/typeE/info/img/facility/2F.svg",
        items: [
            {
                num: "Facility  1",
                title: "어린이자료실",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "어린이를 위한 자료 서비스 공간"
            },
            {
                num: "Facility  2",
                title: "유아놀이방",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "영유아를 위한 독서 활동 공간"
            },
            {
                num: "Facility  3",
                title: "수유실",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "수유·기저귀 교환 등 유아 돌봄 전용 공간"
            },
            {
                num: "Facility  4",
                title: "VR체험실",
                img: "",
                time: "이용시간: 평일(화~금요일) 10:00~17:00\n" +
                    "         주말(토~일요일) 10:00~16:00",
                desc: "가상현실(VR) 콘텐츠를 즐길 수 있는 디지털 체험 공간"
            },
        ]
    },
    "3F": {
        mapImage: "/resources/ict/typeE/info/img/facility/3F.svg",
        items: [
            {
                num: "Facility  1",
                title: "일반자료실",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "청소년 및 성인을 위한 자료 서비스 공간"
            },
            {
                num: "Facility  2",
                title: "컴퓨터·인쇄/정기간행물",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "인터넷 검색 및 문서 작업이 가능한 정보 이용 공간\n" +
                    "· 원문검색/인쇄·복사·스캔 서비스 제공\n" +
                    "· 온라인 동영상 스트리밍 서비스(Wavveon) 제공\n" +
                    "· 신문·잡지 등 최신 정기간행물 열람 공간"
            },
        ]
    },
    "4F": {
        mapImage: "/resources/ict/typeE/info/img/facility/4F.svg",
        items: [
            {
                num: "Facility  1",
                title: "다목적실",
                img: "",
                time: "이용대상: 도서관 프로그램 참여자",
                desc: "강연·공연 등 다양한 활동을 진행할 수 있는 공간"
            },
            {
                num: "Facility  2",
                title: "강의실2",
                img: "",
                time: "이용대상: 도서관 프로그램 참여자",
                desc: "도서관 주관 교육 프로그램 및 강연을 위한 공간"
            },
            {
                num: "Facility  3",
                title: "스터디실",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: ""
            },
            {
                num: "Facility  4",
                title: "동아리실",
                img: "",
                time: "이용대상: 도서관 동아리 회원",
                desc: "독서·토론 등 동아리 활동을 위한 공간 "
            },
            {
                num: "Facility  5",
                title: "이야기정원",
                img: "",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "편안한 쉼과 힐링을 위한 실외 공간"
            },

        ]
    }
};

$(function () {
    const floors = ["1F", "2F", "3F", "4F"];
    const groupSize = 6;
    const AUTO_NEXT_DELAY = 8000;
    const AUTO_TAB_DELAY = 5000;

    let currentFloorIndex = 0;
    let nextTabTimer = null;

    const $tabs = $(".libFacilityTabItem");
    const $slide = $(".libFacilitySlide");
    const $dots = $(".libFacilitySlideDot");

    const clearTimer = () => {
        if (nextTabTimer) {
            clearTimeout(nextTabTimer);
            nextTabTimer = null;
        }
    };

    const goNextTab = () => {
        clearTimer();
        currentFloorIndex = (currentFloorIndex + 1) % floors.length;
        $tabs.removeClass("active").eq(currentFloorIndex).addClass("active");
        renderFacility(floors[currentFloorIndex]);
    };

    const updateMap = floor => {
        $(".libFacilityMapImage").attr("src", facilityData[floor].mapImage);
    };

    function renderFacility(floor) {
        clearTimer();
        currentFloorIndex = floors.indexOf(floor);

        const items = facilityData[floor].items;

        if ($slide.hasClass("slick-initialized")) {
            $slide.slick("unslick");
        }
        $slide.empty();

        for (let i = 0; i < items.length; i += groupSize) {
            $slide.append(
                `<div class="facilityGroupSlide">` +
                items.slice(i, i + groupSize).map((v, idx) => `
                    <div class="libFacilitySlideItem"
                         data-floor="${floor}"
                         data-index="${i + idx}">
                        <div class="libPlaceTitleNum">${v.num}</div>
                        <div class="libPlaceTitle">${v.title}</div>
                        <div class="libPlaceImage">
                            <img src="${v.img ? v.img : '/resources/ict/typeD/common/img/common/dummy.png'}">
                        </div>
                    </div>
                `).join("") +
                `</div>`
            );
        }

        const multi = items.length > groupSize;

        if (multi) {
            $slide.slick({
                dots: true,
                appendDots: $dots,
                arrows: true,
                infinite: false,
                autoplay: true,
                autoplaySpeed: AUTO_NEXT_DELAY,
                pauseOnFocus: false,
                pauseOnHover: false
            })
                .off("afterChange.autoTab")
                .on("afterChange.autoTab", (e, s, cur) => {
                    if (cur === s.$slides.length - 1) {
                        clearTimer();
                        nextTabTimer = setTimeout(goNextTab, AUTO_TAB_DELAY);
                    }
                });
        } else {
            nextTabTimer = setTimeout(goNextTab, AUTO_NEXT_DELAY + AUTO_TAB_DELAY);
        }

        updateMap(floor);
    }

    /* 탭 클릭 */
    $tabs.on("click", function () {
        clearTimer();
        const floor = $(this).text().trim();

        $tabs.removeClass("active");
        $(this).addClass("active");

        renderFacility(floor);
    });

    $("body").append(`
    <div class="libFacilityModalOverlay" style="display:none;">
        <div class="libFacilityModal">
            <div class="libFacilityHead">
                <div class="libFacilityNum"></div>
                <div class="libFacilityTit"></div>
            </div>
            <div class="libFacilityContent">
                <div class="libFacilityImage">
                    <img src="" alt="">
                </div>
                <ul class="libFacilityInfo"></ul>
                <div class="libFacilityDesc"></div>
            </div>
            <div class="close">닫기</div>
        </div>
    </div>
`);


    /* 슬라이드 아이템 클릭 → 모달 */
    $(document).on("click", ".libFacilitySlideItem", function () {
        const floor = $(this).data("floor");
        const index = $(this).data("index");
        const item = facilityData[floor].items[index];

        $(".libFacilityNum").text(item.num);
        $(".libFacilityTit").text(item.title);

        if (item.img) {
            $(".libFacilityImage img")
                .attr("src", item.img)
                .show();
        } else {
            $(".libFacilityImage img")
                .attr("src", "/resources/ict/typeD/common/img/common/dummy.png")
                .show();
        }

        const $info = $(".libFacilityInfo").empty();
        item.time.split("\n").forEach(t => {
            $info.append(`<li>${t.trim()}</li>`);
        });

        $(".libFacilityDesc").text(item.desc);

        $(".libFacilityModalOverlay").fadeIn();
        $slide.slick("slickPause");
    });

    $(document).on("click", ".libFacilityModalOverlay .close", function () {
        $(".libFacilityModalOverlay").fadeOut();
    });

    $(document).on("click", ".libFacilityModalOverlay", function (e) {
        if ($(e.target).is(".libFacilityModalOverlay")) {
            $(this).fadeOut();
        }
    });


    /* 초기 실행 */
    $tabs.eq(0).addClass("active");
    renderFacility("1F");
});
