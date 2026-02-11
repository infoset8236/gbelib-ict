<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/common/css/reset.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/common/css/font.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/smart/css/common.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/common/css/header.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/common/css/navigation.css">
    <link rel="stylesheet" href="/resources/ict/typeE/common/css/slick.css"/>
    <link rel="stylesheet" href="/resources/ict/typeE/common/css/slick-theme.css"/>
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/ai/css/result.css">
    <script src="/resources/ict/typeE/common/plugin/jquery-3.7.1.min.js"></script>
    <script src="/resources/ict/typeE/common/plugin/slick.min.js"></script>
    <script src="/resources/ict/typeE/common/js/keyPadController.js?v=1.2"></script>
    <script src="/resources/ict/typeE/common/js/common.js?v=1.2"></script>
    <script src="/resources/ict/typeE/smart/js/bf.js"></script>
    <script src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
    <script src="/resources/ict/typeE/ai/js/result.js"></script>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div class="dim">
    <div class="container" tabindex="0">
        <div class="scrollDownArea">
            <div class="content">
                <div class="header" tabindex="0">AI안내</div>
                <p class="commend" tabindex="0">“검색어”</p>
<%--                <div>--%>
<%--                    <div class="empty" tabindex="0">--%>
<%--                        앗, 찾으시는 결과가 지금은 없어요.<br>--%>
<%--                        다른 검색어로 찾아볼까요?--%>
<%--                    </div>--%>
<%--                    <div tabindex="0" class="caption">이렇게 질문을 해보세요</div>--%>
<%--                    <ul class="example">--%>
<%--                        <li class="key"><div tabindex="0" class="key">아이와 같이 책을 볼 수 있는 공간이 어디 있을까?</div><button tabindex="0"></button></li>--%>
<%--                        <li class="key"><div tabindex="0" class="key">도서관에 책 읽을 수 있는 카페나 휴게공간이 있어?</div><button tabindex="0"></button></li>--%>
<%--                        <li class="key"><div tabindex="0" class="key">역사와 관련된 책을 찾으려면 어디로 가야 해?</div><button tabindex="0"></button></li>--%>
<%--                        <li class="key"><div tabindex="0" class="key">책을 예약하거나 연장하려면 어떻게 해야 해?</div><button tabindex="0"></button></li>--%>
<%--                        <li class="key"><div tabindex="0" class="key">세계사 책을 빌리려면 어떤 서가를 찾아야 하지?</div><button tabindex="0"></button></li>--%>
<%--                        <li class="key"><div tabindex="0" class="key">조용히 공부할 수 있는 공간은 어디에 있을까?</div><button tabindex="0"></button></li>--%>
<%--                    </ul>--%>
<%--                </div>--%>

                <div>
                    <div class="tabMenu">
                        <div id="tabBook" tabindex="0" class="tabBook key active">도서</div>
                        <div id="tabInfo" tabindex="0" class="tabInfo key">이용안내</div>
                    </div>
                    <div id="contentBook" class="tabContent">
                        <div class="tabScrollArea">
                            <div class="book">
                                <div class="bookImage">
                                    <img tabindex="0" src="/resources/ict/typeE/common/img/common/dummy.png" alt="">
                                </div>
                                <div class="bookMeta">
                                    <div tabindex="0">책이름</div>
                                    <div tabindex="0">저자명 | 출판사</div>
                                    <div class="actions">
                                        <button class="location" tabindex="0">
                                            서가배치도
                                        </button>
                                        <a href="/yc/ict/smartBook/detail.do" tabindex="0">상세정보</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="contentInfo" class="tabContent" style="display:none;">
                        <div class="tabScrollArea">
                            <div class="value" tabindex="0">
                                유아·어린이자료실이 있습니다. 이 자료실은 유아 및 어린이 대상의 전 주제 분야의 도서를 소장하고 있으며, 북큐레이션, 독서퀴즈 등의 서비스를 제공합니다.<br>
                                위치는 3층이며, 이용 시간은 평일 09:00∼18:00, 주말 09:00∼17:00입니다. 이용 문의 ☎ 231-2059∼60
                            </div>
                        </div>
                    </div>
                </div>

                <label for="search" class="searchArea">
                    <input class="key" tabindex="0" type="text" id="search" aria-label="검색어를 입력해주세요." placeholder="검색어를 입력해주세요.">
                    <button class="cancel" tabindex="0"></button>
                    <button class="submit" id="searchBtn" tabindex="0" aria-label="검색"></button>
                </label>
            </div>
            <jsp:include page="/WEB-INF/views/app/ict/typeE/smartBook/nav.jsp"/>
        </div>
    </div>
    <div id="popup" class="popup">
        <div class="popupContent">
            <img class="mapImage" src="/resources/ict/typeE/common/img/common/dummy.png" alt="">
            <div class="popupDetails">
                <div class="popupDetailsMeta">
                    <div class="metaInfoWrap">
                        <div class="metaBasic">
                            <div>도서명&nbsp;&nbsp;&nbsp;&nbsp;<span>도서명</span></div>
                            <div>소장위치<span>일반자료실</span></div>
                            <div>청구기호<span>813.8이560</span></div>
                        </div>
                        <div class="metaShelf">
                            <div class="metaShelfLabel">서가번호</div>
                            <div class="metaShelfNum">
                                <div class="metaFloor">2층</div>
                                <div class="metaSection">13</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnWrapper">
                <button class="close" tabindex="0">닫기</button>
                <button class="print" tabindex="0">인쇄</button>
            </div>
        </div>
    </div>

    <div class="robotPopup">
        <div class="robotPopupContent">
            <div>AI 로봇이 오고있어요.</div>
            <div>만약 로봇이 5분 내로 오지 않는다면<br>서가배치도를 확인해서 책이 있는 장소를 찾아보세요!</div>
            <div class="timer">05:00</div>
            <img src="/resources/ict/typeE/common/img/common/dummy.png" alt="">
            <button class="closeRobotPopup" tabindex="0">닫기</button>
        </div>
    </div>

    <div class="scrollUp">
        <img src="/resources/ict/typeE/common/img/common/scrollUp.svg" alt="">
    </div>
</div>
</body>
</html>
