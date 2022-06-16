Invoke-WebRequest 'https://github.com/ASPNyan/d.js-management-bot/archive/refs/heads/main.zip' -OutFile .\management-bot.zip
Expand-Archive .\management-bot.zip .\
Rename-Item .\d.js-management-bot-main .\Management-Bot
Remove-Item .\management-bot.zip
cd .\Management-Bot
Remove-Item .\.env

$Token = Read-Host -Prompt 'Input Your Bot Token Here'
$Mongo = Read-Host -Prompt 'Input Your MongoDB URI Here'

Add-Content -Path .\.env -Value ('TOKEN='+$Token)
Add-Content -Path .\.env -Value ('MONGODB='+$Mongo)

npm i

.\start.ps1
