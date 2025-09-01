// Advanced Security Operations Center - Bot Attack Simulation
class AdvancedSecurityDemo {
    constructor() {
        // Local Storage Keys
        this.storageKeys = {
            users: 'soc_users',
            behavioralBaselines: 'soc_behavioral_baselines',
            attackLogs: 'soc_attack_logs',
            loginHistory: 'soc_login_history',
            securityConfig: 'soc_security_config',
            attackStats: 'soc_attack_stats'
        };
        
        // Initialize data from localStorage or defaults
        this.users = this.loadFromStorage(this.storageKeys.users, []);
        this.behavioralBaselines = this.loadFromStorage(this.storageKeys.behavioralBaselines, {});
        this.attackLogs = this.loadFromStorage(this.storageKeys.attackLogs, []);
        this.loginHistory = this.loadFromStorage(this.storageKeys.loginHistory, []);
        this.attackStats = this.loadFromStorage(this.storageKeys.attackStats, this.getDefaultAttackStats());
        
        this.currentUser = null;
        this.attackInProgress = false;
        this.attackInterval = null;
        this.attackTimeoutId = null;
        
        // Attack Types Dictionary
        this.attackTypes = {
            speed_demon: {
                name: "Speed Demon",
                description: "Ultra-fast automated typing (1-2ms intervals)",
                flightTime: [1, 2, 1, 2, 1],
                dwellTime: [1, 1, 2, 1, 1],
                riskLevel: "CRITICAL",
                icon: "⚡",
                userAgent: "SpeedBot/1.0"
            },
            pattern_bot: {
                name: "Pattern Bot", 
                description: "Repeating exact keystroke patterns",
                flightTime: [15, 15, 15, 15, 15],
                dwellTime: [10, 10, 10, 10, 10],
                riskLevel: "HIGH",
                icon: "🔄",
                userAgent: "PatternBot/2.1"
            },
            random_bot: {
                name: "Random Bot",
                description: "Random fast intervals (1-10ms)",
                flightTime: [1, 5, 3, 8, 2, 6, 4],
                dwellTime: [1, 3, 2, 4, 1, 3, 2],
                riskLevel: "HIGH", 
                icon: "🎲",
                userAgent: "RandomBot/1.5"
            },
            stealth_bot: {
                name: "Stealth Bot",
                description: "Mimicking human timing (20-40ms)",
                flightTime: [25, 35, 30, 40, 20],
                dwellTime: [15, 25, 20, 30, 18],
                riskLevel: "MEDIUM",
                icon: "🥷",
                userAgent: "StealthBot/3.0"
            },
            burst_bot: {
                name: "Burst Bot",
                description: "Normal speed with sudden fast bursts",
                flightTime: [120, 130, 2, 1, 3, 140, 110],
                dwellTime: [80, 90, 1, 1, 2, 85, 75],
                riskLevel: "HIGH",
                icon: "💥",
                userAgent: "BurstBot/1.2"
            },
            credential_stuffing: {
                name: "Credential Stuffing",
                description: "Multiple rapid login attempts",
                flightTime: [5, 3, 4, 2, 6],
                dwellTime: [2, 2, 3, 1, 2],
                riskLevel: "CRITICAL",
                icon: "🔑",
                userAgent: "CredentialBot/4.0"
            },
            registration_spam: {
                name: "Registration Spam",
                description: "Multiple rapid registrations",
                flightTime: [8, 6, 7, 5, 9],
                dwellTime: [4, 3, 4, 2, 5],
                riskLevel: "HIGH",
                icon: "📝",
                userAgent: "SpamBot/2.3"
            },
            keyboard_walker: {
                name: "Keyboard Walker",
                description: "Sequential key patterns (qwerty, asdf)",
                flightTime: [8, 8, 8, 8, 8],
                dwellTime: [5, 5, 5, 5, 5],
                riskLevel: "MEDIUM",
                icon: "⌨️",
                userAgent: "KeyWalker/1.1"
            }
        };
        
        // Security Configuration
        this.securityConfig = this.loadFromStorage(this.storageKeys.securityConfig, {
            botDetectionThreshold: 0.8,
            riskScoreHigh: 0.7,
            riskScoreMedium: 0.4,
            autoBlock: true,
            maxFailedAttempts: 3,
            lockoutDuration: 300,
            flightTimeDeviation: 0.3,
            dwellTimeDeviation: 0.3
        });
        
        // Behavioral tracking
        this.keystrokes = [];
        this.currentKeystrokes = [];
        this.lastKeyUp = null;
        
        // Charts
        this.charts = {};
        
        // Simulated IPs and User Agents
        this.simulatedIPs = [
            '192.168.1.100', '10.0.0.50', '172.16.0.25', '203.0.113.45',
            '198.51.100.78', '192.0.2.123', '169.254.1.5', '224.0.0.1'
        ];
        
        this.maliciousUserAgents = [
            'Mozilla/5.0 (compatible; Baiduspider/2.0)',
            'curl/7.68.0', 'Python-urllib/3.9', 'Wget/1.20.3',
            'automated-scanner/1.0', 'exploit-kit/2.1'
        ];
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('Initializing Advanced Security Demo...');
        this.setupEventListeners();
        this.populateAttackTypeSelect();
        this.updateThreatIndicator();
        this.updateDataOverview();
        this.loadSecurityConfig();
        this.checkWebAuthnSupport();
        this.showPage('registration');
        this.initializeCharts();
        console.log('Advanced Security Demo initialized successfully');
    }
    
