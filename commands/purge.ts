import DiscordJS, { Activity, Base, Client, ClientPresence, ClientUser, Guild, GuildMember, Intents, Message, MessageEmbed, Presence, PresenceManager } from 'discord.js'
import { ICommand } from "wokcommands";

const client = new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES, 
      Intents.FLAGS.GUILD_MEMBERS
    ]
  })

export default {
    category: 'Chat Administration',
    description: 'Deletes the specified amount of messages.',


    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',
    expectedArgsTypes: ['INTEGER'],

    slash: true,
    testOnly: true,

    callback: async ({ interaction, channel, member }) => {
      const author = interaction.member as GuildMember
        if (!author.permissions.has("MANAGE_MESSAGES")) {
          return interaction.reply({
            content: 'You do not have the required permissions!\n(Required: `MANAGE_MESSAGES`)',
            ephemeral: true
          })
        } else {
          const amount = interaction.options.getInteger("amount")!
          await channel.bulkDelete(amount, true)
          interaction.reply({
            content: (`${amount} message(s) deleted by <@${interaction.member!.user.id}> in ${channel}`),
          })
        }
    }
} as ICommand