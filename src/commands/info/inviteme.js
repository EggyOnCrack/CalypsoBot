const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class InviteMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'inviteme',
      aliases: ['invite', 'invme', 'im'],
      usage: 'inviteme',
      description: 'Generates a link you can use to invite UGVRP to your own server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Invite Me')
      .setThumbnail('https://cdn.discordapp.com/attachments/744782251857936442/744791035263320174/UGVRP_Logo.png')
      .setDescription(oneLine`
        Click [here](https://discord.com/oauth2/authorize?client_id=762824924112355339&scope=bot&permissions=8)
        to invite me to your server!
      `)
      .addField('Other Links', 
        '**[Support Server](https://discord.gg/WZ69bTa)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
