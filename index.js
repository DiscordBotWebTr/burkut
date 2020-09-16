if (process.version.slice(1).split(".")[0] < 8)
  throw new Error(
    "Node 8.0.0 or higher is required. Update Node on your system."
  );
const ms = require("parse-ms");
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const { RichEmbed } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require("chalk");
const fs = require("fs");
const { stripIndents } = require("common-tags");
require("moment-duration-format");
const moment = require("moment");

const request = require("request");
const db = require("quick.db");
const jimp = require("jimp");
const snekfetch = require("snekfetch");
const useful = require("./x.js");
const config = require("./config.json");
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;
let komutum = JSON.parse(fs.readFileSync("./komutlar.json", "utf8"));

client.cmdd = komutum;

client.useful = useful;
require("./modüller/fonksiyonlar.js")(client);

require("./util/eventLoader")(client);
client.config = require("./config.js");
client.emojiler = {
  gold: "656943365660737555", //?PARAM DAKİ ALTIN EMOJİSİ
  paraGitti: "754812196453875752", // X İŞARETİ
  paraGitmedi: "754812197728944229", // TİK İŞARETİ
  paraROZET: "746939296040353883", // PARA İLE ALINAN YILDIRIM ROZET EMOJİSİ
  onayRozet: "746940659566641193", // ONAY ROZETİ
  modRozet: "746939566241480756", // MOD ROZETİ
  yetkiliRozet: "746939748752556074", // YETKİLİ ROZETİ
  destekçiRozet: "746939943837761586",
  evet: "754812196453875752", // TİK İŞARET
  hayır: "754812197728944229", // X İŞARETİ
  acikk: "754812197728944229",
  kapalii: "754812197728944229",
  kendineParaYollama: "746941819367063672", // KENDİNE PARA ATMAYA ÇALIŞANLAR İÇİN SİNİRLİ EMOJİSİ
  konfeti: "746941130205036595", // MESLEK SAHİBİ OLUNCA RENGARENK KONFETİ ATIYOR
  yukleniyor: "754825427402621060", // YÜKLENİYOR EMOJİ İŞTE :D
  sinirli: "746941819367063672", // TİTREYEN SİNİRLİ :D
  mutlu: "746942198972547103", // MUTLU EMOJİ
  rahatsiz: "754799769314132089", // RAHATSIZ ETMEYİN EMOJİSİ
  cevrimici: "754799769276121089", // ÇEVRİMİÇİ EMOJİSİ
  yayin: "754799769418858556", // YAYINCI EMOJİSİ
  cevrimdisi: "754799769229983817", // ÇEVRİM DIŞI EMOJİSİ
  bosta: "754799769708134592", // BOŞTA EMOJİSİ
  bot: "754828162038235176", // BOT EMOJİSİ
  polis: "746944522336075957", // POLİS EMOJİ
  Yvar: "754812196453875752", // YETKİLERİM KOMUDUNDAKİ TİK İŞARETİ
  Yyok: "754812197728944229", // YETKİLERİM KOMUDUNDAKİ X İŞARETİ
  yan: "746944752318021743", // > GİBİ EMOJİ İŞTE :ç
  kalpSarılmalı: "746945125351030925",
  olumlu: "754812196453875752",
  olumsuz: "754812197728944229",

  // AYARLAR KOMUDUNDAKİ AÇIK KAPALI EMOJİLERİ >>>>>>>>>>>>>>>>>
  kapalıA: "754812197728944229",
  açıkA: "754812196453875752",

  // AÇIK BONUS EMOJİLERİ -------------- >>>>>>>>>>

  açıkB: "549204804468211740", // B
  açıkO: "549204805151621141", // O
  açıkN: "549204804446978058", // N
  açıkU: "549204806796050462", // U
  açıkS: "549204806380552202", // S

  // KAPALI BONUS EMOJİLERİ ---------------- >>>>>>>>>>>>>
  kapalıB: "549204804468211740", // B
  kapalıO: "549205266130927648", // O
  kapalıN: "549205265702977542", // N
  kapalıU: "549205268051787776", // U
  kapalıS: "549205267246612482" // S
};

client.ayarlar = {
  oynuyor: "!yardım | DiscordBot.Web.Tr :)",
  official_sahip: "130352982616178689",
  sahip: "130352982616178689",

  yardimcilar: [""],
  isim: "Bürküt",
  botD:
    "https://discordapp.com/oauth2/authorize?client_id=746921862944260203&scope=bot&permissions=8",
  webS: "https://burkut.discordbot.web.tr/",
  web: "https://burkut.discordbot.web.tr/",
  site: "https://burkut.discordbot.web.tr/",
  dblO: "https://top.gg/bot/746921862944260203/vote",
  dbl: "https://top.gg/bot/746921862944260203",
  dbltoken:
        "",
  webpanel: "https://burkut.discordbot.web.tr/",
  versiyon: "1.0.0",
  prefix: "!",
  renk: "RANDOM",
  version: "1.0.0"
};
client.a = {
  sa: `${bot.version}`
};
client.avatarURL = `https://i.hizliresim.com/FbCapG.png`;
client.en = require("./en.js");

