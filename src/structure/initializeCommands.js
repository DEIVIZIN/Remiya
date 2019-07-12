module.exports = (bot, 
        paths=['informações','owner','utilidades','imagens',
              'nsfw','diversão','search','moderação','game']
    ) => {
        paths.forEach(path => {
            const commands = (require('fs').readdirSync)(`./src/lib/commands/${path}/`).filter(x => x.endsWith('.js'));
            for (const file of commands) {
                const cmd = require(`../lib/commands/${path}/${file}`);
                bot.commands.set(cmd.help.name, cmd);
                if (cmd.conf.aliases) {
                    cmd.conf.aliases.forEach(alias => bot.aliases.set(alias, cmd.help.name))
                }
            }
        }
    )
}