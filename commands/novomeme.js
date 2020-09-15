const Discord = require('discord.js');
const names = require("../extra/names.json")

module.exports = (client, msg) => {
    let memeCreated = {
        id: names.length,
        nome: "",
        desc: null,
        url: "",
        isVideo: false
    }

    var fs = require('fs');
    fs.writeFile("./extra/backup.json", JSON.stringify(names), function(err) {
        if (err) {
            console.log(err);
        }
    });

    msg.channel.send("```" + msg.author.username + ", escreva o título do seu meme```");

    let collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000, max: 1 });
    collector.on('collect', message => {
        if(!message.author.bot) {
            console.log(message.content)

            memeCreated.nome = message.content
            message.channel.send(">>> Ok! O Título do seu meme será: " + message.content);
            message.channel.send("```Agora me envie o link de uma imagem para o seu meme```");
            stepOne(message)
        }
    })

    collector.on('end', collector => {
        if(collector.size == 0) {
            msg.channel.send("```Tempo expirado, por favor, recomeçe com 'p! novomeme'```")
        }
    })

    const stepOne = (message) => {
        if(!message.author.bot) {            
            let urlCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000, max: 1 });
            urlCollector.on('collect', message => {
                memeCreated.url = message.content;
                message.channel.send(">>>Ok! A imagem do seu meme será: " + message.content);
                message.channel.send("```Por fim, envie uma descrição divertida!```");
                stepThree(message)
                urlCollector.dispose(message)
            })
            urlCollector.on('end', collector => {
                if(collector.size == 0) {
                    msg.channel.send("```Tempo expirado, por favor, recomeçe com 'p! novomeme'```")
                }
            })
        }
    }

    const stepThree = (message) => {
        if(!message.author.bot) {

        console.log(message.content)
        let descCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000, max: 1 });
            descCollector.on('collect', message => {
                memeCreated.desc = message.content;
                message.channel.send(message.author.username + " seu meme ficará assim: ");

                const meme = new Discord.MessageEmbed()
                    .setTitle("Você é " + memeCreated.nome)
                    .setColor(0x5A4AA5)
                    .setDescription(memeCreated.desc ? memeCreated.desc : "")
                    .setImage(memeCreated.url ? memeCreated.url : null)
                    //.setFooter("Criado por: " + message.author.username)
                
                message.channel.send(meme)

                message.channel.send("Digite 'C' para confirmar, ou 'N' para descartar o meme");
                confirm(message)
                descCollector.dispose(message)
            })
            descCollector.on('end', collector => {
                if(collector.size == 0) {
                    msg.channel.send("Tempo expirado, por favor, recomeçe com 'p! novomeme'")
                }
            })
        }
    }

    const confirm = (message) => {
        if(!message.author.bot) {
            console.log(message.content)

            let confirm = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000, max: 1 });
            confirm.on('collect', message => {
                if (message.content.toUpperCase() == "C") {
                    names.push(memeCreated)

                    var fs = require('fs');
                    fs.writeFile("./extra/names.json", JSON.stringify(names), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    message.channel.send("Meme descartado!");
                }
            })
            confirm.on('end', collector => {
                if(collector.size == 0) {
                    msg.channel.send("Tempo expirado, por favor, recomeçe com 'p! novomeme'")
                }
            })
        }
    }

    //msg.reply("Olá, " + msg.author.username)
}