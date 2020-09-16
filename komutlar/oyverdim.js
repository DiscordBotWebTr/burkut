const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjcyNjc3MTYzMjMwODIyNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc3NTE5MDc4fQ.j2VEPIWg_54Y-j_YVjjWaJUTIm122k7hsq2WPG_yygI', client);
exports.run = (client, message) => {
    dbl.hasVoted(message.author.id).then(voted => {
        if (!voted) {
            message.reply("Bu komutu kullanabilmek için DBL üzerinden oy vermen gerekiyor. (Eğer oy verdiyseniz bi kaç dakika bekleyin .s) \nOy vermek için: https://top.gg/bot/746921862944260203/vote") //botunuzun dbl vote linkini yazın

        } else {
            message.channel.send("Destekçi rolün verildi.");
            message.member.addRole("754801925353898204")//oy verince eklenecek rol id

        }
    })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["upvote", "oyverdim"],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'oyverdim',
  category: 'kullanıcı',
  description: 'Destekçi rolü alırsın.',
  usage: '/oyverdim'
};