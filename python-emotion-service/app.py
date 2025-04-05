from flask import Flask, request, jsonify
from deepface import DeepFace
import base64
import cv2
import numpy as np
import os

app = Flask(__name__)

# Load your downloaded Haarcascade XML file
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

@app.route('/emotion', methods=['POST'])
def detect_emotion():
    try:
        data = request.get_json()
        image_data = data['image'].split(',')[1]

        # Decode base64 image
        img_bytes = base64.b64decode(image_data)
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Detect faces using XML model
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        if len(faces) == 0:
            return jsonify({"error": "No face detected"}), 400

        # Optional: Crop the first detected face (if you want to use only face area)
        (x, y, w, h) = faces[0]
        face_img = img[y:y+h, x:x+w]

        # Analyze face emotion with DeepFace
        result = DeepFace.analyze(img_path=face_img, actions=['emotion'], enforce_detection=False)
        dominant_emotion = result[0]['dominant_emotion']

        return jsonify({"emotion": dominant_emotion})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Emotion detection failed."}), 500

if __name__ == '__main__':
    app.run(port=7000)
    
