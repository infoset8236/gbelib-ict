window.onload = function () {
    const canv = document.getElementById("gc");
    const ctx = canv.getContext("2d");

    // Canvas 내부 좌표계 크기 설정 (CSS 크기에 맞춤)
    const size = canv.clientWidth;
    canv.width = size;
    canv.height = size;

    const cx = size / 2;
    const cy = size / 2;

    // 바늘 길이 (중심에서 바깥쪽) & 안쪽 들어가는 길이(innerLength)
    const hourLength = size * 0.3;
    const minLength  = size * 0.4;
    const secLength  = size * 0.35;

    const hourInner = size * 0.1; // 시침 안쪽 길이
    const minInner  = size * 0.1; // 분침 안쪽 길이
    const secInner  = size * 0.1; // 초침 안쪽 길이

    function clock() {
        ctx.clearRect(0, 0, canv.width, canv.height);

        const now = new Date();
        const h = now.getHours() % 12;
        const m = now.getMinutes();
        const s = now.getSeconds();

        // 시침
        drawRotatedRect(cx, cy, hourLength, size * 0.015, (h/12 + m/720 + s/43200) * 360, "#fff", hourInner);
        // 분침
        drawRotatedRect(cx, cy, minLength, size * 0.015, (m/60 + s/3600) * 360, "#fff", minInner);
        // 초침
        drawRotatedRect(cx, cy, secLength, size * 0.005, (s/60) * 360, "#fff", secInner);
    }

    function drawRotatedRect(x, y, length, height, degrees, color, innerLength = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((degrees - 90) * Math.PI / 180);
        ctx.fillStyle = color;
        ctx.fillRect(-innerLength, -height/2, length + innerLength, height);
        ctx.restore();
    }

    clock();
    setInterval(clock, 1000);
}

