import WOKcommands from 'wokcommands'
import DiscordJS, { Activity, Base, Client, ClientPresence, ClientUser, ClientVoiceManager, Guild, Intents, Message, MessageEmbed, Presence, PresenceManager } from 'discord.js'
import path from 'path'
import 'dotenv/config'


const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
})

client.on('ready', async () => {
    new WOKcommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: [''],
        mongoUri: process.env.MONGODB,
    })
})

client.once('ready', () => {
    console.log(`Logged in as ${client?.user?.tag} and online`);
    client.user?.setPresence({ activities: [{ name: `everyone & everything` }]});
    client.user?.setActivity('everyone & everything', {type: "WATCHING"});
    client.user?.setStatus("dnd");
});



client.login(process.env.TOKEN);