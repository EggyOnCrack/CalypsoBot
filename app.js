const config = require('./config.json');
const Client = require('./src/Client.js');
const { MessageEmbed } = require('discord.js');
const { Intents, Discord} = require('discord.js');

global.__basedir = __dirname;

// Client setup
const intents = new Intents();
intents.add(
  'GUILD_PRESENCES',
  'GUILD_MEMBERS',
  'GUILDS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS'
);
const client = new Client(config, { ws: { intents: intents } });

function init() {
  client.loadEvents('./src/events');
  client.loadCommands('./src/commands');
  client.loadTopics('./data/trivia');
  client.login(process.env.token);
}

init();

client.on("message", message => {

  let wordArray = message.content.split(" ")
  console.log(wordArray)

  let filterWords = ["dildo", "dick", "fuck"];

  for (var i = 0; i < filterWords.length; i++) {
    if (wordArray.includes(filterWords[i])) {
      message.delete()
      const cjqijcqcq = new Discord.MessageEmbed()
      .setTitle('Breached NSFW')
      .setDescription('Your message has been deleted due to NSFW scan')

      message.channel.send(cjqijcqcq)
    }
  }
})

process.on('unhandledRejection', err => client.logger.error(err));