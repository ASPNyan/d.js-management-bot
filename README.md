# Discord Management Bot
### A Discord Bot Utilising Mainly [Discord.JS](https://github.com/DiscordJS/Discord.JS) & [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands)

This is a Discord Bot written in TypeScript for mainly User Management, including slash commands to Kick, Ban, Timeout, and Purge, as well as other commands.

Make sure to add your bot's token & MongoDB URI to the .env file provided so that the .env reads `TOKEN:// Your Token here (no space)` & `MONGODB:// Your URI here (no space)`
If you don't have/know how to make a MongoDB database, watch the video [__here__](https://www.youtube.com/watch?v=a3Gz_7KEJkQ).

If you do not want to install the Nodemon NPM package, change the "dev" script in the `package.json` from `"dev": "nodemon index.ts"` to `"dev": "ts-node index.ts"`

To add a slash command with [WOKCommands](https://github.com/AlexzanderFlores/WOKCommands), add a .ts file to the 'commands' folder and insert the following code
**Note: The name of the .ts file will be the name of your command in Discord**
```
import { ICommand } from "wokcommands";

export default {
    category: 'Category Name',
    description: 'Command Description',

    slash: true,
    testOnly: false, // If you have a Test Server added in your index.ts, you can set this to true for it to only show there, else leave it on false
    minArgs: 0, // Set this to the minimum required args for your slash command
    maxArgs: 2, // Set this to however many args you have in your command
    expectedArgs: "<arg1> <arg2>", // Insert *all* your args into this surrounded by either <> or [] (No difference between them)
    expectedArgsTypes: ["STRING", "BOOLEAN"], // Set these to the types of args they will be in Discord, types should be visible if you use VSCode or anything similar
    permissions: ["MANAGE_MESSAGES"], // These are the permissions assignable to roles in Discord. Mulitple can be required and are seperated by commas

    callback: ({ interaction }) => {
        // Insert command code here
    },
} as ICommand
```

