// ================================
const { SlashCommandBuilder } = require('@discordjs/builders')

// ================================
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Receive pong.')

const execute = async function(client, interaction) {
    await interaction.reply('Pong!')
}

/* NOTE:
 *
 * Another cool thing you can do is this:
 *
 * module.exports.buttons = [
 *  { id = 'custom_id', onClick = async function(client, interaction) {} }
 * ]
 *
 * This allows you to keep the button actions for each command in the command class.
 * So if someones pressed a button you created then it will lead back to the function
 * ~ defined in the button object. The button-event data will get copied to the botCache on bot startup.
 */

// ================================
module.exports.command = {
    data: data,
    execute: execute
}
