import { ICommand } from "wokcommands"
import DiscordJS, { Activity, Base, BaseClient, Channel, Client, ClientPresence, ClientUser, ClientVoiceManager, Guild, BaseGuildVoiceChannel, GuildMember, Intents, Message, MessageEmbed, Presence, PresenceManager, VoiceChannel, VoiceState, VoiceStateManager } from 'discord.js'

const client = new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES, 
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

export default {
  category: 'Chat Administration',
  description: 'Disconnects any user from the voice channel they\'re in.',

  slash: true,
  testOnly: true,
  ephemeral: true,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '[user]',
  expectedArgsTypes: ['USER'],



  callback: async ({ interaction, member }) => {
    const author = interaction.member as GuildMember
    if (!(author.permissions.has('MUTE_MEMBERS') || author.permissions.has('DEAFEN_MEMBERS'))) {
      return interaction.reply({
        content: 'You do not have the required permissions!\n(Required: `MUTE_MEMBERS`, `DEAFEN_MEMBERS`)',
        ephemeral: true
      })
    } else {
    const target = interaction.options.getMember('user') as GuildMember
    if (!target.voice.channel) {
        interaction.reply({
            content: `User is not connected to a voice channel.`,
            ephemeral: true
        })
        return
    }

    const vchannel = target.voice.channel
    target.voice.disconnect().then
    interaction.reply({
    content: `User ${target} was disconnected from channel ${vchannel} by <@${interaction?.member?.user?.id}>.`,
    ephemeral: false
    })
  }
  }
} as ICommand

