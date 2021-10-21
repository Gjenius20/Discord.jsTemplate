const { Message, MessageEmbed } = require("discord.js");
const colors = require("colors");

module.exports = {
   name: "ping",
   timeout: 120000, //timeout
   description: "just ping command",
   aliases: ["ping"],

   run: async (client, message, args) => {
      message.reply('Hello world!')
   },
};