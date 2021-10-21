const { MessageEmbed } = require('discord.js');
const client = require("../index");
const colors = require("colors");
const ms = require("ms");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command =
        client.commands.get(cmd.toLowerCase()) ||
        client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${command.name}${message.author.id}`))
                return message.channel
                    .send({
                        embeds: [
                            new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription(
                                    `You cant Use The command after \`${ms(
                                        Timeout.get(
                                            `${command.name}${message.author.id}`
                                        ) - Date.now(),
                                        { long: true }
                                    )}\``
                                ),
                        ],
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 2000);
                    });
            command.run(client, message, args);
            Timeout.set(
                `${command.name}${message.author.id}`,
                Date.now() + command.timeout
            );
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`);
            }, command.timeout);
        }
    }

    if (!command) return;
    // await command.run(client, message, args);
});
console.log(colors.green("[messageCreate]: Ready..."));

// message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
