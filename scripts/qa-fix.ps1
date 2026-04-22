$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

function Invoke-Step {
  param(
    [string]$Name,
    [string]$Command,
    [bool]$AllowFail = $false
  )
  Write-Host "`n[STEP] $Name"
  Invoke-Expression $Command
  if ($LASTEXITCODE -ne 0 -and -not $AllowFail) {
    Write-Host "[FAIL] $Name"
    exit 1
  }
  if ($LASTEXITCODE -ne 0 -and $AllowFail) {
    Write-Host "[WARN] $Name"
    return
  }
  Write-Host "[PASS] $Name"
}

Invoke-Step "ESLint Auto Fix" "& 'C:\Program Files\nodejs\node.exe' .\node_modules\eslint\bin\eslint.js . --fix" $true
Invoke-Step "Static QA" "& 'C:\Program Files\nodejs\node.exe' scripts\qa-static.mjs"
Invoke-Step "Type Check" "& 'C:\Program Files\nodejs\node.exe' .\node_modules\typescript\bin\tsc --noEmit"
Invoke-Step "Lint (warnings=fail)" "& 'C:\Program Files\nodejs\node.exe' .\node_modules\eslint\bin\eslint.js . --max-warnings=0"

Write-Host "`nQA_FIX_PASS"
