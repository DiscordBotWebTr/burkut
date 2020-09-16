const config = {
    "ownerID": "130352982616178689", //kendi IDınızı yazınız
    "admins": ["130352982616178689"],
    "support": ["130352982616178689"],
    "token": "asdasdasdwMjAz.1", //botunuzun tokenini yazınız
    "dashboard" : {
      "oauthSecret": "CuYAXgE96XFVl-o6FPNEqebAyefrCYa_", //botunuzun secretini yazınız
      "callbackURL": `https://burkut.discordbot.web.tr/callback`, //site URLnizi yazınız /callback kısmını silmeyiniz!
      "sessionSecret": "", //kalsın
      "domain": "https://burkut.discordbot.web.tr/", //site URLnizi yazınız!
          "port": process.env.PORT
    }
  };
  
  module.exports = config;