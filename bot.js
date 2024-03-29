const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const names = require('./extra/names.json');

require('dotenv').config()

//discordapp.com/oauth2/authorize?=&client_id=749347709952983071&scope=bot&permissions=8

const commandsReader = require("./scripts/commandsReader.js");
const commands = commandsReader(config.prefix);

client.on("ready", () => {
    console.log(`${client.user.tag} foi iniciado com ${names.length} memes.`)
    client.user.setActivity("s! help")
});

client.on("message", async (message) => {
    if (!message.author.bot) {
        const args = message.content.split(" ");

        if (args[0] == config.prefix) {
            var command = args[0] + " " + args[1]
            if(commands[command.toLowerCase()])
                commands[command.toLowerCase()](client, message);
            else {
                const embed = new Discord.MessageEmbed()
                .setTitle("❌  Oops!")
                .setDescription(`Não existe nenhum comando "${command}". \n\nDigite "s! help" para ver os comandos disponíveis.`)
                .setColor(0xE34545)
                
                message.reply(embed);    
            }
        }
    }
});

client.login(process.env.TOKEN);