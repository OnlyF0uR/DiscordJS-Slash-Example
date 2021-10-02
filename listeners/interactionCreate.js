const { botCache } = require('../structures/cache')

module.exports = async function(client, interaction) {
    if (interaction.isCommand()) {
        if (botCache.commands.has(interaction.commandName)) {
            const obj = botCache.commands.get(interaction.commandName)

            // Check for command permission (0 = default, 1 = staff, 2 = admin, ~3 = botdev~)
            if (obj.permLevel == 1) {
                if (cachedData.staffRole == null || !interaction.member.roles.cache.has(cachedData.staffRole)) {
                    interaction.reply('You need to have the configured staffrole to use this command.')
                    return
                }
            } else if (obj.permLevel == 2) {
                if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                    interaction.reply('You need to have the `ADMINISTRATOR` permission to use this command.')
                    return
                }
            } else if (obj.permLevel == 3) { // This probably only be used to counter bug-abuse
                if (!interaction.member.id !== config.devId) {
                    interaction.reply('Only the developer of this bot can use that command.')
                    return
                }
            }

            obj.execute(client, interaction)
        }
    } else if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON') {
        if (botCache.buttons.has(interaction.customID)) {
            // This runs the button function that's stored in the botCache, see the ping command file for an example
            botCache.buttons.get(interaction.customID)(client, interaction)
        }
    }
}
