$.ajax({
    url: 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=mTUxHmLUNKyKUBHLXufR151ng2cL%2FNjVt9pv5EEf6Y7f0nuysgoums4NDoEEO5Rjlf5%2BEIalMrDIdPMxDo7SPA%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EB%B6%81&ver=1.0',
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(data) {
        var dustStatus = data.response.body.items[0].pm10Grade1h;

        if (dustStatus == '1') {
            $('#dust_condi_txt').html('좋음');
        } else if (dustStatus == '2') {
            $('#dust_condi_txt').html('보통');
        } else if (dustStatus == '3') {
            $('#dust_condi_txt').html('나쁨');
        } else if (dustStatus == '4') {
            $('#dust_condi_txt').html('매우나쁨');
        }
    },
    error: function(data) {
        $('#dust_condi_txt').html('보통');
    }
});

$(document).ready(function () {
    var weathers = new Array('thunderstorm with light rain', 'thunderstorm with rain', 'thunderstorm with heavy rain', 'light thunderstorm', 'thunderstorm', 'heavy thunderstorm', 'ragged thunderstorm', 'thunderstorm with light drizzle', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle', 'light intensity drizzle', 'drizzle', 'heavy intensity drizzle', 'light intensity drizzle rain', 'drizzle rain', 'heavy intensity drizzle rain', 'shower rain and drizzle', 'heavy shower rain and drizzle', 'shower drizzle', 'light rain', 'moderate rain', 'heavy intensity rain', 'very heavy rain', 'extreme rain', 'freezing rain', 'light intensity shower rain', 'shower rain', 'heavy intensity shower rain', 'ragged shower rain', 'light snow', 'snow', 'heavy snow', 'sleet', 'light shower sleet', 'shower sleet', 'light rain and snow', 'rain and snow', 'light shower snow', 'shower snow', 'heavy shower snow', 'mist', 'smoke', 'haze', 'sand/dust whirls', 'fog', 'sand', 'dust', 'volcanic ash', 'squalls', 'tornado', 'clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'overcast clouds');

    var weatherskor = new Array('뇌우', '뇌우', '뇌우', '뇌우', '뇌우', '뇌우', '뇌우', '뇌우', '뇌우', '뇌우', '이슬비', '이슬비', '이슬비', '이슬비', '이슬비', '이슬비', '이슬비', '이슬비', '비 약간', '적당한 비', '비 많이', '비 많이', '폭우', '우박', '소나기 약간', '소나기', '폭우 수준의 소나기', '오락가락한 소나기', '눈 약간', '눈', '폭설', '진눈째비', '약간의 진눈깨비', '갑자기 진눈깨비', '약간의 비와 눈', '비와 눈', '갑자기 약간 눈', '갑자기 눈', '폭설', '안개', '연기', '안개', '모래/먼지 소용돌이', '모래', '모래', '먼지', '화산재', '토네이도', '토네이도', '맑음', '구름 약간', '약간 흐림', '흐림 구름', '많이 흐림');
    var i;

    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Gumi&appid=3bcf7eca7fc5d5df252135e43043a0a7&units=metric';

    const weatherIcons = {
        "01d": "/resources/ict/typeE/info/img/01d.png", // 맑음 (낮)
        "01n": "/resources/ict/typeE/info/img/01n.png", // 맑음 (밤)
        "02d": "/resources/ict/typeE/info/img/02d.png", // 구름 조금 (낮)
        "02n": "/resources/ict/typeE/info/img/02n.png", // 구름 조금 (밤)
        "03d": "/resources/ict/typeE/info/img/03d.png", // 구름 많음 (낮)
        "03n": "/resources/ict/typeE/info/img/03n.png", // 구름 많음 (밤)
        "04d": "/resources/ict/typeE/info/img/04d.png", // 구름 낀 (낮)
        "04n": "/resources/ict/typeE/info/img/04d.png", // 구름 낀 (밤)
        "09d": "/resources/ict/typeE/info/img/09d.png", // 소나기 (낮)
        "09n": "/resources/ict/typeE/info/img/09d.png", // 소나기 (밤)
        "10d": "/resources/ict/typeE/info/img/10d.png", // 비 (낮)
        "10n": "/resources/ict/typeE/info/img/10d.png", // 비 (밤)
        "11d": "/resources/ict/typeE/info/img/11d.png", // 뇌우 (낮)
        "11n": "/resources/ict/typeE/info/img/11d.png", // 뇌우 (밤)
        "13d": "/resources/ict/typeE/info/img/13d.png", // 눈 (낮)
        "13n": "/resources/ict/typeE/info/img/13d.png", // 눈 (밤)
        "50d": "/resources/ict/typeE/info/img/50d.png", // 안개 (낮)
        "50n": "/resources/ict/typeE/info/img/50d.png"  // 안개 (밤)
    };

    $.ajax({
        url: apiUrl,
        dataType: "json",
        type: "GET",
        success: function (data) {
            const currentTemp = parseFloat(data.list[0].main.temp.toFixed(1));
            const currentWeatherIcon = weatherIcons[data.list[0].weather[0].icon] || '/resources/ict/typeE/info/img/_03-n-10.png';

            for (i = 0; i < weathers.length; i++) {
                if (weathers[i] == data.list[0].weather[0].description) {
                    var currentCondition = weatherskor[i];
                }
            }

            $('#feels_like').html(parseFloat(data.list[0].main.feels_like.toFixed(1)) + '°');

            $('#current_temp').html(currentTemp + '˚');
            $('#current_condition').html('<img src="'+ currentWeatherIcon +'" alt="날씨 아이콘">');

            var forecastHtml = '';
            for (let i = 0; i < data.list.length; i += 8) {
                const forecastDate = new Date(data.list[i].dt * 1000);
                const forecastTemp = parseFloat(data.list[i].main.temp.toFixed(1));
                const forecastWeatherIcon = weatherIcons[data.list[i].weather[0].icon] || '/resources/ict/typeE/info/img/03n.png';

                forecastHtml +=
                    '<div class="lib_living_weather_list_item">' +
                    '<div class="lib_living_weather_list_date">' +
                    (forecastDate.getMonth() + 1) + '.' + forecastDate.getDate() + ' ' + ['일', '월', '화', '수', '목', '금', '토'][forecastDate.getDay()] +
                    '</div>' +
                    '<img src="'+forecastWeatherIcon+'"/>' +
                    '<div class="lib_living_weather_list_temperature">' + forecastTemp + '˚</div>' +
                    '</div>';
            }
            $('#forecast_frame').html(forecastHtml);
        },
        error: function (error) {
        }
    });
});