$(document).ready(function () {
    function loadDustStatus() {
        const CACHE_KEY = "dust_gyeongbuk_v1";
        const TTL_MS = 5 * 60 * 1000; // 5분

        try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
            if (cached && (Date.now() - cached.ts) < TTL_MS && cached.text) {
                $('#dust_condi_txt').html(cached.text);
                return;
            }
        } catch (e) {}

        $.ajax({
            url: 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'
                + '?serviceKey=mTUxHmLUNKyKUBHLXufR151ng2cL%2FNjVt9pv5EEf6Y7f0nuysgoums4NDoEEO5Rjlf5%2BEIalMrDIdPMxDo7SPA%3D%3D'
                + '&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EB%B6%81&ver=1.0',
            dataType: "json",
            type: "GET",
            timeout: 4000,
            success: function (data) {
                const dustStatus = data?.response?.body?.items?.[0]?.pm10Grade1h;
                let text = "보통";
                if (dustStatus === '1') text = "좋음";
                else if (dustStatus === '2') text = "보통";
                else if (dustStatus === '3') text = "나쁨";
                else if (dustStatus === '4') text = "매우나쁨";

                $('#dust_condi_txt').html(text);

                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), text }));
                } catch (e) {}
            },
            error: function () {
                // 캐시라도 있으면 캐시값 사용, 없으면 기본값
                try {
                    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
                    if (cached?.text) return $('#dust_condi_txt').html(cached.text);
                } catch (e) {}
                $('#dust_condi_txt').html('보통');
            }
        });
    }

    function loadWeather() {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Daegu'
            + '&appid=3bcf7eca7fc5d5df252135e43043a0a7&units=metric&lang=kr';

        const weatherIcons = {
            "01d": "/resources/ict/typeE/media/img/weather/life/01d.png",
            "01n": "/resources/ict/typeE/media/img/weather/life/01n.png",
            "02d": "/resources/ict/typeE/media/img/weather/life/02d.png",
            "02n": "/resources/ict/typeE/media/img/weather/life/02n.png",
            "03d": "/resources/ict/typeE/media/img/weather/life/03d.png",
            "03n": "/resources/ict/typeE/media/img/weather/life/03d.png",
            "04d": "/resources/ict/typeE/media/img/weather/life/04d.png",
            "04n": "/resources/ict/typeE/media/img/weather/life/04d.png",
            "09d": "/resources/ict/typeE/media/img/weather/life/09d.png",
            "09n": "/resources/ict/typeE/media/img/weather/life/09d.png",
            "10d": "/resources/ict/typeE/media/img/weather/life/10d.png",
            "10n": "/resources/ict/typeE/media/img/weather/life/10n.png",
            "11d": "/resources/ict/typeE/media/img/weather/life/11d.png",
            "11n": "/resources/ict/typeE/media/img/weather/life/11n.png",
            "13d": "/resources/ict/typeE/media/img/weather/life/13d.png",
            "13n": "/resources/ict/typeE/media/img/weather/life/13n.png",
            "50d": "/resources/ict/typeE/media/img/weather/life/50d.png",
            "50n": "/resources/ict/typeE/media/img/weather/life/50n.png"
        };

        $.ajax({
            url: apiUrl,
            dataType: "json",
            type: "GET",
            success: function (data) {
                const currentTemp = parseFloat(data.list[0].main.temp.toFixed(1));
                const feelsLike = parseFloat(data.list[0].main.feels_like.toFixed(1));
                const humidity = data.list[0].main.humidity;
                const iconCode = data.list[0].weather[0].icon;
                const iconUrl = weatherIcons[iconCode] || '/resources/ict/typeE/media/img/weather/life/03n.png';
                const description = data.list[0].weather[0].description;

                $('#current_temp').html(currentTemp + '˚');
                $('#feels_like').html(feelsLike + '˚');
                $('#today_icon').attr('src', iconUrl);
                $('#current_condition').html(description);

                // 식중독 지수 계산
                let foodRisk = "안전";
                if (currentTemp >= 30) foodRisk = "매우 위험";
                else if (currentTemp >= 25) foodRisk = "주의";
                else if (currentTemp >= 20) foodRisk = "보통";
                else if (currentTemp >= 10) foodRisk = "낮음";

                if (humidity >= 80 && foodRisk !== "매우 위험") {
                    if (foodRisk === "주의") foodRisk = "매우 위험";
                    else if (foodRisk === "보통") foodRisk = "주의";
                    else if (foodRisk === "낮음") foodRisk = "보통";
                }
                $('#food_condi_txt').html(foodRisk);

                // 주간 예보
                var forecastHtml = '';
                let dayCount = 0;
                const today = new Date().getDate();
                let todayAdded = false;

                for (let i = 0; i < data.list.length; i++) {
                    const forecastDate = new Date(data.list[i].dt * 1000);
                    const forecastTemp = parseFloat(data.list[i].main.temp.toFixed(1));
                    const forecastIcon = weatherIcons[data.list[i].weather[0].icon]
                        || '/resources/ict/typeE/media/img/weather/life/03n.png';
                    const weekDay = ['일', '월', '화', '수', '목', '금', '토'][forecastDate.getDay()];
                    const dateStr = weekDay + ' '
                        + (forecastDate.getMonth() + 1).toString().padStart(2, '0')
                        + '.' + forecastDate.getDate().toString().padStart(2, '0');

                    // 오늘 데이터: 정오가 없으면 가장 첫 번째(현재 이후) 데이터로 대체
                    if (forecastDate.getDate() === today && !todayAdded) {
                        forecastHtml += `
                            <div class="weeklyItem">
                                <img src="${forecastIcon}" alt="">
                                <div class="weeklyInfo">
                                    <div>${dateStr}</div>
                                    <div>${forecastTemp}˚</div>
                                </div>
                            </div>
                        `;
                        todayAdded = true;
                        dayCount++;
                        continue;
                    }

                    // 내일부터는 정오 데이터만 선택
                    if (forecastDate.getHours() === 12 && forecastDate.getDate() !== today) {
                        forecastHtml += `
                            <div class="weeklyItem">
                                <img src="${forecastIcon}" alt="">
                                <div class="weeklyInfo">
                                    <div>${dateStr}</div>
                                    <div>${forecastTemp}˚</div>
                                </div>
                            </div>
                        `;
                        dayCount++;
                    }

                    if (dayCount >= 6) break; // 오늘 포함 총 6개
                }

                $('#forecast_frame').html(forecastHtml);
            }
        });
    }

    loadDustStatus()
    loadWeather();

})