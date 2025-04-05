from flask import Flask, request, jsonify
from deepface import DeepFace
import base64
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/emotion', methods=['POST'])
def detect_emotion():
    try:
        data = request.get_json()
        image_data = data['image'].split(',')[1]  # Remove data:image/... prefix

        # Decode base64
        img_bytes = base64.b64decode(image_data)
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Analyze
        try:
            result = DeepFace.analyze(img_path=img, actions=['emotion'], enforce_detection=False)
            print("DeepFace Result:", result)  # Debugging
            dominant_emotion = result[0]['dominant_emotion']
            return jsonify({"emotion": dominant_emotion})
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "Emotion detection failed."}), 500

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Emotion detection failed."}), 500

if __name__ == '__main__':
    app.run(port=7000)
