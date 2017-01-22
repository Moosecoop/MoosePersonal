const commando = require('discord.js-commando');
const config = require('./config.json');
const bot = new commando.Client({
    owner: config.ownerID,
    commandPrefix: '?',
    invite: 'moosecoop.com',
    unknownCommandResponse: false,
    selfbot: true
});

bot.registry.registerGroup('random', 'Random');
//bot.registry.registerGroup('moderation', 'Moderation');
bot.registry.registerGroup('info', 'Info');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");



bot.on('ready', () => {
    bot.user.setGame("moosecoop.com", "http://twitch.tv/monstercat");
});

bot.login(config.token);
