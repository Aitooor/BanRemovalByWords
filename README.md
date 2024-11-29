# BanRemovalByWords

This project is a Discord bot designed to scan through a guild's ban list and remove bans based on specific criteria. It checks usernames and nicknames against a list of prohibited words and unbans users accordingly. The bot is built using JavaScript and the discord.js library.

## Project Structure

```
BanRemovalByWords
├── src
│   ├── index.js          # Main entry point of the Discord bot
│   ├── utils
│   │   └── progress.js   # Utility functions for tracking progress
├── resources
│   ├── config.yml        # Configuration settings for the bot
│   └── bad_words.yml     # List of words triggering ban removal
├── package.json           # npm configuration file
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd BanRemovalByWords
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure the bot:**
   - Edit the `resources/config.yml` file to include your Discord guild ID and any other necessary parameters.

4. **Define bad words:**
   - Update the `resources/bad_words.yml` file with the list of words that should trigger a ban removal.

5. **Run the bot:**
   ```
   node src/index.js
   ```
   Or use:
   ```
   npm start
   ```

## Usage

Once the bot is running, it will automatically scan the ban list of the specified guild and remove bans for users whose usernames or nicknames contain any of the words listed in `bad_words.yml`. The bot will log its progress, which can take some time depending on the size of the ban list.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.