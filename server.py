from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, template_folder="templates", static_folder="front")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/address", methods=["GET"])
def get_address():
    postal_code = request.args.get("postalCode")

    if not postal_code:
        return jsonify({"error": "郵便番号が指定されていません"}), 400

    try:
        response = requests.get(
            f"https://jp-postal-code-api.ttskch.com/api/v1/{postal_code}.json"
        )

        if response.status_code != 200:
            return jsonify({"error": "外部APIの呼び出しに失敗しました"}), 500

        data = response.json()
        address_data = data.get("addresses", [])

        if address_data and len(address_data) > 0 and "ja" in address_data[0]:
            ja_data = address_data[0]["ja"]
            return jsonify(
                {
                    "prefecture": ja_data.get("prefecture", ""),
                    "address1": ja_data.get("address1", ""),
                    "address2": ja_data.get("address2", ""),
                }
            )
        else:
            return jsonify({"error": "住所が見つかりません"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
