$files = @(
    "C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app\js\constants.js",
    "C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app\js\storage.js",
    "C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app\js\analytics.js",
    "C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app\js\app.js"
)

$combined = ""
foreach ($f in $files) {
    $text = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    # Remove import statements
    $text = [System.Text.RegularExpressions.Regex]::Replace($text, "(?m)^import\s+[\s\S]*?from\s+['""][^'""]+['""];?", "")
    # Remove export keywords
    $text = [System.Text.RegularExpressions.Regex]::Replace($text, "(?m)^export\s+", "")
    $combined += $text + "`n`n"
}

$combined += "`ndocument.addEventListener('DOMContentLoaded', () => { window.app = new AppController(); });`n"

[System.IO.File]::WriteAllText("C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app\js\bundle.js", $combined, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "bundle.js successfully built!"