client.tr = require("./tr.js");

//var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${chalk.yellow(`+`)} ${message}`);
};

const DBL = require("dblapi.js");
const dbl = new DBL(client.ayarlar.dbltoken, client);

// Optional events
dbl.on("posted", () => {
  console.log("Dbl gönderildi");
});

dbl.on("error", e => {
  console.log(`Oops! ${e}`);
});


client.on('message', msg => {
    if(client.bot) return

 const user = msg.mentions.users.first();
    const ben = msg.author.username
    if(user)
      {
        let offlineetiket = db.fetch(`offline_${msg.guild.id}`)
        if(offlineetiket === 1){
        const paras = new Discord.RichEmbed()

        .setDescription(`[Mesaja gitmek için tıkla](${msg.url})`)
        .setAuthor(`${ben}, ${msg.guild.name} Sunucusunda ${msg.channel.name} kanalında sizi etiketledi.`, msg.author.avatarURL)
        .setColor("RANDOM")
        .setTimestamp()
        const kanalid = msg.channel.id
        const statu = user.presence.status
  if(statu === 'offline')
    {
      return user.send(paras)
      
    }

        
      } }

  });






client.on("message", async msg => {
  let message = msg;

  const bt =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;
  if (message.isMentioned(client.user.id)) {
    msg.react(client.emojis.get(client.emojiler.mutlu));
  }
});

