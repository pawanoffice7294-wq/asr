# ASR Enterprises - Automator
# This script starts both the Backend (.NET) and Frontend (Vite) in separate windows.
# It also attempts to create the database if it's missing.

Clear-Host
Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "         ASR ENTERPRISES - STARTUP              " -ForegroundColor Cyan
Write-Host "------------------------------------------------" -ForegroundColor Cyan

$root = $PSScriptRoot
if ($root -eq "") { $root = Get-Location }

# 0. Database Check (New!)
Write-Host "[0/3] Checking Database..." -ForegroundColor Green
$pgPaths = @(
    "C:\Program Files\PostgreSQL\13\bin\createdb.exe",
    "C:\Program Files\PostgreSQL\14\bin\createdb.exe",
    "C:\Program Files\PostgreSQL\15\bin\createdb.exe",
    "C:\Program Files\PostgreSQL\16\bin\createdb.exe",
    "C:\Program Files\PostgreSQL\17\bin\createdb.exe"
)

$createdb = $null
foreach ($path in $pgPaths) {
    if (Test-Path $path) {
        $createdb = $path
        break
    }
}

if ($createdb) {
    Write-Host "      Found PostgreSQL tools at: $(Split-Path $createdb -Parent)" -ForegroundColor Gray
    Write-Host "      Attempting to create 'asr_db' if it doesn't exist..." -ForegroundColor Yellow
    # Note: This might ask for a password if the user hasn't set up pgpass or environment variables
    # We use -U postgres because that's what's in appsettings.json
    Start-Process -FilePath $createdb -ArgumentList "-U postgres asr_db" -Wait -WindowStyle Hidden -ErrorAction SilentlyContinue
}
else {
    Write-Host "      WARNING: Could not find PostgreSQL tools in standard locations." -ForegroundColor Red
    Write-Host "      Please ensure 'asr_db' exists manually." -ForegroundColor Red
}

# 1. Start Backend
Write-Host "[1/3] Launching Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; Write-Host 'Starting ASP.NET Core Backend...' -ForegroundColor Green; dotnet run"

# 2. Start Frontend
Write-Host "[2/3] Launching Frontend..." -ForegroundColor Green

# Check if npm install is needed
if (-not (Test-Path "$root\frontend\node_modules")) {
    Write-Host "      (node_modules missing, running npm install first...)" -ForegroundColor Yellow
    Start-Process powershell -Wait -ArgumentList "-Command", "cd '$root\frontend'; npm install"
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; Write-Host 'Starting Vite Frontend...' -ForegroundColor Green; npm run dev"

Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "SUCCESS: Services are starting." -ForegroundColor Yellow
Write-Host "API Documentation: http://localhost:5288/scalar/v1"
Write-Host "Frontend: http://localhost:5173"
Write-Host "------------------------------------------------" -ForegroundColor Cyan
