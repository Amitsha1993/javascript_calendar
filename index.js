// Decalarations
const runningYear = new Date().getFullYear();
const runningMonth = new Date().getMonth() + 1;
const runningDate = new Date().getDate();
let currentYear = runningYear;
let currentMonth = runningMonth;
let currentDate = runningDate;
let rootBody = document.getElementById('CalenderBody');
const monthList = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
document.getElementById('currentMonth').innerText = monthList[currentMonth - 1] + ', ' + currentYear;
document.getElementById('currentYear').innerText = currentYear;
// Add coloumn to row with text
function addCols(text) {
    let tempCols = document.createElement('td');
    tempCols.innerText = text;
    return tempCols;

}

//set the classes
function setMyClass(type, name) {
    type.setAttribute('class', name);
}


//Show the calender on load of page and on click next and prev buttons
function viewCalender(year = runningMonth, month = runningYear) {
    document.getElementById('selectedItem').innerHTML = currentDate + '/' + monthList[currentMonth - 1] + '/' + currentYear;
    let count = netxcount = 1;
    rootBody.innerHTML = '';
    let monthDays = new Date(year, month, 0).getDate();
    let fDay = new Date(year, month - 1).getDay() - 1;
    let prvCount = (new Date(year, month - 1, 0).getDate() - fDay) + 1
    for (let i = 0; i <= 5; i++) {
        let rows = document.createElement('tr');
        for (j = 0; j <= 6; j++) {
            if (i == 0 && j < fDay) {
                let cols = addCols(prvCount);
                setMyClass(cols, 'disabled')
                prvCount++
                rows.appendChild(cols);
            }
            else if (count <= monthDays) {
                let cols = addCols(count);
                if (currentDate == count && currentYear == runningYear && runningMonth == currentMonth) {
                    setMyClass(cols, 'enabled selected')
                }
                else {
                    setMyClass(cols, 'enabled')

                }

                cols.setAttribute('value', count);
                count++;

                rows.appendChild(cols)
            }
            else {

                let cols = addCols(netxcount);
                setMyClass(cols, 'disabled')
                netxcount++
                rows.appendChild(cols)
            }
        }
        rootBody.appendChild(rows);
    }
};

//Previous month funciton
function previousMonth() {
    if (currentMonth == 1) {
        currentMonth = monthList.length;
        currentYear--
    }
    else {
        currentMonth--
    }
    document.getElementById('currentMonth').innerText = monthList[currentMonth - 1] + ', ' + currentYear;
    document.getElementById('currentYear').innerText = currentYear;
    viewCalender(currentYear, currentMonth)

}
//Next month funciton
function nextMonth() {
    if (monthList.length == currentMonth) {
        currentMonth = 1;
        currentYear++
    }
    else {
        currentMonth++
    }
    document.getElementById('currentMonth').innerText = monthList[currentMonth - 1] + ', ' + currentYear;
    document.getElementById('currentYear').innerText = currentYear;
    viewCalender(currentYear, currentMonth)
}

//previous Year  funciton
function previousYear() {
    currentYear--;
    document.getElementById('currentYear').innerText = currentYear;
    document.getElementById('currentMonth').innerText = monthList[currentMonth - 1] + ', ' + currentYear;
    viewCalender(currentYear, currentMonth)

}
//Next year funciton
function nextYear() {
    console.log("next year", currentYear);
    currentYear++;
    document.getElementById('currentYear').innerText = currentYear;
    document.getElementById('currentMonth').innerText = monthList[currentMonth - 1] + ', ' + currentYear;
    viewCalender(currentYear, currentMonth)
}

//Select the date user clicks.
function selectDate(event) {
    let removeClass = document.querySelectorAll('td');
    for (let i = 0; i < removeClass.length; i++) {
        if (removeClass[i].className == 'enabled selected') {
            removeClass[i].className = 'enabled'
        }
    }
    if (event.target.className == 'enabled') {
        setMyClass(event.target, 'enabled selected')
        document.getElementById('selectedItem').innerHTML = event.target.innerHTML + '/' + monthList[currentMonth - 1] + '/' + currentYear;
    }
    else {
        document.getElementById('selectedItem').innerHTML = 'wrong Date'
    }
}

viewCalender();