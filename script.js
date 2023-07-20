let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const backDrop = document.getElementById('modalBackDrop');
const newEventModal = document.getElementById('newEventModal');
const eventTitle = document.getElementById('eventTitle');
const deleteEventModal = document.getElementById('deleteEventModal');

const eventTitleInput = document.getElementById('eventTitleInput');

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function openModal() {
    const eventsForDay = events.find(e => e.date === clicked);
    backDrop.style.display = "block";

    if (eventsForDay) {
        deleteEventModal.style.display = "block";
        eventTitle.innerText = eventsForDay.title;
        backDrop.appendChild = deleteEventModal;
    } else {
        newEventModal.style.display = "block";
        backDrop.appendChild = newEventModal;
    }
}

function closeModal() {
    backDrop.style.display = "none";
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
}

function saveEvent() {
    const eventTitle = eventTitleInput.value;
    if (eventTitle) {
        events.push({
            date: clicked,
            title: eventTitle
        })
    }
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function deleteEvent() {
    const newEvents = events.filter(e => {
        return e.date !== clicked;
    });
    events = newEvents;
    localStorage.setItem('events', JSON.stringify(newEvents));
    closeModal()
}

function load() {
    calendar.innerHTML = '';
    const dt = new Date();
    
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    
    const month = dt.getMonth();
    const day = dt.getDate();
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

    document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString('en-IN', { month: "long"})} ${year}`;
    
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    
    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        const daySquareDate = `${month+1}/${i-paddingDays}/${year}`;
        const eventsForDay = events.find(e => e.date === daySquareDate);
        daySquare.classList.add('day');

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click', () => {
                clicked = daySquareDate;
                openModal();
            })
        } else {
            daySquare.classList.add('padding');
        }
        
        const isToday = nav === 0 && (i - paddingDays) == day;
        if (isToday) {
            daySquare.id = "currentDay"
        }

        if (eventsForDay) {
            const eventTitleDiv = document.createElement("div");
            eventTitleDiv.classList.add('event');
            eventTitleDiv.innerText = eventsForDay.title;
            daySquare.appendChild(eventTitleDiv);
        }
        calendar.appendChild(daySquare);
    }
}

function initButtons() {
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', () => {
        saveEvent();
    });

    document.getElementById('closeButton').addEventListener('click', () => {
        closeModal()
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        closeModal();
    });

    document.getElementById('deleteButton').addEventListener('click', () => {
        deleteEvent();
    });
}


initButtons();
load();