import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'

export default {
    category: 'Help',
    description: 'Sends an embed containing links to the command documentation.',

    slash: true,
    guildOnly: true,
    
    callback: ({ interaction }) => {
        const gitlink = 'https://github.com/ASPNyan/d.js-management-bot'
        const embed = new MessageEmbed()
        .setTitle(`Command Documentation`)
        .setDescription(`You can Find the GitHub Repo [**Here**](${gitlink})`)
        .setURL(`${gitlink}#command-documentation`)
        .setColor(`GREEN`)
        .setAuthor({name: `ASPNyan`, iconURL: `https://avatars.githubusercontent.com/u/85216339?v=4`, url: `https://github.com/ASPNyan`})
        .addFields([
            {
                name: `[__User Management__](${gitlink}#user-management)`,
                value: `[**Ban & Kick**](${gitlink}#ban--kick)\n\n[**Roles**](${gitlink}#roles)\n\n[**Timeout**](${gitlink}#timeout)\n\n[**Warn Add, Remove, and List**](${gitlink}#warn-add-remove-and-list)`
            },
            {
                name: `[__Text & Voice Administration__](${gitlink}#text--voice-administration)`,
                value: `[**VCMute, VCDeafen & VCDisconnect**](${gitlink}#vcmute-vcdeafen--vcdisconnect)\n\n[**Purge**](${gitlink}#purge)`
            },
            {
                name: `[__Configuration__](${gitlink}#configuration)`,
                value: `[**Send & RolesMenu**](${gitlink}#send--rolesmenu)`
            }
        ])
        .setFooter(`The framework for this bot was made by [ASPNyan](https://github.com/ASPNyan) on Github ツ`)
        
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
        }
} as ICommand
