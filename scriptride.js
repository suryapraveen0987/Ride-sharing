// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check localStorage for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateToggleIcon(savedTheme);
} else {
    // Default to dark mode if no theme is saved
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
    updateToggleIcon('dark-mode');
}

// Toggle Theme
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    updateToggleIcon(body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
});

// Update Toggle Icon
function updateToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark-mode') {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Login Modal
const loginModal = document.getElementById('loginModal');
function toggleLoginModal(show) {
    loginModal.style.display = show ? 'flex' : 'none';
}

// Signup Modal
const signupModal = document.getElementById('signupModal');
function toggleSignupModal(show) {
    signupModal.style.display = show ? 'flex' : 'none';
}

// Drive Modal
const driveModal = document.getElementById('driveModal');
function toggleDriveModal(show) {
    driveModal.style.display = show ? 'flex' : 'none';
}

// Handle Driver Details
function handleDriverDetails() {
    const name = document.getElementById('driver-name').value;
    const age = document.getElementById('driver-age').value;
    const gender = document.getElementById('driver-gender').value;
    const contact = document.getElementById('driver-contact').value;
    const license = document.getElementById('driver-license').value;
    const fromLocation = document.getElementById('driver-from').value;
    const toLocation = document.getElementById('driver-to').value;

    if (!name || !age || !gender || !contact || !license || !fromLocation || !toLocation) {
        alert('Please fill in all fields');
        return;
    }

    alert(`Driver details submitted successfully!\nName: ${name}\nAge: ${age}\nGender: ${gender}\nContact: ${contact}\nLicense: ${license}\nFrom: ${fromLocation}\nTo: ${toLocation}`);
    toggleDriveModal(false);
}

// Help Button
function showHelp() {
    alert('Help is on the way! Please contact support at support@cityride.com.');
}

// Language Selection
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    alert(`Language changed to ${selectedLanguage}`);
});

// Temporary data storage
let rides = JSON.parse(localStorage.getItem('rides')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Map initialization (simple version)
function initMap() {
    const map = document.getElementById('map');
    map.innerHTML = `<iframe 
        width="100%" 
        height="100%" 
        frameborder="0" 
        src="https://maps.google.com/maps?q=Bhimavaram,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
        style="border: none;">
    </iframe>`;
}

function bookRide() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    
    if(!pickup || !dropoff) {
        alert('Please enter both locations');
        return;
    }

    const newRide = {
        id: Date.now(),
        pickup,
        dropoff,
        status: 'pending',
        driver: null,
        fare: Math.floor(Math.random() * 500) + 100 // Fare in ₹
    };

    rides.push(newRide);
    localStorage.setItem('rides', JSON.stringify(rides));
    showRideConfirmation(newRide);
    updateDriverDashboard();
}

function showRideConfirmation(ride) {
    alert(`Ride booked! Your fare is ₹${ride.fare}. Waiting for driver...`);
}

function updateDriverDashboard() {
    const rideList = document.getElementById('rideList');
    rideList.innerHTML = rides
        .filter(ride => ride.status === 'pending')
        .map(ride => `
            <div class="ride-card">
                <h3>Ride #${ride.id}</h3>
                <p>From: ${ride.pickup}</p>
                <p>To: ${ride.dropoff}</p>
                <p>Fare: ₹${ride.fare}</p>
                <button onclick="acceptRide(${ride.id})">Accept Ride</button>
            </div>
        `).join('');
}






// Handle Driver Details
function handleDriverDetails() {
    const name = document.getElementById('driver-name').value;
    const age = document.getElementById('driver-age').value;
    const gender = document.getElementById('driver-gender').value;
    const contact = document.getElementById('driver-contact').value;
    const license = document.getElementById('driver-license').value;
    const fromLocation = document.getElementById('driver-from').value;
    const toLocation = document.getElementById('driver-to').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const pickupTime = document.getElementById('pickup-time').value;

    if (!name || !age || !gender || !contact || !license || !fromLocation || !toLocation || !pickupDate || !pickupTime) {
        alert('Please fill in all fields');
        return;
    }

    alert(`Driver details submitted successfully!\nName: ${name}\nAge: ${age}\nGender: ${gender}\nContact: ${contact}\nLicense: ${license}\nFrom: ${fromLocation}\nTo: ${toLocation}\nPickup Date: ${pickupDate}\nPickup Time: ${pickupTime}`);
    toggleDriveModal(false);
}
function acceptRide(rideId) {
    const ride = rides.find(r => r.id === rideId);
    if(ride) {
        ride.status = 'accepted';
        ride.driver = currentUser || 'Driver';
        localStorage.setItem('rides', JSON.stringify(rides));
        updateDriverDashboard();
        alert(`You've accepted the ride to ${ride.dropoff}`);
    }
}

// Initialize the app
initMap();
setInterval(updateDriverDashboard, 5000); // Update dashboard every 5 seconds