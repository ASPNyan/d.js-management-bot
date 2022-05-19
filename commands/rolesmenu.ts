import { Client, GuildMember, Interaction, Message, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Adds a role menu to the selected message!',
    
    permissions: ['MANAGE_ROLES'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', async interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }
            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    await member.roles.remove(id.value)
                }

                for (const id of values) {
                    await member.roles.add(id)
                }

                interaction.reply({
                    content: `Added the selected roles!`,
                    ephemeral: true
                }).then()
                console.log('finished')
            }
        })
    },

    callback: async ({ message, interaction, args, client }) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if (!channel || !(channel.type === 'GUILD_TEXT')) {
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

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already associated with this menu!`,
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
                  .setCustomId('auto_roles')
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
            content: `Added <@&${role.id}> to the auto roles menu! \n\`(Message ID: ${messageId})\``,
            allowedMentions: {
                roles: []
            },
            ephemeral: true
        }
    }
} as ICommand
