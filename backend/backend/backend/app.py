from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import sqlite3
import json
import datetime
from models.fraud_detector import FraudDetector
import os

app = Flask(__name__)
CORS(app)

# Initialize fraud detector
fraud_detector = FraudDetector()

# Database setup
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            behavioral_data TEXT,
            geolocation_data TEXT,
            honeypot_triggered BOOLEAN,
            risk_score REAL,
            is_fraud BOOLEAN,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'pending'
        )
    ''')
    
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return "Fraud Detection System API is running!"

@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        behavioral_data = data.get('behavioral_data', {})
        geolocation_data = data.get('geolocation_data', {})
        honeypot_triggered = bool(data.get('honeypot_field', '').strip())
        
        # Basic validation
        if not all([name, email, phone]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Run fraud detection
        fraud_result = fraud_detector.predict(
            behavioral_data, 
            geolocation_data, 
            honeypot_triggered
        )
        
        # Determine registration status
        if fraud_result['risk_score'] > 0.7:
            status = 'blocked'
        elif fraud_result['risk_score'] > 0.4:
            status = 'review'
        else:
            status = 'approved'
        
        # Save to database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO registrations 
            (name, email, phone, behavioral_data, geolocation_data, 
             honeypot_triggered, risk_score, is_fraud, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            name, email, phone,
            json.dumps(behavioral_data),
            json.dumps(geolocation_data),
            honeypot_triggered,
            fraud_result['risk_score'],
            fraud_result['is_fraud'],
            status
        ))
        
        registration_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'registration_id': registration_id,
            'status': status,
            'risk_score': fraud_result['risk_score'],
            'message': {
                'approved': 'Registration successful! Please check your phone for SMS verification.',
                'review': 'Registration under review. Our team will contact you shortly.',
                'blocked': 'Registration blocked due to suspicious activity.'
            }[status]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/registrations', methods=['GET'])
def get_registrations():
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, email, phone, risk_score, is_fraud, status, timestamp
            FROM registrations 
            ORDER BY timestamp DESC
        ''')
        
        registrations = []
        for row in cursor.fetchall():
            registrations.append({
                'id': row[0],
                'name': row[1],
                'email': row[2],
                'phone': row[3],
                'risk_score': row[4],
                'is_fraud': row[5],
                'status': row[6],
                'timestamp': row[7]
            })
        
        conn.close()
        
        return jsonify({
            'success': True,
            'registrations': registrations
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/update_status', methods=['POST'])
def update_status():
    try:
        data = request.json
        registration_id = data.get('id')
        new_status = data.get('status')
        
        if new_status not in ['approved', 'blocked', 'review']:
            return jsonify({'error': 'Invalid status'}), 400
        
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE registrations 
            SET status = ? 
            WHERE id = ?
        ''', (new_status, registration_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
