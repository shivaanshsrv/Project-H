import httpx

AI_SERVICE_URL = "http://127.0.0.1:5001/analyze-roof"

async def send_to_ai_service(image_path: str):
    async with httpx.AsyncClient(timeout=120) as client:
        with open(image_path, "rb") as f:
            files = {
                "image": (image_path.split("/")[-1], f, "image/jpeg")
            }

            response = await client.post(AI_SERVICE_URL, files=files)

        response.raise_for_status()
        return response.json()
