const { botCache } = require('../structures/cache')

module.exports = async function(client, interaction) {
    if (interaction.isCommand()) {
        if (botCache.commands.has(interaction.commandName)) {
            const obj = botCache.commands.get(interaction.commandName)

            // NOTE: You could add additional command variables and run some checks here

            obj.execute(client, interaction)
        }
    } else if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON') {
        if (botCache.buttons.has(interaction.customID)) {
            // This runs the button function that's stored in the botCache, see the ping command file for an example
            botCache.buttons.get(interaction.customID)(client, interaction)
        }
    }
}
