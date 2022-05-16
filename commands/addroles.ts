import { Message, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import random from 'random'

export default {
    category: 'Configuration',
    description: 'Adds a role to the Autorole message!',
    
    permissions: ['MANAGE_ROLES'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: "both",
    guildOnly: true,

    callback: async ({ message, interaction, args, client }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type === 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }
        
        const messageId = args[1]

        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        if (!role) {
            return 'Unknown/Missing Role!'
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return "Unknown/Unreachable Message ID!"
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Please make sure the provided Message ID was sent by <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if (!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        const menuid = random.int(1000, 9999999999).toString()

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value} is already associated with this menu!`,
                        allowedMentions: {
                            roles: []
                        },
                        ephemeral: true
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                  .setCustomId(menuid)
                  .setMinValues(0)
                  .setMaxValues(1)
                  .setPlaceholder('Select your roles here!')
                  .addOptions(option)
            )
        }
        
        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@&${role.id} to the auto roles menu! \n\`(Message ID: ${messageId} | Menu ID: ${menuid})`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true
        }
    }
} as ICommand