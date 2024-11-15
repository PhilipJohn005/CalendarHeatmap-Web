// src/Dates.js
export const userActivityData = [
    ...generateMonthData(1, 31, 2024),
   
    ...generateMonthData(2, 29, 2024),

];

function generateMonthData(month, days, year) {
    const monthData = [];
    for (let day = 1; day <= days; day++) {
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const count = Math.floor(Math.random() * 16); // Random count between 0-15
        monthData.push({ date, count });
    }
    return monthData;
}