client.on("message", async message => {
  if (message.content === "++fake") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
client.on("message", async message => {
  if (message.content === "++feyk") {
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(`üyelikk_${msg.author.id}`)) {
      if (msg.content.toLowerCase() === "sa") {
        msg.channel.send(
          `<a:as:746923498034692146> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:as:746923498034692146>`
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        msg.channel.send(
          `<a:as:746923498034692146> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:as:746923498034692146>`
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "s.a") {
        msg.channel.send(
          `<a:as:746923498034692146> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:as:746923498034692146>`
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamun aleyküm") {
        msg.channel.send(
          `<a:as:746923498034692146> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:as:746923498034692146>`
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamün aleyküm") {
        msg.channel.send(
          `<a:as:746923498034692146> Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin <a:as:746923498034692146>`
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "sa") {
      msg.channel.send(
        `Aleyküm Selam Hoşgeldin ${msg.author}`
      );
      db.add(`slmal_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "selam") {
      msg.channel.send(
        `Aleyküm Selam Hoşgeldin ${msg.author}`
      );
      db.add(`slmal_${msg.author.id}`, 1);
    }
  }
});
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(`üyelikk_${msg.author.id}`)) {
      if (msg.content.toLowerCase() === "as") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "a.s") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "aleyküm") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "aleykümselam") {
        db.add(`slm_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "as") {
      db.add(`slm_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "aleyküm selam") {
      db.add(`slm_${msg.author.id}`, 1);
    }
  }
});

client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  if (db.has(`lvl2_${msg.author.id}`) === true) {
    if (db.has(`lvll_${msg.guild.id}`) === true) {
      let memberChannel = await db.fetch(`sk_${msg.guild.id}`);

      if (msg.channel.type === "dm") return;
      if (msg.author.bot) return;

      if (msg.content.length > 40) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 4);
      }
      if (msg.content.length > 35) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 4);
      }
      if (msg.content.length > 30) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 3);
      }
      if (msg.content.length > 25) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 3);
      }
      if (msg.content.length > 20) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 2);
      }
      if (msg.content.length > 15) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 2);
      }
      if (msg.content.length > 10) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
      }
      if (msg.content.length < 5) {
        db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
      }

      if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 250) {
        db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
        if (memberChannel) {
          if (db.has(`üyelikk_${msg.author.id}`)) {
            msg.guild.channels
              .get(memberChannel)
              .send(
                `<a:seviye:746926552809341029> Kral <@${
                  msg.author.id
                }>, Seviye atladın ve \`${db.fetch(
                  `seviye_${msg.author.id + msg.guild.id}`
                )}\` seviye oldun`
              );
          } else
            msg.guild.channels
              .get(memberChannel)
              .send(
                `Tebrik ederim <@${
                  msg.author.id
                }>! Seviye atladın ve \`${db.fetch(
                  `seviye_${msg.author.id + msg.guild.id}`
                )}\` seviye oldun!`
              );
        } else if (db.has(`üyelikk_${msg.author.id}`)) {
          msg.channel.send(
            `<a:seviye:746926552809341029> Kral <@${
              msg.author.id
            }>, Seviye atladın ve \`${db.fetch(
              `seviye_${msg.author.id + msg.guild.id}`
            )}\` seviye oldun`
          );
        } else
          msg.channel.send(
            `Tebrik ederim <@${msg.author.id}>! Seviye atladın ve \`${db.fetch(
              `seviye_${msg.author.id + msg.guild.id}`
            )}\` seviye oldun!`
          );

        db.delete(`puancik_${msg.author.id + msg.guild.id}`);
      }
    } else return;
  } else return;
});

client.ayar = db;

const botadi = "Bürküt";

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  require("./modüller/panel.js")(client);

  console.log(
    `${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(
      client.guilds.size
    )} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(
      client.users.size.toLocaleString()
    )} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`
  );
  client.user.setStatus("online");
  client.user.setActivity(client.ayarlar.oynuyor, { type: "WATCHING" });
});

client.on("guildCreate", guild => {
  const e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      "Hey, ben Bürküt. Az önce beni ekledin.\n!yardım yazarak bilgi alabilirsin."
    )
    .setFooter("Sunucu kurucusu olduğunuzdan dolayı sadece size gönderildi.");

  guild.owner.send(e);
});
client.on("message", async msg => {
  db.add(`mesj_${msg.author.id}`, 1);
});

client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("#01CFFE")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }
  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        let y = await msg.channel.send(
          `Hey <@${msg.author.id}>, Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`
        );
        y.delete(5000);
        return;
      }
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`
          );
        db.add(`kuyarr_${msg.author.id}`, 1);
        msg.channel.send(k).then(message => message.delete(5000));
    
      }
    }
  }
  /*
  if (kufures === 1) {
        msg.reply(`Hey Küfür Sayınız \`1\` e ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
if (kufures === 2) {
        msg.reply(`Hey Küfür Sayınız \`2\` ye ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
  if (kufures === 3) {
    msg.client.users.get(msg.author.id).send(`Hey Küfür Sayınız \`3\` e ulaştı. Sunucudan atıldınız.`)
        msg.reply(`Hey Küfür Sayınız \`3\` e ulaştı. Sunucudan atıldınız.`).then(message => message.delete(15000));
      msg.guild.member(msg.author.id).kick();
      }
      if (kufures === 4) {
        msg.reply(`Hey Küfür Sayınız \`4\` e ulaştı. \`5\` Olursa banlanacaksınız. Dikkatli konuşun!`).then(message => message.delete(15000));
      }
   if (kufures === 5) {
    
        msg.reply('Banlandı.').then(message => message.delete(15000));
 
     msg.guild.owner.send(`Hey, <@${ads}> Adlı kullanıcının Küfür Sayısı \`5\` e ulaştı. Ve Sunucudan banlandı.`)
         msg.client.users.get(msg.author.id).send(`Hey Küfür Sayınız \`5\` e ulaştı. Sunucudan banlandınız.`)
        msg.guild.member(msg.author.id).ban(); 
            db.delete(`kuyarr_${msg.author.id}`)
      }*/

  if (db.has(`linkE_${msg.guild.id}`) === true) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("link Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`
          );
        
        db.add(`luyarr_${msg.author.id}`, 1);
        msg.channel.send(ke).then(message => message.delete(5000));

      }
    }
  }
  /*
 if (linkes === 1) {
        msg.reply(`Hey Link Sayınız \`1\` e ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
if (linkes === 2) {
        msg.reply(`Hey Link Sayınız \`2\` ye ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
  if (linkes === 3) {
   
        msg.reply(`Hey Link Sayınız \`3\` e ulaştı. Sunucudan atıldınız.`).then(message => message.delete(15000));
      msg.guild.member(msg.author.id).kick();
      }
      if (linkes === 4) {
        msg.reply(`Hey Link Sayınız \`4\` e ulaştı. \`5\` Olursa banlanacaksınız. Dikkatli konuşun!`).then(message => message.delete(15000));
      }
   if (linkes === 5) {
    
        msg.reply('Banlandı.').then(message => message.delete(15000));
    
   
        msg.guild.member(msg.author.id).ban(); 
            db.delete(`kuyarr_${msg.author.id}`)
      }
*/
});

