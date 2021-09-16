module.exports = async (client, msg) => {
    msg.reply("o Administrador colocou essa função como inativa por enquanto, estamos preparando tudo e logo você poderá desfrutar desse comando. Agradecemos a compreenção.")
    return

    if (msg.member.voice.channel) {
        const audios = require("../extra/audios.json")
        const randomNumber = Math.floor(Math.random() * (audios.length))
        const chosedAudio = audios[randomNumber]
        const audioInstance = await msg.member.voice.channel.join();

        try {
            console.log(chosedAudio)
            const audioURL = './audios/' + chosedAudio.audio_name
            const audioDuration = chosedAudio.duration_in_seconds * 1000
            audioInstance.play(audioURL)

            setTimeout(() => {
                audioInstance.disconnect()
            }, audioDuration)
        } catch {
            msg.reply("Desculpe, não consegui reproduzir seu som no momento!")
            audioInstance.disconnect()
        }


    } else {
        msg.reply("Você não está em um canal de voz")
    }
}