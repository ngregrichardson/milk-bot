const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();
global.fetch = require('isomorphic-fetch');
const giphy = require('./config/giphy');

const client = new CommandoClient({
    commandPrefix: '!',
    owner: process.env.OWNER_ID,
});

client.registry.registerDefaultTypes()
    .registerGroups([
        ['milk', 'Milk'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({ unknownCommand: false })
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
    console.log("Bot online.")
    client.user.setActivity("people bathe in my milk", { type: 'WATCHING' });
});

client.login(process.env.BOT_TOKEN);

client.on('message', async (msg) => {
    if (msg.author.id !== client.user.id) {
        if(msg.content.toLowerCase().includes('milk') || msg.content.toLowerCase().includes('milj')) {
            msg.react('🥛');
        }
        if(msg.content.includes('😢') || msg.content.includes('😭') || msg.content.includes('😿') || msg.content.includes('😥') || msg.content.split(' ').includes('cry') || msg.content.split(' ').includes('sad') || msg.content.includes(':sad') || msg.content.split(' ').includes('depressed')) {
            const {data: randomGif} = await giphy.random({tag: 'spilled milk', limit: 1});
            let url = randomGif.image_url;
            return msg.reply(`don't cry over spilt milk`, new Discord.MessageEmbed().setImage(url));
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(user.id !== client.user.id && reaction.emoji.name === '🥛') {
        reaction.message.react('🥛');
    }
});
