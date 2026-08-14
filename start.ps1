$ErrorActionPreference = 'Stop'
$projectDir = $PSScriptRoot
$dataDir = Join-Path $projectDir 'data'
$logsDir = Join-Path $projectDir 'logs'
$pidFile = Join-Path $dataDir 'e-curriculo-build-9.pid'
$siteUrl = 'http://127.0.0.1:5388/admin.html?build=E-CURRICULO-BUILD-9-DUAL-VIEW'

New-Item -ItemType Directory -Force -Path $dataDir, $logsDir | Out-Null

function Test-ECurriculo {
    try {
        $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 1
        return $response.StatusCode -eq 200 -and $response.Content -match 'E-CURRICULO-BUILD-9-DUAL-VIEW'
    } catch {
        return $false
    }
}

if (Test-Path $pidFile) {
    $savedPid = [int](Get-Content $pidFile -ErrorAction SilentlyContinue)
    if (Get-Process -Id $savedPid -ErrorAction SilentlyContinue) {
        if (Test-ECurriculo) {
            Start-Process $siteUrl
            exit 0
        }
        & taskkill.exe /PID $savedPid /T /F 2>$null | Out-Null
    }
    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
}

$npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npm) {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show('O Node.js não foi encontrado. Instale o Node.js e tente novamente.', 'E-Currículo | Arthur Pedro', 'OK', 'Error') | Out-Null
    exit 1
}

Set-Location $projectDir
if (-not (Test-Path (Join-Path $projectDir 'node_modules'))) {
    & $npm.Source install
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

$outLog = Join-Path $logsDir 'e-curriculo-output.log'
$errorLog = Join-Path $logsDir 'e-curriculo-error.log'
$arguments = @('run', 'dev', '--', '--host', '127.0.0.1', '--port', '5388', '--strictPort')
$server = Start-Process -FilePath $npm.Source -ArgumentList $arguments -WorkingDirectory $projectDir -WindowStyle Hidden -RedirectStandardOutput $outLog -RedirectStandardError $errorLog -PassThru
$server.Id | Set-Content -Path $pidFile -Encoding ascii

$ready = $false
for ($attempt = 0; $attempt -lt 40; $attempt++) {
    Start-Sleep -Milliseconds 500
    if ($server.HasExited) { break }
    if (Test-ECurriculo) { $ready = $true; break }
}

if ($ready) {
    Start-Process $siteUrl
    exit 0
}

if (-not $server.HasExited) {
    & taskkill.exe /PID $server.Id /T /F 2>$null | Out-Null
}
Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show('O E-Currículo não iniciou. Verifique os arquivos da pasta logs.', 'E-Currículo | Arthur Pedro', 'OK', 'Warning') | Out-Null
exit 1
