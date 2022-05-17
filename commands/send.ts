import { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Configuration',
    description: 'Sends a message using the bot.',

    permissions: ['MANAGE_MESSAGES'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: true,
    guildOnly: true,
    
    callback: ({ message, interaction, args }) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if (!channel || !(channel.type === 'GUILD_TEXT')) {
            return 'Please tag a text channel'
        }
        const text = interaction.options.getString('text')
        channel.send(`${text}`)

        if (interaction) {
            interaction.reply({
                content: `Message sent successfully!`,
                ephemeral: true
            })
        }
    }
} as ICommand