#!/bin/bash

# Admin IP Setup Helper Script
# This script helps you find your IP address for admin panel access

echo "🔍 Finding your IP addresses for admin panel setup..."
echo "=================================================="
echo ""

echo "📍 LOCAL DEVELOPMENT:"
echo "For local development, use: 127.0.0.1,::1,localhost"
echo ""

echo "🌐 YOUR PUBLIC IP ADDRESS:"
echo "This is your internet-facing IP that you'll need for production:"

# Try multiple services to get public IP
echo -n "Checking public IP... "

# Try different services
PUBLIC_IP=""
if command -v curl &> /dev/null; then
    PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null)
    if [ -z "$PUBLIC_IP" ]; then
        PUBLIC_IP=$(curl -s ipinfo.io/ip 2>/dev/null)
    fi
    if [ -z "$PUBLIC_IP" ]; then
        PUBLIC_IP=$(curl -s checkip.amazonaws.com 2>/dev/null)
    fi
fi

if [ -n "$PUBLIC_IP" ]; then
    echo "✅ $PUBLIC_IP"
else
    echo "❌ Could not auto-detect"
    echo "Please visit: https://whatismyipaddress.com/"
fi

echo ""
echo "🖥️  LOCAL NETWORK IP:"
echo "Your local network IP (useful for testing on same network):"

# Get local IP based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    LOCAL_IP=$(hostname -I | awk '{print $1}')
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash/Cygwin)
    LOCAL_IP=$(ipconfig | grep "IPv4 Address" | head -1 | awk '{print $NF}' | tr -d '\r')
fi

if [ -n "$LOCAL_IP" ]; then
    echo "✅ $LOCAL_IP"
else
    echo "❌ Could not auto-detect local IP"
fi

echo ""
echo "📝 RECOMMENDED .env CONFIGURATION:"
echo "=================================="
echo ""

if [ -n "$PUBLIC_IP" ]; then
    echo "# For production deployment:"
    echo "ADMIN_PASSWORD=your-very-secure-password-here"
    echo "ALLOWED_ADMIN_IPS=127.0.0.1,::1,localhost,$PUBLIC_IP"
    if [ -n "$LOCAL_IP" ] && [ "$LOCAL_IP" != "$PUBLIC_IP" ]; then
        echo ""
        echo "# Optional: Add local network IP for local testing:"
        echo "ALLOWED_ADMIN_IPS=127.0.0.1,::1,localhost,$PUBLIC_IP,$LOCAL_IP"
    fi
else
    echo "# For development only:"
    echo "ADMIN_PASSWORD=your-secure-password-here"
    echo "ALLOWED_ADMIN_IPS=127.0.0.1,::1,localhost"
    echo ""
    echo "# To add production IP, visit: https://whatismyipaddress.com/"
    echo "# Then add your public IP to the list above"
fi

echo ""
echo "🔧 MANUAL IP CHECK COMMANDS:"
echo "============================"
echo "Public IP:  curl ifconfig.me"
echo "Local IP:   "
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "           ifconfig | grep 'inet '"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "           hostname -I"
    echo "           ip addr show"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    echo "           ipconfig"
else
    echo "           ipconfig (Windows) or ifconfig (Mac/Linux)"
fi

echo ""
echo "🌐 ONLINE IP CHECKERS:"
echo "====================="
echo "• https://whatismyipaddress.com/"
echo "• https://ipinfo.io/"
echo "• https://checkip.amazonaws.com/"
echo ""

echo "🛡️  SECURITY REMINDERS:"
echo "======================"
echo "• Use a strong admin password (12+ characters)"
echo "• Keep your IP list minimal (only trusted IPs)"  
echo "• Your public IP may change - check periodically"
echo "• Monitor admin access logs for security"
echo "• Consider using a VPN for consistent IP when traveling"
echo ""

echo "✅ Setup complete! Update your .env file with the IPs above."
