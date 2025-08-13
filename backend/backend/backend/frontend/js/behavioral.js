class BehavioralTracker {
    constructor() {
        this.keystrokeData = [];
        this.mouseMovements = [];
        this.geolocationData = null;
        this.startTime = Date.now();
        
        this.init();
    }
    
    init() {
        this.trackKeystrokes();
        this.trackMouseMovements();
        this.getGeolocation();
        this.setupFormSubmission();
    }
    
    trackKeystrokes() {
        document.addEventListener('keydown', (e) => {
            // Only track if typing in form fields
            if (e.target.tagName === 'INPUT' && e.target.type === 'text' || e.target.type === 'email' || e.target.type === 'tel') {
                this.keystrokeData.push({
                    timestamp: Date.now(),
                    key: e.key,
                    keyCode: e.keyCode,
                    target: e.target.name
                });
            }
        });
    }
    
    trackMouseMovements() {
        document.addEventListener('mousemove', (e) => {
            // Sample mouse movement data
            this.mouseMovements.push({
                timestamp: Date.now(),
                x: e.clientX,
                y: e.clientY
            });
        });
    }

    getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.geolocationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timestamp: position.timestamp
                    };
                },
                (error) => {
                    this.geolocationData = { error: error.message };
                }
            );
        } else {
            this.geolocationData = { error: "Geolocation not supported" };
        }
    }

    setupFormSubmission() {
        const forms = document.querySelectorAll('form');
        forms.forEach((form) => {
            form.addEventListener('submit', (e) => {
                // Attach behavioral data to the form before submission
                const behavioralInput = document.createElement('input');
                behavioralInput.type = 'hidden';
                behavioralInput.name = 'behavioralData';
                behavioralInput.value = JSON.stringify(this.collectData());
                form.appendChild(behavioralInput);
            });
        });
    }

    collectData() {
        return {
            keystrokes: this.keystrokeData,
            mouseMovements: this.mouseMovements,
            geolocation: this.geolocationData,
            sessionDuration: Date.now() - this.startTime
        };
    }
}

// Initialize the tracker when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.behavioralTracker = new BehavioralTracker();
});
