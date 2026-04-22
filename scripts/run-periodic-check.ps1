$ErrorActionPreference = "Continue"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ReportDir = Join-Path $ProjectRoot "artifacts\periodic-qa"
New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportPath = Join-Path $ReportDir "qa-$timestamp.log"

function Write-Log {
  param([string]$Text)
  $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Text
  $line | Tee-Object -FilePath $reportPath -Append
}

Write-Log "Periodic QA start"

Push-Location $ProjectRoot
try {
  Write-Log "Run: scripts/qa-release.ps1"
  & "powershell.exe" -ExecutionPolicy Bypass -File ".\scripts\qa-release.ps1" 2>&1 | Tee-Object -FilePath $reportPath -Append
  $releaseExitCode = $LASTEXITCODE
  if ($releaseExitCode -eq 0) {
    Write-Log "Run: scripts/qa-vercel-smoke.mjs"
    & "C:\Program Files\nodejs\node.exe" ".\scripts\qa-vercel-smoke.mjs" 2>&1 | Tee-Object -FilePath $reportPath -Append
    $vercelExitCode = $LASTEXITCODE
    if ($vercelExitCode -eq 0) {
      Write-Log "Result: PASS"
      exit 0
    }
    Write-Log "Vercel smoke failed."
    exit 1
  }

  Write-Log "Release QA failed. Run auto-fix sequence."
  & "powershell.exe" -ExecutionPolicy Bypass -File ".\scripts\qa-fix.ps1" 2>&1 | Tee-Object -FilePath $reportPath -Append
  $fixExitCode = $LASTEXITCODE
  if ($fixExitCode -eq 0) {
    Write-Log "Auto-fix completed. Re-run release QA."
    & "powershell.exe" -ExecutionPolicy Bypass -File ".\scripts\qa-release.ps1" 2>&1 | Tee-Object -FilePath $reportPath -Append
    $secondReleaseExitCode = $LASTEXITCODE
    if ($secondReleaseExitCode -eq 0) {
      Write-Log "Result: PASS after auto-fix"
      exit 0
    }
  }

  Write-Log "Result: FAIL - manual review required"
  exit 1
}
finally {
  Pop-Location
  Write-Log "Periodic QA end"
}
