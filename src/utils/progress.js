let logChannel = null;

const progress = {
    total: 0,
    processed: 0,

    setLogChannel(channel) {
        logChannel = channel;
    },

    start(totalBans) {
        this.total = totalBans;
        this.processed = 0;
        const message = `Starting the ban removal process for ${this.total} bans.`;
        console.log(message);
        if (logChannel) logChannel.send(message);
    },

    update() {
        this.processed++;
        const percentage = ((this.processed / this.total) * 100).toFixed(2);
        const message = `Progress: ${this.processed}/${this.total} (${percentage}%)`;
        console.log(message);
        if (logChannel) logChannel.send(message);
    },

    complete() {
        const message = `Ban removal process completed. Total processed: ${this.processed}/${this.total}`;
        console.log(message);
        if (logChannel) logChannel.send(message);
    },

    getProgress() {
        const percentage = ((this.processed / this.total) * 100).toFixed(2);
        return {
            processed: this.processed,
            total: this.total,
            percentage
        };
    }
};

module.exports = progress;