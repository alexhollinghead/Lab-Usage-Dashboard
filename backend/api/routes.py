from flask import Blueprint, jsonify, request
from api import services

main = Blueprint("main", __name__)

UPLOAD_HANDLERS = {
    "userfilter": services.upload_user_filter,
    "appfilter": services.upload_app_filter,
    "usage": services.upload_usage_data,
}


# Upload routes
@main.route("/upload", methods=["POST"])
def upload_data():
    file = request.files.get("file")

    if not file or file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    data_type = request.form.get("type")

    handler = UPLOAD_HANDLERS.get(data_type)

    if not handler:
        return jsonify({"error": "Invalid upload type"}), 400

    return handler(file)


@main.route("/dataframe")
def data():
    start_date = request.args.get("start")
    end_date = request.args.get("end")

    if not start_date or not end_date:
        return jsonify({"error": "Missing start or end date"}), 400

    # Convert start_date and end_date to integers and handle potential errors
    try:
        start_date = int(start_date)
        end_date = int(end_date)
    except ValueError:
        return jsonify({"error": "Invalid date format"}), 400

    return services.set_dataframe(start_date, end_date).to_json(), {
        "Content-Type": "application/json"
    }


# Usage routes
@main.route("/usage", methods=["GET"])
def usage():
    data_type = request.args["type"]
    start_date = request.args["start"]
    end_date = request.args["end"]
    return services.usage(data_type, start_date, end_date)