client.on("messageUpdate", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  
  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }

  if (!msg.guild) return;

  if (msg.author.bot) return;

  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        let y = await msg.reply(
          `Hey <@${msg.author.id}>, Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`
        );
        y.delete(5000);
        return;
      }
    }

    if (!msg.guild) return;

    if (db.has(`küfürE_${msg.guild.id}`) === true) {
      if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete();
          msg.channel
            .send(`<@${msg.author.id}>`)
            .then(message => message.delete(5000));
          var k = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Küfür Engeli!")
            .setDescription(
              `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`
            );
          db.add(`kuyarr_${msg.author.id}`, 1);
          msg.channel.send(k).then(message => message.delete(5000));
        }
      }
    }
  }
  /*
if (kufures === 1) {
        msg.reply(`Hey Küfür Sayınız \`1\` e ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
if (kufures === 2) {
        msg.reply(`Hey Küfür Sayınız \`2\` ye ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
  if (kufures === 3) {
   
        msg.reply(`Hey Küfür Sayınız \`3\` e ulaştı. Sunucudan atıldınız.`).then(message => message.delete(15000));
      msg.guild.member(msg.author.id).kick();
      }
      if (kufures === 4) {
        msg.reply(`Hey Küfür Sayınız \`4\` e ulaştı. \`5\` Olursa banlanacaksınız. Dikkatli konuşun!`).then(message => message.delete(15000));
      }
   if (kufures === 5) {
    
        msg.reply('Banlandı.').then(message => message.delete(15000));
 

  
        msg.guild.member(msg.author.id).ban(); 
            db.delete(`kuyarr_${msg.author.id}`)
      }*/

  if (db.has(`linkE_${msg.guild.id}`) === true) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var ke = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("link Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`
          );
        msg.channel.send(ke).then(message => message.delete(5000));
      }
    }
  }
  /*
 if (linkes === 1) {
        msg.reply(`Hey Link Sayınız \`1\` e ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
if (linkes === 2) {
        msg.reply(`Hey Link Sayınız \`2\` ye ulaştı. \`3\` Olursa atılacaksınız!`).then(message => message.delete(15000));
      }
  if (linkes === 3) {


        msg.reply(`Hey Link Sayınız \`3\` e ulaştı. Sunucudan atıldınız.`).then(message => message.delete(15000));
      msg.guild.member(msg.author.id).kick();
      }
      if (linkes === 4) {
        msg.reply(`Hey Link Sayınız \`4\` e ulaştı. \`5\` Olursa banlanacaksınız. Dikkatli konuşun!`).then(message => message.delete(15000));
      }
   if (linkes === 5) {
    
        msg.reply('Banlandı.').then(message => message.delete(15000));
    
 
  
        msg.guild.member(msg.author.id).ban(); 
            db.delete(`kuyarr_${msg.author.id}`)
      }*/
});
var ac = client.emojis.get(client.emojiler.açıkA);
var ka = client.emojis.get(client.emojiler.kapalıA);

client.on("guildMemberAdd", async member => {
  if (db.has(`otoR_${member.guild.id}`) === true) {
    var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
    var rolD = `${
      member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`))
        ? "var"
        : "yok"
    }`;

    var kanalD = `${
      member.guild.channels.get(db.fetch(`otoRK_${member.guild.id}`))
        ? "var"
        : "yok"
    }`;

    if (rolD === "var") {
      member.addRole(rol);

      if (db.has(`otoRK_${member.guild.id}`) === true) {
        if (kanalD === "var") {
          if (db.has(`üyelikk_${member.id}`)) {
            const embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setDescription(
                `<:gold:754848433969561712> Gold üye katıldı. \`${member.user.tag}\`, Hoşgeldin \`${rol.name}\` Adlı rolün verildi <:gold:754848433969561712>`
              );

            member.guild.channels
              .get(db.fetch(`otoRK_${member.guild.id}`))
              .send(embed);
          } else
            member.guild.channels
              .get(db.fetch(`otoRK_${member.guild.id}`))
              .send(
                `<a:duyuru:752184983241752637> <a:giris:754922360888492033> **${member.user.tag}** adlı kullanıcıya başarıyla otomatik rol olarak ayarlanmış olan \`${rol.name}\` adlı rol verildi!`
              );
        }
      }
    }
  }
});
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(
          `Başarıyla \`${db.fetch(
            `sayac_${message.guild.id}`
          )}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`
        )
        .setColor("RANDOM");
      message.channel.send({ embed });
      message.guild.owner.send({ embed });
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});

client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) === false) return;
  if (db.has(`sKanal_${member.guild.id}`) === false) return;

  if (db.has(`üyelikk_${member.id}`)) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")

      .setDescription(
        `<:gold:754848433969561712> Gold üye kayboldu. \`${
          member.user.tag
        }\` \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.members.size}\` Kişi Kaldı <:gold:754848433969561712>`
      );

    if (!member.guild.channels.get(channel)) return;

    member.guild.channels.get(channel).send(embed);
  } else
    member.guild.channels
      .get(channel)
      .send(
        `<a:duyuru:752184983241752637> <a:cikis:754922360163008583> **${
          member.user.tag
        }** Sunucudan ayrıldı! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.members.size}\` üye kaldı!`
      );
});

//let ot = JSON.parse(fs.readFileSync("./jsonlar/otoR.json", "utf8"));

