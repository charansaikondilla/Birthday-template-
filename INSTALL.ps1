# 🚀 INSTALLATION SCRIPT
# Run this file in PowerShell to set up the project

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🎉 Birthday Number Scroller - Installation Script  " -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "📦 Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "───────────────────────────────────────────────────────" -ForegroundColor Gray

# Navigate to project directory
$projectPath = "d:\my clinet sample 1\birthday-number-scroller\components"
Write-Host "📂 Navigating to project folder..." -ForegroundColor Yellow
Write-Host "   Path: $projectPath" -ForegroundColor Gray

if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✅ Directory found" -ForegroundColor Green
} else {
    Write-Host "❌ Directory not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "───────────────────────────────────────────────────────" -ForegroundColor Gray

# Check if package.json exists
Write-Host "📄 Checking project files..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    exit 1
}

if (Test-Path "App.tsx") {
    Write-Host "✅ App.tsx found" -ForegroundColor Green
} else {
    Write-Host "❌ App.tsx not found!" -ForegroundColor Red
}

if (Test-Path "NumberScroller.tsx") {
    Write-Host "✅ NumberScroller.tsx found" -ForegroundColor Green
} else {
    Write-Host "❌ NumberScroller.tsx not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "───────────────────────────────────────────────────────" -ForegroundColor Gray

# Install dependencies
Write-Host "📥 Installing dependencies (this may take 2-3 minutes)..." -ForegroundColor Yellow
Write-Host "   Running: npm install" -ForegroundColor Gray
Write-Host ""

try {
    npm install
    Write-Host ""
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    Write-Host "   Try running: npm install --force" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ INSTALLATION COMPLETE!                           " -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 TO START THE APPLICATION:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "   This will open http://localhost:3000 in your browser" -ForegroundColor Gray
Write-Host ""

Write-Host "📚 DOCUMENTATION:" -ForegroundColor Cyan
Write-Host "   • README.md         - Full documentation" -ForegroundColor White
Write-Host "   • QUICKSTART.md     - Quick reference guide" -ForegroundColor White
Write-Host "   • HOW_IT_WORKS.md   - Game mechanics explained" -ForegroundColor White
Write-Host "   • ARCHITECTURE.md   - Visual diagrams" -ForegroundColor White
Write-Host "   • PROJECT_SUMMARY.md - Complete overview" -ForegroundColor White
Write-Host ""

Write-Host "🎮 WHAT TO EXPECT:" -ForegroundColor Cyan
Write-Host "   1. Numbers 1-22 displayed in zig-zag pattern" -ForegroundColor White
Write-Host "   2. Scroll down to see animated cyan path" -ForegroundColor White
Write-Host "   3. Progress tracked in header (X / 22)" -ForegroundColor White
Write-Host "   4. Smooth snap scrolling between numbers" -ForegroundColor White
Write-Host "   5. Full-screen immersive experience" -ForegroundColor White
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🎉 Ready to scroll! Have fun!                       " -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
