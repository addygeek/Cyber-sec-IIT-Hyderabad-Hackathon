import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import pickle
import os

class FraudDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        
    def extract_features(self, behavioral_data, geolocation_data, honeypot_triggered):
        """Extract features from raw data"""
        features = {}
        
        # Behavioral features
        if behavioral_data:
            keystroke_times = behavioral_data.get('keystroke_times', [])
            mouse_movements = behavioral_data.get('mouse_movements', [])
            
            # Keystroke analysis
            if len(keystroke_times) > 1:
                intervals = np.diff(keystroke_times)
                features['avg_keystroke_interval'] = np.mean(intervals)
                features['std_keystroke_interval'] = np.std(intervals)
                features['typing_speed'] = len(keystroke_times) / (keystroke_times[-1] - keystroke_times[0]) if len(keystroke_times) > 1 else 0
            else:
                features['avg_keystroke_interval'] = 0
                features['std_keystroke_interval'] = 0
                features['typing_speed'] = 0
            
            # Mouse movement analysis
            if len(mouse_movements) > 1:
                distances = []
                for i in range(1, len(mouse_movements)):
                    prev = mouse_movements[i-1]
                    curr = mouse_movements[i]
                    dist = np.sqrt((curr['x'] - prev['x'])**2 + (curr['y'] - prev['y'])**2)
                    distances.append(dist)
                
                features['avg_mouse_speed'] = np.mean(distances) if distances else 0
                features['mouse_movement_variance'] = np.var(distances) if distances else 0
            else:
                features['avg_mouse_speed'] = 0
                features['mouse_movement_variance'] = 0
        else:
            features.update({
                'avg_keystroke_interval': 0,
                'std_keystroke_interval': 0,
                'typing_speed': 0,
                'avg_mouse_speed': 0,
                'mouse_movement_variance': 0
            })
        
        # Geolocation features
        features['has_geolocation'] = 1 if geolocation_data else 0
        features['latitude'] = geolocation_data.get('latitude', 0) if geolocation_data else 0
        features['longitude'] = geolocation_data.get('longitude', 0) if geolocation_data else 0
        
        # Honeypot feature
        features['honeypot_triggered'] = 1 if honeypot_triggered else 0
        
        return features
    
    def create_sample_training_data(self):
        """Create sample training data for demonstration"""
        np.random.seed(42)
        n_samples = 1000
        
        # Generate normal user behavior
        normal_data = []
        for _ in range(int(n_samples * 0.9)):
            sample = {
                'avg_keystroke_interval': np.random.normal(150, 30),  # milliseconds
                'std_keystroke_interval': np.random.normal(50, 15),
                'typing_speed': np.random.normal(5, 1.5),  # keys per second
                'avg_mouse_speed': np.random.normal(100, 25),
                'mouse_movement_variance': np.random.normal(500, 150),
                'has_geolocation': 1,
                'latitude': np.random.normal(28.6139, 2),  # Around Delhi
                'longitude': np.random.normal(77.2090, 2),
                'honeypot_triggered': 0
            }
            normal_data.append(sample)
        
        # Generate fraudulent behavior
        fraud_data = []
        for _ in range(int(n_samples * 0.1)):
            sample = {
                'avg_keystroke_interval': np.random.normal(50, 10),  # Very fast typing
                'std_keystroke_interval': np.random.normal(5, 2),   # Very consistent
                'typing_speed': np.random.normal(15, 3),  # Superhuman speed
                'avg_mouse_speed': np.random.normal(300, 50),  # Very fast mouse
                'mouse_movement_variance': np.random.normal(50, 15),  # Very consistent
                'has_geolocation': np.random.choice([0, 1]),
                'latitude': np.random.normal(40.7128, 10),  # Different location
                'longitude': np.random.normal(-74.0060, 10),
                'honeypot_triggered': np.random.choice([0, 1], p=[0.7, 0.3])
            }
            fraud_data.append(sample)
        
        all_data = normal_data + fraud_data
        return pd.DataFrame(all_data)
    
    def train(self):
        """Train the fraud detection model"""
        # Create sample training data
        training_data = self.create_sample_training_data()
        
        # Prepare features
        feature_columns = ['avg_keystroke_interval', 'std_keystroke_interval', 'typing_speed',
                          'avg_mouse_speed', 'mouse_movement_variance', 'has_geolocation',
                          'latitude', 'longitude', 'honeypot_triggered']
        
        X = training_data[feature_columns].values
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train model
        self.model.fit(X_scaled)
        self.is_trained = True
        
        print("Model trained successfully!")
        return True
    
    def predict(self, behavioral_data, geolocation_data, honeypot_triggered):
        """Predict if registration is fraudulent"""
        if not self.is_trained:
            self.train()
        
        # Extract features
        features = self.extract_features(behavioral_data, geolocation_data, honeypot_triggered)
        
        # Convert to array
        feature_array = np.array([[
            features['avg_keystroke_interval'],
            features['std_keystroke_interval'],
            features['typing_speed'],
            features['avg_mouse_speed'],
            features['mouse_movement_variance'],
            features['has_geolocation'],
            features['latitude'],
            features['longitude'],
            features['honeypot_triggered']
        ]])
        
        # Scale features
        feature_scaled = self.scaler.transform(feature_array)
        
        # Predict
        anomaly_score = self.model.decision_function(feature_scaled)[0]
        is_anomaly = self.model.predict(feature_scaled)[0] == -1
        
        # Calculate risk score (0-1)
        risk_score = max(0, min(1, (0.5 - anomaly_score) / 1.0))
        
        return {
            'is_fraud': is_anomaly,
            'risk_score': risk_score,
            'anomaly_score': anomaly_score,
            'features': features
        }
