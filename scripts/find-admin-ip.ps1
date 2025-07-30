# Admin IP Setup Helper Script for Windows PowerShell
# This script helps you find your IP address for admin panel access

Write-Host "🔍 Finding your IP addresses for admin panel setup..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📍 LOCAL DEVELOPMENT:" -ForegroundColor Yellow
Write-Host "For local development, use: 127.0.0.1,::1,localhost"
Write-Host ""

Write-Host "🌐 YOUR PUBLIC IP ADDRESS:" -ForegroundColor Green
Write-Host "This is your internet-facing IP that you'll need for production:"

# Try to get public IP
Write-Host "Checking public IP... " -NoNewline
try {
    $PublicIP = (Invoke-WebRequest -Uri "https://ifconfig.me" -UseBasicParsing -TimeoutSec 10).Content.Trim()
    if (-not $PublicIP) {
        $PublicIP = (Invoke-WebRequest -Uri "https://ipinfo.io/ip" -UseBasicParsing -TimeoutSec 10).Content.Trim()
    }
    if (-not $PublicIP) {
        $PublicIP = (Invoke-WebRequest -Uri "https://checkip.amazonaws.com" -UseBasicParsing -TimeoutSec 10).Content.Trim()
    }
    Write-Host "✅ $PublicIP" -ForegroundColor Green
} catch {
    Write-Host "❌ Could not auto-detect" -ForegroundColor Red
    Write-Host "Please visit: https://whatismyipaddress.com/" -ForegroundColor Yellow
    $PublicIP = $null
}

Write-Host ""
Write-Host "🖥️  LOCAL NETWORK IP:" -ForegroundColor Magenta
Write-Host "Your local network IP (useful for testing on same network):"

# Get local IP
try {
    $LocalIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notmatch "127.0.0.1" -and $_.AddressState -eq "Preferred"} | Select-Object -First 1).IPAddress
    if ($LocalIP) {
        Write-Host "✅ $LocalIP" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not auto-detect local IP" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Could not auto-detect local IP" -ForegroundColor Red
    $LocalIP = $null
}

Write-Host ""
Write-Host "📝 RECOMMENDED .env CONFIGURATION:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

if ($PublicIP) {
    Write-Host "# For production deployment:"
    Write-Host "ADMIN_PASSWORD=your-very-secure-password-here"
    Write-Host "ALLOWED_ADMIN_IPS=127.0.0.1,::1,localhost,$PublicIP"
    if ($LocalIP -and $LocalIP -ne $PublicIP) {
        Write-Host ""
        Write-Host "# Optional: Add local network IP for local testing:"
        Write-Host "ALLOWED_ADMIN_IPS=127.0.0.1,::1,localhost,$PublicIP,$LocalIP"
    }
} else {
    Write-Host "# For development only:"
    Write-Host "ADMIN_PASSWORD=your-secure-password-here"
    Write-Host "ALLOWED_ADMIN_IPS=127.0.0.1,::1,localhost"
    Write-Host ""
    Write-Host "# To add production IP, visit: https://whatismyipaddress.com/"
    Write-Host "# Then add your public IP to the list above"
}

Write-Host ""
Write-Host "🔧 MANUAL IP CHECK COMMANDS:" -ForegroundColor Yellow
Write-Host "============================" -ForegroundColor Yellow
Write-Host "Public IP:   curl ifconfig.me"
Write-Host "             (or visit https://whatismyipaddress.com/)"
Write-Host "Local IP:    ipconfig"
Write-Host "             Get-NetIPAddress -AddressFamily IPv4"

Write-Host ""
Write-Host "🌐 ONLINE IP CHECKERS:" -ForegroundColor Blue
Write-Host "=====================" -ForegroundColor Blue
Write-Host "• https://whatismyipaddress.com/"
Write-Host "• https://ipinfo.io/"
Write-Host "• https://checkip.amazonaws.com/"
Write-Host ""

Write-Host "🛡️  SECURITY REMINDERS:" -ForegroundColor Red
Write-Host "======================" -ForegroundColor Red
Write-Host "• Use a strong admin password (12+ characters)"
Write-Host "• Keep your IP list minimal (only trusted IPs)"  
Write-Host "• Your public IP may change - check periodically"
Write-Host "• Monitor admin access logs for security"
Write-Host "• Consider using a VPN for consistent IP when traveling"
Write-Host ""

Write-Host "✅ Setup complete! Update your .env file with the IPs above." -ForegroundColor Green

# Pause to let user read the output
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