client.on("guildMemberAdd", async member => {
  if (!member.guild) return;

  let prefix =
    (await db.fetch(`prefix_${member.guild.id}`)) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`);
  if (!hgK) return;

  const giris = db.fetch(`girisM_${member.guild.id}`);
  if (!member.guild.channels.get(hgK)) return;
  if (db.has(`üyelikk_${member.id}`)) {
    member.guild.channels.get(hgK).send(
      db.has(`girisM_${member.guild.id}`)
        ? giris
            .replace("{kullanıcı}", `<@${member.user.id}>`)
            .replace("{user}", `<@${member.user.id}>`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `<:gold:754848433969561712> <@${member.user.id}> Adlı Gold Üye Katıldı! **${client.ayarlar.webpanel}** adresinden veya (\`giriş-mesaj-ayarla\` komutu ile mesajı değiştirilebilir. <:gold:754848433969561712>`
    );
  } else
    member.guild.channels.get(hgK).send(
      db.has(`girisM_${member.guild.id}`)
        ? giris
            .replace("{kullanıcı}", `<@${member.user.id}>`)
            .replace("{user}", `<@${member.user.id}>`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `<@${member.user.id}> Katıldı! **${client.ayarlar.webpanel}** adresinden veya (\`giriş-mesaj-ayarla\` komutu ile mesajı değiştirilebilir.)`
    );
});

