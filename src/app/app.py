from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Add this function to get the base URL
def get_base_url():
    if request.headers.get('X-Forwarded-Host'):
        # Handle proxy/ngrok case
        proto = request.headers.get('X-Forwarded-Proto', 'http')
        host = request.headers.get('X-Forwarded-Host')
        return f"{proto}://{host}"
    else:
        # Local development
        return request.url_root.rstrip('/')

@app.route("/", methods=["GET"])
def api_docs():
    return jsonify({
        "name": "Resume Parser API",
        "endpoints": {
            "/upload": {
                "method": "POST",
                "description": "Upload a PDF file to parse",
                "params": {"file": "PDF file (multipart/form-data)"},
                "returns": {"file_url": "URL to access the uploaded file"}
            },
            "/uploads/<filename>": {
                "method": "GET",
                "description": "Access an uploaded PDF file",
                "returns": "The PDF file"
            },
            "/parse": {
                "method": "POST",
                "description": "Store parsed resume data",
                "params": {"json": "Resume data in JSON format"},
                "returns": "The parsed resume data"
            },
            "/parse-file": {
                "method": "POST",
                "description": "Upload and prepare a file for parsing",
                "params": {"file": "PDF file (multipart/form-data)"},
                "returns": {"file_url": "URL to access the file"}
            }
        }
    })

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    # Return the file URL to access it - use dynamic base URL
    file_url = f"{get_base_url()}/uploads/{filename}"
    return jsonify({"file_url": file_url})

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/parse", methods=["POST"])
def parse_resume():
    """
    Endpoint to receive parsed resume data from the frontend
    and return it as JSON for API consumers
    """
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    # Get the parsed resume data sent from the frontend
    parsed_data = request.json
    
    # Return the parsed data as JSON
    return jsonify(parsed_data)

@app.route("/parse-file", methods=["POST"])
def parse_file():
    """Endpoint to upload and parse a resume file directly"""
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)
    
    # Use dynamic base URL
    file_url = f"{get_base_url()}/uploads/{filename}"
    
    # Return file URL - client needs to handle parsing
    return jsonify({
        "file_url": file_url,
        "message": "File uploaded successfully. Use the frontend to parse or implement parsing in your client."
    })

if __name__ == "__main__":
    app.run(debug=True)
