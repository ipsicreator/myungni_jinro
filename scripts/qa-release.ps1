$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

function Invoke-Step {
  param(
    [string]$Name,
    [string]$Command
  )
  Write-Host "`n[STEP] $Name"
  Invoke-Expression $Command
  if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] $Name"
    exit 1
  }
  Write-Host "[PASS] $Name"
}

Invoke-Step "Static QA" "& 'C:\Program Files\nodejs\node.exe' scripts\qa-static.mjs"
Invoke-Step "Type Check" "& 'C:\Program Files\nodejs\node.exe' .\node_modules\typescript\bin\tsc --noEmit"
Invoke-Step "Lint (warnings=fail)" "& 'C:\Program Files\nodejs\node.exe' .\node_modules\eslint\bin\eslint.js . --max-warnings=0"
Invoke-Step "Production Build" "& 'C:\Program Files\nodejs\node.exe' .\node_modules\next\dist\bin\next build --webpack"

Write-Host "`nQA_RELEASE_PASS"
