const Discord = require('discord.js');

module.exports = async (client, msg) => {
    var nomes = {
        0: "o Paulo Alves",
        1: "o Jonathan Pereira",
        2: "a Evelyne Almeida",
        3: "o Henrique Soares",
        4: "o Hugo Serenatto",
        5: "o Filipe Braga",
        6: "o Nelson Mandela",
        7: "a Raiane Alves",
        8: "a Famosa Camilosa",
        9: "a Fernando Palhaça",
        10: "o Dudu da Italia",
        11: "o Jardel Pires",
        12: "a Leticia Luna",
        13: "o Edinho Mosquito",
        14: "o Adobe Photoshop",
        15: "a Miss Continente Icarai",
        16: "a Papicu",
        17: "a Bleyblade",
        18: "o Seu Mororó",
        19: "o Pita",
        20: "o Ronnis",
        21: "a Muda",
        22: "o Patati",
        23: "o Patata",
        24: "a Bolinha de Golfe",
        25: "yaaa Yamete Kudasai",
        26: "a Hatsune Miku",
        27: "o Fábio da Caravana",
        28: "o pratinho da mãe da Raiane Alves",
        29: "a Sarah Bixa",
        30: "o MC Poze com a Gowon do Loona",
        31: "Você é o Gugu Gaitero",
        32: "Mario do Tiktok, Roi, " + msg.author.username + " né?",
        33: "o Narutoooo",
        34: "o Sasukeeee",
        35: "o Relâmpago Marquinhos",
        36: "o Tirulipa",
        37: "o DJ Rogerinho",
        38: "o Nego Bam com o Pikachu##https://i.ytimg.com/vi/9_WqodMl-F0/maxresdefault.jpg",
        39: "o Stuart ##https://redacao2ufpr.files.wordpress.com/2012/05/dino.jpg",
        40: "o Cirilo falando que odeia a Maria Joaquina",
        41: "o Bruno Bertti",
        42: "o Nego Bam Cowboy##https://i.ytimg.com/vi/lTCPsU3BO04/hqdefault.jpg"
    }

    var size = Object.keys(nomes).length
    var random = Math.floor(Math.random() * (size))
    var url = nomes[random].split('##')[1]
    var nome = nomes[random].split('##')[0];
    var result
    
    if (url != null || url != undefined) {
        url = url.replace('##', '')

        result = new Discord.MessageEmbed()
        .setTitle("Você é " + nome)
        .setColor(0x1EEC85)
        .setImage(url)

        msg.reply(result);
    } else {
        result = new Discord.MessageEmbed()
        .setTitle("Você é " + nome)
        .setColor(0x1EEC85)

        msg.reply(result);
    }
}