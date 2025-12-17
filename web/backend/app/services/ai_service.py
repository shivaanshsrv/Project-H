import httpx

async def send_to_ai_service(file_path: str):
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            "http://localhost:5001/analyze", 
            files={"image": open(file_path, "rb")}
        )
        return response.json()
