const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

//discordapp.com/oauth2/authorize?=&client_id=749347709952983071&scope=bot&permissions=8

const commandsReader = require("./scripts/commandsReader.js");
const commands = commandsReader(config.prefix);

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.user.tag} usuários`)
    client.user.setActivity("p! help")
});

client.on("message", async (message) => {
    if (!message.author.bot) {

        const args = message.content.split(" ");

        if (args[0] == config.prefix) {
            var command = args[0] + " " + args[1]
            if(commands[command])
                commands[command](client, message);
            else {
                const embed = new Discord.MessageEmbed()
                .setTitle("❌  Oops!")
                .setDescription(`Não existe nenhum comando "${command}". \n\nDigite "p! help" para ver os comandos disponíveis.`)
                .setColor(0xE34545)
        
                message.reply(embed);    
            }
                
        }
    }
});

client.login(config.token);