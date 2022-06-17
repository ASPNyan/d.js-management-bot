$Current = Test-Path -Path .\setup.ps1
$Containing = Test-Path -Path ..\setup.ps1
$NotFirstRun = Test-Path -Path .\firstrun
$dotGithub = Test-Path -Path .\.github
if ($Current -eq $True) {
  Remove-Item -Path .\setup.ps1
}
if ($Containing -eq $True) {
  Remove-Item -Path ..\setup.ps1
}
if ($dotGithub -eq $True) {
  Remove-Item -Path .\.github
}
if ($NotFirstRun -eq $False) {
  .\config.ps1
  New-Item .\firstrun
}
if ($NotFirstRun -eq $True) {
  $RunConfig = Read-Host -Prompt 'Edit Command Config? (y/n)'
  if ($RunConfig.toLower() -eq 'y') {
    .\config.ps1
  }
}

npm run dev
