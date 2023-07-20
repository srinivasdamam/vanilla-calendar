let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function load() {
    const dt = new Date();
    
    const month = dt.getMonth();
    const date = dt.getDate();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    // To identify days in the month, we need to initiate new date
    // and pass the current month plus 1 and pass 0 as 3rd argument
    // 3rd argument is day number, 0 means pervious day 
    const daysInMonth = new Date(year, month+1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',

    });
    
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    
    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click', () => {
                console.log('clicked');
            })
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);

    }

}

load();