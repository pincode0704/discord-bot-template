const { Client, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("messageCreate", async (message) => {
    console.log(
        `在 ${message.guild.name} > ${message.channel.name} 收到來自 ${message.member.displayName} 的訊息：${message.content}`,
    );
});

client.once("ready", async (client) => {
    console.log(`${client.user.tag} 已上線！`);
});

client.login(process.env.TOKEN);
