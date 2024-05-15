import 'dotenv/config';

import { Client, IntentsBitField, Partials } from 'discord.js';
import { CommandKit } from 'commandkit';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyMigrations } from './db/migrate';

applyMigrations().then(() => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.GuildMessageReactions,
      IntentsBitField.Flags.DirectMessageReactions,
      IntentsBitField.Flags.DirectMessages,
    ],
    partials: [
      Partials.Channel,
    ]
  });

  new CommandKit({
    client,
    eventsPath: join(__dirname, 'events'),
    commandsPath: join(__dirname, 'commands'),
  });

  client.login(process.env.DISCORD_TOKEN);
})
