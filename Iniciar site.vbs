Option Explicit

Dim shell, files, projectFolder, command, logFile
Set shell = CreateObject("WScript.Shell")
Set files = CreateObject("Scripting.FileSystemObject")

projectFolder = files.GetParentFolderName(WScript.ScriptFullName)
logFile = projectFolder & "\vite-local.log"

' Instala as dependências somente na primeira execução.
If Not files.FolderExists(projectFolder & "\node_modules") Then
  command = "cmd.exe /d /s /c ""cd /d """ & projectFolder & """ && npm install > """ & logFile & """ 2>&1"""
  shell.Run command, 0, True

  If Not files.FolderExists(projectFolder & "\node_modules") Then
    MsgBox "Não foi possível preparar o site. Verifique se o Node.js está instalado. Consulte o arquivo vite-local.log para detalhes.", 16, "Arthur Pedro — Site"
    WScript.Quit 1
  End If
End If

' Inicia o servidor em segundo plano, sempre na porta 5173.
command = "cmd.exe /d /s /c ""cd /d """ & projectFolder & """ && npm run dev -- --host 127.0.0.1 --port 5173 --strictPort >> """ & logFile & """ 2>&1"""
shell.Run command, 0, False

WScript.Sleep 2500
shell.Run "http://localhost:5173", 1, False

