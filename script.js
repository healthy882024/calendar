document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar-container");
    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modal-details");
    const modalClose = document.getElementById("modal-close");
    const yearSelect = document.getElementById("year");
    const monthSelect = document.getElementById("month");
    const totalExpenditureDisplay = document.getElementById("total-expenditure");

    // 示例数据
    const expensesData = {
        "2023-01-01": [
            { shop: "京东", items: [{ name: "袜子", price: 10 }, { name: "手套", price: 8 }] },
            { shop: "叮咚", items: [{ name: "食品", price: 30 }] }
        ],
        "2024-01-01": [
            { shop: "京东", items: [{ name: "奶粉", price: 10 }] }
        ],
        "2024-12-03": [
            { shop: "京东", items: [{ name: "袜子", price: 2 }] },
            { shop: "淘宝", items: [{ name: "矿泉水", price: 20 }, { name: "芋圆烘焙", price: 8 }, { name: "套子", price: 8 }] },
            { shop: "线下", items: [{ name: "兰州拉面", price: 30 }, { name: "狗子", price: 8 }] }
        ],
        "2024-12-12": [
            {
                shop: "京东", items: [
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

        let htmlString = `<table class='calendar'>
                      <tr><th colspan='7'>${year}年${month}月 总消费：￥${monthlyTotal}</th></tr>
                      <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr><tr>`;

        let weekDay = new Date(year, month - 1, 1).getDay();
        for (let i = 0; i < weekDay; i++) htmlString += "<td>-</td>";

        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const dailyExpenses = expensesData[dateStr] || [];
            const dailyTotal = dailyExpenses.reduce((sum, entry) => sum + entry.totalAmount, 0).toFixed(2); // 使用 totalAmount 而不是 amount

            htmlString += `<td>
                         <a href="#" class="day-cell" onclick="showDetails('${dateStr}')">${day}</a>
                         <div class="daily-expense">￥${dailyTotal}</div>
                       </td>`;

            if ((weekDay + day) % 7 === 0) htmlString += "</tr><tr>";
        }

        htmlString += "</tr></table>";
        calendarContainer.innerHTML = htmlString;
    }

    // 显示消费详情
    window.showDetails = function (dateStr) {
        modal.style.display = "block";

        const details = expensesData[dateStr];
        if (details) {
            let contentHTML = `<h3>${dateStr} 总消费：￥${details.reduce((sum, d) => sum + d.totalAmount, 0).toFixed(2)}</h3>`; // 使用 totalAmount 而不是 amount
            contentHTML += `<table class="modal-table"><thead><tr><th>平台</th><th>总计</th><th>商品</th><th>价格</th></tr></thead><tbody>`;

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
