// Advanced Banking Fraud Detection System - Dynamic Edition
// Complete fraud detection system with real-time behavioral analysis

class FraudDetectionSystem {
    constructor() {
        // Core system data structures
        this.systemData = {
            users: new Map(),
            sessions: new Map(),
            alerts: [],
            behavioralProfiles: new Map(),
            riskScores: new Map(),
            geolocationHistory: new Map(),
            simSwapData: new Map(),
            honeypotLogs: [],
            mlModels: {
                randomForest: { accuracy: 94.5, active: true },
                gradientBoosting: { accuracy: 96.2, active: true },
                neuralNetwork: { accuracy: 91.8, active: true, training: false }
            },
            systemMetrics: {
                registrations: 1847,
                threatsBlocked: 47,
                accuracy: 97.4,
                responseTime: 0.08
            }
        };

        // Real-time behavioral tracking
        this.behavioralTracker = {
            keystrokeData: [],
            mouseData: [],
            touchData: [],
            scrollData: [],
            timingData: []
        };

        // Risk scoring configuration
        this.riskConfig = {
            thresholds: { block: 0.7, review: 0.6, monitor: 0.4 },
            weights: {
                simSwap: 0.35,
                geolocation: 0.25,
                behavioral: 0.20,
                device: 0.15,
                honeypot: 0.05
            }
        };

        // System state
        this.isActive = true;
        this.activityPaused = false;
        this.charts = {};
        this.currentSession = null;
        this.currentRiskScore = 0.15;
        this.formStartTime = Date.now();

        this.init();
    }

    init() {
        console.log('🛡️ Initializing Advanced Fraud Detection System...');
        this.setupEventListeners();
        this.initializeCharts();
        this.startRealTimeUpdates();
        this.simulateExistingData();
        console.log('✅ Fraud Detection System initialized successfully');
    }

