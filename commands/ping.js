// ================================
const { SlashCommandBuilder } = require('@discordjs/builders')

// ================================
const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Receive pong.')

const execute = async function(client, interaction) {
    await interaction.reply('Pong!')
}

/*
 * Another cool thing you can do is this:
 *
 * module.exports.buttonActions = [
 * 	{ id = '', onClick = async function() {} }
 * ]
 *
 * This allows you to keep the button actions for each command in the command class.
 * So if someones presses a button you created then it will lead back to this class and
 * ~ the code you specified here (with that button id) will be ran.
 */

// ================================
module.exports.command = {
	permLevel: 0,

	data: data,
	execute: execute
}