const facilityData = {
    "1F": {
        mapImage: "/resources/ict/typeE/info/img/facility/1F.svg",
        items: [
            {
                title: "1. 북카페 407",
                time: "이용시간: 화~일요일 09:00~22:00\n" +
                    "         (월요일 정기휴관)",
                desc: "독서와 휴식이 가능한 열린 공간"
            },
            {
                title: "2. 열람실",
                time: "이용시간: 화~일요일 09:00~22:00\n" +
                    "         (월요일 정기휴관)",
                desc: "학습과 독서를 위한 조용한 집중 공간"
            },
            {
                title: "3. 강의실1",
                time: "이용대상: 도서관 프로그램 참여자",
                desc: "도서관 주관 교육 프로그램 및 강연을 위한 공간"
            },
            {
                title: "4. 스마트도서관",
                time: "이용시간: 24시간 연중무휴",
                desc: "도서 대출·반납이 가능한 무인 자동화 시스템"
            },
            {
                title: "5. 도서반납함",
                time: "이용시간: 24시간 연중무휴",
                desc: "자료실 이용시간 외 자료 반납을 위한 전용함 비치"
            },
        ]
    },
    "2F": {
        mapImage: "/resources/ict/typeE/info/img/facility/2F.svg",
        items: [
            {
                title: "1. 어린이자료실",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "어린이를 위한 자료 서비스 공간"
            },
            {
                title: "2. 유아놀이방",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "영유아를 위한 독서 활동 공간"
            },
            {
                title: "3. 수유실",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "수유·기저귀 교환 등 유아 돌봄 전용 공간"
            },
            {
                title: "4. VR체험실",
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
                title: "1. 일반자료실",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "청소년 및 성인을 위한 자료 서비스 공간"
            },
            {
                title: "2. 컴퓨터·인쇄/정기간행물",
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
                title: "1. 다목적실",
                time: "이용대상: 도서관 프로그램 참여자",
                desc: "강연·공연 등 다양한 활동을 진행할 수 있는 공간"
            },
            {
                title: "2. 강의실2",
                time: "이용대상: 도서관 프로그램 참여자",
                desc: "도서관 주관 교육 프로그램 및 강연을 위한 공간"
            },
            {
                title: "3. 스터디실",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: ""
            },
            {
                title: "4. 동아리실",
                time: "이용대상: 도서관 동아리 회원",
                desc: "독서·토론 등 동아리 활동을 위한 공간 "
            },
            {
                title: "5. 이야기정원",
                time: "이용시간: 평일(화~금요일) 09:00~18:00\n" +
                    "         주말(토~일요일) 09:00~17:00",
                desc: "편안한 쉼과 힐링을 위한 실외 공간"
            },

        ]
    }
};


$(document).ready(function () {
    const floorKeys = Object.keys(facilityData);
    let floorIndex = 0;
    let isAuto = false;

    const $tabs  = $(".libFacilityTabItem");
    const $img   = $(".libFacilityMapImage");
    const $slide = $(".libFacilitySlide");

    function unslick() {
        $slide.hasClass("slick-initialized") && $slide.slick("unslick");
    }

    function changeMapImage(src) {
        $img.removeClass("is-show");
        setTimeout(() => {
            const img = new Image();
            img.onload = () => {
                $img.attr("src", src).addClass("is-show");
            };
            img.src = src;
        }, 200);
    }

    function render(floorKey) {
        const { mapImage, items } = facilityData[floorKey];

        unslick();
        changeMapImage(mapImage);
        $slide.empty();

        items.forEach(({ title, time, desc }) => {
            const listItems = time.split("\n").map(t => `<li>${t}</li>`).join("");
            $slide.append(`
        <div class="libFacilitySlideItem">
          <div class="libPlaceTitle">${title}</div>
          <div class="libPlaceWrapper">
            <ul class="libPlaceList">${listItems}</ul>
          </div>
          <div class="libFacilityDesc">${desc}</div>
        </div>
      `);
        });

        $slide.slick({
            arrows: false,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 8000,
            infinite: false,
            dots: true,
            appendDots: $(".libFacilitySlideDot"),
            customPaging: () => '<button type="button"></button>'
        });
    }

    function setActiveTab(key) {
        $tabs.removeClass("active").filter(`:contains(${key})`).addClass("active");
    }

    $slide.on("afterChange", (e, slick, currentSlide) => {
        if (isAuto || currentSlide !== slick.slideCount - 1) return;

        isAuto = true;
        setTimeout(() => {
            unslick();
            floorIndex = (floorIndex + 1) % floorKeys.length;
            const nextKey = floorKeys[floorIndex];
            setActiveTab(nextKey);
            render(nextKey);
            isAuto = false;
        }, 1000);
    });

    $tabs.on("click", function () {
        const key = $(this).text().trim();
        floorIndex = floorKeys.indexOf(key);
        setActiveTab(key);
        isAuto = true;
        render(key);
        setTimeout(() => isAuto = false, 500);
    });

    setActiveTab("1F");
    render("1F");
});
