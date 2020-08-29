module.exports = async (client, msg) => {
    try {
        const channel = msg.channel;
        const fetchMessages = await channel.messages.fetch({ limit: 100 }, true, true)
        await channel.bulkDelete(fetchMessages);
        msg.reply("Mensagens apagadas")
    } catch (err) {
        switch (err.code) {
            case 50034 :
                msg.reply(`O histórico desse canal possui mensagens muito antigas.`)
                break;
            default :
                msg.reply(`Ocorreu um erro interno, por favor, consulte um admin`)
        }
    }
}