// Admin Login
const loginForm = document.getElementById('loginForm');
const adminLoginSection = document.getElementById('admin-login');
const addEventForm = document.getElementById('addEventForm');
const eventsList = document.getElementById('events');
const searchInput = document.getElementById('searchEvent');

let isAdmin = false;

// Simple admin credentials
const adminUser = { username: 'admin', password: '1234' };

// Hide event form initially
document.getElementById('event-form').style.display = 'none';

// Admin Login Event 
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    
    if(user === adminUser.username && pass === adminUser.password){
        alert('Admin login successful');
        isAdmin = true;
        adminLoginSection.style.display = 'none';
        document.getElementById('event-form').style.display = 'block';
        displayEvents(events);
    } else {
        alert('Invalid credentials');
    }
});

// Load events from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];
displayEvents(events);

// Add new event
addEventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const event = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    addEventForm.reset();
    displayEvents(events);
});

// Display events (full array)
function displayEvents(eventsArray) {
    eventsList.innerHTML = '';
    eventsArray.forEach((event, index) => {
        const li = document.createElement('li');
        li.className = 'event-card';
        li.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            ${isAdmin ? `<button onclick="deleteEvent(${index})">Delete</button>` : ''}
        `;
        eventsList.appendChild(li);
    });
}

// Delete event (admin only) 
function deleteEvent(index) {
    if(isAdmin){
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents(events);
    }
}

// Search & Filter 
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredEvents = events.map((event, index) => ({ ...event, originalIndex: index }))
        .filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
    displayFilteredEvents(filteredEvents);
});

function displayFilteredEvents(filteredEvents) {
    eventsList.innerHTML = '';
    filteredEvents.forEach(event => {
        const li = document.createElement('li');
        li.className = 'event-card';
        li.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            ${isAdmin ? `<button onclick="deleteEvent(${event.originalIndex})">Delete</button>` : ''}
        `;
        eventsList.appendChild(li);
    });
}
