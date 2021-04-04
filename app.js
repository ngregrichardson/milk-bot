const { CommandoClient } = require('discord.js-commando');
const path = require('path');
require('dotenv').config();
global.fetch = require('isomorphic-fetch');

const client = new CommandoClient({
    commandPrefix: '!',
    owner: process.env.OWNER_ID,
});

client.registry.registerDefaultTypes()
    .registerGroups([
        ['milk', 'Milk'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
    console.log("Bot online.")
    client.user.setActivity("people bathe in my milk", { type: 'WATCHING' });
});

client.login(process.env.BOT_TOKEN);

client.on('message', (msg) => {
    if (msg.author.id !== client.user.id && msg.content.toLowerCase().includes('milk')) {
        msg.react('🥛');
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(user.id !== client.user.id && reaction.emoji.name === '🥛') {
        reaction.message.react('🥛');
    }
});
