const { SlashCommandBuilder } = require("discord.js");

function valid(scramble, i) {
	if (i && scramble[i - 1][0] == scramble[i][0]) return false;

	// This is checking if the move 2 moves ago is the same as before, and then checks to see if the move before is opposite
	if (i > 1 && scramble[i][0] == scramble[i - 2][0])
		if ((scramble[i][0] == 'U' && scramble[i - 1][0] == 'D') || (scramble[i][0] == 'D' && scramble[i - 1][0] == 'U') ||
			(scramble[i][0] == 'R' && scramble[i - 1][0] == 'L') || (scramble[i][0] == 'L' && scramble[i - 1][0] == 'R') ||
			(scramble[i][0] == 'F' && scramble[i - 1][0] == 'B') || (scramble[i][0] == 'B' && scramble[i - 1][0] == 'F')) return false;

	return true;
}

function genThreeScramble() {
    const moves = ['U', 'R', 'F', 'D', 'L', 'B'];
    const modifiers = ['\'', '2', ' ']

    const scrambleLength = Math.floor(Math.random() * (29 - 24)) + 24;
    let scrambleArray = new Array(scrambleLength);

    for (let i = 0; i < scrambleLength; i++) {
        scrambleArray[i] = new Array(2);
    }

    let scrambleString = "";

    for (let i = 0; i < scrambleLength; i++) {
        scrambleArray[i][0] = moves[Math.floor(Math.random() * moves.length)];
        scrambleArray[i][1] = modifiers[Math.floor(Math.random() * modifiers.length)];
    
        if (!valid(scrambleArray, i)) {
            i--;
            continue;
        }
    
        scrambleString += scrambleArray[i][0];
        scrambleString += scrambleArray[i][1];

        if (scrambleArray[i][1] != ' ') scrambleString += ' ';
    }

    return scrambleString;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("scramble")
		.setDescription('Replies with a 3x3 Scramble"'),
	async execute(interaction) {
        const scramble = genThreeScramble();
		await interaction.reply({ content: scramble,  ephemeral: false });
	},
};