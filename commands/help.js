const config = require("../config.json");
const commands = require("../scripts/commandsReader")(config.prefix);
const Discord = require('discord.js');

const descriptions = {
    "p! ping": "Testa a velocidade de resposta do bot",
    "p! help": "Visualiza todos os comandos",
    "p! clean": "Faz uma limpeza no chat",
    "p! eusou": "Mostra quem você é"
}

module.exports = async (client, msg) => {
    
    var texto = ""

    await Object.keys(commands).forEach(c => {
        texto += `\n${c}: ${descriptions[c] ? descriptions[c] : 'Sem descrição'}`
    });

    const embed = new Discord.MessageEmbed()
        .setTitle("📜  Comandos")
        .setColor(0xECDC1E)
        .setDescription(texto);

    msg.channel.send(embed)
}