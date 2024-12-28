document.getElementById('vehicle-type').addEventListener('change', function () {
    const vehicleType = this.value;
    const passengerGroup = document.getElementById('passenger-group');
    
    // Show or hide the passengers field based on the selected vehicle type
    if (vehicleType === 'car') {
        passengerGroup.style.display = 'block';
    } else {
        passengerGroup.style.display = 'none';
    }
});

// Form submission event listener
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Validate the form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const vehicleType = document.getElementById('vehicle-type').value;
    const pickupLocation = document.getElementById('pickup-location').value.trim();
    const pickupDate = document.getElementById('pickup-date').value;
    const returnDate = document.getElementById('return-date').value;
    const guests = document.getElementById('guests').value;

    // Validation checks
    if (!name) {
        alert("Please enter your full name.");
        return;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!vehicleType) {
        alert("Please select a vehicle type.");
        return;
    }
    if (!pickupLocation) {
        alert("Please enter a pickup location.");
        return;
    }
    if (!pickupDate) {
        alert("Please select a pickup date.");
        return;
    }
    if (!returnDate) {
        alert("Please select a return date.");
        return;
    }
    if (new Date(returnDate) < new Date(pickupDate)) {
        alert("Return date cannot be earlier than pickup date.");
        return;
    }
    if (vehicleType === 'car' && !guests) {
        alert("Please select the number of passengers for the car.");
        return;
    }

    // Store the data in local storage
    const bookingData = {
        name,
        email,
        vehicleType,
        pickupLocation,
        pickupDate,
        returnDate,
        guests: vehicleType === 'car' ? guests : null
    };
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Display confirmation message
    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.classList.remove('hidden');
    confirmationDiv.innerHTML = `
        <hr>
        <p>Thank you, <strong>${name}</strong>!</p>
        <p>Your <strong>${vehicleType.toUpperCase()}</strong> has been successfully booked.</p>
        <p>Pickup Location: <strong>${pickupLocation}</strong></p>
        <p>Pickup Date: <strong>${pickupDate}</strong></p>
        <p>Return Date: <strong>${returnDate}</strong></p>
        ${
            vehicleType === "car"
                ? `<p>Number of Passengers: <strong>${guests}</strong></p>`
                : `<p>No passengers selected (Bike).</p>`
        }
        <hr>
    `;

    // Clear all form fields
    document.getElementById('booking-form').reset();

    // Hide confirmation after 10 seconds
    setTimeout(() => {
        confirmationDiv.classList.add('hidden');
    }, 10000); // Adjust time as needed
});

// Email validation helper function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
