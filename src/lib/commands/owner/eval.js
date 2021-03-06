const { RemiyaEmbed, firstUpperCase, shortenerText } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        let toEval = msg.args.join(' ');
        if (toEval.includes('msg.bot.token') || toEval.includes('msg.guild.leave()')) {
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, talvez um outro dia.`);
        } else {
            try {
                let evaluated = require('util').inspect(eval(toEval, {depth: 0}))
                if(!toEval){
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque o código para mim avaliar.`);
                } else {
                    let time_start = process.hrtime()
                    let time_diff = process.hrtime(time_start)
                    let executed = `${time_diff[0] > 0 ? +'`'+time_diff[0]+'`s' : ''}\`${time_diff[1] / 1000000}\`ms`
                    msg.channel.send(evaluated, { code: 'js', maxLenght: 1900 }) && 
                    msg.author.send([
                        `**Executado em**: ${executed}`,
                        `**Tipo**: ${typeof evaluated}`,
                        `**Resultado**: \`\`\`js\n${evaluated}\`\`\``
                    ].join('\n'), { maxLenght: 1900 })
                }
            } catch (e) {
                msg.channel.send(e, { code:'js' }) && 
                msg.author.send(e.stack, { code: 'js', maxLenght: 1900 });
            }
        }
    },
    conf: { aliases: ['debug','exec'], enable: true, hide_help: true, },
    help: {
        name: 'eval',
        description: 'um terminal no discord \'-\'',
        member: 'criador',
        usage: ['eval <código>'],
        category: 'owner',
    }
}