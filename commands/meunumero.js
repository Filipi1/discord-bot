module.exports = async (client, msg) => {
    const numeroAleatorio = Math.floor(Math.random() * (150))

    msg.reply("eu acredito que um bom número pra você seja: " + numeroAleatorio)
}