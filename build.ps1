$ErrorActionPreference = "Stop"

Write-Host "Installing portfolio dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

Write-Host "Checking and building the static website..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed." }

Write-Host ""
Write-Host "Build complete. Upload the contents of the 'dist' folder to your hosting provider." -ForegroundColor Green
Write-Host "For GitHub Pages, use the included GitHub Actions workflow instead of uploading dist manually."
