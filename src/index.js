const fs = require('fs');
const YAML = require('yaml');
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const progressUtils = require('./utils/progress');

const config = YAML.parse(fs.readFileSync('./resources/config.yml', 'utf8'));
const badWords = YAML.parse(fs.readFileSync('./resources/bad_words.yml', 'utf8')).words;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    const logChannel = await client.channels.fetch(config.log_channel);
    progressUtils.setLogChannel(logChannel);
    await registerCommands();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'start') {
        await interaction.reply('Starting the ban removal process...');
        await scanBanList(interaction);
    } else if (commandName === 'progress') {
        const progress = progressUtils.getProgress();
        await interaction.reply(`Progress: ${progress.processed}/${progress.total} (${progress.percentage}%)`);
    }
});

async function registerCommands() {
    const commands = [
        {
            name: 'start',
            description: 'Start the ban removal process'
        },
        {
            name: 'progress',
            description: 'Check the progress of the ban removal process'
        }
    ];

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(client.user.id, config.guildId),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

async function scanBanList(interaction) {
    const guild = await client.guilds.fetch(config.guildId);
    const bans = await guild.bans.fetch();
    const totalBans = bans.size;

    progressUtils.start(totalBans);

    for (const [userId, banInfo] of bans) {
        const username = banInfo.user.username;
        const discriminator = banInfo.user.discriminator;
        const nickname = banInfo.user.nickname || '';

        if (containsBadWords(username) || containsBadWords(nickname)) {
            await guild.bans.remove(userId);
            const logMessage = `Removed ban for: ${username}#${discriminator}`;
            console.log(logMessage);
            progressUtils.setLogChannel(logChannel);
        }

        progressUtils.update();
    }

    progressUtils.complete();
    await interaction.followUp('Ban scan completed.');
}

function containsBadWords(text) {
    return badWords.some(word => text.includes(word));
}

client.login(config.token);