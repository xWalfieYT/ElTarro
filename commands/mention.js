module.exports = {
    name: 'mention',
    description: 'Replies when the bot is mentioned.',
    execute(message) {
        console.log('Executing mention from mention file');
        message.reply(`Ok ${message.member.displayName}, I see you're having some fun with this command, huh? But from what I've seen, you need to be more specific. I can't just do anything you want me to do. I mean, I can, but that would be a bit boring, don't you think? What do you want me to do, ban <@913878246259580958>?`);
    },
};