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

$appRoot = "C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app"
$publicJsDir = Join-Path $appRoot "public\js"
if (-not (Test-Path $publicJsDir)) { New-Item -ItemType Directory -Path $publicJsDir -Force }

[System.IO.File]::WriteAllText((Join-Path $appRoot "js\bundle.js"), $combined, (New-Object System.Text.UTF8Encoding($false)))
[System.IO.File]::WriteAllText((Join-Path $appRoot "public\js\bundle.js"), $combined, (New-Object System.Text.UTF8Encoding($false)))

$cssPath = Join-Path $appRoot "styles.css"
if (Test-Path $cssPath) {
    Copy-Item -Path $cssPath -Destination (Join-Path $appRoot "public\styles.css") -Force
}

Write-Host "bundle.js & public assets successfully built!"
