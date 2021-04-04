const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Bot online.")
    client.user.setActivity("people bathe in my milk", { type: 'WATCHING' });
});

client.login(process.env.BOT_TOKEN);

client.on('message', (msg) => {
    if (msg.content.toLowerCase().includes('milk')) {
        msg.react('🥛');
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(user.id !== client.user.id && reaction.emoji.name === '🥛') {
        reaction.message.react('🥛');
    }
});
