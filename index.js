const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
console.log('Command files:', commandFiles);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Loaded command: ${command.name}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    console.log(`Received message: ${message.content}`);

    if (message.content.includes(client.user.id)) {
        const command = client.commands.get('mention');
        if (command) {
            console.log(`Executing command: ${command.name}`);
            command.execute(message);
        } else {
            console.error(`Command not found: mention`);
        };
    }
});

client.login(process.env.TOKEN);