# Master Brush Project Cleanup Script
Write-Host "🧹 Cleaning up Master Brush project..." -ForegroundColor Cyan

# Backend cleanup
Write-Host "`n📦 Cleaning backend..." -ForegroundColor Yellow
cd backend

$backendFilesToRemove = @(
    "tests",
    "jest.config.ts",
    "jest.e2e.config.ts",
    "jest.setup.js",
    "jest.setup.ts",
    "check-data.js",
    "clear-dummy-data.js",
    "create-admin.js",
    "test-email.js",
    "Dockerfile",
    "docker-compose.yml",
    ".husky",
    ".lintstagedrc.json",
    ".env.test",
    "openapi.yaml"
)

foreach ($file in $backendFilesToRemove) {
    if (Test-Path $file) {
        Remove-Item -Recurse -Force $file
        Write-Host "  ✓ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⊘ Not found: $file" -ForegroundColor Gray
    }
}

# Frontend cleanup
Write-Host "`n🎨 Cleaning frontend..." -ForegroundColor Yellow
cd ../frontend

$frontendFilesToRemove = @(
    "Dockerfile",
    "docker-compose.yml"
)

foreach ($file in $frontendFilesToRemove) {
    if (Test-Path $file) {
        Remove-Item -Recurse -Force $file
        Write-Host "  ✓ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⊘ Not found: $file" -ForegroundColor Gray
    }
}

cd ..

Write-Host "`n✨ Cleanup complete!" -ForegroundColor Green
Write-Host "📊 Removed unnecessary test files, dev scripts, and Docker files" -ForegroundColor Cyan
Write-Host "`n🚀 Your project is now ready for deployment!" -ForegroundColor Yellow
