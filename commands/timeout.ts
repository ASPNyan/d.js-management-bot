import{ GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
   category: 'User Administration',
   description: 'Used to timeout any person (Time in Minutes)',


   minArgs: 3,
   maxArgs: 3,
   expectedArgs: '<user> <time> <reason>',
   expectedArgsTypes: ['USER', 'NUMBER', 'STRING'],

   slash: true,
   testOnly: true,

   callback: async ({ message, interaction, args }) => {
    const author = interaction.member as GuildMember
    if (!(author.permissions.has('MODERATE_MEMBERS'))) {
      return interaction.reply({
        content: 'You do not have the required permissions!\n(Required: `MODERATE_MEMBERS`)',
        ephemeral: true
      })
    }
    const target = interaction.options.getMember('user') as GuildMember
    if (!target) {
        interaction.reply({
        content: `Please specify a user.`,
        ephemeral: true
        })

    }
    if (!target.moderatable || !target.manageable) {
        interaction.reply({
        content: `Unable to moderate this user.`,
        ephemeral: true})
    }
    const time = interaction.options.getNumber('time')
    const reason = interaction.options.getString('reason')!
    await target.timeout(time, reason)
    interaction.reply({
    content: `User \`${target!}\` was timed out by <@${interaction?.member?.user?.id}> for \`${time}m\` for \`${reason}\``,
    ephemeral: false
    })
   },
} as ICommand