const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

if (db.has(`üyelikk_${message.author.id}`)) {
   message.channel.send(`<a:gaktif:754796367804760096>Gold Durum: \`Aktif!\``)
  message.channel.send(`<a:sonsuz:754795808137674882>Gold Süre: \`Sınırsız!\``)
 } else
  message.channel.send('Sistemde sizin adınıza ait gold üye bulunamadı.')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['durum','gold-durum','golddurum','goldurum'],
  kategori: 'kullanıcı',
  permLevel: 0
};

exports.help = {
  name: 'gold-durum',
  description: 'gold sistemi',
  usage: 'gold-durum'
};