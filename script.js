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
            { shop: "京东", amount: 20, items: [{ name: "袜子", price: 10 }, { name: "手套", price: 8 }] },
            { shop: "叮咚", amount: 30, items: [{ name: "食品", price: 30 }] }
        ],
        "2024-01-01": [
            { shop: "京东", amount: 10, items: [{ name: "奶粉", price: 10 }] }
        ],
        "2024-12-03": [
            { shop: "京东", amount: 10, items: [{ name: "袜子", price: 2 }] },
            { shop: "淘宝", amount: 50, items: [{ name: "矿泉水", price: 20 }, { name: "【芋圆烘焙】叮咚定制木薯淀粉（生粉）叮咚家美好蒸笼纸23cm安井锁鲜装鱼豆腐【减脂必冲】切片南瓜", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }, { name: "套子", price: 8 }] },
            { shop: "线下", amount: 50, items: [{ name: "兰州拉面", price: 30 }, { name: "狗子", price: 8 }] }
        ]
    };
    
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
                    total += entry.amount;
                });
            }
        });

        totalExpenditureDisplay.innerHTML = `<a href="#" onclick="showYearDetails(${selectedYear})">${selectedYear}年 总消费：￥${total}</a>`;
    }

    // 计算指定月份的总消费金额
    function calculateMonthlyTotal(year, month) {
        const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
        let total = 0;

        Object.keys(expensesData).forEach(date => {
            if (date.startsWith(monthStr)) {
                expensesData[date].forEach(entry => {
                    total += entry.amount;
                });
            }
        });

        return total;
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
            const dailyTotal = dailyExpenses.reduce((sum, entry) => sum + entry.amount, 0);

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
            let contentHTML = `<h3>${dateStr} 总消费：￥${details.reduce((sum, d) => sum + d.amount, 0)}</h3>`;
            contentHTML += `<table class="modal-table"><thead><tr><th>平台</th><th>总计</th><th>商品</th><th>价格</th></tr></thead><tbody>`;

            details.forEach(d => {
                contentHTML += `<tr class="platform-row">
                            <td rowspan="${d.items.length}">${d.shop}</td>
                            <td rowspan="${d.items.length}" class="platform-amount">￥${d.amount}</td>
                            <td class="product-name">${d.items[0].name}</td>
                            <td class="product-amount">￥${d.items[0].price}</td>
                        </tr>`;

                for (let i = 1; i < d.items.length; i++) {
                    contentHTML += `<tr class="product-row">
                                <td class="product-name">${d.items[i].name}</td>
                                <td class="product-amount">￥${d.items[i].price}</td>
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
                        monthlyTotal += entry.amount;
                    });
                }
            });

            totalYearlyExpenditure += monthlyTotal;
        }

        monthDataHTML += `￥${totalYearlyExpenditure}</h3><table border="1" style="width:100%; margin-top:10px;">
                            <tr><th>月份</th><th>总消费金额</th></tr>`;

        for (let month = 1; month <= 12; month++) {
            const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
            let monthlyTotal = 0;

            Object.keys(expensesData).forEach(date => {
                if (date.startsWith(monthStr)) {
                    expensesData[date].forEach(entry => {
                        monthlyTotal += entry.amount;
                    });
                }
            });

            monthDataHTML += `<tr>
                                <td><a href="#" onclick="selectMonth(${year}, ${month})">${month}月</a></td>
                                <td>￥${monthlyTotal}</td>
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

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        yearSelect.value = currentYear;
        monthSelect.value = currentMonth;

        renderCalendar();
        calculateTotalExpenditure();
    }

    initializeYearAndMonthOptions();
});
