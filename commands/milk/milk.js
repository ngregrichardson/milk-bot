const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const giphy = require('../../config/giphy');

module.exports = class MilkCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'milk',
            group: 'milk',
            memberName: 'milk',
            description: 'Looking for milk? Well, you found it.'
        });
    }

    async run(message) {
        const {data: randomGif} = await giphy.random({tag: 'milk', limit: 1});
        let url = randomGif.image_url;
        return message.reply(new Discord.MessageEmbed().setImage(url));
    }
};
