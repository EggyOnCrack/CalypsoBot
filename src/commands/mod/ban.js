const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      usage: 'ban <user mention/ID> [reason]',
      description: 'Bans a member from your server.',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      examples: ['ban @Egghead']
    });
  }
  async run(message, args) {
    if (!member)
      return this.sendErrorMessage(message, 0, 'Please mention a user or provide a valid user ID');
    if (member === message.member)
      return this.sendErrorMessage(message, 0, 'You cannot ban yourself'); 
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return this.sendErrorMessage(message, 0, 'You cannot ban someone with an equal or higher role');
    if (!member.bannable)
      return this.sendErrorMessage(message, 0, 'Provided member is not bannable');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    const reactions = await message.awaitReactions(reaction => {
      console.log(reaction)
      return reaction.name === ":white_check_mark:"
    } , {time: 7000});
    const member = this.getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    
    await member.ban({ reason: reason });

    const embed = new MessageEmbed()
      .setTitle('Ban Member')
      .setDescription(`${member} was successfully banned.`)
      .addField('Moderator', message.member, true)
      .addField('Member', member, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    message.client.logger.info(`${message.guild.name}: ${message.author.tag} banned ${member.user.tag}`);
        
    // Update mod log
    this.sendModLogMessage(message, reason, { Member: member});
  }
};
