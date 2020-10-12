const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class startCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'start',
      aliases: [],
      usage: 'start',
      description: 'Starts a session for Greenville Role-Play',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      examples: ['start']
    });
  }
  async run(message, args) {

        const embed = new MessageEmbed()
          .setTitle('Sessions Started!')
          .setDescription(`${message.author} has started a session!`)
          .addField('Moderator', message.member, true)
          .addField('Server Code', 'idk')
          .addField('Ping:', `<@&${763230532628250664}>`)
          .addField('✅React now!✅', 'Must have 5 reactions to continue the action!')
          .setImage('https://t6.rbxcdn.com/b6ed73502cb54bbb0c141a391025933f')
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
          message.react('✅');
        message.channel.send(embed);
      }
    }  