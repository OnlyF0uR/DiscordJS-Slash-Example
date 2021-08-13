const { botCache } = require('../structures/cache')

module.exports = async function(client, interaction) {
	if (interaction.isCommand()) {
		if (botCache.commands.has(interaction.commandName)) {
			const obj = botCache.commands.get(interaction.commandName)

			// TODO: You can add the permLevel check in here yourself. (for example)

			obj.execute(client, interaction)
		}
	} else if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON') {
		if (botCache.interactions.has(interaction.customID)) {
			// This runs the button function that's stored in the botCache, see the ping command file for an example
			botCache.interactions.get(interaction.customID)(client, interaction)
		}
	}
}
