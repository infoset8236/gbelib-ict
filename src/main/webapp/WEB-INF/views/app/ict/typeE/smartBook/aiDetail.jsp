<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/resources/ict/common/css/reset.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/common/css/font.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/smart/css/common.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/common/css/header.css">
    <link rel="stylesheet" type="text/css" href="/resources/ict/common/css/navigation.css">
    <link rel="stylesheet" href="/resources/ict/common/css/slick.css"/>
    <link rel="stylesheet" href="/resources/ict/common/css/slick-theme.css"/>
    <link rel="stylesheet" type="text/css" href="/resources/ict/typeE/ai/css/detail.css">
    <script src="/resources/ict/common/plugin/jquery-3.7.1.min.js"></script>
    <script src="/resources/ict/common/plugin/slick.min.js"></script>
    <script src="/resources/ict/common/js/keyPadController.js?v=1.2"></script>
    <script src="/resources/ict/common/js/common.js?v=1.2"></script>
    <script src="/resources/ict/typeE/smart/js/bf.js"></script>
    <script src="/resources/ict/typeE/ai/js/detail.js"></script>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script>
        $(function (){
            if (typeof keyPadController !== "undefined" && keyPadController) {
                bodyOpen()
            }
        })
    </script>
</head>
<body>
<div class="dim">
    <div class="container" tabindex="0">
        <div class="scrollDownArea">
            <div class="content">
                <div class="header" tabindex="0">AI안내</div>

                <div class="bookInformationBox">
                    <div class="bookImage">
                        <%-- <div class="status0">대출불가</div>--%>
                        <div class="status1" tabindex="0">대출가능</div>
                        <img src="${book.image}" alt="">
                    </div>

                    <div class="bookDetailBox">
                        <div class="bookTitle">
                            <div tabindex="0">${book.title}</div>
                            <div tabindex="0">${book.author}<span></span>${book.publish_year}</div>
                        </div>

                        <div class="bookMeta" >
                            <div tabindex="0"><span>출판사</span>${book.publisher}</div>
                            <div tabindex="0"><span>소장도서관</span>${book.lib_name}</div>
                            <div tabindex="0"><span>서가위치</span>${book.location}</div>
                            <div tabindex="0"><span>등록번호</span>${book.isbn13}</div>
                            <div tabindex="0"><span>청구기호</span>${book.call_no}</div>
                        </div>
                    </div>
                </div>

                <div class="recommendBox">
                    <div tabindex="0">AI 추천이유</div>
                    <div tabindex="0">
                        ${book.description}
                    </div>
                </div>
            </div>
            <div class="back" onclick="history.back();"></div>
            <jsp:include page="/WEB-INF/views/app/ict/typeE/smartBook/nav.jsp"/>
        </div>
    </div>
    <div class="scrollUp">
        <img src="/resources/ict/common/img/common/scrollUp.svg" alt="">
    </div>
</div>
</body>
</html>
