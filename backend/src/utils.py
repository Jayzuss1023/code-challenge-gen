from fastapi import HTTPException
from clerk_backend_api import AuthenticateRequestOptions, Clerk
import os
import httpx
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request, status


load_dotenv()

clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

def convert_to_httpx(fastapi_request: Request) -> httpx.Request:
    return httpx.Request(
        method=fastapi_request.method,
        url=str(fastapi_request.url),
        headers=dict[str, str](fastapi_request.headers)
    )

# Backend authentication for User Login
def authenticate_and_get_user_details(request):
    http_request = convert_to_httpx(request)
    try:
        request_state = clerk_sdk.authenticate_request(
            http_request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173", "http://localhost:5174"],
                jwt_key=os.getenv("JWT_KEY"),
            ),
        )

        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Invalid token")

        user_id = request_state.payload.get("sub")


        return {"user_id": user_id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

