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

    const expirationTime = 35000; // 20 segundos

    var fs = require('fs');
    fs.writeFile("./extra/backup.json", JSON.stringify(names), function(err) {
        if (err) {
            console.log(err);
        }
    });

    msg.channel.send("```📄 " + msg.author.username + ", escreva o título do seu meme```");

    let collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: expirationTime, max: 1 });
    collector.on('collect', message => {
        if(!message.author.bot) {
            memeCreated.nome = message.content

            const menssagem = new Discord.MessageEmbed()
                .setTitle("Ok! O Título do seu meme será: " + message.content)
                .setColor(0x00FF7F)

            message.channel.send(menssagem);
            message.channel.send("```🎨 Agora me envie o link de uma imagem para o seu meme```");
            stepOne(message)
        }
    })

    collector.on('end', collector => {
        if(collector.size == 0) {
            msg.channel.send("```⏱ Tempo expirado, " + msg.author.username + " por favor, recomeçe com 's! novomeme'```")
        }
    })

    const stepOne = (message) => {
        if(!message.author.bot) {            
            let urlCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: expirationTime, max: 1 });
            urlCollector.on('collect', message => {
                
                if (message.content === '' || message.content === null)
                    memeCreated.url = message.attachments.first().attachment
                else
                    memeCreated.url = message.content;

                console.log(message.attachments.first().attachment)

                const menssagem = new Discord.MessageEmbed()
                    .setTitle("Ok! Imagem definida!")
                    .setColor(0x00FF7F)
                message.channel.send(menssagem);

                message.channel.send("```🧾 Por fim, envie uma descrição divertida!```");
                stepThree(message)
                urlCollector.dispose(message)
            })
            urlCollector.on('end', collector => {
                if(collector.size == 0) {
                    msg.channel.send("```⏱ Tempo expirado, " + msg.author.username + " por favor, recomeçe com 's! novomeme'```")
                }
            })
        }
    }

    const stepThree = (message) => {
        if(!message.author.bot) {
        let descCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: expirationTime, max: 1 });
            descCollector.on('collect', message => {
                memeCreated.desc = message.content;
                message.channel.send(message.author.username + " seu meme ficará assim: ");

                const meme = new Discord.MessageEmbed()
                    .setTitle("Você é " + memeCreated.nome)
                    .setColor(0x00FF7F)
                    .setDescription(memeCreated.desc ? memeCreated.desc : "")
                    .setImage(memeCreated.url ? memeCreated.url : null)
                    //.setFooter("Criado por: " + message.author.username)
                
                message.channel.send(meme)

                confirm(message)
                descCollector.dispose(message)
            })
            descCollector.on('end', collector => {
                if(collector.size == 0) {
                    msg.channel.send("```⏱ Tempo expirado, " + msg.author.username + " por favor, recomeçe com 's! novomeme'```")
                }
            })
        }
    }

    const confirm = (message) => {
        if(!message.author.bot) {
            const filter = (reaction, user) => {
                return reaction.emoji.name === '👍' || reaction.emoji.name === '👎' && user.id === msg.author.id;
            };
            
            msg.channel.send("```💾 Reaja essa mensagem com '👍' para confirmar ou '👎' para descartar esse meme```").then(message => {
                const collector = message.createReactionCollector(filter, { time: expirationTime, max: 1 });
            
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '👍' ) {
                        names.push(memeCreated)
                        var fs = require('fs');
                        fs.writeFile("./extra/names.json", JSON.stringify(names), function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        const menssagem = new Discord.MessageEmbed()
                            .setTitle("Seu meme foi criado com sucesso! digite 's! eusou' e boa sorte!")
                            .setColor(0x5A4AA5)
                        message.channel.send(menssagem);

                    } else if (reaction.emoji.name === '👎') {
                        message.channel.send("```🚮 Meme descartado!```");
                    }
                });
                
                collector.on('end', collected => {
                    if (collected.size === 0)
                        message.channel.send("```⏱ Tempo expirado, " + msg.author.username + " por favor, recomeçe com 's! novomeme'```")
                });
            })
        }
    }

    //msg.reply("Olá, " + msg.author.username)
}