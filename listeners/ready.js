// ================================
const { promises } = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config')
const { botCache } = require('../structures/cache')

const rest = new REST({ version: '9' }).setToken(config.botToken);

// ================================
module.exports = async function (client) {
    // Register the commands
    await registerCommands(client)
    console.log('Started.')
}

// ================================
async function registerCommands(client) {
    const commands = [];

    (await promises.readdir('./commands')).forEach(file => {
        const cmdFile = require('../commands/' + file)

        botCache.commands.set(file.split('.')[0], cmdFile.command)
        if (cmdFile.buttons != null) {
            for (let i = 0; i < cmdFile.buttons.length; i++) {
                botCache.buttons.set(cmdFile.buttons[i].id, cmdFile.buttons[i].onClick)
            }
        }

        commands.push(cmdFile.command.data.toJSON())
    })

    console.log(`Started refreshing application (/) commands. (DevMode: ${config.devMode ? 'Enabled' : 'Disabled'})`);

    try {
        if (config.devMode) {
            await rest.put(Routes.applicationGuildCommands(client.user.id, config.devGuild), { body: commands })
        } else {
            await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
        }
    } catch (ex) {
        console.error(ex)
    }

    console.log(`Successfully reloaded application (/) commands. (DevMode: ${config.devMode ? 'Enabled' : 'Disabled'})`);
}

module.exports.once = true
