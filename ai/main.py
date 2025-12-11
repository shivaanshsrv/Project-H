from flask import Flask, jsonify

app = Flask(__name__)

# A route that returns a simple string
@app.route('/')
def home():
    return "Server Running!"

# A route that returns JSON data (common for APIs)
@app.route('/api/data')
def api_data():
    data = {
        "message": "Data retrieved successfully",
        "status": "success",
        "items": ["item1", "item2", "item3"]
    }
    return jsonify(data)

if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0', port=5000)