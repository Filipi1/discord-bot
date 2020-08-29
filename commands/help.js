const config = require("../config.json");
const commands = require("../scripts/commandsReader")(config.prefix);

const descriptions = {
    "p! ping": "Testa a velocidade de resposta do bot",
    "p! help": "Visualiza todos os comandos",
    "p! clean": "Faz uma limpeza no chat"
}

module.exports = async (client, msg) => {
    
    var texto = "\nComandos: \n"

    await Object.keys(commands).forEach(c => {
        texto += `\n${c}: ${descriptions[c] ? descriptions[c] : 'Sem descrição'}`
    });

    msg.reply(texto)
}