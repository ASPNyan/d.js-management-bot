$Current = Test-Path -Path .\setup.ps1
$Containing = Test-Path -Path ..\setup.ps1
if ($Current = $True) {
  Remove-Item -Path .\setup.ps1
}
if ($Containing = $True) {
  Remove-Item -Path ..\setup.ps1
}

npm run dev