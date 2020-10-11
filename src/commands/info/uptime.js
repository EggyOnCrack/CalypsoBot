const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class UptimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'uptime',
      aliases: ['up'],
      usage: 'uptime',
      description: 'Fetches UGVRP\'s current uptime.',
      type: client.types.INFO
    });
  }
  run(message) {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
    const embed = new MessageEmbed()
      .setTitle('UGVRP\'s Uptime')
      .setThumbnail('https://cdn.discordapp.com/attachments/744782251857936442/744791035263320174/UGVRP_Logo.png')
      .setDescription(`\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``)
      .addField('Date Launched', date) 
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
