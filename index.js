const { Client, Collection, MessageEmbed } = require("discord.js");
require("dotenv").config();
const colors = require("colors");

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
Timeout = new Collection();

client.config = require("./config.json");

require("./handler")(client);

client.login(process.env.token);
