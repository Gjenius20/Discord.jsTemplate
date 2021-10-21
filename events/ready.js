const client = require("../index");
const config = require("../config.json");
const colors = require("colors");

client.on("ready", async () => {
  console.log(
    colors.green(`[${client.user.username}]<${client.user.id}>: Ready...`)
  )
});
