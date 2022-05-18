import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
   category: 'User Administration',
   description: 'Used to kick any person',


   minArgs: 1,
   maxArgs: 2,
   expectedArgs: '<user> <reason>',
   expectedArgsTypes: ['USER', "STRING"],

   slash: true,
   testOnly: true,

   callback: async ({ interaction, member }) => {
    const author = interaction.member as GuildMember
    const target = interaction.options.getMember('user') as GuildMember
    if (!author.permissions.has("KICK_MEMBERS")) {
        return interaction.reply({
            content: `ERR: You do not have the required permissions!\n(Required: \`KICK_MEMBERS\`)`,
            ephemeral: true
        })
    } else {
    if (!target) {
        interaction.reply({
        content: `ERR: User not specified.`,
        ephemeral: true
        })
        return

    }
    if (!target.bannable || !target.manageable) {
        interaction.reply({
        content: `ERR: Unable to moderate this user.`,
        ephemeral: true})
        return
    }
    const reason = ` for \`${interaction.options.getString('reason')}\`` || ', no reason supplied'
    interaction.channel!.send({
        content: `User <@${target!.id}> was *kicked* by <@${interaction?.member?.user?.id}>${reason}`
    }).then
    await target!.ban()
    interaction.reply({
        content: `User successfully kicked`,
        ephemeral: true
    })
    }
    }
} as ICommand