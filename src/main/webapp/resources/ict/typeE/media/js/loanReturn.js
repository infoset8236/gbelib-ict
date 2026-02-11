window.addEventListener("load", function () {

    document.querySelectorAll(".rtnContainer").forEach(container => {

        /* ======================
           1. 아날로그 시계 (반응형)
        ====================== */
        const canv = container.querySelector("#gc");
        if (canv) {
            const ctx = canv.getContext("2d");
            let size, cx, cy;
            let hourLength, minLength, secLength;
            let hourInner, minInner, secInner;

            function resizeCanvas() {
                size = canv.clientWidth;
                canv.width = size;
                canv.height = size;

                cx = size / 2;
                cy = size / 2;

                hourLength = size * 0.3;
                minLength  = size * 0.4;
                secLength  = size * 0.35;

                hourInner = size * 0.1;
                minInner  = size * 0.1;
                secInner  = size * 0.1;
            }

            function drawRotatedRect(x, y, length, height, degrees, color, innerLength = 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((degrees - 90) * Math.PI / 180);
                ctx.fillStyle = color;
                ctx.fillRect(-innerLength, -height / 2, length + innerLength, height);
                ctx.restore();
            }

            function clock() {
                ctx.clearRect(0, 0, canv.width, canv.height);

                const now = new Date();
                const h = now.getHours() % 12;
                const m = now.getMinutes();
                const s = now.getSeconds();

                drawRotatedRect(cx, cy, hourLength, size * 0.015,
                        (h / 12 + m / 720 + s / 43200) * 360, "#fff", hourInner);

                drawRotatedRect(cx, cy, minLength, size * 0.015,
                        (m / 60 + s / 3600) * 360, "#fff", minInner);

                drawRotatedRect(cx, cy, secLength, size * 0.005,
                        (s / 60) * 360, "#fff", secInner);
            }

            resizeCanvas();
            clock();

            setInterval(clock, 1000);
            window.addEventListener("resize", () => {
                resizeCanvas();
                clock();
            });
        }

        /* ======================
           2. 날짜 / 시간 텍스트
        ====================== */
        const today = new Date();
        const returnDate = new Date();
        returnDate.setDate(today.getDate() + 14);

        const days = ["일","월","화","수","목","금","토"];

        const monthText = String(today.getMonth() + 1).padStart(2, "0");
        const dayText   = String(today.getDate()).padStart(2, "0");

        const rtnDateTxt = container.querySelector(".rtnDateTxt");
        if (rtnDateTxt) {
            rtnDateTxt.textContent =
                    today.getFullYear() + "년 "
                    + monthText + "월 "
                    + dayText + "일(" + days[today.getDay()] + ")";
        }

        /* ======================
           3. 현재 시간
        ====================== */
        const rtnTime = container.querySelector(".rtnTime");

        function updateTime() {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, "0");
            const mm = String(now.getMinutes()).padStart(2, "0");

            if (rtnTime) rtnTime.textContent = hh + ":" + mm;
        }

        updateTime();
        setInterval(updateTime, 1000);

        /* ======================
           4. 대출일 / 반납일
        ====================== */
        // const lendMon = container.querySelector(".rtnDateLend .dateMon .dateNum");
        // const lendDay = container.querySelector(".rtnDateLend .dateD .dateNum");
        //
        // if (lendMon) lendMon.textContent = monthText;
        // if (lendDay) lendDay.textContent = dayText;

        // const returnMonText = String(returnDate.getMonth() + 1).padStart(2, "0");
        // const returnDayText = String(returnDate.getDate()).padStart(2, "0");

        // const returnMon = container.querySelector(".rtnDateReturn .dateMon .dateNum");
        // const returnDay = container.querySelector(".rtnDateReturn .dateD .dateNum");
        //
        // if (returnMon) returnMon.textContent = returnMonText;
        // if (returnDay) returnDay.textContent = returnDayText;

    });
});
