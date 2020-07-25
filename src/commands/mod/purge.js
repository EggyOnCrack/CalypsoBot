const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      aliases: ['clear'],
      usage: 'purge [channel mention/ID] [user mention/ID] <message count> [reason]',
      description: oneLine`
        Deletes the specified amount of messages from the provided channel. 
        If no channel is given, the messages will be deleted from the current channel.
        If a member is provided, only their messages will be deleted from the batch.
        No more than 100 messages may be deleted at a time.
        Messages older than 2 weeks old cannot be deleted.
      `,
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
      examples: ['purge 20', 'purge #general 10', 'purge @Nettles 50', 'purge #general @Nettles 5']
    });
  }
  async run(message, args) {

    let channel = this.getChannelFromMention(message, args[0]) || message.guild.channels.cache.get(args[0]);
    if (channel) {
      args.shift();
    } else channel = message.channel;

    let member = this.getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    if (member) {
      args.shift();
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) === true || !amount || amount < 0 || amount > 100)
      return this.sendErrorMessage(message, 'Invalid argument. Please provide a message count between 1 and 100.');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason provided';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    await message.delete(); // Delete command message

    // Find member messages if given
    let messages;
    if (member) {
      messages = (await channel.messages.fetch({ limit: amount })).filter(m => m.member.id === member.id);
    } else messages = amount;
    
    if (messages.size === 0) return message.channel.send(
      new MessageEmbed()
        .setTitle('Purge')
        .setDescription(`Unable to find any messages from ${member}.`)
        .addField('Channel', channel, true)
        .addField('Member', member )
        .addField('Found Messages', `\`${messages.size}\``, true)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)
    ).then(msg => msg.delete({ timeout: 5000 }));

    channel.bulkDelete(messages, true).then(messages => {
      const embed = new MessageEmbed()
        .setTitle('Purge')
        .setDescription(`Successfully deleted **${messages.size}** messages.`)
        .addField('Channel', channel, true)
        .addField('Message Count', `\`${messages.size}\``, true)
        .addField('Reason', reason)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

      if (member) {
        embed
          .spliceFields(1, 1, { name: 'Found Messages', value:  `\`${messages.size}\``, inline: true})
          .spliceFields(1, 0, { name: 'Member', value: member, inline: true});
      }
      message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));

      // Update modlog
      const fields = { 
        Channel: channel
      };
      if (member) {
        fields['Member'] = member;
        fields['Found Messages'] = `\`${messages.size}\``;
      } else fields['Message Count'] = `\`${messages.size}\``;
      this.sendModlogMessage(message, reason, fields);
    });

  }
};
