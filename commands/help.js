const config = require("../config.json");
const commands = require("../scripts/commandsReader")(config.prefix);
const Discord = require('discord.js');

const descriptions = {
    "s! ping": "Testa a velocidade de resposta do bot",
    "s! help": "Visualiza todos os comandos",
    "s! clean": "Faz uma limpeza no chat",
    "s! eusou": "Mostra quem você é",
    "s! novomeme": "Crie seu proprio meme para os comandos 'eusou'.",
    "s! meunumero": "Te ajuda a escolher um número",
    "s! minecraft": "Mostra o status do servidor de Minecraft SecretFriend"
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