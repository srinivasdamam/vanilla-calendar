let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function load() {
    const dt = new Date();
    
    const month = dt.getMonth();
    const date = dt.getDate();
    const year = dt.getFullYear();

    // To identify days in the month, we need to initiate new date
    // and pass the current month plus 1 and pass 0 as 3rd argument
    // 3rd argument is day number, 0 means pervious day 
    const daysInMonth = new Date(year, month+1, 0).getDate();
    console.log("Days in current month: ", daysInMonth);

}

load();