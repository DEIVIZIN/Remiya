const osu = new (require('node-osu').Api)(process.env.OSU_KEY,{
    notFoundAsError: false,
    completeScore: false
}); const { RemiyaEmbed } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar o nome do usuário.`);
        try {
            osu.getUser({u:msg.args[0]}).then(async(user) => {
                if (!user.name) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar um usuário com este nome: \`${msg.args[0]}\`.`);
                msg.channel.send(
                    new RemiyaEmbed(msg.author)
                    .setAuthor(user.name, `https://discordemoji.com/assets/emoji/3768_Osu.png`, `https://osu.ppy.sh/users/${user.id}`)
                    .addFieldArray(`${msg.config.e_men._seta}Status`, [[
                        `Nível: ${user.level}`,
                        `Total de partidas: ${user.counts.plays}`,
                        `Precisão: ${user.accuracyFormatted}`
                    ]], true)
                    .addFieldArray(`${msg.config.e_men._seta}PP`, [[
                        `Raw: ${user.pp.raw}`,
                        `Ranque: ${user.pp.rank}`,
                        `Ranque nacional: ${user.pp.countryRank} ${user.country}`
                    ]], false)
                    .addFieldArray(`${msg.config.e_men._seta}Pontuação`, [[
                        `Ranqueada: ${user.scores.ranked}`,
                        `Total: ${user.scores.total}`
                    ]], true)
                    .addFieldArray(`${msg.config.e_men._seta}Ranqueamento`, [[
                        `SSH: ${user.counts.SSH}/${user.counts.SSH+user.counts.SS+user.counts.S+user.counts.SH+user.counts.A}`,
                        `SS: ${user.counts.SS}/${user.counts.SSH+user.counts.SS+user.counts.S+user.counts.SH+user.counts.A}`,
                        `S: ${user.counts.S}/${user.counts.SSH+user.counts.SS+user.counts.S+user.counts.SH+user.counts.A}`,
                        `SH: ${user.counts.SH}/${user.counts.SSH+user.counts.SS+user.counts.S+user.counts.SH+user.counts.A}`,
                        `A: ${user.counts.A}/${user.counts.SSH+user.counts.SS+user.counts.S+user.counts.SH+user.counts.A}`
                    ]], true).setThumbnail(`https://a.ppy.sh/${user.id}`).setColor('#ff66aa')
                )
            }).catch(async() => {
                msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar um usuário com este nome: \`${msg.args[0]}\`.`);
            })
        } catch (e) {
            msg.channe.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro inesperado ao executar esta função. Tente novamente mais tarde!`);
        }
    },
    conf:{ enable: true, cooldown: 10 },
    help: {
       name: 'osu',
       description: 'pesquise por algum jogador no osu!',
       usage: ['osu <player>'],
       member: 'usuários',
       category: 'game',
       credit: ['[OSU!](https://osu.ppy.sh/home)']
    }
}