$(function() {
    const $dustTxt = $('#dustTxt');
    $.getJSON('https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=mTUxHmLUNKyKUBHLXufR151ng2cL%2FNjVt9pv5EEf6Y7f0nuysgoums4NDoEEO5Rjlf5%2BEIalMrDIdPMxDo7SPA%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EB%B6%81&ver=1.0')
        .done(data => {
            const grade = data.response?.body?.items?.[0]?.pm10Grade1h || '2';
            $dustTxt.html(['좋음','보통','나쁨','매우나쁨'][grade-1] || '보통');
        })
        .fail(() => $dustTxt.html('보통'));

    const weathers = ['thunderstorm with light rain','thunderstorm with rain','thunderstorm with heavy rain','light thunderstorm','thunderstorm','heavy thunderstorm','ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle','thunderstorm with heavy drizzle','light intensity drizzle','drizzle','heavy intensity drizzle','light intensity drizzle rain','drizzle rain','heavy intensity drizzle rain','shower rain and drizzle','heavy shower rain and drizzle','shower drizzle','light rain','moderate rain','heavy intensity rain','very heavy rain','extreme rain','freezing rain','light intensity shower rain','shower rain','heavy intensity shower rain','ragged shower rain','light snow','snow','heavy snow','sleet','light shower sleet','shower sleet','light rain and snow','rain and snow','light shower snow','shower snow','heavy shower snow','mist','smoke','haze','sand/dust whirls','fog','sand','dust','volcanic ash','squalls','tornado','clear sky','few clouds','scattered clouds','broken clouds','overcast clouds'];
    const weatherskor = ['뇌우','뇌우','뇌우','뇌우','뇌우','뇌우','뇌우','뇌우','뇌우','뇌우','이슬비','이슬비','이슬비','이슬비','이슬비','이슬비','이슬비','이슬비','비 약간','적당한 비','비 많이','비 많이','폭우','우박','소나기 약간','소나기','폭우 수준의 소나기','오락가락한 소나기','눈 약간','눈','폭설','진눈째비','약간의 진눈깨비','갑자기 진눈깨비','약간의 비와 눈','비와 눈','갑자기 약간 눈','갑자기 눈','폭설','안개','연기','안개','모래/먼지 소용돌이','모래','모래','먼지','화산재','토네이도','토네이도','맑음','구름 약간','약간 흐림','흐림 구름','많이 흐림'];

    const weatherIcons = {"01d":"/resources/ict/info/img/01d.png","01n":"/resources/ict/info/img/01n.png","02d":"/resources/ict/info/img/02d.png","02n":"/resources/ict/info/img/02n.png","03d":"/resources/ict/info/img/03d.png","03n":"/resources/ict/info/img/03n.png","04d":"/resources/ict/info/img/04d.png","04n":"/resources/ict/info/img/04n.png","09d":"/resources/ict/info/img/09d.png","09n":"/resources/ict/info/img/09d.png","10d":"/resources/ict/info/img/10d.png","10n":"/resources/ict/info/img/10d.png","11d":"/resources/ict/info/img/11d.png","11n":"/resources/ict/info/img/11d.png","13d":"/resources/ict/info/img/13d.png","13n":"/resources/ict/info/img/13d.png","50d":"/resources/ict/info/img/50d.png","50n":"/resources/ict/info/img/50d.png"};

    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Gumi&appid=3bcf7eca7fc5d5df252135e43043a0a7&units=metric';

    $.getJSON(apiUrl).done(data => {
        const $scheduleWrap = $('.scheduleWrap').empty();
        const list = data.list;
        const weatherList = [];

        for(let i=0;i<list.length;i+=8){
            const item = list[i];
            const date = new Date(item.dt*1000);
            const month = date.getMonth()+1;
            const day = date.getDate();
            const dayOfWeek = ['일','월','화','수','목','금','토'][date.getDay()];
            const temp = Math.round(item.main.temp)+'˚';
            const icon = weatherIcons[item.weather[0].icon] || "/resources/ict/info/img/03d.png";

            weatherList.push({image:icon,temp:temp,date:`${dayOfWeek} ${month}.${day<10?'0'+day:day}`});
            if(weatherList.length>=6) break;
        }

        weatherList.forEach(i=>$scheduleWrap.append(`<div class="scheduleItem"><div class="scheduleImage"><img src="${i.image}" alt="날씨 아이콘"></div><div class="scheduleTemp">${i.temp}</div><div class="scheduleDate">${i.date}</div></div>`));

        const current = list[0];
        const feels = Math.round(current.main.feels_like);
        const temp = Math.round(current.main.temp);
        const icon = weatherIcons[current.weather[0].icon] || "/resources/ict/info/img/03d.png";
        const condition = weatherskor[weathers.indexOf(current.weather[0].description)] || '정보 없음';

        $('.value').html(feels+'°');
        $('.temperature').html(temp+'˚');
        $('.weatherStatus').html(condition);
        $('.weatherRight').html(`<img class="lib_living_weather_icon" src="${icon}" alt="현재 날씨">`);
    }).fail(()=>$('.scheduleWrap').html('<div class="scheduleItem">날씨 정보를<br>불러올 수 없습니다.</div>'));



});


