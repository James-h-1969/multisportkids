const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getFebDays(year:number){
    const isLeap = (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
    return isLeap ? 29 : 28;
}

export function getDates(isCurrent:boolean){
    const currentlyShowing = [];
    const currentDate = new Date();
    let week = [] 
    let currMonth = 0; // Indexed from 0
    let currYear = 0;
    let daysOfMonth = [31, getFebDays(currYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let firstOfMonth = new Date();
    let dayOfWeek = 0;  
    if (isCurrent) {
        currMonth = currentDate.getMonth(); // Indexed from 0
        currYear = currentDate.getFullYear();
        firstOfMonth = new Date(currYear, currMonth, 1);
        dayOfWeek = firstOfMonth.getDay();  
    } else {
        currMonth = currentDate.getMonth() + 1; // Indexed from 0
        currYear = currentDate.getFullYear();
        firstOfMonth = new Date(currYear, currMonth, 1);
        dayOfWeek = firstOfMonth.getDay();  
    }
    for (let i =  1; i < 35 + 1 || i < dayOfWeek + 1 + daysOfMonth[currMonth]; i++){
        let toAdd = "";
        if ((i-dayOfWeek) > daysOfMonth[currMonth] || i < dayOfWeek + 1){
            toAdd = "";
        } else {
            toAdd = (i-dayOfWeek).toString();
        }

        if ((i-dayOfWeek) === currentDate.getDate()){
            week.push([toAdd, "currentDay"]);
        } else {
            week.push([toAdd, "not-current"]);
        }
        if (week.length == 7){
            currentlyShowing.push(week);
            week = [];
        }
    }
    if (week.length > 0){
        for (let i = week.length; i < 7; i++){
            week.push("");
        }
        currentlyShowing.push(week);
        week = [];
    }
    return currentlyShowing;
}

export function getMonthNum(){
    const currentDate = new Date();
    return currentDate.getMonth();
}

export function getMonthName(isCurrent:boolean){
    const currentDate = new Date();
    let month = currentDate.getMonth();
    if (isCurrent){
        return month_names[month];
    }
    return month_names[month + 1];

}

export function getYear(){
    const currentDate = new Date();
    return currentDate.getFullYear();
}

export function getCurrentDayNum(){
    const currentDate = new Date();
    return currentDate.getDate();
}
