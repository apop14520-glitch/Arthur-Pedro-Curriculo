$ErrorActionPreference = 'SilentlyContinue'
$projectDir = $PSScriptRoot
$pidFile = Join-Path $projectDir 'data\e-curriculo-build-8.pid'

if (-not (Test-Path $pidFile)) {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show('O E-Currículo já está parado.', 'E-Currículo | Arthur Pedro', 'OK', 'Information') | Out-Null
    exit 0
}

$savedPid = [int](Get-Content $pidFile)
if (Get-Process -Id $savedPid -ErrorAction SilentlyContinue) {
    & taskkill.exe /PID $savedPid /T /F 2>$null | Out-Null
}
Remove-Item -LiteralPath $pidFile -Force
Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show('E-Currículo encerrado com sucesso.', 'E-Currículo | Arthur Pedro', 'OK', 'Information') | Out-Null