client.on("guildMemberRemove", async member => {
  if (!member.guild) return;

  let prefix =
    (await db.fetch(`prefix_${member.guild.id}`)) || client.ayarlar.prefix;

  if (db.has(`gc_${member.guild.id}`) === false) return;

  const hgK = await db.fetch(`gc_${member.guild.id}`);
  if (!hgK) return;

  const cikis = db.fetch(`cikisM_${member.guild.id}`);
  if (!member.guild.channels.get(hgK)) return;
  if (db.has(`üyelikk_${member.id}`)) {
    member.guild.channels.get(hgK).send(
      db.has(`cikisM_${member.guild.id}`)
        ? cikis
            .replace("{kullanıcı}", `**${member.user.username}**`)
            .replace("{user}", `**${member.user.username}**`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `<:gold:754848433969561712> **${member.user.username}** Adlı Gold Üye Ayrıldı! **${client.ayarlar.webpanel}** adresinden veya (\`çıkış-mesaj-ayarla\` komutu ile mesaj değiştirilebilir. <:gold:754848433969561712>)`
    );
  } else
    member.guild.channels.get(hgK).send(
      db.has(`cikisM_${member.guild.id}`)
        ? cikis
            .replace("{kullanıcı}", `**${member.user.username}**`)
            .replace("{user}", `**${member.user.username}**`)
            .replace("{sunucu}", `**${member.guild.name}**`)
            .replace("{kişisayısı}", `**${member.guild.members.size}**`)
        : `**${member.user.username}** Ayrıldı! **${client.ayarlar.webpanel}** adresinden veya (\`çıkış-mesaj-ayarla\` komutu ile mesaj değiştirilebilir.)`
    );
});
client.on("message", async message => {
  var onay = client.emojis.get(client.emojiler.evet);
  var red = client.emojis.get(client.emojiler.hayır);
  const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  let i =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  let prefix;
  if (i) {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : i;
  } else {
    prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0] + " "
      : `${message.guild.commandPrefix}`;
  }

  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "rozet-parar") {
    if (message.author.id !== "130352982616178689")
      return message.channek.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge6_${user.id}`,
      "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıya yoldırım rozeti verilmiştir.`
    );
  }

  if (command === "rozet-onayla") {
    if (message.author.id !== "130352982616178689")
      return message.channek.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png"
    );
    return message.channel.send(`${onay} Kullanıcıya onay rozeti verilmiştir.`);
  }

  if (command === "rozet-konay" || command === "rozet-konayla") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`${onay} Kullanıcıdan onay rozeti alınmıştır.`);
  }

  if (command === "rozet-yetkili" || command === "rozet-ekip") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png"
    );
    return message.channel.send(`${onay} Kullanıcıya ekip rozeti verilmiştir.`);
  }

  if (command === "rozet-kyetkili" || command === "rozet-kekip") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge2_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(`${onay} Kullanıcıdan ekip rozeti alınmıştır.`);
  }

  if (command === "rozet-destekci" || command === "rozet-destekçi") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıya destekçi rozeti verilmiştir.`
    );
  }

  if (command === "rozet-kdestekci" || command === "rozet-kdestekçi") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge3_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıdan destekçi rozeti alınmıştır.`
    );
  }

  if (command === "rozet-mod" || command === "rozet-moderator") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıya moderator rozeti verilmiştir.`
    );
  }

  if (command === "rozet-kmod" || command === "rozet-kmoderator") {
    if (message.author.id !== "130352982616178689")
      return message.channel.send(
        `${red} Bu komutu kullanmak için yetkin bulunmuyor.`
      );
    const i = await db.set(
      `memberBadge4_${user.id}`,
      "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png"
    );
    return message.channel.send(
      `${onay} Kullanıcıdan moderator rozeti alınmıştır.`
    );
  }
});

client.on("message", async message => {
  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  if (message.content.startsWith(prefix)) {
    let komutum = client.cmdd;
    if (komutum[message.guild.id]) {
      for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
        if (
          message.content.slice(prefix.length) ===
          Object.keys(komutum[message.guild.id][i])[0]
        ) {
          message.channel.send(
            komutum[message.guild.id][i][
              Object.keys(komutum[message.guild.id][i])
            ]
          );

          return;
        }
      }
    }
  }
});
client.on("message", async msg => {
  if (!msg.guild) return;

  let prefix =
    (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix;

  if (!msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`))) return;
  var s = "tr";
  var r = "Destek Ekibi";
  var k = "destek-kanalı";
  if (db.has(`dil_${msg.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
    var k = "support-channel";
  }
  const dil = s;

  let rol = "";
  let kanal = "";

  if (db.has(`destekK_${msg.guild.id}`) === true) {
    kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name;
  }

  if (db.has(`destekK_${msg.guild.id}`) === false) {
    kanal = k;
  }

  if (db.has(`destekR_${msg.guild.id}`) === true) {
    rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`));
  }

  if (db.has(`destekR_${msg.guild.id}`) === false) {
    rol = r;
  }

  const reason = msg.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (msg.channel.name == kanal) {
    if (msg.author.bot) return;
    /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
            m2.delete(5000)});*/
    if (
      msg.guild.channels.find(
        c =>
          c.name ===
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
      )
    ) {
      msg.author.send(
        client[dil].desteksistem.aciktalepozel
          .replace("{kisi}", msg.author.tag)
          .replace(
            "{kanal}",
            `${msg.guild.channels.get(
              msg.guild.channels.find(
                c =>
                  c.name ===
                  `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
              ).id
            )}`
          )
      );
      msg.guild.channels
        .find(
          c =>
            c.name ===
            `${client[dil].desteksistem.talep}-${msg.author.discriminator}`
        )
        .send(
          client[dil].desteksistem.aciktalep
            .replace("{kisi}", msg.author.tag)
            .replace("{sebep}", msg.content)
        );

      msg.delete();
      return;
    }
    if (
      msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)
    ) {
      msg.guild
        .createChannel(
          `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
          "text"
        )
        .then(c => {
          const category = msg.guild.channels.find(
            c => c.name === client[dil].desteksistem.kategori
          );
          c.setParent(category.id);
          let role = msg.guild.roles.find(r => r.name === rol.name);
          let role2 = msg.guild.roles.find(r => r.name === "@everyone");
          c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
          });
          c.overwritePermissions(msg.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });

          const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(
              `${client.user.username} | Destek Sistemi`,
              client.user.avatarURL
            )
            .setTitle(`_Merhaba ${msg.author.username}!_`)
            .addField(
              `» Destek Talebi Hakkında Bilgilendirme «`,
              `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep-kapat\` yazabilirsiniz`
            )
            .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
            .addField(
              `» Destek Talebini Açan Kullanıcı «`,
              `<@${msg.author.id}>`,
              true
            )
            .setFooter(
              `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
              msg.guild.iconURL
            );
          c.send({ embed: embed });
          c.send(
            `** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
          );
          msg.delete();
        })
        .catch(console.error);
    }
  }

  if (msg.channel.name == kanal) {
    if (
      !msg.guild.channels.find(
        c => c.name === client[dil].desteksistem.kategori
      )
    ) {
      msg.guild
        .createChannel(client[dil].desteksistem.kategori, "category")
        .then(category => {
          category.setPosition(1);
          let every = msg.guild.roles.find(c => c.name === "@everyone");
          category.overwritePermissions(every, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false
          });
          msg.guild
            .createChannel(
              `${client[dil].desteksistem.talep}-${msg.author.discriminator}`,
              "text"
            )
            .then(c => {
              c.setParent(category.id);
              let role = msg.guild.roles.find(c => c.name === rol.name);
              let role2 = msg.guild.roles.find(c => c.name === "@everyone");
              c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });
              c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
              });
              c.overwritePermissions(msg.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });

              const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(
                  `${client.user.username} | Destek Sistemi`,
                  client.user.avatarURL
                )
                .setTitle(`_Merhaba ${msg.author.username}!_`)
                .addField(
                  `» Destek Talebi Hakkında Bilgilendirme «`,
                  `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}talep-kapat\` yazabilirsiniz`
                )
                .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
                .addField(
                  `» Destek Talebini Açan Kullanıcı «`,
                  `<@${msg.author.id}>`,
                  true
                )
                .setFooter(
                  `${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`,
                  msg.guild.iconURL
                );
              c.send({ embed: embed });
              c.send(
                `** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`
              );
              msg.delete();
            })
            .catch(console.error);
        });
    }
  }
});

