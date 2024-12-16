document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar-container");
    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modal-details");
    const modalClose = document.getElementById("modal-close");
    const yearSelect = document.getElementById("year");
    const monthSelect = document.getElementById("month");
    const totalExpenditureDisplay = document.getElementById("total-expenditure");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");

    // 示例数据
    const expensesData = {
        "2024-11-04": [
            {
                shop: "叮咚", items: [
                    { "name": "香葱 约50g", "price": 1.51 },
                    { "name": "香菜 约100g", "price": 3.50 },
                    { "name": "小米椒 约75g", "price": 2.08 },
                    { "name": "黄瓜 约600g", "price": 3.59 },
                    { "name": "怡宝纯净水 6L/桶（1桶）", "price": 8.47 }
                ]
            }
        ],
        "2024-11-05": [
            {
                shop: "叮咚", items: [
                    { "name": "怡宝纯净水 6L/桶（1桶）", "price": 8.39 },
                    { "name": "三红胡萝卜 约600g", "price": 3.19 },
                    { "name": "土豆（黄心）约1kg", "price": 4.90 }
                ]
            }
        ],
        "2024-11-06": [
            {
                shop: "叮咚", items: [
                    { "name": "三红胡萝卜 约600g", "price": 0.00 },
                    { "name": "21°蜜红薯 750g/份（2份）", "price": 14.47 },
                    { "name": "娃哈哈纯净水 5.5L/桶（4桶）", "price": 21.56 },
                    { "name": "土豆（黄心）约600g", "price": 3.02 }
                ]
            }
        ],
        "2024-11-07": [
            {
                shop: "叮咚", items: [
                    { "name": "土豆（黄心）约600g", "price": 0.00 },
                    { "name": "黑钻世家黑猪火腿午餐肉 198g/罐", "price": 16.90 },
                    { "name": "娃哈哈纯净水 5.5L/桶", "price": 23.80 }
                ]
            }
        ],
        "2024-11-13": [
            { shop: "叮咚", items: [{ "name": "娃哈哈纯净水 5.5L*4桶/组", "price": 27.28 }] }
        ],
        "2024-11-16": [
            {
                shop: "叮咚", items: [
                    { "name": "三红胡萝卜 约600g", "price": 2.53 },
                    { "name": "红洋葱 约750g", "price": 2.95 },
                    { "name": "进口香蕉 约650g", "price": 11.56 }
                ]
            }
        ],
        "2024-11-19": [
            {
                shop: "叮咚", items: [
                    { "name": "云蕾一次性保鲜罩 25只", "price": 0.00 },
                    { "name": "进口香蕉 约650g", "price": 7.46 },
                    { "name": "卫龙魔芋爽(香辣味) 50g/袋", "price": 3.63 },
                    { "name": "怡宝纯净水 6L/桶（2桶）", "price": 16.62 },
                    { "name": "娃哈哈纯净水 5.5L/桶（2桶）", "price": 14.77 }
                ]
            }
        ],
        "2024-11-26": [
            {
                shop: "叮咚", items: [
                    { "name": "云蕾竹棒棉签 100支装", "price": 0.00 },
                    { "name": "黑钻世家川藏特色黑猪肉糜(3.7)约", "price": 10.93 },
                    { "name": "黑钻世家冷鲜川藏特色黑猪肉丝", "price": 10.26 },
                    { "name": "冷鲜汤骨 300g", "price": 10.32 },
                    { "name": "有机黑猪冷鲜通脊 200g", "price": 14.89 },
                    { "name": "康师傅红烧牛肉面 113g/桶", "price": 4.94 },
                    { "name": "认养一头牛有机纯牛奶 200mL*16盒/箱", "price": 36.61 },
                    { "name": "怡宝纯净水 6L/桶（2桶）", "price": 11.65 }
                ]
            }
        ],
        "2024-11-27": [
            { shop: "叮咚", items: [{ "name": "娃哈哈纯净水 5.5L*4桶/组", "price": 25.90 }] }
        ],
        "2024-11-29": [
            { shop: "叮咚", items: [{ name: "螺丝椒 约300g", price: 6.89 }] }
        ],
        "2024-12-10": [
            {
                shop: "叮咚", items: [
                    { "name": "土豆（黄心）约1kg", "price": 4.10 },
                    { "name": "泰森冷鲜鸡大胸 400g", "price": 8.99 },
                    { "name": "进口香蕉 约650g", "price": 6.84 },
                    { "name": "怡宝纯净水 6L/桶", "price": 7.68 },
                    { "name": "螺丝椒 约300g", "price": 7.17 },
                    { "name": "泰森冷冻鸡琵琶腿 500g", "price": 10.10 },
                    { "name": "泰森冷冻鸡爪 500g", "price": 22.18 },
                    { "name": "湘佳鸡小腿 430g", "price": 20.13 },
                    { "name": "娃哈哈纯净水 5.5L/桶", "price": 6.76 },
                    { "name": "娃哈哈纯净水 5.5L*4桶/组", "price": 25.61 }
                ]
            }
        ],
        "2024-12-12": [
            {
                shop: "叮咚", items: [
                    { "name": "哈尔滨风味红肠 50g", "price": 0 },
                    { "name": "有机黑鸡土鸡蛋15枚675g", "price": 14.77 },
                    { "name": "茄子（精选）约800g", "price": 6.54 },
                    { "name": "螺丝椒 约300g", "price": 3.34 },
                    { "name": "怡宝纯净水 6L", "price": 7.13 }
                ]
            }
        ]
    };

    // 计算每条消费记录的总金额（每项消费的金额为商品价格之和）
    function calculateAmounts() {
        for (const date in expensesData) {
            expensesData[date].forEach(record => {
                // 计算每项消费的金额
                record.totalAmount = parseFloat(record.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)); // 保留两位小数
            });
        }
    }

    // 调用calculateAmounts函数来计算每条消费记录的总金额
    calculateAmounts();

    // 关闭弹窗函数
    const closeModal = function () {
        modal.style.display = "none";
    };

    // 点击弹窗关闭按钮
    modalClose.onclick = function () {
        closeModal();
    };

    // 点击窗口外部区域时也关闭窗口
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 计算指定年份的总消费
    function calculateTotalExpenditure() {
        const selectedYear = parseInt(yearSelect.value);
        let total = 0;

        Object.keys(expensesData).forEach(date => {
            if (date.startsWith(selectedYear.toString())) {
                expensesData[date].forEach(entry => {
                    total += entry.totalAmount;  // 使用 totalAmount 而不是 amount
                });
            }
        });

        totalExpenditureDisplay.innerHTML = `<a href="#" onclick="showYearDetails(${selectedYear})">${selectedYear}年 总消费：￥${total.toFixed(2)}</a>`; // 保留两位小数
    }

    // 计算指定月份的总消费金额
    function calculateMonthlyTotal(year, month) {
        const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
        let total = 0;

        Object.keys(expensesData).forEach(date => {
            if (date.startsWith(monthStr)) {
                expensesData[date].forEach(entry => {
                    total += entry.totalAmount;  // 使用 totalAmount 而不是 amount
                });
            }
        });

        return parseFloat(total.toFixed(2)); // 保留两位小数
    }

    // 渲染日历
    function renderCalendar() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const lastDay = new Date(year, month, 0).getDate();
        const monthlyTotal = calculateMonthlyTotal(year, month); // 获取当前月份的总消费

        // 动态生成表格 HTML，包括左右箭头
        let htmlString = `
        <table class='calendar'>
            <tr>
                <th colspan="7">
                    <button id="prev-month" aria-label="上一月">
                        上一月
                    </button>
                    ${year}年${month}月 总消费：￥${monthlyTotal}
                    <button id="next-month" aria-label="下一月">
                        下一月
                    </button>
                </th>
            </tr>
            <tr>
                <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
            </tr>
            <tr>`;


        // 补齐月初空白
        let weekDay = new Date(year, month - 1, 1).getDay();
        for (let i = 0; i < weekDay; i++) htmlString += "<td>-</td>";

        // 填充每一天
        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const dailyExpenses = expensesData[dateStr] || [];
            const dailyTotal = dailyExpenses.length > 0
                ? dailyExpenses.reduce((sum, entry) => sum + entry.totalAmount, 0).toFixed(2)
                : "-"; // 如果没有消费记录显示"-"，否则显示消费金额

            htmlString += `<td>
                         <a href="#" class="day-cell" onclick="showDetails('${dateStr}')">${day}</a>
                         <div class="daily-expense">${dailyTotal}</div>
                       </td>`;

            if ((weekDay + day) % 7 === 0) htmlString += "</tr><tr>";
        }

        // 补齐月末空白
        htmlString += "</tr></table>";
        calendarContainer.innerHTML = htmlString;

        // 添加上一月和下一月按钮的事件监听
        document.getElementById("prev-month").onclick = function () {
            let newYear = year;
            let newMonth = month - 1;
            if (newMonth === 0) {
                newMonth = 12;
                newYear -= 1;
            }
            if (newYear >= 2023 && newYear <= 2025) {
                yearSelect.value = newYear;
                monthSelect.value = newMonth;
                renderCalendar();
                calculateTotalExpenditure();
            }
        };

        document.getElementById("next-month").onclick = function () {
            let newYear = year;
            let newMonth = month + 1;
            if (newMonth === 13) {
                newMonth = 1;
                newYear += 1;
            }
            if (newYear >= 2023 && newYear <= 2025) {
                yearSelect.value = newYear;
                monthSelect.value = newMonth;
                renderCalendar();
                calculateTotalExpenditure();
            }
        };
    }

    // 显示消费详情
    window.showDetails = function (dateStr) {
        modal.style.display = "block";

        const details = expensesData[dateStr];
        if (details) {
            let contentHTML = `<h3>${dateStr} 总消费：￥${details.reduce((sum, d) => sum + d.totalAmount, 0).toFixed(2)}</h3>`; // 使用 totalAmount 而不是 amount
            contentHTML += `<table class="modal-table"><thead><tr><th>平台</th><th>总计</th><th>商品</th><th>实付</th></tr></thead><tbody>`;

            details.forEach(d => {
                contentHTML += `<tr class="platform-row">
                            <td rowspan="${d.items.length}">${d.shop}</td>
                            <td rowspan="${d.items.length}" class="platform-amount">￥${d.totalAmount.toFixed(2)}</td> <!-- 使用 totalAmount -->
                            <td class="product-name">${d.items[0].name}</td>
                            <td class="product-amount">￥${d.items[0].price.toFixed(2)}</td> <!-- 保留两位小数 -->
                        </tr>`;

                for (let i = 1; i < d.items.length; i++) {
                    contentHTML += `<tr class="product-row">
                                <td class="product-name">${d.items[i].name}</td>
                                <td class="product-amount">￥${d.items[i].price.toFixed(2)}</td> <!-- 保留两位小数 -->
                            </tr>`;
                }
            });

            contentHTML += `</tbody></table>`;
            modalDetails.innerHTML = contentHTML;
        } else {
            modalDetails.innerHTML = `<p>无消费记录。</p>`;
        }
    };

    // 点击年份总消费超链接显示该年份每个月的消费详情
    window.showYearDetails = function (year) {
        modal.style.display = "block";
        let totalYearlyExpenditure = 0;
        let monthDataHTML = `<h3>${year}年 总消费：`;

        for (let month = 1; month <= 12; month++) {
            const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
            let monthlyTotal = 0;

            Object.keys(expensesData).forEach(date => {
                if (date.startsWith(monthStr)) {
                    expensesData[date].forEach(entry => {
                        monthlyTotal += entry.totalAmount;  // 使用 totalAmount 而不是 amount
                    });
                }
            });

            totalYearlyExpenditure += monthlyTotal;
        }

        monthDataHTML += `￥${totalYearlyExpenditure.toFixed(2)}</h3>`; // 保留两位小数
        monthDataHTML += `<table border="1" style="width:100%; margin-top:10px;">
                        <tr><th>月份</th><th>总消费金额</th></tr>`;

        for (let month = 1; month <= 12; month++) {
            const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
            let monthlyTotal = 0;

            Object.keys(expensesData).forEach(date => {
                if (date.startsWith(monthStr)) {
                    expensesData[date].forEach(entry => {
                        monthlyTotal += entry.totalAmount;  // 使用 totalAmount 而不是 amount
                    });
                }
            });

            monthDataHTML += `<tr>
                            <td><a href="#" onclick="selectMonth(${year}, ${month})">${month}月</a></td>
                            <td>￥${monthlyTotal.toFixed(2)}</td> <!-- 保留两位小数 -->
                          </tr>`;
        }

        monthDataHTML += `</table>`;
        modalDetails.innerHTML = monthDataHTML;
    };

    window.selectMonth = function (year, month) {
        modal.style.display = "none";
        yearSelect.value = year;
        monthSelect.value = month;
        renderCalendar();
        calculateTotalExpenditure();
    };

    // 关闭弹窗
    modalClose.onclick = function () {
        modal.style.display = "none";
    };

    // 切换年份或月份时重新渲染
    yearSelect.onchange = function () {
        renderCalendar();
        calculateTotalExpenditure();
    };

    monthSelect.onchange = function () {
        renderCalendar();
    };

    function initializeYearAndMonthOptions() {
        const years = [2023, 2024, 2025];
        const months = Array.from({ length: 12 }, (_, i) => i + 1);

        years.forEach(year => {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = `${year}年`;
            yearSelect.appendChild(option);
        });

        months.forEach(month => {
            const option = document.createElement("option");
            option.value = month;
            option.textContent = `${month}月`;
            monthSelect.appendChild(option);
        });

        yearSelect.value = 2024;
        monthSelect.value = 12;
    }

    initializeYearAndMonthOptions();
    renderCalendar();
    calculateTotalExpenditure();
});
