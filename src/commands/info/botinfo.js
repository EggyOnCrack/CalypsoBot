const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const pkg = require(__basedir + '/package.json');
const { owner } = require('../../utils/emojis.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot', 'bi'],
      usage: 'botinfo',
      description: 'Fetches UGVRP\'s bot information.',
      type: client.types.INFO
    });
  }
  run(message) {
    const botOwner = message.client.users.cache.get(message.client.ownerId);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const tech = stripIndent`
      Version     :: ${pkg.version}
      Library     :: Discord.js v12.3.1
      Environment :: Node.js v12.16.3
      Database    :: SQLite
    `;
    const embed = new MessageEmbed()
      .setTitle('UGVRP\'s Bot Information')
      .setDescription(oneLine`
        UGVRP bot was strictly made for moderation and to support her community!
        She comes packaged with a variety of commands and 
        a multitude of settings that can be tailored to your server's specific needs. 
        Her codebase also serves as a base framework to easily create Discord bots of all kinds.
        She first went live on **September 22, 2020**.
      `)
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Client ID', `\`${message.client.user.id}\``, true)
      .addField(`Developer ${owner}`, botOwner, true)
      .addField('Tech', `\`\`\`asciidoc\n${tech}\`\`\``)
      .addField(
        'Links', 
        '**[Invite Me](https://discord.com/oauth2/authorize?client_id=762824924112355339&scope=bot&permissions=8) | ' +
        '[Support Server](https://discord.gg/WZ69bTa)**'
      )
      .setImage('https://cdn.discordapp.com/attachments/744782251857936442/744791035263320174/UGVRP_Logo.png')
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
