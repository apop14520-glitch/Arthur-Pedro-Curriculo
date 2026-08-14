Option Explicit

Dim shell, files, projectFolder, command, logFile, siteUrl, ready, attempt, http
Set shell = CreateObject("WScript.Shell")
Set files = CreateObject("Scripting.FileSystemObject")

projectFolder = files.GetParentFolderName(WScript.ScriptFullName)
logFile = projectFolder & "\e-curriculo-local.log"
siteUrl = "http://127.0.0.1:5274/?versao=5"

If Not files.FolderExists(projectFolder & "\node_modules") Then
  command = "cmd.exe /d /s /c ""cd /d """ & projectFolder & """ && npm install > """ & logFile & """ 2>&1"""
  shell.Run command, 0, True
  If Not files.FolderExists(projectFolder & "\node_modules") Then
    MsgBox "Não foi possível preparar o E-Currículo. Verifique se o Node.js está instalado. Consulte e-curriculo-local.log.", 16, "E-Currículo | Arthur Pedro"
    WScript.Quit 1
  End If
End If

command = "cmd.exe /d /s /c ""cd /d """ & projectFolder & """ && npm run dev -- --host 127.0.0.1 --port 5274 --strictPort > """ & logFile & """ 2>&1"""
shell.Run command, 0, False

ready = False
For attempt = 1 To 40
  WScript.Sleep 500
  On Error Resume Next
  Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
  http.SetTimeouts 500, 500, 500, 500
  http.Open "GET", siteUrl, False
  http.Send
  If Err.Number = 0 Then
    If http.Status = 200 And InStr(1, http.ResponseText, "E-CURR", vbTextCompare) > 0 Then ready = True
  End If
  Err.Clear
  On Error GoTo 0
  If ready Then Exit For
Next

If ready Then
  shell.Run siteUrl, 1, False
Else
  MsgBox "O E-Currículo novo não conseguiu iniciar na porta 5274. Feche outros sites locais, tente novamente e consulte e-curriculo-local.log se necessário.", 48, "E-Currículo | Arthur Pedro"
End If

