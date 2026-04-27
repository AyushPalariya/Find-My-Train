document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const sourceCodeInput = document.getElementById('sourceCode');
    const destinationCodeInput = document.getElementById('destinationCode');
    const searchBtn = document.getElementById('searchBtn');
    const swapBtn = document.getElementById('swapStations');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const noResults = document.getElementById('noResults');
    const results = document.getElementById('results');

    // Popular station codes for demo purposes
    const popularStations = [
        { code: 'CHI', name: 'Chindwara' },
        { code: 'BHP', name: 'Bhopal' },
        { code: 'NGP', name: 'Nagpur' },
        { code: 'NDLS', name: 'New Delhi' },
        { code: 'MUM', name: 'Mumbai' }
    ];

    // Event Listeners
    searchBtn.addEventListener('click', searchTrains);
    swapBtn.addEventListener('click', swapStations);

    // Set sample values for easy testing
    sourceCodeInput.value = 'CHI';
    destinationCodeInput.value = 'BHP';

    // Functions
    function searchTrains() {
        const sourceCode = sourceCodeInput.value.trim().toUpperCase();
        const destinationCode = destinationCodeInput.value.trim().toUpperCase();

        // Validate inputs
        if (!sourceCode || !destinationCode) {
            alert('Please enter both source and destination station codes');
            return;
        }

        // Show loading indicator
        results.innerHTML = '';
        noResults.style.display = 'none';
        loadingIndicator.style.display = 'flex';

        // API URL
        const apiUrl = `http://localhost:8080/train/search/byCode?sourceCode=${sourceCode}&destinationCode=${destinationCode}`;

        // Fetch data from API
        fetch(apiUrl)
            .then(response => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                loadingIndicator.style.display = 'none';

                if (data && data.length > 0) {
                    displayResults(data);
                } else {
                    noResults.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching train data:', error);
                loadingIndicator.style.display = 'none';
                noResults.style.display = 'block';

                // If API is not available, use mock data for demo purposes
                if (sourceCode === 'CHI' && destinationCode === 'BHP') {
                    const mockData = [
                        {
                            "id": 4,
                            "train": {
                                "id": 5,
                                "trainName": "Panchvalley Express",
                                "trainNumber": "69730"
                            },
                            "source": {
                                "id": 5,
                                "stationName": "Chindwara",
                                "stationCode": "CHI"
                            },
                            "destination": {
                                "id": 2,
                                "stationName": "Bhopal",
                                "stationCode": "BHP"
                            },
                            "departureTime": "6:00 AM",
                            "arrivalTime": "12:35 PM"
                        }
                    ];
                    displayResults(mockData);
                }
            });
    }

    function displayResults(trains) {
        results.innerHTML = '';

        trains.forEach(train => {
            // Calculate journey duration
            const duration = calculateDuration(train.departureTime, train.arrivalTime);

            // Calculate live status
            const liveStatus = calculateLiveStatus(train.departureTime, train.arrivalTime);

            // Create train card
            const trainCard = document.createElement('div');
            trainCard.className = 'train-card';

            trainCard.innerHTML = `
                <div class="train-header">
                    <div>
                        <div class="train-name">${train.train.trainName}</div>
                        <div class="live-indicator">
                            <i class="fas fa-satellite-dish"></i> Live Tracking Enabled
                        </div>
                    </div>
                    <div class="train-number">${train.train.trainNumber}</div>
                </div>
                <div class="train-details">
                    <div class="station-details source">
                        <div class="time">${train.departureTime}</div>
                        <div class="station-name">${train.source.stationName}</div>
                        <div class="station-code">${train.source.stationCode}</div>
                    </div>
                    <div class="journey-line">
                        <i class="fas fa-circle arrow-icon"></i>
                        <div class="line"></div>
                        <div class="duration">${duration}</div>
                        <div class="line"></div>
                        <i class="fas fa-circle arrow-icon"></i>
                    </div>
                    <div class="station-details destination">
                        <div class="time">${train.arrivalTime}</div>
                        <div class="station-name">${train.destination.stationName}</div>
                        <div class="station-code">${train.destination.stationCode}</div>
                    </div>
                </div>

                <div class="live-tracking">
                    <div class="status-badge ${liveStatus.badgeClass}">${liveStatus.statusText}</div>
                    <div class="tracking-bar-container">
                        <div class="tracking-bar-fill" style="width: ${liveStatus.progress}%"></div>
                        <div class="train-icon-live" style="left: ${liveStatus.progress}%">
                            <i class="fas fa-train"></i>
                        </div>
                    </div>
                    <p style="font-size: 0.85rem; color: #6c757d; margin-top: 5px;">
                        ${liveStatus.message}
                    </p>
                </div>
            `;

            results.appendChild(trainCard);
        });

        results.style.display = 'block';
    }

    function calculateLiveStatus(departureTime, arrivalTime) {
        const timeToMinutes = (timeStr) => {
            const parts = timeStr.trim().split(' ');
            let [hours, minutes] = parts[0].split(':').map(Number);
            const period = parts[1] ? parts[1].toUpperCase() : null;

            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            return hours * 60 + minutes;
        };

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        let depMin = timeToMinutes(departureTime);
        let arrMin = timeToMinutes(arrivalTime);

        // Adjust for next-day arrival
        if (arrMin < depMin) arrMin += 1440;

        let statusText = "On Time";
        let badgeClass = "status-on-time";
        let progress = 0;
        let message = "";

        if (currentMinutes < depMin) {
            statusText = "Not Started";
            badgeClass = "status-not-started";
            progress = 0;
            message = `Train will depart from source in ${Math.floor((depMin - currentMinutes) / 60)}h ${(depMin - currentMinutes) % 60}m.`;
        } else if (currentMinutes > arrMin) {
            statusText = "Arrived";
            badgeClass = "status-arrived";
            progress = 100;
            message = "Train has reached its destination.";
        } else {
            const totalJourney = arrMin - depMin;
            const elapsed = currentMinutes - depMin;
            progress = Math.round((elapsed / totalJourney) * 100);
            message = `Currently on its way. Estimated arrival in ${Math.floor((arrMin - currentMinutes) / 60)}h ${(arrMin - currentMinutes) % 60}m.`;
        }

        return { statusText, badgeClass, progress, message };
    }

    function calculateDuration(departureTime, arrivalTime) {
        // Convert 12-hour format (HH:MM AM/PM) to 24-hour format in minutes
        const timeToMinutes = (timeStr) => {
            const parts = timeStr.trim().split(' ');
            let [hours, minutes] = parts[0].split(':').map(Number);
            const period = parts[1] ? parts[1].toUpperCase() : null;

            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            return hours * 60 + minutes;
        };

        let depMinutes = timeToMinutes(departureTime);
        let arrMinutes = timeToMinutes(arrivalTime);

        // Adjust if train arrives next day
        if (arrMinutes < depMinutes) {
            arrMinutes += 24 * 60;
        }

        // Calculate and format duration
        const durationMinutes = arrMinutes - depMinutes;
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        return `${hours}h ${minutes}m`;
    }

    function swapStations() {
        const temp = sourceCodeInput.value;
        sourceCodeInput.value = destinationCodeInput.value;
        destinationCodeInput.value = temp;

        // Add a rotation animation to the button
        swapBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            swapBtn.style.transform = 'rotate(0deg)';
        }, 300);
    }
});