const Discord = require('discord.js'); //loads discord.js package
const client = new Discord.Client(); //creates client
const config = require('./config.json'); //loads config


client.login(config.token);

client.on("message", message => {
  if(message.author !== client.user) return;

  var prefix = "?"; // always use a prefix it's good practice.
  if(!message.content.startsWith(prefix)) return; // ignore messages that... you know the drill.

  // We covered this already, yay!
  const params = message.content.split(" ").slice(1);

  if(message.content.startsWith(prefix+"prune")) {
    // get number of messages to prune
    let messagecount = parseInt(params[0]);
    // get the channel logs
    message.channel.fetchMessages({limit: 100})
    .then(messages => {
      let msg_array = messages.array();
      // filter the message to only your own
      msg_array = msg_array.filter(m => m.author.id === client.user.id);
      // limit to the requested number + 1 for the command message
      msg_array.length = messagecount + 1;
      // Has to delete messages individually. Cannot use `deleteMessages()` on selfclients.
      msg_array.map(m => m.delete().catch(console.error));
   });

 } else if(message.content.startsWith(prefix+"eval")) {
    try {
      var code = params.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
    message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

} else if (message.content.startsWith(prefix+"moosecoop")) {
  message.channel.sendMessage(`Guilds: ${client.guilds.size} - YouTube: https://www.youtube.com/user/moosecoop`);
}
});
