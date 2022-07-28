cls
$ban = Read-Host -Prompt 'Enable Ban Command? (y/n)'
$docs = Read-Host -Prompt 'Enable Documentation Command? (y/n)'
$kick = Read-Host -Prompt 'Enable Kick Command? (y/n)'
$purge = Read-Host -Prompt 'Enable Purge Command? (y/n)'
$roles = Read-Host -Prompt 'Enable Roles Command? (y/n)'
$send = Read-Host -Prompt 'Enable Send Command? (y/n)'
if ($send.ToLower() = 'y') {
 $rolesmenu = Read-Host -Prompt 'Enable RolesMenu Command? (y/n)'
}
$timeout = Read-Host -Prompt 'Enable Timeout Command? (y/n)'
$vcdeaf = Read-Host -Prompt 'Enable VCDeafen Command? (y/n)'
$vcdc = Read-Host -Prompt 'Enable VCDisconnect Command? (y/n)'
$vcmute = Read-Host -Prompt 'Enable VCMute Command? (y/n)'
$warn = Read-Host -Prompt 'Enable Warn Commands? (y/n)'

if ($ban -ne 'y') {
 Rename-Item -Path .\commands\ban.ts -NewName 'ban.disabled'
}else {
 $BanDisable = Test-Path .\commands\ban.disabled
 if ($BanDisable -eq $True) {
   Rename-Item -Path commands\ban.disabled -NewName 'ban.ts'
 }
}
if ($docs -ne 'y') {
 Rename-Item -Path .\commands\documentation.ts -NewName 'documentation.disabled'
}else {
 $DocsDisable = Test-Path .\commands\documentation.disabled
 if ($DocsDisable -eq $True) {
   Rename-Item -Path .\commands\documentation.disabled -NewName 'documentation.ts'
 }
}
if ($kick -ne 'y') {
 Rename-Item -Path .\commands\kick.ts -NewName 'kick.disabled'
}else {
 $KickDisable = Test-Path .\commands\kick.disabled
 if ($KickDisable -eq $True) {
   Rename-Item -Path .\commands\kick.disabled -NewName 'kick.ts'
 }
}
if ($purge -ne 'y') {
 Rename-Item -Path .\commands\purge.ts -NewName 'purge.disabled'
}else {
 $PurgeDisable = Test-Path .\commands\purge.disabled
 if ($PurgeDisable -eq $True) {
   Rename-Item -Path .\commands\purge.disabled -NewName 'purge.ts'
 }
}
if ($roles -ne 'y') {
 Rename-Item -Path .\commands\roles.ts -NewName 'roles.disabled'
}else {
 $RolesDisable = Test-Path .\commands\roles.disabled
 if ($RolesDisable -eq $True) {
   Rename-Item -Path .\commands\roles.disabled -NewName 'roles.ts'
 }
}
if ($send -ne 'y') {
 Rename-Item -Path .\commands\send.ts -NewName 'send.disabled'
}else {
 $SendDisable = Test-Path .\commands\send.disabled
 if ($SendDisable -eq $True) {
   Rename-Item -Path .\commands\send.disabled -NewName 'send.ts'
 }
}
if ($rolesmenu -ne 'y') {
  Rename-Item -Path .\commands\rolesmenu.ts -NewName 'rolesmenu.disabled'
}else {
  $RolesMenuDisable = Test-Path .\commands\rolesmenu.disabled
  if ($RolesMenuDisable -eq $True) {
   Rename-Item -Path .\commands\rolesmenu.disabled -NewName 'rolesmenu.ts'
  }
}
if ($timeout -ne 'y') {
 Rename-Item -Path .\commands\timeout.ts -NewName 'timeout.disabled'
}else {
 $TimeoutDisable = Test-Path .\commands\timeout.disabled
 if ($TimeoutDisable -eq $True) {
   Rename-Item -Path .\commands\timeout.disabled -NewName 'timeout.ts'
 }
}
if ($vcdeaf -ne 'y') {
 Rename-Item -Path .\commands\vcdeafen.ts -NewName 'vcdeafen.disabled'
}else {
 $VCDeafDisable = Test-Path .\commands\vcdeafen.disabled
 if ($VCDeafDisable -eq $True) {
   Rename-Item -Path .\commands\vcdeafen.disabled -NewName 'vcdeafen.ts'
 }
}
if ($vcdc -ne 'y') {
 Rename-Item -Path .\commands\vcdisconnect.ts -NewName 'vcdisconnect.disabled'
}else {
 $VCDCDisable = Test-Path .\commands\vcdisconnect.disabled
 if ($VCDCDisable -eq $True) {
   Rename-Item -Path .\commands\vcdisconnect.disabled -NewName 'vcdisconnect.ts'
 }
}
if ($vcmute -ne 'y') {
 Rename-Item -Path .\commands\vcmute.ts -NewName 'vcmute.disabled'
}else {
 $VCMuteDisable = Test-Path .\commands\vcmute.disabled
 if ($VCMuteDisable -eq $True) {
   Rename-Item -Path .\commands\vcmute.disabled -NewName 'vcmute.ts'
 }
}
if ($warn -ne 'y') {
 Rename-Item -Path .\commands\warn.ts -NewName 'warn.disabled'
}else {
 $WarnDisable = Test-Path .\commands\warn.disabled
 if ($WarnDisable -eq $True) {
   Rename-Item -Path .\commands\warn.disabled -NewName 'warn.ts'
 }
}
