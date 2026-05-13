$ErrorActionPreference = "Stop"

Write-Host "Starting Python PII Scrubber on port 5001..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd python-scrubber; if (Test-Path venv\Scripts\activate.ps1) { .\venv\Scripts\activate.ps1 }; pip install -r requirements.txt; python -m spacy download en_core_web_sm; python -m uvicorn main:app --port 5001"

Write-Host "Starting Go Firewall Proxy on port 8080..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd go-backend; go mod tidy; go run ./cmd/proxy/main.go"

Write-Host "Starting React Frontend on port 5173..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm install; npm run dev"

Write-Host "ShieldProxy services are starting in new windows."
