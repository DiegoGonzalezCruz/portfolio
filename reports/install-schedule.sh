#!/bin/zsh
# Installs (or reinstalls) the macOS LaunchAgent that emails the weekly report
# every Monday at 8:00 local time. If the Mac is asleep then, launchd runs it on
# wake; if it's powered off, that week is skipped.
#
#   zsh reports/install-schedule.sh            # install / update
#   zsh reports/install-schedule.sh --remove   # uninstall
#
# Re-run it after switching Node versions (the plist pins node's absolute path).
set -euo pipefail

label="com.chileandeveloper.weekly-report"
plist="$HOME/Library/LaunchAgents/$label.plist"
repo="${0:A:h:h}"
logs="$HOME/Library/Logs/chileandeveloper"
node_bin="$(command -v node)"

launchctl bootout "gui/$(id -u)/$label" 2>/dev/null || true
if [[ "${1:-}" == "--remove" ]]; then
  rm -f "$plist"
  echo "Removed $label"
  exit 0
fi

mkdir -p "$logs" "$HOME/Library/LaunchAgents"
cat > "$plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$label</string>
  <key>WorkingDirectory</key><string>$repo</string>
  <key>ProgramArguments</key>
  <array>
    <string>$node_bin</string>
    <string>--disable-warning=MODULE_TYPELESS_PACKAGE_JSON</string>
    <string>--env-file=.env.ads</string>
    <string>reports/weekly.mts</string>
    <string>--email</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key><string>$HOME</string>
    <key>PATH</key><string>${node_bin:h}:/usr/bin:/bin:/usr/sbin:/sbin</string>
  </dict>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Weekday</key><integer>1</integer>
    <key>Hour</key><integer>8</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>RunAtLoad</key><false/>
  <key>StandardOutPath</key><string>$logs/weekly-report.log</string>
  <key>StandardErrorPath</key><string>$logs/weekly-report.err.log</string>
</dict>
</plist>
PLIST

plutil -lint "$plist" >/dev/null
launchctl bootstrap "gui/$(id -u)" "$plist"
echo "Installed $label: Mondays 08:00, logs in $logs"
echo "Run it now with: launchctl kickstart gui/$(id -u)/$label"
