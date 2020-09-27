const minecraftHost = "https://api.mcsrvstat.us/2/secretfriend.enxada.host";
const snekfetch = require("snekfetch");
const Discord = require('discord.js');

module.exports = async (client, msg) => {
    await snekfetch.get(minecraftHost).then((response) => {
        if (response.body.online) {
            const { players, version, motd } = response.body
    
            const resp = new Discord.MessageEmbed()
                .setTitle(`O Servidor está Online`)
                .setColor(0x56d663)
                .setDescription(motd.clean)
                .addField("Jogadores Online ", players.online)
                .addField("Limite de Jogadores ", players.max)
                .setFooter(version)
        
            msg.reply(resp)
        } else {    
            const resp = new Discord.MessageEmbed()
                .setTitle(`O Servidor está Offline`)
                .setColor(0xd1153b)
        
            msg.reply(resp)
        }
    }, e => {
        msg.reply("Oops! Não consegui ver o status desse servidor.")
    })
}
