import { GuildMember, Role } from "discord.js";
import { ICommand } from "wokcommands";

export default {
   category: 'User Administration',
   description: 'Used to Add or Remove a User\'s role, or Check if a User has a Role',

   minArgs: 3,
   maxArgs: 3,
   expectedArgs: '<user> <role> <action>',
   expectedArgsTypes: ['USER', "ROLE", "STRING"],

   slash: true,
   testOnly: true,

   callback: async ({ interaction, member }) => {
    const author = interaction.member as GuildMember
    const target = interaction.options.getMember('user') as GuildMember
    const role = interaction.options.getRole('role') as Role
    const action = interaction.options.getString('action')!.toLowerCase()
    if (!author.permissions.has("MODERATE_MEMBERS")) {
        return interaction.reply({
            content: `ERR: You do not have the required permissions!\n(Required: \`MODERATE_MEMBERS\`)`,
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
    if (!(action === ('add' || 'a' || 'remove' || 'r' || 'check' || 'c'))) {
        return interaction.reply({
            content: `Action either not provided or invalid!\n(Valid: \`add\`, \`a\`, \`remove\`, \`r\`, \`check\`, \`c\`)`,
            ephemeral: true
        })
    }
    if (action === 'add' || action === 'a') { 
        if (!target.roles.cache.has(role.id)) {
            await target.roles.add(role)
            return interaction.reply({
                content: `Updated roles of <@${target.id}> successfully!`,
                ephemeral: true
            })
        } else {
            return interaction.reply({
                content: `User <@${target.id}> already has <@&${role.id}>!`,
                ephemeral: true
            })
        }
    }

    if (action === 'r' || action === 'remove') {
        if (target.roles.cache.has(role.id)) {
            await target.roles.remove(role)
            return interaction.reply({
                content: `Updated roles of <@${target.id}> successfully!`,
                ephemeral: true
            })
        } else {
            return interaction.reply({
                content: `User <@${target.id}> doesn't have <@&${role.id}>!`,
                ephemeral: true
            })
        }
    } else {
        if (target.roles.cache.has(role.id)) {
            return interaction.reply({
                content: `User <@${target.id} has the role <@&${role.id}>.`
            })
        } else {
            return interaction.reply({
                content: `User <@${target.id}> doesn't have the role <@&${role.id}>.`
            })
        }
    }
    }  
   },
} as ICommand