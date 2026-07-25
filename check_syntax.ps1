$code = [System.IO.File]::ReadAllText("C:\Users\yosak\.gemini\antigravity\scratch\scout-analytics-app\js\bundle.js", [System.Text.Encoding]::UTF8)

$openCurly = 0
$closeCurly = 0
$openParen = 0
$closeParen = 0

foreach ($char in $code.ToCharArray()) {
    if ($char -eq '{') { $openCurly++ }
    if ($char -eq '}') { $closeCurly++ }
    if ($char -eq '(') { $openParen++ }
    if ($char -eq ')') { $closeParen++ }
}

Write-Host "Curly Braces - Open: $openCurly, Close: $closeCurly, Diff: $($openCurly - $closeCurly)"
Write-Host "Parentheses - Open: $openParen, Close: $closeParen, Diff: $($openParen - $closeParen)"