$(document).ready(function () {

    $('.newsList').slick({
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false,
        dots: false,
        verticalSwiping: true
    });

    function getRelativeTime(raw) {
        const date = new Date(raw);
        if (isNaN(date)) return raw;

        const now = new Date();
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 1000 / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffMin < 1) return "방금 전";
        if (diffMin < 60) return `${diffMin}분 전`;
        if (diffHour < 24) return `${diffHour}시간 전`;
        if (diffDay === 1) return "어제";
        if (diffDay < 7) return `${diffDay}일 전`;

        return date.toISOString().slice(0, 10);
    }

    $('.newsItemTime').each(function () {
        const raw = $(this).text().trim(); // 예: "Fri, 21 Nov 2025 10:22:58"
        if (raw) {
            $(this).text(getRelativeTime(raw));
        }
    });

    function updateDateTime() {
        const now = new Date();
        const formattedTime = now.toTimeString().slice(0, 5);
        const formattedDate =
            `${now.getFullYear()}. ${(now.getMonth() + 1)
                .toString()
                .padStart(2, "0")}. ${now.getDate()
                .toString()
                .padStart(2, "0")}. ${"일월화수목금토"[now.getDay()]}요일`;

        $(".newsTime").text(formattedTime);
        $(".newsDate").text(formattedDate);
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);
});
