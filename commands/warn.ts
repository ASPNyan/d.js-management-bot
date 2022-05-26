import { GuildMember, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import warnSchema from '../warn-schema'

const uri = process.env.MONGODB

export default {
    category: "User Administration",
    description: 'Warns a user.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Adds a warning to a user',
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "The user to add a warning to",
                    required: true
                },
                {
                    name: "reason",
                    type: 'STRING',
                    description: 'The reason for warning the user',
                    required: true
                }
            ]
        },
        {
            type: "SUB_COMMAND",
            name: 'remove',
            description: 'Removes a warning from a user',
            options: [
                {
                    name: 'user',
                    type: "USER",
                    description: 'The user to remove the warning from',
                    required: true
                },
                {
                    name: 'id',
                    type: "STRING",
                    description: "The ID of the warning to remove",
                    required: true
                }
            ]
        },
        {
            type: "SUB_COMMAND",
            name: 'list',
            description: "List the warnings of a user",
            options: [
                {
                    name: "user",
                    type: "USER",
                    description: "The user to list the warnings of",
                    required: true
                }
            ]
        }
    ],

    callback: async ({ guild, member: staff, interaction }) => {
        if (!uri) {
            interaction.reply({
                content: `ERR: This command is not set up correctly!\n||(Please make sure a valid MongoDB URI has been provided in .env)||`,
                ephemeral: true
            })
        }

        const author = interaction.member as GuildMember
        if (!(author.permissions.has("MODERATE_MEMBERS"))) {
            return interaction.reply({
              content: 'You do not have the required permissions!\n(Required: `MODERATE_MEMBERS`)',
              ephemeral: true
            })
        }
        const subcommand = interaction.options.getSubcommand()
        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const remid = interaction.options.getString('id')

        if (subcommand === 'add') {
            const warning = await warnSchema.create({
                userId: target?.id,
                staffId: staff?.id,
                guildId: guild?.id,
                reason,
            })

            return {
                custom: true,
                content: `<@${staff.id}> Added Warning ${warning.id} to <@${target?.id}> for ${warning.reason}`,
                allowedMentions: {
                    users: []
                }
            }
        } else if (subcommand === 'remove') {
            const warning = await warnSchema.findByIdAndDelete(remid)

            return {
                custom: true,
                content: `<@${staff.id}> Removed Warning ${remid} from <@${target?.id}>`,
                allowedMentions: {
                    users: []
                }
            }
        } else if (subcommand === 'list') {
            const warnings = await warnSchema.find({
                userId: target?.id,
                guildId: guild?.id
            })

            let description = `Warnings for <@${target?.id}>:\n\n`

            for (const warn of warnings)  {
                description += `**ID:** ${warn._id}\n`
                description += `**Date:** ${warn.createdAt.toLocaleString()}\n`
                description += `**Staff:** <@${warn.staffId}>\n`
                description += `**Reason:** ${warn.reason}\n\n`
            }

            const embed = new MessageEmbed()
            .setDescription(description)
            .setColor('RED')

            return embed
        }
    },
} as ICommand