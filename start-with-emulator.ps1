# Script para iniciar la app con Firebase Emulator
Write-Host "🚀 Iniciando Firebase Emulator..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Este script iniciará:" -ForegroundColor Yellow
Write-Host "- Firebase Storage en localhost:9199" -ForegroundColor Green
Write-Host "- Firebase Auth en localhost:9099" -ForegroundColor Green
Write-Host "- Firestore en localhost:8080" -ForegroundColor Green
Write-Host "- Emulator UI en http://localhost:4000" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl + C para detener" -ForegroundColor Yellow
Write-Host ""

# Iniciar emulador
npx firebase emulators:start

