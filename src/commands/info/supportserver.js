const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'supportserver',
      aliases: ['support', 'ss'],
      usage: 'supportserver',
      description: 'Displays the invite link to Calypso\'s Discord Support Server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setThumbnail('https://cdn.discordapp.com/attachments/739613590796894299/740376759891001464/Team_Xyla-Logo.jpg')
      .setDescription('Click [here](https://discord.gg/4mPCcN7) to join the Calypso Support Server!')
      .addField('Other Links', 
        '**[Invite Me](https://discord.com/oauth2/authorize?client_id=762824924112355339&scope=bot&permissions=8)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
