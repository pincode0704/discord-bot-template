const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder().setName('dice').setDescription('roll a dice '),
	async execute(client, interaction) {

    	//隨機取得結果（ 1 ~ 6 )
    	result = Math.floor(Math.random() * 6) + 1;

    	//從結果計算獲得/失去的 money
    	score = result - 3;

    	//讀取 players.json 並 parse 成 players
        const jsonDataIn = fs.readFileSync('player.json');
    	let players = JSON.parse(jsonDataIn);

    	//在所有資料中尋找呼叫此指令玩家的資料
    	let found = 0;

    	for (let i = 0; i < players.length; i++) {
        	//如果有就修改該玩家的 money 並回覆結果
        	if (players[i].id == interaction.user.id){
                
                players[i].money += score
                found = 1;
               
                const embad = new EmbedBuilder()
                .setColor("#600030")
                .setTitle("result")
                .setDescription(`Your dice is ${result}`)
                .addFields([
                    {
                        name: 'Your name',
                        value: interaction.user.username,
                        inline: false
                    },
                    {
                        name: 'You got',
                        value: String(score),
                        inline: false
                    },
                    {
                        name: 'Your money',
                        value: String(players[i].money),
                        inline: false
                    }
                ])
        
                interaction.reply({embeds:[embad]})
            }

    	}
    	//如果沒有資料就創建一個新的並回覆結果
    	if (found == 0){
            
            let newPlayer = { "id": interaction.user.id, "money": 0 }
            players.push(newPlayer);

            players[players.length - 1].money += score;

            const embad = new EmbedBuilder()
            .setColor("#600030")
            .setTitle("result")
            .setDescription(`Your dice is ${result}`)
            .addFields([
                {
                    name: 'Your name',
                    value: interaction.user.username,
                    inline: false
                },
                {
                    name: 'You got',
                    value: String(score),
                    inline: false
                },
                {
                    name: 'Your money',
                    value: String(players[players.length - 1].money),
                    inline: false
                }
            ])
    
            interaction.reply({embeds:[embad]})

        }


        
    	//stringify players 並存回 players.json
        const jsonDataOut = JSON.stringify(players);
    	//jsonDataOut = stringify players
    	//write jsonDataOut to players.json
        fs.writeFileSync('player.json', jsonDataOut);

	}
};
