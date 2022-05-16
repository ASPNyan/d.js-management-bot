import { ICommand } from "wokcommands"
import DiscordJS, { Activity, Base, BaseClient, Channel, Client, ClientPresence, ClientUser, ClientVoiceManager, Guild, BaseGuildVoiceChannel, GuildMember, Intents, Message, MessageEmbed, Presence, PresenceManager, VoiceChannel, VoiceState, VoiceStateManager } from 'discord.js'


export default {
  category: 'Chat Administration',
  description: 'Toggles Voice Chat Mute of the Selected User Server-wide.',

  slash: true,
  testOnly: true,
  ephemeral: true,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '[user]',
  expectedArgsTypes: ['USER'],


  callback: async ({ interaction, member }) => {
    const author = interaction.member as GuildMember
    if (!(author.permissions.has('MUTE_MEMBERS'))) {
      return interaction.reply({
        content: 'You do not have the required permissions!\n(Required: `MUTE_MEMBERS`)',
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
    if (target.voice.selfMute === true) {
      return interaction.reply({
        content: `ERR: Can not Deafen a User who is already Self Deafened!`
      })
    }
    const ifmute = target.voice.serverMute
    if (ifmute === true) {
        await target.voice.setMute(false)
        interaction.reply({
            content: `User ${target} was Audio Unmuted by <@${interaction?.member?.user?.id}>.`,
            ephemeral: false
        })
    } else {
        await target.voice.setMute(true)
        interaction.reply({
            content: `User ${target} was Audio Muted by <@${interaction?.member?.user?.id}>.`,
            ephemeral: false
        })
    }
  }
  }
} as ICommand