client.on("message", async message => {
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)))
    return;

  if (!message.guild) return;

  let prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

  var s = "tr";
  var r = "Destek Ekibi";
  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
    var r = "Support Team";
  }
  const dil = s;

  if (message.content.toLowerCase().startsWith(prefix + `talep-kapat`)) {
    if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`))
      return message.channel.send(
        `Bu komut sadece Destek Talebi kanallarında kullanılabilir.`
      );

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Destek Talebi Kapatma İşlemi!`)
      .setDescription(
        `Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`
      )
      .setFooter(
        `${client.user.username} | Destek Sistemi`,
        client.user.avatarURL
      );
    message.channel.send({ embed }).then(m => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit("Destek talebi kapatma isteği zaman aşımına uğradı.").then(
            m2 => {
              m2.delete();
            },
            3000
          );
        });
    });
  }
});
//if (!message.guild) return;

// let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

// const dil = s

//log sistemi

//let logA = JSON.parse(fs.readFileSync("./jsonlar/log.json", "utf8"));

client.on("guildMemberAdd", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("guildMemberRemove", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("messageDelete", message => {
  if (message.author.bot) return;

  db.set(`atan_${message.channel.id}`, `${message.author.tag}`);
  db.set(`mesaj_${message.channel.id}`, message.content);

  //if (!logA[message.guild.id]) return;

  var user = message.author;

  //var kanal = message.guild.channels.get(logA[message.guild.id].log);

  if (db.has(`log_${message.guild.id}`) === false) return;

  var kanal = message.guild.channels.get(db.fetch(`log_${message.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL);
  kanal.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  // if (!logA[oldMsg.guild.id]) return;

  var user = oldMsg.author;

  //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);

  if (db.has(`log_${oldMsg.guild.id}`) === false) return;

  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});

client.on("roleCreate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleDelete", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleUpdate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});
const sure = 3; //Komut bekleme süresi
const beklememesaji = `<:hata:746932202050420737> Bu komutu kullanabilmek için \`${sure}\` saniye kadar beklemelisiniz.`; //Komut bekleme mesajı
const sahipbeklemesi = true; //Sahip bekleme ayarı (false=kapalı, true=açık)
let yazma = new Set();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.english = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  //log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    //log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.english.set(props.help.enname, props);
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//3
client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik3_${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");
  let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
  const resim1 = await Canvas.loadImage(
    "https://i.hizliresim.com/sY6Dat.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://i.hizliresim.com/st4h5A.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 1296000000) kontrol = resim2;
  if (kurulus < 1296000000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/QE804s.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "Bürküt-güvenlik3.png"
  );
  if (db.has(`karalist_${user.id}`)) {
    member.guild.channels
      .get(memberChannel)
      .send("Yasaklı kullanıcı geldi. Lütfen DİKKATLİ olun");
    if (!member.guild.channels.get(memberChannel)) return;
  } else if (db.has(`üyelikk_${user.id}`)) {
    return;
  } else if (!member.guild.channels.get(memberChannel)) return;
  member.guild.channels.get(memberChannel).send(attachment);
});
client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik3_${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");
  let memberChannel = await db.fetch(`guvenlik3_${member.guild.id}`);
  const resim1 = await Canvas.loadImage(
    "https://i.hizliresim.com/sY6Dat.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://i.hizliresim.com/st4h5A.png"
  );
  const gold = await Canvas.loadImage(
    "https://i.hizliresim.com/1Apj6D.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 1296000000) kontrol = resim2;
  if (kurulus < 1296000000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/7Br6Av.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "Bürküt-güvenlik3.png"
  );
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")

    .setDescription(
      `<:gold:754848433969561712> ${member.user.username} Adlı Gold üye Katıldı. <:gold:754848433969561712>`
    );
  if (db.has(`üyelikk_${user.id}`)) {
    if (!member.guild.channels.get(memberChannel)) return;
    member.guild.channels.get(memberChannel).send(attachment);
    member.guild.channels.get(memberChannel).send(embed);
  } else return;
});


client.on("message", async message => {
  var s = "tr";

  if (db.has(`dil_${message.guild.id}`) === true) {
    var s = "en";
  }
  const dil = client[s];

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message
      .reply(`${client.emojis.get(client.emojiler.evet)} ${dil.afk.cikis}`)
      .then(message => message.delete(7000));
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    if (db.has(`üyelikk_${USER.id}`)) {
      message.delete();
      const embed = new Discord.RichEmbed()
        .setColor("RANDOM")

        .setDescription(
          `<a:mor:690267218856116457><a:yesil:690267180801065251>\`${USER.tag}\` Adlı Gold üyeyi rahatsız edemezsiniz.<a:yesil:690267180801065251><a:mor:690267218856116457>\nAFK süresi: \`${timeObj.hours}\`** saat** \`${timeObj.minutes}\`** dakika** \`${timeObj.seconds}\` ** saniye**\nSebep:\n\`${REASON}\``
        );

      message.channel.send(embed).then(message => message.delete(7000));
    } else
      message.channel
        .send(
          `\`${USER.tag}\` kullanıcısı AFK\nAFK süresi: \`${timeObj.hours}\`** saat** \`${timeObj.minutes}\`** dakika** \`${timeObj.seconds}\` ** saniye**\nSebep:\n\`${REASON}\` `
        )
        .then(message => message.delete(7000));
  }
});
client.on("guildMemberAdd", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
        .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye • ${
            member.guild.members.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});

client.on("guildMemberRemove", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
        .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye • ${
            member.guild.members.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});








client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms2 = require('parse-ms')
let timeout = 600000 //süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = 1
let i = db.fetch(`üyelikk_${msg.author.id}`)
          if (db.has(`üyelikk_${msg.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms2(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 64) {
  var embed = new Discord.RichEmbed()
  .setAuthor(`Bürküt`,`${msg.author.avatarURL || msg.author.displayAvatarURL}`)
  .setDescription(`${client.emojis.get("754848433969561712")} Hizzaya Geçin! Burada Bir Gold Üye Belirdi! <@${msg.author.id}>`)
  .setColor("BLUE")
  msg.channel.send(embed).then(message => {
    message.delete(4000)
  })

  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});




client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`antiraidK_${member.guild.id}`);
  if (!kanal) return;
      const gözelkanal = client.channels.get(kanal) 
      if (!gözelkanal) return
  if (member.user.bot == true) {
  if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
  gözelkanal.send("**"+member.user.username + "** adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **!bot-izni-kaldır botunid**.")
  } else {
  gözelkanal.send("**" + member.user.username + "** adlı botu güvenlik amacı ile uzaklaştırdım. Tekrar geldiğinde uzaklaştırılmasını istemiyorsanız **!bot-izni-ver botunid**")
  member.ban()
}
  }
});


const AntiSpam = require("./spamkorumasi.js");
const cooldown = new Set();

client.on("message", msg => {
  if (client.user.id == msg.author.id) return;
  AntiSpam(client, msg);
  if (cooldown.has(msg.author.id)) {
    return;
  }
})  







client.on("guildBanAdd", async(guild, user) => {
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  let yashinubanlimit = await db.fetch(`banlimit31_${guild.id}`)
  let yashinukullanıcıban = await db.fetch(`banlimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(yashinubanlimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`banlimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${yashinukullanıcıban}`)
        
        if(yashinukullanıcıban >= yashinubanlimit) {
        
          try {
                guild.kick(entry.executor.id, "Ban Limit")
client.channels.get(log).send(`Sunucundan bir yetkili ban limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)          } catch(err) { }
          db.delete(`banlimitP31_${entry.executor.id}`)
        }
      }
    }
  
})


//Kanal Limit
client.on("channelDelete", async(channel) => {
  const guild = channel.guild;
  const entry = await guild.fetchAuditLogs({type: 12}).then(audit => audit.entries.first())
  let yashinukanallimit = await db.fetch(`klimit31_${guild.id}`)
  let yashinukullanıcılimit = await db.fetch(`klimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(yashinukanallimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`klimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${channel.name}\` adlı kanal ${entry.executor} tarafından silindi!`)
        
        if(yashinukullanıcılimit >= yashinukanallimit) {
                  try {
            client.channels.get(log).send(`Sunucundan bir yetkili kanal limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
            guild.kick(entry.executor.id, "Kanal Limit")
            
          } catch(err) { }
          db.delete(`klimitP31_${entry.executor.id}`)
        }
      }
    }
  
})

//Rol Limit
client.on("roleDelete", async(role) => {
  const guild = role.guild;
  const entry = await guild.fetchAuditLogs({type: 32}).then(audit => audit.entries.first())
  let yashinukanallimit = await db.fetch(`rlimit31_${guild.id}`)
  let yashinukullanıcılimit = await db.fetch(`rlimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(yashinukanallimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`rlimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${role.name}\` adlı rol ${entry.executor} tarafından silindi!`)
        
        if(yashinukullanıcılimit >= yashinukanallimit) {
                  try {
            client.channels.get(log).send(`Sunucundan bir yetkili rol limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
            guild.kick(entry.executor.id, "Rol Limit")
            
          } catch(err) { }
          db.delete(`rlimitP31_${entry.executor.id}`)
        }
      }
    }
  
})

client.on("roleUpdate", async(oldRole, newRole) => {

  let codeming = await db.fetch(`ceyöneticiengel_${oldRole.guild.id}`)
  if(!codeming) return
  if (oldRole.hasPermission("ADMINISTRATOR"))  return
   if (!oldRole.hasPermission("ADMINISTRATOR")) 
    if (newRole.hasPermission("ADMINISTRATOR")) {
      
      
   newRole.setPermissions(oldRole.permissions)   
      
      
    } else {
      return
    }  
    
  
  
});

client.login("asdasdasdwMjAz.1");