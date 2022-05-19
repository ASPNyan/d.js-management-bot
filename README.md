# Discord Management Bot
### A Discord Bot Utilising Mainly [Discord.JS](https://github.com/DiscordJS/Discord.JS) & [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands)

This is a Discord Bot written in TypeScript for mainly User Management, including slash commands to Kick, Ban, Timeout, and Purge, as well as other commands.

Make sure to add your bot's token & MongoDB URI to the .env file provided so that the .env reads `TOKEN=// Your Token here (no space)` & `MONGODB=// Your URI here (no space)`
If you don't have/know how to make a MongoDB database, watch the video [__here__](https://www.youtube.com/watch?v=a3Gz_7KEJkQ).

If you do not want to install the Nodemon NPM package, change the "dev" script in the `package.json` from `"dev": "nodemon index.ts"` to `"dev": "ts-node index.ts"`

To add a slash command with [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands), add a .ts file to the 'commands' folder and insert the following code

**Note: The name of the .ts file will be the name of your command in Discord**

**Note 2: You can replace all of the `args` stuff with an `options: []` array if you know what you are doing**
```
import { ICommand } from "wokcommands";

export default {
    category: 'Category Name',
    description: 'Command Description',

    slash: true,
    testOnly: false, // If you have a Test Server added in your index.ts, you can set this to true for it to only show there, else leave it on false
    minArgs: 0, // Set this to the minimum required args for your slash command
    maxArgs: 2, // Set this to however many args you have in your command
    expectedArgs: "<arg1> <arg2>", // Insert *all* your args into this surrounded by either <> or [] (No difference between them), and have the required args first
    expectedArgsTypes: ["STRING", "BOOLEAN"], // Set these to the types of args they will be in Discord, types should be visible if you use VSCode or anything similar
    permissions: ["MANAGE_MESSAGES"], // These are the permissions assignable to roles in Discord. Mulitple can be required and are seperated by commas

    callback: ({ interaction }) => {
        // Insert command code here
    },
} as ICommand
```

### Dependencies
[Node.js](https://nodejs.org/en/download/): ^16.13.2

[Typescript](https://www.npmjs.com/package/typescript): ^4.6.3

[TS-Node](https://www.npmjs.com/package/ts-node): ^10.7.0

[Discord.JS](https://www.npmjs.com/package/discord.js): ^13.1.0

[WOKCommands](https://www.npmjs.com/package/wokcommands): ^1.5.3

[Mongoose](https://www.npmjs.com/package/mongoose): ^6.0.10

---

# Command Documentation
## User Management
### Ban & Kick
---
The Ban and Kick slash commands can be used for, as the name suggests, banning and kicking users. The commands arguments are the same for both: \[user\] then \[reason\]. Discord will provide a list of users above the typing area, and will filter them out as you type in more characters. The reason is a requirement-less string to use, and is not actually required for use.

---
### Roles
---
The Roles command is used to add/remove a role from a person, or check if they have a role. The command uses 3 required arguments; \[user\], \[role\], and \[action\]. The user argument works the same as the Ban/Kick commands, and the role argument works almost the exact same as the user argument, just with roles and not users. The action command can be one of 3 (or like technically 6?) options. Add (or just 'a' for ease), Remove (or just 'r'), and Check (or, once again, just 'c'). The names are self explanatory to what they do, but trying to add a role to someone who already has it (as well as remove from someone without it) will not do anything except reply to the activating user that they do/don't have the role (so use the check command first ¯\\\_(ツ)\_/¯ ).

---
### Timeout
---
The Timeout command is structured similarly to the Ban & Kick commands, just with a measure of time added to it. The \[time\] portion of the arguments is in minutes, so `time: 5` would result in a 5 minute timeout. The user and reason arguments are the same as the Ban & Kick commands.

---
### Warn Add, Remove, and List
---
The group of Warn commands are all tied to the MongoDB database, so if that isn't added then these **will** crash your bot when used. The first listed warn command is the Warn Add command. The Warn Add command requires two arguments: \[user\] and \[reason\]. These work the same as the Ban & Kick commands, so no further explanation needed there. The next listed warn command is the Warn Remove command, but needs to be used alongside the list command. The Warn Remove command also requires two arguments, \[user\] and \[id\]. The user argument works like any other, and the id argument is a string. In the id argument you add the id of the warning to remove, which can be found using the Warn List command. The Warn List command simply requires a \[user\] argument, and returns an embed with all the warnings of the user.

---
## Text & Voice Administration
### VCMute, VCDeafen & VCDisconnect
---
The VCMute, VCDeafen, and VCDisconnect (that will now be reffered to without VC at the start) are commands used to manage users in a Voice Channel. These commands can only effect a user who is actively connected to a Voice Channel or - specifically for the Mute & Deafen commands - are not already Self-Muted/Deafened, and are all toggles; meaning that if someone is - for example - already Muted, they will be Unmuted. The names are self explanatory, with Mute server-muting the specified user, Deafen server-deafening the user, and Disconnect disconnecting the user from the channel they are connected to. All of the commands use a singular argument, a user.

---
### Purge
---
The Purge command, also known by some as a Clear command, deletes a specified amount of text messages from all users in the channel it's used in. There is no cap to the amount of messages that can be deleted at one given time, however there is a limit on how many days ago text can be deleted. The purge command may only delete messages from no earlier than 14 days ago from the time of use. The limit is specified [here](https://discord.js.org/#/docs/discord.js/stable/class/TextChannel?scrollTo=bulkDelete) in the Discord.JS official documentation.

---
## Configuration
### Send & Rolesmenu
---
Now it might seem strange having two seemingly different commands together, but you actually need the Send command for the Rolesmenu command. For the send command, there are two arguments: \[channel\] and \[text\]. The channel argument, similar to the user argument, shows a list of all the channels you can access. While you can select a voice channel, it **will not** work, so don't do that. Just select a text channel, then enter the text for the message in the text argument. Once you have a message sent by the bot, you can setup a Select Menu for Roles. The Select Menu is the successor to using Reaction roles. To use the Rolesmenu command, you need 3 different arguments: \[channel\], \[messageId\] and \[role\]. The channel is the same as the send command, giving you an option of all channels. **Only** use the channel that the message is in. The messageId can be found by right clicking the message and clicking Copy Message ID. If this option isn't there, go to `Behavior` in Discord Settings, then enable `Developer Mode`. Once you have the message id, paste it into the messageId argument. The final argument is the role argument. Discord will give you a list of roles to pick from, similar to the user argument. After exectuing the command a box should appear under the selected message with the role you selected showing in there. You can add more roles to the menu by repeating the command with different roles. Clicking on the roles you want in the Select Menu and then clicking off the menu will add the roles to you after a second or two.

---