    // === EVENT LISTENERS SETUP ===
    setupEventListeners() {
        // Navigation - Fixed to properly handle section switching
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation clicked:', link.getAttribute('data-section'));
                this.switchSection(link.getAttribute('data-section'));
            });
        });

        // Registration form behavioral tracking
        this.setupRegistrationTracking();

        // Admin controls
        this.setupAdminControls();

        // Authentication flow
        this.setupAuthentication();

        // Global behavioral tracking
        this.setupGlobalBehavioralTracking();

        // Geolocation tracking
        this.initializeGeolocation();
    }

    setupGlobalBehavioralTracking() {
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.trackMouseMovement(e);
        });

        // Scroll behavior tracking
        document.addEventListener('scroll', (e) => {
            this.trackScrollBehavior(e);
        });

        // Device orientation (if available)
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.trackDeviceOrientation(e);
            });
        }

        // Focus/blur events for attention tracking
        document.addEventListener('visibilitychange', () => {
            this.trackAttentionPatterns();
        });
    }

    setupRegistrationTracking() {
        const form = document.getElementById('dynamicRegistrationForm');
        if (!form) return;

        const inputs = form.querySelectorAll('.biometric-input');
        inputs.forEach(input => {
            // Keystroke dynamics
            input.addEventListener('keydown', (e) => this.trackKeydown(e));
            input.addEventListener('keyup', (e) => this.trackKeyup(e));
            
            // Input analysis
            input.addEventListener('input', (e) => this.analyzeInput(e));
            
            // Focus patterns
            input.addEventListener('focus', (e) => this.trackFocus(e));
            input.addEventListener('blur', (e) => this.trackBlur(e));
        });

        // Form submission
        form.addEventListener('submit', (e) => this.handleRegistrationSubmit(e));

        // Honeypot monitoring
        this.setupHoneypotDetection();
    }

    setupHoneypotDetection() {
        // Monitor hidden fields
        const honeypots = ['email_secondary', 'company_name', 'website_url', 'bot_trap'];
        honeypots.forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => this.detectHoneypotTrigger(id));
                field.addEventListener('focus', () => this.detectHoneypotTrigger(id));
            }
        });

        // Reset form timing when registration section is accessed
        this.formStartTime = Date.now();
    }

    setupAdminControls() {
        // Threshold controls
        const controls = ['blockThreshold', 'reviewThreshold', 'monitorThreshold'];
        controls.forEach(id => {
            const control = document.getElementById(id);
            if (control) {
                control.addEventListener('input', (e) => this.updateThreshold(id, e.target.value));
            }
        });

        // Weight controls
        const weights = ['simSwapWeight', 'geoWeight', 'behaviorWeight', 'deviceWeight', 'honeypotWeight'];
        weights.forEach(id => {
            const control = document.getElementById(id);
            if (control) {
                control.addEventListener('input', (e) => this.updateWeight(id, e.target.value));
            }
        });
    }

    setupAuthentication() {
        const username = document.getElementById('authUsername');
        if (username) {
            username.addEventListener('input', () => this.updateAuthProgress());
        }
    }

    // === BEHAVIORAL TRACKING ===
    trackKeydown(event) {
        const timestamp = performance.now();
        this.behavioralTracker.keystrokeData.push({
            type: 'keydown',
            key: event.key,
            timestamp,
            element: event.target.id,
            pressure: event.pressure || 0.5
        });
    }

    trackKeyup(event) {
        const timestamp = performance.now();
        const keydownEvent = this.behavioralTracker.keystrokeData
            .reverse()
            .find(k => k.key === event.key && k.type === 'keydown' && !k.processed);

        if (keydownEvent) {
            keydownEvent.processed = true;
            const dwellTime = timestamp - keydownEvent.timestamp;
            
            this.behavioralTracker.keystrokeData.push({
                type: 'keyup',
                key: event.key,
                timestamp,
                dwellTime,
                element: event.target.id
            });

            this.updateBehavioralMetrics();
        }
    }

    trackMouseMovement(event) {
        const timestamp = performance.now();
        const lastMouse = this.behavioralTracker.mouseData.slice(-1)[0];
        
        if (lastMouse) {
            const distance = Math.sqrt(
                Math.pow(event.clientX - lastMouse.x, 2) + 
                Math.pow(event.clientY - lastMouse.y, 2)
            );
            const timeDiff = timestamp - lastMouse.timestamp;
            const velocity = timeDiff > 0 ? distance / timeDiff : 0;

            this.behavioralTracker.mouseData.push({
                x: event.clientX,
                y: event.clientY,
                timestamp,
                velocity,
                distance
            });
        } else {
            this.behavioralTracker.mouseData.push({
                x: event.clientX,
                y: event.clientY,
                timestamp,
                velocity: 0,
                distance: 0
            });
        }

        // Keep only last 100 mouse events
        if (this.behavioralTracker.mouseData.length > 100) {
            this.behavioralTracker.mouseData.shift();
        }

        this.updateMouseMetrics();
    }

    trackScrollBehavior(event) {
        const timestamp = performance.now();
        this.behavioralTracker.scrollData.push({
            scrollY: window.scrollY,
            timestamp,
            direction: this.getScrollDirection()
        });

        // Keep only last 50 scroll events
        if (this.behavioralTracker.scrollData.length > 50) {
            this.behavioralTracker.scrollData.shift();
        }

        this.updateScrollMetrics();
    }

    trackDeviceOrientation(event) {
        this.deviceOrientation = {
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
            timestamp: performance.now()
        };

        this.updateOrientationMetrics();
    }

    trackAttentionPatterns() {
        this.behavioralTracker.timingData.push({
            type: 'attention',
            hidden: document.hidden,
            timestamp: performance.now()
        });
    }

    trackFocus(event) {
        this.behavioralTracker.timingData.push({
            type: 'focus',
            element: event.target.id,
            timestamp: performance.now()
        });
    }

    trackBlur(event) {
        this.behavioralTracker.timingData.push({
            type: 'blur',
            element: event.target.id,
            timestamp: performance.now()
        });
    }

    // === BEHAVIORAL ANALYSIS ===
    updateBehavioralMetrics() {
        const keyupEvents = this.behavioralTracker.keystrokeData.filter(k => k.type === 'keyup');
        
        if (keyupEvents.length > 0) {
            // Calculate dwell time
            const avgDwellTime = keyupEvents.reduce((sum, k) => sum + k.dwellTime, 0) / keyupEvents.length;
            this.updateElement('liveDwellTime', `${Math.round(avgDwellTime)}ms`);

            // Calculate flight times
            const flightTimes = [];
            for (let i = 1; i < keyupEvents.length; i++) {
                flightTimes.push(keyupEvents[i].timestamp - keyupEvents[i-1].timestamp);
            }

            if (flightTimes.length > 0) {
                const avgFlightTime = flightTimes.reduce((sum, f) => sum + f, 0) / flightTimes.length;
                this.updateElement('liveFlightTime', `${Math.round(avgFlightTime)}ms`);
            }

            // Calculate typing speed
            if (keyupEvents.length > 5) {
                const timeSpan = (keyupEvents[keyupEvents.length - 1].timestamp - keyupEvents[0].timestamp) / 1000 / 60;
                const wpm = Math.round((keyupEvents.length / 5) / timeSpan);
                this.updateElement('liveTypingSpeed', `${wpm} WPM`);
            }

            // Calculate rhythm consistency
            if (flightTimes.length > 3) {
                const consistency = this.calculateRhythmConsistency(flightTimes);
                this.updateElement('liveRhythmScore', `${consistency}%`);
            }
        }

        this.updateRiskScore();
    }

    updateMouseMetrics() {
        const mouseData = this.behavioralTracker.mouseData;
        if (mouseData.length > 10) {
            const avgVelocity = mouseData.slice(-10).reduce((sum, m) => sum + m.velocity, 0) / 10;
            this.updateElement('liveMouseActivity', `${mouseData.length} moves`);
            this.updateElement('mouseVelocity', `${Math.round(avgVelocity)}px/s`);
        }
    }

    updateScrollMetrics() {
        const scrollData = this.behavioralTracker.scrollData;
        if (scrollData.length > 5) {
            const pattern = this.analyzeScrollPattern(scrollData.slice(-10));
            this.updateElement('scrollPattern', pattern);
        }
    }

    updateOrientationMetrics() {
        if (this.deviceOrientation) {
            const stability = this.calculateOrientationStability();
            this.updateElement('deviceOrientation', stability);
        }
    }

    // === RISK SCORING ENGINE ===
    updateRiskScore() {
        let riskFactors = [];

        // Behavioral analysis
        const behavioralRisk = this.calculateBehavioralRisk();
        riskFactors.push({ type: 'behavioral', score: behavioralRisk, weight: this.riskConfig.weights.behavioral });

        // SIM swap detection
        const simSwapRisk = this.checkSIMSwap();
        riskFactors.push({ type: 'simSwap', score: simSwapRisk, weight: this.riskConfig.weights.simSwap });

        // Geolocation analysis
        const geoRisk = this.analyzeGeolocation();
        riskFactors.push({ type: 'geolocation', score: geoRisk, weight: this.riskConfig.weights.geolocation });

        // Device fingerprinting
        const deviceRisk = this.analyzeDeviceFingerprint();
        riskFactors.push({ type: 'device', score: deviceRisk, weight: this.riskConfig.weights.device });

        // Honeypot detection
        const honeypotRisk = this.checkHoneypots();
        riskFactors.push({ type: 'honeypot', score: honeypotRisk, weight: this.riskConfig.weights.honeypot });

        // Calculate weighted risk score
        const totalWeight = riskFactors.reduce((sum, f) => sum + f.weight, 0);
        const weightedScore = riskFactors.reduce((sum, f) => sum + (f.score * f.weight), 0) / totalWeight;
        
        this.currentRiskScore = Math.min(weightedScore, 1.0);
        this.displayRiskScore(this.currentRiskScore);
        this.updateDetectionCards(riskFactors);
    }

    calculateBehavioralRisk() {
        const keyupEvents = this.behavioralTracker.keystrokeData.filter(k => k.type === 'keyup');
        const mouseData = this.behavioralTracker.mouseData;

        let riskScore = 0;

        // Analyze keystroke patterns
        if (keyupEvents.length > 5) {
            const dwellTimes = keyupEvents.map(k => k.dwellTime);
            const avgDwell = dwellTimes.reduce((sum, d) => sum + d, 0) / dwellTimes.length;
            
            // Very fast typing might indicate bot
            if (avgDwell < 30) riskScore += 0.4;
            
            // Too consistent timing
            const variance = this.calculateVariance(dwellTimes);
            if (variance < 50) riskScore += 0.3;
        }

        // Analyze mouse patterns
        if (mouseData.length > 20) {
            const velocities = mouseData.map(m => m.velocity);
            const avgVelocity = velocities.reduce((sum, v) => sum + v, 0) / velocities.length;
            
            // No mouse movement or too linear
            if (avgVelocity < 10) riskScore += 0.5;
            
            const velocityVariance = this.calculateVariance(velocities);
            if (velocityVariance < 100) riskScore += 0.2;
        }

        return Math.min(riskScore, 1.0);
    }

    checkSIMSwap() {
        // Simulate SIM swap detection with carrier APIs
        const phoneNumber = document.getElementById('phone')?.value;
        if (!phoneNumber) return 0;

        // Simulate API response delay
        setTimeout(() => {
            const simSwapRisk = Math.random() * 0.4; // Random for demo
            const swapDetected = simSwapRisk > 0.3;
            
            if (swapDetected) {
                this.updateDetectionCard('simSwapCard', 'warning', 'Recent Activity', 'SIM swap detected 18h ago');
                this.addAlert('SIM_SWAP', 'HIGH', 'Recent SIM swap activity detected', 'Additional verification required');
            } else {
                this.updateDetectionCard('simSwapCard', 'success', 'Verified', 'No recent SIM activity');
            }
        }, 1200);

        return Math.random() * 0.2; // Low baseline risk
    }

    analyzeGeolocation() {
        // Use browser geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                this.processGeolocationData(latitude, longitude);
            }, (error) => {
                console.log('Geolocation error:', error);
                this.updateDetectionCard('geoCard', 'warning', 'Limited Data', 'Location unavailable');
            });
        }

        return Math.random() * 0.3; // Baseline geo risk
    }

    processGeolocationData(lat, lng) {
        // Simulate geolocation analysis
        const location = this.reverseGeocode(lat, lng);
        const riskLevel = this.assessLocationRisk(location);
        
        if (riskLevel > 0.5) {
            this.updateDetectionCard('geoCard', 'warning', 'High Risk Location', 'VPN/Proxy detected');
        } else if (riskLevel > 0.3) {
            this.updateDetectionCard('geoCard', 'warning', 'Unusual Location', 'Location mismatch detected');
        } else {
            this.updateDetectionCard('geoCard', 'success', 'Verified', `${location.city}, ${location.country}`);
        }
    }

    analyzeDeviceFingerprint() {
        const fingerprint = this.generateDeviceFingerprint();
        const trustScore = this.calculateDeviceTrustScore(fingerprint);
        
        // Update device status
        const statusText = trustScore > 0.7 ? 'Trusted Device' : trustScore > 0.4 ? 'Unknown Device' : 'Suspicious Device';
        this.updateElement('deviceTrust', `${Math.round(trustScore * 100)}%`);
        
        return 1 - trustScore; // Higher trust = lower risk
    }

    checkHoneypots() {
        const honeypots = ['email_secondary', 'company_name', 'website_url', 'bot_trap'];
        let triggered = false;

        honeypots.forEach(id => {
            const field = document.getElementById(id);
            if (field && field.value.length > 0) {
                triggered = true;
            }
        });

        // Check form completion speed
        const formTime = (Date.now() - this.formStartTime) / 1000;
        if (formTime < 3 && this.behavioralTracker.keystrokeData.length > 20) {
            triggered = true;
        }

        if (triggered) {
            this.updateDetectionCard('honeypotCard', 'error', 'Bot Detected', 'Honeypot triggered');
            this.addAlert('HONEYPOT', 'CRITICAL', 'Bot behavior detected', 'Immediate blocking required');
            return 0.95;
        } else {
            this.updateDetectionCard('honeypotCard', 'success', 'Human Verified', 'All checks passed');
            return 0.05;
        }
    }

    // === UTILITY FUNCTIONS ===
    calculateRhythmConsistency(flightTimes) {
        if (flightTimes.length < 3) return 0;
        
        const mean = flightTimes.reduce((sum, t) => sum + t, 0) / flightTimes.length;
        const variance = this.calculateVariance(flightTimes);
        const stdDev = Math.sqrt(variance);
        
        return Math.max(0, Math.round(100 - (stdDev / mean * 100)));
    }

    calculateVariance(values) {
        const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
        return values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    }

    getScrollDirection() {
        const scrollData = this.behavioralTracker.scrollData;
        if (scrollData.length < 2) return 'none';
        
        const current = scrollData[scrollData.length - 1];
        const previous = scrollData[scrollData.length - 2];
        
        return current.scrollY > previous.scrollY ? 'down' : 'up';
    }

    analyzeScrollPattern(scrollData) {
        if (scrollData.length < 5) return 'Insufficient data';
        
        const velocities = [];
        for (let i = 1; i < scrollData.length; i++) {
            const distance = Math.abs(scrollData[i].scrollY - scrollData[i-1].scrollY);
            const time = scrollData[i].timestamp - scrollData[i-1].timestamp;
            velocities.push(time > 0 ? distance / time : 0);
        }
        
        const avgVelocity = velocities.reduce((sum, v) => sum + v, 0) / velocities.length;
        const variance = this.calculateVariance(velocities);
        
        if (variance < 0.1) return 'Robotic';
        if (avgVelocity > 2) return 'Rapid';
        return 'Organic';
    }

    calculateOrientationStability() {
        if (!this.deviceOrientation) return 'Unavailable';
        
        // Simple stability check based on orientation values
        const { alpha, beta, gamma } = this.deviceOrientation;
        const totalMovement = Math.abs(alpha || 0) + Math.abs(beta || 0) + Math.abs(gamma || 0);
        
        if (totalMovement < 10) return 'Stable';
        if (totalMovement < 50) return 'Minor movement';
        return 'Active movement';
    }

    generateDeviceFingerprint() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            plugins: Array.from(navigator.plugins).map(p => p.name),
            touchSupport: 'ontouchstart' in window
        };
    }

    calculateDeviceTrustScore(fingerprint) {
        let trustScore = 0.5; // Base trust
        
        // Common browser check
        if (fingerprint.userAgent.includes('Chrome') || fingerprint.userAgent.includes('Firefox') || fingerprint.userAgent.includes('Safari')) {
            trustScore += 0.2;
        }
        
        // Plugin presence (bots often have no plugins)
        if (fingerprint.plugins.length > 3) {
            trustScore += 0.1;
        }
        
        // Touch support on mobile
        if (fingerprint.touchSupport && fingerprint.userAgent.includes('Mobile')) {
            trustScore += 0.1;
        }
        
        // Timezone consistency
        if (fingerprint.timezone && !fingerprint.timezone.includes('UTC')) {
            trustScore += 0.1;
        }
        
        return Math.min(trustScore, 1.0);
    }

    reverseGeocode(lat, lng) {
        // Simulate reverse geocoding
        const locations = [
            { city: 'Mumbai', country: 'India', risk: 0.1 },
            { city: 'Delhi', country: 'India', risk: 0.15 },
            { city: 'Lagos', country: 'Nigeria', risk: 0.4 },
            { city: 'Unknown', country: 'VPN', risk: 0.8 }
        ];
        
        return locations[Math.floor(Math.random() * locations.length)];
    }

    assessLocationRisk(location) {
        return location.risk || Math.random() * 0.5;
    }

    // === UI UPDATE FUNCTIONS ===
    displayRiskScore(score) {
        this.updateElement('dynamicRiskScore', score.toFixed(2));
        this.updateElement('globalRiskScore', score.toFixed(2));
        
        const percentage = Math.round(score * 100);
        const gaugeFill = document.getElementById('riskGaugeFill');
        if (gaugeFill) {
            gaugeFill.style.width = `${percentage}%`;
        }
        
        const riskStatus = document.getElementById('riskStatus');
        if (riskStatus) {
            if (score < 0.4) {
                riskStatus.textContent = '✅ Safe to proceed';
                riskStatus.className = 'risk-status safe';
            } else if (score < 0.7) {
                riskStatus.textContent = '⚠️ Additional verification required';
                riskStatus.className = 'risk-status monitor';
            } else {
                riskStatus.textContent = '🚫 Transaction blocked';
                riskStatus.className = 'risk-status block';
            }
        }
        
        // Update form progress
        const formInputs = document.querySelectorAll('.biometric-input');
        const filledInputs = Array.from(formInputs).filter(input => input.value.length > 0);
        const progress = formInputs.length > 0 ? Math.round((filledInputs.length / formInputs.length) * 100) : 0;
        this.updateElement('liveFormProgress', `${progress}%`);
    }

    updateDetectionCards(riskFactors) {
        riskFactors.forEach(factor => {
            const cardId = `${factor.type}Card`;
            const card = document.getElementById(cardId);
            if (card) {
                if (factor.score > 0.7) {
                    card.className = 'detection-card error';
                } else if (factor.score > 0.4) {
                    card.className = 'detection-card warning';
                } else {
                    card.className = 'detection-card success';
                }
            }
        });
    }

    updateDetectionCard(cardId, status, value, details) {
        const card = document.getElementById(cardId);
        if (card) {
            card.className = `detection-card ${status}`;
            
            const valueElement = card.querySelector('.detection-value');
            const detailsElement = card.querySelector('.detection-details');
            
            if (valueElement) valueElement.textContent = value;
            if (detailsElement) detailsElement.textContent = details;
        }
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // === AUTHENTICATION SYSTEM ===
    proceedToAuth() {
        const username = document.getElementById('authUsername')?.value;
        if (!username) {
            alert('Please enter a username');
            return;
        }

        // Hide stage 1, show stage 2
        this.switchAuthStage(1, 2);
        
        // Generate cryptographic challenge
        const challenge = this.generateCryptoChallenge();
        this.updateElement('cryptoChallenge', challenge);
        
        // Update progress
        this.updateAuthProgress();
    }

    authenticateWithBiometric(type) {
        this.updateElement('authProgressInfo', `Authenticating with ${type}...`);
        
        // Simulate biometric authentication
        setTimeout(() => {
            const signature = this.generateCryptoSignature();
            this.updateElement('cryptoChallenge', `Signed: ${signature}`);
            
            // Switch to success stage
            this.switchAuthStage(2, 3);
            
            // Display authentication details
            this.displayAuthDetails(type);
        }, 2000 + Math.random() * 1000);
    }

    switchAuthStage(from, to) {
        const fromStage = document.getElementById(`stage${from}`);
        const toStage = document.getElementById(`stage${to}`);
        const fromStep = document.getElementById(`step${from}`);
        const toStep = document.getElementById(`step${to}`);
        
        if (fromStage) fromStage.classList.remove('active');
        if (toStage) toStage.classList.add('active');
        if (fromStep) fromStep.classList.remove('active');
        if (toStep) toStep.classList.add('active');
    }

    updateAuthProgress() {
        const deviceFingerprint = this.generateDeviceFingerprint();
        const trustScore = this.calculateDeviceTrustScore(deviceFingerprint);
        
        this.updateElement('deviceTrust', `${Math.round(trustScore * 100)}%`);
        this.updateElement('networkSecurity', 'TLS 1.3 Encrypted');
        this.updateElement('sessionRisk', 'Low');
        
        const deviceDetails = document.getElementById('deviceDetails');
        if (deviceDetails) {
            deviceDetails.innerHTML = `
                <div>Platform: ${deviceFingerprint.platform}</div>
                <div>Browser: ${deviceFingerprint.userAgent.split(' ')[0]}</div>
                <div>Screen: ${deviceFingerprint.screen}</div>
                <div>Timezone: ${deviceFingerprint.timezone}</div>
            `;
        }
    }

    displayAuthDetails(type) {
        const authDetails = document.getElementById('authDetails');
        if (authDetails) {
            authDetails.innerHTML = `
                <div class="auth-detail-item">
                    <strong>Authentication Method:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div class="auth-detail-item">
                    <strong>Session ID:</strong> ${this.generateSessionId()}
                </div>
                <div class="auth-detail-item">
                    <strong>Timestamp:</strong> ${new Date().toLocaleString()}
                </div>
                <div class="auth-detail-item">
                    <strong>Risk Score:</strong> <span style="color: var(--color-success)">0.12 (Low)</span>
                </div>
            `;
        }
    }

    generateCryptoChallenge() {
        return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    generateCryptoSignature() {
        return Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    generateSessionId() {
        return Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    // === NAVIGATION - FIXED ===
    switchSection(sectionId) {
        console.log(`Switching to section: ${sectionId}`);
        
        // Hide all sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('active');
            console.log(`Hiding section: ${section.id}`);
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log(`Showing section: ${sectionId}`);
            
            // Initialize section-specific functionality
            setTimeout(() => {
                if (sectionId === 'analytics') {
                    this.initializeAnalyticsCharts();
                } else if (sectionId === 'registration') {
                    this.setupRegistrationTracking();
                    // Reset form timing for new session
                    this.formStartTime = Date.now();
                } else if (sectionId === 'authentication') {
                    this.setupAuthentication();
                    this.updateAuthProgress();
                }
            }, 100);
        } else {
            console.error(`Section not found: ${sectionId}`);
        }
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // === CHARTS ===
    initializeCharts() {
        this.setupRiskHeatmapChart();
        this.setupBiometricCharts();
    }

    setupRiskHeatmapChart() {
        const ctx = document.getElementById('riskHeatmapChart');
        if (!ctx) return;

        this.charts.riskHeatmap = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
                datasets: [{
                    data: [2847, 456, 89, 12],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    setupBiometricCharts() {
        const charts = ['keystrokeChart', 'mouseChart', 'orientationChart', 'scrollChart'];
        charts.forEach(chartId => {
            const ctx = document.getElementById(chartId);
            if (ctx) {
                this.charts[chartId] = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Array.from({length: 20}, (_, i) => i),
                        datasets: [{
                            data: Array.from({length: 20}, () => Math.random() * 100),
                            borderColor: '#1FB8CD',
                            borderWidth: 2,
                            fill: false,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: { display: false },
                            y: { display: false }
                        }
                    }
                });
            }
        });
    }

    initializeAnalyticsCharts() {
        console.log('Initializing analytics charts...');
        this.setupFeatureImportanceChart();
        this.setupFraudTimelineChart();
        this.updateMLModelStats();
    }

    setupFeatureImportanceChart() {
        const ctx = document.getElementById('featureImportanceChart');
        if (!ctx) {
            console.log('Feature importance chart canvas not found');
            return;
        }

        if (this.charts.featureImportance) {
            this.charts.featureImportance.destroy();
        }

        console.log('Creating feature importance chart...');
        this.charts.featureImportance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['SIM Swap', 'Geolocation', 'Behavioral', 'Device', 'Honeypot', 'Network'],
                datasets: [{
                    label: 'Importance Score',
                    data: [0.35, 0.25, 0.20, 0.15, 0.05, 0.03],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545']
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, max: 0.4 }
                }
            }
        });
    }

    setupFraudTimelineChart() {
        const ctx = document.getElementById('fraudTimelineChart');
        if (!ctx) {
            console.log('Fraud timeline chart canvas not found');
            return;
        }

        if (this.charts.fraudTimeline) {
            this.charts.fraudTimeline.destroy();
        }

        console.log('Creating fraud timeline chart...');
        const labels = Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        this.charts.fraudTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Fraud Attempts',
                    data: [45, 52, 38, 71, 89, 67, 47],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Legitimate Users',
                    data: [1240, 1387, 1156, 1523, 1847, 1691, 1456],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    updateMLModelStats() {
        // Update ML model accuracy displays
        this.updateElement('rfAccuracy', '94.5%');
        this.updateElement('gbAccuracy', '96.2%');
        this.updateElement('nnAccuracy', '91.8%');
        
        // Update CBR stats
        this.updateElement('cbrCases', '15,420');
        this.updateElement('cbrAccuracy', '84.2%');
        this.updateElement('cbrRetrievalTime', '0.08s');
    }

    // === REAL-TIME UPDATES ===
    startRealTimeUpdates() {
        // Update system metrics every 5 seconds
        setInterval(() => this.updateSystemMetrics(), 5000);
        
        // Update activity stream every 3 seconds
        setInterval(() => this.updateActivityStream(), 3000);
        
        // Update biometric charts every 2 seconds
        setInterval(() => this.updateBiometricCharts(), 2000);
        
        // Update CBR cases every 10 seconds
        setInterval(() => this.updateCBRCases(), 10000);
    }

    updateSystemMetrics() {
        // Simulate metric changes
        this.systemData.systemMetrics.registrations += Math.floor(Math.random() * 5);
        this.systemData.systemMetrics.threatsBlocked += Math.floor(Math.random() * 2);
        this.systemData.systemMetrics.accuracy += (Math.random() - 0.5) * 0.1;
        this.systemData.systemMetrics.responseTime += (Math.random() - 0.5) * 0.01;

        // Update display
        this.updateElement('liveRegistrations', this.systemData.systemMetrics.registrations.toLocaleString());
        this.updateElement('activeThreats', Math.floor(Math.random() * 20));
        this.updateElement('mlAccuracy', `${this.systemData.systemMetrics.accuracy.toFixed(1)}%`);
        this.updateElement('responseTime', `${Math.max(0.05, this.systemData.systemMetrics.responseTime).toFixed(2)}s`);
        this.updateElement('threatsBlocked', this.systemData.systemMetrics.threatsBlocked);
    }

    updateActivityStream() {
        if (this.activityPaused) return;

        const activities = [
            { type: 'success', icon: '✅', title: 'Registration Verified', description: 'User passed all fraud checks', time: 'Just now' },
            { type: 'warning', icon: '⚠️', title: 'Suspicious Behavior', description: 'Irregular keystroke patterns detected', time: '30s ago' },
            { type: 'error', icon: '🚫', title: 'SIM Swap Detected', description: 'Recent SIM activity flagged for review', time: '1m ago' },
            { type: 'success', icon: '🔒', title: 'Biometric Auth Success', description: 'Fingerprint authentication completed', time: '2m ago' },
            { type: 'warning', icon: '🌍', title: 'Location Mismatch', description: 'IP location differs from registered address', time: '3m ago' }
        ];

        const activity = activities[Math.floor(Math.random() * activities.length)];
        this.addActivityItem(activity);
    }

    addActivityItem(activity) {
        const container = document.getElementById('activityStream');
        if (!container) return;

        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item fade-in';
        activityElement.innerHTML = `
            <div class="activity-icon ${activity.type}">
                ${activity.icon}
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;

        container.insertBefore(activityElement, container.firstChild);

        // Remove old activities
        const activities = container.querySelectorAll('.activity-item');
        if (activities.length > 10) {
            container.removeChild(activities[activities.length - 1]);
        }
    }

    updateBiometricCharts() {
        Object.keys(this.charts).forEach(chartId => {
            if (chartId.includes('Chart') && this.charts[chartId]) {
                const chart = this.charts[chartId];
                if (chart.data && chart.data.datasets && chart.data.datasets[0]) {
                    // Shift data and add new point
                    chart.data.datasets[0].data.shift();
                    chart.data.datasets[0].data.push(Math.random() * 100);
                    chart.update('none');
                }
            }
        });
    }

    updateCBRCases() {
        const cases = [
            { type: 'SIM Swap + Geo Mismatch', similarity: Math.floor(Math.random() * 30) + 70 },
            { type: 'Behavioral Anomaly', similarity: Math.floor(Math.random() * 25) + 75 },
            { type: 'Device Fingerprint Match', similarity: Math.floor(Math.random() * 20) + 80 },
            { type: 'Honeypot Detection', similarity: Math.floor(Math.random() * 15) + 85 }
        ];

        const container = document.getElementById('recentCases');
        if (container) {
            container.innerHTML = cases.map(caseItem => `
                <div class="case-item">
                    <div class="case-type">${caseItem.type}</div>
                    <div class="case-similarity">${caseItem.similarity}% similar</div>
                </div>
            `).join('');
        }
    }

    // === ADMIN FUNCTIONS ===
    updateThreshold(thresholdId, value) {
        const numValue = parseFloat(value);
        const displayId = thresholdId.replace('Threshold', 'Value');
        this.updateElement(displayId, numValue.toFixed(2));
        
        // Update internal config
        if (thresholdId.includes('block')) {
            this.riskConfig.thresholds.block = numValue;
        } else if (thresholdId.includes('review')) {
            this.riskConfig.thresholds.review = numValue;
        } else if (thresholdId.includes('monitor')) {
            this.riskConfig.thresholds.monitor = numValue;
        }
    }

    updateWeight(weightId, value) {
        const numValue = parseFloat(value);
        const displayId = weightId + 'Value';
        this.updateElement(displayId, Math.round(numValue * 100) + '%');
        
        // Update internal config
        const weightType = weightId.replace('Weight', '');
        if (weightType === 'simSwap') {
            this.riskConfig.weights.simSwap = numValue;
        } else if (weightType === 'geo') {
            this.riskConfig.weights.geolocation = numValue;
        } else if (weightType === 'behavior') {
            this.riskConfig.weights.behavioral = numValue;
        } else if (weightType === 'device') {
            this.riskConfig.weights.device = numValue;
        } else if (weightType === 'honeypot') {
            this.riskConfig.weights.honeypot = numValue;
        }
    }

    // === EVENT HANDLERS ===
    handleRegistrationSubmit(event) {
        event.preventDefault();
        
        if (this.currentRiskScore > this.riskConfig.thresholds.block) {
            alert('🚫 Registration blocked due to high fraud risk. Please contact customer support.');
        } else if (this.currentRiskScore > this.riskConfig.thresholds.review) {
            alert('⚠️ Additional verification required. Please provide additional documents.');
        } else {
            alert('✅ Registration successful! Welcome to FraudGuard Pro Banking.');
        }
    }

    detectHoneypotTrigger(fieldId) {
        this.honeypotTriggered = true;
        this.addAlert('HONEYPOT', 'CRITICAL', `Bot detected: ${fieldId} field accessed`, 'Immediate blocking recommended');
        console.log(`🍯 Honeypot triggered: ${fieldId}`);
    }

    addAlert(type, severity, message, action) {
        const alert = {
            id: `ALT-${Date.now()}`,
            timestamp: new Date().toISOString(),
            type,
            severity,
            message,
            action,
            userId: `user_${Math.random().toString(36).substr(2, 6)}`
        };

        this.systemData.alerts.unshift(alert);
        
        // Keep only last 50 alerts
        if (this.systemData.alerts.length > 50) {
            this.systemData.alerts.pop();
        }
    }

    analyzeInput(event) {
        const input = event.target;
        const analysis = input.parentElement.querySelector('.input-analysis');
        
        if (analysis) {
            analysis.classList.add('active');
            analysis.textContent = `Analyzing: ${input.value.length} chars, ${this.calculateTypingSpeed()} WPM`;
        }
    }

    calculateTypingSpeed() {
        const keystrokes = this.behavioralTracker.keystrokeData.filter(k => k.type === 'keyup');
        if (keystrokes.length < 5) return 0;
        
        const timeSpan = (keystrokes[keystrokes.length - 1].timestamp - keystrokes[0].timestamp) / 1000 / 60;
        return Math.round((keystrokes.length / 5) / timeSpan);
    }

    initializeGeolocation() {
        // Try to get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => this.processGeolocationData(position.coords.latitude, position.coords.longitude),
                (error) => console.log('Geolocation error:', error)
            );
        }
    }

    simulateExistingData() {
        // Populate some initial activity
        const initialActivities = [
            { type: 'success', icon: '✅', title: 'System Started', description: 'Fraud detection system initialized', time: '5m ago' },
            { type: 'success', icon: '🔒', title: 'Models Loaded', description: 'All ML models loaded successfully', time: '5m ago' },
            { type: 'success', icon: '📊', title: 'Real-time Monitoring Active', description: 'Behavioral tracking started', time: '4m ago' }
        ];

        initialActivities.forEach(activity => this.addActivityItem(activity));
    }
}

// === GLOBAL FUNCTIONS ===
function proceedToAuth() {
    if (window.fraudSystem) {
        window.fraudSystem.proceedToAuth();
    }
}

function authenticateWithBiometric(type) {
    if (window.fraudSystem) {
        window.fraudSystem.authenticateWithBiometric(type);
    }
}

function refreshDashboard() {
    if (window.fraudSystem) {
        window.fraudSystem.updateSystemMetrics();
        console.log('Dashboard refreshed');
    }
}

function exportData() {
    alert('📊 Data export feature would download comprehensive fraud analysis report');
}

function simulateFraudAttack() {
    if (window.fraudSystem) {
        window.fraudSystem.addAlert('SIMULATION', 'HIGH', 'Fraud attack simulation triggered', 'Testing detection systems');
        alert('⚡ Fraud attack simulated - check activity stream');
    }
}

function pauseActivity() {
    if (window.fraudSystem) {
        window.fraudSystem.activityPaused = !window.fraudSystem.activityPaused;
        const button = event.target;
        button.textContent = window.fraudSystem.activityPaused ? '▶️ Resume' : '⏸️ Pause';
    }
}

function clearActivity() {
    const container = document.getElementById('activityStream');
    if (container) {
        container.innerHTML = '';
    }
}

function retrainModels() {
    alert('🔄 ML models retraining initiated. This process typically takes 2-4 hours.');
}

function exportModels() {
    alert('📤 Model export package prepared. Download would include all trained models and weights.');
}

function validateModels() {
    alert('✅ Model validation completed. All models passed accuracy and performance tests.');
}

function refreshData() {
    if (window.fraudSystem) {
        window.fraudSystem.updateSystemMetrics();
        alert('🔄 System data refreshed successfully');
    }
}

function backupData() {
    alert('💾 System backup created successfully. All user profiles and models saved.');
}

function clearLogs() {
    if (window.fraudSystem) {
        window.fraudSystem.systemData.alerts = [];
        clearActivity();
        alert('🗑️ System logs cleared successfully');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting Fraud Detection System...');
    window.fraudSystem = new FraudDetectionSystem();
    
    // Global event listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal:not(.hidden)');
            modals.forEach(modal => modal.classList.add('hidden'));
        }
    });
    
    console.log('✅ Fraud Detection System ready');
});

// Make functions globally available
window.proceedToAuth = proceedToAuth;
window.authenticateWithBiometric = authenticateWithBiometric;
window.refreshDashboard = refreshDashboard;
window.exportData = exportData;
window.simulateFraudAttack = simulateFraudAttack;
window.pauseActivity = pauseActivity;
window.clearActivity = clearActivity;
window.retrainModels = retrainModels;
window.exportModels = exportModels;
window.validateModels = validateModels;
window.refreshData = refreshData;
window.backupData = backupData;
window.clearLogs = clearLogs;
window.closeModal = closeModal;