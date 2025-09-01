// Advanced Bot Authentication Testing Platform - Main Application
class AdvancedBotAuthTester {
    constructor() {
        // Extended application data from JSON
        this.data = {
            extendedPasswords: ["password", "123456", "password123", "admin", "qwerty", "letmein", "welcome", "monkey", "1234567890", "password1", "abc123", "Password1", "admin123", "root", "toor", "12345678", "passw0rd", "administrator", "guest", "test", "user", "login", "pass", "1234", "0000", "password!", "P@ssw0rd", "changeme", "default", "secret", "123123", "password12", "admin1", "pass123", "root123", "temp", "demo", "guest123", "user123", "test123", "manager", "service", "support", "backup", "public", "web", "mail", "email", "operator", "sa", "supervisor", "testuser", "demouser", "guestuser", "newuser", "tempuser", "webuser", "mailuser", "serviceuser", "backupuser", "publicuser", "anonymous", "ftp", "www", "http", "https", "ssl", "secure", "login123", "admin12", "password!!", "P@ssw0rd1", "Password123", "Admin123", "Root123", "Test123", "User123", "Guest123", "Demo123", "Temp123", "Service123", "Support123", "Manager123", "Operator123", "Supervisor123", "Backup123", "Public123", "Web123", "Mail123", "Email123", "Ftp123", "Www123", "Http123", "Https123", "Ssl123", "Secure123", "welcome1", "welcome123", "Welcome1", "Welcome123", "monkey1", "monkey123", "Monkey1", "Monkey123", "qwerty1", "qwerty123", "Qwerty1", "Qwerty123", "letmein1", "letmein123", "Letmein1", "Letmein123", "shadow", "master", "dragon", "ninja", "secret1", "secret123", "Secret1", "Secret123", "1q2w3e", "1q2w3e4r", "qwertyuiop", "asdfghjkl", "zxcvbnm", "1qaz2wsx", "password2", "password3", "password4", "password5", "admin2", "admin3", "admin4", "admin5", "root2", "root3", "root4", "root5", "test2", "test3", "test4", "test5", "user2", "user3", "user4", "user5", "guest2", "guest3", "guest4", "guest5", "demo2", "demo3", "demo4", "demo5", "temp2", "temp3", "temp4", "temp5", "service2", "service3", "service4", "service5", "support2", "support3", "support4", "support5", "manager2", "manager3", "manager4", "manager5", "operator2", "operator3", "operator4", "operator5", "supervisor2", "supervisor3", "supervisor4", "supervisor5", "backup2", "backup3", "backup4", "backup5", "public2", "public3", "public4", "public5", "web2", "web3", "web4", "web5", "mail2", "mail3", "mail4", "mail5", "email2", "email3", "email4", "email5", "ftp2", "ftp3", "ftp4", "ftp5", "www2", "www3", "www4", "www5", "http2", "http3", "http4", "http5", "https2", "https3", "https4", "https5", "ssl2", "ssl3", "ssl4", "ssl5", "secure2", "secure3", "secure4", "secure5"],
            
            extendedUsernames: ["admin", "administrator", "root", "user", "test", "guest", "demo", "sa", "operator", "manager", "support", "service", "web", "www", "mail", "email", "admin1", "administrator1", "testuser", "backup", "temp", "public", "anonymous", "ftp", "webmaster", "postmaster", "hostmaster", "ftpuser", "wwwuser", "httpd", "apache", "nginx", "tomcat", "mysql", "postgres", "oracle", "mssql", "db2", "sybase", "informix", "mongodb", "redis", "elasticsearch", "solr", "cassandra", "couchdb", "riak", "neo4j", "influxdb", "prometheus", "grafana", "kibana", "logstash", "filebeat", "metricbeat", "heartbeat", "packetbeat", "auditbeat", "journalbeat", "winlogbeat", "functionbeat", "jenkins", "gitlab", "bitbucket", "jira", "confluence", "bamboo", "crucible", "fisheye", "crowd", "stash", "nexus", "artifactory", "sonar", "fortify", "checkmarx", "veracode", "blackduck", "whitesource", "snyk", "twistlock", "aqua", "prisma", "falco", "sysdig", "datadog", "newrelic", "appdynamics", "dynatrace", "splunk", "sumologic", "loggly", "papertrail", "logentries", "honeycomb", "lightstep", "jaeger", "zipkin", "opencensus", "opentracing", "aws", "azure", "gcp", "digitalocean", "linode", "vultr", "hetzner", "ovh", "scaleway", "upcloud", "cloudflare", "fastly", "maxcdn", "keycdn", "stackpath", "bunnycdn", "jsdelivr", "unpkg", "cdnjs", "bootstrap", "jquery", "react", "angular", "vue", "ember", "backbone", "knockout", "meteor", "express", "koa", "hapi", "fastify", "nest", "laravel", "symfony", "codeigniter", "cakephp", "zend", "yii", "phalcon", "slim", "silex", "lumen", "django", "flask", "tornado", "bottle", "cherrypy", "pyramid", "turbogears", "web2py", "rails", "sinatra", "padrino", "hanami", "roda", "cuba", "camping", "ramaze", "merb", "spring", "struts", "jsf", "gwt", "wicket", "tapestry", "grails", "play", "akka", "vertx", "ratpack", "spark", "javalin", "micronaut", "quarkus", "helidon", "asp", "mvc", "webapi", "core", "blazor", "xamarin", "unity", "godot", "unreal", "cryengine", "lumberyard", "gamemaker", "construct", "defold", "corona", "solar2d", "love2d", "pico8", "tic80", "lexaloffle", "zachtronics", "factorio", "kerbal", "minecraft", "roblox", "fortnite", "pubg", "valorant", "csgo", "dota", "lol", "wow", "ffxiv", "gw2", "eso", "swtor", "eve", "elite", "nms", "subnautica", "terraria", "starbound", "rimworld", "dwarf", "prison", "cities", "simcity", "civilization", "crusader", "europa", "hearts", "total", "warhammer", "age", "command", "starcraft", "warcraft", "diablo", "overwatch", "hearthstone", "heroes", "hots"],
            
            attackModes: [
                {"id": "spray", "name": "Password Spray", "description": "Try common passwords against multiple accounts", "complexity": "Medium", "detection_risk": "High"},
                {"id": "stuffing", "name": "Credential Stuffing", "description": "Use known username:password combinations", "complexity": "Low", "detection_risk": "Medium"},
                {"id": "brute", "name": "Brute Force", "description": "Try many passwords against single account", "complexity": "High", "detection_risk": "Very High"},
                {"id": "dictionary", "name": "Dictionary Attack", "description": "Use dictionary words with common patterns", "complexity": "Medium", "detection_risk": "High"},
                {"id": "hybrid", "name": "Hybrid Attack", "description": "Combine multiple attack strategies", "complexity": "Very High", "detection_risk": "Variable"},
                {"id": "custom", "name": "Custom Pattern", "description": "User-defined attack patterns", "complexity": "Variable", "detection_risk": "Variable"},
                {"id": "rainbow", "name": "Rainbow Table", "description": "Use precomputed hash tables", "complexity": "Low", "detection_risk": "Low"},
                {"id": "mask", "name": "Mask Attack", "description": "Try passwords matching specific patterns", "complexity": "High", "detection_risk": "Medium"}
            ],
            
            detectionTechniques: [
                {"name": "Behavioral Analysis", "effectiveness": 95, "complexity": "High", "description": "Analyzes user interaction patterns"},
                {"name": "Rate Limiting", "effectiveness": 70, "complexity": "Low", "description": "Limits request frequency"},
                {"name": "CAPTCHA", "effectiveness": 85, "complexity": "Medium", "description": "Challenges automated behavior"},
                {"name": "Device Fingerprinting", "effectiveness": 80, "complexity": "Medium", "description": "Identifies unique device characteristics"},
                {"name": "Honeypots", "effectiveness": 75, "complexity": "Medium", "description": "Trap elements only bots interact with"},
                {"name": "Machine Learning", "effectiveness": 90, "complexity": "Very High", "description": "AI-powered pattern recognition"},
                {"name": "Biometric Analysis", "effectiveness": 98, "complexity": "Very High", "description": "Analyzes biological patterns"}
            ],
            
            evasionTechniques: [
                {"name": "Timing Randomization", "effectiveness": 60, "complexity": "Low", "description": "Randomize request intervals"},
                {"name": "User Agent Rotation", "effectiveness": 40, "complexity": "Low", "description": "Rotate browser identification"},
                {"name": "Proxy Rotation", "effectiveness": 85, "complexity": "Medium", "description": "Change IP addresses"},
                {"name": "Mouse Simulation", "effectiveness": 90, "complexity": "High", "description": "Simulate human mouse movements"},
                {"name": "CAPTCHA Solving", "effectiveness": 95, "complexity": "Very High", "description": "Automated CAPTCHA solutions"},
                {"name": "Browser Automation", "effectiveness": 80, "complexity": "High", "description": "Use real browser instances"},
                {"name": "AI Assistance", "effectiveness": 95, "complexity": "Very High", "description": "AI-powered human mimicry"}
            ]
        };

        // Application state
        this.state = {
            currentTab: 'dashboard',
            isAttacking: false,
            isPaused: false,
            attackStartTime: null,
            currentAttempt: 0,
            successCount: 0,
            failedCount: 0,
            detectionProbability: 25,
            successfulCredentials: [],
            attackHistory: [],
            targets: [
                { id: 1, url: 'https://demo.testfire.net/login.jsp', name: 'Demo Target', type: 'web', status: 'ready' }
            ],
            favorites: [],
            recentCredentials: [],
            attackInterval: null,
            charts: {}
        };

        // Configuration
        this.config = {
            targetUrl: 'https://demo.testfire.net/login.jsp',
            targetProfile: 'web',
            usernameField: 'username',
            passwordField: 'password',
            attackMode: 'spray',
            concurrency: 5,
            rps: 10,
            timingPattern: 'consistent',
            baseDelay: 1000,
            maxAttempts: 100,
            coordination: 'sequential',
            sessionPersistence: 'none',
            evasion: {
                userAgentRotation: false,
                proxyRotation: false,
                headerRandomization: false,
                mouseSimulation: false
            }
        };

        console.log('AdvancedBotAuthTester constructor called');
        // Initialize application
        this.initializeApp();
    }

