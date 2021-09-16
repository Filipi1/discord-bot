const Discord = require('discord.js');

module.exports = async (client, msg) => {
    const frases = require("../extra/frases.json")
    const numeroAleatorio = Math.floor(Math.random() * (frases.length))
    const fraseSelecionada = frases[numeroAleatorio]

    const menssagem = new Discord.MessageEmbed()
        .setTitle("Sua frase do dia é: ")
        .setColor(0x3CEC72)
        .setDescription(fraseSelecionada)
        .setImage("https://picsum.photos/500/500")
    
    msg.reply(menssagem);
}