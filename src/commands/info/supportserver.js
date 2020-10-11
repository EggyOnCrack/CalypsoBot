const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'supportserver',
      aliases: ['support', 'ss'],
      usage: 'supportserver',
      description: 'Displays the invite link to UGVRP\'s Discord Support Server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setThumbnail('https://cdn.discordapp.com/attachments/744782251857936442/744791035263320174/UGVRP_Logo.png')
      .setDescription('Click [here](https://discord.io/Modcat) to join the UGVRP Support Server!')
      .addField('Other Links', 
        '**[Invite Me](https://discord.com/oauth2/authorize?client_id=762824924112355339&scope=bot&permissions=8)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