    initializeApp() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        console.log('Setting up application...');
        this.setupEventListeners();
        this.initializeUI();
        this.loadPersistedData();
        this.updateAllDisplays();
        this.initializeCharts();
        console.log('Advanced Bot Auth Tester initialized successfully');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Tab navigation - Fixed implementation
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.target.dataset.tab;
                console.log('Tab clicked:', tabName);
                this.switchTab(tabName);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Help toggle
        const helpToggle = document.getElementById('help-toggle');
        if (helpToggle) {
            helpToggle.addEventListener('click', () => this.showModal('help-modal'));
        }

        // Configuration controls
        this.setupConfigurationListeners();
        
        // Wordlist management
        this.setupWordlistListeners();
        
        // Attack controls
        this.setupAttackListeners();
        
        // Modal controls
        this.setupModalListeners();
        
        // Target management
        this.setupTargetListeners();

        // Quick actions
        this.setupQuickActions();

        // Report generation
        this.setupReportListeners();

        console.log('Event listeners setup complete');
    }

    setupConfigurationListeners() {
        // Target configuration
        const targetUrl = document.getElementById('target-url');
        if (targetUrl) {
            targetUrl.addEventListener('input', (e) => {
                this.config.targetUrl = e.target.value;
                this.saveConfig();
            });
        }

        const targetProfile = document.getElementById('target-profile');
        if (targetProfile) {
            targetProfile.addEventListener('change', (e) => {
                this.config.targetProfile = e.target.value;
                this.saveConfig();
            });
        }

        const usernameField = document.getElementById('username-field');
        if (usernameField) {
            usernameField.addEventListener('input', (e) => {
                this.config.usernameField = e.target.value;
                this.saveConfig();
            });
        }

        const passwordField = document.getElementById('password-field');
        if (passwordField) {
            passwordField.addEventListener('input', (e) => {
                this.config.passwordField = e.target.value;
                this.saveConfig();
            });
        }

        // Attack configuration
        const attackMode = document.getElementById('attack-mode');
        if (attackMode) {
            attackMode.addEventListener('change', (e) => {
                this.config.attackMode = e.target.value;
                this.updateDetectionProbability();
                this.saveConfig();
            });
        }

        // Sliders
        const concurrencySlider = document.getElementById('concurrency-slider');
        if (concurrencySlider) {
            concurrencySlider.addEventListener('input', (e) => {
                this.config.concurrency = parseInt(e.target.value);
                this.updateSliderDisplay('concurrency-value', e.target.value + ' threads');
                this.updateDetectionProbability();
                this.saveConfig();
            });
        }

        const rpsSlider = document.getElementById('rps-slider');
        if (rpsSlider) {
            rpsSlider.addEventListener('input', (e) => {
                this.config.rps = parseInt(e.target.value);
                this.updateSliderDisplay('rps-value', e.target.value + ' RPS');
                this.updateDetectionProbability();
                this.saveConfig();
            });
        }

        const delaySlider = document.getElementById('delay-slider');
        if (delaySlider) {
            delaySlider.addEventListener('input', (e) => {
                this.config.baseDelay = parseInt(e.target.value);
                this.updateSliderDisplay('delay-value', e.target.value + 'ms');
                this.updateDetectionProbability();
                this.saveConfig();
            });
        }

        // Timing pattern
        const timingPattern = document.getElementById('timing-pattern');
        if (timingPattern) {
            timingPattern.addEventListener('change', (e) => {
                this.config.timingPattern = e.target.value;
                this.updateDetectionProbability();
                this.saveConfig();
            });
        }

        // Evasion techniques
        const evasionCheckboxes = [
            'user-agent-rotation', 'proxy-rotation', 
            'header-randomization', 'mouse-simulation'
        ];

        evasionCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                const key = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace('-', '');
                checkbox.addEventListener('change', (e) => {
                    this.config.evasion[key] = e.target.checked;
                    this.updateDetectionProbability();
                    this.saveConfig();
                });
            }
        });

        // Session and attempts
        const sessionPersistence = document.getElementById('session-persistence');
        if (sessionPersistence) {
            sessionPersistence.addEventListener('change', (e) => {
                this.config.sessionPersistence = e.target.value;
                this.saveConfig();
            });
        }

        const maxAttempts = document.getElementById('max-attempts');
        if (maxAttempts) {
            maxAttempts.addEventListener('input', (e) => {
                this.config.maxAttempts = parseInt(e.target.value);
                this.saveConfig();
            });
        }
    }

    setupWordlistListeners() {
        // Import buttons
        const importPasswords = document.getElementById('import-passwords');
        if (importPasswords) {
            importPasswords.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('password-file-input').click();
            });
        }

        const importUsernames = document.getElementById('import-usernames');
        if (importUsernames) {
            importUsernames.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('username-file-input').click();
            });
        }

        // File inputs
        const passwordFileInput = document.getElementById('password-file-input');
        if (passwordFileInput) {
            passwordFileInput.addEventListener('change', (e) => {
                this.importWordlist(e.target.files[0], 'passwords');
            });
        }

        const usernameFileInput = document.getElementById('username-file-input');
        if (usernameFileInput) {
            usernameFileInput.addEventListener('change', (e) => {
                this.importWordlist(e.target.files[0], 'usernames');
            });
        }

        // Export buttons
        const exportPasswords = document.getElementById('export-passwords');
        if (exportPasswords) {
            exportPasswords.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportWordlist('passwords');
            });
        }

        const exportUsernames = document.getElementById('export-usernames');
        if (exportUsernames) {
            exportUsernames.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportWordlist('usernames');
            });
        }

        // Generate buttons
        const generatePasswords = document.getElementById('generate-passwords');
        if (generatePasswords) {
            generatePasswords.addEventListener('click', (e) => {
                e.preventDefault();
                this.generatePasswordVariations();
            });
        }

        const generateUsernames = document.getElementById('generate-usernames');
        if (generateUsernames) {
            generateUsernames.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateUsernameVariations();
            });
        }

        // Pattern generator
        const generatePattern = document.getElementById('generate-pattern');
        if (generatePattern) {
            generatePattern.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateFromPattern();
            });
        }

        const previewPattern = document.getElementById('preview-pattern');
        if (previewPattern) {
            previewPattern.addEventListener('click', (e) => {
                e.preventDefault();
                this.previewPattern();
            });
        }

        // Subtab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const subtab = e.target.dataset.subtab;
                this.switchSubtab(subtab);
            });
        });
    }

    setupAttackListeners() {
        // Main attack controls
        const startAttack = document.getElementById('start-attack');
        if (startAttack) {
            startAttack.addEventListener('click', (e) => {
                e.preventDefault();
                this.startAttack();
            });
        }

        const pauseAttack = document.getElementById('pause-attack');
        if (pauseAttack) {
            pauseAttack.addEventListener('click', (e) => {
                e.preventDefault();
                this.pauseAttack();
            });
        }

        const stopAttack = document.getElementById('stop-attack');
        if (stopAttack) {
            stopAttack.addEventListener('click', (e) => {
                e.preventDefault();
                this.stopAttack();
            });
        }

        const resetAttack = document.getElementById('reset-attack');
        if (resetAttack) {
            resetAttack.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetAttack();
            });
        }

        // Log controls
        const clearLog = document.getElementById('clear-log');
        if (clearLog) {
            clearLog.addEventListener('click', (e) => {
                e.preventDefault();
                const log = document.getElementById('attack-log');
                if (log) log.innerHTML = '';
            });
        }

        // Coordination mode
        document.querySelectorAll('input[name="coordination"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.config.coordination = e.target.value;
                this.saveConfig();
            });
        });

        // Credential actions
        const exportCredentials = document.getElementById('export-credentials');
        if (exportCredentials) {
            exportCredentials.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportCredentials();
            });
        }

        const testCredentials = document.getElementById('test-credentials');
        if (testCredentials) {
            testCredentials.addEventListener('click', (e) => {
                e.preventDefault();
                this.testFoundCredentials();
            });
        }
    }

    setupModalListeners() {
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    setupTargetListeners() {
        // Add target
        const addTarget = document.getElementById('add-target');
        if (addTarget) {
            addTarget.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('add-target-modal');
            });
        }

        // Save new target
        const saveTarget = document.getElementById('save-target');
        if (saveTarget) {
            saveTarget.addEventListener('click', (e) => {
                e.preventDefault();
                this.addNewTarget();
            });
        }

        // Cancel add target
        const cancelTarget = document.getElementById('cancel-target');
        if (cancelTarget) {
            cancelTarget.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal('add-target-modal');
            });
        }

        // Import targets
        const importTargets = document.getElementById('import-targets');
        if (importTargets) {
            importTargets.addEventListener('click', (e) => {
                e.preventDefault();
                // Create file input for target import
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json,.csv,.txt';
                input.onchange = (e) => this.importTargets(e.target.files[0]);
                input.click();
            });
        }
    }

    setupQuickActions() {
        const quickSpray = document.getElementById('quick-spray');
        if (quickSpray) {
            quickSpray.addEventListener('click', (e) => {
                e.preventDefault();
                this.config.attackMode = 'spray';
                this.switchTab('attacks');
                setTimeout(() => this.startAttack(), 500);
            });
        }

        const quickBrute = document.getElementById('quick-brute');
        if (quickBrute) {
            quickBrute.addEventListener('click', (e) => {
                e.preventDefault();
                this.config.attackMode = 'brute';
                this.switchTab('attacks');
                setTimeout(() => this.startAttack(), 500);
            });
        }

        const quickHybrid = document.getElementById('quick-hybrid');
        if (quickHybrid) {
            quickHybrid.addEventListener('click', (e) => {
                e.preventDefault();
                this.config.attackMode = 'hybrid';
                this.switchTab('attacks');
                setTimeout(() => this.startAttack(), 500);
            });
        }
    }

    setupReportListeners() {
        const generateReport = document.getElementById('generate-report');
        if (generateReport) {
            generateReport.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateReport();
            });
        }

        const scheduleReport = document.getElementById('schedule-report');
        if (scheduleReport) {
            scheduleReport.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Report scheduling feature - would integrate with task scheduler in production');
            });
        }

        // Export format buttons
        const exportJson = document.getElementById('export-json');
        if (exportJson) {
            exportJson.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportReport('json');
            });
        }

        const exportCsv = document.getElementById('export-csv');
        if (exportCsv) {
            exportCsv.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportReport('csv');
            });
        }

        const exportHtml = document.getElementById('export-html');
        if (exportHtml) {
            exportHtml.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportReport('html');
            });
        }
    }

    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
            console.log('Activated tab content:', tabName);
        } else {
            console.error('Tab content not found:', `${tabName}-tab`);
        }

        this.state.currentTab = tabName;

        // Update displays when switching to specific tabs
        if (tabName === 'wordlists') {
            this.updateWordlistDisplays();
        } else if (tabName === 'analysis') {
            this.updateAnalysisDisplays();
        } else if (tabName === 'reports') {
            this.updateReportDisplays();
        }
    }

    switchSubtab(subtabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-subtab="${subtabName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        document.querySelectorAll('.favorites-list, .recent-list').forEach(list => {
            list.classList.add('hidden');
        });
        const targetList = document.getElementById(`${subtabName}-list`);
        if (targetList) {
            targetList.classList.remove('hidden');
        }

        if (subtabName === 'favorites') {
            this.displayFavorites();
        } else if (subtabName === 'recent') {
            this.displayRecentCredentials();
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (body.dataset.colorScheme === 'dark') {
            body.dataset.colorScheme = 'light';
            if (themeToggle) themeToggle.textContent = '☀️ Light';
        } else {
            body.dataset.colorScheme = 'dark';
            if (themeToggle) themeToggle.textContent = '🌙 Dark';
        }

        // Update charts for theme
        this.updateChartsTheme();
    }

    initializeUI() {
        // Set initial values
        this.updateSliderDisplay('concurrency-value', this.config.concurrency + ' threads');
        this.updateSliderDisplay('rps-value', this.config.rps + ' RPS');
        this.updateSliderDisplay('delay-value', this.config.baseDelay + 'ms');
        
        // Update form fields
        this.setElementValue('target-url', this.config.targetUrl);
        this.setElementValue('target-profile', this.config.targetProfile);
        this.setElementValue('username-field', this.config.usernameField);
        this.setElementValue('password-field', this.config.passwordField);
        this.setElementValue('attack-mode', this.config.attackMode);
        this.setElementValue('timing-pattern', this.config.timingPattern);
        this.setElementValue('session-persistence', this.config.sessionPersistence);
        this.setElementValue('max-attempts', this.config.maxAttempts);
        this.setElementValue('concurrency-slider', this.config.concurrency);
        this.setElementValue('rps-slider', this.config.rps);
        this.setElementValue('delay-slider', this.config.baseDelay);

        // Set checkboxes
        Object.entries(this.config.evasion).forEach(([key, value]) => {
            const id = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.checked = value;
        });

        // Set coordination radio
        const coordinationRadio = document.querySelector(`input[name="coordination"][value="${this.config.coordination}"]`);
        if (coordinationRadio) coordinationRadio.checked = true;
    }

    initializeCharts() {
        // Performance chart
        const performanceCtx = document.getElementById('performance-chart');
        if (performanceCtx) {
            this.state.charts.performance = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 10}, (_, i) => `${i + 1}s`),
                    datasets: [{
                        label: 'Requests/Second',
                        data: Array.from({length: 10}, () => Math.floor(Math.random() * 20) + 5),
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#f5f5f5'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#a7a9a9' }
                        },
                        y: {
                            ticks: { color: '#a7a9a9' }
                        }
                    }
                }
            });
        }

        // History chart
        const historyCtx = document.getElementById('history-chart');
        if (historyCtx) {
            this.state.charts.history = new Chart(historyCtx, {
                type: 'bar',
                data: {
                    labels: ['Successful', 'Failed', 'Blocked'],
                    datasets: [{
                        data: [15, 85, 12],
                        backgroundColor: ['#00ff88', '#ff0066', '#ffc107']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { ticks: { color: '#a7a9a9' } },
                        y: { ticks: { color: '#a7a9a9' } }
                    }
                }
            });
        }

        // Behavior chart
        const behaviorCtx = document.getElementById('behavior-chart');
        if (behaviorCtx) {
            this.state.charts.behavior = new Chart(behaviorCtx, {
                type: 'radar',
                data: {
                    labels: ['Timing', 'Frequency', 'Headers', 'Navigation', 'Interaction'],
                    datasets: [{
                        label: 'Bot Behavior Score',
                        data: [70, 85, 60, 90, 75],
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f5f5f5' }
                        }
                    },
                    scales: {
                        r: {
                            ticks: { color: '#a7a9a9' },
                            grid: { color: 'rgba(167, 169, 169, 0.3)' }
                        }
                    }
                }
            });
        }

        // Timeline chart
        const timelineCtx = document.getElementById('history-timeline-chart');
        if (timelineCtx) {
            this.state.charts.timeline = new Chart(timelineCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Attack Events',
                        data: [12, 19, 3, 5, 2, 3],
                        borderColor: '#9966ff',
                        backgroundColor: 'rgba(153, 102, 255, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f5f5f5' }
                        }
                    },
                    scales: {
                        x: { ticks: { color: '#a7a9a9' } },
                        y: { ticks: { color: '#a7a9a9' } }
                    }
                }
            });
        }

        // Comparison chart
        const comparisonCtx = document.getElementById('comparison-chart');
        if (comparisonCtx) {
            this.state.charts.comparison = new Chart(comparisonCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Password Spray', 'Brute Force', 'Dictionary', 'Hybrid'],
                    datasets: [{
                        data: [25, 35, 20, 20],
                        backgroundColor: ['#00d4ff', '#00ff88', '#ff0066', '#9966ff']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#f5f5f5' }
                        }
                    }
                }
            });
        }
    }

    updateAllDisplays() {
        this.updateWordlistCounts();
        this.updateTargetDisplay();
        this.updateStatsDisplay();
        this.updateDetectionProbability();
        this.updateThreatMeter();
    }

    updateSliderDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    setElementValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        }
    }

    updateWordlistCounts() {
        const passwordCount = document.getElementById('total-passwords');
        const usernameCount = document.getElementById('total-usernames');
        
        if (passwordCount) passwordCount.textContent = this.data.extendedPasswords.length;
        if (usernameCount) usernameCount.textContent = this.data.extendedUsernames.length;
    }

    updateWordlistDisplays() {
        this.updatePasswordPreview();
        this.updateUsernamePreview();
    }

    updatePasswordPreview() {
        const preview = document.getElementById('password-preview');
        if (preview) {
            const sample = this.data.extendedPasswords.slice(0, 20);
            preview.innerHTML = sample.map(pwd => `<div class="password-item">${pwd}</div>`).join('');
        }
    }

    updateUsernamePreview() {
        const preview = document.getElementById('username-preview');
        if (preview) {
            const sample = this.data.extendedUsernames.slice(0, 20);
            preview.innerHTML = sample.map(user => `<div class="username-item">${user}</div>`).join('');
        }
    }

    updateTargetDisplay() {
        const targetList = document.getElementById('target-list');
        if (targetList) {
            targetList.innerHTML = this.state.targets.map(target => `
                <div class="target-item ${target.status === 'active' ? 'active' : ''}">
                    <span class="target-url">${target.url}</span>
                    <span class="target-status status--${target.status === 'ready' ? 'info' : target.status}">${target.status.toUpperCase()}</span>
                </div>
            `).join('');
        }

        const statusList = document.getElementById('target-status-list');
        if (statusList) {
            statusList.innerHTML = this.state.targets.map(target => `
                <div class="target-status-item">
                    <span class="target-name">${target.name}</span>
                    <span class="status status--${target.status === 'ready' ? 'info' : target.status}">${target.status}</span>
                </div>
            `).join('');
        }
    }

    updateStatsDisplay() {
        const elements = {
            'attacks-running': this.state.isAttacking ? 1 : 0,
            'global-success-rate': this.calculateSuccessRate() + '%',
            'global-detection-risk': this.getDetectionRiskLevel(),
            'attempts-count': this.state.currentAttempt,
            'success-count': this.state.successCount,
            'failed-count': this.state.failedCount,
            'current-rate': this.calculateCurrentRate() + '/s'
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    updateDetectionProbability() {
        let probability = 20; // Base probability
        
        // Base probability from attack mode
        const attackMode = this.data.attackModes.find(mode => mode.id === this.config.attackMode);
        if (attackMode) {
            const riskMap = { 'Low': 20, 'Medium': 40, 'High': 70, 'Very High': 90, 'Variable': 50 };
            probability += riskMap[attackMode.detection_risk] || 0;
        }

        // Timing pattern impact
        const timingImpact = {
            'consistent': 30,
            'random': 10,
            'human': 5,
            'burst': 40
        };
        probability += timingImpact[this.config.timingPattern] || 0;

        // Request rate impact
        if (this.config.rps > 20) probability += 30;
        else if (this.config.rps > 10) probability += 15;
        else if (this.config.rps > 5) probability += 5;

        // Concurrency impact
        if (this.config.concurrency > 20) probability += 25;
        else if (this.config.concurrency > 10) probability += 15;
        else if (this.config.concurrency > 5) probability += 5;

        // Evasion reduction
        const evasionReduction = Object.values(this.config.evasion).filter(Boolean).length * 15;
        probability = Math.max(10, probability - evasionReduction);

        this.state.detectionProbability = Math.min(100, probability);

        // Update UI
        const detectionFill = document.getElementById('detection-fill');
        const detectionPercent = document.getElementById('detection-percentage');
        const riskLevel = document.getElementById('risk-level');

        if (detectionFill) detectionFill.style.width = this.state.detectionProbability + '%';
        if (detectionPercent) detectionPercent.textContent = Math.round(this.state.detectionProbability) + '%';

        if (riskLevel) {
            const level = this.getDetectionRiskLevel().toLowerCase();
            riskLevel.textContent = level.toUpperCase();
            riskLevel.className = `risk-value ${level}`;
        }

        this.updateAnalysisDisplays();
    }

    updateAnalysisDisplays() {
        // Update detection techniques
        const techniquesList = document.getElementById('techniques-list');
        if (techniquesList) {
            techniquesList.innerHTML = this.data.detectionTechniques.map(technique => `
                <div class="technique-item">
                    <div>
                        <div class="technique-name">${technique.name}</div>
                        <div style="font-size: 12px; color: #a7a9a9; margin-top: 4px;">${technique.description}</div>
                    </div>
                    <span class="technique-effectiveness">${technique.effectiveness}%</span>
                </div>
            `).join('');
        }

        // Update evasion techniques
        const evasionList = document.getElementById('evasion-list');
        if (evasionList) {
            evasionList.innerHTML = this.data.evasionTechniques.map(evasion => `
                <div class="evasion-item">
                    <div>
                        <div class="evasion-name">${evasion.name}</div>
                        <div style="font-size: 12px; color: #a7a9a9; margin-top: 4px;">${evasion.description}</div>
                    </div>
                    <span class="evasion-effectiveness">${evasion.effectiveness}%</span>
                </div>
            `).join('');
        }

        // Update behavior chart
        if (this.state.charts.behavior) {
            const behaviorScores = this.calculateBehaviorScores();
            this.state.charts.behavior.data.datasets[0].data = behaviorScores;
            this.state.charts.behavior.update();
        }
    }

    updateThreatMeter() {
        const threatFill = document.getElementById('threat-fill');
        const threatText = document.getElementById('threat-text');
        
        const threatLevel = Math.min(100, this.state.detectionProbability + Math.random() * 10);
        
        if (threatFill) threatFill.style.width = threatLevel + '%';
        
        if (threatText) {
            if (threatLevel < 30) threatText.textContent = 'LOW';
            else if (threatLevel < 70) threatText.textContent = 'MEDIUM';
            else threatText.textContent = 'HIGH';
        }
    }

    calculateSuccessRate() {
        const total = this.state.successCount + this.state.failedCount;
        return total > 0 ? Math.round((this.state.successCount / total) * 100) : 0;
    }

    getDetectionRiskLevel() {
        if (this.state.detectionProbability < 30) return 'LOW';
        if (this.state.detectionProbability < 70) return 'MEDIUM';
        return 'HIGH';
    }

    calculateCurrentRate() {
        return this.state.isAttacking ? Math.floor(Math.random() * 15) + 5 : 0;
    }

    calculateBehaviorScores() {
        const scores = [
            this.config.timingPattern === 'consistent' ? 90 : 30,
            this.config.rps > 10 ? 85 : 40,
            this.config.evasion.userAgentRotation ? 20 : 80,
            this.config.attackMode === 'brute' ? 95 : 50,
            this.config.evasion.mouseSimulation ? 15 : 85
        ];
        return scores;
    }

    // Attack functionality
    async startAttack() {
        if (this.state.isAttacking) return;

        console.log('Starting attack...');
        this.state.isAttacking = true;
        this.state.isPaused = false;
        this.state.attackStartTime = Date.now();
        this.state.currentAttempt = 0;
        this.state.successCount = 0;
        this.state.failedCount = 0;
        this.state.successfulCredentials = [];

        // Update UI
        this.updateAttackButtons(true);
        this.addLogEntry('info', `Starting ${this.config.attackMode} attack against ${this.config.targetUrl}`);
        
        // Start attack simulation
        this.runAttackSimulation();
    }

    pauseAttack() {
        if (!this.state.isAttacking) return;

        this.state.isPaused = !this.state.isPaused;
        const pauseBtn = document.getElementById('pause-attack');
        
        if (this.state.isPaused) {
            if (pauseBtn) pauseBtn.innerHTML = '▶️ Resume';
            this.addLogEntry('info', 'Attack paused');
            clearTimeout(this.state.attackInterval);
        } else {
            if (pauseBtn) pauseBtn.innerHTML = '⏸️ Pause';
            this.addLogEntry('info', 'Attack resumed');
            this.runAttackSimulation();
        }
    }

    stopAttack() {
        if (!this.state.isAttacking) return;

        console.log('Stopping attack...');
        this.state.isAttacking = false;
        this.state.isPaused = false;
        clearTimeout(this.state.attackInterval);
        
        this.updateAttackButtons(false);
        this.addLogEntry('info', 'Attack stopped by user');
        this.finalizeAttackResults();
    }

    resetAttack() {
        this.stopAttack();
        
        this.state.currentAttempt = 0;
        this.state.successCount = 0;
        this.state.failedCount = 0;
        this.state.successfulCredentials = [];
        
        this.updateProgress(0);
        this.updateStatsDisplay();
        this.clearCredentialsList();
        
        const log = document.getElementById('attack-log');
        if (log) log.innerHTML = '';
        
        this.addLogEntry('info', 'Attack simulation reset');
    }

    async runAttackSimulation() {
        if (!this.state.isAttacking || this.state.isPaused) return;

        if (this.state.currentAttempt >= this.config.maxAttempts) {
            this.addLogEntry('info', `Maximum attempts reached (${this.config.maxAttempts})`);
            this.stopAttack();
            return;
        }

        // Get next credential pair
        const credentials = this.getNextCredentials();
        
        // Simulate attack attempt
        const result = await this.simulateAttackAttempt(credentials);
        
        this.state.currentAttempt++;
        
        if (result.success) {
            this.state.successCount++;
            this.state.successfulCredentials.push(credentials);
            this.addToRecentCredentials(credentials);
            this.addLogEntry('success', `✓ SUCCESS: ${credentials.username}:${credentials.password}`);
            this.updateCredentialsList();
        } else {
            this.state.failedCount++;
            this.addLogEntry('error', `✗ FAILED: ${credentials.username}:${credentials.password}`);
        }

        // Update displays
        const progress = (this.state.currentAttempt / this.config.maxAttempts) * 100;
        this.updateProgress(progress);
        this.updateStatsDisplay();

        // Update charts
        this.updatePerformanceChart();

        // Schedule next attempt
        const delay = this.calculateDelay();
        this.state.attackInterval = setTimeout(() => this.runAttackSimulation(), delay);
    }

    getNextCredentials() {
        const mode = this.config.attackMode;
        const attempt = this.state.currentAttempt;
        
        switch (mode) {
            case 'spray':
                return {
                    username: this.data.extendedUsernames[attempt % this.data.extendedUsernames.length],
                    password: this.data.extendedPasswords[Math.floor(attempt / this.data.extendedUsernames.length) % this.data.extendedPasswords.length]
                };
            
            case 'stuffing':
                const commonPairs = [
                    ['admin', 'admin'], ['root', 'root'], ['admin', 'password'],
                    ['test', 'test'], ['guest', 'guest'], ['user', 'user']
                ];
                const pair = commonPairs[attempt % commonPairs.length] || 
                           [this.data.extendedUsernames[attempt % this.data.extendedUsernames.length],
                            this.data.extendedPasswords[attempt % this.data.extendedPasswords.length]];
                return { username: pair[0], password: pair[1] };
            
            case 'brute':
                return {
                    username: 'admin',
                    password: this.data.extendedPasswords[attempt % this.data.extendedPasswords.length]
                };
            
            case 'dictionary':
                return {
                    username: this.data.extendedUsernames[attempt % this.data.extendedUsernames.length],
                    password: this.generateDictionaryPassword(attempt)
                };
            
            case 'hybrid':
                if (attempt % 3 === 0) return this.getNextCredentials.call({...this, config: {...this.config, attackMode: 'spray'}});
                if (attempt % 3 === 1) return this.getNextCredentials.call({...this, config: {...this.config, attackMode: 'brute'}});
                return this.getNextCredentials.call({...this, config: {...this.config, attackMode: 'stuffing'}});
            
            default:
                return {
                    username: this.data.extendedUsernames[attempt % this.data.extendedUsernames.length],
                    password: this.data.extendedPasswords[attempt % this.data.extendedPasswords.length]
                };
        }
    }

    generateDictionaryPassword(attempt) {
        const base = this.data.extendedPasswords[attempt % this.data.extendedPasswords.length];
        const variations = [
            base,
            base + '1',
            base + '123',
            base + '!',
            base.charAt(0).toUpperCase() + base.slice(1),
            base + new Date().getFullYear()
        ];
        return variations[attempt % variations.length];
    }

    async simulateAttackAttempt(credentials) {
        // Simulate network delay
        const baseDelay = 100 + Math.random() * 300;
        await new Promise(resolve => setTimeout(resolve, baseDelay));

        // Simulate success based on realistic rates
        const successRate = this.config.attackMode === 'stuffing' ? 0.08 : 0.05;
        const isSuccess = Math.random() < successRate;

        return {
            success: isSuccess,
            responseTime: baseDelay,
            statusCode: isSuccess ? 200 : 401
        };
    }

    calculateDelay() {
        const baseDelay = this.config.baseDelay;
        
        switch (this.config.timingPattern) {
            case 'consistent':
                return Math.max(200, baseDelay);
            
            case 'random':
                return Math.max(200, baseDelay + (Math.random() * baseDelay * 0.5 - baseDelay * 0.25));
            
            case 'human':
                const isLongPause = Math.random() < 0.1;
                return isLongPause ? baseDelay * 3 : Math.max(200, baseDelay + (Math.random() * baseDelay * 0.3));
            
            case 'burst':
                const isBurst = this.state.currentAttempt % 10 < 3;
                return isBurst ? Math.max(100, baseDelay * 0.2) : baseDelay * 2;
            
            default:
                return Math.max(200, baseDelay);
        }
    }

    updateAttackButtons(isAttacking) {
        const startBtn = document.getElementById('start-attack');
        const pauseBtn = document.getElementById('pause-attack');
        const stopBtn = document.getElementById('stop-attack');
        
        if (startBtn) startBtn.disabled = isAttacking;
        if (pauseBtn) pauseBtn.disabled = !isAttacking;
        if (stopBtn) stopBtn.disabled = !isAttacking;
        
        if (pauseBtn && !isAttacking) {
            pauseBtn.innerHTML = '⏸️ Pause';
        }
    }

    updateProgress(percentage) {
        const progressFill = document.getElementById('progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) progressFill.style.width = percentage + '%';
        if (progressPercent) progressPercent.textContent = Math.round(percentage) + '%';
        if (progressText) {
            if (this.state.isAttacking) {
                progressText.textContent = `${this.state.currentAttempt} / ${this.config.maxAttempts} attempts`;
            } else {
                progressText.textContent = percentage > 0 ? 'Attack completed' : 'Ready to start';
            }
        }
    }

    updateCredentialsList() {
        const credentialsList = document.getElementById('credentials-list');
        if (!credentialsList) return;

        if (this.state.successfulCredentials.length === 0) {
            credentialsList.innerHTML = '<div class="no-credentials">No successful credentials yet</div>';
            return;
        }

        credentialsList.innerHTML = this.state.successfulCredentials.map((cred, index) => `
            <div class="credential-item">
                <span class="credential-pair">${cred.username}:${cred.password}</span>
                <button class="credential-action btn btn--outline btn--sm" onclick="window.botTester.addToFavorites('${cred.username}', '${cred.password}')">⭐</button>
            </div>
        `).join('');
    }

    clearCredentialsList() {
        const credentialsList = document.getElementById('credentials-list');
        if (credentialsList) {
            credentialsList.innerHTML = '<div class="no-credentials">No successful credentials yet</div>';
        }
    }

    updatePerformanceChart() {
        if (!this.state.charts.performance) return;

        const chart = this.state.charts.performance;
        const now = new Date().toLocaleTimeString();
        const currentRate = this.calculateCurrentRate();

        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(currentRate);

        // Keep only last 20 data points
        if (chart.data.labels.length > 20) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.update();
    }

    addLogEntry(type, message) {
        const log = document.getElementById('attack-log');
        if (!log) return;

        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `<span class="log-timestamp">[${timestamp}]</span> ${message}`;
        
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;

        // Limit to 100 entries
        if (log.children.length > 100) {
            log.removeChild(log.firstChild);
        }
    }

    // Wordlist management
    async importWordlist(file, type) {
        if (!file) return;

        try {
            const text = await file.text();
            const items = text.split(/\r?\n/).map(item => item.trim()).filter(item => item.length > 0);

            if (type === 'passwords') {
                this.data.extendedPasswords = [...new Set([...this.data.extendedPasswords, ...items])];
                this.addLogEntry('info', `Imported ${items.length} passwords`);
            } else {
                this.data.extendedUsernames = [...new Set([...this.data.extendedUsernames, ...items])];
                this.addLogEntry('info', `Imported ${items.length} usernames`);
            }

            this.updateWordlistCounts();
            this.updateWordlistDisplays();
            this.saveData();
        } catch (error) {
            this.addLogEntry('error', `Failed to import ${type}: ${error.message}`);
        }
    }

    exportWordlist(type) {
        const data = type === 'passwords' ? this.data.extendedPasswords : this.data.extendedUsernames;
        const content = data.join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.addLogEntry('info', `Exported ${data.length} ${type}`);
    }

    generatePasswordVariations() {
        const basePasswords = ['password', 'admin', 'test', 'user', 'guest', 'login'];
        const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
        const numbers = ['1', '12', '123', '1234'];
        const specials = ['!', '!!', '@', '#', '$'];

        const variations = [];

        basePasswords.forEach(base => {
            variations.push(base);
            variations.push(base.charAt(0).toUpperCase() + base.slice(1));
            
            years.forEach(year => {
                variations.push(base + year);
                variations.push(base.charAt(0).toUpperCase() + base.slice(1) + year);
            });
            
            numbers.forEach(num => {
                variations.push(base + num);
                variations.push(base.charAt(0).toUpperCase() + base.slice(1) + num);
            });
            
            specials.forEach(special => {
                variations.push(base + special);
                variations.push(base.charAt(0).toUpperCase() + base.slice(1) + special);
            });
        });

        const newPasswords = variations.filter(pwd => !this.data.extendedPasswords.includes(pwd));
        this.data.extendedPasswords = [...this.data.extendedPasswords, ...newPasswords];

        this.updateWordlistCounts();
        this.updateWordlistDisplays();
        this.addLogEntry('info', `Generated ${newPasswords.length} password variations`);
        this.saveData();
    }

    generateUsernameVariations() {
        const baseUsernames = ['admin', 'user', 'test', 'guest', 'service'];
        const numbers = ['1', '2', '3', '01', '02', '03'];
        const suffixes = ['user', 'admin', '123', 'test'];

        const variations = [];

        baseUsernames.forEach(base => {
            variations.push(base);
            
            numbers.forEach(num => {
                variations.push(base + num);
                variations.push(num + base);
            });
            
            suffixes.forEach(suffix => {
                if (suffix !== base) {
                    variations.push(base + suffix);
                }
            });
        });

        const newUsernames = variations.filter(user => !this.data.extendedUsernames.includes(user));
        this.data.extendedUsernames = [...this.data.extendedUsernames, ...newUsernames];

        this.updateWordlistCounts();
        this.updateWordlistDisplays();
        this.addLogEntry('info', `Generated ${newUsernames.length} username variations`);
        this.saveData();
    }

    generateFromPattern() {
        const pattern = document.getElementById('pattern-input')?.value;
        if (!pattern) {
            alert('Please enter a pattern');
            return;
        }

        const years = document.getElementById('years-input')?.value.split(',').map(s => s.trim()) || [];
        const numbers = document.getElementById('numbers-input')?.value.split(',').map(s => s.trim()) || [];
        const specials = document.getElementById('specials-input')?.value.split(',').map(s => s.trim()) || [];

        const generated = [];

        // Replace patterns
        if (pattern.includes('{year}')) {
            years.forEach(year => {
                generated.push(pattern.replace('{year}', year));
            });
        } else if (pattern.includes('{number}')) {
            numbers.forEach(number => {
                generated.push(pattern.replace('{number}', number));
            });
        } else if (pattern.includes('{special}')) {
            specials.forEach(special => {
                generated.push(pattern.replace('{special}', special));
            });
        } else if (pattern.includes('{username}')) {
            this.data.extendedUsernames.slice(0, 10).forEach(username => {
                generated.push(pattern.replace('{username}', username));
            });
        } else {
            generated.push(pattern);
        }

        // Add to passwords by default
        const newPasswords = generated.filter(pwd => !this.data.extendedPasswords.includes(pwd));
        this.data.extendedPasswords = [...this.data.extendedPasswords, ...newPasswords];

        this.updateWordlistCounts();
        this.updateWordlistDisplays();
        this.addLogEntry('info', `Generated ${newPasswords.length} passwords from pattern`);
        this.saveData();
    }

    previewPattern() {
        const pattern = document.getElementById('pattern-input')?.value;
        if (!pattern) return;

        const years = ['2024', '2025'];
        const numbers = ['1', '123'];
        const specials = ['!', '@'];
        const usernames = ['admin', 'user'];

        let preview = [];
        
        if (pattern.includes('{year}')) {
            preview = years.map(year => pattern.replace('{year}', year)).slice(0, 5);
        } else if (pattern.includes('{number}')) {
            preview = numbers.map(number => pattern.replace('{number}', number));
        } else if (pattern.includes('{special}')) {
            preview = specials.map(special => pattern.replace('{special}', special));
        } else if (pattern.includes('{username}')) {
            preview = usernames.map(username => pattern.replace('{username}', username));
        } else {
            preview = [pattern];
        }

        alert('Pattern preview:\n' + preview.join('\n'));
    }

    // Favorites and recent management
    addToFavorites(username, password) {
        const favorite = { username, password, added: Date.now() };
        const exists = this.state.favorites.some(fav => fav.username === username && fav.password === password);
        
        if (!exists) {
            this.state.favorites.push(favorite);
            this.saveData();
            this.addLogEntry('info', `Added ${username}:${password} to favorites`);
        }
    }

    addToRecentCredentials(credentials) {
        const recent = { ...credentials, used: Date.now() };
        this.state.recentCredentials.unshift(recent);
        
        // Keep only last 20
        if (this.state.recentCredentials.length > 20) {
            this.state.recentCredentials = this.state.recentCredentials.slice(0, 20);
        }
        
        this.saveData();
    }

    displayFavorites() {
        const container = document.getElementById('favorites-list');
        if (!container) return;

        if (this.state.favorites.length === 0) {
            container.innerHTML = '<div class="no-items">No favorites yet</div>';
            return;
        }

        container.innerHTML = this.state.favorites.map(fav => `
            <div class="favorite-item">
                <span class="credential-pair">${fav.username}:${fav.password}</span>
                <button class="remove-favorite btn btn--outline btn--sm" onclick="window.botTester.removeFavorite('${fav.username}', '${fav.password}')">🗑️</button>
            </div>
        `).join('');
    }

    displayRecentCredentials() {
        const container = document.getElementById('recent-list');
        if (!container) return;

        if (this.state.recentCredentials.length === 0) {
            container.innerHTML = '<div class="no-items">No recent credentials</div>';
            return;
        }

        container.innerHTML = this.state.recentCredentials.map(cred => `
            <div class="recent-item">
                <span class="credential-pair">${cred.username}:${cred.password}</span>
                <span class="used-time">${new Date(cred.used).toLocaleString()}</span>
            </div>
        `).join('');
    }

    removeFavorite(username, password) {
        this.state.favorites = this.state.favorites.filter(fav => 
            !(fav.username === username && fav.password === password)
        );
        this.displayFavorites();
        this.saveData();
    }

    // Target management
    addNewTarget() {
        const url = document.getElementById('new-target-url')?.value;
        const name = document.getElementById('new-target-name')?.value;
        const type = document.getElementById('new-target-type')?.value;

        if (!url || !name) {
            alert('Please fill in all required fields');
            return;
        }

        const target = {
            id: Date.now(),
            url,
            name,
            type,
            status: 'ready'
        };

        this.state.targets.push(target);
        this.updateTargetDisplay();
        this.hideModal('add-target-modal');
        this.saveData();

        // Clear form
        document.getElementById('new-target-url').value = '';
        document.getElementById('new-target-name').value = '';
    }

    async importTargets(file) {
        if (!file) return;

        try {
            const text = await file.text();
            let targets = [];

            if (file.name.endsWith('.json')) {
                targets = JSON.parse(text);
            } else if (file.name.endsWith('.csv')) {
                const lines = text.split('\n');
                targets = lines.slice(1).map(line => {
                    const [name, url, type] = line.split(',');
                    return { id: Date.now() + Math.random(), name: name?.trim(), url: url?.trim(), type: type?.trim() || 'web', status: 'ready' };
                }).filter(target => target.name && target.url);
            }

            this.state.targets = [...this.state.targets, ...targets];
            this.updateTargetDisplay();
            this.saveData();
            this.addLogEntry('info', `Imported ${targets.length} targets`);
        } catch (error) {
            this.addLogEntry('error', `Failed to import targets: ${error.message}`);
        }
    }

    // Export functionality
    exportCredentials() {
        if (this.state.successfulCredentials.length === 0) {
            alert('No successful credentials to export');
            return;
        }

        const data = this.state.successfulCredentials.map(cred => `${cred.username}:${cred.password}`).join('\n');
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `successful-credentials-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    testFoundCredentials() {
        if (this.state.successfulCredentials.length === 0) {
            alert('No credentials to test');
            return;
        }

        alert(`Testing ${this.state.successfulCredentials.length} found credentials...\nThis would validate credentials against target systems in a real implementation.`);
    }

    finalizeAttackResults() {
        const result = {
            timestamp: Date.now(),
            attackMode: this.config.attackMode,
            targetUrl: this.config.targetUrl,
            duration: Date.now() - this.state.attackStartTime,
            totalAttempts: this.state.currentAttempt,
            successfulAttempts: this.state.successCount,
            failedAttempts: this.state.failedCount,
            detectionProbability: this.state.detectionProbability,
            successfulCredentials: this.state.successfulCredentials
        };

        this.state.attackHistory.push(result);
        this.saveData();
        this.updateReportDisplays();
    }

    // Reporting
    updateReportDisplays() {
        const totalAttacks = document.getElementById('total-attacks');
        const overallSuccessRate = document.getElementById('overall-success-rate');
        const avgDetectionTime = document.getElementById('avg-detection-time');
        const bestAttackMode = document.getElementById('best-attack-mode');

        if (totalAttacks) totalAttacks.textContent = this.state.attackHistory.length;
        if (overallSuccessRate) overallSuccessRate.textContent = this.calculateOverallSuccessRate() + '%';
        if (avgDetectionTime) avgDetectionTime.textContent = this.calculateAverageDetectionTime();
        if (bestAttackMode) bestAttackMode.textContent = this.getBestAttackMode();
    }

    calculateOverallSuccessRate() {
        if (this.state.attackHistory.length === 0) return 0;
        
        const totalAttempts = this.state.attackHistory.reduce((sum, attack) => sum + attack.totalAttempts, 0);
        const totalSuccess = this.state.attackHistory.reduce((sum, attack) => sum + attack.successfulAttempts, 0);
        
        return totalAttempts > 0 ? Math.round((totalSuccess / totalAttempts) * 100) : 0;
    }

    calculateAverageDetectionTime() {
        if (this.state.attackHistory.length === 0) return 'N/A';
        
        const avgTime = this.state.attackHistory.reduce((sum, attack) => sum + attack.duration, 0) / this.state.attackHistory.length;
        return Math.round(avgTime / 1000) + 's';
    }

    getBestAttackMode() {
        if (this.state.attackHistory.length === 0) return '-';
        
        const modes = {};
        this.state.attackHistory.forEach(attack => {
            if (!modes[attack.attackMode]) modes[attack.attackMode] = { total: 0, success: 0 };
            modes[attack.attackMode].total += attack.totalAttempts;
            modes[attack.attackMode].success += attack.successfulAttempts;
        });

        let bestMode = '-';
        let bestRate = 0;
        
        Object.entries(modes).forEach(([mode, stats]) => {
            const rate = stats.total > 0 ? stats.success / stats.total : 0;
            if (rate > bestRate) {
                bestRate = rate;
                bestMode = mode;
            }
        });

        return bestMode;
    }

    generateReport() {
        const reportType = document.getElementById('report-type')?.value || 'technical';
        
        const report = {
            reportType,
            generatedAt: new Date().toISOString(),
            summary: {
                totalAttacks: this.state.attackHistory.length,
                overallSuccessRate: this.calculateOverallSuccessRate(),
                averageDetectionTime: this.calculateAverageDetectionTime(),
                bestAttackMode: this.getBestAttackMode()
            },
            configuration: this.config,
            attackHistory: this.state.attackHistory,
            detectionAnalysis: {
                currentProbability: this.state.detectionProbability,
                riskLevel: this.getDetectionRiskLevel(),
                techniques: this.data.detectionTechniques,
                evasions: this.data.evasionTechniques
            }
        };

        console.log('Generated report:', report);
        alert(`${reportType.toUpperCase()} report generated successfully!\nCheck browser console for details.`);
    }

    exportReport(format) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalAttacks: this.state.attackHistory.length,
                successRate: this.calculateOverallSuccessRate(),
                detectionRisk: this.getDetectionRiskLevel()
            },
            attackHistory: this.state.attackHistory,
            configuration: this.config
        };

        let content, filename, mimeType;

        switch (format) {
            case 'json':
                content = JSON.stringify(report, null, 2);
                filename = `attack-report-${Date.now()}.json`;
                mimeType = 'application/json';
                break;
            
            case 'csv':
                const csvHeader = 'Timestamp,Attack Mode,Target,Duration,Attempts,Success,Failed,Detection Risk\n';
                const csvRows = this.state.attackHistory.map(attack => 
                    `${new Date(attack.timestamp).toISOString()},${attack.attackMode},${attack.targetUrl},${attack.duration},${attack.totalAttempts},${attack.successfulAttempts},${attack.failedAttempts},${attack.detectionProbability}%`
                ).join('\n');
                content = csvHeader + csvRows;
                filename = `attack-report-${Date.now()}.csv`;
                mimeType = 'text/csv';
                break;
            
            case 'html':
                content = this.generateHtmlReport(report);
                filename = `attack-report-${Date.now()}.html`;
                mimeType = 'text/html';
                break;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.addLogEntry('info', `Report exported as ${format.toUpperCase()}`);
    }

    generateHtmlReport(report) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Attack Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #1a202c; color: #f5f5f5; }
                .header { background: #2d3748; padding: 20px; border-radius: 5px; border-left: 4px solid #00d4ff; }
                .section { margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #4a5568; padding: 8px; text-align: left; }
                th { background-color: #2d3748; }
                .metric { display: inline-block; margin: 10px; padding: 15px; background: #2d3748; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎯 Bot Authentication Testing Report</h1>
                <p><strong>Generated:</strong> ${report.timestamp}</p>
                <div class="metric">
                    <strong>Total Attacks:</strong> ${report.summary.totalAttacks}
                </div>
                <div class="metric">
                    <strong>Success Rate:</strong> ${report.summary.successRate}%
                </div>
                <div class="metric">
                    <strong>Detection Risk:</strong> ${report.summary.detectionRisk}
                </div>
            </div>
            
            <div class="section">
                <h2>🕒 Attack History</h2>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Mode</th>
                        <th>Target</th>
                        <th>Duration</th>
                        <th>Attempts</th>
                        <th>Success</th>
                    </tr>
                    ${report.attackHistory.map(attack => `
                    <tr>
                        <td>${new Date(attack.timestamp).toLocaleString()}</td>
                        <td>${attack.attackMode}</td>
                        <td>${attack.targetUrl}</td>
                        <td>${Math.round(attack.duration / 1000)}s</td>
                        <td>${attack.totalAttempts}</td>
                        <td>${attack.successfulAttempts}</td>
                    </tr>
                    `).join('')}
                </table>
            </div>
        </body>
        </html>
        `;
    }

    // Data persistence (session-based for demo)
    saveData() {
        const data = {
            config: this.config,
            state: {
                attackHistory: this.state.attackHistory,
                favorites: this.state.favorites,
                recentCredentials: this.state.recentCredentials,
                targets: this.state.targets
            },
            wordlists: {
                passwords: this.data.extendedPasswords,
                usernames: this.data.extendedUsernames
            }
        };

        // Store in session for demo purposes
        try {
            window.botTesterData = data;
            console.log('Data saved to session storage');
        } catch (error) {
            console.warn('Could not save data:', error);
        }
    }

    saveConfig() {
        this.saveData();
    }

    loadPersistedData() {
        try {
            if (window.botTesterData) {
                const data = window.botTesterData;
                
                // Restore configuration
                this.config = { ...this.config, ...data.config };
                
                // Restore state
                if (data.state) {
                    this.state.attackHistory = data.state.attackHistory || [];
                    this.state.favorites = data.state.favorites || [];
                    this.state.recentCredentials = data.state.recentCredentials || [];
                    this.state.targets = data.state.targets || this.state.targets;
                }
                
                // Restore wordlists
                if (data.wordlists) {
                    this.data.extendedPasswords = data.wordlists.passwords || this.data.extendedPasswords;
                    this.data.extendedUsernames = data.wordlists.usernames || this.data.extendedUsernames;
                }
                
                console.log('Data loaded from session storage');
            }
        } catch (error) {
            console.warn('Could not load persisted data:', error);
        }
    }

    updateChartsTheme() {
        // Update chart colors based on theme
        Object.values(this.state.charts).forEach(chart => {
            if (chart && chart.update) {
                chart.update();
            }
        });
    }
}

// Global initialization
console.log('Script loading...');

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Advanced Bot Auth Tester...');
    window.botTester = new AdvancedBotAuthTester();
});

// Also try immediate initialization if DOM is already ready
if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting...');
} else {
    console.log('DOM already loaded, initializing immediately...');
    window.botTester = new AdvancedBotAuthTester();
}