const Discord = require('discord.js');

module.exports = async (client, msg) => {
    const names = require("../extra/names.json")
    const numeroAleatorio = Math.floor(Math.random() * (names.length))
    const nomeSelecionado = names[numeroAleatorio]

    const menssagem = new Discord.MessageEmbed()
        .setTitle("Você é " + nomeSelecionado.nome)
        .setColor(0x5A4AA5)
        .setDescription(nomeSelecionado.desc ? nomeSelecionado.desc : "")
        .setImage(nomeSelecionado.url ? nomeSelecionado.url : null)
        
    //const nomeNormalizado = nomeSelecionado.nome.replace("o ", "").replace("a ", "");
    
    try {
        if (msg.author.id === msg.guild.owner.id) {
            msg.reply(menssagem);
            return;
        }

    //await msg.member.setNickname(nomeNormalizado)
    } catch (err) {
        console.log(err)
    }
    
    msg.reply(menssagem);
}