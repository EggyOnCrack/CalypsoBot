const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class endCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'end',
      aliases: [],
      usage: 'end',
      description: 'Ends a session for Greenville Role-Play',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      examples: ['end']
    });
  }
  async run(message, args) {

        const embed = new MessageEmbed()
          .setTitle(':x: Sessions Ended! :x:')
          .setDescription(`${message.author} has unfortunately ended the current session. `)
          .addField('Moderator', message.member, true)
          .addField('Next Server?', 'The Next server will be posted in about 4 hours.')
          .setImage('https://t6.rbxcdn.com/b6ed73502cb54bbb0c141a391025933f')
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed).then(embedMessage => {
            embedMessage.react("❌");
        });
      }
    }  