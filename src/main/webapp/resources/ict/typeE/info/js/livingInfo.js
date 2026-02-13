$(document).ready(function () {

    const $weatherStatus = $('.weatherStatus');
    const $weatherIcon = $('#current_condition, .weatherRight');
    const $weatherTemp = $('#current_temp, .temperature');
    const $feelsLike = $('#feels_like, .value');
    const $forecastFrame = $('#forecast_frame');
    const $scheduleWrap = $('.scheduleWrap');

    const defaultIcon = "/resources/ict/typeE/info/img/03d.png";

    $weatherStatus.text('약간 흐림');
    $weatherTemp.text('12˚');
    $feelsLike.text('00°');
    $weatherIcon.html(`<img src="${defaultIcon}" alt="날씨 아이콘">`);

    let skeletonForecast = '';
    for (let i = 0; i < 5; i++) {
        skeletonForecast += `
            <div class="lib_living_weather_list_item skeleton">
                <div class="lib_living_weather_list_date">00.00 0</div>
                <img src="${defaultIcon}">
                <div class="lib_living_weather_list_temperature">00˚</div>
            </div>
        `;
    }
    $forecastFrame.html(skeletonForecast);

    if ($scheduleWrap.length) {
        $scheduleWrap.empty();
        for (let i = 0; i < 6; i++) {
            $scheduleWrap.append(`
                <div class="scheduleItem skeleton">
                    <div class="scheduleImage"><img src="${defaultIcon}"></div>
                    <div class="scheduleTemp">00˚</div>
                    <div class="scheduleDate">00 00.00</div>
                </div>
            `);
        }
    }

    const weatherIcons = {
        "01d": "/resources/ict/typeE/info/img/01d.png",
        "01n": "/resources/ict/typeE/info/img/01n.png",
        "02d": "/resources/ict/typeE/info/img/02d.png",
        "02n": "/resources/ict/typeE/info/img/02n.png",
        "03d": "/resources/ict/typeE/info/img/03d.png",
        "03n": "/resources/ict/typeE/info/img/03d.png",
        "04d": "/resources/ict/typeE/info/img/04d.png",
        "04n": "/resources/ict/typeE/info/img/04d.png",
        "09d": "/resources/ict/typeE/info/img/09d.png",
        "09n": "/resources/ict/typeE/info/img/09d.png",
        "10d": "/resources/ict/typeE/info/img/10d.png",
        "10n": "/resources/ict/typeE/info/img/10d.png",
        "11d": "/resources/ict/typeE/info/img/11d.png",
        "11n": "/resources/ict/typeE/info/img/11d.png",
        "13d": "/resources/ict/typeE/info/img/13d.png",
        "13n": "/resources/ict/typeE/info/img/13d.png",
        "50d": "/resources/ict/typeE/info/img/50d.png",
        "50n": "/resources/ict/typeE/info/img/50d.png"
    };

    const descMap = {
        'thunderstorm': '뇌우',
        'drizzle': '이슬비',
        'rain': '비',
        'snow': '눈',
        'mist': '안개',
        'smoke': '연기',
        'haze': '안개',
        'fog': '안개',
        'sand': '모래',
        'dust': '먼지',
        'clear sky': '맑음',
        'few clouds': '구름 약간',
        'scattered clouds': '약간 흐림',
        'broken clouds': '흐림',
        'overcast clouds': '많이 흐림'
    };

    function translate(desc) {
        return descMap[desc] || '날씨 정보';
    }

    const apiUrl =
        'https://api.openweathermap.org/data/2.5/forecast?q=Gumi&appid=3bcf7eca7fc5d5df252135e43043a0a7&units=metric';

    $.getJSON(apiUrl)
        .done(data => {
            const list = data.list;
            const cur = list[0];

            const temp = Math.round(cur.main.temp);
            const feels = Math.round(cur.main.feels_like);
            const icon = weatherIcons[cur.weather[0].icon] || defaultIcon;
            const condition = translate(cur.weather[0].description);

            $weatherTemp.text(temp + '˚');
            $feelsLike.text(feels + '°');
            $weatherStatus.text(condition);
            $weatherIcon.html(`<img src="${icon}" alt="날씨 아이콘">`);

            let forecastHtml = '';
            $scheduleWrap.empty();

            for (let i = 0; i < list.length; i += 8) {
                const item = list[i];
                const d = new Date(item.dt * 1000);
                const icon = weatherIcons[item.weather[0].icon] || defaultIcon;
                const temp = Math.round(item.main.temp) + '˚';

                forecastHtml += `
                    <div class="lib_living_weather_list_item">
                        <div class="lib_living_weather_list_date">
                            ${d.getMonth()+1}.${d.getDate()} ${'일월화수목금토'[d.getDay()]}
                        </div>
                        <img src="${icon}">
                        <div class="lib_living_weather_list_temperature">${temp}</div>
                    </div>
                `;

                if ($scheduleWrap.length && $scheduleWrap.children().length < 6) {
                    $scheduleWrap.append(`
                        <div class="scheduleItem">
                            <div class="scheduleImage"><img src="${icon}"></div>
                            <div class="scheduleTemp">${temp}</div>
                            <div class="scheduleDate">${'일월화수목금토'[d.getDay()]} ${d.getMonth()+1}.${String(d.getDate()).padStart(2,'0')}</div>
                        </div>
                    `);
                }
            }

            $forecastFrame.html(forecastHtml);
        })
        .fail(() => {
            $weatherStatus.text('정보 없음');
            $weatherTemp.text('00˚');
            $feelsLike.text('00°');
            $weatherIcon.html(`<img src="${defaultIcon}">`);
        });

    /* ===============================
       3. 뉴스 / 시간
    =============================== */
    $('.newsList').slick({
        vertical: true,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false,
        dots: false,
        verticalSwiping: true
    });

    function getRelativeTime(raw) {
        const date = new Date(raw);
        if (isNaN(date)) return raw;

        const diff = (Date.now() - date) / 60000;
        if (diff < 1) return '방금 전';
        if (diff < 60) return Math.floor(diff) + '분 전';
        if (diff < 1440) return Math.floor(diff / 60) + '시간 전';
        if (diff < 2880) return '어제';
        return Math.floor(diff / 1440) + '일 전';
    }

    $('.newsItemTime').each(function () {
        $(this).text(getRelativeTime($(this).text().trim()));
    });

    function updateDateTime() {
        const now = new Date();
        $('.newsTime').text(now.toTimeString().slice(0,5));
        $('.newsDate').text(
            `${now.getFullYear()}. ${String(now.getMonth()+1).padStart(2,'0')}. ${String(now.getDate()).padStart(2,'0')}. ${'일월화수목금토'[now.getDay()]}요일`
        );
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);
});