    // Local Storage Management
    loadFromStorage(key, defaultValue) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Failed to load from storage:', key, error);
            return defaultValue;
        }
    }
    
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to storage:', key, error);
        }
    }
    
    getDefaultAttackStats() {
        return {
            totalAttacks: 0,
            attacksBlocked: 0,
            attacksAllowed: 0,
            attackTypeDistribution: {},
            dailyAttacks: Array(24).fill(0),
            weeklyTrend: Array(7).fill(0)
        };
    }
    
    // Event Listeners Setup
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation - Use more specific event handling
        const navRegister = document.getElementById('nav-register');
        const navLogin = document.getElementById('nav-login');
        const navDashboard = document.getElementById('nav-dashboard');
        const navAttacks = document.getElementById('nav-attacks');
        const navAnalytics = document.getElementById('nav-analytics');
        const navDataManagement = document.getElementById('nav-data-management');
        const navLogout = document.getElementById('nav-logout');
        
        if (navRegister) {
            navRegister.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Register clicked');
                this.showPage('registration');
            });
        }
        
        if (navLogin) {
            navLogin.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Login clicked');
                this.showPage('login');
            });
        }
        
        if (navDashboard) {
            navDashboard.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Dashboard clicked');
                this.showPage('dashboard');
            });
        }
        
        if (navAttacks) {
            navAttacks.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Attacks clicked');
                this.showPage('attacks');
            });
        }
        
        if (navAnalytics) {
            navAnalytics.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Analytics clicked');
                this.showPage('analytics');
            });
        }
        
        if (navDataManagement) {
            navDataManagement.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Data Management clicked');
                this.showPage('data-management');
            });
        }
        
        if (navLogout) {
            navLogout.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation: Logout clicked');
                this.logout();
            });
        }
        
        // Forms
        const registrationForm = document.getElementById('registration-form');
        const loginForm = document.getElementById('login-form');
        
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Registration form submitted');
                this.handleRegistration(e);
            });
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin(e);
            });
        }
        
        // Attack Controls
        const startAttackBtn = document.getElementById('start-attack');
        const stopAttackBtn = document.getElementById('stop-attack');
        const runScenarioBtn = document.getElementById('run-scenario');
        
        if (startAttackBtn) {
            startAttackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Start attack clicked');
                this.startAttack();
            });
        }
        
        if (stopAttackBtn) {
            stopAttackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Stop attack clicked');
                this.stopAttack();
            });
        }
        
        if (runScenarioBtn) {
            runScenarioBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Run scenario clicked');
                this.runScenario();
            });
        }
        
        // Attack Speed Slider
        const attackSpeedSlider = document.getElementById('attack-speed');
        if (attackSpeedSlider) {
            attackSpeedSlider.addEventListener('input', (e) => {
                const speedValue = document.getElementById('speed-value');
                if (speedValue) {
                    speedValue.textContent = e.target.value + 'ms';
                }
            });
        }
        
        // Attack Duration Slider
        const attackDurationSlider = document.getElementById('attack-duration');
        if (attackDurationSlider) {
            attackDurationSlider.addEventListener('input', (e) => {
                const durationValue = document.getElementById('duration-value');
                if (durationValue) {
                    durationValue.textContent = e.target.value + 's';
                }
            });
        }
        
        // Scenario Buttons
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const scenario = e.target.dataset.scenario;
                console.log('Scenario clicked:', scenario);
                this.runSpecificScenario(scenario);
            });
        });
        
        // Attack Log Controls
        const clearLogsBtn = document.getElementById('clear-logs');
        const exportLogsBtn = document.getElementById('export-logs');
        
        if (clearLogsBtn) {
            clearLogsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAttackLogs();
            });
        }
        
        if (exportLogsBtn) {
            exportLogsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportAttackLogs();
            });
        }
        
        // Data Management Controls
        const exportAllDataBtn = document.getElementById('export-all-data');
        const importDataBtn = document.getElementById('import-data');
        const importDataFile = document.getElementById('import-data-file');
        const backupDataBtn = document.getElementById('backup-data');
        const clearAttackLogsBtn = document.getElementById('clear-attack-logs');
        const clearUserDataBtn = document.getElementById('clear-user-data');
        const clearAllDataBtn = document.getElementById('clear-all-data');
        
        if (exportAllDataBtn) {
            exportAllDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportAllData();
            });
        }
        
        if (importDataBtn) {
            importDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (importDataFile) importDataFile.click();
            });
        }
        
        if (importDataFile) {
            importDataFile.addEventListener('change', (e) => this.importData(e));
        }
        
        if (backupDataBtn) {
            backupDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.createBackup();
            });
        }
        
        if (clearAttackLogsBtn) {
            clearAttackLogsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAttackLogs();
            });
        }
        
        if (clearUserDataBtn) {
            clearUserDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearUserData();
            });
        }
        
        if (clearAllDataBtn) {
            clearAllDataBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAllData();
            });
        }
        
        // Configuration Controls
        const saveConfigBtn = document.getElementById('save-config');
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveSecurityConfig();
            });
        }
        
        // Configuration Sliders
        const botThresholdSlider = document.getElementById('bot-threshold');
        if (botThresholdSlider) {
            botThresholdSlider.addEventListener('input', (e) => {
                const botThresholdValue = document.getElementById('bot-threshold-value');
                if (botThresholdValue) {
                    botThresholdValue.textContent = e.target.value;
                }
            });
        }
        
        const riskHighThresholdSlider = document.getElementById('risk-high-threshold');
        if (riskHighThresholdSlider) {
            riskHighThresholdSlider.addEventListener('input', (e) => {
                const riskHighThresholdValue = document.getElementById('risk-high-threshold-value');
                if (riskHighThresholdValue) {
                    riskHighThresholdValue.textContent = e.target.value;
                }
            });
        }
        
        // Modal Controls
        const closeAlertBtn = document.getElementById('close-alert');
        const alertAcknowledgeBtn = document.getElementById('alert-acknowledge');
        
        if (closeAlertBtn) {
            closeAlertBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideAlertModal();
            });
        }
        
        if (alertAcknowledgeBtn) {
            alertAcknowledgeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideAlertModal();
            });
        }
        
        // Behavioral tracking setup
        this.setupBehavioralTracking('reg-username');
        this.setupBehavioralTracking('reg-email');
        this.setupBehavioralTracking('login-username');
        
        console.log('Event listeners setup complete');
    }
    
    populateAttackTypeSelect() {
        const select = document.getElementById('attack-type-select');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select Attack Type</option>';
        
        Object.entries(this.attackTypes).forEach(([key, attack]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${attack.icon} ${attack.name}`;
            select.appendChild(option);
        });
        
        console.log('Attack type select populated');
    }
    
    // Attack Simulation Functions
    startAttack() {
        console.log('Starting attack simulation...');
        
        if (this.attackInProgress) {
            console.log('Attack already in progress');
            return;
        }
        
        const attackType = document.getElementById('attack-type-select')?.value;
        const attackSpeed = parseInt(document.getElementById('attack-speed')?.value || '10');
        const attackIntensity = document.getElementById('attack-intensity')?.value || 'medium';
        const attackDuration = parseInt(document.getElementById('attack-duration')?.value || '30');
        
        if (!attackType) {
            this.showAlert('Attack Configuration Error', 'Please select an attack type first.');
            return;
        }
        
        console.log('Attack parameters:', { attackType, attackSpeed, attackIntensity, attackDuration });
        
        this.attackInProgress = true;
        this.updateAttackStatus('ACTIVE');
        
        // Enable/disable buttons
        const startBtn = document.getElementById('start-attack');
        const stopBtn = document.getElementById('stop-attack');
        
        if (startBtn) startBtn.disabled = true;
        if (stopBtn) stopBtn.disabled = false;
        
        this.runAttackSimulation(attackType, attackSpeed, attackIntensity, attackDuration);
    }
    
    stopAttack() {
        console.log('Stopping attack simulation...');
        
        if (!this.attackInProgress) return;
        
        this.attackInProgress = false;
        this.updateAttackStatus('STOPPED');
        
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }
        
        if (this.attackTimeoutId) {
            clearTimeout(this.attackTimeoutId);
            this.attackTimeoutId = null;
        }
        
        // Enable/disable buttons
        const startBtn = document.getElementById('start-attack');
        const stopBtn = document.getElementById('stop-attack');
        
        if (startBtn) startBtn.disabled = false;
        if (stopBtn) stopBtn.disabled = true;
        
        setTimeout(() => {
            this.updateAttackStatus('IDLE');
        }, 2000);
    }
    
    runAttackSimulation(attackType, speed, intensity, duration) {
        const attack = this.attackTypes[attackType];
        let attackCount = 0;
        const maxAttacks = this.getMaxAttacksForIntensity(intensity);
        const intervalTime = speed;
        
        console.log('Running attack simulation:', { attack: attack.name, maxAttacks, intervalTime });
        
        this.attackInterval = setInterval(() => {
            if (!this.attackInProgress || attackCount >= maxAttacks) {
                this.stopAttack();
                return;
            }
            
            this.simulateAttackAttempt(attackType, attack);
            attackCount++;
            
            // Update real-time stats
            this.updateAttackStats();
            
        }, intervalTime);
        
        // Auto-stop after duration
        this.attackTimeoutId = setTimeout(() => {
            console.log('Attack duration reached, stopping...');
            this.stopAttack();
        }, duration * 1000);
    }
    
    simulateAttackAttempt(attackType, attack) {
        const timestamp = new Date().toISOString();
        const sourceIP = this.getRandomIP();
        const userAgent = attack.userAgent || this.getRandomUserAgent();
        const target = Math.random() > 0.7 ? 'login' : 'registration';
        
        // Simulate behavioral analysis
        const behavioralData = this.generateMockBehavioralData(attack);
        const riskScore = this.calculateAttackRiskScore(behavioralData, attack);
        const isBlocked = riskScore >= this.securityConfig.botDetectionThreshold;
        
        // Log the attack
        const logEntry = {
            timestamp,
            attackType: attack.name,
            target,
            status: isBlocked ? 'BLOCKED' : 'ALLOWED',
            riskScore: Math.round(riskScore * 100),
            sourceIP,
            userAgent,
            riskLevel: this.getRiskLevel(riskScore),
            sessionId: this.generateSessionId(),
            attemptId: Date.now() + Math.random()
        };
        
        this.attackLogs.unshift(logEntry);
        if (this.attackLogs.length > 1000) {
            this.attackLogs = this.attackLogs.slice(0, 1000);
        }
        
        // Update statistics
        this.attackStats.totalAttacks++;
        if (isBlocked) {
            this.attackStats.attacksBlocked++;
        } else {
            this.attackStats.attacksAllowed++;
        }
        
        // Update attack type distribution
        if (!this.attackStats.attackTypeDistribution[attack.name]) {
            this.attackStats.attackTypeDistribution[attack.name] = 0;
        }
        this.attackStats.attackTypeDistribution[attack.name]++;
        
        // Update hourly distribution
        const hour = new Date().getHours();
        this.attackStats.dailyAttacks[hour]++;
        
        // Save to localStorage
        this.saveToStorage(this.storageKeys.attackLogs, this.attackLogs);
        this.saveToStorage(this.storageKeys.attackStats, this.attackStats);
        
        // Update UI
        this.updateAttackLogDisplay();
        this.updateThreatIndicator();
        
        // Show high-risk alert occasionally
        if (riskScore >= this.securityConfig.riskScoreHigh && Math.random() > 0.8) {
            this.showAlert('High-Risk Attack Detected!', 
                `${attack.name} attack with ${Math.round(riskScore * 100)}% risk score from ${sourceIP}`);
        }
    }
    
    generateMockBehavioralData(attack) {
        return {
            flightTimes: attack.flightTime.map(time => time + (Math.random() - 0.5) * 2),
            dwellTimes: attack.dwellTime.map(time => time + (Math.random() - 0.5) * 1),
            typingSpeed: attack.flightTime.reduce((a, b) => a + b, 0) / attack.flightTime.length,
            consistency: attack.riskLevel === 'CRITICAL' ? 0.9 : Math.random() * 0.6
        };
    }
    
    calculateAttackRiskScore(behavioralData, attack) {
        let riskScore = 0;
        
        // Speed analysis
        const avgFlightTime = behavioralData.flightTimes.reduce((a, b) => a + b, 0) / behavioralData.flightTimes.length;
        if (avgFlightTime < 10) riskScore += 0.4;
        else if (avgFlightTime < 30) riskScore += 0.2;
        
        // Consistency analysis
        if (behavioralData.consistency > 0.8) riskScore += 0.3;
        
        // Attack type modifier
        switch (attack.riskLevel) {
            case 'CRITICAL': riskScore += 0.3; break;
            case 'HIGH': riskScore += 0.2; break;
            case 'MEDIUM': riskScore += 0.1; break;
        }
        
        // Random factor for realism
        riskScore += (Math.random() - 0.5) * 0.2;
        
        return Math.max(0, Math.min(1, riskScore));
    }
    
    getMaxAttacksForIntensity(intensity) {
        switch (intensity) {
            case 'low': return 10;
            case 'medium': return 25;
            case 'high': return 50;
            case 'extreme': return 100;
            default: return 10;
        }
    }
    
    getRandomIP() {
        return this.simulatedIPs[Math.floor(Math.random() * this.simulatedIPs.length)];
    }
    
    getRandomUserAgent() {
        return this.maliciousUserAgents[Math.floor(Math.random() * this.maliciousUserAgents.length)];
    }
    
    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substring(2, 15);
    }
    
    getRiskLevel(riskScore) {
        if (riskScore >= this.securityConfig.riskScoreHigh) return 'high';
        if (riskScore >= this.securityConfig.riskScoreMedium) return 'medium';
        return 'low';
    }
    
    // Scenario Functions
    runSpecificScenario(scenarioType) {
        console.log('Running specific scenario:', scenarioType);
        
        const scenarios = {
            credential_stuffing: {
                attackType: 'credential_stuffing',
                speed: 5,
                intensity: 'extreme',
                duration: 30
            },
            registration_spam: {
                attackType: 'registration_spam',
                speed: 8,
                intensity: 'high',
                duration: 45
            },
            session_hijacking: {
                attackType: 'stealth_bot',
                speed: 25,
                intensity: 'medium',
                duration: 20
            }
        };
        
        const scenario = scenarios[scenarioType];
        if (!scenario) {
            console.error('Unknown scenario:', scenarioType);
            return;
        }
        
        // Set controls to scenario values
        const attackTypeSelect = document.getElementById('attack-type-select');
        const attackSpeedSlider = document.getElementById('attack-speed');
        const attackIntensitySelect = document.getElementById('attack-intensity');
        const attackDurationSlider = document.getElementById('attack-duration');
        
        if (attackTypeSelect) attackTypeSelect.value = scenario.attackType;
        if (attackSpeedSlider) attackSpeedSlider.value = scenario.speed;
        if (attackIntensitySelect) attackIntensitySelect.value = scenario.intensity;
        if (attackDurationSlider) attackDurationSlider.value = scenario.duration;
        
        // Update display
        const speedValue = document.getElementById('speed-value');
        const durationValue = document.getElementById('duration-value');
        
        if (speedValue) speedValue.textContent = scenario.speed + 'ms';
        if (durationValue) durationValue.textContent = scenario.duration + 's';
        
        // Start attack
        this.startAttack();
    }
    
    runScenario() {
        const scenarios = ['credential_stuffing', 'registration_spam', 'session_hijacking'];
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        console.log('Running random scenario:', randomScenario);
        this.runSpecificScenario(randomScenario);
    }
    
    // UI Update Functions
    updateAttackStatus(status) {
        const indicator = document.getElementById('attack-status-indicator');
        if (!indicator) return;
        
        indicator.textContent = status;
        indicator.className = 'status-indicator';
        
        if (status === 'ACTIVE') {
            indicator.classList.add('active');
        } else if (status === 'STOPPED') {
            indicator.classList.add('stopped');
        }
        
        console.log('Attack status updated:', status);
    }
    
    updateAttackStats() {
        const attacksAttempted = document.getElementById('attacks-attempted');
        const attacksBlockedCount = document.getElementById('attacks-blocked-count');
        const attackSuccessRate = document.getElementById('attack-success-rate');
        const currentAttackSpeed = document.getElementById('current-attack-speed');
        const attacksBlocked = document.getElementById('attacks-blocked');
        
        if (attacksAttempted) attacksAttempted.textContent = this.attackStats.totalAttacks;
        if (attacksBlockedCount) attacksBlockedCount.textContent = this.attackStats.attacksBlocked;
        
        const successRate = this.attackStats.totalAttacks > 0 
            ? Math.round((this.attackStats.attacksAllowed / this.attackStats.totalAttacks) * 100)
            : 0;
        if (attackSuccessRate) attackSuccessRate.textContent = successRate + '%';
        
        const currentSpeed = document.getElementById('attack-speed')?.value || '0';
        if (currentAttackSpeed) currentAttackSpeed.textContent = currentSpeed + 'ms';
        
        // Update dashboard stats
        if (attacksBlocked) attacksBlocked.textContent = this.attackStats.attacksBlocked;
    }
    
    updateThreatIndicator() {
        const indicator = document.getElementById('threat-indicator');
        const level = document.getElementById('threat-level');
        
        if (!indicator || !level) return;
        
        const recentAttacks = this.attackLogs.filter(log => {
            const logTime = new Date(log.timestamp);
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            return logTime > fiveMinutesAgo;
        });
        
        const highRiskAttacks = recentAttacks.filter(log => log.riskLevel === 'high').length;
        
        let threatLevel = 'LOW';
        let className = '';
        
        if (highRiskAttacks > 5) {
            threatLevel = 'HIGH';
            className = 'high';
        } else if (highRiskAttacks > 2) {
            threatLevel = 'MEDIUM';
            className = 'medium';
        }
        
        level.textContent = threatLevel;
        indicator.className = 'threat-indicator ' + className;
        
        // Update dashboard threat level
        const dashboardThreat = document.getElementById('current-threat-level');
        if (dashboardThreat) {
            dashboardThreat.textContent = threatLevel;
        }
    }
    
    updateAttackLogDisplay() {
        const logContainer = document.getElementById('attack-log');
        if (!logContainer) return;
        
        // Clear existing entries except header
        const existingEntries = logContainer.querySelectorAll('.log-entry');
        existingEntries.forEach(entry => entry.remove());
        
        // Remove empty message if it exists
        const emptyMessage = logContainer.querySelector('.log-empty');
        if (emptyMessage) emptyMessage.remove();
        
        if (this.attackLogs.length === 0) {
            const logHeader = logContainer.querySelector('.log-header');
            if (logHeader) logHeader.remove();
            
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'log-empty';
            emptyDiv.textContent = 'No attack events recorded';
            logContainer.appendChild(emptyDiv);
            return;
        }
        
        // Ensure header exists
        let logHeader = logContainer.querySelector('.log-header');
        if (!logHeader) {
            logHeader = document.createElement('div');
            logHeader.className = 'log-header';
            logHeader.innerHTML = `
                <span>Timestamp</span>
                <span>Attack Type</span>
                <span>Target</span>
                <span>Status</span>
                <span>Risk Score</span>
                <span>Source IP</span>
            `;
            logContainer.appendChild(logHeader);
        }
        
        // Add recent entries (limit to 50 for performance)
        const recentLogs = this.attackLogs.slice(0, 50);
        
        recentLogs.forEach(log => {
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            
            const time = new Date(log.timestamp).toLocaleTimeString();
            
            entry.innerHTML = `
                <span class="log-timestamp">${time}</span>
                <span class="log-attack-type">${log.attackType}</span>
                <span>${log.target}</span>
                <span class="log-status ${log.status.toLowerCase()}">${log.status}</span>
                <span class="log-risk-score ${log.riskLevel}">${log.riskScore}%</span>
                <span>${log.sourceIP}</span>
            `;
            
            logContainer.appendChild(entry);
        });
    }
    
    // Behavioral Tracking (existing functionality)
    setupBehavioralTracking(inputId) {
        const input = document.getElementById(inputId);
        if (!input) {
            console.warn('Input not found for behavioral tracking:', inputId);
            return;
        }
        
        let keydowns = {};
        
        input.addEventListener('keydown', (e) => {
            const now = performance.now();
            keydowns[e.key] = now;
            
            if (this.lastKeyUp && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
                const flightTime = now - this.lastKeyUp;
                this.currentKeystrokes.push({
                    type: 'flight',
                    time: flightTime,
                    key: e.key,
                    timestamp: now
                });
            }
            
            input.classList.add('typing');
        });
        
        input.addEventListener('keyup', (e) => {
            const now = performance.now();
            
            if (keydowns[e.key]) {
                const dwellTime = now - keydowns[e.key];
                this.currentKeystrokes.push({
                    type: 'dwell',
                    time: dwellTime,
                    key: e.key,
                    timestamp: now
                });
                delete keydowns[e.key];
            }
            
            this.lastKeyUp = now;
            this.updateMetricsDisplay(inputId);
            
            setTimeout(() => {
                input.classList.remove('typing');
            }, 200);
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('typing');
        });
        
        console.log('Behavioral tracking setup for:', inputId);
    }
    
    updateMetricsDisplay(inputId) {
        const flightTimes = this.currentKeystrokes.filter(k => k.type === 'flight').map(k => k.time);
        const dwellTimes = this.currentKeystrokes.filter(k => k.type === 'dwell').map(k => k.time);
        
        const avgFlight = flightTimes.length > 0 ? Math.round(flightTimes.reduce((a, b) => a + b, 0) / flightTimes.length) : 0;
        const avgDwell = dwellTimes.length > 0 ? Math.round(dwellTimes.reduce((a, b) => a + b, 0) / dwellTimes.length) : 0;
        
        if (inputId.includes('reg-')) {
            const regFlightAvg = document.getElementById('reg-flight-avg');
            const regDwellAvg = document.getElementById('reg-dwell-avg');
            const regMetrics = document.getElementById('reg-metrics');
            
            if (regFlightAvg) regFlightAvg.textContent = `${avgFlight}ms`;
            if (regDwellAvg) regDwellAvg.textContent = `${avgDwell}ms`;
            if (regMetrics) regMetrics.style.display = flightTimes.length > 0 ? 'block' : 'none';
            
            if (flightTimes.length > 0) {
                this.updateRegistrationChart(flightTimes, dwellTimes);
            }
        } else if (inputId.includes('login-')) {
            const loginFlightCurrent = document.getElementById('login-flight-current');
            const loginDwellCurrent = document.getElementById('login-dwell-current');
            const loginMetrics = document.getElementById('login-metrics');
            
            if (loginFlightCurrent) loginFlightCurrent.textContent = `${avgFlight}ms`;
            if (loginDwellCurrent) loginDwellCurrent.textContent = `${avgDwell}ms`;
            if (loginMetrics) loginMetrics.style.display = flightTimes.length > 0 ? 'block' : 'none';
        }
    }
    
    // Chart Functions
    initializeCharts() {
        this.charts = {};
        console.log('Charts initialized');
    }
    
    updateRegistrationChart(flightTimes, dwellTimes) {
        const ctx = document.getElementById('reg-chart')?.getContext('2d');
        if (!ctx) return;
        
        if (this.charts.registration) {
            this.charts.registration.destroy();
        }
        
        this.charts.registration = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Flight Time Avg', 'Dwell Time Avg'],
                datasets: [{
                    label: 'Timing (ms)',
                    data: [
                        flightTimes.reduce((a, b) => a + b, 0) / flightTimes.length,
                        dwellTimes.reduce((a, b) => a + b, 0) / dwellTimes.length
                    ],
                    backgroundColor: ['#1FB8CD', '#FFC185'],
                    borderColor: ['#1FB8CD', '#FFC185'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Time (ms)' }
                    }
                }
            }
        });
    }
    
    updateAnalyticsCharts() {
        console.log('Updating analytics charts...');
        setTimeout(() => {
            this.updateAttackTypeChart();
            this.updateAttackHeatmapChart();
            this.updateEffectivenessChart();
        }, 100);
    }
    
    updateAttackTypeChart() {
        const ctx = document.getElementById('attack-type-chart')?.getContext('2d');
        if (!ctx) return;
        
        if (this.charts.attackType) {
            this.charts.attackType.destroy();
        }
        
        const labels = Object.keys(this.attackStats.attackTypeDistribution);
        const data = Object.values(this.attackStats.attackTypeDistribution);
        
        if (labels.length === 0) {
            // Show demo data if no attacks yet
            labels.push('No attacks yet');
            data.push(1);
        }
        
        this.charts.attackType = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
    
    updateAttackHeatmapChart() {
        const ctx = document.getElementById('attack-heatmap-chart')?.getContext('2d');
        if (!ctx) return;
        
        if (this.charts.heatmap) {
            this.charts.heatmap.destroy();
        }
        
        const hours = Array.from({length: 24}, (_, i) => i + ':00');
        
        this.charts.heatmap = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Attacks',
                    data: this.attackStats.dailyAttacks,
                    backgroundColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
    
    updateEffectivenessChart() {
        const ctx = document.getElementById('effectiveness-chart')?.getContext('2d');
        if (!ctx) return;
        
        if (this.charts.effectiveness) {
            this.charts.effectiveness.destroy();
        }
        
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        this.charts.effectiveness = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Block Rate %',
                    data: [95, 97, 94, 98, 96, 99, 95],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }
    
    // Authentication Functions (existing)
    checkWebAuthnSupport() {
        if (!window.PublicKeyCredential) {
            this.showError('WebAuthn not supported. This demo requires a modern browser with WebAuthn support.');
            return false;
        }
        return true;
    }
    
    async handleRegistration(e) {
        e.preventDefault();
        console.log('Handling registration...');
        
        const usernameInput = document.getElementById('reg-username');
        const emailInput = document.getElementById('reg-email');
        
        const username = usernameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        
        if (!username || !email) {
            this.showError('Please fill in all fields');
            return;
        }
        
        if (this.users.find(user => user.username === username)) {
            this.showError('Username already exists');
            return;
        }
        
        if (this.currentKeystrokes.length === 0) {
            this.showError('Please type in the fields to capture behavioral baseline');
            return;
        }
        
        try {
            this.showLoadingModal('Creating Account', 'Please follow the biometric prompts...');
            
            await this.simulateWebAuthnRegistration(username);
            const baseline = this.calculateBehavioralBaseline();
            
            const user = {
                id: Date.now().toString(),
                username,
                email,
                createdAt: new Date().toISOString(),
                publicKey: this.generateMockPublicKey(),
                credentialId: this.generateMockCredentialId()
            };
            
            this.users.push(user);
            this.behavioralBaselines[user.id] = baseline;
            
            // Save to localStorage
            this.saveToStorage(this.storageKeys.users, this.users);
            this.saveToStorage(this.storageKeys.behavioralBaselines, this.behavioralBaselines);
            
            this.hideLoadingModal();
            this.showSuccess('Account created successfully! You can now log in.');
            
            // Reset form
            if (usernameInput) usernameInput.value = '';
            if (emailInput) emailInput.value = '';
            this.currentKeystrokes = [];
            this.updateMetricsDisplay('reg-username');
            
            setTimeout(() => {
                this.showPage('login');
                const loginUsernameInput = document.getElementById('login-username');
                if (loginUsernameInput) loginUsernameInput.value = username;
            }, 2000);
            
        } catch (error) {
            this.hideLoadingModal();
            this.showError('Registration failed: ' + error.message);
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        console.log('Handling login...');
        
        const usernameInput = document.getElementById('login-username');
        const username = usernameInput?.value.trim() || '';
        
        if (!username) {
            this.showError('Please enter your username');
            return;
        }
        
        const user = this.users.find(u => u.username === username);
        if (!user) {
            this.showError('User not found');
            return;
        }
        
        if (this.currentKeystrokes.length === 0) {
            this.showError('Please type your username to capture behavioral data');
            return;
        }
        
        try {
            this.showLoadingModal('Authenticating', 'Please complete the biometric authentication...');
            
            await this.simulateWebAuthnAuthentication(user);
            
            const currentMetrics = this.calculateCurrentMetrics();
            const baselineMetrics = this.behavioralBaselines[user.id];
            const riskScore = this.calculateRiskScore(currentMetrics, baselineMetrics);
            
            this.hideLoadingModal();
            
            this.displayBehavioralAnalysis(currentMetrics, baselineMetrics, riskScore);
            this.logLoginAttempt(user, riskScore);
            
            if (riskScore >= this.securityConfig.riskScoreHigh) {
                this.showWarning(`Authentication successful but high risk detected (${Math.round(riskScore * 100)}% risk score). Additional verification may be required.`);
            } else if (riskScore >= this.securityConfig.riskScoreMedium) {
                this.showWarning(`Authentication successful with moderate risk (${Math.round(riskScore * 100)}% risk score).`);
            } else {
                this.showSuccess('Authentication successful! Low risk detected.');
            }
            
            this.currentUser = user;
            this.updateNavigation(true);
            
            setTimeout(() => {
                this.showPage('dashboard');
                this.populateDashboard();
            }, 3000);
            
        } catch (error) {
            this.hideLoadingModal();
            this.showError('Authentication failed: ' + error.message);
        }
    }
    
    displayBehavioralAnalysis(currentMetrics, baselineMetrics, riskScore) {
        const loginFlightCurrent = document.getElementById('login-flight-current');
        const loginDwellCurrent = document.getElementById('login-dwell-current');
        const loginFlightBaseline = document.getElementById('login-flight-baseline');
        const loginDwellBaseline = document.getElementById('login-dwell-baseline');
        
        if (loginFlightCurrent) loginFlightCurrent.textContent = `${currentMetrics.avgFlight}ms`;
        if (loginDwellCurrent) loginDwellCurrent.textContent = `${currentMetrics.avgDwell}ms`;
        if (loginFlightBaseline) loginFlightBaseline.textContent = `${baselineMetrics.avgFlight}ms`;
        if (loginDwellBaseline) loginDwellBaseline.textContent = `${baselineMetrics.avgDwell}ms`;
        
        const riskPercentage = Math.round(riskScore * 100);
        const riskValueElement = document.getElementById('risk-score-value');
        const riskFillElement = document.getElementById('risk-fill');
        
        if (riskValueElement) {
            riskValueElement.textContent = `${riskPercentage}%`;
            riskValueElement.classList.add('animate');
        }
        
        if (riskFillElement) {
            riskFillElement.style.width = `${riskPercentage}%`;
            riskFillElement.className = 'risk-fill';
            
            if (riskScore >= this.securityConfig.riskScoreHigh) {
                riskFillElement.classList.add('high');
                if (riskValueElement) riskValueElement.style.color = 'var(--color-error)';
            } else if (riskScore >= this.securityConfig.riskScoreMedium) {
                riskFillElement.classList.add('medium');
                if (riskValueElement) riskValueElement.style.color = 'var(--color-warning)';
            } else {
                riskFillElement.classList.add('low');
                if (riskValueElement) riskValueElement.style.color = 'var(--color-success)';
            }
        }
        
        const loginMetrics = document.getElementById('login-metrics');
        if (loginMetrics) loginMetrics.style.display = 'block';
        
        this.updateLoginChart(currentMetrics, baselineMetrics, riskScore);
    }
    
    updateLoginChart(currentMetrics, baselineMetrics, riskScore) {
        const ctx = document.getElementById('login-chart')?.getContext('2d');
        if (!ctx) return;
        
        if (this.charts.login) {
            this.charts.login.destroy();
        }
        
        this.charts.login = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Flight Time', 'Dwell Time'],
                datasets: [
                    {
                        label: 'Current',
                        data: [currentMetrics.avgFlight, currentMetrics.avgDwell],
                        backgroundColor: ['#1FB8CD', '#FFC185'],
                        borderColor: ['#1FB8CD', '#FFC185'],
                        borderWidth: 1
                    },
                    {
                        label: 'Baseline',
                        data: [baselineMetrics.avgFlight, baselineMetrics.avgDwell],
                        backgroundColor: ['rgba(31, 184, 205, 0.3)', 'rgba(255, 193, 133, 0.3)'],
                        borderColor: ['#1FB8CD', '#FFC185'],
                        borderWidth: 1,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: true, text: `Risk Score: ${Math.round(riskScore * 100)}%` }
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Time (ms)' } }
                }
            }
        });
    }
    
    calculateBehavioralBaseline() {
        const flightTimes = this.currentKeystrokes.filter(k => k.type === 'flight').map(k => k.time);
        const dwellTimes = this.currentKeystrokes.filter(k => k.type === 'dwell').map(k => k.time);
        
        return {
            avgFlight: Math.round(flightTimes.reduce((a, b) => a + b, 0) / flightTimes.length) || 0,
            avgDwell: Math.round(dwellTimes.reduce((a, b) => a + b, 0) / dwellTimes.length) || 0,
            flightStdDev: this.calculateStandardDeviation(flightTimes),
            dwellStdDev: this.calculateStandardDeviation(dwellTimes)
        };
    }
    
    calculateCurrentMetrics() {
        const flightTimes = this.currentKeystrokes.filter(k => k.type === 'flight').map(k => k.time);
        const dwellTimes = this.currentKeystrokes.filter(k => k.type === 'dwell').map(k => k.time);
        
        return {
            avgFlight: Math.round(flightTimes.reduce((a, b) => a + b, 0) / flightTimes.length) || 0,
            avgDwell: Math.round(dwellTimes.reduce((a, b) => a + b, 0) / dwellTimes.length) || 0
        };
    }
    
    calculateRiskScore(current, baseline) {
        const flightDeviation = Math.abs(baseline.avgFlight - current.avgFlight) / baseline.avgFlight;
        const dwellDeviation = Math.abs(baseline.avgDwell - current.avgDwell) / baseline.avgDwell;
        
        const riskScore = (flightDeviation * 0.6) + (dwellDeviation * 0.4);
        return Math.min(riskScore, 1.0);
    }
    
    calculateStandardDeviation(values) {
        if (values.length === 0) return 0;
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
        return Math.sqrt(variance);
    }
    
    logLoginAttempt(user, riskScore) {
        const attempt = {
            userId: user.id,
            username: user.username,
            timestamp: new Date().toISOString(),
            riskScore: riskScore,
            success: true,
            riskLevel: riskScore >= this.securityConfig.riskScoreHigh ? 'high' : 
                      riskScore >= this.securityConfig.riskScoreMedium ? 'medium' : 'low'
        };
        
        this.loginHistory.unshift(attempt);
        if (this.loginHistory.length > 10) {
            this.loginHistory = this.loginHistory.slice(0, 10);
        }
        
        this.saveToStorage(this.storageKeys.loginHistory, this.loginHistory);
    }
    
    async simulateWebAuthnRegistration(username) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({
                        credentialId: this.generateMockCredentialId(),
                        publicKey: this.generateMockPublicKey()
                    });
                } else {
                    reject(new Error('User cancelled authentication or device not available'));
                }
            }, 2000);
        });
    }
    
    async simulateWebAuthnAuthentication(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) {
                    resolve({
                        credentialId: user.credentialId,
                        signature: this.generateMockSignature()
                    });
                } else {
                    reject(new Error('Authentication failed or cancelled'));
                }
            }, 1500);
        });
    }
    
    generateMockCredentialId() {
        return 'credential_' + Math.random().toString(36).substring(2, 15);
    }
    
    generateMockPublicKey() {
        return 'pubkey_' + Math.random().toString(36).substring(2, 25);
    }
    
    generateMockSignature() {
        return 'signature_' + Math.random().toString(36).substring(2, 20);
    }
    
    // Dashboard Functions
    populateDashboard() {
        if (!this.currentUser) return;
        
        const user = this.currentUser;
        const baseline = this.behavioralBaselines[user.id];
        
        const profileUsername = document.getElementById('profile-username');
        const profileEmail = document.getElementById('profile-email');
        const profileCreated = document.getElementById('profile-created');
        const baselineFlight = document.getElementById('baseline-flight');
        const baselineDwell = document.getElementById('baseline-dwell');
        const baselinePattern = document.getElementById('baseline-pattern');
        
        if (profileUsername) profileUsername.textContent = user.username;
        if (profileEmail) profileEmail.textContent = user.email;
        if (profileCreated) profileCreated.textContent = new Date(user.createdAt).toLocaleDateString();
        
        if (baselineFlight) baselineFlight.textContent = `${baseline.avgFlight}ms`;
        if (baselineDwell) baselineDwell.textContent = `${baseline.avgDwell}ms`;
        if (baselinePattern) baselinePattern.textContent = this.getTypingPatternDescription(baseline);
        
        this.updateDashboardChart(baseline);
        this.populateLoginHistory();
    }
    
    updateDashboardChart(baselineMetrics) {
        const ctx = document.getElementById('baseline-chart')?.getContext('2d');
        if (!ctx) return;
        
        if (this.charts.dashboard) {
            this.charts.dashboard.destroy();
        }
        
        this.charts.dashboard = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
                datasets: [{
                    label: 'Flight Time Trend',
                    data: [
                        baselineMetrics.avgFlight + 10,
                        baselineMetrics.avgFlight + 5,
                        baselineMetrics.avgFlight - 2,
                        baselineMetrics.avgFlight,
                        baselineMetrics.avgFlight + 3,
                        baselineMetrics.avgFlight - 1,
                        baselineMetrics.avgFlight
                    ],
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, title: { display: true, text: 'Time (ms)' } }
                }
            }
        });
    }
    
    populateLoginHistory() {
        const historyContainer = document.getElementById('login-history');
        if (!historyContainer) return;
        
        historyContainer.innerHTML = '';
        
        if (this.loginHistory.length === 0) {
            historyContainer.innerHTML = '<p class="text-secondary">No login history available</p>';
            return;
        }
        
        this.loginHistory.forEach(attempt => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const riskBadgeClass = `risk-${attempt.riskLevel}`;
            const riskText = attempt.riskLevel.charAt(0).toUpperCase() + attempt.riskLevel.slice(1) + ' Risk';
            const timeAgo = this.getTimeAgo(new Date(attempt.timestamp));
            
            historyItem.innerHTML = `
                <div class="history-info">
                    <strong>Login Attempt</strong>
                    <span class="history-time">${timeAgo}</span>
                </div>
                <span class="status status--success">Success</span>
                <span class="risk-badge ${riskBadgeClass}">${riskText}</span>
            `;
            
            historyContainer.appendChild(historyItem);
        });
    }
    
    getTypingPatternDescription(baseline) {
        if (baseline.avgFlight < 100) return 'Fast Typist';
        if (baseline.avgFlight < 150) return 'Average Typist';
        return 'Deliberate Typist';
    }
    
    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
    
    // Data Management Functions
    updateDataOverview() {
        const totalUsers = document.getElementById('total-users');
        const totalAttacks = document.getElementById('total-attacks');
        const storageUsed = document.getElementById('storage-used');
        const overallBlockRate = document.getElementById('overall-block-rate');
        
        if (totalUsers) totalUsers.textContent = this.users.length;
        if (totalAttacks) totalAttacks.textContent = this.attackLogs.length;
        
        // Calculate storage usage
        const storageSize = this.calculateStorageSize();
        if (storageUsed) storageUsed.textContent = (storageSize / 1024).toFixed(1) + ' KB';
        
        // Update effectiveness stats
        if (this.attackStats.totalAttacks > 0) {
            const blockRate = Math.round((this.attackStats.attacksBlocked / this.attackStats.totalAttacks) * 100);
            if (overallBlockRate) overallBlockRate.textContent = blockRate + '%';
        }
    }
    
    calculateStorageSize() {
        let totalSize = 0;
        Object.values(this.storageKeys).forEach(key => {
            const data = localStorage.getItem(key);
            if (data) totalSize += data.length;
        });
        return totalSize;
    }
    
    exportAllData() {
        const data = {
            users: this.users,
            behavioralBaselines: this.behavioralBaselines,
            attackLogs: this.attackLogs,
            loginHistory: this.loginHistory,
            attackStats: this.attackStats,
            securityConfig: this.securityConfig,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `soc-data-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showSuccess('Data exported successfully!');
    }
    
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.users) this.users = data.users;
                if (data.behavioralBaselines) this.behavioralBaselines = data.behavioralBaselines;
                if (data.attackLogs) this.attackLogs = data.attackLogs;
                if (data.loginHistory) this.loginHistory = data.loginHistory;
                if (data.attackStats) this.attackStats = data.attackStats;
                if (data.securityConfig) this.securityConfig = data.securityConfig;
                
                // Save to localStorage
                this.saveToStorage(this.storageKeys.users, this.users);
                this.saveToStorage(this.storageKeys.behavioralBaselines, this.behavioralBaselines);
                this.saveToStorage(this.storageKeys.attackLogs, this.attackLogs);
                this.saveToStorage(this.storageKeys.loginHistory, this.loginHistory);
                this.saveToStorage(this.storageKeys.attackStats, this.attackStats);
                this.saveToStorage(this.storageKeys.securityConfig, this.securityConfig);
                
                this.updateDataOverview();
                this.loadSecurityConfig();
                this.showSuccess('Data imported successfully!');
                
            } catch (error) {
                this.showError('Failed to import data: Invalid JSON format');
            }
        };
        reader.readAsText(file);
    }
    
    createBackup() {
        this.exportAllData();
    }
    
    clearAttackLogs() {
        if (confirm('Are you sure you want to clear all attack logs? This action cannot be undone.')) {
            this.attackLogs = [];
            this.attackStats = this.getDefaultAttackStats();
            
            this.saveToStorage(this.storageKeys.attackLogs, this.attackLogs);
            this.saveToStorage(this.storageKeys.attackStats, this.attackStats);
            
            this.updateAttackLogDisplay();
            this.updateDataOverview();
            this.showSuccess('Attack logs cleared successfully!');
        }
    }
    
    clearUserData() {
        if (confirm('Are you sure you want to clear all user data? This will log you out and remove all registered users.')) {
            this.users = [];
            this.behavioralBaselines = {};
            this.loginHistory = [];
            this.currentUser = null;
            
            this.saveToStorage(this.storageKeys.users, this.users);
            this.saveToStorage(this.storageKeys.behavioralBaselines, this.behavioralBaselines);
            this.saveToStorage(this.storageKeys.loginHistory, this.loginHistory);
            
            this.updateNavigation(false);
            this.updateDataOverview();
            this.showPage('registration');
            this.showSuccess('User data cleared successfully!');
        }
    }
    
    clearAllData() {
        if (confirm('Are you sure you want to clear ALL data? This will remove everything and cannot be undone.')) {
            // Clear all localStorage
            Object.values(this.storageKeys).forEach(key => {
                localStorage.removeItem(key);
            });
            
            // Reset all data
            this.users = [];
            this.behavioralBaselines = {};
            this.attackLogs = [];
            this.loginHistory = [];
            this.attackStats = this.getDefaultAttackStats();
            this.securityConfig = {
                botDetectionThreshold: 0.8,
                riskScoreHigh: 0.7,
                riskScoreMedium: 0.4,
                autoBlock: true,
                maxFailedAttempts: 3,
                lockoutDuration: 300,
                flightTimeDeviation: 0.3,
                dwellTimeDeviation: 0.3
            };
            this.currentUser = null;
            
            this.updateNavigation(false);
            this.updateDataOverview();
            this.loadSecurityConfig();
            this.showPage('registration');
            this.showSuccess('All data cleared successfully!');
        }
    }
    
    exportAttackLogs() {
        if (this.attackLogs.length === 0) {
            this.showError('No attack logs to export');
            return;
        }
        
        const csvHeaders = ['Timestamp', 'Attack Type', 'Target', 'Status', 'Risk Score', 'Source IP', 'User Agent', 'Session ID'];
        const csvRows = this.attackLogs.map(log => [
            log.timestamp,
            log.attackType,
            log.target,
            log.status,
            log.riskScore + '%',
            log.sourceIP,
            log.userAgent || '',
            log.sessionId || ''
        ]);
        
        const csv = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attack-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showSuccess('Attack logs exported successfully!');
    }
    
    // Configuration Management
    loadSecurityConfig() {
        const botThreshold = document.getElementById('bot-threshold');
        const botThresholdValue = document.getElementById('bot-threshold-value');
        const riskHighThreshold = document.getElementById('risk-high-threshold');
        const riskHighThresholdValue = document.getElementById('risk-high-threshold-value');
        const autoBlock = document.getElementById('auto-block');
        const maxFailedAttempts = document.getElementById('max-failed-attempts');
        const lockoutDuration = document.getElementById('lockout-duration');
        
        if (botThreshold) botThreshold.value = this.securityConfig.botDetectionThreshold;
        if (botThresholdValue) botThresholdValue.textContent = this.securityConfig.botDetectionThreshold;
        if (riskHighThreshold) riskHighThreshold.value = this.securityConfig.riskScoreHigh;
        if (riskHighThresholdValue) riskHighThresholdValue.textContent = this.securityConfig.riskScoreHigh;
        if (autoBlock) autoBlock.checked = this.securityConfig.autoBlock;
        if (maxFailedAttempts) maxFailedAttempts.value = this.securityConfig.maxFailedAttempts;
        if (lockoutDuration) lockoutDuration.value = this.securityConfig.lockoutDuration;
    }
    
    saveSecurityConfig() {
        const botThreshold = document.getElementById('bot-threshold');
        const riskHighThreshold = document.getElementById('risk-high-threshold');
        const autoBlock = document.getElementById('auto-block');
        const maxFailedAttempts = document.getElementById('max-failed-attempts');
        const lockoutDuration = document.getElementById('lockout-duration');
        
        this.securityConfig = {
            botDetectionThreshold: parseFloat(botThreshold?.value || '0.8'),
            riskScoreHigh: parseFloat(riskHighThreshold?.value || '0.7'),
            riskScoreMedium: this.securityConfig.riskScoreMedium,
            autoBlock: autoBlock?.checked || true,
            maxFailedAttempts: parseInt(maxFailedAttempts?.value || '3'),
            lockoutDuration: parseInt(lockoutDuration?.value || '300'),
            flightTimeDeviation: this.securityConfig.flightTimeDeviation,
            dwellTimeDeviation: this.securityConfig.dwellTimeDeviation
        };
        
        this.saveToStorage(this.storageKeys.securityConfig, this.securityConfig);
        this.showSuccess('Security configuration saved successfully!');
    }
    
    // Page Navigation
    showPage(pageId) {
        console.log('Showing page:', pageId);
        
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
        } else {
            console.error('Page not found:', `${pageId}-page`);
            return;
        }
        
        this.clearMessages();
        this.currentKeystrokes = [];
        this.lastKeyUp = null;
        
        // Page-specific actions
        if (pageId === 'analytics') {
            setTimeout(() => this.updateAnalyticsCharts(), 100);
        } else if (pageId === 'data-management') {
            this.updateDataOverview();
        } else if (pageId === 'attacks') {
            this.updateAttackLogDisplay();
        }
        
        // Reset metrics displays
        if (pageId === 'registration') {
            const regMetrics = document.getElementById('reg-metrics');
            if (regMetrics) regMetrics.style.display = 'none';
        } else if (pageId === 'login') {
            const loginMetrics = document.getElementById('login-metrics');
            if (loginMetrics) loginMetrics.style.display = 'none';
        }
    }
    
    updateNavigation(isLoggedIn) {
        const navRegister = document.getElementById('nav-register');
        const navLogin = document.getElementById('nav-login');
        const navDashboard = document.getElementById('nav-dashboard');
        const navLogout = document.getElementById('nav-logout');
        
        if (navRegister) navRegister.style.display = isLoggedIn ? 'none' : 'inline-block';
        if (navLogin) navLogin.style.display = isLoggedIn ? 'none' : 'inline-block';
        if (navDashboard) navDashboard.style.display = isLoggedIn ? 'inline-block' : 'none';
        if (navLogout) navLogout.style.display = isLoggedIn ? 'inline-block' : 'none';
    }
    
    logout() {
        this.currentUser = null;
        this.updateNavigation(false);
        this.showPage('registration');
        this.showSuccess('Logged out successfully');
    }
    
    // Modal Functions
    showLoadingModal(title, subtitle) {
        const loadingText = document.getElementById('loading-text');
        const loadingSubtext = document.getElementById('loading-subtext');
        const loadingModal = document.getElementById('loading-modal');
        
        if (loadingText) loadingText.textContent = title;
        if (loadingSubtext) loadingSubtext.textContent = subtitle;
        if (loadingModal) loadingModal.classList.remove('hidden');
    }
    
    hideLoadingModal() {
        const loadingModal = document.getElementById('loading-modal');
        if (loadingModal) loadingModal.classList.add('hidden');
    }
    
    showAlert(title, message) {
        const alertTitle = document.getElementById('alert-title');
        const alertMessage = document.getElementById('alert-message');
        const alertModal = document.getElementById('alert-modal');
        
        if (alertTitle) alertTitle.textContent = title;
        if (alertMessage) alertMessage.textContent = message;
        if (alertModal) alertModal.classList.remove('hidden');
    }
    
    hideAlertModal() {
        const alertModal = document.getElementById('alert-modal');
        if (alertModal) alertModal.classList.add('hidden');
    }
    
    // Message Functions
    showSuccess(message) {
        this.showMessage(message, 'success');
    }
    
    showError(message) {
        this.showMessage(message, 'error');
    }
    
    showWarning(message) {
        this.showMessage(message, 'warning');
    }
    
    showMessage(message, type) {
        const activePage = document.querySelector('.page[style*="block"]');
        const statusElement = activePage?.querySelector('.status-message');
        
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-message ${type}`;
            statusElement.style.display = 'block';
            
            if (type === 'success') {
                setTimeout(() => {
                    statusElement.style.display = 'none';
                }, 5000);
            }
        }
    }
    
    clearMessages() {
        document.querySelectorAll('.status-message').forEach(el => {
            el.style.display = 'none';
        });
    }
}

// Initialize the Advanced Security Demo when the page loads
new AdvancedSecurityDemo();